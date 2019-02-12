var total_daily_x = "NaN";
var remaining_on_board_x = "NaN";
var eng1_daily_x = "NaN";
var eng2_daily_x = "NaN";
var ae1_daily_x = "NaN";
var ae2_daily_x = "NaN";
var rh_engine1_x = "NaN";
var rh_engine2_x = "NaN";
var rh_ae1_x = "NaN";
var rh_ae2_x = "NaN";
var rh_engine_tot_x = "NaN";
var fr_engine1_x = "NaN";
var fr_engine2_x = "NaN";
var fr_ae1_x = "NaN";
var fr_ae2_x = "NaN";
var fr_total_x = "NaN";

var content_akum_banyak = '<style type="text/css">' +
    'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
    'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
    '</style>' +
    '<table width="100%" class="total_daily">' +
    '<tr><td>Total Consumption</td><td colspan="4" style="font-size:22px;">' + total_daily_x + ' Liters</td></tr>' +
    '<tr><td>Remaining on Board</td><td colspan="4" style="font-size:22px;">' + remaining_on_board_x + ' Liters</td></tr>' +
    '<tr>' +
    '<td>&nbsp;</td><td>StarBoard (ME1)</td><td>PortSide (ME2)</td><td>Genset#1 (AE1)</td><td>Genset#2 (AE2)</td>' +
    '</tr>' +
    '<tr><td>Fuel Consumption</td>' +
    '<td><span style="font-size:18px;"> ' + eng1_daily_x + ' Liters</span></td>' +
    '<td><span style="font-size:18px;"> ' + eng2_daily_x + ' Liters</span></td>' +
    '<td><span style="font-size:18px;"> ' + ae1_daily_x + ' Liters</span></td>' +
    '<td><span style="font-size:18px;"> ' + ae2_daily_x + ' Liters</span></td>' +
    '</tr>' +
    '<tr><td>Engine Hours</td>' +
    '<td><span style="font-size:18px;"> ' + rh_engine1_x + ' Hrs</span></td>' +
    '<td><span style="font-size:18px;"> ' + rh_engine2_x + ' Hrs</span></td>' +
    '<td><span style="font-size:18px;"> ' + rh_ae1_x + ' Hrs</span></td>' +
    '<td><span style="font-size:18px;"> ' + rh_ae2_x + ' Hrs</span></td>' +
    '</tr>' +
    '<tr><td>Fuel Rate</td>' +
    '<td><span style="font-size:18px;"> ' + fr_engine1_x + ' lt/hr</span></td>' +
    '<td><span style="font-size:18px;"> ' + fr_engine2_x + ' lt/hr</span></td>' +
    '<td><span style="font-size:18px;"> ' + fr_ae1_x + ' lt/hr</span></td>' +
    '<td><span style="font-size:18px;"> ' + fr_ae2_x + ' lt/hr</span></td>' +
    '</tr>' +
    '</table>';

