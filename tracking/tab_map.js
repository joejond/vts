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
  fields: ['name', 'attribute']
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
var info_info = [];
var info_ves = [];
var muncul;
var atlas;
var hsl_soket;
var lokasi;
var TaskVessel;
var infowindow;
var garis = [];
var bounds;
var ws;

ws = Ext.create('Ext.ux.WebSocket', {
  url: getWS(),
  listeners: {
    open: function (ws) {
      // ws.send('usr:'+dt.idu);
    },
    message: function (ws, data) {
      prosesDataSocket(JSON.parse(data));
    },
    close: function (ws) {
      // console.log('jadi close');
    }
  }
});

data_obj = {};
arr_dat = [];
var panel_ship;
var peta = {
  xtype: 'gmappanel',
  //margin: '5 5 5 5',
  region: 'center',
  id: 'mymap',
  // zoomLevel: 8,
  zoomLevel: 5,
  gmapType: 'map',
  mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
  mapControls: ['GSmallMapControl', 'GMapTypeControl'],
  // setCenter: {
  //     lat: -7,
  //     lng: 115.0
  // },
  setCenter: {
    lat: -2.141055,
    lng: 118.017285
  },
  listeners: {
    mapready: function (win, gmap) {
      // console.log('onmapready');
      atlas = gmap;
      // info_info = new google.maps.InfoWindow();
      // garis = new google.maps.Polyline();
      bounds = new google.maps.LatLngBounds();

      TaskVessel = new Ext.util.TaskRunner();
      TaskVessel.start(taskUpdV);
      // onClickPeta(atlas);
      // ws.close();
      //
      // console.log('open');
      // ws.open();
      // console.log('send')
      // ws.send('usr:4');
      // console.log(ws);
      // console.log(ws.getStatus());

      // var maxLat = 5.88969, minLat = -10.1718;
      // var maxLng = 140.71813, minLng = 95.31644;
      // var map = atlas;
      // var centerLatLng = new google.maps.LatLng(((maxLat + minLat) / 2), ((maxLng + minLng) / 2));
      //
      // var MAX_ZOOM = map.mapTypes.get( map.getMapTypeId() ).maxZoom || 21 ;
      // var MIN_ZOOM = map.mapTypes.get( map.getMapTypeId() ).minZoom || 0 ;
      //
      // var ne= map.getProjection().fromLatLngToPoint( new google.maps.LatLng(maxLat, maxLng) );
      // var sw= map.getProjection().fromLatLngToPoint( new google.maps.LatLng(minLat, minLng) );
      //
      // var worldCoordWidth = Math.abs(ne.x-sw.x);
      // var worldCoordHeight = Math.abs(ne.y-sw.y);
      //
      // //Fit padding in pixels
      // var FIT_PAD = 40;
      // var zoomDym = 0;
      // for( var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom ){
      //     if( worldCoordWidth*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).width() &&
      //         worldCoordHeight*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).height() ) {
      //           zoomDym = zoom;
      //           console.log('zoomDym = ', zoomDym);
      //           break;
      //     }
      // }
      // map.fitBounds(bounds);
      // map.setCenter(centerLatLng);
      // map.setZoom(zoomDym);

    },

    boxready: function () {
      // var kukis = Ext.util.Cookies.get("marine");


      // console.log(dt);
      // Ext.Ajax.request({
      //     url: getAPI()+'/asset/tree',
      //     params: {
      //         user_id: dt.idu
      //     },
      //     method:'get',
      //     success: function(data){
      //         var res = Ext.JSON.decode(data.responseText);
      //         // console.log(res);
      //         // console.log(res[0].children[1].name);
      //         /*
      //         * Sementara .........
      //         *
      //         */
      //         var namanya = res[0].children[1].name;
      //         data_obj.nama = namanya;
      //         data_obj.id = 8;
      //
      //         // Crawler(8,res).then(function(data){
      //         //     console.log(data);
      //         //
      //         //     // var mapmap= data.filter(function(dd){
      //         //     //     // if(dd.id == 1027) return dd;
      //         //     //     return (dd.id==1027);
      //         //     //
      //         //     // });
      //         //     //
      //         //     // console.log(mapmap);
      //         //
      //         //
      //         // });
      //
      //         // console.log(hsl_soket);
      //
      //
      //         // debugger;
      //         // process server response here
      //     }
      // });
    }
  }
};

function onClickPeta(map) {
  atlas.addListener('click', function () {
    // console.log('terklik sodara');
    resetCenterVessel(map);
    show_tracking(null);
    if (taskAnimasiGaris) {
      taskAnimasiGaris.stop(taskAG);
    }

    if (buntut) buntut.stop();
  });
}



function prosesDataSocket(data) {
  // console.log('data', data);
  var hhh = data.monita.filter(function (d) {
    // if(type_tu =="27") {return value;}
    return d.type_tu == 27 || d.type_tu == 28 || d.type_tu == 29 || d.type_tu == 30;
  });

  // var arr ={};
  // console.log('hhh', hhh);
  hhh.forEach(function (d) {
    arr_dat = [];
    if (d.type_tu == 27) {
      // data_obj.lat=d.value;
      // data_obj.waktu=d.epochtime;
      // console.log('d.titik_ukur', d.titik_ukur);
      // console.log('aset_parameter.length', aset_parameter.length);
      for (var i = 0; i < aset_parameter.length; i++) {
        // console.log('aset_parameter['+i+'].tu_id.length', aset_parameter[i].tu_id.length);
        for (var j = 0; j < aset_parameter[i].tu_id.length; j++) {
          // console.log('aset_parameter['+i+'].tu_id['+j+'].titik_ukur', aset_parameter[i].tu_id[j].titik_ukur);
          if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
            aset_parameter[i]['lat'] = d.value;
            aset_parameter[i]['epoch'] = d.epochtime;
            // console.log('d.titik_ukur', d.titik_ukur);
            // console.log('d.value', d.value);
            // console.log('aset_parameter['+i+'].tu_id['+j+'].titik_ukur', aset_parameter[i].tu_id[j].titik_ukur);
            // console.log('aset_parameter['+i+'].tu_id['+j+'].titik_ukur', aset_parameter[i].tu_id[j].titik_ukur);
            // console.log('aset_parameter['+i+'].lat', aset_parameter[i].lat);
            break;
          }
        }
      }
    }
    if (d.type_tu == 28) {
      // data_obj.lng=d.value;
      for (var i = 0; i < aset_parameter.length; i++) {
        for (var j = 0; j < aset_parameter[i].tu_id.length; j++) {
          if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
            aset_parameter[i]['lng'] = d.value;
            aset_parameter[i]['epoch'] = d.epochtime;
            break;
          }
        }
      }
    }
    if (d.type_tu == 29) {
      // data_obj.head=d.value;
      for (var i = 0; i < aset_parameter.length; i++) {
        for (var j = 0; j < aset_parameter[i].tu_id.length; j++) {
          if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
            aset_parameter[i]['head'] = d.value;
            aset_parameter[i]['epoch'] = d.epochtime;
            break;
          }
        }
      }
    }
    if (d.type_tu == 30) {
      // data_obj.speed=d.value;
      for (var i = 0; i < aset_parameter.length; i++) {
        for (var j = 0; j < aset_parameter[i].tu_id.length; j++) {
          if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
            aset_parameter[i]['speed'] = d.value;
            aset_parameter[i]['epoch'] = d.epochtime;
            break;
          }
        }
      }
    }

  });
  // arr_dat.push(data_obj);
  // console.log('arr_dat', arr_dat);
  // console.log(arr_dat);
  // console.log('aset_parameter', aset_parameter);
}
// var aa =1;
var marker_marker = [];
var taskUpdV = {
  run: function () {
    // console.log(aa);
    deleteTandaKapal();
    // proses_kapal(arr_dat);
    proses_kapal(aset_parameter);

    // deleteTandaKapal();
    /*tampilkan kapal*/
    // showTandaKapal(atlas);
    setTandaOnMap(atlas);
    // aa++;
  },
  interval: 1000 * 3
};


