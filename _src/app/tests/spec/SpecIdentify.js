require([
    'app/Identify',

    'esri/geometry/Point',
    'esri/geometry/projection',

    'stubmodule'
], function (
    ClassUnderTest,

    Point,
    projection,

    stubmodule
) {
    describe('app/Identify', function () {
        var testWidget;
        var mapView;
        var evt = {
            mapPoint: new Point({
                x: -12486050.929706214,
                y: 4939045.9648487745,
                spatialReference: { wkid: 3857 }
            }),
            stopPropagation() {}
        };
        var infoWindow;

        afterEach(function () {
            if (testWidget) {
                if (testWidget.destroy) {
                    testWidget.destroy();
                }

                testWidget = null;
            }
        });

        beforeEach(function () {
            mapView = jasmine.createSpyObj('mapView', ['on']);
            mapView.graphics = jasmine.createSpyObj('graphics', ['removeAll', 'add']);
            infoWindow = jasmine.createSpyObj('infoWindow',
                ['set', 'open']
            );
            mapView.popup = infoWindow;
            testWidget = new ClassUnderTest({
                mapView
            });
            testWidget.startup();
        });

        describe('Sanity', function () {
            it('should create a Identify', function () {
                expect(testWidget).toEqual(jasmine.any(ClassUnderTest));
                expect(testWidget.mapView).toBe(mapView);
            });
        });
        describe('onMapClick', function () {
            beforeEach(function (done) {
                var request = jasmine.createSpy('request')
                    .and.returnValue({ then: function () {} });

                stubmodule('app/Identify', {
                    'dojo/request/xhr': request
                }).then(function (StubbedModule) {
                    testWidget = new StubbedModule({ mapView });
                    testWidget.onMapClick(evt).always(done);
                });
            });
            it('shows the popup', function () {
                expect(infoWindow.open).toHaveBeenCalledWith({ location: evt.mapPoint });
            });
            it('rounds utms to whole numbers and lat/longs to 5 decimal places', function () {
                var decimalPlaces = 5;
                expect(testWidget.utmX.innerHTML.split('.').length).toBe(1);
                expect(testWidget.utmY.innerHTML.split('.').length).toBe(1);
                expect(testWidget.lat.innerHTML.split('.')[1].length).toBeLessThanOrEqual(decimalPlaces);
                expect(testWidget.lng.innerHTML.split('.')[1].length).toBeLessThanOrEqual(decimalPlaces);
            });
        });
        describe('clearValues', function () {
            it('clears all values', function () {
                testWidget.utmX.innerHTML = 'blah';
                testWidget.utmY.innerHTML = 'blah';
                testWidget.lat.innerHTML = 'blah';
                testWidget.lng.innerHTML = 'blah';
                testWidget.county.innerHTML = 'blah';
                testWidget.municipality.innerHTML = 'blah';
                testWidget.landOwner.innerHTML = 'blah';
                testWidget.elevMeters.innerHTML = 'blah';
                testWidget.elevFeet.innerHTML = 'blah';

                testWidget.clearValues();

                expect(testWidget.utmX.innerHTML).toEqual('');
                expect(testWidget.utmY.innerHTML).toEqual('');
                expect(testWidget.lat.innerHTML).toEqual('');
                expect(testWidget.lng.innerHTML).toEqual('');
                expect(testWidget.county.innerHTML).toEqual('');
                expect(testWidget.municipality.innerHTML).toEqual('');
                expect(testWidget.landOwner.innerHTML).toEqual('');
                expect(testWidget.elevMeters.innerHTML).toEqual('');
                expect(testWidget.elevFeet.innerHTML).toEqual('');
            });
        });
    });
});
