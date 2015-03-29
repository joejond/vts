Ext.Loader.setPath('Ext.ux', 'ux/');
Ext.Loader.setConfig({
    enabled: true
});

Ext.require(['*', 'Ext.ux.GMapPanel', 'Ext.grid.plugin.CellEditing', 'Ext.ux.statusbar.StatusBar']);

var model_daftar_kapal = Ext.define('Kapal', {
    extend: 'Ext.data.Model',
    fields: ['name']
});

var store_daftar_kapal = Ext.create('Ext.data.Store', {
    model: model_daftar_kapal,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'ship_list.php'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'ship',
            messageProperty: 'message'
        }            
    }
});

var peta = {	
    xtype: 'gmappanel',
    //margin: '5 5 5 5',
    region: 'center',
    id: 'mymap',
    zoomLevel: 7,
    gmapType: 'map',
    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    mapControls: ['GSmallMapControl','GMapTypeControl'],
    setCenter: {
        lat: 4.5,
        lng: 120.0
    },
    listeners:{
        'zoom_changed':function() {
        //console.log('zoomnya berubah');
        }
    }
};
var jum = '';
var peta1; // untuk gmappanel -> fungsi2 google map API harus diakses melalui Ext.getCmp('id_gmappanel');
var markers = [];
var kapal_dipilih = [];
var jml_kapaldipilih;
var status_path = 0;
var paths = [];
var paths_loc = [];
var paths_latlon_tmp = [];
var paths_lat = [];
var paths_lon = [];
var jml_point_paths = 0;
var jmlpt = 0;

function addMarker(id, location) {    
    Ext.Ajax.request({
        url: 'data_marker.php',
        params: 'id='+id,
        method: 'GET',
        success: function (data) {  
            var gmarker = Ext.JSON.decode(data.responseText),
            datay = gmarker.marker[0][0];
            
            //console.log(gmarker.marker[0][0].nama);
            //console.log(data.responseText);
            var data_marker = [];
            //data_marker = (data.responseText).split(",");
            var z = peta1.getMap().getZoom();
            var icosize = (z-5)*5+25;
            var markerImage = new google.maps.MarkerImage('img/ship'+z+'.png',
                new google.maps.Size(icosize, icosize),
                new google.maps.Point(0, 0),
                new google.maps.Point(icosize/2, icosize/2));
            var marker = new MarkerWithLabel({
                position: location,
                draggable: false,
                raiseOnDrag: true,
                map: peta1.getMap(),
                labelContent: datay.nama, //data_marker[0],
                labelAnchor: new google.maps.Point(40, -1*icosize/4),
                labelClass: "labels", // the CSS class for the label
                labelStyle: {
                    opacity: 1
                },
                icon: markerImage
            });
            var content1 = 
            '<style type="text/css">' +
            'table.altrowstable {font-family: verdana,arial,sans-serif;font-size:10px;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
            'table.altrowstable th {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
            'table.altrowstable td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
            '</style>'+
            '<table class="altrowstable">' +
            '<tr style="background-color:#d4e3e5;">' +
            '<th rowspan="7"><IMG src="img/vessel/'+ id +'.jpg"></th><th colspan="6" style="font-size:18px;">' + datay.nama + '</th>' +
            '</tr>' +
            '<tr style="background-color:#c3dde0;">' +
            '<th colspan="2">GPS Data</th><th colspan="2">Engine#1</th><th colspan="2">Engine#2</th>' +
            '</tr>' +
            '<tr style="background-color:#d4e3e5;">' +
            '<td>Latitude</td><td>' + datay.lat + '&deg;</td><td>Speed#1</td><td>' + datay.rpm1 + '&nbsp;rpm</td><td>Speed#2</td><td>' + datay.rpm2 + '&nbsp;rpm</td>' +
            '</tr>' +
            '<tr style="background-color:#c3dde0;">' +
            '<td>Longitude</td><td>' + datay.lng + '&deg;</td><td>Propeler#1</td><td>' + datay.prop1 + '&nbsp;rpm</td><td>Propeler#2</td><td>' + datay.prop2 + '&nbsp;rpm</td>' +
            '</tr>' +
            '<tr style="background-color:#d4e3e5;">' +
            '<td>Heading</td><td>' + datay.head + '&deg;</td><td>Flowmeter#1</td><td>' + datay.flow1 + '&nbsp;lt</td><td>Flowmeter#2</td><td>' + datay.flow2 + '&nbsp;lt</td>' +
            '</tr>' +
            '<tr style="background-color:#c3dde0;">' +
            '<td>Speed</td><td>' + (Number(datay.spd)).toFixed(2)+ '&nbsp;knot</td><td>Overflow#1</td><td>' + datay.ovflow1 + '&nbsp;lt</td><td>Overflow#2</td><td>' + datay.ovflow2 + '&nbsp;lt</td>' +
            '</tr>' +
            '<tr style="background-color:#c3dde0;">' +
            '<td colspan="6" style="text-align: right"> data time : ' + datay.waktu + '</td>' +
            '</tr>' +
            '</table>';
    
            var infowindow1 = new google.maps.InfoWindow({
                content: content1,
                maxWidth: 1000
            });
    
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow1.open(peta1.getMap(), marker);
            });
        }                
    });   
}