// var marker_marker;
function proses_kapal(d) {
  marker_marker = [];
  // console.log('proses_kapal ',d);
  for (var i = 0; i < d.length; i++) {
    // console.log('proses_kapal ke ['+i+'] => ',d);
    if (d[i].lat && d[i].lng) {
      marker_marker.push(addTandaKapal(d[i], i));
    }
  }
  // console.log(marker_marker);

}

function addTandaKapal(data, index) {
  // console.log(peta1.getMap());
  // console.log('addTandaKapal == > ',data);
  // console.log('data', data);
  var tanda = new google.maps.Marker({
    position: new google.maps.LatLng(data.lat, data.lng),
    // map : peta1.getMap(),
    //*
    icon: {
      path: 'm -2.02025,5.2254321 0,1.9999997 -1,0 0,6.0000012 6.0312504,0.09375 0,-6.0000012 -1,0 0,-1.9999997 -4.0312504,-0.09375 z M 0.01100037,-12.693634 c -1.00000038,0 -1.17097237,0.331348 -2.00000037,2 -0.829028,1.6686508 -2.96875,8.0128161 -2.96875,8.0128161 l -0.03125,0 0,0.0625 0,19.9375009 10.0000004,0 0,-19.9375009 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.3441653 -2.96875,-8.0128161 -0.829028,-1.668652 -1,-2 -2.00000003,-2 z',
      // path: pth,
      scale: 1,
      rotation: parseFloat(data.head), //+parseFloat(cor),		// koreksi
      strokeColor: 'black',
      strokeWeight: 1,
      fillColor: data.attribute.color,
      fillOpacity: 0.7
    }
    //*/
  });


  // marker_marker.push(tanda);
  create_infowindow(tanda, data, index);

  return tanda;
  // console.log(marker_marker,' <== buat tanda',marker_marker[0].getPosition().lat());
}
var taskBuntut;

