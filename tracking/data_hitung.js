Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true, // For debug only
    paths: {
        'Chart': '../Chart/'
    }
});

Ext.require('Chart.ux.Highcharts');
Ext.require('Chart.ux.Highcharts.Serie');
Ext.require('Chart.ux.Highcharts.SplineSerie');
Ext.require('Chart.ux.Highcharts.ColumnSerie');
Ext.require('Chart.ux.Highcharts.LineSerie');

Ext.require([
    '*',
    'Ext.grid.plugin.CellEditing',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.toolbar.Paging'
]);

var now = new Date();
var year1 = now.getFullYear();
var month1 = now.getMonth() + 1;
var day1 = now.getDate();

var total_daily = 0.0;
var eng1_daily = 0.0;
var eng2_daily = 0.0;
var gen1_runhour = 0.0;
var gen2_runhour = 0.0;
var tgl_daily = year1 + "-" + month1 + "-" + day1;
var tgl_chart = year1 + "-" + month1 + "-" + day1;

var comb_kapal2 = '';
var tgl_sel2 = '';

var model_akumulasi = Ext.define('akumulasi', {
    extend: 'Ext.data.Model',
    fields: ['tanggal', 'jam', 'rpm1', 'prop1', 'flow1', 'overflow1', 'temp1', 'press1', 'rpm2', 'prop2', 'flow2', 'overflow2', 'temp2', 'press2', 'runhour1', 'runhour2']
});

var store_akumulasi = Ext.create('Ext.data.Store', {
    model: model_akumulasi,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'akumulasi_detail.php?',
        method: 'GET',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'results',
            messageProperty: 'message'
        }
    },
    listeners: {
        'beforeload': function (store, options) {
            store.proxy.extraParams.name=comb_kapal2;
			store.proxy.extraParams.tgl2=tgl_sel2;
        }
    }
});

var model_combo_kapal2 = Ext.define('Kapal', {
    extend: 'Ext.data.Model',
    fields: ['name']
});

var store_combo_kapal2 = Ext.create('Ext.data.Store', {
    model: model_combo_kapal2,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'ship_combo.php'
        },
        reader: {
            totalProperty: 'total',
            type: 'json',
            successProperty: 'success',
            root: 'results',
            messageProperty: 'message'
        }
    }
});

var ship_combo2 = new Ext.form.ComboBox({
    displayField: 'name',
    queryMode: 'remote',
    valueField: 'name',
    width: 200,
    store: store_combo_kapal2,
    listeners: {
        select: function () {
            comb_kapal2 = this.getValue();
            console.log(comb_kapal2);
            store_akumulasi.load({
                params: {
                    name: comb_kapal2,
                    tgl2 : tgl_sel2
                }
            });
			store_akumulasi.load({params: { name: comb_kapal2, tgl2: tgl_sel2}});
			store_grafik.load({params: { name: comb_kapal2, tgl2: tgl_sel2}});
			update_text2();
			daily_akum();
        }
    }
});

var but_export = {
    xtype: 'buttongroup',
    frame: false,
    items: [{
        text: 'export (xls)',
        scale: 'small',
        handler: function () {
			console.log('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily);
            window.open('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily, '_blank'); 
        }
    }]
};

var tabel_akumulasi = Ext.create('Ext.grid.Panel', {
    title: 'akumulasi data flowmeter',
    store: store_akumulasi,
    flex: 4,
    columns: [{
        header: "date",
        width: 120,
        dataIndex: 'tanggal'
    }, {
        header: "hour",
        width: 60,
        dataIndex: 'jam'
    }, {
        header: "engine#1",
        columns: [{
            header: "engine#1 (avg)",
            width: 100,
            dataIndex: 'rpm1'
        }, {
            header: "propeler#1 (avg)",
            width: 100,
            dataIndex: 'prop1'
        }, {
            header: "flowmeter#1",
            width: 100,
            dataIndex: 'flow1'
        }, {
            header: "overflow#1",
            width: 100,
            dataIndex: 'overflow1'
        }, {
            header: "temperature#1",
            width: 100,
            dataIndex: 'temp1'
        }, {
            header: "pressure#1",
            width: 100,
            dataIndex: 'press1'
        }]
    }, {
        header: "engine#2",
        columns: [{
            header: "engine#2 (avg)",
            width: 100,
            dataIndex: 'rpm2'
        }, {
            header: "propeler#2 (avg)",
            width: 100,
            dataIndex: 'prop2'
        }, {
            header: "flowmeter#2",
            width: 100,
            dataIndex: 'flow2'
        }, {
            header: "overflow#2",
            width: 100,
            dataIndex: 'overflow2'
        }, {
            header: "temperature#2",
            width: 100,
            dataIndex: 'temp2'
        }, {
            header: "pressure#2",
            width: 100,
            dataIndex: 'press2'
        }]
    }, {
        header: "genset run-hour",
        columns: [{
            header: "genset#1",
            width: 100,
            dataIndex: 'runhour1'
        }, {
            header: "genset#2",
            width: 100,
            dataIndex: 'runhour2'
        }]
    }]
});


//highchart

Ext.define('HighChartData', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'time',
        type: 'string'
    }, {
        name: 'rpm1',
        type: 'float',
        useNull: true
    }, {
        name: 'rpm2',
        type: 'float',
        useNull: true
    }, {
        name: 'fuel1',
        type: 'float',
        useNull: true
    }, {
        name: 'fuel2',
        type: 'float',
        useNull: true
    }, {
        name: 'runhour1',
        type: 'float',
        useNull: true
    }, {
        name: 'runhour2',
        type: 'float',
        useNull: true
    }]
});

