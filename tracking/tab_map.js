Ext.Loader.setPath('Ext.ux', 'ux/');
Ext.Loader.setConfig({
    enabled: true
});

Ext.require(['*',
    'Ext.ux.GMapPanel',
    'Ext.grid.plugin.CellEditing',
    'Ext.ux.statusbar.StatusBar',
    'Ext.ux.WebSocket',
    'Ext.ux.WebSocketManager'
  ]);

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
            successPropertday: 'success',
            root: 'ship',
            messageProperty: 'message'
        }
    }
});
// var flag_bound;
var info_info;
var muncul;
var atlas;
var hsl_soket;
var lokasi;
var TaskVessel;
var infowindow;
data_obj={};
arr_dat=[];
var panel_ship;
var peta = {
    xtype: 'gmappanel',
    //margin: '5 5 5 5',
    region: 'center',
    id: 'mymap',
    zoomLevel: 8,
    gmapType: 'map',
    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    mapControls: ['GSmallMapControl','GMapTypeControl'],
    setCenter: {
        lat: -7,
        lng: 115.0
    },
    listeners:{
      mapready:function(win,gmap){
        console.log('onmapready');
        atlas = gmap;
        info_info = new google.maps.InfoWindow();

        var ws = Ext.create ('Ext.ux.WebSocket', {
          url:   getWS(),
          // url: 'ws://10.10.10.11:1234' ,
          listeners: {
            open: function (ws) {
                ws.send('usr:'+dt.idu);
            } ,
            message: function (ws, data) {
              prosesDataSocket(JSON.parse(data));
            } ,
            close: function (ws) {
              console.log('jadi close');
            }
          }
        });
        TaskVessel = new Ext.util.TaskRunner();
        TaskVessel.start(taskUpdV);
        onClickPeta(atlas);

      },

      boxready: function()
      {
        // var kukis = Ext.util.Cookies.get("marine");


        // console.log(dt);
        Ext.Ajax.request({
            url: getAPI()+'/asset/tree',
            params: {
                user_id: dt.idu
            },
            method:'get',
            success: function(data){
                var res = Ext.JSON.decode(data.responseText);
                // console.log(res);
                // console.log(res[0].children[1].name);
                var namanya = res[0].children[1].name;
                data_obj.nama = namanya;

                // Crawler(8,res).then(function(data){
                //     console.log(data);
                //
                //     // var mapmap= data.filter(function(dd){
                //     //     // if(dd.id == 1027) return dd;
                //     //     return (dd.id==1027);
                //     //
                //     // });
                //     //
                //     // console.log(mapmap);
                //
                //
                // });

                // console.log(hsl_soket);


                // debugger;
                // process server response here
            }
        });

        // Ext.Ajax.request
        // console.log('keliatan mapnya brooo');
        // ws;
        // console.log('ciba peta',peta1.getMap());


      }
    }
};

function onClickPeta(map){
  atlas.addListener('click',function(){
    // console.log('terklik sodara');
    resetCenterVessel(map);
  });
}



function prosesDataSocket(data){
  // console.log(data);
  var hhh= data.monita.filter(function(d){
    // if(type_tu =="27") {return value;}
    return d.type_tu==27 || d.type_tu==28 || d.type_tu==29 || d.type_tu==30;
  });

  // var arr ={};
  // console.log(hhh);
  hhh.forEach(function(d){
    arr_dat =[];
    if(d.type_tu ==27){
      data_obj.lat=d.value;
      data_obj.waktu=d.epochtime;
    }
    if(d.type_tu ==28){
      data_obj.lng=d.value;
    }
    if(d.type_tu ==29){
      data_obj.head=d.value;
    }
    if(d.type_tu ==30){
      data_obj.speed=d.value;
    }

  });
  arr_dat.push(data_obj);
  // console.log(arr_dat);

}
// var aa =1;
var marker_marker =[];
var taskUpdV = {
      run: function(){
        // console.log(aa);
        deleteTandaKapal();
        proses_kapal(arr_dat);
        // deleteTandaKapal();
        /*tampilkan kapal*/
        // showTandaKapal(atlas);
        setTandaOnMap(atlas);
        // aa++;
      },
      interval: 1000 * 3
  };


