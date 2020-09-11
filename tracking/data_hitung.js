Ext.Loader.setConfig({
    enabled: !0,
    disableCaching: !0,
    paths: {
        Chart: "../Chart/"
    }
}), Ext.require("Chart.ux.Highcharts"), Ext.require("Chart.ux.Highcharts.Serie"), Ext.require("Chart.ux.Highcharts.SplineSerie"), Ext.require("Chart.ux.Highcharts.ColumnSerie"), Ext.require("Chart.ux.Highcharts.LineSerie"), Ext.require(["*", "Ext.grid.plugin.CellEditing", "Ext.grid.*", "Ext.data.*", "Ext.util.*", "Ext.toolbar.Paging"]);
var now = new Date,
    year1 = now.getFullYear(),
    month1 = now.getMonth() + 1,
    day1 = now.getDate(),
    total_daily = 0,
    eng1_daily = 0,
    eng2_daily = 0,
    ae1_daily = 0,
    ae2_daily = 0,
    t_start = '-', t_end = '-',
    remaining_on_board = 0,
    rh_engine1 = 0,
    rh_engine2 = 0,
    rh_ae1 = 0,
    rh_ae2 = 0,
    rh_engine_tot = 0,
    fr_engine1 = 0,
    fr_engine2 = 0,
    fr_ae1 = 0,
    fr_ae2 = 0,
    fr_total = 0,
    gen1_runhour = 0,
    gen2_runhour = 0,
    gen3_runhour = 0,
    genset_3 = 0,
    hasil1 = 0,
    hasil2 = 0,
    hasil3 = 0,
    hasil4 = 0,
    tot_tot = 0,
    judul = "",
    tgl_daily = year1 + "-" + month1 + "-" + day1,
    tgl_chart = year1 + "-" + month1 + "-" + day1,
    comb_kapal22 = "",
    comb_kapal21 = "",
    tgl_sel21 = "",
    tgl_sel22 = "",
    model_akumulasi_perjam = Ext.define("akumulasi", {
        extend: "Ext.data.Model",
        fields: ["date", "time", "Total Daily", "working distance", "average speed", "working hours ME1", "working hours ME2", "working hours AE1", "working hours AE2", "ME1 consumtion", "ME2 consumtion", "AE1 consumtion", "AE2 consumtion", "Total Daily Consumption", "ME1 fuel rate", "ME2 fuel rate", "AE1 fuel rate", "AE2 fuel rate", "ME1 average rpm", "ME2 average rpm", "AE1 average rpm", "AE2 average rpm"]
    }),
    store_akumulasi_perjam = Ext.create("Ext.data.Store", {
        model: model_akumulasi_perjam,
        proxy: {
            type: "ajax",
            // url: getAPI() + "/get_data_summary_ship_hourly",
            url: getAPI() + "/v3/get_data_summary_ship_hourly",         
            method: "GET",
            timeout: 4e4
        }
    }),
    but_export = {
        xtype: "buttongroup",
        frame: !1,
        items: [{
            text: "export (xls)",
            scale: "small",
            handler: function () {
                console.log(comb_kapal22, tgl_sel22)
            }
        }]
    },
    tabel_akumulasi = Ext.create("Ext.grid.Panel", {
        title: "Daily Flowmeter",
        store: store_akumulasi_perjam,
        flex: 1.5,
        columns: [{
            header: "Jam",
            width: 100,
            locked: !0,
            dataIndex: "time",
            renderer: function (e) {
                return "<b>" + e + "</b>"
            }
        }, {
            header: "PortSide",
            columns: [{
                header: "Fuel Consumption",
                align: "center",
                width: 100,
                dataIndex: "ME1 consumtion",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Engine Hours",
                align: "center",
                width: 100,
                dataIndex: "working hours ME1",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Fuel Rate",
                align: "center",
                width: 100,
                dataIndex: "ME1 fuel rate",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "RPM (Average)",
                align: "center",
                width: 100,
                dataIndex: "ME1 average rpm",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }]
        }, {
            header: "StarBoard",
            columns: [{
                header: "Fuel Consumption",
                align: "center",
                width: 100,
                dataIndex: "ME2 consumtion",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Engine Hours",
                align: "center",
                width: 100,
                dataIndex: "working hours ME2",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Fuel Rate",
                align: "center",
                width: 100,
                dataIndex: "ME2 fuel rate",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "RPM (Average)",
                align: "center",
                width: 100,
                dataIndex: "ME2 average rpm",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }]
        }, {
            header: "PortSide GenSet",
            columns: [{
                header: "Fuel Consumption",
                align: "center",
                width: 100,
                dataIndex: "AE1 consumtion",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Engine Hours",
                align: "center",
                width: 100,
                dataIndex: "working hours AE1",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Fuel Rate",
                align: "center",
                width: 100,
                dataIndex: "AE1 fuel rate",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "RPM (Average)",
                align: "center",
                width: 100,
                dataIndex: "AE1 average rpm",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }]
        }, {
            header: "StarBoard GenSet",
            columns: [{
                header: "Fuel Consumption",
                align: "center",
                width: 100,
                dataIndex: "AE2 consumtion",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Engine Hours",
                align: "center",
                width: 100,
                dataIndex: "working hours AE2",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "Fuel Rate",
                align: "center",
                width: 100,
                dataIndex: "AE2 fuel rate",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }, {
                header: "RPM (Average)",
                align: "center",
                width: 100,
                dataIndex: "AE2 average rpm",
                renderer: function (e) {
                    return parseFloat(e).toFixed(2)
                }
            }]
        }, {
            header: "Total Consumption",
            align: "center",
            width: 100,
            dataIndex: "Total Daily Consumption",
            renderer: function (e) {
                return parseFloat(e).toFixed(2)
            }
        }, {
            header: "Working Distance",
            align: "center",
            width: 100,
            dataIndex: "working distance",
            renderer: function (e) {
                return parseFloat(e).toFixed(2)
            }
        }, {
            header: "Average Speed",
            align: "center",
            width: 100,
            dataIndex: "average speed",
            renderer: function (e) {
                return parseFloat(e).toFixed(2)
            }
        }],
        tbar: ["->", {
            xtype: "button",
            text: "Export to Excel",
            handler: function () {
                window.open(getAPI() + "/v3/get_data_summary_ship_hourly?tz=" + getTimeZone() + "&tgl=" + tgl_sel21 + "&id=" + comb_kapal21 + "&type=data_sum_ship&export=true&filename=" + comb_kapal22 + "_" + tgl_sel22 + ".xlsx")
            }
        }]
    });
