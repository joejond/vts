Ext.Loader.setPath("Ext.ux", "ux/"), Ext.Loader.setConfig({
    enabled: !0
}), Ext.require(["*", "Ext.ux.GMapPanel", "Ext.grid.plugin.CellEditing", "Ext.ux.statusbar.StatusBar", "Ext.ux.WebSocket", "Ext.ux.WebSocketManager"]);
var model_daftar_kapal = Ext.define("Kapal", {
        extend: "Ext.data.Model",
        fields: ["name", "attribute", "number"]
    }),
    store_daftar_kapal = Ext.create("Ext.data.Store", {
        model: model_daftar_kapal,
        autoLoad: !0,
        proxy: {
            type: "ajax",
            api: {
                read: "ship_list.php"
            },
            reader: {
                type: "json",
                successPropertday: "success",
                root: "ship",
                messageProperty: "message"
            }
        }
    }),
    info_info = [],
    info_ves = [],
    muncul, atlas, hsl_soket, lokasi, TaskVessel, infowindow, garis = [],
    bounds, ws, panel_ship;
ws = Ext.create("Ext.ux.WebSocket", {
    url: getWS(),
    listeners: {
        open: function (ws) {},
        message: function (ws, data) {
            prosesDataSocket(JSON.parse(data))
        },
        close: function (ws) {}
    }
}), data_obj = {}, arr_dat = [];
var peta = {
    xtype: "gmappanel",
    region: "center",
    id: "mymap",
    zoomLevel: 5,
    gmapType: "map",
    mapConfOpts: ["enableScrollWheelZoom", "enableDoubleClickZoom", "enableDragging"],
    mapControls: ["GSmallMapControl", "GMapTypeControl"],
    setCenter: {
        lat: -2.141055,
        lng: 118.017285
    },
    listeners: {
        mapready: function (win, gmap) {
            atlas = gmap, bounds = new google.maps.LatLngBounds, (TaskVessel = new Ext.util.TaskRunner).start(taskUpdV)
        },
        boxready: function () {}
    }
};

function onClickPeta(map) {
    atlas.addListener("click", function () {
        resetCenterVessel(map), show_tracking(null), taskAnimasiGaris && taskAnimasiGaris.stop(taskAG), buntut && buntut.stop()
    })
}

function prosesDataSocket(data) {
    var hhh;
    data.monita.filter(function (d) {
        return 27 == d.type_tu || 28 == d.type_tu || 29 == d.type_tu || 30 == d.type_tu
    }).forEach(function (d) {
        if (arr_dat = [], 27 == d.type_tu)
            for (var i = 0; i < aset_parameter.length; i++)
                for (var j = 0; j < aset_parameter[i].tu_id.length; j++)
                    if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
                        aset_parameter[i].lat = d.value, aset_parameter[i].epoch = d.epochtime;
                        break
                    } if (28 == d.type_tu)
            for (var i = 0; i < aset_parameter.length; i++)
                for (var j = 0; j < aset_parameter[i].tu_id.length; j++)
                    if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
                        aset_parameter[i].lng = d.value, aset_parameter[i].epoch = d.epochtime;
                        break
                    } if (29 == d.type_tu)
            for (var i = 0; i < aset_parameter.length; i++)
                for (var j = 0; j < aset_parameter[i].tu_id.length; j++)
                    if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
                        aset_parameter[i].head = d.value, aset_parameter[i].epoch = d.epochtime;
                        break
                    } if (30 == d.type_tu)
            for (var i = 0; i < aset_parameter.length; i++)
                for (var j = 0; j < aset_parameter[i].tu_id.length; j++)
                    if (aset_parameter[i].tu_id[j].titik_ukur == d.titik_ukur) {
                        aset_parameter[i].speed = d.value, aset_parameter[i].epoch = d.epochtime;
                        break
                    }
    })
}
var marker_marker = [],
    taskUpdV = {
        run: function () {
            deleteTandaKapal(), proses_kapal(aset_parameter), setTandaOnMap(atlas)
        },
        interval: 3e3
    },
    taskBuntut, rute, animasiGaris, markerAnimasiGaris, markerLabelGaris, posisiAnimasiGaris, cntAnimasiGaris, taskAnimasiGaris;

function proses_kapal(d) {
    marker_marker = [];
    for (var i = 0; i < d.length; i++) d[i].lat && d[i].lng && marker_marker.push(addTandaKapal(d[i], i))
}