function create_infowindow(t, d, index, mode) {

  // console.log('t', t);
  // console.log('d', d);
  var lati = ((parseFloat(d.lat) < 0) ? Math.abs(parseFloat(d.lat).toFixed(3)) + '&deg; S' : parseFloat(d.lat).toFixed(3) + '&deg; N');
  var long = ((parseFloat(d.lng) < 0) ? Math.abs(parseFloat(d.lng).toFixed(3)) + '&deg; W' : parseFloat(d.lng).toFixed(3) + '&deg; E');

  // info_ves = '<h3> BIMA-333 </h3>';
  // info_ves = '<h3>'+d.nama+'</h3>';
  info_ves[index] = '<h3>' + d.name + '</h3>';
  info_ves[index] += '<p>Position : ' + lati + ', ' + long + ' </p>';
  info_ves[index] += '<p>Latitude : ' + d.lat + ' </p>';
  info_ves[index] += '<p>Longitude : ' + d.lng + ' </p>';
  info_ves[index] += '<p>Heading : ' + d.head + ' &#176;</p>';
  info_ves[index] += '<p>Speed : ' + d.speed + ' Knot</p>';
  // info_ves +='<p>Last Update : '+ Ext.Date.format(new Date(d.waktu*1000),'d-m-Y H:i:s')+'</p>'
  var date_val = new Date(d.epoch * 1000);
  var date_cur = new Date();
  info_ves[index] += '<p>Last Update : ' + Ext.Date.format(date_val, 'd-m-Y H:i:s') + '</p>';
  console.log('date_val', date_val);
  console.log('date_val.getTime()', date_val.getTime());
  console.log('date_cur', date_cur);
  console.log('date_cur.getTime()', date_cur.getTime());
  // info_ves[index] += '<p> Health Status : </p>';
  if ((date_val.getTime()*60*1000*10) >= date_cur.getTime()) {
    info_ves[index] += '<p>Health Status : <b><font color="green" size="3">OK</font></b></p>';
  } else {
    info_ves[index] += '<p>Health Status : <b><font color="red" size="3">Bad</font></b></p>';
  }
  // info_ves += '<p> '+ coords + '</p>';
  // info_ves += '<p> Last Updated : '+ me.pad(day,2) +'/'+me.pad(month,2)+'/'+year +' '+ hours+':'+me.pad(minutes,2)+':'+me.pad(seconds,2) + '</p>';

  info_info[index] = new google.maps.InfoWindow();

  if (mode) {
    // info_info[index].close();
    info_info[index].setContent(info_ves[index]);
    info_info[index].open(atlas, t);
  } else {
    google.maps.event.addListener(t, 'mouseover', function () {
      // console.log('lewat');
      info_info[index].close();
      info_info[index].setContent(info_ves[index]);
      info_info[index].open(atlas, t);
    });
  
    google.maps.event.addListener(t, 'mouseout', function () {
      // console.log('ilang');
      info_info[index].close();
      // info_info.setContent(info_ves);
      // info_info.open(atlas,t);
    });
  }

  // google.maps.event.addListener(t, 'click', function() {
  //
  //   taskBuntut = new Ext.util.TaskRunner();
  //
  //   info_info.close();
  //   // info_info.setContent(detailVessel);
  //   // info_info.open(atlas,t);
  //   panel_ship=Ext.getCmp('ship_list_panel_id');
  //   panel_ship.isidata = d;
  //   panel_ship.expand();
  //
  //   create_rute_buntut(d);
  //
  //
  // });

}
// var buntut;
// function create_rute_buntut(d){
//     console.log('buntute ==> ',d);
//     var skr = new Date().getTime();
//
//     console.log(skr,'ini sejam yng lalu ==> ', (parseInt(skr/1000)) - 3600 );
//     var dtObj = {};
//     dtObj.end = parseInt(skr/1000);
//     dtObj.start = parseInt(skr/1000) - 3600;
//     dtObj.density = 'm';
//
//
//     Ext.Ajax.request({
//         url   : getAPI()+'/map/track-marine',
//         method:'get',
//         params: dtObj,
//         success: function(response){
//             var res = JSON.parse(response.responseText);
//             // console.log(res);
//             // console.log(res.length);
//             var d_rute = create_rute(res);
//             console.log('d_rute', d_rute);
//             var l_rute = d_rute.length;
//
//             // var i =0;
//
//
//             buntut = taskBuntut.newTask({
//               run: function(){
//                 show_tracking(null);
//                 if (markerAnimasiGaris) {
//                   markerAnimasiGaris.setMap(null);
//                 }
//                 if (markerLabelGaris) {
//                   markerLabelGaris.setMap(null);
//                 }
//                 if (taskAnimasiGaris) {
//                   taskAnimasiGaris.stop(taskAG);
//                 }
//                 // console.log(i);
//                 var akhir = d_rute[d_rute.length -1];
//
//                 // d_rute.pop();
//                 // console.log(arr_dat);
//                 var data_ws = {};
//                 // console.log(d_rute.length);
//                 data_ws.lat = parseFloat(arr_dat[0].lat);
//                 data_ws.lng = parseFloat(arr_dat[0].lng);
//                 // data_ws.t = arr_dat[0].waktu;
//
//                 if(JSON.stringify(data_ws) === JSON.stringify(akhir)){
//                 //   // console.log('sama');
//                 //   // console.log('d_rute', d_rute);
//                 }
//                 else {
//                   // console.log('beda');]
//                   d_rute.push(data_ws);
//                   d_rute.shift();
//                   // console.log(d_rute.length);
//                   // console.log(d_rute);
//
//                 }
//                 create_tracking(d_rute,res);
//                 show_tracking(atlas);
//                 // console.log(data_ws);
//
//
//
//
//
//
//
//
//                 // i++;
//               },
//               interval : 1000
//
//             });
//
//             buntut.start();
//             // create_tracking(d_rute,res);
//             // show_tracking(atlas);
//             // resetCenterTracking(atlas);
//             // tracking_mask_periode.hide();
//
//         },
//         callback: function(a,b,c){
//
//         }
//     });
//
// };

function setTandaOnMap(map) {
  // console.log('marker_marker', marker_marker);
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

/* ===== buat Tracking =====*/
var rute;

function create_rute(d) {
  rute = [];
  // console.log('d', d);
  var temp_rute = [];
  posisiAnimasiGaris = [];
  for (var i = 0; i < d.length; i++) {
    // console.log('d['+i+']', d[i]);
    temp_rute.push({
      lat: d[i]['GPS-Latitude'],
      lng: d[i]['GPS-Longitude']
    });
    posisiAnimasiGaris.push({
      lat: d[i]['GPS-Latitude'],
      lng: d[i]['GPS-Longitude'],
      head: d[i]['GPS-Heading'],
      speed: d[i]['GPS-Velocity'],
      name: d[i]['nama'],
      time: d[i]['t'],
      epoch: d[i]['epochtime']
    });
    // console.log('temp_rute', temp_rute);
  }
  // rute = temp_rute;
  // console.log('rute', rute);
  // d.forEach(function(v){
  //   var temp = new Object();
  //   temp['lat'] = v['GPS-Latitude'];
  //   temp['lng'] = v['GPS-Longitude'];
  //   console.log('temp', temp);
  //   rute.push(temp);
  //   console.log('rute', rute);
  // });
  // rute = rute.replace(/"/g, "");

  // return rute;
  return temp_rute;
}

function create_tracking(d_rute, d_vessel) {
  // console.log(d_rute);
  // console.log(d_vessel);
  var warna = ['#0000ff', '#660099', '#ff0000'];
  var jml_rute = d_rute.length;
  var persen_50 = (Math.floor((jml_rute * 0.5)));
  var persen_30 = (Math.floor((jml_rute * 0.3)));
  var persen_20 = (Math.floor((jml_rute * 0.2)));

  // if (persen_50+persen_30+persen_20 != jml_rute) return;

  // console.log('d_rute', d_rute);
  // console.log('persen_50', persen_50);
  // console.log('persen_30', persen_30);al

  // var sisa = jml_rute - last_30;

  var rute1 = [],
    rute2 = [],
    rute3 = [];
  // console.log('d_rute', d_rute);
  for (var i = 0; i < persen_50; i++) {
    rute1.push(d_rute[i]);
  }
  for (var i = persen_50 - 1; i < (persen_50 + persen_30); i++) {
    rute2.push(d_rute[i]);
  }
  for (var i = (persen_50 + persen_30 - 1); i < jml_rute; i++) {
    rute3.push(d_rute[i]);
  }

  rute = d_rute;
  // console.log('rute', rute);


  // var me = this;
  // var rute =[];
  // // me.marker_track = [];
  // Ext.each(d_rute, function(value,index) {
  //   console.log(value);
  //   // me.buatMarkerTrack(value.getData());
  //   // rute.push(value.getData());
  // });
  // console.log(trc);
  // me.getMap;
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 2.5
  };

  garis[0] = new google.maps.Polyline({
    path: rute1,
    // map : atlas,
    icons: [{
      icon: lineSymbol,
      offset: '10%',
      repeat: '400px'
    }],
    strokeColor: warna[0],
    strokeOpacity: 0.4,
    strokeWeight: 3
  });

  garis[1] = new google.maps.Polyline({
    path: rute2,
    // map : atlas,
    icons: [{
      icon: lineSymbol,
      offset: '10%',
      repeat: '250px'
    }],
    strokeColor: warna[1],
    strokeOpacity: 0.6,
    strokeWeight: 3
  });
  garis[2] = new google.maps.Polyline({
    path: rute3,
    // map : atlas,
    icons: [{
      icon: lineSymbol,
      offset: '10%',
      repeat: '150px'
    }],
    strokeColor: warna[2],
    // strokeColor:'linear-gradient(white,red, yellow, green)',
    strokeOpacity: 0.8,
    strokeWeight: 3
  });


  // me.buatTrackingPoly(me.getMap);

  // me.setMarkerRute(me.getMap);

  // me.buatMarkerTrack();

  // google.maps.event.addListener(me.garis,'mouseover',function(){
  // 	console.log('maouse lewat polyline');
  // 	me.infowin.close();
  // 	me.infowin.setContent("halo bro");
  // 	me.infowin.open(me.getMap);
  // });
}

