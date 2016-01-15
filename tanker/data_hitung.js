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
var eng3_daily = 0.0;
var eng4_daily = 0.0;
var rh_engine1 = 0.0;
var rh_engine2 = 0.0;
var rh_engine_tot = 0.0;

//var ef3 = 0.0;
var gen1_runhour = 0.0;
var gen2_runhour = 0.0;
var gen3_runhour = 0.0;
var genset_3 = 0.0;

var hasil1 = 0.0;
var hasil2 = 0.0;
var hasil3 = 0.0;
var hasil4 = 0.0;
var tot_tot = 0.0;
var judul = '';



//var gen_rh3 = 0.0;
var tgl_daily = year1 + "-" + month1 + "-" + day1;
var tgl_chart = year1 + "-" + month1 + "-" + day1;

var comb_kapal22 = '';
var comb_kapal21 = '';
var tgl_sel21 = '';
var tgl_sel22 = '';


var model_akumulasi = Ext.define('akumulasi', {
    extend: 'Ext.data.Model',
    fields: [
            {name : "waktu", type : 'string'},
            "volume1","level_product1",
            "volume2","level_product2",
            "volume3","level_product3",
            "volume4","level_product4",
            "volume5","level_product5",
            "volume6","level_product6",
            "volume7","level_product7",
            "volume8","level_product8",
            "volume9","level_product9",
            "volume10","level_product10"]
});

var store_akumulasi = Ext.create('Ext.data.Store', {
    model: model_akumulasi,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'data_grafik_perjam.php?',
        method: 'GET',
        reader: {
            type: 'json',
            //successProperty: 'success',
            root: 'g_perjam',
            messageProperty: 'message'
        }
    }
    //listeners: {
        //'beforeload': function (store, options) {
            //store.proxy.extraParams.name=comb_kapal2;
			//store.proxy.extraParams.tgl2=tgl_sel2;
        //}
    //}
});

//var model_grafik_perhari = Ext.define('perhari',{
	//extend : 'Ext.data.Model',
	//fields : ['id','fl1', 'ovfl1', 'fl2', 'ovfl2', 'rh1', 'rh2']
	
	//});

//var store_grafik_hari = Ext.create('Ext.data.Store',{
	//model : model_grafik_perhari,
	//autoload : true,
	//proxy:{
		//url: 'data_grafik_perhari.php?',
        //method: 'GET',
        //reader: {
            //type: 'json',
            ////successProperty: 'success',
            //root: 'g_perhari',
            //messageProperty: 'message'
		
		//}
	//}
	
//});

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
            read: 'ship_list.php'
        },
        reader: {
			//totalProperty:'total',
            type: 'json',
            //successProperty: 'success',
            root: 'ship',
            messageProperty: 'message'
        }   
    }
});

/*
var ship_combo2 = new Ext.form.ComboBox({
    displayField: 'name',
    queryMode: 'remote',
    valueField: 'name',
    width: 200,
    store: store_combo_kapal2,
    listeners: {
        select: function () {
            comb_kapal2 = this.getValue();
            //console.log(comb_kapal2);
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
* */

var but_export = {
    xtype: 'buttongroup',
    frame: false,
    items: [{
        text: 'export (xls)',
        scale: 'small',
        handler: function () {
			//console.log('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily);
            window.open('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily, '_blank'); 
        }
    }]
};

var tabel_akumulasi = Ext.create('Ext.grid.Panel', {
    title: 'akumulasi data flowmeter',
    store: store_akumulasi,
    flex: 5,
    columns: [{
        header: "Date",
        width: 150,
        locked : true,
        dataIndex: 'waktu'
        //format : 'd-M-Y H'
        //renderer: Ext.util.Format.dateRenderer('d-M-Y H')
        //renderer: Ext.util.Format.dateRenderer('d-M-Y')
    //}, {
        //header: "hour",
        //width: 60,
        //dataIndex: 'jam',
        //locked : true
    },{
        header: "Cargo 1P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product1'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume1'
        }]
    },{
        header: "Cargo 1S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product2'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume2'
        }]
    },{
        header: "Cargo 2P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product3'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume3'
        }]
    },{
        header: "Cargo 2S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product4'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume4'
        }]
    },{
        header: "Cargo 2S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product4'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume4'
        }]
    },{
        header: "Cargo 2S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product4'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume4'
        }]
    },{
        header: "Cargo 3P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product5'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume5'
        }]
    },{
        header: "Cargo 3S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product6'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume6'
        }]
    },{
        header: "Cargo 4P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product7'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume7'
        }]
    },{
        header: "Cargo 4S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product8'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume8'
        }]
    },{
        header: "Cargo 5P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product9'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume9'
        }]
    },{
        header: "Cargo 5S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product10'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume10'
        }]
    }]
});