// var marker_marker;
function proses_kapal(d)
{
  marker_marker=[];
  // console.log('proses_kapal ',d);
  for (var i = 0; i <d.length; i++){
    // console.log('proses_kapal ke ['+i+'] => ',d);
    marker_marker.push(addTandaKapal(d[i]));
  }
  // console.log(marker_marker);

}

function addTandaKapal(data)
{
  // console.log(peta1.getMap());
  // console.log('addTandaKapal == > ',data);

  var tanda = new google.maps.Marker({
    position : new google.maps.LatLng(data.lat,data.lng),
    // map : peta1.getMap(),
    //*
    icon : {
        path: 'm 7.8794646,25.370535 0,2 -1,0 0,6 6.0312504,0.09375 0,-6 -1,0 0,-2 -4.0312504,-0.09375 z M 9.910715,7.4514688 c -1.0000004,0 -1.1709724,0.331348 -2.0000004,2 -0.829028,1.6686512 -2.96875,8.0128162 -2.96875,8.0128162 l -0.03125,0 0,0.0625 0,19.9375 10.0000004,0 0,-19.9375 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.344165 -2.96875,-8.0128162 -0.829028,-1.668652 -1,-2 -2,-2 z',
        //path: 'm -2.02025,5.2254321 0,1.9999997 -1,0 0,6.0000012 6.0312504,0.09375 0,-6.0000012 -1,0 0,-1.9999997 -4.0312504,-0.09375 z M 0.01100037,-12.693634 c -1.00000038,0 -1.17097237,0.331348 -2.00000037,2 -0.829028,1.6686508 -2.96875,8.0128161 -2.96875,8.0128161 l -0.03125,0 0,0.0625 0,19.9375009 10.0000004,0 0,-19.9375009 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.3441653 -2.96875,-8.0128161 -0.829028,-1.668652 -1,-2 -2.00000003,-2 z',
        // path: pth,
        scale: 1,
        rotation : parseFloat(data.head), //+parseFloat(cor),		// koreksi
        strokeColor: 'black',
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.8
      }
    //*/
    });

//
  // marker_marker.push(tanda);
  create_infowindow(tanda,data);

  return tanda;
  // console.log(marker_marker,' <== buat tanda',marker_marker[0].getPosition().lat());
}
// var infoVessel = '<table><tr><td><b>'+arr_data.nama+'</b></td></tr>'+
//   '<tr><td><b>Last Seen : </b>'+Ext.Date.format(new Date(arr_data.waktu * 1000), 'd-m Y H:i:s') +'</td></tr>'+
//   '</table>';



function create_infowindow(t,d){

  var lati = ((parseFloat(d.lat) < 0) ? Math.abs(parseFloat(d.lat).toFixed(3))+'&deg; S' : parseFloat(d.lat).toFixed(3)+'&deg; N');
  var long = ((parseFloat(d.lng) < 0) ? Math.abs(parseFloat(d.lng).toFixed(3))+'&deg; W' : parseFloat(d.lng).toFixed(3)+'&deg; E');

  // var detailVessel = '<html><table>'+
  //   '<tr><td rowspan = "5"><img src="'+d.img+'"></td><td><b>Vessel</b></td><td>:</td><td align="right"><b>'+d.nama+'</b></td> </tr>'+
  //   // '<tr><td><b>IMO</b></td><td>:</td><td align="right">'+d.imo+'</td></tr>'+
  //   '<tr><td><b>Latitude</b></td><td>:</td><td align="right">'+lati +'</td></tr>'+
  //   '<tr><td><b>Longitude</b></td><td>:</td><td align="right">'+long+'</td></tr>'+
  //   '<tr><td><b>Speed</b></td><td>:</td><td align="right">'+d.speed+' Kts</td></tr>'+
  //   '<tr><td><b>Heading</b></td><td>:</td><td align="right">'+d.heading+'&deg;</td></tr>'+
  //   // '<tr><td colspan = "2"><button id="track"; ">Tracking </button>'+ ((role.fms) ? '<button id="fuel">Detail </button>' : '' )   +'</td></tr>'+
  //   '<tr><td colspan = "2">'+
  //     // '<button id="track" style="visibility:hidden;" > Tracking </button>'+
  //     '<button id="trackoption" >Tracking</button>'+
  //     // '<button id="fuel" style="visibility:'+((role.fms) ? 'visible' : 'hidden')+';">Detail </button></td></tr>'+
  //   '</table></html>';

  // info_ves = '<h3> BIMA-333 </h3>';
  info_ves = '<h3>'+d.nama+'</h3>';
  info_ves += '<p>Position : '+lati+', ' + long+' </p>';
  info_ves +='<p>Last Update : '+ Ext.Date.format(new Date(d.waktu*1000),'d-m-Y H:i:s')+'</p>'
  // info_ves += '<p> '+ coords + '</p>';
  // info_ves += '<p> Last Updated : '+ me.pad(day,2) +'/'+me.pad(month,2)+'/'+year +' '+ hours+':'+me.pad(minutes,2)+':'+me.pad(seconds,2) + '</p>';


  google.maps.event.addListener(t, 'mouseover', function() {
    // console.log('lewat');
    info_info.close();
    info_info.setContent(info_ves);
    info_info.open(atlas,t);
  });

  google.maps.event.addListener(t, 'mouseout', function() {
    // console.log('ilang');
    info_info.close();
    // info_info.setContent(info_ves);
    // info_info.open(atlas,t);
  });

  google.maps.event.addListener(t, 'click', function() {
    info_info.close();
    // info_info.setContent(detailVessel);
    // info_info.open(atlas,t);
    panel_ship=Ext.getCmp('ship_list_panel_id');
    panel_ship.isidata = d;
    panel_ship.expand();
  });

}