var animasiGaris;
var markerAnimasiGaris;
var markerLabelGaris;
var posisiAnimasiGaris;
var cntAnimasiGaris;
var taskAnimasiGaris;

function show_tracking(map) {
  // garis.setMap(map);
  for (var i = 0; i < garis.length; i++) {
    garis[i].setMap(map);
  }
  // posisiAnimasiGaris = rute;
  cntAnimasiGaris = 0;
  if (markerAnimasiGaris) {
    markerAnimasiGaris.setMap(null);
  }
  if (markerLabelGaris) {
    markerLabelGaris.setMap(null);
  }
  if (taskAnimasiGaris) {
    taskAnimasiGaris.stop(taskAG);
    taskAnimasiGaris = new Ext.util.TaskRunner();
    taskAnimasiGaris.start(taskAG);
    // console.log('restart animasi');
  } else {
    taskAnimasiGaris = new Ext.util.TaskRunner();
    taskAnimasiGaris.start(taskAG);
    // console.log('star animasi');
  }

  // var tanda = new google.maps.Marker({
  //   position : new google.maps.LatLng(data.lat,data.lng),
  //   // map : peta1.getMap(),
  //   //*
  //   icon : {
  //       path: 'm -2.02025,5.2254321 0,1.9999997 -1,0 0,6.0000012 6.0312504,0.09375 0,-6.0000012 -1,0 0,-1.9999997 -4.0312504,-0.09375 z M 0.01100037,-12.693634 c -1.00000038,0 -1.17097237,0.331348 -2.00000037,2 -0.829028,1.6686508 -2.96875,8.0128161 -2.96875,8.0128161 l -0.03125,0 0,0.0625 0,19.9375009 10.0000004,0 0,-19.9375009 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.3441653 -2.96875,-8.0128161 -0.829028,-1.668652 -1,-2 -2.00000003,-2 z',
  //       // path: pth,
  //       scale: 1,
  //       rotation : parseFloat(data.head), //+parseFloat(cor),		// koreksi
  //       strokeColor: 'black',
  //       strokeWeight: 1,
  //       fillColor: '#FF0000',
  //       fillOpacity: 0.7
  //     }
  //   //*/
  //   });
}

var taskAG = {
  run: function () {
    if (posisiAnimasiGaris) {
      // console.log('posisiAnimasiGaris.length', posisiAnimasiGaris.length);
      // console.log('cntAnimasiGaris', cntAnimasiGaris);
      if (markerAnimasiGaris) {
        markerAnimasiGaris.setMap(null);
      }
      if (markerLabelGaris) {
        markerLabelGaris.setMap(null);
      }
      // var test_label = document.createElement("span");
      // test_label.style.backgroundColor = "red";
      // var node = document.createTextNode(posisiAnimasiGaris[cntAnimasiGaris].name + " :: " + posisiAnimasiGaris[cntAnimasiGaris].time);
      // test_label.appendChild(node);
      var animasiGaris = new google.maps.Marker({
        position: new google.maps.LatLng(posisiAnimasiGaris[cntAnimasiGaris].lat, posisiAnimasiGaris[cntAnimasiGaris].lng),
        map: atlas,
        icon: {
          path: 'm -2.02025,5.2254321 0,1.9999997 -1,0 0,6.0000012 6.0312504,0.09375 0,-6.0000012 -1,0 0,-1.9999997 -4.0312504,-0.09375 z M 0.01100037,-12.693634 c -1.00000038,0 -1.17097237,0.331348 -2.00000037,2 -0.829028,1.6686508 -2.96875,8.0128161 -2.96875,8.0128161 l -0.03125,0 0,0.0625 0,19.9375009 10.0000004,0 0,-19.9375009 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.3441653 -2.96875,-8.0128161 -0.829028,-1.668652 -1,-2 -2.00000003,-2 z',
          scale: 1,
          rotation: parseFloat(posisiAnimasiGaris[cntAnimasiGaris].head),
          strokeColor: 'black',
          strokeWeight: 1,
          fillColor: '#000000',
          fillOpacity: 0.7,
          // labelClass: "my-custom-class-for-label", // your desired CSS class
          // labelInBackground: true,
          // labelOrigin: new google.maps.Point(50, 50)
        },
        // icon: {
        //   url: createMarker(250, 25, 0),
        //   labelOrigin: new google.maps.Point(50, 50)
        // },
        // label: {
        //   text: posisiAnimasiGaris[cntAnimasiGaris].name + " :: " + posisiAnimasiGaris[cntAnimasiGaris].time,
        //   // text: test_label,
        //   color: '#000000',
        //   fontSize: '16px',
        //   fontWeight: 'bold'
        // },
        id: 'animasi_' + posisiAnimasiGaris[cntAnimasiGaris].lat + '_' + posisiAnimasiGaris[cntAnimasiGaris].lng
      });
      // var labelGaris = new MarkerWithLabel({
      //   position: new google.maps.LatLng(posisiAnimasiGaris[cntAnimasiGaris].lat, posisiAnimasiGaris[cntAnimasiGaris].lng),
      //   map: atlas,
      //   labelContent: posisiAnimasiGaris[cntAnimasiGaris].name + " :: " + posisiAnimasiGaris[cntAnimasiGaris].time,
      //   labelAnchor: new google.maps.Point(22, 0),
      //   labelClass: "labels", // the CSS class for the label
      //   labelStyle: {opacity: 0.75}
      // });
      // console.log('posisiAnimasiGaris['+cntAnimasiGaris+'].name', posisiAnimasiGaris[cntAnimasiGaris].name);
      var labelGaris = new MapLabel({
        text: posisiAnimasiGaris[cntAnimasiGaris].name + " :: " + posisiAnimasiGaris[cntAnimasiGaris].time,
        position: new google.maps.LatLng(posisiAnimasiGaris[cntAnimasiGaris].lat, posisiAnimasiGaris[cntAnimasiGaris].lng),
        map: atlas,
        fontSize: 12,
        fontColor: '#ffffff',
        strokeWeight: 5,
        strokeColor: '#000000',
        align: 'left',
        zIndex: '-1'
      });
      // mapLabel.set('position', new google.maps.LatLng(34.03, -118.235));
      // var labelGaris = new google.maps.Marker;
      // labelGaris.bindTo('map', mapLabel);
      // labelGaris.bindTo('position', mapLabel);

      markerAnimasiGaris = animasiGaris;
      markerLabelGaris = labelGaris;
      cntAnimasiGaris++;
      if (cntAnimasiGaris >= posisiAnimasiGaris.length) {
        cntAnimasiGaris = 0
      };

      // create_infowindow(tanda, data, index);
      // create_infowindow(animasiGaris, posisiAnimasiGaris[cntAnimasiGaris], cntAnimasiGaris, 1);
    }
  },
  interval: 500
};

