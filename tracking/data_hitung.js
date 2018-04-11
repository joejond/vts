
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
var ae1_daily = 0.0;
var ae2_daily = 0.0;
var rh_engine1 = 0.0;
var rh_engine2 = 0.0;
var rh_ae1 = 0.0;
var rh_ae2 = 0.0;
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

// var hostnya = 'http://10.10.10.11:1336';
// console.log('jajal getApi===> '+getAPI());



//var gen_rh3 = 0.0;
var tgl_daily = year1 + "-" + month1 + "-" + day1;
var tgl_chart = year1 + "-" + month1 + "-" + day1;

var comb_kapal22 = '';
var comb_kapal21 = '';
var tgl_sel21 = '';
var tgl_sel22 = '';
  // var hostku = ini_host_api();
  // console.log(host_ku);


var model_akumulasi_perjam = Ext.define('akumulasi', {
    extend: 'Ext.data.Model',
      fields:[
        "date","time","Total Daily",
        "working distance","average speed",
        "working hours ME1","working hours ME2","working hours AE1","working hours AE2",
        "ME1 consumtion","ME2 consumtion","AE1 consumtion","AE2 consumtion",
        "ME1 average rpm","ME2 average rpm","AE1 average rpm","AE2 average rpm"
      ]



});

var store_akumulasi_perjam = Ext.create('Ext.data.Store', {
    model: model_akumulasi_perjam,
    // autoLoad: true,
    proxy: {
        type: 'ajax',
        url: getAPI()+'/get_data_summary_ship_hourly',
        // url: 'http://10.10.10.11:1336/get_data_summary_ship_hourly',
        // url: 'http://192.168.1.17:1337/get_data_summary_ship_hourly',
        method: 'GET',
        // reader: {
        //     type: 'json',
        //     //successProperty: 'success',
        //     root: 'g_perjam',
        //     messageProperty: 'message'
        // }
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

// var model_combo_kapal2 = Ext.define('Kapal', {
//     extend: 'Ext.data.Model',
//     fields: ['name']
// });
//
// var store_combo_kapal2 = Ext.create('Ext.data.Store', {
//     model: model_combo_kapal2,
//     autoLoad: true,
//     proxy: {
//         type: 'ajax',
//         api: {
//             read: 'ship_list.php'
//         },
//         reader: {
// 			//totalProperty:'total',
//             type: 'json',
//             //successProperty: 'success',
//             root: 'ship',
//             messageProperty: 'message'
//         }
//     }
// });

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
            // window.open('export_perjam.php?name=' + comb_kapal2 + '&tgl=' + tgl_daily, '_blank');
            console.log(comb_kapal22,tgl_sel22);
            // Vessel '+comb_kapal22 +' on '+ tgl_sel22
        }
    }]
};