function setTandaOnMap(map) {
    for (var i = 0; i < marker_marker.length; i++) {
        marker_marker[i].setMap(map);
    }

}

function clearTandaOnMap() {
  // console.log('clearTandaOnMap to null');
   setTandaOnMap(null);
}

function showTandaKapal(map) {
  setTandaOnMap(map);
}

function deleteTandaKapal() {
  // console.log('deleteTandaKapal',marker_marker);
  clearTandaOnMap();
  // marker_marker ='';
  // console.log('kosongkan marker ==> ',marker_marker);
  marker_marker = [];
}

function resetCenterVessel(map){
  // console.log(this.markers);
  var bounds = new google.maps.LatLngBounds();

    for (var i=0; i<marker_marker.length; i++) {
        if(marker_marker[i].getVisible()) {
            bounds.extend( marker_marker[i].getPosition() );
        }
    }
    if(panel_ship != undefined)
      panel_ship.collapse();
    map.fitBounds(bounds);
    map.setZoom(8);



}


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
var data_koor1 = [];
//
// function lukis_kapal(id,location)
// {
//   var z = peta1.getMap().getZoom();
//   var icosize = (z-5)*5+25;
//   var markerImage = new google.maps.MarkerImage('img/ship'+z+'.png',
//       new google.maps.Size(icosize, icosize),
//       new google.maps.Point(0, 0),
//       new google.maps.Point(icosize/2, icosize/2));
//   var marker = new MarkerWithLabel({
//       position: location,
//       draggable: false,
//       raiseOnDrag: true,
//       map: peta1.getMap(),
//       labelContent: 'Bima3',//datay.nama, //data_marker[0],
//       labelAnchor: new google.maps.Point(40, -1*icosize/4),
//       labelClass: "labels", // the CSS class for the label
//       labelStyle: {
//           opacity: 1
//       },
//       icon: markerImage
//   });
// }
//
// function addMarker(id, location) {
//     Ext.Ajax.request({
//         url: 'data_marker.php',
//         params: 'id='+id,
//         method: 'GET',
//         success: function (data) {
//             var gmarker = Ext.JSON.decode(data.responseText),
//             datay = gmarker.marker[0][0];
//
//             //console.log(gmarker.marker[0][0].nama);
//             //console.log(data.responseText);
//             var data_marker = [];
//             //data_marker = (data.responseText).split(",");
//             var z = peta1.getMap().getZoom();
//             var icosize = (z-5)*5+25;
//             var markerImage = new google.maps.MarkerImage('img/ship'+z+'.png',
//                 new google.maps.Size(icosize, icosize),
//                 new google.maps.Point(0, 0),
//                 new google.maps.Point(icosize/2, icosize/2));
//             var marker = new MarkerWithLabel({
//                 position: location,
//                 draggable: false,
//                 raiseOnDrag: true,
//                 map: peta1.getMap(),
//                 labelContent: datay.nama, //data_marker[0],
//                 labelAnchor: new google.maps.Point(40, -1*icosize/4),
//                 labelClass: "labels", // the CSS class for the label
//                 labelStyle: {
//                     opacity: 1
//                 },
//                 icon: markerImage
//             });
//             var content1 =
//             '<style type="text/css">' +
//             'table.altrowstable {font-family: verdana,arial,sans-serif;font-size:10px;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
//             'table.altrowstable th {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
//             'table.altrowstable td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
//             '</style>'+
//             '<table class="altrowstable">' +
//             '<tr style="background-color:#d4e3e5;">' +
//             '<th rowspan="7"><IMG src="img/vessel/'+ id +'.jpg"></th><th colspan="6" style="font-size:18px;">' + datay.nama + '</th>' +
//             '</tr>' +
//             '<tr style="background-color:#c3dde0;">' +
//             '<th colspan="2">GPS Data</th><th colspan="2">Engine#1</th><th colspan="2">Engine#2</th>' +
//             '</tr>' +
//             '<tr style="background-color:#d4e3e5;">' +
//             '<td>Latitude</td><td>' + datay.lat + '&deg;</td><td>Speed#1</td><td>' + datay.rpm1 + '&nbsp;rpm</td><td>Speed#2</td><td>' + datay.rpm2 + '&nbsp;rpm</td>' +
//             '</tr>' +
//             '<tr style="background-color:#c3dde0;">' +
//             '<td>Longitude</td><td>' + datay.lng + '&deg;</td><td>Propeler#1</td><td>' + datay.prop1 + '&nbsp;rpm</td><td>Propeler#2</td><td>' + datay.prop2 + '&nbsp;rpm</td>' +
//             '</tr>' +
//             '<tr style="background-color:#d4e3e5;">' +
//             '<td>Heading</td><td>' + datay.head + '&deg;</td><td>Flowmeter#1</td><td>' + datay.flow1 + '&nbsp;lt</td><td>Flowmeter#2</td><td>' + datay.flow2 + '&nbsp;lt</td>' +
//             '</tr>' +
//             '<tr style="background-color:#c3dde0;">' +
//             '<td>Speed</td><td>' + (Number(datay.spd)).toFixed(2)+ '&nbsp;knot</td><td>Overflow#1</td><td>' + datay.ovflow1 + '&nbsp;lt</td><td>Overflow#2</td><td>' + datay.ovflow2 + '&nbsp;lt</td>' +
//             '</tr>' +
//             '<tr style="background-color:#c3dde0;">' +
//             '<td colspan="6" style="text-align: right"> data time : ' + datay.waktu + '</td>' +
//             '</tr>' +
//             '</table>';
//
//             var infowindow1 = new google.maps.InfoWindow({
//                 content: content1,
//                 maxWidth: 1000
//             });
//
//             markers.push(marker);
//             google.maps.event.addListener(marker, 'click', function() {
//                 infowindow1.open(peta1.getMap(), marker);
//             });
//         }
//     });
// }
//
// function setAllMap(map) {
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(map);
//     }
// }
//
// // Removes the markers from the map, but keeps them in the array.
// function clearMarkers() {
//     setAllMap(null);
// }
//
// // Shows any markers currently in the array.
// function showMarkers() {
//     setAllMap(peta1.getMap());
// }
//
// // Deletes all markers in the array by removing references to them.
// function deleteMarkers() {
//     clearMarkers();
//     markers = [];
//     setAllMap(peta1.getMap());
// }
//
//
// function gambar_kapal(datapilih){
//     //console.log(datapilih.posisi[0].id);
//     var datax = datapilih.posisi,
//     jum = datax.length;
//     // console.log(jum);
//     deleteMarkers();
//     var pos_arr = [];
//     var loc_arr = [];
//     kapal_dipilih = [];
//     //pos_arr = datapilih.split("|");
//     //for(var n = 0; n < (pos_arr.length - 1); n++){
//     for(var n = 0; n < jum; n++){
//         // console.log(pos_arr[n]);
//         loc_arr[n] = new google.maps.LatLng(parseFloat(datax[n].lat), parseFloat(datax[n].lng));
//         // console.log(datax[n].lat +'=='+ datax[n].lng);
//         // addMarker(parseInt(datax[n].id), loc_arr[n]);
//         lukis_kapal(parseInt(datax[n].id), loc_arr[n]);
//         //kapal_dipilih = kapal_dipilih + (datax[n].id) + ',';
//         kapal_dipilih.push (datax[n].id);
//
//         //console.log(kapal_dipilih);
//         var point1 = new google.maps.LatLng(parseFloat(datax[n].lat), parseFloat(datax[n].lng));
// 		peta1.getMap().setCenter(point1);
//
//
//
//
//     }
//     if(status_path == 1){
// 			addpath();
// 		}
//
//     //console.log(status_path);
//
// }
//
//
//
//
//
// function getdatapath(id, start_tm, stop_tm)
// {
//     Ext.Ajax.request({
//         url: 'data_path.php',
//         params: 'id='+id+'&start='+start_tm+'&stop='+stop_tm,
//         //params: {id : id, start : str, stop : stp},
//         method: 'GET',
//         success: function (data) {
// 			//console.log(data.responseText);
// 			var pathisi = Ext.JSON.decode(data.responseText);
// 			//console.log(pathisi);
//
// 			var jmlpt = pathisi.track.length;
// 			//console.log('jumlah array path (jmlpt) ' +jmlpt);
//
//             //paths_loc = (data.responseText).split("|");
//             //jml_point_paths = paths_loc.length;
//             for(var n = 0; n < jmlpt; n++){
//                 //paths_latlon_tmp = paths_loc[n].split(",");
//                 //console.log(pathisi.track[n].lat);
//                 //var lat[n]= ,
//                 //lng[n] = ;
//
//
//                 //paths_lat[n] = paths_latlon_tmp[0];
//                 //paths_lon[n] = paths_latlon_tmp[1];
//                 paths_lat[n] = pathisi.track[n].lat;
//                 paths_lon[n] = pathisi.track[n].lng;
//
//
//
//             }
//
//         }
//     })
// }
//
// //function getyyyymmdd(date) {
//     //var year = date.getFullYear();
//     //var month = (1 + date.getMonth()).toString();
//     //month = month.length > 1 ? month : '0' + month;
//     //var day = date.getDate().toString();
//     //day = day.length > 1 ? day : '0' + day;
//     //return '' + year + month + day;
// //}
//
// function addpath(){
//     var tgl_start = Ext.getCmp('start_path').getValue(), str = Ext.Date.format(tgl_start,'Y-m-d');
//     var tgl_stop = Ext.Date.add(Ext.getCmp('stop_path').getValue(),Ext.Date.DAY,1) ,stp = Ext.Date.format(tgl_stop,'Y-m-d');
//
//     //console.log('start = '+str + ' & stop = ' + stp);
//     //console.log(tg_1);
//
//     //var str_start = getyyyymmdd(tgl_start) + '000000';
//     //var str_stop = getyyyymmdd(tgl_stop) + '235959';
// 	//console.log (str_start);
//
//     //console.log(kapal_dipilih);
//     //console.log('jumlah kapal : '+kapal_dipilih.length)
//     //var kapal_path = [];
//     //kapal_path = kapal_dipilih.split(",");
//     var z = peta1.getMap().getZoom();
//     var polyOptions = {
//         strokeColor: '#FF0044',
//         strokeOpacity: 1.0,
//         strokeWeight: 1,
//         icons: [{
//             icon: {
//                 path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                 strokeColor:'#0000ff',
//                 fillColor:'#0000ff',
//                 fillOpacity:1
//             },
//             repeat:'200px',
//             path:[]
//         }]
//     };
//
//     for(var n = 0; n < kapal_dipilih.length; n++){
//
//         getdatapath(kapal_dipilih[n], str, stp);
//
//
//
//
//         paths[n] = new google.maps.Polyline(polyOptions);
//         //////console.log(paths[n]);
//         //////console.log('jmlpt : '+jjjj);
//
//         paths[n].setMap(peta1.getMap());
//         //console.log(paths[n].setMap(peta1.getMap()));
//         //console.log(paths_lat[n]);
//         //console.log('path digambar dri kapal di pilih : '+kapal_dipilih);
//         //console.log('jml pt : '+jmlpoint);
//
//         //for(var a = 0; a < jml_point_paths; a++){
//         for(var a = 0; a < 200; a++){
//             (paths[n].getPath()).push(new google.maps.LatLng(paths_lat[a], paths_lon[a]));
//         }
//
// //        var count = 0;
// //        window.setInterval(function() {
// //            count = (count + 1) % 200;
// //
// //            var icons = paths[n].get('icons');
// //            icons[0].offset = (count / 2) + '%';
// //            paths[n].set('icons', icons);
// //        }, 20);
//     }
// }
//
// function removepath(){
//     //console.log("jml path = "+paths.length);
//     //console.log("jml kapal dipilih = "+jml_kapaldipilih);
//     for(var n = 0; n < jml_kapaldipilih; n++){
//         paths[n].setMap(null);
//     }
//     paths = [];
// }