function createMarker(width, height, radius) {
  var canvas, context;
  canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext("2d");
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(255,255,0,1)";
  context.strokeStyle = "rgba(0,0,0,1)";
  context.beginPath();
  context.moveTo(radius, 0);
  context.lineTo(width - radius, 0);
  context.quadraticCurveTo(width, 0, width, radius);
  context.lineTo(width, height - radius);
  context.quadraticCurveTo(width, height, width - radius, height);
  context.lineTo(radius, height);
  context.quadraticCurveTo(0, height, 0, height - radius);
  context.lineTo(0, radius);
  context.quadraticCurveTo(0, 0, radius, 0);
  context.closePath();
  context.fill();
  context.stroke();
  return canvas.toDataURL();
}

/* ===== end of Tracking ===== */

function resetCenterVessel(map) {
  // console.log(this.markers);
  // var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < marker_marker.length; i++) {
    if (marker_marker[i].getVisible()) {
      bounds.extend(marker_marker[i].getPosition());
    }
  }
  if (panel_ship != undefined) panel_ship.collapse();
  map.fitBounds(bounds);
  map.setZoom(5);



}

function resetCenterTracking(map) {
  // console.log('rute = ', rute);
  var maxLat = -360,
    minLat = 360;
  var maxLng = -360,
    minLng = 360;
  for (var i = 0; i < rute.length; i++) {
    var latlng = new google.maps.LatLng(rute[i].lat, rute[i].lng);
    if (rute[i].lat > maxLat) {
      maxLat = rute[i].lat;
      indexMaxLat = i
    }
    if (rute[i].lat < minLat) {
      minLat = rute[i].lat;
      indexMinLat = i
    }
    if (rute[i].lng > maxLng) {
      maxLng = rute[i].lng;
      indexMaxLng = i
    }
    if (rute[i].lng < minLng) {
      minLng = rute[i].lng;
      indexMinLng = i
    }
    bounds.extend(latlng);
  }
  var centerLatLng = new google.maps.LatLng(((maxLat + minLat) / 2), ((maxLng + minLng) / 2));

  var MAX_ZOOM = map.mapTypes.get(map.getMapTypeId()).maxZoom || 21;
  var MIN_ZOOM = map.mapTypes.get(map.getMapTypeId()).minZoom || 0;

  var ne = map.getProjection().fromLatLngToPoint(new google.maps.LatLng(maxLat, maxLng));
  var sw = map.getProjection().fromLatLngToPoint(new google.maps.LatLng(minLat, minLng));

  var worldCoordWidth = Math.abs(ne.x - sw.x);
  var worldCoordHeight = Math.abs(ne.y - sw.y);

  //Fit padding in pixels
  var FIT_PAD = 40;
  var zoomDym = 0;
  for (var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom) {
    if (worldCoordWidth * (1 << zoom) + 2 * FIT_PAD < $(map.getDiv()).width() &&
      worldCoordHeight * (1 << zoom) + 2 * FIT_PAD < $(map.getDiv()).height()) {
      zoomDym = zoom;
      // console.log('zoomDym = ', zoomDym);
      break;
    }
  }
  map.fitBounds(bounds);
  map.setCenter(centerLatLng);
  map.setZoom(zoomDym);
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
var ship = [];
var aset_parameter;


var selmod = Ext.create('Ext.selection.CheckboxModel', {
  listeners: {
    // handler: function(checkbox, checked) {
    //   if (checked) {
    //     checkbox.el.setStyle("color","red");
    //     //checkbox.setBoxLabel('<span style="color:red">MyCheckbox</span>');
    //   } else {
    //     checkbox.el.setStyle("color","green");
    //     //checkbox.setBoxLabel('<span style="color:green">MyCheckbox</span>');
    //   }
    // },
    selectionchange: function (sm, selections) {
      // console.log('sm', sm);
      // console.log('selections', selections);
      var hasil = tabel_daftar_kapal.getView().getSelectionModel().getSelection();
      // console.log('pencet ');;

      show_tracking(null);
      if (markerAnimasiGaris) {
        markerAnimasiGaris.setMap(null);
      }
      if (markerLabelGaris) {
        markerLabelGaris.setMap(null);
      }
      if (taskAnimasiGaris) {
        taskAnimasiGaris.stop(taskAG);
      }

      // console.log('ship_list', ship_list);
      ship = [];
      Ext.each(hasil, function (item) {
        ship.push(item.data.id);
      });
      // console.log('hasil', hasil);
      // console.log('ship', ship);
      if (ship.length > 1 || ship.length == 0) {
        Ext.getCmp('panel_form_tracking').setDisabled(true);
        Ext.getCmp('panel_form_work_order').setDisabled(true);
      } else {
        Ext.getCmp('panel_form_tracking').setDisabled(false);
        Ext.getCmp('panel_form_work_order').setDisabled(false);
      }
      //var text1 = "";
      //Ext.Array.each(selections, function (item) {
      //text1 = text1 + "," + item.get('id');
      //});
      //var text2 = text1.substr(1, text1.length);
      //console.log(text2);
      // console.log('ship', ship);
      // console.log('ship.toString()', ship.toString());
      if (ship.length > 0) {
        Ext.Ajax.request({
          url: 'get_visual_group.php',
          params: 'aset_id=' + ship.toString(),
          method: 'GET',
          success: function (data) {
            var isidat = Ext.JSON.decode(data.responseText);
            // console.log ('isidat', isidat);
            var vg_id;
            aset_parameter = isidat.result.aset_parameter;
            for (var i = 0; i < aset_parameter.length; i++) {
              // console.log(aset_parameter[i]);
              if (!vg_id) {
                vg_id = aset_parameter[i].vg_id;
              } else {
                vg_id = vg_id + ',' + aset_parameter[i].vg_id;
              }
            }
            // console.log('vg_id', vg_id);
            ws.send('vg:' + vg_id);
          }
        });
      } else {
        ws.send('vg:0');
        aset_parameter = {};
      }
    }
  }
});

var model_tracking_work_order = Ext.define('Work_Order', {
  extend: 'Ext.data.Model',
  fields: ['order_number', 'start_date', 'end_date', 'order_desc']
});

var store_tracking_work_order = Ext.create('Ext.data.Store', {
  model: model_tracking_work_order,
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: getAPI() + '/pelindo/work_order',
    method: 'GET'
  }
});

