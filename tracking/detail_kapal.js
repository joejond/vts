Ext.require(["*", "Ext.grid.plugin.CellEditing", "Ext.grid.*", "Ext.data.*", "Ext.util.*", "Ext.toolbar.Paging"]);
var dt = JSON.parse(atob(Ext.util.Cookies.get("marine"))),
    model_detail_kapal = Ext.define("detail_kapal", {
        extend: "Ext.data.Model",
        fields: ["PM-Door", "PM-VBatt", "PM-VCharg", "ME1-FM In", "ME1-FM Ov", "ME1-FM Tem", "ME2-FM In", "ME2-FM Ov", "ME2-FM Tem", "AE1-FM In", "AE1-FM Ov", "AE1-FM Tem", "AE2-FM In", "AE2-FM Ov", "AE2-FM Tem", "ME1-RPM", "ME1-RH", "ME2-RPM", "ME2-RH", "AE1-RPM", "AE1-RH", "AE2-RPM", "AE2-RH", "PE-Door", "PE-VCharg", "PE-VBatt", "GPS-Latitude", "GPS-Longitude", "GPS-Heading", "GPS-Velocity", "ME1 Speed", "ME2 Speed", "ME1 Fuel Press", "ME2 Fuel Press", "ME1 Fuel Rate", "ME2 Fuel Rate", "ME1 Fuel Temp", "ME2 Fuel Temp", "ME1 AVG Fuel Consumption", "ME2 AVG Fuel Consumption", "ME1 Load Engine", "ME2 Load Engine", "ME1 ECU Status", "ME2 ECU Status", "ME1 ECU Engine Hours 1", "ME1 ECU Engine Hours 2", "ME2 ECU Engine Hours 1", "ME2 ECU Engine Hours 2", "ME1 ECU Fuel Burned 1", "ME1 ECU Fuel Burned 2", "ME2 ECU Fuel Burned 1", "ME2 ECU Fuel Burned 2", "AE1 Speed", "AE2 Speed", "AE1 Fuel Press", "AE2 Fuel Press", "AE1 Fuel Rate", "AE2 Fuel Rate", "AE1 Fuel Temp", "AE2 Fuel Temp", "AE1 AVG Fuel Consumption", "AE2 AVG Fuel Consumption", "AE1 Load Engine", "AE2 Load Engine", "AE1 ECU Status", "AE2 ECU Status", "AE1 ECU Engine Hours 1", "AE1 ECU Engine Hours 2", "AE2 ECU Engine Hours 1", "AE2 ECU Engine Hours 2", "AE1 ECU Fuel Burned 1", "AE1 ECU Fuel Burned 2", "AE2 ECU Fuel Burned 1", "AE2 ECU Fuel Burned 2", {
            name: "t",
            type: "date"
        }]
    }),
    model_detail_kapal_detik = Ext.define("detail_kapal", {
        extend: "Ext.data.Model",
        fields: ["PM-Door", "PM-VBatt", "PM-VCharg", "ME1-FM In", "ME1-FM Ov", "ME1-FM Tem", "ME2-FM In", "ME2-FM Ov", "ME2-FM Tem", "AE1-FM In", "AE1-FM Ov", "AE1-FM Tem", "AE2-FM In", "AE2-FM Ov", "AE2-FM Tem", "ME1-RPM", "ME1-RH", "ME2-RPM", "ME2-RH", "AE1-RPM", "AE1-RH", "AE2-RPM", "AE2-RH", "PE-Door", "PE-VCharg", "PE-VBatt", "GPS-Latitude", "GPS-Longitude", "GPS-Heading", "GPS-Velocity", "ME1 Speed", "ME2 Speed", "ME1 Fuel Press", "ME2 Fuel Press", "ME1 Fuel Rate", "ME2 Fuel Rate", "ME1 Fuel Temp", "ME2 Fuel Temp", "ME1 AVG Fuel Consumption", "ME2 AVG Fuel Consumption", "ME1 Load Engine", "ME2 Load Engine", "ME1 ECU Status", "ME2 ECU Status", "ME1 ECU Engine Hours 1", "ME1 ECU Engine Hours 2", "ME2 ECU Engine Hours 1", "ME2 ECU Engine Hours 2", "ME1 ECU Fuel Burned 1", "ME1 ECU Fuel Burned 2", "ME2 ECU Fuel Burned 1", "ME2 ECU Fuel Burned 2", "AE1 Speed", "AE2 Speed", "AE1 Fuel Press", "AE2 Fuel Press", "AE1 Fuel Rate", "AE2 Fuel Rate", "AE1 Fuel Temp", "AE2 Fuel Temp", "AE1 AVG Fuel Consumption", "AE2 AVG Fuel Consumption", "AE1 Load Engine", "AE2 Load Engine", "AE1 ECU Status", "AE2 ECU Status", "AE1 ECU Engine Hours 1", "AE1 ECU Engine Hours 2", "AE2 ECU Engine Hours 1", "AE2 ECU Engine Hours 2", "AE1 ECU Fuel Burned 1", "AE1 ECU Fuel Burned 2", "AE2 ECU Fuel Burned 1", "AE2 ECU Fuel Burned 2", {
            name: "t",
            type: "date"
        }]
    }),
    comb_kapal1 = "",
    tgl_sel1 = "",
    id_kpl = "",
    nama_kpl = "",
    store_detail_kapal = Ext.create("Ext.data.Store", {
        model: model_detail_kapal,
        proxy: {
            type: "ajax",
            url: getAPI() + "/get_data_bima",
            method: "GET"
        },
        listeners: {
            beforeload: function (store, options) {},
            load: function(store, rec){
                // console.log("store_detail_kapal",rec);
                // console.log("ME1 ECU Status");
                atur_kolom(rec);
            }
        }
    }),
    store_detail_kapal_detik = Ext.create("Ext.data.Store", {
        model: model_detail_kapal_detik,
        proxy: {
            type: "ajax",
            url: getAPI() + "/get_data_bima",
            method: "GET"
        },
        listeners: {
            beforeload: function (store, options) {},
            load : function (store,rec) {
                // console.log(rec);
                atur_kolom(rec);
            }
        }
    }),
    detail_jam_index, 
    store_detail_jam = Ext.create("Ext.data.Store", {
        model: model_detail_kapal,
        proxy: {
            type: "ajax",
            url: getAPI() + "/get_data_bima",
            method: "GET"
        }
    }),
    tabel_detail_jam = Ext.create("Ext.grid.Panel", {
        id: "table_ship_detail",
        title: "Tabel Detail Jam",
        store: store_detail_kapal_detik,
        listeners: {
            afterrender: function () {},
            show: function () {
                console.log("[tabel_detail_jam] show:" + detail_jam_index + "user_id=" + dt.idu)
            }
        },
        columns: [{
            header: "Date Time",
            align: "center",
            width: 130,
            dataIndex: "t",
            renderer: Ext.util.Format.dateRenderer("Y-m-d H:i:s"),
            locked: !0
        }, {
            header: "Satelite Data",
            columns: [{
                header: "Latitude",
                align: "center",
                width: 50,
                dataIndex: "GPS-Latitude"
            }, {
                header: "Longitude",
                align: "center",
                width: 55,
                dataIndex: "GPS-Longitude"
            }, {
                header: "Speed",
                align: "center",
                width: 50,
                dataIndex: "GPS-Velocity"
            }, {
                header: "Heading",
                align: "center",
                width: 50,
                dataIndex: "GPS-Heading"
            }]
        }, {
            header: "PortSide Engine",  //Mekanik
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "ME1-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "ME1-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "ME1-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "ME1-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "ME1-RH"
            }]
        }, {
            header: "StarBoard Engine", //Electric
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "ME1 Speed"
            }, {
                header: "Fuel Temp",
                align: "center",
                width: 70,
                dataIndex: "ME1 Fuel Temp"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "ME1 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "ME1 ECU Engine Hours 1",
                hidden: true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "ME1 ECU Engine Hours 2",
                hidden: true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME1 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME1 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "ME1 ECU Fuel Burned 1",
                hidden: true

            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "ME1 ECU Fuel Burned 2",
                hidden: true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME1 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME1 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "StarBoard Engine", //Mekanik
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "ME2-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "ME2-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "ME2-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "ME2-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "ME2-RH"
            }]
        }, {
            header: "StarBoard Engine",
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "ME2 Speed"
            }, {
                header: "Fuel Temp",
                align: "center",
                width: 70,
                dataIndex: "ME2 Fuel Temp"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "ME2 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "ME2 ECU Engine Hours 1",
                hidden: true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "ME2 ECU Engine Hours 2",
                hidden: true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME2 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME2 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "ME2 ECU Fuel Burned 1",
                hidden: true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "ME2 ECU Fuel Burned 2",
                hidden: true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME2 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME2 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "PortSide GenSet",  //Mekanik
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "AE1-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "AE1-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "AE1-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "AE1-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "AE1-RH"
            }]
        }, {
            header: "StarBoard GenSet (AE1)", //Electric
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "AE1 Speed"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "AE1 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "AE1 ECU Engine Hours 1",
                hidden: true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "AE1 ECU Engine Hours 2",
                hidden: true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE1 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE1 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "AE1 ECU Fuel Burned 1",
                hidden: true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "AE1 ECU Fuel Burned 2",
                hidden: true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE1 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE1 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "StarBoard GenSet",
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "AE2-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "AE2-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "AE2-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "AE2-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "AE2-RH"
            }]
        }, {
            header: "StarBoard GenSet",
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "AE2 Speed"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "AE2 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "AE2 ECU Engine Hours 1",
                hidden : true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "AE2 ECU Engine Hours 2",
                hidden : true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE2 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE2 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "AE2 ECU Fuel Burned 1",
                hidden : true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "AE2 ECU Fuel Burned 2",
                hidden : true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE2 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE2 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "Panel",
            columns: [{
                header: "PM Battery",
                align: "center",
                width: 70,
                dataIndex: "PM-VBatt"
            }, {
                header: "PM Charger",
                align: "center",
                width: 70,
                dataIndex: "PM-VCharg"
            }, {
                header: "PM Door",
                align: "center",
                width: 70,
                dataIndex: "PM-Door"
            }, {
                header: "PE Battery",
                align: "center",
                width: 70,
                dataIndex: "PE-VBatt"
            }, {
                header: "PE Charger",
                align: "center",
                width: 70,
                dataIndex: "PE-VCharg"
            }, {
                header: "PE Door",
                align: "center",
                width: 70,
                dataIndex: "PE-Door"
            }]
        }],
        flex: 1
    }),
    model_combo_kapal1 = Ext.define("Kapal", {
        extend: "Ext.data.Model",
        fields: ["name", "id","attribute", "number"]
    }),
    store_combo_kapal1 = Ext.create("Ext.data.Store", {
        model: model_combo_kapal1,
        autoLoad: !0,
        proxy: {
            type: "ajax",
            url: getAPI() +"/pelindo/ship_list?uid="+dt.idu,
            method: "GET"
        },
        // proxy: {
        //     type: "ajax",
        //     api: {
        //         read: "ship_list.php"
        //     },
        //     reader: {
        //         type: "json",
        //         root: "ship",
        //         messageProperty: "message"
        //     }
        // }
    }),
    tabel_detail_kapal = Ext.create("Ext.grid.Panel", {
        id: "table_ship",
        title: "Data Ship",
        store: store_detail_kapal,
        flex: 4,
        listeners: {
            itemdblclick: function (selModel, record, item, index, e, eOpts) {
                var index_jam = record.getData().t;
                detail_jam_index = Ext.Date.format(index_jam, "Y-m-d H"); 
                window_detail_jam.show();
              
            },
            afterrender: function () {
            },
            render: function () {}
        },
        columns: [{
            header: "Date Time",
            width: 130,
            dataIndex: "t",
            renderer: Ext.util.Format.dateRenderer("Y-m-d H:i:s"),
            locked: !0
        }, {
            header: "Satelite Data",
            columns: [{
                header: "Latitude",
                align: "center",
                width: 50,
                dataIndex: "GPS-Latitude"
            }, {
                header: "Longitude",
                align: "center",
                width: 60,
                dataIndex: "GPS-Longitude"
            }, {
                header: "Speed",
                align: "center",
                width: 45,
                dataIndex: "GPS-Velocity"
            }, {
                header: "Heading",
                align: "center",
                width: 55,
                dataIndex: "GPS-Heading"
            }]
        }, {
            header: "PortSide Engine",
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "ME1-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "ME1-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "ME1-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "ME1-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "ME1-RH"
            }]
        }, {
            header: "PortSide Engine", //electric
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "ME1 Speed"
            }, {
                header: "Fuel Temp",
                align: "center",
                width: 70,
                dataIndex: "ME1 Fuel Temp"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "ME1 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "ME1 ECU Engine Hours 1",
                hidden: true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "ME1 ECU Engine Hours 2",
                hidden:true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME1 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME1 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "ME1 ECU Fuel Burned 1",
                hidden: true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "ME1 ECU Fuel Burned 2",
                hidden: true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME1 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME1 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "StarBoard Engine", //mekanik
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "ME2-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "ME2-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "ME2-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "ME2-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "ME2-RH"
            }]
        }, {
            header: "StarBoard Engine", //Electric
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "ME2 Speed"
            }, {
                header: "Fuel Temp",
                align: "center",
                width: 70,
                dataIndex: "ME2 Fuel Temp"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "ME2 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "ME2 ECU Engine Hours 1",
                hidden: true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "ME2 ECU Engine Hours 2",
                hidden: true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME2 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME2 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "ME2 ECU Fuel Burned 1",
                hidden:true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "ME2 ECU Fuel Burned 2",
                hidden:true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["ME2 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["ME2 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "PortSide GenSet",
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "AE1-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "AE1-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "AE1-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "AE1-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "AE1-RH"
            }]
        }, {
            header: "PortSide GenSet", //electric
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "AE1 Speed"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "AE1 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "AE1 ECU Engine Hours 1",
                hidden:true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "AE1 ECU Engine Hours 2",
                hidden:true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE1 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE1 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "AE1 ECU Fuel Burned 1",
                hidden:true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "AE1 ECU Fuel Burned 2",
                hidden:true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE1 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE1 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "StarBoard GenSet",
            columns: [{
                header: "FM-In",
                align: "center",
                width: 70,
                dataIndex: "AE2-FM In"
            }, {
                header: "FM-Ov",
                align: "center",
                width: 70,
                dataIndex: "AE2-FM Ov"
            }, {
                header: "FM-Temp",
                align: "center",
                width: 70,
                dataIndex: "AE2-FM Tem"
            }, {
                header: "RPM",
                align: "center",
                width: 70,
                dataIndex: "AE2-RPM"
            }, {
                header: "RunHours",
                align: "center",
                width: 70,
                dataIndex: "AE2-RH"
            }]
        }, {
            header: "StarBoard GenSet",
            columns: [{
                header: "Speed",
                align: "center",
                width: 70,
                dataIndex: "AE2 Speed"
            }, {
                header: "Load Engine",
                align: "center",
                width: 70,
                dataIndex: "AE2 Load Engine"
            }, {
                header: "Engine Hours 1",
                align: "center",
                width: 90,
                dataIndex: "AE2 ECU Engine Hours 1",
                hidden:true
            }, {
                header: "Engine Hours 2",
                align: "center",
                width: 90,
                dataIndex: "AE2 ECU Engine Hours 2",
                hidden:true
            }, {
                header: "Engine Hours",
                align: "center",
                width: 90,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE2 ECU Engine Hours 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE2 ECU Engine Hours 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.05 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }, {
                header: "Fuel Burned 1",
                align: "center",
                width: 80,
                dataIndex: "AE2 ECU Fuel Burned 1",
                hidden:true
            }, {
                header: "Fuel Burned 2",
                align: "center",
                width: 80,
                dataIndex: "AE2 ECU Fuel Burned 2",
                hidden:true
            }, {
                header: "Fuel Burned",
                align: "center",
                width: 80,
                renderer: function (value, metaData, record, row, col, store, gridView) {
                    var hex1 = record.data["AE2 ECU Fuel Burned 1"].toString(16).padStart(4, "0"),
                        hex2 = record.data["AE2 ECU Fuel Burned 2"].toString(16).padStart(4, "0"),
                        val;
                    return parseFloat(.5 * parseInt(hex2 + hex1, 16)).toFixed(2)
                }
            }]
        }, {
            header: "Panel",
            columns: [{
                header: "PM Battery",
                align: "center",
                width: 70,
                dataIndex: "PM-VBatt"
            }, {
                header: "PM Charger",
                align: "center",
                width: 70,
                dataIndex: "PM-VCharg"
            }, {
                header: "PM Door",
                align: "center",
                width: 70,
                dataIndex: "PM-Door"
            }, {
                header: "PE Battery",
                align: "center",
                width: 70,
                dataIndex: "PE-VBatt"
            }, {
                header: "PE Charger",
                align: "center",
                width: 70,
                dataIndex: "PE-VCharg"
            }, {
                header: "PE Door",
                align: "center",
                width: 70,
                dataIndex: "PE-Door"
            }]
        }]
    }),
    range = Ext.create("Ext.data.Store", {
        fields: ["tipe_range"],
        data: [{
            tipe_range: "daily"
        }, {
            tipe_range: "monthly"
        }, {
            tipe_range: "yearly"
        }]
    }),
    panel_detail = {
        dockedItems: [{
            padding: "0 0 0 10",
            xtype: "toolbar",
            dock: "top",
            height: 40,
            items: [{
                xtype: "combobox",
                id: "cb_vessel",
                fieldLabel: " Selected Ship",
                labelWidth: 80,
                width: 300,
                queryMode: "remote",
                emptyText: "- select ship -",
                editable: !1,
                displayField: "name",
                valueField: "id",
                store: store_combo_kapal1,
                listeners: {
                    select: function () {
                        comb_kapal1 = this.getValue(), comb_kapal2 = this.getRawValue();
                        var param = {
                            user_id: dt.idu,
                            id: comb_kapal1,
                            tgl: tgl_sel1,
                            tz: getTimeZone(),
                            type: "vts"
                        };
                        store_detail_kapal.load({
                            params: param
                        }), 
                        Ext.getCmp("table_ship").setTitle("Vessel " + comb_kapal2 + " on " + tgl_sel2);
                        id_kpl = comb_kapal1;

                    },
                    afterrender: function (cb,opt) {
                        // console.log(cb);
                        // console.log(this.getValue(), this.getRawValue());
                        // console.log(cb.store.data[0].name +" -- "+cb.store.data[0].id);
                        // console.log(opt);
                        var isi;
                        // Ext.defer(function(){
                        
                            isi = this.getStore().data.items[0].data;
                            this.setValue(isi.name); 
                            id_kpl = isi.id;
                            comb_kapal2 = "" != comb_kapal1 ? comb_kapal2 : isi.name, comb_kapal1 = id_kpl;

                        // },500);

                            // var isi = this.getStore().data.items[0].data;
                            
                            // id_kpl = this.getStore().data.items[0].data.id,
                            
                            var tgl_ini = Ext.getCmp("date_total_harian").getValue(),
                                tgl_sesuai = Ext.Date.format(tgl_ini, "d-M-Y");
                            tgl_sel1 = Ext.Date.format(new Date, "Y-m-d");
                            var param_user_id = dt.idu,
                                param_id = id_kpl,
                                param_tgl = tgl_sel1,
                                param_tz = getTimeZone(),
                                param_type = "vts";
                            Ext.getCmp("table_ship").setTitle("Vessel " + isi + " on " + tgl_sesuai)
                        // },150);
                        
                    }
                }
            }, {
                padding: "0 0 0 5",
                fieldLabel: "Date",
                id: "date_total_harian",
                labelWidth: 40,
                editable: !1,
                xtype: "datefield",
                value: new Date,
                maxValue: new Date,
                format: "d-M-Y",
                listeners: {
                    change: function () {
                        tgl_sel1 = Ext.Date.format(this.getValue(), "Y-m-d");
                        var param = {
                            user_id: dt.idu,
                            id: comb_kapal1,
                            tgl: tgl_sel1,
                            tz: getTimeZone(),
                            type: "vts"
                        };
                        // id_kpl = comb_kapal1;
                        store_detail_kapal.load({
                            params: param
                        }), tgl_sel2 = "" != tgl_sel1 ? tgl_sel1 : Ext.Date.format(new Date, "d-M-Y"), Ext.getCmp("table_ship").setTitle("Vessel " + comb_kapal2 + " on " + tgl_sel2)
                    },
                    afterrender: function () {
                        tgl_sel1 = Ext.Date.format(this.getValue(), "Y-m-d"), tgl_sel2 = "" != tgl_sel1 ? tgl_sel1 : Ext.Date.format(new Date, "d-M-Y");
                        var param = {
                            user_id: dt.idu,
                            id: comb_kapal1,
                            tgl: tgl_sel1,
                            tz: getTimeZone(),
                            type: "vts"
                        };
                        store_detail_kapal.load({
                            params: param
                        })
                    }
                }
            }, "->", {
                xtype: "button",
                text: "Export to Excel",
                handler: function () {
                    // id_kpl = Ext.getCmp('cb_vessel').getValue();
                    window.open(getAPI() + "/get_data_bima?user_id=" + dt.idu + "&id=" + id_kpl + "&tgl=" + tgl_sel1 + "&tz=" + getTimeZone() + "&type=vts&export=true&filename=" + comb_kapal2 + "_" + tgl_sel2 + ".xlsx")
                }
            }]
        }],
        layout: {
            type: "hbox",
            pack: "start",
            align: "stretch"
        },
        items: [tabel_detail_kapal]
    },
    window_detail_jam = Ext.create("Ext.window.Window", {
        title: "Raw Data Detail",
        width: 800,
        modal: !0,
        closable: !1,
        listeners: {
            boxready: function () {},
            show: function (panel) {
                param = {
                    id: comb_kapal1,
                    user_id: dt.idu,
                    tgl: detail_jam_index,
                    tz: dt.tz,
                    density: "m",
                    type: "vts"
                }, store_detail_kapal_detik.load({
                    params: param
                })
            }
        },
        layout: {
            type: "fit",
            align: "stretch"
        },
        items: [{
            xtype: "tabpanel",
            height: 300,
            defaults: {
                scrollable: !0
            },
            items: [{
                title: "Raw Data Detail",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [tabel_detail_jam]
            }]
        }],
        buttons: [{
            text: "Close",
            handler: function () {
                this.up(".window").hide()
            }
        }]
    });