Ext.define("HighChartData", {
    extend: "Ext.data.Model",
    fields: [{
        // name: "time",
        name: "hour",
        type: "string"
    }, {
        name: "ME1 average rpm",
        type: "float",
        useNull: !0
    }, {
        name: "ME2 average rpm",
        type: "float",
        useNull: !0
    }, {
        name: "AE1 average rpm",
        type: "float",
        useNull: !0
    }, {
        name: "AE2 average rpm",
        type: "float",
        useNull: !0
    }, {
        name: "ME1 consumtion",
        type: "float",
        useNull: !0
    }, {
        name: "ME2 consumtion",
        type: "float",
        useNull: !0
    }, {
        name: "AE1 consumtion",
        type: "float",
        useNull: !0
    }, {
        name: "AE2 consumtion",
        type: "float",
        useNull: !0
    }, {
        // name: "Total Perjam",
        name: "Total",
        type: "float",
        useNull: !0
    }]
});
var timer, i, store_grafik = Ext.create("Ext.data.Store", {
        model: "HighChartData",
        proxy: {
            type: "ajax",
            // url: getAPI() + "/get_data_summary_ship_graphic"
            url: getAPI() + "/v3/get_data_summary_ship_hourly"  //"/get_data_summary_ship_graphic"

        }
    }),
    grafik = new Ext.create("Chart.ux.Highcharts", {
        id: "chart",
        series: [{
            dataIndex: "ME1 average rpm",
            yAxis: 0,
            type: "spline",
            color: "#0033FF",
            name: "RPM PortSide",
            visible: !0
        }, {
            dataIndex: "ME2 average rpm",
            yAxis: 0,
            color: "#336600",
            type: "spline",
            name: "RPM StarBoard",
            visible: !0
        }, {
            dataIndex: "AE1 average rpm",
            yAxis: 0,
            color: "#8B6914",
            type: "spline",
            name: "RPM GenSet#1",
            visible: !0
        }, {
            dataIndex: "AE2 average rpm",
            yAxis: 0,
            color: "#8B6900",
            type: "spline",
            name: "RPM GenSet#2",
            visible: !0
        }, {
            dataIndex: "ME1 consumtion",
            yAxis: 1,
            type: "spline",
            color: "#0033FF",
            dashStyle: "ShortDash",
            name: "Fuel PortSide",
            visible: !0
        }, {
            dataIndex: "ME2 consumtion",
            yAxis: 1,
            color: "#336600",
            dashStyle: "ShortDash",
            type: "spline",
            name: "Fuel StarBoard",
            visible: !0
        }, {
            dataIndex: "AE1 consumtion",
            yAxis: 1,
            color: "#8B6914",
            dashStyle: "ShortDash",
            type: "spline",
            name: "Fuel GenSet#1",
            visible: !0
        }, {
            dataIndex: "AE2 consumtion",
            yAxis: 1,
            color: "#FA5A6A",
            dashStyle: "ShortDash",
            type: "spline",
            name: "Fuel GenSet#2",
            visible: !0
        }, {
            dataIndex: "Total", //"Total Perjam",
            yAxis: 1,
            type: "spline",
            color: "#FF00FF",
            dashStyle: "ShortDot",
            name: "Total Fuel",
            visible: !0
        }],
        store: store_grafik,
        xField: "hour",
        chartConfig: {
            chart: {
                marginRight: 300,
                zoomType: "x",
                animation: {
                    duration: 1500,
                    easing: "swing"
                }
            },
            title: {
                text: "",
                style: {
                    display: "none"
                }
            },
            subtitle: {
                text: "",
                style: {
                    display: "none"
                }
            },
            xAxis: [{
                title: {
                    text: "time (hour)",
                    margin: 20
                },
                labels: {
                    rotation: 270,
                    y: 35
                }
            }],
            yAxis: [{
                labels: {
                    style: {
                        color: "#89A54E"
                    }
                },
                title: {
                    text: "Engine Speed (rpm)",
                    style: {
                        color: "#89A54E"
                    }
                },
                min: 0
            }, {
                gridLineWidth: 0,
                title: {
                    text: "flowmeter (liters)",
                    style: {
                        color: "#AA4643"
                    }
                },
                labels: {
                    style: {
                        color: "#AA4643"
                    }
                },
                min: 0,
                opposite: !0
            }],
            plotOptions: {
                series: {
                    animation: {
                        duration: 1e3,
                        easing: "swing"
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return "<b>" + this.series.name + "</b><br/>hour-" + this.x + ": " + parseFloat(this.y).toFixed(2)
                }
            },
            credits: {
                href: "",
                text: ""
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "top",
                x: -10,
                y: 50,
                borderWidth: 0
            }
        }
    }),
    time_range_combo = Ext.create("Ext.form.ComboBox", {
        store: range,
        width: 80,
        queryMode: "local",
        displayField: "tipe_range",
        valueField: "tipe_range"
    }),
    panel_hitung = {
        dockedItems: [{
            padding: "0 0 0 10",
            xtype: "toolbar",
            dock: "top",
            height: 40,
            items: [{
                xtype: "combobox",
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
                        Ext.getCmp("panel_daily").setLoading(!0), comb_kapal21 = this.getValue(), comb_kapal22 = this.getRawValue(), store_grafik.load({
                            params: {
                                tz: getTimeZone(),
                                tgl: tgl_sel21,
                                id: comb_kapal21,
                                type: "data_sum_graphic"
                            }
                        }), store_akumulasi_perjam.load({
                            params: {
                                tz: getTimeZone(),
                                tgl: tgl_sel21,
                                id: comb_kapal21,
                                type: "data_sum_ship"
                            }
                        }), Ext.getCmp("table_chart").setTitle("Vessel " + comb_kapal22 + " on " + tgl_sel22), daily_akum_id(comb_kapal21)
                    },
                    afterrender: function () {
                        Ext.getCmp("panel_daily").setLoading(!0);
                        var e = this.getStore().data.items[0].data.name,
                            t = this.getStore().data.items[0].data.id;
                        this.setValue(e), comb_kapal22 = "" != comb_kapal21 ? comb_kapal22 : e, comb_kapal21 = t;
                        var a = Ext.Date.format(Ext.getCmp("date_tab2").getValue(), "Y-m-d");
                        tgl_sel21 = a, store_grafik.load({
                            params: {
                                tz: getTimeZone(),
                                tgl: a,
                                id: t,
                                type: "data_sum_graphic"
                            }
                        }), store_akumulasi_perjam.load({
                            params: {
                                tz: getTimeZone(),
                                tgl: a,
                                id: t,
                                type: "data_sum_ship"
                            }
                        }), Ext.getCmp("table_chart").setTitle("Vessel " + comb_kapal22 + " on " + tgl_sel22), daily_akum_id(t)
                    }
                }
            }, {
                padding: "0 0 0 5",
                fieldLabel: "Date",
                id: "date_tab2",
                labelWidth: 40,
                xtype: "datefield",
                value: new Date,
                maxValue: new Date,
                editable: !1,
                format: "d-M-Y",
                listeners: {
                    change: function () {
                        Ext.getCmp("panel_daily").setLoading(!0), tgl_sel21 = Ext.Date.format(this.getValue(), "Y-m-d"), store_grafik.load({
                            params: {
                                tz: getTimeZone(),
                                tgl: tgl_sel21,
                                id: comb_kapal21,
                                type: "data_sum_graphic"
                            }
                        }), store_akumulasi_perjam.load({
                            params: {
                                tz: getTimeZone(),
                                tgl: tgl_sel21,
                                id: comb_kapal21,
                                type: "data_sum_ship"
                            }
                        }), tgl_sel22 = "" != tgl_sel21 ? Ext.Date.format(this.getValue(), "d-M-Y") : Ext.Date.format(new Date, "d-M-Y"), Ext.getCmp("table_chart").setTitle("Vessel " + comb_kapal22 + " on " + tgl_sel22), daily_akum_id(comb_kapal21)
                    },
                    afterrender: function () {
                        Ext.getCmp("panel_daily").setLoading(!0), tgl_sel21 = Ext.Date.format(this.getValue(), "Y-m-d"), tgl_sel22 = "" != tgl_sel21 ? tgl_sel21 : Ext.Date.format(new Date, "d-M-Y")
                    }
                }
            }, "->", {
                xtype: "label",
                id: "idstatus",
                width: 400
            }]
        }],
        layout: {
            type: "vbox",
            pack: "start",
            align: "stretch"
        },
        items: [{
            id: "table_chart",
            title: "Data Chart",
            flex: 9,
            layout: "fit",
            items: [grafik]
        }, {
            xtype: "splitter"
        }, {
            flex: 7,
            border: !1,
            height: 100,
            layout: {
                type: "hbox",
                pack: "start",
                align: "stretch"
            },
            items: [{
                title: "Daily Summary",
                flex: 2,
                items: [{
                    border: !1,
                    id: "panel_daily",
                    html: ""
                }]
            }, {
                xtype: "splitter"
            }, tabel_akumulasi]
        }]
    },
    eng_rh1 = "";