var tabel_tracking_work_order = Ext.create('Ext.grid.Panel', {
  title: 'History - Work Order',
  store: store_tracking_work_order,
  columns: [{
      text: 'Order Number',
      dataIndex: 'order_number',
      width: 150
    },
    {
      text: 'Start Date',
      dataIndex: 'start_date',
      width: 125
    },
    {
      text: 'End Date',
      dataIndex: 'end_date',
      width: 125
    },
    {
      text: 'Description',
      dataIndex: 'order_desc',
      flex: 1
    }
  ],
  height: 200,
  // width: 800,
  viewConfig: {
    loadingText: "Loading",
    loadMask: true,
    stripeRows: true,
    getRowClass: function (record, rowIndex, rowParams, store) {
      return 'multiline-row';
    }
  },
  listeners: {
    afterrender: function () {
      var tanggal = new Date();
      var str_tanggal = tanggal.getFullYear() + "-" + ("0" + (tanggal.getMonth() + 1)).slice(-2) + "-" + ("0" + tanggal.getDate()).slice(-2);
      // console.log("Window detail tanggal: " + str_tanggal);
      // console.log("Window onShow : "+detail_tanggal_index);
      // param = {tanggal:str_tanggal};
      // store_tracking_work_order.load({params:param});
    },
    celldblclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
      // console.log('record.getData()', record.getData());

      this.up('.window').hide();

      tracking_mask_work_order.show();
      show_tracking(null);
      if (markerAnimasiGaris) {
        markerAnimasiGaris.setMap(null);
      }
      if (markerLabelGaris) {
        markerLabelGaris.setMap(null);
      }
      if (taskAnimasiGaris) {
        taskAnimasiGaris.stop(taskAG);
      }
      var tg = new Date();

      // console.log(Ext.getCmp('ship_list_panel_id').isidata);
      // var vessel = Ext.getCmp('ship_list_panel_id').isidata;

      Ext.getCmp('wo_number').setValue(record.getData().order_number);
      // Ext.getCmp('wo_number').setVisible(true);
      Ext.getCmp('wo_start_date').setValue(record.getData().start_date);
      // Ext.getCmp('wo_start_date').setVisible(true);
      Ext.getCmp('wo_end_date').setValue(record.getData().end_date);
      // Ext.getCmp('wo_end_date').setVisible(true);
      Ext.getCmp('wo_desc').setValue(record.getData().order_desc);
      // Ext.getCmp('wo_desc').setVisible(true);
      var dt = {
        start: parseInt(new Date(record.getData().start_date).getTime() / 1000),
        end: parseInt(new Date(record.getData().end_date).getTime() / 1000),
        density: 'm',
        id: ship.toString(),
        type: 'vts'
      };
      // dt.start = parseInt(new Date(record.getData().start_date).getTime()/1000);
      // dt.end = parseInt(new Date(record.getData().end_date).getTime()/1000);
      // dt.density = 'm';

      Ext.Ajax.request({
        url: getAPI() + '/map/track-marine',
        method: 'get',
        params: dt,
        success: function (response) {
          var res = JSON.parse(response.responseText);

          // console.log('res', res);
          var d_rute = create_rute(res);
          // console.log('d_rute', d_rute);
          create_tracking(d_rute, res);
          show_tracking(atlas);
          resetCenterTracking(atlas);
          tracking_mask_work_order.hide();

        },
        callback: function (a, b, c) {

        }
      });

      tracking_mask_work_order.hide();
    }
  },
  flex: 1
  // renderTo: Ext.getBody()
});

var window_tracking_work_order = Ext.create('Ext.window.Window', {
  title: 'Work Order',
  width: 800,
  modal: true,
  closable: false,
  layout: {
    type: 'fit',
    align: 'stretch'
  },
  listeners: {
    // boxready: function(){
    //   // var tanggal = new Date();
    //   // var datestring = ("0" + tanggal.getDate()).slice(-2) + "-" + ("0"+(tanggal.getMonth()+1)).slice(-2) + "-" +
    //   // tanggal.getFullYear() + " " + ("0" + tanggal.getHours()).slice(-2) + ":" + ("0" + tanggal.getMinutes()).slice(-2);
    //   // console.log("datestring", datestring);
    // },
    // show: function(panel){
    //   var tanggal = new Date();
    //   var str_tanggal = tanggal.getFullYear() + "-" + ("0"+(tanggal.getMonth()+1)).slice(-2) + "-" + ("0" + tanggal.getDate()).slice(-2);
    //   // console.log("Window detail tanggal: " + str_tanggal);
    //   // console.log("Window onShow : "+detail_tanggal_index);
    //   param = {tanggal:str_tanggal};
    //   store_tracking_work_order.load({params:param});
    // }
  },
  items: [{
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
        fieldLabel: 'Order Date',
        xtype: 'datefield',
        id: 'order_date',
        name: 'ord_date',
        format: 'd-M-Y',
        // value: new Date(),
        maxValue: new Date(),
        vtype: 'daterange',
        submitFormat: 'Y-m-d',
        listeners: {
          change: function () {
            str_tanggal = Ext.Date.format(this.getValue(), 'Y-m-d');
            // console.log("str_tanggal", str_tanggal);
            param = {
              tanggal: str_tanggal
            };
            store_tracking_work_order.load({
              params: param
            });
          }
        }
      },
      tabel_tracking_work_order
    ]

  }],
  buttons: [{
    text: 'Close',
    handler: function () {
      this.up('.window').hide();
    }
  }]
});