function atur_kolom(r) {
    var CEK_ME_ECU = r[0].data['ME1 ECU Fuel Burned 1'];
    var i;

    if(CEK_ME_ECU !== "" ){ //Vessel Electric
        //portside Mekanik
        for(i=5;i<=9;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 
        
        //portside Elektrik
        for(i=10;i<=18;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 

        //Starbord Mekanik
        for(i=19;i<=23;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        }

        //Starbord Elektrik
        for(i=24;i<=32;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 

        //AE PS
        for(i=33;i<=37;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 

        for(i=38;i<=45;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 


        //AE SB
        for(i=46;i<=50;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 

        for(i=51;i<=58;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 


    }
    else{

        //portside Mekanik
        for(i=5;i<=9;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 
        
        //portside Elektrik
        for(i=10;i<=18;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 

        //Starbord Mekanik
        for(i=19;i<=23;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        }

        //Starbord Elektrik
        for(i=24;i<=32;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 

        //AE PS
        for(i=33;i<=37;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 

        for(i=38;i<=45;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 


        //AE SB
        for(i=46;i<=50;i++){
            tabel_detail_kapal.columns[i].setVisible(true);
            tabel_detail_jam.columns[i].setVisible(true);
        } 

        for(i=51;i<=58;i++){
            tabel_detail_kapal.columns[i].setVisible(false);
            tabel_detail_jam.columns[i].setVisible(false);
        } 


        var CEK_AE2 = r[0].data['AE2-FM In'];
        if(CEK_AE2 == ""){

            for(i=46;i<=48;i++){
                tabel_detail_kapal.columns[i].setVisible(false);
                tabel_detail_jam.columns[i].setVisible(false);
            }
        }

        
    }
}