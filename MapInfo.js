
    require([
    "esri/map",
    "esri/InfoTemplate",
    "esri/domUtils", 
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "esri/graphicsUtils",
    "esri/renderers/UniqueValueRenderer",
    "esri/dijit/Legend",
    "esri/dijit/PopupTemplate",
    "esri/dijit/FeatureTable",
    "esri/dijit/Search",
    "esri/dijit/LayerList",
    "esri/tasks/query",
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane",
    "dijit/form/ComboBox",
    "dijit/registry", 
    'dojo/dnd/Moveable',
    "dojo/dom",
    "dojo/parser",
    "dojo/ready",
    "dojo/on",
    "dojo/domReady!",
    "dojox/grid/EnhancedGrid",
    "dojo/data/ItemFileWriteStore",
    "dojox/grid/enhanced/plugins/exporter/CSVWriter",
    "dojox/grid/enhanced/plugins/Printer",
    "esri/dijit/Print", 
    "esri/tasks/PrintTemplate",    
    "esri/request", 
    "esri/config",
    "dojo/_base/array",
    "dojo/dom-construct",  
    "esri/arcgis/utils", 
    "esri/dijit/Popup" 
    

    


  ], function(Map, InfoTemplate, domUtils, FeatureLayer, SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol, SimpleFillSymbol, Color, graphicsUtils, UniqueValueRenderer, Legend, PopupTemplate, FeatureTable, Search, LayerList, Query, BorderContainer, ContentPane, ComboBox, registry, Moveable, dom, parser, ready, on, EnhancedGrid, ItemFileWriteStore, CSVWriter, Printer, Print, PrintTemplate, esriRequest, esriConfig, arrayUtils, domConstruct, arcgisUtils,  Popup
) {
        ready(function () {

          parser.parse();

          //setup event handlers for the next/previous buttons
          on(dom.byId("previous"), "click", selectPrevious);
          on(dom.byId("next"), "click", selectNext);

          var map;

          map = new Map("map", {
            basemap: "gray",
            center: [-92.289597, 34.746483],
            zoom: 12
          });

          map.on("load", loadTable);

          function loadTable(){


          map.infoWindow.set("popupWindow", false);

          var infoTemplatecustom = new InfoTemplate();
          infoTemplatecustom.setTitle("WMA - ");
          infoTemplatecustom.setContent("<table>" +
            "<tr><td>Job_No</td><td>${Job_No}</td></tr>" +
            "<tr><td>Job_Name</td><td>${Job_Name}</td></tr>" +
            "<tr><td>Map_Status</td><td>${Map_Status}</td></tr>" +
            "</table><hr>");

        

          var defaultSym = new SimpleMarkerSymbol().setOutline(new SimpleLineSymbol().setWidth(3).setColor(new Color([128,128,128])));

          var greensym = new SimpleMarkerSymbol().setColor(new Color("#02a800")).setOutline(new SimpleLineSymbol().setWidth(1).setColor(new Color([255,255,255])));
          var greenI = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND).setColor(new Color("#02a800")).setOutline(new SimpleLineSymbol().setWidth(1).setColor(new Color([255,255,255])));

          var DarkGreensym = new SimpleMarkerSymbol().setColor(new Color("#267300")).setOutline(new SimpleLineSymbol().setWidth(1).setColor(new Color([255,255,255])));

          var redsym = new SimpleMarkerSymbol().setColor(new Color("#ff0000")).setOutline(new SimpleLineSymbol().setWidth(1).setColor(new Color([255,255,255])));

          var bluesym = new SimpleMarkerSymbol().setColor(new Color("#2ebff0")).setOutline(new SimpleLineSymbol().setWidth(1).setColor(new Color([255,255,255])));

          var greenline = new SimpleLineSymbol();
          greenline.setWidth(3);
          greenline.setColor(new Color("#02a800"));
          var greenfill = new SimpleFillSymbol();
          greenfill.setOutline(greenline);
          greenfill.setColor(new Color([112,168,0, 1]));

          var redline = new SimpleLineSymbol();
          redline.setWidth(3);
          redline.setColor(new Color([255, 0, 0, 1]));
          var redfill = new SimpleFillSymbol();
          redfill.setOutline(redline);
          redfill.setColor(new Color([255, 0, 0, 1]));

          var blueline = new SimpleLineSymbol();
          blueline.setWidth(3);
          blueline.setColor(new Color([46,191,240, 1]));
          var bluefill = new SimpleFillSymbol();
          bluefill.setOutline(blueline);
          bluefill.setColor(new Color([46,191,240, 1]));


          renderer = new UniqueValueRenderer(defaultSym, "combo");
          renderer.addValue({
            value: "00_B",
            label: "00_B",
            symbol: greensym
          });
          renderer.addValue({
            value: "00_I",
            label: "00_I",
            symbol: greenI
          });
          renderer.addValue({
            value: "00_IS",
            label: "00_IS",
            symbol: greensym
          });
          renderer.addValue({
            value: "00_SIG",
            label: "00_SIG",
            symbol: greenI
          });
          renderer.addValue({
            value: "00_R",
            label: "00_R",
            symbol: greenfill
          });
          /////////////////////////////////////////////////////////////////////////////////
          renderer.addValue({
            value: "01_B",
            label: "01_B",
            symbol: DarkGreensym
          });
          renderer.addValue({
            value: "01_I",
            label: "01_I",
            symbol: greenI
          });
          renderer.addValue({
            value: "01_IS",
            label: "01_IS",
            symbol: DarkGreensym
          });
          renderer.addValue({
            value: "01_SIG",
            label: "01_SIG",
            symbol: greenI
          });
          renderer.addValue({
            value: "01_R",
            label: "01_R",
            symbol: greenfill
          });
          /////////////////////////////////////////////////////////////////////////////////
          renderer.addValue({
            value: "02_B",
            label: "02_B",
            symbol: redsym
          });
          renderer.addValue({
            value: "02_I",
            label: "02_I",
            symbol: redsym
          });
          renderer.addValue({
            value: "02_IS",
            label: "02_IS",
            symbol: redsym
          });
          renderer.addValue({
            value: "02_SIG",
            label: "02_SIG",
            symbol: redsym
          });
          renderer.addValue({
            value: "02_R",
            label: "02_R",
            symbol: redfill
          });
          /////////////////////////////////////////////////////////////////////////////////
          renderer.addValue({
            value: "03_B",
            label: "03_B",
            symbol: bluesym
          });
          renderer.addValue({
            value: "03_I",
            label: "03_I",
            symbol: bluesym
          });
          renderer.addValue({
            value: "03_IS",
            label: "03_IS",
            symbol: bluesym
          });
          renderer.addValue({
            value: "03_SIG",
            label: "03_SIG",
            symbol: bluesym
          });
          renderer.addValue({
            value: "03_R",
            label: "03_R",
            symbol: bluefill
          });

          var JobStatusLyr = new FeatureLayer("http://arcsvr.ahtd.com:6080/arcgis/rest/services/JSpolygontest/FeatureServer/0", {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"],
            infoTemplate: infoTemplatecustom
          });
          var getList = new esri.layers.FeatureLayer("http://arcsvr.ahtd.com:6080/arcgis/rest/services/JSpolygontest/FeatureServer/0", {
              mode: esri.layers.FeatureLayer.MODE_SELECTION,
              outFields: ["*"]
            });

           JobStatusLyr.on("click", function(evt) {
            var idProperty = JobStatusLyr.objectIdField,
              feature,
              featureId,
              query;

            if (evt.graphic && evt.graphic.attributes && evt.graphic.attributes[idProperty]) {
              feature = evt.graphic,
              featureId = feature.attributes[idProperty];

              query = new Query();
              query.returnGeometry = false;
              query.objectIds = [featureId];
              query.where = "1=1";

              JobStatusLyr.selectFeatures(query, FeatureLayer.SELECTION_NEW);
            }
          });


          JobStatusLyr.setRenderer(renderer);
          map.addLayer(JobStatusLyr);

          var bridgesUrl = "http://arcsvr.ahtd.com:6080/arcgis/rest/services/Bridge/FeatureServer/0";

          BridgesLyr = new FeatureLayer(bridgesUrl, {
            outFields: ["*"],
            mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
            visible: false,  
            infoTemplate: infoTemplatecustom
          });
          map.addLayer(BridgesLyr);

          var layerList = new LayerList({
            map: map,
            showSubLayers: true,
            layers: [JobStatusLyr, BridgesLyr]
          },"layerList");
          layerList.startup();



          var myFeatureTable = new FeatureTable({
            featureLayer : JobStatusLyr,
            map : map, 
            batchCount: 4000,
            editable: false,
            showRelatedRecords: true,
            syncSelection: true,
            fieldInfos: [
                      
                    ],
            menuFunctions: [
            {
              label: "Export to CSV", callback: customExportCSV 
                 
            },{
              label: "Apply Filter To Table", 
              callback: function(evt){
                console.log(" -- evt: ", evt);
                // set definition expression on the layer
                // show only available emergency vehicles 
                JobStatusLyr.setDefinitionExpression(getFilterText());

                // call FeatureTable.refresh() method to re-fetch features
                // from the layer. Table will only show records that meet 
                // layer's definition expression creteria.  
                myFeatureTable.refresh();
              }
            },{
              label: "", 
              callback: function(evt){
                console.log(" -- evt: ", evt);
                document.getElementById('applyFilter').onclick = function countyFilter() {
                JobStatusLyr.setDefinitionExpression(getFilterText());
                
                myFeatureTable.refresh();
              }
               }
            }]
          }, 'myTableNode');

          myFeatureTable.startup();
          

          // listen to refresh event 
          myFeatureTable.on("refresh", function(evt){
            console.log("refresh event - ", evt);
          });

          function customExportCSV(evt){
          //var gridData = myFeatureTable.selectedRows;
          var data = myFeatureTable.dataStore.data
          
          var csv = convertArrayOfObjectsToCSV({
             data: data 
          });
          
          if (!csv.match(/^data:text\/csv/i)) {
              csv = 'data:text/csv;charset=utf-8,' + csv;
          }

            var encodedUri = encodeURI(csv);
            var link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download',"Exportdata.csv");
            link.click();
        }
          
        function convertArrayOfObjectsToCSV(value){
            var result, ctr, keys, columnDelimiter, lineDelimiter, data;
            
            data = Array.from(new Set(value.data)).filter(d => d).map(d => d.attributes) || null;
            if (!data || !data.length) {
                return null;
            }
            
            columnDelimiter = value.columnDelimiter || ',';
            lineDelimiter = value.lineDelimiter || '\n';
            
            keys = Object.keys(data[1]);
            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;
            
            data.forEach(function(item) {
                ctr = 0;
                keys.forEach(function(key) {
                    if (ctr > 0) 
                        result += columnDelimiter;
                        result += item[key];
                        ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        } 


          var search = new Search({
              sources: [{
                featureLayer: new FeatureLayer("http://arcsvr.ahtd.com:6080/arcgis/rest/services/JSpolygontest/FeatureServer/0", {
                  outFields: ["*"],
                  infoTemplate: infoTemplatecustom
                }),
                outFields: ["Job_No","Job_Name"],
                displayField: "Job_No",
                suggestionTemplate: "${Job_No}: ${Job_Name}",
                name: "Job_No",
                placeholder: "CA0608",
                highlightSymbol: new PictureMarkerSymbol("https://js.arcgis.com/3.21/esri/dijit/Search/images/search-pointer.png", 36, 36).setOffset(9, 18),

                enableSuggestions: true
            }],
              map: map
            }, "search");


            search.startup();

          
          function getFilterText(){
            var definitionExpression = ""

            statusType = document.getElementById("statusFilter").value;
            countyType = document.getElementById("countyFilter").value;
            districtType = document.getElementById("districtFilter").value;
            routeType = document.getElementById("routeFilter").value;

            if(statusType !== "") {
              definitionExpression = definitionExpression + (definitionExpression == "" ? "" : " AND ") + "Map_Status = '" + statusType + "'"
            }
            if(countyType !== "") {
              definitionExpression = definitionExpression + (definitionExpression == "" ? "" : " AND ") + "County_Name = '" + countyType + "'"
            }
            if(districtType !== "") {
              definitionExpression = definitionExpression + (definitionExpression == "" ? "" : " AND ") + "District_No = '" + districtType + "'"
            }
            if(routeType !== "") {
              definitionExpression = definitionExpression + (definitionExpression == "" ? "" : " AND ") + "Route_No = '" + routeType + "'"
            }

            return definitionExpression
          }



          document.getElementById('applyFilter').onclick = function countyFilter() {
            JobStatusLyr.setDefinitionExpression(getFilterText());
              }
            }

          ('load', initializeSidebar());

          function initializeSidebar() {
            //alert("in side bar");
            var popup = map.infoWindow;

            //when the selection changes update the side panel to display the popup info for the 
            //currently selected feature. 
            popup.on("selection-change", function () {
              displayPopupContent(popup.getSelectedFeature());
            });

            //when the selection is cleared remove the popup content from the side panel. 
            popup.on("clear-features", function () {
              //dom.byId replaces dojo.byId
              dom.byId("featureCount").innerHTML = "Click to select feature";
              //registry.byId replaces dijit.byId
              registry.byId("leftPaneright").set("content", "");
              domUtils.hide(dom.byId("pager"));
            });

            //When features are associated with the map's info window update the sidebar with the new content. 
            popup.on("set-features", function () {
              displayPopupContent(popup.getSelectedFeature());
              if (popup.features.length > 1) {
                dom.byId("featureCount").innerHTML = popup.features.length + " features selected";
                //enable navigation if more than one feature is selected 
                domUtils.show(dom.byId("pager"))
              } else {
                dom.byId("featureCount").innerHTML = popup.features.length + " feature selected";
                domUtils.hide(dom.byId("pager"));
              }
            });
          }

          function displayPopupContent(feature) {
            if (feature) {
              var content = feature.getContent();
              registry.byId("leftPaneright").set("content", content);
            }
          }

          function selectPrevious() {
            map.infoWindow.selectPrevious();
          }

          function selectNext() {
            map.infoWindow.selectNext();
          }
        });

      



      });