var panel_form_tracking = Ext.create('Ext.form.Panel', {
  title: 'Tracking by Periode',
  bodyPadding: 5,
  layout: 'anchor',
  id: 'panel_form_tracking',
  defaults: {
    anchor: '100%'
  },
  items: [{
      xtype: 'radiogroup',
      fieldLabel: 'Tracking',
      id: 'track_menu',
      name: 'tr_menu',
      columns: 1,
      items: [{
          boxLabel: 'Last 24H',
          name: 'track_period',
          inputValue: '24h',
          checked: true
        },
        {
          boxLabel: 'Today',
          name: 'track_period',
          inputValue: 'today'
        },
        {
          boxLabel: 'Periode',
          name: 'track_period',
          inputValue: 'period',
          reference: 'periode'
        }
        // {boxLabel: 'Work Order', name: 'track_period', inputValue: 'work_order', reference : 'work_order'}
      ],
      listeners: {
        change: function (a, newValue, oldValue) {
          // console.log(newValue,oldValue);
          if (newValue.track_period == 'period') {
            // Ext.getCmp('track_start').setDisabled(false);
            // Ext.getCmp('track_end').setDisabled(false);
            Ext.getCmp('track_date').setDisabled(false);
            Ext.getCmp('track_start_time').setDisabled(false);
            Ext.getCmp('track_end_time').setDisabled(false);
            // Ext.getCmp('track_date').setHidden(false);
            // Ext.getCmp('track_start_time').setHidden(false);
            // Ext.getCmp('track_end_time').setHidden(false);
            // console.log('disable');
          }
          // else if (newValue.track_period == 'work_order') {
          //   // Ext.getCmp('list_work_order').setDisabled(false);
          // }
          else {
            // Ext.getCmp('track_start').setDisabled(true);
            // Ext.getCmp('track_end').setDisabled(true);
            Ext.getCmp('track_date').setDisabled(true);
            Ext.getCmp('track_start_time').setDisabled(true);
            Ext.getCmp('track_end_time').setDisabled(true);
            // Ext.getCmp('track_date').setHidden(true);
            // Ext.getCmp('track_start_time').setHidden(true);
            // Ext.getCmp('track_end_time').setHidden(true);

            // Ext.getCmp('list_work_order').setDisabled(true);
          }
        }
      }
    },
    {
      fieldLabel: 'Track Date',
      xtype: 'datefield',
      disabled: 'true',
      // hidden: 'true',
      id: 'track_date',
      name: 'tr_date',
      format: 'd-M-Y',
      // value: new Date(),
      maxValue: new Date(),
      vtype: 'daterange',
      // endDateField: 'track_end',
      // submitFormat:'timestamp',
      submitFormat: 'Y-m-d'
      // allowBlank: false
    },
    {
      fieldLabel: 'Start Time',
      xtype: 'timefield',
      disabled: 'true',
      // hidden: 'true',
      id: 'track_start_time',
      name: 'tr_start_time',
      increment: 1,
      value: '00:00',
      format: 'H:i'
    },
    {
      fieldLabel: 'End Time',
      xtype: 'timefield',
      disabled: 'true',
      // hidden: 'true',
      id: 'track_end_time',
      name: 'tr_end_time',
      increment: 1,
      value: new Date(),
      format: 'H:i'
    },
    // {
    //   xtype: 'button',
    //   text: '<span style="color:black">by Work Order</span>',
    //   anchor: '100%',
    //   handler: function() {
    //     window_tracking_work_order.show();
    //   }
    // }
  ],

  // Reset and Submit buttons
  buttons: [{

    text: 'Submit',
    formBind: true, //only enabled once the form is valid
    disabled: true,
    handler: function () {

      // console.log(taskBuntut);
      // if (buntut) buntut.stop();

      var form = this.up('form').getForm();
      if (form.isValid()) {
        tracking_mask_periode.show();

        show_tracking(null);
        if (markerAnimasiGaris) {
          markerAnimasiGaris.setMap(null);
        }
        if (markerLabelGaris) {
          markerLabelGaris.setMap(null);
        }
        if (taskAnimasiGaris) {
          taskAnimasiGaris.stop(taskAG);
        }
        var valid = false;
        var tg = new Date();
        // console.log(tg.getTime());

        // console.log('dipencet');
        // console.log(this);
        // console.log(Ext.getCmp('ship_list_panel_id').isidata);
        var vessel = Ext.getCmp('ship_list_panel_id').isidata;
        var dt = form.getValues();

        if (dt.track_period === '24h') {
          // console.log('24 jam');
          dt.end = parseInt(tg.getTime() / 1000);
          dt.start = dt.end - 86400;
          // console.log('waktu sekarang (epcohtime) => ',Math.floor(new Date().getTime() /1000) );
          dt.density = 'm';

          if (dt.start && dt.end && dt.density) valid = true;
        } else if (dt.track_period === 'today') {
          // console.log('to day');
          dt.start = parseInt(new Date(tg.getFullYear() + '-' + (tg.getMonth() + 1) + '-' + tg.getDate() + ' 00:00:00').getTime() / 1000);
          dt.end = parseInt(tg.getTime() / 1000);
          dt.density = 'm';

          if (dt.start && dt.end && dt.density) valid = true;
        } else {
          // console.log('periode');
          // dt.start = parseInt(new Date(dt.tr_start + ' 00:00:00' ).getTime()/1000);
          // dt.end = parseInt(new Date(dt.tr_end + ' 00:00:00' ).getTime()/1000);
          // console.log('dt.tr_start_time', dt.tr_start_time);
          // console.log('dt.tr_end_time', dt.tr_end_time);
          // dt.start = parseInt(new Date(dt.tr_date + ' 00:00:00' ).getTime()/1000);
          // dt.end = parseInt(new Date(dt.tr_date + ' 23:59:59' ).getTime()/1000);
          dt.start = parseInt(new Date(dt.tr_date + ' ' + dt.tr_start_time).getTime() / 1000);
          dt.end = parseInt(new Date(dt.tr_date + ' ' + dt.tr_end_time).getTime() / 1000);
          dt.density = 'm';
          // console.log('dt.tr_date', dt.tr_date);
          // console.log('dt.start', dt.start);
          // console.log('dt.end', dt.end);
          // console.log('dt.density', dt.density);

          if (dt.start && dt.end && dt.density) valid = true;
        }
        dt['id'] = ship.toString();
        dt['type'] = 'vts';
        delete dt.track_period;
        // delete dt.tr_start;
        // delete dt.tr_end;
        delete dt.tr_date;

        // console.log('valid', valid);
        if (valid) {
          Ext.Ajax.request({
            url: getAPI() + '/map/track-marine',
            method: 'get',
            params: dt,
            success: function (response) {
              var res = JSON.parse(response.responseText);

              // console.log('res', res);
              var d_rute = create_rute(res);
              create_tracking(d_rute, res);
              show_tracking(atlas);
              resetCenterTracking(atlas);
              tracking_mask_periode.hide();

            },
            callback: function (a, b, c) {

            }
          });
          // form.reset();
        } else {
          alert("Please complete the form !");
          tracking_mask_periode.hide();
        }
        // store_fuel_bunker.reload();

      }
    }
  }],
  // renderTo: Ext.getBody()
});