var tabel_akumulasi = Ext.create('Ext.grid.Panel', {
    title: 'Daily Flowmeter',
    store: store_akumulasi_perjam,
    flex: 5,
    columns: [{
        header: "Jam",
        width: 150,
        locked : true,
        dataIndex: 'time',
        renderer: function(value) {
            return "<b>" + value + "</b>";
        }
        //format : 'd-M-Y H'
        //renderer: Ext.util.Format.dateRenderer('d-M-Y H')
        //renderer: Ext.util.Format.dateRenderer('d-M-Y')

    },{
        header: "PortSide",
        columns: [{
            header: "RunHours",
            width: 100,
            dataIndex: 'working hours ME2',
            renderer: function(v){return parseFloat(v).toFixed(2);}
        },{
            header: "Fuel",
            width: 100,
            dataIndex: 'ME2 consumtion',
            renderer: function(v){return parseFloat(v).toFixed(2);}
        },{
            header: "RPM",
            width: 100,
            dataIndex: 'ME2 average rpm',
            renderer: function(v){return parseFloat(v).toFixed(2);}
        }]
    },{
        header: "StarBoard",
        columns: [{
          header: "RunHours",
          width: 100,
          dataIndex: 'working hours ME1',
          renderer: function(v){return parseFloat(v).toFixed(2);}
      },{
          header: "Fuel",
          width: 100,
          dataIndex: 'ME1 consumtion',
          renderer: function(v){return parseFloat(v).toFixed(2);}
      },{
          header: "RPM",
          width: 100,
          dataIndex: 'ME1 average rpm',
          renderer: function(v){return parseFloat(v).toFixed(2);}
        }]
    },{
        header: "PortSide GenSet",
        columns: [{
          header: "RunHours",
          width: 100,
          dataIndex: 'working hours AE2',
	  renderer: function(v){return parseFloat(v).toFixed(2);}
      },{
          header: "Fuel",
          width: 100,
          dataIndex: 'AE2 consumtion',
          renderer: function(v){return parseFloat(v).toFixed(2);}
      },{
          header: "RPM",
          width: 100,
          dataIndex: 'AE2 average rpm',
          renderer: function(v){return parseFloat(v).toFixed(2);}
        }]
    }, {
		header: "StarBoard GenSet",
        columns: [{
          header: "RunHours",
          width: 100,
          dataIndex: 'working hours AE1',
          renderer: function(v){return parseFloat(v).toFixed(2);}
      },{
          header: "Fuel",
          width: 100,
          dataIndex: 'AE1 consumtion',
          renderer: function(v){return parseFloat(v).toFixed(2);}
          // renderer: function(v){return (v==null)? null :  parseFloat(v).toFixed(2);}
      },{
          header: "RPM",
          width: 100,
          dataIndex: 'AE1 average rpm',
          renderer: function(v){return parseFloat(v).toFixed(2);}
        }]
    }, {
      header: "Distance",
      width: 100,
      dataIndex: 'working distance',
      renderer: function(v){return parseFloat(v).toFixed(2);}
  }, {
      header: "Speed",
      width: 100,
      dataIndex: 'average speed',
      renderer: function(v){return parseFloat(v).toFixed(2);}

  }],

    tbar : ['->',{
        xtype : 'button',
        text : 'Export to Excel',
        handler : function(){
            // console.log('ini kiirm ke excel');
            // console.log(comb_kapal22,tgl_sel22);

            // var id_kpl = (comb_kapal21 === '')? '1' : comb_kapal21;
            // console.log(id_kpl,tgl_sel21);
            // window.open('export_data_perjam.php?id='+id_kpl+'&t='+tgl_sel21);
            window.open(getAPI()+'/get_data_summary_ship_hourly?tz='+getTimeZone()+'&tgl='+tgl_sel21+'&export=true');
            // store_akumulasi_perjam.load({params : { /*id: comb_kapal21,*/ tz: getTimeZone(),tgl: tg }});

        }
        // tooltip: 'Export to xls files'
    }]
});


//highchart

Ext.define('HighChartData', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'time',type: 'string'},
      {name: 'ME1 average rpm',type: 'float',useNull: true},
      {name: 'ME2 average rpm',type: 'float',useNull: true},
      {name: 'AE1 average rpm',type: 'float',useNull: true},
      {name: 'AE2 average rpm',type: 'float',useNull: true},
      {name: 'ME1 consumtion',type: 'float',useNull: true},
      {name: 'ME2 consumtion',type: 'float',useNull: true},
      {name: 'AE1 consumtion',type: 'float',useNull: true},
      {name: 'AE2 consumtion',type: 'float',useNull: true},
      {name: 'working hours ME1',type: 'float',useNull: true},
      {name: 'working hours ME2',type: 'float',useNull: true},
      {name: 'working hours AE1',type: 'float',useNull: true},
      {name: 'working hours AE2',type: 'float',useNull: true},
      {name: 'Total Perjam',type: 'float',useNull: true}
    ]
});