var panel_hitung_banyak = {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
            flex: 1,
            border: false,
            height: 500,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                title: 'Bima 333',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_bima333",
                    html: content_akum
                }]
            }, {
                xtype: 'splitter'
            }, {
                title: 'Jayengrono',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_jayengrono",
                    html: content_akum
                }]
            }]
        },
        {
            xtype: 'splitter'
        },
        {
            flex: 1,
            border: false,
            height: 500,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                title: 'Kresna 315',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_kresna315",
                    html: content_akum
                }]
            }, {
                xtype: 'splitter'
            }, {
                title: 'Joyoboyo',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_joyoboyo",
                    html: content_akum
                }]
            }]
        },
        {
            xtype: 'splitter'
        },
        {
            flex: 1,
            border: false,
            height: 500,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                title: 'Anggada XIV',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_anggada14",
                    html: content_akum
                }]
            }, {
                xtype: 'splitter'
            }, {
                title: 'Subali 2',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_subali2",
                    html: content_akum
                }]
            }]
        },
        {
            xtype: 'splitter'
        },
        {
            flex: 1,
            border: false,
            height: 500,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                title: 'Anoman 1',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily_anoman1",
                    html: content_akum
                }]
            }, {
                xtype: 'splitter'
            }, {
                title: '',
                flex: 2,
                items: []
            }]
        }
    ]
};
var id_panel_kapal = '';
function daily_akum_banyak(id, comp) {
    id_panel_kapal = comp;
    Ext.Ajax.request({
        url: getAPI() + '/get_data_summary_bima',
        method: 'GET',
        params: {
            tz: getTimeZone(),
            tgl: Ext.Date.format(new Date(), 'Y-m-d'),
            id: id,
            type: 'data_adhoc'
        },

        success: function (data) {
            var hasil = Ext.JSON.decode(data.responseText);
            // console.log(hasil[0]);
            // console.log('get_data_summary_bima', data);
            var x = hasil[0];
            // console.log('x = ', x);
            if (x) {
                eng1_daily = parseFloat(x['ME1 Daily Consumtion']).toFixed(2);
                eng2_daily = parseFloat(x['ME2 Daily Consumtion']).toFixed(2);
                rh_engine1 = parseFloat(x['ME1 Working Hours']).toFixed(2);
                rh_engine2 = parseFloat(x['ME2 Working Hours']).toFixed(2);
                fr_engine1 = parseFloat(x['ME1 fuel rate']).toFixed(2);
                fr_engine2 = parseFloat(x['ME2 fuel rate']).toFixed(2);
                
                ae1_daily = parseFloat(x['AE1 Daily Consumtion']).toFixed(2);
                ae2_daily = parseFloat(x['AE2 Daily Consumtion']).toFixed(2);
                rh_ae1 = parseFloat(x['AE1 Working Hours']).toFixed(2);
                rh_ae2 = parseFloat(x['AE2 Working Hours']).toFixed(2);
                fr_ae1 = parseFloat(x['AE1 fuel rate']).toFixed(2);
                fr_ae2 = parseFloat(x['AE2 fuel rate']).toFixed(2);

                total_daily = parseFloat(x['Total Daily']).toFixed(2);
                remaining_on_board = parseFloat(x['Remaining On Board']).toFixed(2);
            } else {
                eng1_daily = "NaN";
                eng2_daily = "NaN";
                rh_engine1 = "NaN";
                rh_engine2 = "NaN";
                fr_engine1 = "NaN";
                fr_engine2 = "NaN";
                ae1_daily = "NaN";
                ae2_daily = "NaN";
                rh_ae1 = "NaN";
                rh_ae2 = "NaN";
                fr_ae1 = "NaN";
                fr_ae2 = "NaN";
                total_daily = "NaN";
                remaining_on_board = "NaN";
            }
        },
        callback: function () {
            content_akum_banyak = '<style type="text/css">' +
                'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
                'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
                '</style>' +
                '<table width="100%" class="total_daily">' +
                '<tr><td>Total Consumption</td><td colspan="4" style="font-size:22px;">' + total_daily + ' Liters</td></tr>' +
                '<tr><td>Remaining on Board</td><td colspan="4" style="font-size:22px;">' + remaining_on_board + ' Liters</td></tr>' +
                '<tr>' +
                '<td>&nbsp;</td><td>StarBoard (ME1)</td><td>PortSide (ME2)</td><td>Genset#1 (AE1)</td><td>Genset#2 (AE2)</td>' +
                '</tr>' +
                '<tr><td>Fuel Consumption</td>' +
                '<td><span style="font-size:18px;"> ' + eng1_daily + ' Liters</span></td>' +
                '<td><span style="font-size:18px;"> ' + eng2_daily + ' Liters</span></td>' +
                '<td><span style="font-size:18px;"> ' + ae1_daily + ' Liters</span></td>' +
                '<td><span style="font-size:18px;"> ' + ae2_daily + ' Liters</span></td>' +
                '</tr>' +
                '<tr><td>Engine Hours</td>' +
                '<td><span style="font-size:18px;"> ' + rh_engine1 + ' Hrs</span></td>' +
                '<td><span style="font-size:18px;"> ' + rh_engine2 + ' Hrs</span></td>' +
                '<td><span style="font-size:18px;"> ' + rh_ae1 + ' Hrs</span></td>' +
                '<td><span style="font-size:18px;"> ' + rh_ae2 + ' Hrs</span></td>' +
                '</tr>' +
                '<tr><td>Fuel Rate</td>' +
                '<td><span style="font-size:18px;"> ' + fr_engine1 + ' lt/hr</span></td>' +
                '<td><span style="font-size:18px;"> ' + fr_engine2 + ' lt/hr</span></td>' +
                '<td><span style="font-size:18px;"> ' + fr_ae1 + ' lt/hr</span></td>' +
                '<td><span style="font-size:18px;"> ' + fr_ae2 + ' lt/hr</span></td>' +
                '</tr>' +
                '</table>';
                // console.log(comp);
                Ext.getCmp(comp).update(content_akum_banyak);
        }
    });
}

var taskMS = {
    run: function () {
        daily_akum_banyak('8','panel_daily_bima333');
        daily_akum_banyak('76','panel_daily_jayengrono');
        daily_akum_banyak('77','panel_daily_kresna315');
        daily_akum_banyak('78','panel_daily_joyoboyo');
        daily_akum_banyak('79','panel_daily_anggada14');
        daily_akum_banyak('80','panel_daily_subali2');
        daily_akum_banyak('81','panel_daily_anoman1');
        // console.log('ambil banyak');
    },
    interval: 1000*60
};