function addTandaKapal(data, index) {
    var date_val = new Date(1e3 * data.epoch),
        date_cur = new Date;
    date_val.getTime() + 6e5 >= date_cur.getTime() ? color_stroke = "black" : color_stroke = "red";
    var tanda = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.lng),
        icon: {
            path: "m -2.02025,5.2254321 0,1.9999997 -1,0 0,6.0000012 6.0312504,0.09375 0,-6.0000012 -1,0 0,-1.9999997 -4.0312504,-0.09375 z M 0.01100037,-12.693634 c -1.00000038,0 -1.17097237,0.331348 -2.00000037,2 -0.829028,1.6686508 -2.96875,8.0128161 -2.96875,8.0128161 l -0.03125,0 0,0.0625 0,19.9375009 10.0000004,0 0,-19.9375009 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.3441653 -2.96875,-8.0128161 -0.829028,-1.668652 -1,-2 -2.00000003,-2 z",
            scale: 1,
            rotation: parseFloat(data.head),
            strokeColor: color_stroke,
            strokeWeight: 1,
            fillColor: data.attribute.color,
            fillOpacity: .7
        }
    });
    return create_infowindow(tanda, data, index), tanda
}

function create_infowindow(t, d, index, mode) {
    var lati = parseFloat(d.lat) < 0 ? Math.abs(parseFloat(d.lat).toFixed(3)) + "&deg; S" : parseFloat(d.lat).toFixed(3) + "&deg; N",
        long = parseFloat(d.lng) < 0 ? Math.abs(parseFloat(d.lng).toFixed(3)) + "&deg; W" : parseFloat(d.lng).toFixed(3) + "&deg; E";
    info_ves[index] = "<h3>" + d.name + "</h3>", info_ves[index] += "<p>Position : " + lati + ", " + long + " </p>", info_ves[index] += "<p>Latitude : " + d.lat + " </p>", info_ves[index] += "<p>Longitude : " + d.lng + " </p>", info_ves[index] += "<p>Heading : " + d.head + " &#176;</p>", info_ves[index] += "<p>Speed : " + d.speed + " Knot</p>";
    var date_val = new Date(1e3 * d.epoch),
        date_cur = new Date;
    info_ves[index] += "<p>Last Update : " + Ext.Date.format(date_val, "d-m-Y H:i:s") + "</p>", date_val.getTime() + 6e5 >= date_cur.getTime() ? info_ves[index] += '<p>Health Status : <b><font color="green" size="3">OK</font></b></p>' : (info_ves[index] += '<p>Health Status : <b><font color="red" size="3">Bad</font></b>', info_ves[index] += '</br><i><font color="red" size="1">*Data tidak terkirim lebih dari 10 menit</font></i></p>'), info_info[index] = new google.maps.InfoWindow, mode ? (info_info[index].setContent(info_ves[index]), info_info[index].open(atlas, t)) : (google.maps.event.addListener(t, "mouseover", function () {
        info_info[index].close(), info_info[index].setContent(info_ves[index]), info_info[index].open(atlas, t)
    }), google.maps.event.addListener(t, "mouseout", function () {
        info_info[index].close()
    }))
}

function setTandaOnMap(map) {
    for (var i = 0; i < marker_marker.length; i++) marker_marker[i].setMap(map)
}

function clearTandaOnMap() {
    setTandaOnMap(null)
}

function showTandaKapal(map) {
    setTandaOnMap(map)
}

function deleteTandaKapal() {
    clearTandaOnMap(), marker_marker = []
}

function create_rute(d) {
    rute = [];
    var temp_rute = [];
    posisiAnimasiGaris = [];
    for (var i = 0; i < d.length; i++) temp_rute.push({
        lat: d[i]["GPS-Latitude"],
        lng: d[i]["GPS-Longitude"]
    }), posisiAnimasiGaris.push({
        lat: d[i]["GPS-Latitude"],
        lng: d[i]["GPS-Longitude"],
        head: d[i]["GPS-Heading"],
        speed: d[i]["GPS-Velocity"],
        name: d[i].nama,
        time: d[i].t,
        epoch: d[i].epochtime
    });
    return temp_rute
}

