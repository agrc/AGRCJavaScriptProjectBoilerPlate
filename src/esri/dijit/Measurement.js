//>>built
require({cache:{"url:esri/dijit/templates/Measurement.html":"\x3cdiv class\x3d\"esriMeasurement\"\x3e\n  \x3cdiv dojoType\x3d'dijit.form.ToggleButton' baseClass\x3d'esriButton' dojoAttachPoint\x3d'area' checked\x3d'false' iconClass\x3d'areaIcon' showLabel\x3d'false' dojoAttachEvent\x3d'onClick:areaToggleButton'\x3e\x3c/div\x3e\n  \x3cdiv dojoType\x3d'dijit.form.ToggleButton' baseClass\x3d'esriButton' dojoAttachPoint\x3d'distance' iconClass\x3d'distanceIcon' showLabel\x3d'false' dojoAttachEvent\x3d'onClick:distanceToggleButton'\x3e\x3c/div\x3e\n  \x3cdiv dojoType\x3d'dijit.form.ToggleButton' baseClass\x3d'esriButton' dojoAttachPoint\x3d'location' iconClass\x3d'locationIcon' showLabel\x3d'false' dojoAttachEvent\x3d'onClick:locationToggleButton'\x3e\x3c/div\x3e\n  \x3cdiv style\x3d\"display:inline;margin-left:2px;margin-right:2px;padding-top:2px;\"\x3e|\x3c/div\x3e\n  \x3cbutton dojoType\x3d'dijit.form.DropDownButton' baseClass\x3d'esriToggleButton' dojoAttachPoint\x3d'unit' label\x3d'unit' value\x3d'unit' style\x3d'visibility:hidden;'\x3e\x3c/button\x3e\n  \x3cdiv dojoType\x3d'dijit.layout.ContentPane' dojoAttachPoint\x3d'resultLabel' class\x3d'resultLabel'\x3e\x3c/div\x3e\n  \x3cdiv dojoType\x3d'dijit.layout.ContentPane' dojoAttachPoint\x3d'resultValue' align\x3d'left' class\x3d'result'\x3e\x3c/div\x3e\n\x3c/div\x3e"}});
define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/has","dojo/number","dojo/dom-style","dijit/_Widget","dijit/_Templated","dijit/registry","dijit/Menu","dijit/MenuItem","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/geometry/geodesicUtils","esri/geometry/webMercatorUtils","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Polygon","esri/graphic","esri/tasks/AreasAndLengthsParameters","esri/tasks/LengthsParameters","esri/tasks/GeometryService","esri/kernel","esri/config","esri/domUtils","esri/lang","esri/units","esri/WKIDUnitConversion","esri/dijit/_EventedWidget","dojo/text!esri/dijit/templates/Measurement.html","dojo/i18n!esri/nls/jsapi","dijit/form/ToggleButton","dijit/form/DropDownButton","dijit/layout/ContentPane"],
function(x,y,f,n,d,z,O,s,A,B,C,e,q,r,t,D,u,p,l,E,g,v,k,F,G,H,P,I,w,J,m,K,L,M,h){return y([L,B,C],{declaredClass:"esri.dijit.Measurement",widgetsInTemplate:!0,templateString:M,unitDictionary:[],result:null,inputPoints:[],measureGraphics:[],numberPattern:"#,###,###,##0.0",_eventMap:{"measure-end":["toolName","geometry"]},constructor:function(a,b){a=a||{};if(a.map){this._map=a.map;if(this._map.loaded)this._map.cs=this._checkCS(this._map.spatialReference);else var c=d.connect(this._map,"onLoad",this,
function(){d.disconnect(c);c=null;this._map.cs=this._checkCS(this._map.spatialReference)});this._geometryService=I.defaults.geometryService;if(a.pointSymbol)this._pointSymbol=a.pointSymbol;else{var e=x.toUrl("esri/dijit/images/flag.png");this._pointSymbol=new D(e,24,24);this._pointSymbol.setOffset(9,11)}this._lineSymbol=a.lineSymbol?a.lineSymbol:new u(u.STYLE_SOLID,new z([0,128,255]),3);this._defaultLengthUnit=a.defaultLengthUnit?a.defaultLengthUnit:m.MILES;this._defaultAreaUnit=a.defaultAreaUnit?
a.defaultAreaUnit:m.ACRES;this._defaultLocationUnit=a.defaultLocationUnit?a.defaultLocationUnit:m.DECIMAL_DEGREES;this._snappingCallback=f.hitch(this,this._snappingCallback)}else console.log("dijit.MeasureTool: unable to find the 'map' property in parameters")},startup:function(){var a=h.widgets.measurement;this.unitDictionary[a.NLS_length_miles]=1;this.unitDictionary[a.NLS_length_kilometers]=1.609344;this.unitDictionary[a.NLS_length_feet]=5280;this.unitDictionary[a.NLS_length_meters]=1609.34;this.unitDictionary[a.NLS_length_yards]=
1760;this.unitDictionary[a.NLS_length_nautical_miles]=0.869;this.unitDictionary[a.NLS_area_acres]=1;this.unitDictionary[a.NLS_area_sq_kilometers]=0.004047;this.unitDictionary[a.NLS_area_sq_miles]=0.0015625;this.unitDictionary[a.NLS_area_sq_feet]=43560;this.unitDictionary[a.NLS_area_sq_meters]=4046.87;this.unitDictionary[a.NLS_area_hectares]=0.4047;this.unitDictionary[a.NLS_area_sq_yards]=4840;this.unitDictionary[a.NLS_area_sq_nautical_miles]=0.001179874545293396;this.units={esriMiles:a.NLS_length_miles,
esriKilometers:a.NLS_length_kilometers,esriFeet:a.NLS_length_feet,esriMeters:a.NLS_length_meters,esriYards:a.NLS_length_yards,esriNauticalMiles:a.NLS_length_nautical_miles,esriAcres:a.NLS_area_acres,esriSquareKilometers:a.NLS_area_sq_kilometers,esriSquareMiles:a.NLS_area_sq_miles,esriSquareFeet:a.NLS_area_sq_feet,esriSquareMeters:a.NLS_area_sq_meters,esriHectares:a.NLS_area_hectares,esriSquareYards:a.NLS_area_sq_yards,esriSquareNauticalMiles:a.NLS_area_sq_nautical_miles,esriDecimalDegrees:a.NLS_decimal_degrees,
esriDegreeMinuteSeconds:a.NLS_deg_min_sec};e.byNode(this.distance.domNode).setLabel(h.widgets.measurement.NLS_distance);e.byNode(this.area.domNode).setLabel(h.widgets.measurement.NLS_area);e.byNode(this.location.domNode).setLabel(h.widgets.measurement.NLS_location);e.byNode(this.resultLabel.domNode).setContent(h.widgets.measurement.NLS_resultLabel)},measureArea:function(){this._map.navigationManager.setImmediateClick(!0);this._createAreaUnitList();this.inputPoints=[];this.tempGraphic=new k;this.tempGraphic.setSymbol(this._lineSymbol);
this.tempGraphic.setGeometry(new g(this._map.spatialReference));this._map.graphics.add(this.tempGraphic);"PCS"===this._map.cs&&(this._geometryAreaHandler=d.connect(this._geometryService,"onAreasAndLengthsComplete",this,"_outputArea"));this.mouseClickMapHandler=d.connect(this._map,"onClick",this,"_measureAreaMouseClickHandler");this.doubleClickMapHandler=d.connect(this._map,"onDblClick",this,"_measureAreaDblClickHandler")},measureDistance:function(){this._map.navigationManager.setImmediateClick(!0);
"PCS"===this._map.cs&&(this._projectMapExtent(this._map.extent),this._mapExtentChangeHandler=d.connect(this._map,"onExtentChange",this,"_projectMapExtent"));this.inputPoints=[];this._createLengthUnitList();this.mouseClickMapHandler=d.connect(this._map,"onClick",this,"_measureDistanceMouseClickHandler");this.doubleClickMapHandler=d.connect(this._map,"onDblClick",this,"_measureDistanceDblClickHandler")},measureLocation:function(){this._map.navigationManager.setImmediateClick(!0);this.measureGraphics=
[];this._createLocationUnitList();this._map.graphics.remove(this.locationGraphic);"PCS"===this._map.cs&&(this._projectMapExtent(this._map.extent),this._mapExtentChangeHandler=d.connect(this._map,"onExtentChange",f.hitch(this,this._projectMapExtent)));this._clickMapHandler=d.connect(this._map,"onClick",this,"_measureLocationClickHandler");this.mouseMoveMapHandler=d.connect(this._map,"onMouseMove",this,"_showCoordinates");this.mouseDragMapHandler=d.connect(this._map,"onMouseDrag",f.hitch(this,function(){e.byNode(this.resultValue.domNode).setAttribute("disabled",
!0)}))},setTool:function(a,b){this.closeTool();var c=e.byNode(this[a].domNode).checked;A.set(this.unit.domNode,"visibility","visible");e.byNode(this.area.domNode).setAttribute("checked",!1);e.byNode(this.distance.domNode).setAttribute("checked",!1);e.byNode(this.location.domNode).setAttribute("checked",!1);if(!0===b||!1===b)c=b;e.byNode(this[a].domNode).setAttribute("checked",c);c&&(this.activeTool=a,this.map.isDoubleClickZoom&&this._map.disableDoubleClickZoom(),"area"===a?this.measureArea():"distance"===
a?this.measureDistance():"location"===a&&this.measureLocation(),this._map.snappingManager&&(this._map.snappingManager._startSelectionLayerQuery(),this._map.snappingManager._setUpSnapping()))},areaToggleButton:function(){this.clearResult();this.setTool("area")},distanceToggleButton:function(){this.clearResult();this.setTool("distance")},locationToggleButton:function(){this.clearResult();this.setTool("location")},closeTool:function(){var a=this._map;a.navigationManager.setImmediateClick(!1);a.isDoubleClickZoom||
a.enableDoubleClickZoom();this.inputPoints=[];a.snappingManager&&a.snappingManager._snappingGraphic&&a.graphics.remove(a.snappingManager._snappingGraphic);d.disconnect(this.mouseClickMapHandler);d.disconnect(this.mouseMoveMapHandler);d.disconnect(this.doubleClickMapHandler);d.disconnect(this.mouseDragMapHandler);d.disconnect(this._clickMapHandler);d.disconnect(this._mapExtentChangeHandler);d.disconnect(this._geometryAreaHandler);this.mouseClickMapHandler=this.mouseMoveMapHandler=this.doubleClickMapHandler=
this.mouseDragMapHandler=this._clickMapHandler=this._mapExtentChangeHandler=this._geometryAreaHandler=null;this._map.snappingManager&&(this._map.snappingManager._stopSelectionLayerQuery(),this._map.snappingManager._killOffSnapping())},clearResult:function(){var a=this._map;this.result=0;e.byNode(this.resultValue.domNode).setAttribute("content","");var b;for(b=0;b<this.measureGraphics.length;b++)a.graphics.remove(this.measureGraphics[b]);this.measureGraphics=[];a.graphics.remove(this.tempGraphic)},
show:function(){w.show(this.domNode)},hide:function(){w.hide(this.domNode)},showTool:function(a){this[a].domNode.style.display="inline"},hideTool:function(a){this[a].domNode.style.display="none"},destroy:function(){this.closeTool();this.clearResult();this.inherited(arguments);this._map=this._geometryService=this.measureGraphic=this.measureGraphic=this.tempGraphic=null},onMeasureEnd:function(){},_densifyGeometry:function(a){"Web Mercator"===this._map.cs&&(a=l.webMercatorToGeographic(a));a="PCS"===
this._map.cs?a:p.geodesicDensify(a,5E5);"Web Mercator"===this._map.cs&&(a=l.geographicToWebMercator(a));return a},_measureAreaMouseClickHandler:function(a){var b;this._map.snappingManager&&(b=this._map.snappingManager._snappingPoint);a=b||a.mapPoint;this.inputPoints.push(a);this._currentStartPt=a;if(1===this.inputPoints.length){this.tempGraphic.setGeometry(new g(this._map.spatialReference));for(b=0;b<this.measureGraphics.length;b++)this._map.graphics.remove(this.measureGraphics[b]);this.measureGraphics=
[];this.result=0;this._outputResult(this.result,h.widgets.measurement.NLS_area_acres);this.mouseMoveMapHandler=d.connect(this._map,"onMouseMove",this,"_measureAreaMouseMoveHandler")}this.measureGraphic=new k;this.measureGraphic.setSymbol(this._lineSymbol);this.measureGraphics.push(this.measureGraphic);if(1<this.inputPoints.length){var c=new g(this._map.spatialReference);c.addPath([this.inputPoints[this.inputPoints.length-2],a]);b=new g(this._map.spatialReference);b.addPath([this.inputPoints[0],a]);
a=this._densifyGeometry(c);b=this._densifyGeometry(b);this.tempGraphic.setGeometry(b);this.measureGraphic.setGeometry(a);this._map.graphics.add(this.measureGraphic)}},_measureAreaMouseMoveHandler:function(a){var b;if(0<this.inputPoints.length){var c=new g(this._map.spatialReference),e;this._map.snappingManager&&(e=this._map.snappingManager._snappingPoint);b=e||a.mapPoint;c.addPath([this._currentStartPt,b]);a=this._densifyGeometry(c);this.tempGraphic.setGeometry(a)}1<this.inputPoints.length&&(a=new g(this._map.spatialReference),
a.addPath([b,this.inputPoints[0]]),b=this._densifyGeometry(a),this.tempGraphic.setGeometry(this.tempGraphic.geometry.addPath(b.paths[0])))},_measureAreaDblClickHandler:function(a){d.disconnect(this.mouseMoveMapHandler);this.mouseMoveMapHandler=null;a=new v(this._map.spatialReference);var b=[],c;for(c=0;c<this.inputPoints.length;c++)b.push([this.inputPoints[c].x,this.inputPoints[c].y]);b.push([this.inputPoints[0].x,this.inputPoints[0].y]);a.addRing(b);this.inputPoints=[];this.measurementGeometry=this._densifyGeometry(a);
this._getArea(a)},_getArea:function(a){var b=[],c=new F;c.areaUnit=H.UNIT_ACRES;c.calculationType="geodesic";v.prototype.isSelfIntersecting(a)?this._geometryService.simplify([a],f.hitch(this,function(a){n.forEach(a,f.hitch(this,function(e,d){"PCS"===this._map.cs?(c.polygons=a,this._geometryService.areasAndLengths(c)):("Web Mercator"===this._map.cs&&(e=l.webMercatorToGeographic(e)),b.push(e))}));var e=p.geodesicAreas(b,m.ACRES);this._showArea(e[0])})):("Web Mercator"===this._map.cs&&(a=l.webMercatorToGeographic(a)),
b.push(a),"PCS"===this._map.cs?(c.polygons=b,this._geometryService.areasAndLengths(c)):(a=p.geodesicAreas(b,m.ACRES),this._showArea(Math.abs(a[0]))))},_outputArea:function(a){this._showArea(Math.abs(a.areas[0]))},_showArea:function(a){a&&(this.result=a,a=e.byNode(this.unit.domNode).label,this._outputResult(this.result,a));this.onMeasureEnd(this.activeTool,this.measurementGeometry)},_measureDistanceDblClickHandler:function(a){d.disconnect(this.mouseMoveMapHandler);this.mouseMoveMapHandler=null;a=new g(this._map.spatialReference);
a.addPath(this.inputPoints);a=this._densifyGeometry(a);if("PCS"===this._map.cs){var b=new G;b.polylines=[a];b.lengthUnit=9093;b.calculationType="geodesic";this._geometryService.lengths(b,f.hitch(this,function(a){this.result=a.lengths[0];this._showDistance(this.result)}))}this.inputPoints=[];this.onMeasureEnd(this.activeTool,a)},_measureDistanceMouseClickHandler:function(a){var b;this._map.snappingManager&&(b=this._map.snappingManager._snappingPoint);a=b||a.mapPoint;this.inputPoints.push(a);this._currentStartPt=
a;if(1===this.inputPoints.length){for(b=0;b<this.measureGraphics.length;b++)this._map.graphics.remove(this.measureGraphics[b]);this._map.graphics.remove(this.tempGraphic);this.measureGraphics=[];this.result=0;this._outputResult(this.result,h.widgets.measurement.NLS_length_miles);this.tempGraphic=new k;this.tempGraphic.setSymbol(this._lineSymbol);this._map.graphics.add(this.tempGraphic);this.mouseMoveMapHandler=d.connect(this._map,"onMouseMove",this,"_measureDistanceMouseMoveHandler")}this.tempGraphic.setGeometry(new g(this._map.spatialReference));
this.flagGraphic=new k;this.flagGraphic.setSymbol(this._pointSymbol);this.flagGraphic.setGeometry(a);this.measureGraphics.push(this.flagGraphic);this._map.graphics.add(this.flagGraphic);1<this.inputPoints.length&&(this.measureGraphic=new k,this.measureGraphic.setSymbol(this._lineSymbol),this.measureGraphics.push(this.measureGraphic),b=new g(this._map.spatialReference),b.addPath([this.inputPoints[this.inputPoints.length-2],a]),b=this._densifyGeometry(b),this.measureGraphic.setGeometry(b),this._map.graphics.add(this.measureGraphic),
this.result+=this._geodesicDistance(this.inputPoints[this.inputPoints.length-2],a),this._showDistance(this.result))},_measureDistanceMouseMoveHandler:function(a){if(0<this.inputPoints.length){var b=new g(this._map.spatialReference),c;this._map.snappingManager&&(c=this._map.snappingManager._snappingPoint);a=c||a.mapPoint;b.addPath([this._currentStartPt,a]);b=this._densifyGeometry(b);this.tempGraphic.setGeometry(b);b=this._geodesicDistance(this._currentStartPt,a);this._showDistance(b+this.result)}},
_geodesicDistance:function(a,b){var c=new g(this._map.spatialReference);"PCS"===this._map.cs&&(a=this._getGCSLocation(a),b=this._getGCSLocation(b));c.addPath([a,b]);"Web Mercator"===this._map.cs&&(c=l.webMercatorToGeographic(c));return p.geodesicLengths([c],m.MILES)[0]},_showDistance:function(a){a&&this._outputResult(a,e.byNode(this.unit.domNode).label)},_measureLocationClickHandler:function(a){e.byNode(this.location.domNode).setAttribute("checked",!1);var b;this._map.snappingManager&&(b=this._map.snappingManager._snappingPoint);
a=b||a.mapPoint;this.locationToggleButton();this.locationGraphic=new k;this.locationGraphic.setGeometry(a);this.locationGraphic.setSymbol(this._pointSymbol);this._map.graphics.add(this.locationGraphic);this.measureGraphics.push(this.locationGraphic);b={mapPoint:a};"PCS"===this._map.cs?this._showCoordinates(b,!0):this._showCoordinates(b);this.onMeasureEnd(this.activeTool,a)},_getGCSLocation:function(a){if("Web Mercator"===this._map.cs)a=l.webMercatorToGeographic(a);else if("PCS"===this._map.cs&&this._map._newExtent){var b=
Math.abs((this._map._newExtent.xmax-this._map._newExtent.xmin)/(this._map.extent.xmax-this._map.extent.xmin)),c=Math.abs((this._map._newExtent.ymax-this._map._newExtent.ymin)/(this._map.extent.ymax-this._map.extent.ymin));a=new E((a.x-this._map.extent.xmin)*b+this._map._newExtent.xmin,(a.y-this._map.extent.ymin)*c+this._map._newExtent.ymin,this._map.spatialReference)}return a},_projectMapExtent:function(a){a=new k(a);var b=new t({wkid:4326});this._geometryService.project([a.geometry],b,f.hitch(this,
function(a){!this.mouseMoveMapHandler&&"location"===this.activeTool&&(this.mouseMoveMapHandler=d.connect(this._map,"onMouseMove",f.hitch(this,this._showCoordinates)),this.mouseDragMapHandler=d.connect(this._map,"onMouseDrag",f.hitch(this,function(){e.byNode(this.resultValue.domNode).setAttribute("disabled",!0)})));this._map._newExtent=a[0]}))},_showCoordinates:function(a,b){var c;this._map.snappingManager&&(c=this._map.snappingManager._snappingPoint);c=c||a.mapPoint;var d;if(b){var N=new t({wkid:4326});
this._geometryService.project([c],N,f.hitch(this,function(a){d=a[0];this.locationX=d.x;this.locationY=d.y;this._outputLocationResult(d.x,d.y,e.byNode(this.unit.domNode).label)}))}else d=this._getGCSLocation(c),this.locationX=d.x,this.locationY=d.y,this._outputLocationResult(d.x,d.y,e.byNode(this.unit.domNode).label)},_checkCS:function(a){if(a.wkid)return 3857===a.wkid||102100===a.wkid||102113===a.wkid?"Web Mercator":J.isDefined(K[a.wkid])?"PCS":"GCS";if(a.wkt)return-1!==a.wkt.indexOf("WGS_1984_Web_Mercator")?
"Web Mercator":0===a.wkt.indexOf("PROJCS")?"PCS":"GCS"},_switchUnit:function(a){e.byNode(this.unit.domNode).setAttribute("label",a);null!==this.result&&this._outputResult(this.result,a)},_outputResult:function(a,b){var c=a*this.unitDictionary[b];0===c?e.byNode(this.resultValue.domNode).setAttribute("content",""):1E6<c?e.byNode(this.resultValue.domNode).setAttribute("content",s.format(c.toPrecision(9),{pattern:this.numberPattern})+" "+b):e.byNode(this.resultValue.domNode).setAttribute("content",s.format(c.toFixed(2),
{pattern:this.numberPattern})+" "+b)},_switchLocationUnit:function(a){e.byNode(this.unit.domNode).setAttribute("label",a);null===this.result||""===this.resultValue.domNode.innerHTML||this._outputLocationResult(this.locationX,this.locationY,a)},_outputLocationResult:function(a,b,c){var d,f,g=h.widgets.measurement;c===g.NLS_decimal_degrees?(d=a.toFixed(6),f=b.toFixed(6)):c===g.NLS_deg_min_sec&&(g=c=!1,0>a&&(c=!0,a=Math.abs(a)),0>b&&(g=!0,b=Math.abs(b)),d=Math.floor(a)+"\u00b0"+Math.floor(60*(a-Math.floor(a)))+
"'"+Math.floor(60*(60*(a-Math.floor(a))-Math.floor(60*(a-Math.floor(a)))))+'"',f=Math.floor(b)+"\u00b0"+Math.floor(60*(b-Math.floor(b)))+"'"+Math.floor(60*(60*(b-Math.floor(b))-Math.floor(60*(b-Math.floor(b)))))+'"',c&&(d="-"+d),g&&(f="-"+f));e.byNode(this.resultValue.domNode).setAttribute("content",h.widgets.measurement.NLS_longitude+": "+d+"\x3cbr/\x3e"+h.widgets.measurement.NLS_latitude+": "+f)},_createLengthUnitList:function(){var a=new q({style:"display: none;"}),b=h.widgets.measurement;n.forEach([b.NLS_length_miles,
b.NLS_length_kilometers,b.NLS_length_feet,b.NLS_length_meters,b.NLS_length_yards,b.NLS_length_nautical_miles],f.hitch(this,function(b,d){var e=new r({label:b,onClick:f.hitch(this,function(){this._switchUnit(b)})});e.setAttribute("class","unitDropDown");a.addChild(e)}));e.byNode(this.unit.domNode).setAttribute("dropDown",a);b=this.units[this._defaultLengthUnit];e.byNode(this.unit.domNode).setAttribute("label",b)},_createAreaUnitList:function(){var a=new q({style:"display: none;"}),b=h.widgets.measurement;
n.forEach([b.NLS_area_acres,b.NLS_area_sq_miles,b.NLS_area_sq_kilometers,b.NLS_area_hectares,b.NLS_area_sq_yards,b.NLS_area_sq_feet,b.NLS_area_sq_meters],f.hitch(this,function(b,d){var e=new r({label:b,onClick:f.hitch(this,function(){this._switchUnit(b)})});e.setAttribute("class","unitDropDown");a.addChild(e)}));e.byNode(this.unit.domNode).setAttribute("dropDown",a);b=this.units[this._defaultAreaUnit];e.byNode(this.unit.domNode).setAttribute("label",b)},_createLocationUnitList:function(){var a=new q({style:"display: none;"}),
b=h.widgets.measurement;n.forEach([b.NLS_decimal_degrees,b.NLS_deg_min_sec],f.hitch(this,function(b,e){var d=new r({label:b,onClick:f.hitch(this,function(){this._switchLocationUnit(b)})});d.setAttribute("class","unitDropDown");a.addChild(d)}));e.byNode(this.unit.domNode).setAttribute("dropDown",a);b=this.units[this._defaultLocationUnit];e.byNode(this.unit.domNode).setAttribute("label",b)}})});