//highchart

Ext.define('HighChartData', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'jam',
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
        name: 'rpm3',
        type: 'float',
        useNull: true
    }, {
        name: 'rpm4',
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
        name: 'fuel3',
        type: 'float',
        useNull: true
	}, {
        name: 'fuel4',
        type: 'float',
        useNull: true
    }, {
        name: 'rh1',
        type: 'float',
        useNull: true
    }, {
        name: 'rh2',
        type: 'float',
        useNull: true
    }, {
        name: 'rh3',
        type: 'float',
        useNull: true
    }]
});

var store_grafik = Ext.create('Ext.data.Store', {
    model: 'HighChartData',
    proxy: {
        type: 'ajax',
        url: 'data_chart_sp.php?',
        method: 'GET',
        reader: {
            type: 'json',
            //successProperty: 'success',
            root: 'chart',
            messageProperty: 'message'
        }
    },
    //listeners: {
        //'beforeload': function (store, options) {
            //store.proxy.extraParams.name=comb_kapal21;
			//store.proxy.extraParams.tanggal=tgl_sel21;
        //}
    //},
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
        dataIndex: 'rpm3',
        yAxis: 0,
        color: '#8B6914',
        type: 'spline',
        name: 'rpm #3',
        visible: true
        
    }, {
		dataIndex: 'rpm4',
        yAxis: 0,
        color: '#FA5A6A',
        type: 'spline',
        name: 'rpm #4',
        visible: false
        
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
        dataIndex: 'fuel3',
        yAxis: 1,
        color: '#8B6914',
        dashStyle: 'ShortDash',
        type: 'spline',
        name: 'fuel main engine #3',
        visible: true
    }, {
		dataIndex: 'fuel4',
        yAxis: 1,
        color: '#FA5A6A',
        dashStyle: 'ShortDash',
        type: 'spline',
        name: 'fuel main engine #4',
        visible: false
    }, {
        dataIndex: 'rh1',
        yAxis: 2,
        type: 'spline',
        color: '#0033FF',
        dashStyle: 'ShortDot',
        name: 'genset #1',
        visible: false
    }, {
        dataIndex: 'rh2',
        yAxis: 2,
        type: 'spline',
        color: '#336600',
        dashStyle: 'ShortDot',
        name: 'genset #2',
        visible: false
    }, {
        dataIndex: 'rh3',
        yAxis: 2,
        type: 'spline',
        color: '#8B6914',
        dashStyle: 'ShortDot',
        name: 'genset #3',
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
			'<tr><td colspan="4">Total Daily'+judul+'</td></tr>' +
			'<tr><td colspan="4" style="font-size:22px;">' + tot_tot + ' </td></tr>' +
			'<tr>' +
			'<td>PortSide</td>' +
			'<td>StarBoard</td>' +
			'<td>Center I</td>' +
			'<td>Center II</td>' +
			'</tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;">' + hasil1 + '</span></td>' +
			'<td><span style="font-size:18px;">' + hasil2 + '</span></td>' +
			'<td><span style="font-size:18px;">' + hasil3 + '</span></td>' +
			'<td><span style="font-size:18px;">' + hasil4 + '</span></td>' +
			'<tr><td colspan="4"></td></tr>' +
			'<tr><td colspan="4">Genset Daily Running Hours</td></tr>' +
			'</tr>' +
			'<tr>' +
			'<td>genset#1</td>' +
			'<td>genset#2</td>' +
			'<td colspan="2">genset#3</td>' +
			'</tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
			'<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
			'<td colspan="2"><span style="font-size:18px;">' + genset_3 + '</span></td>' +
			'</tr>' +
			'</table>' ;

//function update_text2() {		
	//var content_text2 = '<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal2+' - date: '+tgl_sel2+')</div></body></html>';
	//Ext.getCmp('toolbar_text2').update(content_text2);
//}


var panel_hitung = {
    dockedItems: [{
		padding : '0 0 0 10',
        xtype: 'toolbar',
        dock: 'top',
		height: 40,
        items: [{
			xtype : 'combobox',
			fieldLabel: ' Selected Ship',
			labelWidth : 80,
			width	: 300,
			queryMode: 'remote',
			emptyText: '- select ship -',
			editable : false,
			displayField: 'name',
			valueField: 'id',
			store: store_combo_kapal2,
			listeners:{
				select: function() {
					comb_kapal21 = this.getValue();
					comb_kapal22 = this.getRawValue();
					//console.log(comb_kapal21+' --> '+ comb_kapal22);
					//console.log(tgl_sel1);
					store_grafik.load({params: { id: comb_kapal21, tgl: tgl_sel21}});
					store_akumulasi.load({params : { id: comb_kapal21, tgl: tgl_sel21 }});
					Ext.getCmp('table_chart').setTitle('Vessel '+comb_kapal22 +' on '+ tgl_sel22);
					//tabel_detail_kapal
					//update_text1();
					daily_akum();
					//console.log('ini pilih kapal');
					//console.log('ini pilih kapal');
					
				},
				afterrender : function(){
						var isi1 = this.getStore().data.items[0].data['name'];
						var isiid = this.getStore().data.items[0].data['id'];
						this.setValue(isi1);
						comb_kapal22 = (comb_kapal21 != '') ? comb_kapal22 : isi1;
						Ext.getCmp('table_chart').setTitle('Vessel '+isi1+' on '+ Ext.Date.format(new Date(), 'd-M-Y' ));
						
						//store_grafik_hari.load({params : { id: comb_kapal22, tgl: tgl_sel21 }});
						//console.log('comb_kapal22 : '+isiid);
						//console.log('tgl_sel21  : '+tgl_sel21);
						
					}
			}
		},{
			padding : '0 0 0 5',
			fieldLabel: 'Date',
			id: 'date_total2',
			labelWidth: 40,
			xtype: 'datefield',
			value: new Date(),
			maxValue: new Date(),
			editable : false,
			format: 'd-M-Y',
			listeners: {
				change: function () {
					
					//console.log('Date selected: ', Ext.Date.format(this.getValue(),'Y-m-d'));
					//console.log()
					tgl_sel21 = Ext.Date.format(this.getValue(),'Y-m-d');
					store_grafik.load({params: { id: comb_kapal21, tgl: tgl_sel21}});
					store_akumulasi.load({params : { id: comb_kapal21, tgl: tgl_sel21 }});
					tgl_sel22 = (tgl_sel21 != '') ? Ext.Date.format(this.getValue(),'d-M-Y') : Ext.Date.format(new Date(), 'd-M-Y' );
					//console.log(tgl_sel2);
					Ext.getCmp('table_chart').setTitle('Vessel '+comb_kapal22 +' on '+ tgl_sel22);
					//update_text1();
					daily_akum();
					//Ext.getCmp('panel_daily').update(content_akum);
					
				}, 
				afterrender : function(){
					//console.log('Date selected: ', this.getValue());
					tgl_sel21 = Ext.Date.format(this.getValue(),'Y-m-d');
					tgl_sel22 = (tgl_sel21 != '') ? tgl_sel21 : Ext.Date.format(new Date(), 'd-M-Y' );
					//console.log(tgl_sel21);
					//comb_kapal23 = (comb_kapal21 != '') ? '1' : isi1;
					
					//console.log('comb_kapal22 : '+comb_kapal23);
					//console.log('tgl_sel21  : '+tgl_sel21);
					}
			}
			
			
			
			
			//fieldLabel: 'Date',
			//id: 'date_total',
			//labelWidth: 40,
			//xtype: 'datefield',
			//value: new Date(),
			//format: 'd-M-Y',
			//listeners: {
				//change: function () {
					////console.log(Ext.util.Format.date(Ext.getCmp('date_total').getValue(), 'd-m-Y'));
					////tgl_sel2 = Ext.util.Format.date(Ext.getCmp('date_total').getValue(), 'Y-m-d');
					////store_akumulasi.load({params: { name: comb_kapal2, tgl2: tgl_sel2}});
					////store_grafik.load({params: { name: comb_kapal2, tgl2: tgl_sel2}});
					////update_text2();
					////daily_akum();
				//}
			//}
			//},
			//'-',
			//{id: 'toolbar_text2', html:'<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal2+' - date: '+tgl_sel2+')</div></body></html>'}
        }]
    }],
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
		id : 'table_chart',
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

var eng_rh1 = '';
function daily_akum() {
    Ext.Ajax.request({
        url: 'data_grafik_perhari.php',
        method: 'GET',
        params: {
            id: (comb_kapal21 !='') ? comb_kapal21 : '1',
            tgl: tgl_sel21
        },
        success: function (data) {
			var hasil = Ext.JSON.decode(data.responseText);
			//console.log(hasil.g_perhari[0]);
			//console.log(hasil.g_perhari[0].tot_fl1 +' -&- '+hasil.g_perhari[0].tot_fl2 );
			//var flow = (hasil.g_perhari[0].tot_fl1 === null) ? hasil.g_perhari[0].engrh1 : hasil.g_perhari[0].tot_fl1;
			//console.log('rh engine = '+  flow);
            //var temp = new Array();
            //temp = (data.responseText).split(",");
             eng1_daily = parseFloat(hasil.g_perhari[0].tot_fl1) - parseFloat(hasil.g_perhari[0].tot_ovfl1);
             eng2_daily = parseFloat(hasil.g_perhari[0].tot_fl2) - parseFloat(hasil.g_perhari[0].tot_ovfl2);
             eng3_daily = parseFloat(hasil.g_perhari[0].tot_fl3) - parseFloat(hasil.g_perhari[0].tot_ovfl3);
             eng4_daily = parseFloat(hasil.g_perhari[0].tot_fl4) - parseFloat(hasil.g_perhari[0].tot_ovfl4);
            //var ef3 =  isNaN(eng3_daily) ? 0 : eng3_daily ; 
            //console.log(eng3_daily, eng4_daily);
            
            
             gen1_runhour = parseFloat(hasil.g_perhari[0].rh1).toFixed(2);
            //gen1_runhour = gen1_runhour_1.toFixed(2);
             gen2_runhour = parseFloat(hasil.g_perhari[0].rh2).toFixed(2);
             gen3_runhour = parseFloat(hasil.g_perhari[0].rh3).toFixed(2);
            //gen1_runhour = gen2_runhour_1.toFixed(2);
			
			rh_engine1 = parseFloat(hasil.g_perhari[0].engrh1).toFixed(2);
			rh_engine2 = parseFloat(hasil.g_perhari[0].engrh2).toFixed(2);
			rh_engine_tot = (parseFloat(rh_engine1) + parseFloat(rh_engine2)).toFixed(2);
			
			//console.log(rh_engine1);
			//console.log(rh_engine2);
			//console.log(rh_engine_tot);
			
			total_daily = eng1_daily + eng2_daily + (isNaN(eng3_daily)?0:eng3_daily) + (isNaN(eng4_daily)?0:eng4_daily);
			hasil1 = isNaN(eng1_daily) ? (rh_engine1 + ' Hours')  : (eng1_daily + ' Lt') ;
			hasil2 = isNaN(eng2_daily) ? (rh_engine2 + ' Hours')  : (eng2_daily + ' Lt') ;
			hasil3 = isNaN(eng3_daily) ?  'N/A' : (eng3_daily + ' Lt');
			hasil4 = isNaN(eng4_daily) ?  'N/A' : (eng4_daily + ' Lt');
			genset_3 = isNaN(gen3_runhour) ? 'N/A' : (gen3_runhour + ' Hours') ;
            tot_tot = isNaN(rh_engine_tot) ? (total_daily+ ' Lt') : (rh_engine_tot + ' Hours');
            judul = isNaN(rh_engine_tot) ? (' Fuel Consumption ') : (' Engine Running Hours ');
            
        },
        callback : function (){
			//daily_akum();
			
			content_akum = '<style type="text/css">' +
			'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
			'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
			'</style>' +
			'<table width="100%" class="total_daily">' +
			'<tr><td colspan="4">Total Daily'+judul+'</td></tr>' +
			'<tr><td colspan="4" style="font-size:22px;">' + tot_tot + ' </td></tr>' +
			'<tr>' +
			'<td>PortSide</td>' +
			'<td>StarBoard</td>' +
			'<td>Center I</td>' +
			'<td>Center II</td>' +
			'</tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;">' + hasil1 + '</span></td>' +
			'<td><span style="font-size:18px;">' + hasil2 + '</span></td>' +
			'<td><span style="font-size:18px;">' + hasil3 + '</span></td>' +
			'<td><span style="font-size:18px;">' + hasil4 + '</span></td>' +
			'<tr><td colspan="4"></td></tr>' +
			'<tr><td colspan="4">Genset Daily Running Hours</td></tr>' +
			'</tr>' +
			'<tr>' +
			'<td>genset#1</td>' +
			'<td>genset#2</td>' +
			'<td colspan="2">genset#3</td>' +
			'</tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
			'<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
			'<td colspan="2"><span style="font-size:18px;">' + genset_3 + '</span></td>' +
			'</tr>' +
			'</table>' ;
			Ext.getCmp('panel_daily').update(content_akum);
			
			}
        
        
        
        
    });
    //content_akum = '<style type="text/css">' +
        //'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
        //'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
        //'</style>' +
        //'<table width="100%" class="total_daily">' +
        //'<tr><td colspan="3">Total Daily Fuel</td></tr>' +
        //'<tr><td colspan="3" style="font-size:22px;">' + total_daily + ' Liters</td></tr>' +
        //'<tr>' +
        //'<td>Engine#1</td>' +
        //'<td>Engine#2</td>' +
        //'<td>Engine#3</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td><span style="font-size:18px;">' + eng1_daily + ' Lt</span></td>' +
        //'<td><span style="font-size:18px;">' + eng2_daily + ' Lt</span></td>' +
        //'<td><span style="font-size:18px;">' + (isNaN(eng3_daily)?0:eng3_daily) + ' Lt</span></td>' +
        //'<tr><td colspan="3"></td></tr>' +
        //'<tr><td colspan="3">Genset Daily Running Hours</td></tr>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>genset#1</td>' +
        //'<td>genset#2</td>' +
        //'<td>genset#3</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
        //'<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
        //'<td><span style="font-size:18px;">' + (isNaN(gen3_runhour)?0:gen3_runhour) + ' Hours</span></td>' +
        //'</tr>' +
        //'</table>';
    //Ext.getCmp('panel_daily').update(content_akum);
}

function update_grafik() {
    store_grafik.reload();
    //grafik.draw();
}

Ext.onReady(function () {

    //setInterval(function () {
    daily_akum();
        ////console.log ('kapal : '+comb_kapal21 + ' & tgl : '+tgl_sel21);
    //}, 6*1000);

    setInterval(function () {
        update_grafik();
        daily_akum();
    }, 300*1000);

});