var selmod = Ext.create('Ext.selection.CheckboxModel',{
    listeners: {
        selectionchange: function(sm, selections) {
            var ship=[],
            hasil = tabel_daftar_kapal.getView().getSelectionModel().getSelection();
            // console.log('pencet ');;

            Ext.each(hasil, function (item) {
                       ship.push(item.data.id);
            });

            // console.log(ship);
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
					              //  console.log (isidat);
                    if(isidat.posisi.length == 0)
                        deleteMarkers();
                    else
                        gambar_kapal(isidat);

                }
            });
        }
    }
});

var panel_form_tracking = Ext.create('Ext.form.Panel', {
    // title: 'Tracking',
    bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
					fieldLabel: 'Date Tracking',
					xtype:'datefield',
					name: 'start',
          format: 'd-M-Y',
          value: new Date(),
          maxValue: new Date(),
          submitFormat:'U',
					allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{

        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
              console.log('dipencet');

              console.log(Ext.getCmp('ship_list_panel_id').isidata);
							var dt = form.getValues();
              dt.end = dt.start - 86400;
              dt.density = 'h';
							// dt.titik_ukur_id = 11033;
							console.log(dt);
							// Ext.Ajax.request({
              //
							//     url: getAPI()+'/pelindo/custom_input',
							// 		method:'POST',
              //
							//     params: dt,
							//     success: function(response){
							//         var text = response.responseText;
							//         // console.log(text);
							// 				Ext.Msg.alert('Fuel-Bunkering', 'Sukses.</br>('+dt.date+' '+dt.time+':00) = '+dt.value+' Liters');
							//     }
							// });
							form.reset();
							// store_fuel_bunker.reload();

            }
        }
    }],
    // renderTo: Ext.getBody()
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
    }]
});