function cek_pms(e) {
    return e >= 100 && e <= 111
}

function daily_akum_id(e) {
    // console.log("vessel_id ==> " + e), console.log(cek_pms(e)),
     Ext.Ajax.request({
        // url: getAPI() + "/get_data_summary_bima",
        url: getAPI() + "/daily-report/summary",
        method: "GET",
        params: {
            tz: getTimeZone(),
            tgl: tgl_sel21,
            id: comb_kapal21,
            type: "data_adhoc"
        },
        success: function (t) {
            var a = Ext.JSON.decode(t.responseText)[0];
            // console.log(a);
            if (a) {
                if (eng1_daily = parseFloat(a["ME1 Daily Consumtion"]).toFixed(2), eng2_daily = parseFloat(a["ME2 Daily Consumtion"]).toFixed(2), rh_engine1 = parseFloat(a["ME1 Working Hours"]).toFixed(2), rh_engine2 = parseFloat(a["ME2 Working Hours"]).toFixed(2), fr_engine1 = parseFloat(a["ME1 fuel rate"]).toFixed(2), fr_engine2 = parseFloat(a["ME2 fuel rate"]).toFixed(2), rh_ae1 = parseFloat(a["AE1 Working Hours"]).toFixed(2), rh_ae2 = parseFloat(a["AE2 Working Hours"]).toFixed(2), ae1_daily = parseFloat(a["AE1 Daily Consumtion"]).toFixed(2), ae2_daily = parseFloat(a["AE2 Daily Consumtion"]).toFixed(2), fr_ae1 = parseFloat(a["AE1 fuel rate"]).toFixed(2), fr_ae2 = parseFloat(a["AE2 fuel rate"]).toFixed(2), total_daily = parseFloat(a["Total Daily"]).toFixed(2), remaining_on_board = parseFloat(a["Remaining On Board"]).toFixed(2), cek_pms(e)) {
                    var r = parseFloat(rh_ae1) + parseFloat(rh_ae2),
                        n = parseFloat(ae1_daily);
                    ae1_daily = 0 == r ? parseFloat(0).toFixed(2) : parseFloat(parseFloat(n) * parseFloat(rh_ae1) / parseFloat(r)).toFixed(2), ae2_daily = 0 == r ? parseFloat(0).toFixed(2) : parseFloat(parseFloat(n) * parseFloat(rh_ae2) / parseFloat(r)).toFixed(2), fr_ae1 = 0 == rh_ae1 ? parseFloat(0).toFixed(2) : parseFloat(n / r).toFixed(2), fr_ae2 = 0 == rh_ae2 ? parseFloat(0).toFixed(2) : parseFloat(n / r).toFixed(2);
                    var a_awal = new Date(a["ep_start"] *1000), a_akhir = new Date(a["ep_end"]*1000);
                    // t_start = ((a_awal.getHours() < 10) ? '0' : '') + a_awal.getHours()+":"+((a_awal.getMinutes() < 10) ? '0' : '') + a_awal.getMinutes();   
                    // t_end   = ((a_akhir.getHours() < 10) ? '0' : '') + a_akhir.getHours()+":"+((a_akhir.getMinutes() < 10) ? '0' : '') + a_akhir.getMinutes();
                    t_start = a["start"]; t_end = a["end"];
                  
                }
            } else eng1_daily = "NaN", eng2_daily = "NaN", rh_engine1 = "NaN", rh_engine2 = "NaN", fr_engine1 = "NaN", fr_engine2 = "NaN", ae1_daily = "NaN", ae2_daily = "NaN", rh_ae1 = "NaN", rh_ae2 = "NaN", fr_ae1 = "NaN", fr_ae2 = "NaN", total_daily = "NaN", remaining_on_board = "NaN", t_start="-", t_end='-'
        },
        callback: function (e, t, a) {
            var indikasi= (eng1_daily < 0 || eng2_daily <0 || total_daily < 0 || ae1_daily < 0 || ae2_daily < 0) ? '</tr><tr><td class="alarm" colspan="5" >Indikasi Gangguan Sensor</td></tr>' :'';
            content_akum = '<style type="text/css">table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}.alarm{text-align: center;padding: 5px 0;background-color: red;color: white;font-weight: bold;}</style><table width="100%" class="total_daily"><tr><td>Total Consumption</td><td colspan="4" style="font-size:22px;' +((total_daily<0)?'color:red;':'')+'">' + total_daily + ' Liters</td></tr><tr><td>Remaining on Board</td><td colspan="4" style="font-size:22px;">' + remaining_on_board + ' Liters</td></tr><tr><td>Analisa Data</td><td colspan="4" style="font-size:22px;">'+t_start +' s/d '+ t_end+'</td></tr><tr><td>&nbsp;</td><td>PortSide</td><td>StarBoard</td><td>Genset#1</td><td>Genset#2</td></tr><tr><td>Fuel Consumption</td><td><span style="font-size:18px; ' +((eng1_daily<0)?'color:red;':'')+'"> ' + eng1_daily + ' Liters</span></td><td><span style="font-size:18px;' +((eng2_daily<0)?'color:red;':'')+'"> ' + eng2_daily + ' Liters</span></td><td><span style="font-size:18px;' +((ae1_daily<0)?'color:red;':'')+'"> ' + ae1_daily + ' Liters</span></td><td><span style="font-size:18px;' +((ae2_daily<0)?'color:red;':'')+'"> ' + ae2_daily + ' Liters</span></td></tr><tr><td>Engine Hours</td><td><span style="font-size:18px;"> ' + rh_engine1 + ' Hrs</span></td><td><span style="font-size:18px;"> ' + rh_engine2 + ' Hrs</span></td><td><span style="font-size:18px;"> ' + rh_ae1 + ' Hrs</span></td><td><span style="font-size:18px;"> ' + rh_ae2 + ' Hrs</span></td></tr><tr><td>Fuel Rate</td><td><span style="font-size:18px;' +((fr_engine1<0)?'color:red;':'')+'"> ' + fr_engine1 + ' lt/hr</span></td><td><span style="font-size:18px;' +((fr_engine2<0)?'color:red;':'')+'"> ' + fr_engine2 + ' lt/hr</span></td><td><span style="font-size:18px;' +((fr_ae1<0)?'color:red;':'')+'"> ' + fr_ae1 + ' lt/hr</span></td><td><span style="font-size:18px;' +((fr_ae2<0)?'color:red;':'')+'"> ' + fr_ae2 + ' lt/hr</span></td></tr>'+indikasi+'</table>', Ext.getCmp("panel_daily").update(content_akum), Ext.getCmp("panel_daily").setLoading(!1)
        }
    })
}