var store_grafik = Ext.create('Ext.data.Store', {
    model: 'HighChartData',
    proxy: {
        type: 'ajax',
        // url: 'data_chart_sp.php?',
        // url: 'http://192.168.1.17:1337/get_data_summary_ship_graphic',
        // url: 'http://10.10.10.11:1336/get_data_summary_ship_graphic',
        url: getAPI()+'/get_data_summary_ship_graphic',

    },
    //listeners: {
        //'beforeload': function (store, options) {
            //store.proxy.extraParams.name=comb_kapal21;
			//store.proxy.extraParams.tanggal=tgl_sel21;
        //}
    //},
    // autoLoad: false
});

var grafik = new Ext.create('Chart.ux.Highcharts', {
    id: 'chart',
    series: [{
        dataIndex: 'ME2 average rpm',
        yAxis: 0,
        type: 'spline',
        color: '#0033FF',
        name: 'RPM ME1 (PortSide)',
        visible: true
    }, {
        dataIndex: 'ME1 average rpm',
        yAxis: 0,
        color: '#336600',
        type: 'spline',
        name: 'RPM ME2 (StartBoard)',
        visible: true
     }, {
        dataIndex: 'AE2 average rpm',
        yAxis: 0,
        color: '#8B6914',
        type: 'spline',
        name: 'RPM AE1 (PortSide GenSet)',
        visible: true
    }, {
         dataIndex: 'AE1 average rpm',
         yAxis: 0,
         color: '#8B6900',
         type: 'spline',
         name: 'RPM AE2 (StartBoard GenSet)',
         visible: true

    }, {
        dataIndex: 'ME2 consumtion',
        yAxis: 1,
        type: 'spline',
        color: '#0033FF',
        dashStyle: 'ShortDash',
        name: 'ME1 Fuel Consumption (PortSide)',
        visible: true
    }, {
        dataIndex: 'ME1 consumtion',
        yAxis: 1,
        color: '#336600',
        dashStyle: 'ShortDash',
        type: 'spline',
        name: 'ME2 Fuel Consumption (StartBoard)',
        visible: true
    }, {
        dataIndex: 'AE2 consumtion',
        yAxis: 1,
        color: '#8B6914',
        dashStyle: 'ShortDash',
        type: 'spline',
        name: 'AE1 Fuel Consumption (PortSide GenSet)',
        visible: true
    }, {
		    dataIndex: 'AE1 consumtion',
        yAxis: 1,
        color: '#FA5A6A',
        dashStyle: 'ShortDash',
        type: 'spline',
        name: 'AE2 Fuel Consumption (StarBoard GenSet)',
        visible: true
    }, {
        dataIndex: 'working hours ME2',
        yAxis: 2,
        type: 'spline',
        color: '#0033FF',
        dashStyle: 'ShortDot',
        name: 'Working Hours ME1 (PortSide)',
        visible: true
    }, {
        dataIndex: 'working hours ME1',
        yAxis: 2,
        type: 'spline',
        color: '#336600',
        dashStyle: 'ShortDot',
        name: 'Working Hours ME2 (StartBoard)',
        visible: true
    }, {
        dataIndex: 'working hours AE2',
        yAxis: 2,
        type: 'spline',
        color: '#8B6914',
        dashStyle: 'ShortDot',
        name: 'Working Hours AE1 (PortSide GenSet)',
        visible: true
    }, {
        dataIndex: 'working hours AE1',
        yAxis: 2,
        type: 'spline',
        color: '#8B6914',
        dashStyle: 'ShortDot',
        name: 'Working Hours AE2 (StartBoard GenSet)',
        visible: true
    }, {
        dataIndex: 'Total Perjam',
        yAxis: 1,
        type: 'spline',
        color: '#FF00FF',
        dashStyle: 'ShortDot',
        name: 'Total Fuel Consumption',
        visible: true
    }],
    store: store_grafik,
    // store: store_akumulasi_perjam,
    xField: 'time',
    chartConfig: {
        chart: {
            marginRight: 500,
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
            plotLines:[{
                value : 1000,
                color: 'red',
                width: 1,
                dashStyle: 'longdashdot',
                label:{
                  text: 'Daily Limit',
                  align: 'left',
                  style:{
                    color:'blue'
                  }
                }
            }],
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
                return '<b>' + this.series.name + '</b><br/>hour-' + this.x + ': ' + parseFloat(this.y).toFixed(2);
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
			'<tr><td colspan="2">Total Daily</td></tr>' +
			'<tr><td colspan="2" style="font-size:22px;">' + total_daily + ' Liters</td></tr>' +
			'<tr><td>PortSide</td><td>StarBoard</td></tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;"> ' + eng1_daily + ' Liters</span></td>' +
			'<td><span style="font-size:18px;"> ' + eng2_daily + ' Liters</span></td>'+
      '</tr>' +
      '<tr>'+
      '<td><span style="font-size:18px;"> ' + rh_engine1 + ' Hours</span></td>' +
			'<td><span style="font-size:18px;"> ' + rh_engine2 + ' Hours</span></td>'+
      '</tr>' +
			'<tr><td colspan="2"></td></tr>' +
			'<tr><td colspan="2">Genset Daily</td></tr>' +
			'</tr>' +
			'<tr>' +
			'<td>genset#1</td>' +
			'<td>genset#2</td>' +
			'</tr>' +
			'<tr>' +
			'<td><span style="font-size:18px;"> ' + ae1_daily + ' Liters</span></td>' +
			'<td><span style="font-size:18px;">' + ae2_daily + ' Liters</span></td>' +
			'</tr>' +
      '<tr>' +
			'<td><span style="font-size:18px;">' + rh_ae1 + ' Hours</span></td>' +
			'<td><span style="font-size:18px;">' + rh_ae2 + ' Hours</span></td>' +
			'</tr>' +
			'</table>' ;

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
            //  store: store_combo_kapal2,
             store: store_combo_kapal1,
             listeners:{
              	select: function() {
              		comb_kapal21 = this.getValue();
              		comb_kapal22 = this.getRawValue();
              		// console.log(comb_kapal21+' --> '+ comb_kapal22);
              		//console.log(tgl_sel1);
              		store_grafik.load({params: { /*id: comb_kapal21, */tz: getTimeZone(), tgl: tgl_sel21}});
              		store_akumulasi_perjam.load({params : { /*id: comb_kapal21,*/ tz: getTimeZone(),tgl: tgl_sel21 }});
              		Ext.getCmp('table_chart').setTitle('Vessel '+comb_kapal22 +' on '+ tgl_sel22);
              		//tabel_detail_kapal
              		//update_text1();
              		daily_akum();
              		//console.log('ini pilih kapal');
              		//console.log('ini pilih kapal');
                  // console.log('ini abc --> '+abc);

              	},
              	afterrender : function(){
              			var isi1 = this.getStore().data.items[0].data['name'];
              			var isiid = this.getStore().data.items[0].data['id'];
              			this.setValue(isi1);
              			comb_kapal22 = (comb_kapal21 != '') ? comb_kapal22 : isi1;
                    // console.log('==> '+comb_kapal22);
              			// Ext.getCmp('table_chart').setTitle('Vessel '+isi1+' on '+ Ext.Date.format(new Date(), 'd-M-Y' ));
                    // console.log(this.getStore().data);
              			// store_grafik_hari.load({params : { id: comb_kapal22, tgl: tgl_sel21 }});
              			// store_grafik.load({params : { tz: getTimeZone(), tgl: tgl_sel21 }});
              			// console.log('comb_kapal22 : '+comb_kapal22);
              			// console.log('tgl_sel21  : '+tgl_sel21);
                    var tg = Ext.Date.format(Ext.getCmp('date_tab2').getValue(),'Y-m-d');
                    tgl_sel21 = tg;
                    store_grafik.load({params : { tz: getTimeZone(), tgl: tg }});
                    store_akumulasi_perjam.load({params : { /*id: comb_kapal21,*/ tz: getTimeZone(),tgl: tg }});
                    daily_akum();

                    // var tgl_ditab2 = (tgl_sel21=='')?Ext.getCmp('date_tab').getValue();
                    // console.log(Ext.getCmp('date_tab').getValue());

                    // var hostnya = getAPI();
                    // console.log(hostnya);

              		}
              }
		},{
			padding : '0 0 0 5',
			fieldLabel: 'Date',
			id: 'date_tab2',
			labelWidth: 40,
			xtype: 'datefield',
			value: new Date(),
			maxValue: new Date(),
			editable : false,
			format: 'd-M-Y',
			listeners: {
    				change: function () {
              // console.log('ini test--> '+test);
    					//console.log('Date selected: ', Ext.Date.format(this.getValue(),'Y-m-d'));
    					//console.log()
    					tgl_sel21 = Ext.Date.format(this.getValue(),'Y-m-d');
              // console.log('onchage ==> ',tgl_sel21);
    					// store_grafik.load({params: { id: comb_kapal21, tgl: tgl_sel21}});
    					store_grafik.load({params: { /*id: comb_kapal21,*/ tz:getTimeZone() , tgl: tgl_sel21}});
    					// store_akumulasi.load({params : { id: comb_kapal21, tgl: tgl_sel21 }});
    					store_akumulasi_perjam.load({params : { /*id: comb_kapal21,*/ tz:getTimeZone(), tgl: tgl_sel21 }});
    					tgl_sel22 = (tgl_sel21 != '') ? Ext.Date.format(this.getValue(),'d-M-Y') : Ext.Date.format(new Date(), 'd-M-Y' );
    					// console.log(tgl_sel2);
    					Ext.getCmp('table_chart').setTitle('Vessel '+comb_kapal22 +' on '+ tgl_sel22);
    					//update_text1();
    					daily_akum();
    					//Ext.getCmp('panel_daily').update(content_akum);

    				},
    				afterrender : function(){
    					// console.log('Date selected: ', this.getValue());
    					tgl_sel21 = Ext.Date.format(this.getValue(),'Y-m-d');
    					tgl_sel22 = (tgl_sel21 != '') ? tgl_sel21 : Ext.Date.format(new Date(), 'd-M-Y' );
    					// console.log('===> di tanggal '+tgl_sel21+ 'kapalnya ==> '+comb_kapal22);
    					//comb_kapal23 = (comb_kapal21 != '') ? '1' : isi1;

    					//console.log('comb_kapal22 : '+comb_kapal23);
    					// console.log('tgl_sel21  : '+tgl_sel21);
              // console.log('after render di tanggal');
              // update_status();

            }
		     }
       },'->',{
         xtype:'label',
         id: 'idstatus',
         width: 400
        //  padding : '0 0 2 0'
        //  text:'adsasdsa
        // html:'<b style="color:red;">ABCSDSDS</b>'
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
        height: 100,
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
        // url: 'http://project.daunbiru.com:1336/get_data_summary_bima',
        url: getAPI()+'/get_data_summary_bima',
        method: 'GET',
        params: {tz:getTimeZone(),tgl: tgl_sel21},

        success: function (data) {
    			   var hasil = Ext.JSON.decode(data.responseText);
          // console.log(hasil[0]);
             // console.log('get_data_summary_bima', data);
              var x = hasil[0];
             // console.log('x = ', x);
             if (x) {
               eng1_daily = parseFloat(x['ME2 Daily Consumtion']).toFixed(2) ;
               eng2_daily = parseFloat(x['ME1 Daily Consumtion']).toFixed(2) ;
               rh_engine1 = parseFloat(x['ME2 Working Hours']).toFixed(2) ;
               rh_engine2 = parseFloat(x['ME1 Working Hours']).toFixed(2) ;
               ae1_daily = parseFloat(x['AE2 Daily Consumtion']).toFixed(2) ;
               ae2_daily = parseFloat(x['AE1 Daily Consumtion']).toFixed(2) ;
               rh_ae1 = parseFloat(x['AE2 Working Hours']).toFixed(2) ;
               rh_ae2 = parseFloat(x['AE1 Working Hours']).toFixed(2) ;
               total_daily = parseFloat(x['Total Daily']).toFixed(2) ;
             } else {
               eng1_daily = "NaN" ;
               eng2_daily = "NaN" ;
               rh_engine1 = "NaN" ;
               rh_engine2 = "NaN" ;
               ae1_daily = "NaN" ;
               ae2_daily = "NaN" ;
               rh_ae1 = "NaN" ;
               rh_ae2 = "NaN" ;
               total_daily = "NaN" ;
             }


        },
        callback : function (){
            			content_akum = '<style type="text/css">' +
            			'table.total_daily {font-family: verdana,arial,sans-serif;font-size:12px;text-align: center;color:#333333;border-width: 1px;border-color: #a9c6c9;border-collapse: collapse;}' +
            			'table.total_daily td {border-width: 1px;padding: 4px;border-style: solid;border-color: #a9c6c9;}' +
            			'</style>' +
            			'<table width="100%" class="total_daily">' +
            			'<tr><td colspan="2">Total Daily</td></tr>' +
            			'<tr><td colspan="2" style="font-size:22px;">' + total_daily + ' Liters</td></tr>' +
            			'<tr><td>PortSide</td><td>StarBoard</td></tr>' +
            			'<tr>' +
            			'<td><span style="font-size:18px;"> ' + eng1_daily + ' Liters</span></td>' +
            			'<td><span style="font-size:18px;"> ' + eng2_daily + ' Liters</span></td>'+
                  '</tr>' +
                  '<tr>'+
                  '<td><span style="font-size:18px;"> ' + rh_engine1 + ' Hours</span></td>' +
            			'<td><span style="font-size:18px;"> ' + rh_engine2 + ' Hours</span></td>'+
                  '</tr>' +
            			'<tr><td colspan="2"></td></tr>' +
            			'<tr><td colspan="2">Genset Daily</td></tr>' +
            			'</tr>' +
            			'<tr>' +
            			'<td>genset#1</td>' +
            			'<td>genset#2</td>' +
            			'</tr>' +
            			'<tr>' +
            			'<td><span style="font-size:18px;">' + ae1_daily + ' Liter</span></td>' +
            			'<td><span style="font-size:18px;">' + ae2_daily + ' Liter</span></td>' +
            			'</tr>' +
                  '<tr>' +
            			'<td><span style="font-size:18px;">' + rh_ae1 + ' Hours</span></td>' +
            			'<td><span style="font-size:18px;">' + rh_ae2 + ' Hours</span></td>' +
            			'</tr>' +
            			'</table>' ;
            			Ext.getCmp('panel_daily').update(content_akum);

			         }
    });
}

function ambil_status()
{
  Ext.Ajax.request({
    url: getAPI()+ '/pelindo/status',
    method: 'GET',
    // params: {tz:getTimeZone(),tgl: tgl_sel21},

    success: function (data) {
      var hasil = Ext.JSON.decode(data.responseText);
      // console.log(hasil);
      // console.log(hasil.lastUpdate);
      var stat = (hasil.status =='Ok') ? '<b style="color:green;">'+hasil.status+'</b>' : '<b style="color:red;">'+hasil.status+'</b>';

      Ext.getCmp('idstatus').update('<p style="font-size:14px;">Last Data : '+hasil.lastUpdate + ' >> ' +stat+'</p>');
      //  var x = hasil[0];
    }
  });
}


// var hh = '<b style="color:red;"> Status </b>'
var timer,i;
function start() {
    timer = setInterval(function(){
      ambil_status();
    //  Ext.getCmp('idstatus').update(hh+i);
     // Ext.fly('idstatus').('hasdgasdasdas' + x);
    //  console.log('update status fungsi  ===');i++;
  },10*1000);
}start();

function update_status(x)
{
  if (x==1){
    console.log('idup');
    start();
  }
  else {
    console.log('mati');
    clearInterval(timer);
  }
}

function update_grafik() {
    store_grafik.reload();
    store_akumulasi_perjam.reload();

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