function create_tracking(d_rute, d_vessel) {
    for (var warna = ["#0000ff", "#660099", "#ff0000"], jml_rute = d_rute.length, persen_50 = Math.floor(.5 * jml_rute), persen_30 = Math.floor(.3 * jml_rute), persen_20 = Math.floor(.2 * jml_rute), rute1 = [], rute2 = [], rute3 = [], i = 0; i < persen_50; i++) rute1.push(d_rute[i]);
    for (var i = persen_50 - 1; i < persen_50 + persen_30; i++) rute2.push(d_rute[i]);
    for (var i = persen_50 + persen_30 - 1; i < jml_rute; i++) rute3.push(d_rute[i]);
    rute = d_rute;
    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 2.5
    };
    garis[0] = new google.maps.Polyline({
        path: rute1,
        icons: [{
            icon: lineSymbol,
            offset: "10%",
            repeat: "400px"
        }],
        strokeColor: warna[0],
        strokeOpacity: .4,
        strokeWeight: 3
    }), garis[1] = new google.maps.Polyline({
        path: rute2,
        icons: [{
            icon: lineSymbol,
            offset: "10%",
            repeat: "250px"
        }],
        strokeColor: warna[1],
        strokeOpacity: .6,
        strokeWeight: 3
    }), garis[2] = new google.maps.Polyline({
        path: rute3,
        icons: [{
            icon: lineSymbol,
            offset: "10%",
            repeat: "150px"
        }],
        strokeColor: warna[2],
        strokeOpacity: .8,
        strokeWeight: 3
    })
}

function show_tracking(map) {
    for (var i = 0; i < garis.length; i++) garis[i].setMap(map);
    cntAnimasiGaris = 0, markerAnimasiGaris && markerAnimasiGaris.setMap(null), markerLabelGaris && markerLabelGaris.setMap(null), taskAnimasiGaris ? (taskAnimasiGaris.stop(taskAG), (taskAnimasiGaris = new Ext.util.TaskRunner).start(taskAG)) : (taskAnimasiGaris = new Ext.util.TaskRunner).start(taskAG)
}
var taskAG = {
    run: function () {
        if (posisiAnimasiGaris) {
            markerAnimasiGaris && markerAnimasiGaris.setMap(null), markerLabelGaris && markerLabelGaris.setMap(null);
            var animasiGaris = new google.maps.Marker({
                    position: new google.maps.LatLng(posisiAnimasiGaris[cntAnimasiGaris].lat, posisiAnimasiGaris[cntAnimasiGaris].lng),
                    map: atlas,
                    icon: {
                        path: "m -2.02025,5.2254321 0,1.9999997 -1,0 0,6.0000012 6.0312504,0.09375 0,-6.0000012 -1,0 0,-1.9999997 -4.0312504,-0.09375 z M 0.01100037,-12.693634 c -1.00000038,0 -1.17097237,0.331348 -2.00000037,2 -0.829028,1.6686508 -2.96875,8.0128161 -2.96875,8.0128161 l -0.03125,0 0,0.0625 0,19.9375009 10.0000004,0 0,-19.9375009 0,-0.0625 -0.03125,0 c 0,0 -2.139722,-6.3441653 -2.96875,-8.0128161 -0.829028,-1.668652 -1,-2 -2.00000003,-2 z",
                        scale: 1,
                        rotation: parseFloat(posisiAnimasiGaris[cntAnimasiGaris].head),
                        strokeColor: "black",
                        strokeWeight: 1,
                        fillColor: "#000000",
                        fillOpacity: .7
                    },
                    id: "animasi_" + posisiAnimasiGaris[cntAnimasiGaris].lat + "_" + posisiAnimasiGaris[cntAnimasiGaris].lng
                }),
                labelGaris = new MapLabel({
                    text: posisiAnimasiGaris[cntAnimasiGaris].name + " :: " + posisiAnimasiGaris[cntAnimasiGaris].time,
                    position: new google.maps.LatLng(posisiAnimasiGaris[cntAnimasiGaris].lat, posisiAnimasiGaris[cntAnimasiGaris].lng),
                    map: atlas,
                    fontSize: 12,
                    fontColor: "#ffffff",
                    strokeWeight: 5,
                    strokeColor: "#000000",
                    align: "left",
                    zIndex: "-1"
                });
            markerAnimasiGaris = animasiGaris, markerLabelGaris = labelGaris, ++cntAnimasiGaris >= posisiAnimasiGaris.length && (cntAnimasiGaris = 0)
        }
    },
    interval: 500
};

