define([
    'app/config',

    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',

    'dojo/query',
    'dojo/request/xhr',
    'dojo/text!app/templates/Identify.html',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'proj4'
], function (
    config,

    _TemplatedMixin,
    _WidgetBase,

    query,
    request,
    template,
    array,
    declare,
    lang,
    proj4
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        // description:
        //      Identify functionality for the app. Returns popup with data. Uses the search api for most of the data.

        templateString: template,
        baseClass: 'identify-widget',

        // Properties to be sent into constructor

        // map: esri/map
        map: null,

        constructor: function (params) {
            // summary:
            //      description
            console.log('app/Identify::constructor', arguments);

            lang.mixin(this, params);

            this.map.on('click', lang.hitch(this, 'onMapClick'));
            this.map.infoWindow.setTitle('Map Click Information');
            this.map.infoWindow.resize(300, 400);
        },
        postCreate: function () {
            // summary:
            //      description
            console.log('app/Identify:postCreate', arguments);

            this.map.infoWindow.setContent(this.domNode);

            this.requests = [
                [
                    config.featureClassNames.counties,
                    config.fieldNames.NAME,
                    this.county,
                    '{name}' // because the api returns weird field names for now
                ], [
                    config.featureClassNames.municipalities,
                    config.fieldNames.NAME,
                    this.municipality,
                    '{name}' // because the api returns weird field names for now
                ], [
                    config.featureClassNames.landOwnership,
                    config.fieldNames.STATE_LGD,
                    this.landOwner,
                    '{statE_LGD}' // because the api returns weird field names for now
                ], [
                    config.featureClassNames.nationalGrid,
                    config.fieldNames.GRID1Mil + ',' + config.fieldNames.GRIS100K,
                    this.nationalGrid,
                    '{griD1MIL} {griD100K} {x} {y}'
                ]
            ];
        },
        onMapClick: function (evt) {
            // summary:
            //      user clicks on the map
            // evt: Map Click Event
            console.log('app/Identify:onMapClick', arguments);

            var that = this;

            this.clearValues();
            this.map.infoWindow.show(evt.mapPoint);

            // lat/long coords
            var ll = proj4(config.wkt3857, config.wkt4326, lang.clone(evt.mapPoint));
            this.lng.innerHTML = Math.round(ll.x * 100000) / 100000;
            this.lat.innerHTML = Math.round(ll.y * 100000) / 100000;

            // utm coords
            var utm = proj4(config.wkt3857, config.wkt26912, lang.clone(evt.mapPoint));
            var utmx = Math.round(utm.x);
            var utmy = Math.round(utm.y);
            this.utmX.innerHTML = utmx;
            this.utmY.innerHTML = utmy;

            array.forEach(this.requests, function (r) {
                var url = lang.replace(config.urls.search, [r[0], r[1]]);
                request(url, {
                    query: {
                        geometry: 'point:' + JSON.stringify([utmx, utmy]),
                        apiKey: config.apiKey
                    },
                    headers: {
                        'X-Requested-With': null
                    },
                    handleAs: 'json'
                }).then(function (data) {
                    if (data.result.length > 0) {
                        var f = lang.mixin(data.result[0].attributes, {
                            x: that.utmX.innerHTML.slice(-5),
                            y: that.utmY.innerHTML.slice(-5)
                        });
                        r[2].innerHTML = lang.replace(r[3], f);
                    } else {
                        r[2].innerHTML = 'n/a';
                    }
                });
            });

            this.getElevation(evt.mapPoint);
            this.reverseGeocode(utm);
        },
        clearValues: function () {
            // summary:
            //      clears all of the values for the widget
            console.log('app/Identify:clearValues', arguments);

            query('span', this.domNode).forEach(function (n) {
                n.innerHTML = '';
            });
        },
        getElevation: function (point) {
            // summary:
            //      queries the identify service for the DEM image server
            // point: esri/geometry/Point
            console.log('app/Identify::getElevation', arguments);

            var that = this;
            request(config.urls.dem, {
                query: {
                    geometry: JSON.stringify(point.toJson()),
                    f: 'json',
                    geometryType: 'esriGeometryPoint'
                },
                handleAs: 'json',
                headers: {
                    'X-Requested-With': null
                }
            }).then(function (grid) {
                if (grid.value) {
                    var meters = grid.value;
                    var feet = Math.round(meters * 3.28084);
                    that.elevMeters.innerHTML = meters;
                    that.elevFeet.innerHTML = feet;
                }
            });
        },
        reverseGeocode: function (point) {
            // summary:
            //      hits the web api reverse geocode endpoint
            // point: esri/geometry/point
            console.log('app/Identify::reverseGeocode', arguments);

            var that = this;
            var url = lang.replace(config.urls.reverseGeocode, [point.x, point.y]);
            request(url, {
                query: {
                    apiKey: config.apiKey,
                    distance: 50
                },
                headers: {
                    'X-Requested-With': null
                },
                handleAs: 'json'
            }).then(function (data) {
                if (data.status && data.status === 200 && data.result.address) {
                    that.address.innerHTML = data.result.address.street;
                } else {
                    that.address.innerHTML = 'n/a';
                }
            });
        }
    });
});