function daily_akum() {
    Ext.Ajax.request({
        // url: getAPI() + "/get_data_summary_bima",
        url: getAPI() + "/daily-report/summary",
        method: "GET",
        params: {
            tz: getTimeZone(),
            tgl: tgl_sel21,
            id: comb_kapal21,
            type: "data_adhoc"
        },
        success: function (e) {
            var t = Ext.JSON.decode(e.responseText)[0];
            t ? (eng1_daily = parseFloat(t["ME1 Daily Consumtion"]).toFixed(2), eng2_daily = parseFloat(t["ME2 Daily Consumtion"]).toFixed(2), rh_engine1 = parseFloat(t["ME1 Working Hours"]).toFixed(2), rh_engine2 = parseFloat(t["ME2 Working Hours"]).toFixed(2), fr_engine1 = parseFloat(t["ME1 fuel rate"]).toFixed(2), fr_engine2 = parseFloat(t["ME2 fuel rate"]).toFixed(2), ae1_daily = parseFloat(t["AE1 Daily Consumtion"]).toFixed(2), ae2_daily = parseFloat(t["AE2 Daily Consumtion"]).toFixed(2), rh_ae1 = parseFloat(t["AE1 Working Hours"]).toFixed(2), rh_ae2 = parseFloat(t["AE2 Working Hours"]).toFixed(2), fr_ae1 = parseFloat(t["AE1 fuel rate"]).toFixed(2), fr_ae2 = parseFloat(t["AE2 fuel rate"]).toFixed(2), total_daily = parseFloat(t["Total Daily"]).toFixed(2), remaining_on_board = parseFloat(t["Remaining On Board"]).toFixed(2)) : (eng1_daily = "NaN", eng2_daily = "NaN", rh_engine1 = "NaN", rh_engine2 = "NaN", fr_engine1 = "NaN", fr_engine2 = "NaN", ae1_daily = "NaN", ae2_daily = "NaN", rh_ae1 = "NaN", rh_ae2 = "NaN", fr_ae1 = "NaN", fr_ae2 = "NaN", total_daily = "NaN", remaining_on_board = "NaN")
        },
        callback: function (e, t, a) {
            var indikasi= (eng1_daily < 0 || eng2_daily <0 || total_daily < 0 || ae1_daily < 0 || ae2_daily < 0) ? '</tr><tr><td class="alarm" colspan="5" >Indikasi Gangguan Sensor</td></tr>' :'';
            content_akum = '<style type="text/css">table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}.alarm{text-align: center;padding: 5px 0;background-color: red;color: white;font-weight: bold;}</style><table width="100%" class="total_daily"><tr><td>Total Consumption</td><td colspan="4" style="font-size:22px;' +((total_daily<0)?'color:red;':'')+'">' + total_daily + ' Liters</td></tr><tr><td>Remaining on Board</td><td colspan="4" style="font-size:22px;">' + remaining_on_board + ' Liters</td></tr><tr><td>Analisa Data</td><td colspan="4" style="font-size:22px;">'+t_start +' s/d '+ t_end+'</td></tr><tr><td>&nbsp;</td><td>PortSide</td><td>StarBoard</td><td>Genset#1</td><td>Genset#2</td></tr><tr><td>Fuel Consumption</td><td><span style="font-size:18px; ' +((eng1_daily<0)?'color:red;':'')+'"> ' + eng1_daily + ' Liters</span></td><td><span style="font-size:18px;' +((eng2_daily<0)?'color:red;':'')+'"> ' + eng2_daily + ' Liters</span></td><td><span style="font-size:18px;' +((ae1_daily<0)?'color:red;':'')+'"> ' + ae1_daily + ' Liters</span></td><td><span style="font-size:18px;' +((ae2_daily<0)?'color:red;':'')+'"> ' + ae2_daily + ' Liters</span></td></tr><tr><td>Engine Hours</td><td><span style="font-size:18px;"> ' + rh_engine1 + ' Hrs</span></td><td><span style="font-size:18px;"> ' + rh_engine2 + ' Hrs</span></td><td><span style="font-size:18px;"> ' + rh_ae1 + ' Hrs</span></td><td><span style="font-size:18px;"> ' + rh_ae2 + ' Hrs</span></td></tr><tr><td>Fuel Rate</td><td><span style="font-size:18px;' +((fr_engine1<0)?'color:red;':'')+'"> ' + fr_engine1 + ' lt/hr</span></td><td><span style="font-size:18px;' +((fr_engine2<0)?'color:red;':'')+'"> ' + fr_engine2 + ' lt/hr</span></td><td><span style="font-size:18px;' +((fr_ae1<0)?'color:red;':'')+'"> ' + fr_ae1 + ' lt/hr</span></td><td><span style="font-size:18px;' +((fr_ae2<0)?'color:red;':'')+'"> ' + fr_ae2 + ' lt/hr</span></td></tr>'+indikasi+'</table>', Ext.getCmp("panel_daily").update(content_akum), Ext.getCmp("panel_daily").setLoading(!1)
        }
    })
}

function getHour(e) {
    if (null == e) return "0 hr";
    if (e <= 0) return "0 hr";
    var t = Math.floor(e / 60),
        a = e % 60;
    return (t > 1 ? t + " hrs " : t + " hr ") + (a > 0 ? parseFloat(a).toFixed(0) + " mins" : "")
}

function ambil_status() {
    Ext.Ajax.request({
        url: getAPI() + "/pelindo/status",
        method: "GET",
        success: function (e) {
            var t = Ext.JSON.decode(e.responseText);
            t.status, t.status
        }
    })
}

function update_grafik() {
    store_grafik.reload(), store_akumulasi_perjam.reload()
}
Ext.onReady((function () {
    daily_akum_id(comb_kapal21), setInterval((function () {
        update_grafik(), daily_akum_id(comb_kapal21)
    }), 3e5)
}));