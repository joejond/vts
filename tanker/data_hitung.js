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
            "volume1","level_product1","delta_v1",
            "volume2","level_product2","delta_v2",
            "volume3","level_product3","delta_v3",
            "volume4","level_product4","delta_v4",
            "volume5","level_product5","delta_v5",
            "volume6","level_product6","delta_v6",
            "volume7","level_product7","delta_v7",
            "volume8","level_product8","delta_v8",
            "volume9","level_product9","delta_v9",
            "volume10","level_product10","delta_v10"]
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
        text: 'Export (xls)',
        scale: 'small',
        handler: function () {
			//console.log('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily);
            window.open('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily, '_blank'); 
        }
    }]
};

var tabel_akumulasi = Ext.create('Ext.grid.Panel', {
    title: 'Cargo per Jam',
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
        },{
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v1'
        }]
    },{
        header: "Cargo 1S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product6'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume6'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v6'
        }]
    },{
        header: "Cargo 2P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product2'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume2'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v2'
        }]
    },{
        header: "Cargo 2S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product7'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume7'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v7'
        }]
    },{
        header: "Cargo 3P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product3'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume3'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v3'
        }]
    },{
        header: "Cargo 3S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product8'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume8'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v8'
        }]
    },{
        header: "Cargo 4P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product4'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume4'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v4'
        }]
    },{
        header: "Cargo 4S",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product9'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume9'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v9'
        }]
    },{
        header: "Cargo 5P",
        columns: [{
            header: "Level",
            width: 100,
            dataIndex: 'level_product5'
        },{
            header: "Volume",
            width: 100,
            dataIndex: 'volume5'
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v5'
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
        },{ 
            header: "Selisih",
            width: 100,
            dataIndex: 'delta_v10'
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
        name: 'volume1',
        type: 'float',
        useNull: true
    }, {
        name: 'volume2',
        type: 'float',
        useNull: true
    }, {
        name: 'volume3',
        type: 'float',
        useNull: true
    }, {
        name: 'volume4',
        type: 'float',
        useNull: true
    }, {
        name: 'volume5',
        type: 'float',
        useNull: true
    }, {
        name: 'volume6',
        type: 'float',
        useNull: true
    }, {
        name: 'volume7',
        type: 'float',
        useNull: true
    }, {
        name: 'volume8',
        type: 'float',
        useNull: true
    }, {
        name: 'volume9',
        type: 'float',
        useNull: true
    }, {
        name: 'volume10',
        type: 'float',
        useNull: true
    }, {
        name: 'vol_tot',
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
        dataIndex: 'volume1',
        yAxis: 0,
        type: 'column',
        // color: '#0033FF',
        name: 'Cargo #1P',
        visible: true
    }, {
        dataIndex: 'volume6',
        yAxis: 0,
        // color: '#336600',
        type: 'column',
        name: 'Cargo #1S',
        visible: true
     }, {
        dataIndex: 'volume2',
        yAxis: 0,
        // color: '#8B6914',
        type: 'column',
        name: 'Cargo #2P',
        visible: true
        
    }, {
        dataIndex: 'volume7',
        yAxis: 0,
        // color: '#FA5A6A',
        type: 'column',
        name: 'Cargo #2S',
        visible: true
    }, {
        dataIndex: 'volume3',
        yAxis: 0,
        // color: '#FA5A03',
        type: 'column',
        name: 'Cargo #3P',
        visible: true
    }, {
        dataIndex: 'volume8',
        yAxis: 0,
        // color: '#FA5A0A',
        type: 'column',
        name: 'Cargo #3S',
        visible: true
    }, {
        dataIndex: 'volume4',
        yAxis: 0,
        // color: '#FA5A0B',
        type: 'column',
        name: 'Cargo #4P',
        visible: true
    }, {
        dataIndex: 'volume9',
        yAxis: 0,
        // color: '#FA5A0C',
        type: 'column',
        name: 'Cargo #4S',
        visible: true
    }, {
        dataIndex: 'volume5',
        yAxis: 0,
        // color: '#FA5A0D',
        type: 'column',
        name: 'Cargo #5P',
        visible: true
    }, {
		dataIndex: 'volume10',
        yAxis: 0,
        // color: '#FA5A0E',
        type: 'column',
        name: 'Cargo #5S',
        visible: true
    
    




  //   }, {
  //       dataIndex: 'fuel1',
  //       yAxis: 0,
  //       type: 'column',
  //       color: '#0033FF',
  //       // dashStyle: 'ShortDash',
  //       name: 'fuel main engine #1',
  //       visible: true
  //   }, {
  //       dataIndex: 'fuel2',
  //       yAxis: 0,
  //       color: '#336600',
  //       // dashStyle: 'ShortDash',
  //       type: 'spline',
  //       name: 'fuel main engine #2',
  //       visible: true
  //   }, {
  //       dataIndex: 'fuel3',
  //       yAxis: 1,
  //       color: '#8B6914',
  //       dashStyle: 'ShortDash',
  //       type: 'spline',
  //       name: 'fuel main engine #3',
  //       visible: true
  //   }, {
		// dataIndex: 'fuel4',
  //       yAxis: 1,
  //       color: '#FA5A6A',
  //       dashStyle: 'ShortDash',
  //       type: 'spline',
  //       name: 'fuel main engine #4',
  //       visible: false
  //   }, {
  //       dataIndex: 'rh1',
  //       yAxis: 2,
  //       type: 'spline',
  //       color: '#0033FF',
  //       dashStyle: 'ShortDot',
  //       name: 'genset #1',
  //       visible: false
  //   }, {
  //       dataIndex: 'rh2',
  //       yAxis: 2,
  //       type: 'spline',
  //       color: '#336600',
  //       dashStyle: 'ShortDot',
  //       name: 'genset #2',
  //       visible: false
  //   }, {
  //       dataIndex: 'rh3',
  //       yAxis: 2,
  //       type: 'spline',
  //       color: '#8B6914',
  //       dashStyle: 'ShortDot',
  //       name: 'genset #3',
  //       visible: false
    }],
    store: store_grafik,
    xField: 'jam',
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
                text: 'Cargo Volume (KL)',
                style: {
                    color: '#89A54E'
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            },
            min: 0
        // }, {
        //     gridLineWidth: 0,
        //     title: {
        //         text: 'flowmeter (liters)',
        //         style: {
        //             color: '#AA4643'
        //         }
        //     },
        //     labels: {
        //         style: {
        //             color: '#AA4643'
        //         }
        //     },
        //     min: 0,
        //     opposite: true
        // }, {
        //     gridLineWidth: 0,
        //     title: {
        //         text: 'runhour (hours)',
        //         style: {
        //             color: '#BB4643'
        //         }
        //     },
        //     labels: {
        //         style: {
        //             color: '#BB4643'
        //         }
        //     },
        //     min: 0,
        //     opposite: true
        }],
        plotOptions: {
            series: {
                animation: {
                    duration: 1000,
                    easing: 'swing'
                }
            },
            column: {
                stacking: 'normal',
                // dataLabels: {
                //     // enabled: true,
                //     color: 'white',
                //     style: {
                //         'fontSize': '70%'
                //     }
                // }
                // dataLabels: {
                //     enabled: true,
                //     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                //     style: {
                //         textShadow: '0 0 3px black'
                //     }
                // }
            }
        },
        tooltip: {
            // formatter: function () {
            //     return '<b>' + this.series.name + '</b><br/>hour-' + this.x + ': ' + this.y;
            // }
            headerFormat: '<b>Hour-{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y} KL<br/>Total Cargo: {point.stackTotal} KL'

        },
        credits: {
            href: '',
            text: ''
        },
        legend: {
            layout: 'vertical',
            floating: true,
            align: 'right',
            verticalAlign: 'top',
            x: -8,
            y: 30,
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
            '<tr><td colspan="2">Total Cargo Tanker</td></tr>' +
            '<tr><td colspan="2" style="font-size:22px;">' + tot_tot + ' </td></tr>' +
            '<tr>' +
            '<td>PortSide</td>' +
            '<td>StarBoard</td>' +
            '</tr>' +
            '<tr>' +
            '<td><span style="font-size:18px;">' + hasil1 + '</span></td>' +
            '<td><span style="font-size:18px;">' + hasil2 + '</span></td>' +
            '<tr><td colspan="2"></td></tr>' +
            // '<tr><td colspan="4">Genset Daily Running Hours</td></tr>' +
            // '</tr>' +
            // '<tr>' +
            // '<td>genset#1</td>' +
            // '<td>genset#2</td>' +
            // '<td colspan="2">genset#3</td>' +
            // '</tr>' +
            // '<tr>' +
            // '<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
            // '<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
            // '<td colspan="2"><span style="font-size:18px;">' + genset_3 + '</span></td>' +
            // '</tr>' +
            '</table>' ;
// var content_akum = '<style type="text/css">' +
// 			'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
// 			'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
// 			'</style>' +
// 			'<table width="100%" class="total_daily">' +
// 			'<tr><td colspan="4">Total Daily'+judul+'</td></tr>' +
// 			'<tr><td colspan="4" style="font-size:22px;">' + tot_tot + ' </td></tr>' +
// 			'<tr>' +
// 			'<td>PortSide</td>' +
// 			'<td>StarBoard</td>' +
// 			'<td>Center I</td>' +
// 			'<td>Center II</td>' +
// 			'</tr>' +
// 			'<tr>' +
// 			'<td><span style="font-size:18px;">' + hasil1 + '</span></td>' +
// 			'<td><span style="font-size:18px;">' + hasil2 + '</span></td>' +
// 			'<td><span style="font-size:18px;">' + hasil3 + '</span></td>' +
// 			'<td><span style="font-size:18px;">' + hasil4 + '</span></td>' +
// 			'<tr><td colspan="4"></td></tr>' +
// 			'<tr><td colspan="4">Genset Daily Running Hours</td></tr>' +
// 			'</tr>' +
// 			'<tr>' +
// 			'<td>genset#1</td>' +
// 			'<td>genset#2</td>' +
// 			'<td colspan="2">genset#3</td>' +
// 			'</tr>' +
// 			'<tr>' +
// 			'<td><span style="font-size:18px;">' + gen1_runhour + ' Hours</span></td>' +
// 			'<td><span style="font-size:18px;">' + gen2_runhour + ' Hours</span></td>' +
// 			'<td colspan="2"><span style="font-size:18px;">' + genset_3 + '</span></td>' +
// 			'</tr>' +
// 			'</table>' ;

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
                    // daily_cargo(comb_kapal21,tgl_sel21);
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
                    // daily_cargo(comb_kapal21,tgl_sel21);
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

// function daily_cargo(cb,tg){

//     var cb1 = (cb!='')? cb : '23';
//     console.log(cb1,tg);
//     // console.log(store_grafik);
//     // store_grafik.load({
//     //     // success : function(data){
//     //     //     alert('sukses');
//     //     // }, 
//     //     callback: function(options, response,success) {
//     //     if (success) {
//     //             // console.log(success);
//     //             console.log(response.response.responseText);
//     //             console.log(options);
//     //             // console.log(options, success, response, records);
//     //             // alert ('ke loadd');
//     //         }           
//     //     }

//     // });
//     //     params: { id: cb1, tgl: tg},
//     //     success : function(data){
//     //         console.log('success bro');
//     //         console.log(data);
//     //     }
//     // );

// }

// var eng_rh1 = '';
var cargo_p='';
var cargo_s='';
var cargo_tot='';
var input = 0; 
var output = 0;
function daily_akum() {
    input = 0;
    output = 0;
    Ext.Ajax.request({
        url: 'data_grafik_perhari.php',
        method: 'GET',
        params: {
            id: (comb_kapal21 !='') ? comb_kapal21 : '23',
            tgl: tgl_sel21
        },
        success: function (data) {
			var hasil = Ext.JSON.decode(data.responseText);
			// console.log(hasil.g_perhari);
            var dt = hasil.g_perhari;
            cargo_p = parseFloat(dt.volume1)+parseFloat(dt.volume2)+parseFloat(dt.volume3)+parseFloat(dt.volume4)+parseFloat(dt.volume5);
            cargo_s = parseFloat(dt.volume6)+parseFloat(dt.volume7)+parseFloat(dt.volume8)+parseFloat(dt.volume9)+parseFloat(dt.volume10);
            cargo_tot = cargo_p + cargo_s;

            (parseFloat(dt.delta_v1) < 0) ? (output += parseFloat(dt.delta_v1)) : (input += parseFloat(dt.delta_v1)); 
            (parseFloat(dt.delta_v2) < 0) ? (output += parseFloat(dt.delta_v2)) : (input += parseFloat(dt.delta_v2)); 
            (parseFloat(dt.delta_v3) < 0) ? (output += parseFloat(dt.delta_v3)) : (input += parseFloat(dt.delta_v3)); 
            (parseFloat(dt.delta_v4) < 0) ? (output += parseFloat(dt.delta_v4)) : (input += parseFloat(dt.delta_v4)); 
            (parseFloat(dt.delta_v5) < 0) ? (output += parseFloat(dt.delta_v5)) : (input += parseFloat(dt.delta_v5)); 
            (parseFloat(dt.delta_v6) < 0) ? (output += parseFloat(dt.delta_v6)) : (input += parseFloat(dt.delta_v6)); 
            (parseFloat(dt.delta_v7) < 0) ? (output += parseFloat(dt.delta_v7)) : (input += parseFloat(dt.delta_v7)); 
            (parseFloat(dt.delta_v8) < 0) ? (output += parseFloat(dt.delta_v8)) : (input += parseFloat(dt.delta_v8)); 
            (parseFloat(dt.delta_v9) < 0) ? (output += parseFloat(dt.delta_v9)) : (input += parseFloat(dt.delta_v9)); 
            (parseFloat(dt.delta_v10) < 0) ? (output += parseFloat(dt.delta_v10)) : (input += parseFloat(dt.delta_v10)); 
            // console.log("input "+input, "output "+output);
        },
        callback : function (){
			//daily_akum();
			
			content_akum = '<style type="text/css">' +
			'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
			'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
			'</style>' +
			'<table width="100%" class="total_daily">' +
			'<tr><td colspan="2">Total Cargo Tanker</td></tr>' +
			'<tr><td colspan="2" style="font-size:22px;">' + cargo_tot.toFixed(2) + ' KL </td></tr>' +
			'<tr>' +
			'<td>PortSide</td>' +
			'<td>StarBoard</td>' +
			'</tr>' +
			// '<tr>' +
			'<td><span style="font-size:18px;">' + cargo_p.toFixed(2) + ' KL </span></td>' +
			'<td><span style="font-size:18px;">' + cargo_s.toFixed(2) + ' KL </span></td>' +
			'<tr><td colspan="2"></td></tr>' +
			'<tr><td colspan="2">Oil Transfer</td></tr>' +
			// '</tr>' +
			'<tr>' +
			'<td>Oil IN</td>' +
			'<td>Oil OUT</td>' +
			// '<td colspan="2">genset#3</td>' +
			'</tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;">' + (parseFloat(input)).toFixed(2) + ' KL</span></td>' +
			'<td><span style="font-size:18px;">' + (parseFloat(output)).toFixed(2) + ' KL</span></td>' +
			'</tr>' +
			'</table>' ;
			Ext.getCmp('panel_daily').update(content_akum);
			
			}
        
    });
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