var ship_list = {
    title: "Ship List",
    id:'ship_list_panel_id',
    split: true,
    region: 'east',
    width: 250,
    collapsible: true,
    collapsed: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    border: false,
    items:[
    // {
    //     height: 140,
    //     layout: 'form',
    //     id: 'simpleForm',
    //     padding: 10,
    //     frame: true,
    //     items: [
        // {

          panel_form_tracking,
        //
        //     xtype: 'checkboxfield',
        //     name: 'checkbox1',
        //     boxLabel: 'show track path',
        //     listeners:{
        //         change: function(checkbox, newValue, oldValue, eOpts) {
        //             if (newValue) {
        //                 Ext.getCmp('start_path').enable();
        //                 Ext.getCmp('stop_path').enable();
        //                 Ext.getCmp('button_update').enable();
        //                 status_path = 1;
        //                 addpath();
        //             } else {
        //                 Ext.getCmp('start_path').disable();
        //                 Ext.getCmp('stop_path').disable();
        //                 Ext.getCmp('button_update').disable();
        //                 status_path = 0;
        //                 removepath();
        //             }
        //         }
        //
        //     }
        // },{
        //     fieldLabel: 'Start Date',
        //     name: 'date',
        //     id: 'start_path',
        //     labelWidth: 70,
        //     xtype: 'datefield',
        //     value: new Date(),
        //     maxValue: new Date(),
        //     format: 'd-M-Y',
        //     // disabled: true
        // },{
        // //     fieldLabel: 'Stop Date',
        // //     name: 'date',
        // //     id: 'stop_path',
        // //     labelWidth: 70,
        // //     xtype: 'datefield',
        // //     value: new Date(),
        // //     format: 'd-M-Y',
        // //     disabled: true
        // // },
        // // {
        //     xtype: 'button',
        //     text : 'Show Track',
        //     id: 'button_update',
        //     disabled: true,
        //     handler : function() {
        //         removepath();
        //         addpath();
        //     }
        // }
    //   ]
    // },
    tabel_daftar_kapal
    ]
}