function createMarker(width, height, radius) {
    var canvas, context;
    return (canvas = document.createElement("canvas")).width = width, canvas.height = height, (context = canvas.getContext("2d")).clearRect(0, 0, width, height), context.fillStyle = "rgba(255,255,0,1)", context.strokeStyle = "rgba(0,0,0,1)", context.beginPath(), context.moveTo(radius, 0), context.lineTo(width - radius, 0), context.quadraticCurveTo(width, 0, width, radius), context.lineTo(width, height - radius), context.quadraticCurveTo(width, height, width - radius, height), context.lineTo(radius, height), context.quadraticCurveTo(0, height, 0, height - radius), context.lineTo(0, radius), context.quadraticCurveTo(0, 0, radius, 0), context.closePath(), context.fill(), context.stroke(), canvas.toDataURL()
}

function resetCenterVessel(map) {
    for (var i = 0; i < marker_marker.length; i++) marker_marker[i].getVisible() && bounds.extend(marker_marker[i].getPosition());
    null != panel_ship && panel_ship.collapse(), map.fitBounds(bounds), map.setZoom(5)
}

function resetCenterTracking(map) {
    for (var maxLat = -360, minLat = 360, maxLng = -360, minLng = 360, i = 0; i < rute.length; i++) {
        var latlng = new google.maps.LatLng(rute[i].lat, rute[i].lng);
        rute[i].lat > maxLat && (maxLat = rute[i].lat, indexMaxLat = i), rute[i].lat < minLat && (minLat = rute[i].lat, indexMinLat = i), rute[i].lng > maxLng && (maxLng = rute[i].lng, indexMaxLng = i), rute[i].lng < minLng && (minLng = rute[i].lng, indexMinLng = i), bounds.extend(latlng)
    }
    for (var centerLatLng = new google.maps.LatLng((maxLat + minLat) / 2, (maxLng + minLng) / 2), MAX_ZOOM = map.mapTypes.get(map.getMapTypeId()).maxZoom || 21, MIN_ZOOM = map.mapTypes.get(map.getMapTypeId()).minZoom || 0, ne = map.getProjection().fromLatLngToPoint(new google.maps.LatLng(maxLat, maxLng)), sw = map.getProjection().fromLatLngToPoint(new google.maps.LatLng(minLat, minLng)), worldCoordWidth = Math.abs(ne.x - sw.x), worldCoordHeight = Math.abs(ne.y - sw.y), FIT_PAD = 40, zoomDym = 0, zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom)
        if (worldCoordWidth * (1 << zoom) + 80 < $(map.getDiv()).width() && worldCoordHeight * (1 << zoom) + 80 < $(map.getDiv()).height()) {
            zoomDym = zoom;
            break
        } map.fitBounds(bounds), map.setCenter(centerLatLng), map.setZoom(zoomDym)
}
var jum = "",
    peta1, markers = [],
    kapal_dipilih = [],
    jml_kapaldipilih, status_path = 0,
    paths = [],
    paths_loc = [],
    paths_latlon_tmp = [],
    paths_lat = [],
    paths_lon = [],
    jml_point_paths = 0,
    jmlpt = 0,
    data_koor1 = [],
    ship = [],
    aset_parameter, selmod = Ext.create("Ext.selection.CheckboxModel", {
        listeners: {
            selectionchange: function (sm, selections) {
                var hasil = tabel_daftar_kapal.getView().getSelectionModel().getSelection();
                show_tracking(null), markerAnimasiGaris && markerAnimasiGaris.setMap(null), markerLabelGaris && markerLabelGaris.setMap(null), taskAnimasiGaris && taskAnimasiGaris.stop(taskAG), ship = [], Ext.each(hasil, function (item) {
                    ship.push(item.data.id)
                }), ship.length > 1 || 0 == ship.length ? (Ext.getCmp("panel_form_tracking").setDisabled(!0), Ext.getCmp("panel_form_work_order").setDisabled(!0)) : (Ext.getCmp("panel_form_tracking").setDisabled(!1), Ext.getCmp("panel_form_work_order").setDisabled(!1)), ship.length > 0 ? Ext.Ajax.request({
                    url: "get_visual_group.php",
                    params: "aset_id=" + ship.toString(),
                    method: "GET",
                    success: function (data) {
                        var isidat = Ext.JSON.decode(data.responseText),
                            vg_id;
                        aset_parameter = isidat.result.aset_parameter;
                        for (var i = 0; i < aset_parameter.length; i++) vg_id = vg_id ? vg_id + "," + aset_parameter[i].vg_id : aset_parameter[i].vg_id;
                        ws.send("vg:" + vg_id)
                    }
                }) : (ws.send("vg:0"), aset_parameter = {})
            }
        }
    }),
    model_tracking_work_order = Ext.define("Work_Order", {
        extend: "Ext.data.Model",
        fields: ["order_number", "start_date", "end_date", "order_desc"]
    }),
    store_tracking_work_order = Ext.create("Ext.data.Store", {
        model: model_tracking_work_order,
        autoLoad: !0,
        proxy: {
            type: "ajax",
            url: getAPI() + "/pelindo/work_order",
            method: "GET"
        }
    }),
    tabel_tracking_work_order = Ext.create("Ext.grid.Panel", {
        title: "History - Work Order",
        store: store_tracking_work_order,
        columns: [{
            text: "Order Number",
            dataIndex: "order_number",
            width: 150
        }, {
            text: "Start Date",
            dataIndex: "start_date",
            width: 125
        }, {
            text: "End Date",
            dataIndex: "end_date",
            width: 125
        }, {
            text: "Description",
            dataIndex: "order_desc",
            flex: 1
        }],
        height: 200,
        viewConfig: {
            loadingText: "Loading",
            loadMask: !0,
            stripeRows: !0,
            getRowClass: function (record, rowIndex, rowParams, store) {
                return "multiline-row"
            }
        },
        listeners: {
            afterrender: function () {
                var tanggal = new Date,
                    str_tanggal = tanggal.getFullYear() + "-" + ("0" + (tanggal.getMonth() + 1)).slice(-2) + "-" + ("0" + tanggal.getDate()).slice(-2)
            },
            celldblclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
                this.up(".window").hide(), tracking_mask_work_order.show(), show_tracking(null), markerAnimasiGaris && markerAnimasiGaris.setMap(null), markerLabelGaris && markerLabelGaris.setMap(null), taskAnimasiGaris && taskAnimasiGaris.stop(taskAG);
                var tg = new Date;
                Ext.getCmp("wo_number").setValue(record.getData().order_number), Ext.getCmp("wo_start_date").setValue(record.getData().start_date), Ext.getCmp("wo_end_date").setValue(record.getData().end_date), Ext.getCmp("wo_desc").setValue(record.getData().order_desc);
                var dt = {
                    start: parseInt(new Date(record.getData().start_date).getTime() / 1e3),
                    end: parseInt(new Date(record.getData().end_date).getTime() / 1e3),
                    density: "m",
                    id: ship.toString(),
                    type: "vts"
                };
                Ext.Ajax.request({
                    url: getAPI() + "/map/track-marine",
                    method: "get",
                    params: dt,
                    success: function (response) {
                        var res = JSON.parse(response.responseText),
                            d_rute;
                        create_tracking(create_rute(res), res), show_tracking(atlas), resetCenterTracking(atlas), tracking_mask_work_order.hide()
                    },
                    callback: function (a, b, c) {}
                }), tracking_mask_work_order.hide()
            }
        },
        flex: 1
    }),
    window_tracking_work_order = Ext.create("Ext.window.Window", {
        title: "Work Order",
        width: 800,
        modal: !0,
        closable: !1,
        layout: {
            type: "fit",
            align: "stretch"
        },
        listeners: {},
        items: [{
            layout: {
                type: "vbox",
                align: "stretch"
            },
            items: [{
                fieldLabel: "Order Date",
                xtype: "datefield",
                id: "order_date",
                name: "ord_date",
                format: "d-M-Y",
                maxValue: new Date,
                vtype: "daterange",
                submitFormat: "Y-m-d",
                listeners: {
                    change: function () {
                        str_tanggal = Ext.Date.format(this.getValue(), "Y-m-d"), param = {
                            tanggal: str_tanggal
                        }, store_tracking_work_order.load({
                            params: param
                        })
                    }
                }
            }, tabel_tracking_work_order]
        }],
        buttons: [{
            text: "Close",
            handler: function () {
                this.up(".window").hide()
            }
        }]
    }),
    panel_form_tracking = Ext.create("Ext.form.Panel", {
        title: "Tracking by Periode",
        bodyPadding: 5,
        layout: "anchor",
        id: "panel_form_tracking",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "radiogroup",
            fieldLabel: "Tracking",
            id: "track_menu",
            name: "tr_menu",
            columns: 1,
            items: [{
                boxLabel: "Last 24H",
                name: "track_period",
                inputValue: "24h",
                checked: !0
            }, {
                boxLabel: "Today",
                name: "track_period",
                inputValue: "today"
            }, {
                boxLabel: "Periode",
                name: "track_period",
                inputValue: "period",
                reference: "periode"
            }],
            listeners: {
                change: function (a, newValue, oldValue) {
                    "period" == newValue.track_period ? (Ext.getCmp("track_date").setDisabled(!1), Ext.getCmp("track_start_time").setDisabled(!1), Ext.getCmp("track_end_time").setDisabled(!1)) : (Ext.getCmp("track_date").setDisabled(!0), Ext.getCmp("track_start_time").setDisabled(!0), Ext.getCmp("track_end_time").setDisabled(!0))
                }
            }
        }, {
            fieldLabel: "Track Date",
            xtype: "datefield",
            disabled: "true",
            id: "track_date",
            name: "tr_date",
            format: "d-M-Y",
            maxValue: new Date,
            vtype: "daterange",
            submitFormat: "Y-m-d"
        }, {
            fieldLabel: "Start Time",
            xtype: "timefield",
            disabled: "true",
            id: "track_start_time",
            name: "tr_start_time",
            increment: 1,
            value: "00:00",
            format: "H:i"
        }, {
            fieldLabel: "End Time",
            xtype: "timefield",
            disabled: "true",
            id: "track_end_time",
            name: "tr_end_time",
            increment: 1,
            value: new Date,
            format: "H:i"
        }],
        buttons: [{
            text: "Submit",
            formBind: !0,
            disabled: !0,
            handler: function () {
                var form = this.up("form").getForm();
                if (form.isValid()) {
                    tracking_mask_periode.show(), show_tracking(null), markerAnimasiGaris && markerAnimasiGaris.setMap(null), markerLabelGaris && markerLabelGaris.setMap(null), taskAnimasiGaris && taskAnimasiGaris.stop(taskAG);
                    var valid = !1,
                        tg = new Date,
                        vessel = Ext.getCmp("ship_list_panel_id").isidata,
                        dt = form.getValues();
                    "24h" === dt.track_period ? (dt.end = parseInt(tg.getTime() / 1e3), dt.start = dt.end - 86400, dt.density = "m", dt.start && dt.end && dt.density && (valid = !0)) : "today" === dt.track_period ? (dt.start = parseInt(new Date(tg.getFullYear() + "-" + (tg.getMonth() + 1) + "-" + tg.getDate() + " 00:00:00").getTime() / 1e3), dt.end = parseInt(tg.getTime() / 1e3), dt.density = "m", dt.start && dt.end && dt.density && (valid = !0)) : (dt.start = parseInt(new Date(dt.tr_date + " " + dt.tr_start_time).getTime() / 1e3), dt.end = parseInt(new Date(dt.tr_date + " " + dt.tr_end_time).getTime() / 1e3), dt.density = "m", dt.start && dt.end && dt.density && (valid = !0)), dt.id = ship.toString(), dt.type = "vts", delete dt.track_period, delete dt.tr_date, valid ? Ext.Ajax.request({
                        url: getAPI() + "/map/track-marine",
                        method: "get",
                        params: dt,
                        success: function (response) {
                            var res = JSON.parse(response.responseText),
                                d_rute;
                            create_tracking(create_rute(res), res), show_tracking(atlas), resetCenterTracking(atlas), tracking_mask_periode.hide()
                        },
                        callback: function (a, b, c) {}
                    }) : (alert("Please complete the form !"), tracking_mask_periode.hide())
                }
            }
        }]
    }),
    val_order_number, val_order_start_date, val_order_end_date, val_order_desc, panel_form_work_order = Ext.create("Ext.form.Panel", {
        title: "Tracking by Work Order",
        bodyPadding: 5,
        id: "panel_form_work_order",
        layout: "anchor",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "button",
            text: '<span style="color:black">Select Work Order</span>',
            anchor: "100%",
            handler: function () {
                window_tracking_work_order.show()
            }
        }, {
            fieldLabel: "Order Number",
            fieldStyle: "font-weight:bold;",
            xtype: "displayfield",
            id: "wo_number",
            value: ""
        }, {
            fieldLabel: "Start Date",
            fieldStyle: "font-weight:bold;",
            xtype: "displayfield",
            id: "wo_start_date",
            value: ""
        }, {
            fieldLabel: "End Date",
            fieldStyle: "font-weight:bold;",
            xtype: "displayfield",
            id: "wo_end_date",
            value: ""
        }, {
            fieldLabel: "Description",
            fieldStyle: "font-weight:bold;",
            xtype: "displayfield",
            id: "wo_desc",
            value: ""
        }]
    }),
    tracking_mask_periode = new Ext.LoadMask({
        msg: "Please wait...",
        target: panel_form_tracking
    }),
    tracking_mask_work_order = new Ext.LoadMask({
        msg: "Please wait...",
        target: panel_form_work_order
    });