var store_grafik = Ext.create('Ext.data.Store', {
    model: 'HighChartData',
    proxy: {
        type: 'ajax',
        url: 'data_chart.php',
        method: 'GET',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'results',
            messageProperty: 'message'
        }
    },
    listeners: {
        'beforeload': function (store, options) {
            store.proxy.extraParams.name=comb_kapal2;
			store.proxy.extraParams.tanggal=tgl_sel2;
        }
    },
    autoLoad: true
});


var randomFromTo = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
};

var seriesNum = 2;

var genSeries = function () {
    var temps = [];
    for (var i = 0; i < 20; i++) {
        temps[i] = randomFromTo(15, 30);
    }

    var series = {
        type: 'spline',
        name: seriesNum + ' days ago',
        data: temps
    };

    seriesNum++;

    return series;
};

var grafik = new Ext.create('Chart.ux.Highcharts', {
    id: 'chart',
    series: [{
        dataIndex: 'rpm1',
        yAxis: 0,
        type: 'spline',
        color: '#0033FF',
        name: 'rpm #1',
        visible: true
    }, {
        dataIndex: 'rpm2',
        yAxis: 0,
        color: '#336600',
        type: 'spline',
        name: 'rpm #2',
        visible: true
    }, {
        dataIndex: 'fuel1',
        yAxis: 1,
        type: 'spline',
        color: '#0033FF',
        dashStyle: 'ShortDash',
        name: 'fuel main engine #1',
        visible: true
    }, {
        dataIndex: 'fuel2',
        yAxis: 1,
        color: '#336600',
        dashStyle: 'ShortDash',
        type: 'spline',
        name: 'fuel main engine #2',
        visible: true
    }, {
        dataIndex: 'runhour1',
        yAxis: 2,
        type: 'spline',
        color: '#0033FF',
        dashStyle: 'ShortDot',
        name: 'genset #1',
        visible: false
    }, {
        dataIndex: 'runhour2',
        yAxis: 2,
        type: 'spline',
        color: '#336600',
        dashStyle: 'ShortDot',
        name: 'genset #2',
        visible: false
    }],
    store: store_grafik,
    xField: 'time',
    chartConfig: {
        chart: {
            marginRight: 250,
            zoomType: 'x',
            animation: {
                duration: 1500,
                easing: 'swing'
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: '',
            style: {
                display: 'none'
            }
        },
        xAxis: [{
            title: {
                text: 'time (hour)',
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
                    color: '#89A54E'
                }
            },
            title: {
                text: 'Engine Speed (rpm)',
                style: {
                    color: '#89A54E'
                }
            },
            min: 0
        }, {
            gridLineWidth: 0,
            title: {
                text: 'flowmeter (liters)',
                style: {
                    color: '#AA4643'
                }
            },
            labels: {
                style: {
                    color: '#AA4643'
                }
            },
            min: 0,
            opposite: true
        }, {
            gridLineWidth: 0,
            title: {
                text: 'runhour (hours)',
                style: {
                    color: '#BB4643'
                }
            },
            labels: {
                style: {
                    color: '#BB4643'
                }
            },
            min: 0,
            opposite: true
        }],
        plotOptions: {
            series: {
                animation: {
                    duration: 1000,
                    easing: 'swing'
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>hour-' + this.x + ': ' + this.y;
            }

        },
        credits: {
            href: '',
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 50,
            borderWidth: 0
        }
    }
});


//highchart


// Create the combo box, attached to the states data store
var time_range_combo = Ext.create('Ext.form.ComboBox', {
    store: range,
    width: 80,
    queryMode: 'local',
    displayField: 'tipe_range',
    valueField: 'tipe_range'
});


var content_akum = '<style type="text/css">' +
    'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
    'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
    '</style>' +
    '<table width="100%" class="total_daily">' +
    '<tr><td colspan="2">Total Daily Fuel</td></tr>' +
    '<tr><td colspan="2" style="font-size:22px;">' + total_daily + ' Liters</td></tr>' +
    '<tr>' +
    '<td>Engine#1</td>' +
    '<td>Engine#2</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span style="font-size:18px;">' + eng1_daily + ' Liters</span></td>' +
    '<td><span style="font-size:18px;">' + eng2_daily + ' Liters</span></td>' +
    '<tr><td colspan="2"></td></tr>' +
    '<tr><td colspan="2">Genset Daily Running Hours</td></tr>' +
    '</tr>' +
    '<tr>' +
    '<td>genset#1</td>' +
    '<td>genset#2</td>' +
    '</tr>' +
    '<tr>' +
    '<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
    '<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
    '</tr>' +
    '</table>';

function update_text2() {		
	var content_text2 = '<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal2+' - date: '+tgl_sel2+')</div></body></html>';
	Ext.getCmp('toolbar_text2').update(content_text2);
}