function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(peta1.getMap());
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
    setAllMap(peta1.getMap());
}


function gambar_kapal(datapilih){
    //console.log(datapilih.posisi[0].id);
    var datax = datapilih.posisi,
    jum = datax.length;
    //console.log(jum);
    deleteMarkers();
    var pos_arr = [];
    var loc_arr = [];
    kapal_dipilih = [];
    //pos_arr = datapilih.split("|");
    //for(var n = 0; n < (pos_arr.length - 1); n++){
    for(var n = 0; n < jum; n++){
        //console.log(pos_arr[n]);
        loc_arr[n] = new google.maps.LatLng(parseFloat(datax[n].lat), parseFloat(datax[n].lng));
        //console.log(datax[n].lat +'=='+ datax[n].lng);
        addMarker(parseInt(datax[n].id), loc_arr[n]);
        //kapal_dipilih = kapal_dipilih + (datax[n].id) + ',';
        kapal_dipilih.push (datax[n].id);
        
        //console.log(kapal_dipilih);
        var point1 = new google.maps.LatLng(parseFloat(datax[n].lat), parseFloat(datax[n].lng));
		peta1.getMap().setCenter(point1);
    
		
    
    
    }
    if(status_path == 1){
			addpath();
		}
    
    //console.log(status_path);
    
}





function getdatapath(id, start_tm, stop_tm)
{
    Ext.Ajax.request({
        url: 'data_path.php',
        params: 'id='+id+'&start='+start_tm+'&stop='+stop_tm,
        //params: {id : id, start : str, stop : stp},
        method: 'GET',
        success: function (data) {
			//console.log(data.responseText);
			
			var pathisi = Ext.JSON.decode(data.responseText);
			//console.log(pathisi);
			
			var jmlpt = pathisi.track.length;
			//console.log('jumlah array path (jmlpt) ' +jmlpt);
			
            //paths_loc = (data.responseText).split("|");
            //jml_point_paths = paths_loc.length;
            for(var n = 0; n < jmlpt; n++){
                //paths_latlon_tmp = paths_loc[n].split(",");
                //console.log(pathisi.track[n].lat);
                //var lat[n]= ,
                //lng[n] = ;
                
                
                //paths_lat[n] = paths_latlon_tmp[0];
                //paths_lon[n] = paths_latlon_tmp[1];
                paths_lat[n] = pathisi.track[n].lat;
                paths_lon[n] = pathisi.track[n].lng;
                
                //console.log (paths_lat[n]+' =&= '+paths_lon[n]);
            }
        }
    })    
}

//function getyyyymmdd(date) {
    //var year = date.getFullYear();
    //var month = (1 + date.getMonth()).toString();
    //month = month.length > 1 ? month : '0' + month;
    //var day = date.getDate().toString();
    //day = day.length > 1 ? day : '0' + day;
    //return '' + year + month + day;
//}