var val_order_number;
var val_order_start_date;
var val_order_end_date;
var val_order_desc;

var panel_form_work_order = Ext.create('Ext.form.Panel', {
  title: 'Tracking by Work Order',
  bodyPadding: 5,
  id: 'panel_form_work_order',
  layout: 'anchor',
  defaults: {
    anchor: '100%'
  },
  items: [{
      xtype: 'button',
      text: '<span style="color:black">Select Work Order</span>',
      anchor: '100%',
      handler: function () {
        window_tracking_work_order.show();
      }
    },
    {
      fieldLabel: 'Order Number',
      fieldStyle: "font-weight:bold;",
      xtype: 'displayfield',
      id: 'wo_number',
      // hidden: true,
      value: ''
    },
    {
      fieldLabel: 'Start Date',
      fieldStyle: "font-weight:bold;",
      xtype: 'displayfield',
      id: 'wo_start_date',
      // hidden: true,
      value: ''
    },
    {
      fieldLabel: 'End Date',
      fieldStyle: "font-weight:bold;",
      xtype: 'displayfield',
      id: 'wo_end_date',
      // hidden: true,
      value: ''
    },
    {
      fieldLabel: 'Description',
      fieldStyle: "font-weight:bold;",
      xtype: 'displayfield',
      id: 'wo_desc',
      // hidden: true,
      value: ''
    }
  ]
});

var tracking_mask_periode = new Ext.LoadMask({
  msg: 'Please wait...',
  target: panel_form_tracking
});

var tracking_mask_work_order = new Ext.LoadMask({
  msg: 'Please wait...',
  target: panel_form_work_order
});

Ext.apply(Ext.form.field.VTypes, {
  daterange: function (val, field) {
    var date = field.parseDate(val);

    if (!date) {
      return false;
    }
    if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
      var start = field.up('form').down('#' + field.startDateField);
      start.setMaxValue(date);
      start.validate();
      this.dateRangeMax = date;
    } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
      var end = field.up('form').down('#' + field.endDateField);
      end.setMinValue(date);
      end.validate();
      this.dateRangeMin = date;
    }
    /*
     * Always return true since we're only using this vtype to set the
     * min/max allowed values (these are tested for after the vtype test)
     */
    return true;
  },
  daterangeText: 'Start date must be less than end date',
});


var tabel_daftar_kapal = Ext.create('Ext.grid.Panel', {
  store: store_daftar_kapal,
  flex: 1,
  selModel: selmod,
  columns: [{
      text: "Id",
      hidden: true,
      width: 30,
      dataIndex: 'id'
    },
    {
      text: "Name",
      //width: 120,
      flex: 1,
      dataIndex: 'name'
    },
    {
      text: "",
      // flex: 1,
      width: 30,
      dataIndex: "attribute",
      renderer: function (value) {
        value = JSON.parse(value);
        // console.log('value', value['color']);
        return '<span style="background-color:' + value['color'] + ';height:15px;width:15px;border:1px solid black;display:block;">&nbsp</span>';
      }
    }
  ],
  listeners: {
    afterrender: function (thisObj, eOpts) {
      var sm = thisObj.getSelectionModel();
      sm.selectAll(true);
      // console.log('test');

      var hasil = tabel_daftar_kapal.getView().getSelectionModel().getSelection();

      ship = [];
      Ext.each(hasil, function (item) {
        ship.push(item.data.id);
      });
      // console.log('hasil', hasil);
      // console.log('ship', ship);
      if (ship.length > 1 || ship.length == 0) {
        Ext.getCmp('panel_form_tracking').setDisabled(true);
        Ext.getCmp('panel_form_work_order').setDisabled(true);
      } else {
        Ext.getCmp('panel_form_tracking').setDisabled(false);
        Ext.getCmp('panel_form_work_order').setDisabled(false);
      }

      if (ship.length > 0) {
        Ext.Ajax.request({
          url: 'get_visual_group.php',
          params: 'aset_id=' + ship.toString(),
          method: 'GET',
          success: function (data) {
            var isidat = Ext.JSON.decode(data.responseText);
            // console.log ('isidat', isidat);
            var vg_id;
            aset_parameter = isidat.result.aset_parameter;
            for (var i = 0; i < aset_parameter.length; i++) {
              // console.log(aset_parameter[i]);
              if (!vg_id) {
                vg_id = aset_parameter[i].vg_id;
              } else {
                vg_id = vg_id + ',' + aset_parameter[i].vg_id;
              }
            }
            // console.log('vg_id', vg_id);
            ws.send('vg:' + vg_id);
          }
        });
      } else {
        ws.send('vg:0');
        aset_parameter = {};
      }
    }
  }
});

// var panel_tabel_daftar_kapal = Ext.create('Ext.form.Panel', {
//     title: 'Daftar Kapal',
//     bodyPadding: 5,
//     id: 'panel_tabel_daftar_kapal',
//     items: [tabel_daftar_kapal]
//   }
// );

var ship_list = {
  title: "Ship List",
  // title: "Tracking",
  id: 'ship_list_panel_id',
  split: true,
  region: 'east',
  width: 250,
  autoScroll: true,
  collapsible: true,
  collapsed: true,
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  border: false,
  items: [
    tabel_daftar_kapal,
    panel_form_tracking,
    panel_form_work_order
  ],
  listeners: {
    boxready: function () {
      // console.log('ship list ready');
      Ext.getCmp('panel_form_tracking').setDisabled(true);
      Ext.getCmp('panel_form_work_order').setDisabled(true);
    }
  }
}