var panel_hitung = {
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
		height: 40,
        items: [
            'selected ship :',
            ship_combo2,
			'-',
			{
				fieldLabel: 'Date',
				id: 'date_total',
				labelWidth: 40,
				xtype: 'datefield',
				value: new Date(),
				format: 'd-M-Y',
				listeners: {
					change: function () {
						console.log(Ext.util.Format.date(Ext.getCmp('date_total').getValue(), 'd-m-Y'));
						tgl_sel2 = Ext.util.Format.date(Ext.getCmp('date_total').getValue(), 'Y-m-d');
						store_akumulasi.load({params: { name: comb_kapal2, tgl2: tgl_sel2}});
						store_grafik.load({params: { name: comb_kapal2, tgl2: tgl_sel2}});
						update_text2();
						daily_akum();
					}
				}
			},
			'-',
			{id: 'toolbar_text2', html:'<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal2+' - date: '+tgl_sel2+')</div></body></html>'}
        ]
    }],
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
        title: 'Data Chart',
        flex: 5,
        layout: 'fit',
        items: [grafik]
    }, {
        xtype: 'splitter'
    }, {
        flex: 3,
        border: false,
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
                title: 'Daily Summary',
                flex: 2,
                items: [{
                    border: false,
                    id: "panel_daily",
                    html: content_akum
                }]
            }, {
                xtype: 'splitter'
            },
            tabel_akumulasi
        ]
    }]
};

function daily_akum() {
    Ext.Ajax.request({
        url: 'update_daily.php',
        method: 'GET',
        success: function (data) {
            var temp = new Array();
            temp = (data.responseText).split(",");
            eng1_daily = parseFloat(temp[0]) - parseFloat(temp[1]);
            eng2_daily = parseFloat(temp[2]) - parseFloat(temp[3]);
            total_daily = eng1_daily + eng2_daily;
            gen1_runhour = parseFloat(temp[4]);
            gen2_runhour = parseFloat(temp[5]);
        },
        params: {
            name: comb_kapal2,
            tgl: tgl_sel2
        }
    });
    content_akum = '<style type="text/css">' +
        'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
        'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
        '</style>' +
        '<table width="100%" class="total_daily">' +
        '<tr><td colspan="2">Total Daily Fuel</td></tr>' +
        '<tr><td colspan="2" style="font-size:22px;">' + total_daily + ' Liters</td></tr>' +
        '<tr>' +
        '<td>Engine#1</td>' +
        '<td>Engine#2</td>' +
        '</tr>' +
        '<tr>' +
        '<td><span style="font-size:18px;">' + eng1_daily + ' Liters</span></td>' +
        '<td><span style="font-size:18px;">' + eng2_daily + ' Liters</span></td>' +
        '<tr><td colspan="2"></td></tr>' +
        '<tr><td colspan="2">Genset Daily Running Hours</td></tr>' +
        '</tr>' +
        '<tr>' +
        '<td>genset#1</td>' +
        '<td>genset#2</td>' +
        '</tr>' +
        '<tr>' +
        '<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
        '<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
        '</tr>' +
        '</table>';
    Ext.getCmp('panel_daily').update(content_akum);
}

function update_grafik() {
    store_grafik.reload();
    //grafik.draw();
}

Ext.onReady(function () {

    setInterval(function () {
        daily_akum();
    }, 6000);

    setInterval(function () {
        update_grafik();
    }, 300000);

});