function addpath(){
    var tgl_start = Ext.getCmp('start_path').getValue(), str = Ext.Date.format(tgl_start,'Y-m-d');    
    var tgl_stop = Ext.Date.add(Ext.getCmp('stop_path').getValue(),Ext.Date.DAY,1) ,stp = Ext.Date.format(tgl_stop,'Y-m-d');
    
    //console.log('start = '+str + ' & stop = ' + stp);
    //console.log(tg_1);
    
    //var str_start = getyyyymmdd(tgl_start) + '000000';
    //var str_stop = getyyyymmdd(tgl_stop) + '235959';
	//console.log (str_start);
   
    //console.log(kapal_dipilih);
    //console.log('jumlah kapal : '+kapal_dipilih.length)
    //var kapal_path = [];
    //kapal_path = kapal_dipilih.split(",");
    var z = peta1.getMap().getZoom();
    var polyOptions = {
        strokeColor: '#FF0044',
        strokeOpacity: 1.0,
        strokeWeight: 1,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                strokeColor:'#0000ff',
                fillColor:'#0000ff',
                fillOpacity:1
            },
            repeat:'200px',
            path:[]
        }]
    };
    
    for(var n = 0; n < kapal_dipilih.length; n++){
        
        getdatapath(kapal_dipilih[n], str, stp);
        
        //console.log(kapal_dipilih[n]);
        
        
        paths[n] = new google.maps.Polyline(polyOptions);
        //console.log(paths[n]);
        //console.log('jmlpt : '+jjjj);
        
        paths[n].setMap(peta1.getMap());
        //console.log(paths[n].setMap(peta1.getMap()));
        //console.log(paths_lat[n]);
        //console.log('path digambar dri kapal di pilih : '+kapal_dipilih);
        //console.log('jml pt : '+jmlpoint);
        
        //for(var a = 0; a < jml_point_paths; a++){
        for(var a = 0; a < 200; a++){
            (paths[n].getPath()).push(new google.maps.LatLng(paths_lat[a], paths_lon[a]));
        }
        
//        var count = 0;
//        window.setInterval(function() {
//            count = (count + 1) % 200;
//
//            var icons = paths[n].get('icons');
//            icons[0].offset = (count / 2) + '%';
//            paths[n].set('icons', icons);
//        }, 20);       
    }
}

function removepath(){
    //console.log("jml path = "+paths.length);
    //console.log("jml kapal dipilih = "+jml_kapaldipilih);
    for(var n = 0; n < jml_kapaldipilih; n++){
        paths[n].setMap(null);
    }
    paths = [];
}

var selmod = Ext.create('Ext.selection.CheckboxModel',{
    listeners: {
        selectionchange: function(sm, selections) {
            var ship=[],
            hasil = tabel_daftar_kapal.getView().getSelectionModel().getSelection();
            
            Ext.each(hasil, function (item) {
                       ship.push(item.data.id);
            });
            
            //console.log(ship);
            //var text1 = "";
            //Ext.Array.each(selections, function (item) {
                //text1 = text1 + "," + item.get('id');
            //});
            //var text2 = text1.substr(1, text1.length);
            //console.log(text2);
            
            Ext.Ajax.request({
                url: 'get_last_pos_array.php',
                params : 'id='+ship,
                method: 'GET',
                success: function (data) {
					var isidat = Ext.JSON.decode(data.responseText);
                    if(isidat.posisi.length == 0)
                        deleteMarkers();
                    else 
                        gambar_kapal(isidat);                 

                }                
            });
        }        
    }
});

var tabel_daftar_kapal = Ext.create('Ext.grid.Panel', {
    store : store_daftar_kapal,
    flex: 4,
    selModel: selmod,
    columns: [
    {
        text: "Id", 
        hidden: true,
        width: 30, 
        dataIndex: 'id'
    },
    {
        text: "Name", 
        //width: 120, 
        flex : 1,
        dataIndex: 'name'
    }
    ]
});

var ship_list = {
    title: "Ship List",
    split: true,
    region: 'east',
    width: 200,
    collapsible: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    border: false,
    items:[    
    {                            
        height: 140,
        layout: 'form',
        id: 'simpleForm',
        padding: 10,
        frame: true,
        items: [
        {
            xtype: 'checkboxfield',
            name: 'checkbox1',
            boxLabel: 'show track path',
            listeners:{
                change: function(checkbox, newValue, oldValue, eOpts) {
                    if (newValue) {
                        Ext.getCmp('start_path').enable();
                        Ext.getCmp('stop_path').enable();
                        Ext.getCmp('button_update').enable();
                        status_path = 1;
                        addpath();
                    } else {
                        Ext.getCmp('start_path').disable();
                        Ext.getCmp('stop_path').disable();
                        Ext.getCmp('button_update').disable();
                        status_path = 0;
                        removepath();
                    }
                }
                
            }
        },{
            fieldLabel: 'Start Date',
            name: 'date',
            id: 'start_path',
            labelWidth: 70,
            xtype: 'datefield',
            value: new Date(),
            format: 'd-M-Y',
            disabled: true
        },{
            fieldLabel: 'Stop Date',
            name: 'date',
            id: 'stop_path',
            labelWidth: 70,
            xtype: 'datefield',
            value: new Date(),
            format: 'd-M-Y',
            disabled: true
        },
        {
            xtype: 'button',
            text : 'Show Track',
            id: 'button_update',
            disabled: true,
            handler : function() {
                removepath();
                addpath();
            }           
        }]
    },
    tabel_daftar_kapal
    ]
}