Ext.apply(Ext.form.field.VTypes, {
    daterange: function (val, field) {
        var date = field.parseDate(val);
        if (!date) return !1;
        if (!field.startDateField || this.dateRangeMax && date.getTime() == this.dateRangeMax.getTime()) {
            if (field.endDateField && (!this.dateRangeMin || date.getTime() != this.dateRangeMin.getTime())) {
                var end = field.up("form").down("#" + field.endDateField);
                end.setMinValue(date), end.validate(), this.dateRangeMin = date
            }
        } else {
            var start = field.up("form").down("#" + field.startDateField);
            start.setMaxValue(date), start.validate(), this.dateRangeMax = date
        }
        return !0
    },
    daterangeText: "Start date must be less than end date"
});
var tabel_daftar_kapal = Ext.create("Ext.grid.Panel", {
        store: store_daftar_kapal,
        flex: 1,
        selModel: selmod,
        columns: [{
            text: "Id",
            hidden: !0,
            width: 30,
            dataIndex: "id"
        }, {
            text: "Name",
            flex: 1,
            dataIndex: "name"
        }, {
            text: "Status",
            flex: 1,
            width: 30,
            hidden: !0,
            align: "center",
            dataIndex: "number",
            renderer: function (value) {
                return value = JSON.parse(value)
            }
        }, {
            text: "",
            width: 30,
            align: "center",
            dataIndex: "attribute",
            renderer: function (value) {
                return '<span align="center" style="background-color:' + (value = JSON.parse(value)).color + ';height:15px;width:15px;border:1px solid black;display:block;">&nbsp</span>'
            }
        }],
        listeners: {
            afterrender: function (thisObj, eOpts) {
                var sm;
                thisObj.getSelectionModel().selectAll(!0);
                var hasil = tabel_daftar_kapal.getView().getSelectionModel().getSelection();
                ship = [], Ext.each(hasil, function (item) {
                    ship.push(item.data.id)
                }), ship.length > 1 || 0 == ship.length ? (Ext.getCmp("panel_form_tracking").setDisabled(!0), Ext.getCmp("panel_form_work_order").setDisabled(!0)) : (Ext.getCmp("panel_form_tracking").setDisabled(!1), Ext.getCmp("panel_form_work_order").setDisabled(!1)), ship.length > 0 ? Ext.Ajax.request({
                    url: "get_visual_group.php",
                    params: "aset_id=" + ship.toString(),
                    method: "GET",
                    success: function (data) {
                        var isidat = Ext.JSON.decode(data.responseText),
                            vg_id;
                        aset_parameter = isidat.result.aset_parameter;
                        for (var i = 0; i < aset_parameter.length; i++) vg_id = vg_id ? vg_id + "," + aset_parameter[i].vg_id : aset_parameter[i].vg_id;
                        ws.send("vg:" + vg_id)
                    }
                }) : (ws.send("vg:0"), aset_parameter = {})
            }
        }
    }),
    ship_list = {
        title: "Ship List",
        id: "ship_list_panel_id",
        split: !0,
        region: "east",
        width: 250,
        autoScroll: !0,
        collapsible: !0,
        collapsed: !0,
        layout: {
            type: "vbox",
            pack: "start",
            align: "stretch"
        },
        border: !1,
        items: [tabel_daftar_kapal, panel_form_tracking/*, panel_form_work_order*/],
        listeners: {
            boxready: function () {
                Ext.getCmp("panel_form_tracking").setDisabled(!0), Ext.getCmp("panel_form_work_order").setDisabled(!0)
            }
        }
    };