

Ext.Loader.setConfig({
  enabled: true,
  disableCaching: true,
  Path: {'Ext.ux.Exporter': '/ux/Exporter'}
});

Ext.require([
	'*',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
	'Ext.toolbar.Paging'
]);

// Ext.require([
// 			'Ext.ux.Exporter.Base64',
// 			'Ext.ux.Exporter.Button',
// 			'Ext.ux.Exporter.csvFormatter.CsvFormatter',
// 			'Ext.ux.Exporter.excelFormatter.ExcelFormatter'
// 	]);


Ext.define('Ext.form.field.Month', {
        extend: 'Ext.form.field.Date',
        alias: 'widget.monthfield',
        requires: ['Ext.picker.Month'],
        alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
        selectMonth: null,
        createPicker: function() {
            var me = this,
                format = Ext.String.format;
            return Ext.create('Ext.picker.Month', {
                pickerField: me,
                ownerCt: me.ownerCt,
                renderTo: document.body,
                floating: true,
                hidden: true,
                focusOnShow: true,
                minDate: me.minValue,
                maxDate: me.maxValue,
                disabledDatesRE: me.disabledDatesRE,
                disabledDatesText: me.disabledDatesText,
                disabledDays: me.disabledDays,
                disabledDaysText: me.disabledDaysText,
                format: me.format,
                showToday: me.showToday,
                startDay: me.startDay,
                minText: format(me.minText, me.formatDate(me.minValue)),
                maxText: format(me.maxText, me.formatDate(me.maxValue)),
                listeners: {
                    select: {
                        scope: me,
                        fn: me.onSelect
                    },
                    monthdblclick: {
                        scope: me,
                        fn: me.onOKClick
                    },
                    yeardblclick: {
                        scope: me,
                        fn: me.onOKClick
                    },
                    OkClick: {
                        scope: me,
                        fn: me.onOKClick
                    },
                    CancelClick: {
                        scope: me,
                        fn: me.onCancelClick
                    }
                },
                keyNavConfig: {
                    esc: function() {
                        me.collapse();
                    }
                }
            });
        },
        onCancelClick: function() {
            var me = this;
            me.selectMonth = null;
            me.collapse();
        },
        onOKClick: function() {
            var me = this;
            if (me.selectMonth) {
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
            }
            me.collapse();
        },
        onSelect: function(m, d) {
            var me = this;
            me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        }
    });


var model_combo_kapal_ad = Ext.define('Kapal', {
    extend: 'Ext.data.Model',
    fields: ['name']
});
//
var store_combo_kapal_ad = Ext.create('Ext.data.Store', {
    model: model_combo_kapal_ad,
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


var model_adhoc_kapal = Ext.define('adhoc_kapal', {
    extend: 'Ext.data.Model',
    fields:[
		    {name:"date",type:"date"},
		    "working distance",
		    "average speed",
		    "working hours ME1",
		    "working hours ME2",
		    "ME1 daily consumption",
		    "ME1 consumption rate",
		    "ME2 daily consumtion",
		    "ME2 consumtion rate",
		    "AE1 consumtion" ,
		    "AE2 consumtion",
		    "ME1 average rpm",
		    "ME2 average rpm",
		    "AE1 average rpm",
		    "AE2 average rpm"
		 ]
});



var store_adhoc_kapal = Ext.create('Ext.data.Store', {
    model: model_adhoc_kapal,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        // url: 'ship_detail_sp.php',
		//	url: 'http://project.daunbiru.com:1336/get_data_bima',
        //url: 'http://192.168.1.17:1337/get_data_adhoc?m=2018-02',
        //url:'http://project.daunbiru.com:1336/get_data_adhoc?m=2018-02',
        url:'http://project.daunbiru.com:1336/get_data_adhoc',
        //url: 'http://project.daunbiru.com:1337/get_data_bima?id=8&user_id=4&tz=%2B07&tgl=2018-02-01',
        method: 'GET',
        // reader: {
        //     type: 'json',
        //     //successProperty: 'success',
        //     root: '',
        //     // messageProperty: 'message'
        // }
    },
	//listeners: {
		//'beforeload': function(store, options) {
			//store.proxy.extraParams.name=comb_kapal1;
			//store.proxy.extraParams.tgl=tgl_sel1;
		//}
	//}
});



var tabel_r_adhoc = Ext.create('Ext.grid.Panel', {

    id : 'table_ship_adhoc',
    title: 'Report Ad-Hoc',
    uses: [
        'Ext.ux.exporter.Exporter'
    ],
    store : store_adhoc_kapal,
    flex: 4,
    columns: [
    {
        header: "Date",
        width: 100,
        dataIndex: 'date',
		renderer: Ext.util.Format.dateRenderer('d-M-Y'),
        locked : true
    },{
      	header: "Working Dist.\n(km)",
		width: 100,
		dataIndex: 'working distance',
		renderer: function(v){return parseFloat(v).toFixed(2);}
		},{
		header: "Average Speed",
		width: 100,
		dataIndex: 'average speed',
		renderer: function(v){return parseFloat(v).toFixed(2);}
	},{
		header: "ME Portside",
      	columns: [{
				header: "Working Hours",
				width: 100,
				dataIndex: 'working hours ME1',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
				header: "Daily Consumption",
				width: 100,
				dataIndex: 'ME1 daily consumption',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
				header: "Hourly Rate",
				width: 100,
				dataIndex: 'ME1 consumption rate',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				}]
			},{
				header: "ME Starboard",
      			columns: [{
				header: "Working Hours",
				width: 100,
				dataIndex: 'working hours ME2',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'ME2 daily consumption',
					renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
					header: "Hourly Rate",
					width: 100,
					dataIndex: 'ME2 consumption rate',
					renderer: function(v){return parseFloat(v).toFixed(2);}
			}]
			},{
      			header: "AE1",
      			columns: [{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'AE1 consumtion',
					renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
					header: "RPM(rata2)",
					width: 100,
					dataIndex: 'AE1 average rpm',
					renderer: function(v){return parseFloat(v).toFixed(2);}

			}]
			},{
      			header: "AE2",
      			columns: [{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'AE2 consumtion',
					renderer: function(v){return parseFloat(v).toFixed(2);}
			},{
					header: "RPM (rata2)",
					width: 100,
					dataIndex: 'ME1 average rpm',
					renderer: function(v){return parseFloat(v).toFixed(2);}

			}]
		},
		{
			header: "Total Daily Fuel",
			width: 100,
			dataIndex: 'Total-FuelUsage',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		},{
     		header: "Remaining onBoard",
			width: 200,
			dataIndex: 'rpm2',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		},{

			header: "Last Fuel Loading",
			width: 200,
			dataIndex: 'Fuel-Bunkering',
			renderer: function(v){return parseFloat(v).toFixed(2);}	
		},{
			header: "F_Sound_Check",
			width: 150,
			dataIndex: 'F_Sound_Check',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		}]

});

//Create the Download button and add it to the top toolbar
// var exportButton = new Ext.ux.Exporter.Button({
//   component: tabel_r_adhoc,
//   text     : "Download as .xls"
// });

var panel_r_adhoc = {
	dockedItems: [{
		padding : '0 0 0 10',
        xtype: 'toolbar',
        dock: 'top',
				height: 40,
        items: [{

		    //'selected ship :',
            //ship_combo1,
			//'-',
			//{

				xtype : 'combobox',
				id : 'cb_vessel_adhoc',
				fieldLabel: ' Selected Ship',
				labelWidth : 80,
				width	: 300,
				// queryMode: 'remote',
				emptyText: '- select ship -',
				editable : false,
				displayField: 'name',
				valueField: 'id',
				store: store_combo_kapal1,
				listeners:{
					select: function() {
						var month='2018-02';
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month}});
						console.log("Combo box adhoc selected [" + id_vessel_adhoc +"],[" + month +"]");
					},
					afterrender : function(){
						var isi = this.getStore().data.items[0].data['name'];
						this.setValue(isi);
						id_vessel_adhoc = this.getValue();
						comb_kapal2 = (comb_kapal1 != '') ? comb_kapal2 : isi;
						var month_adhoc =Ext.Date.format(Ext.getCmp('combo_month_adhoc').getValue(),'Y-m');
						//var month_adhoc = Ext.getCmp('combo_month_adhoc').getValue();
						var param = {user_id: dt.idu,id:id_kpl,tgl:tgl_sel1,tz: getTimeZone()};


						console.log("Combo box adhoc afterrender : [" + id_vessel_adhoc +"],[" + month_adhoc +"]");
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month_adhoc}});
						console.log(this.getStore());
						}
				}

			},{
				// padding : '0 0 0 5',
				fieldLabel: 'Date ',
				id: 'combo_month_adhoc',
				labelWidth: 40,
				// editable : false,
				// xtype: 'datefield',
				xtype: 'monthfield',
				submitFormat: 'Y-m-d',
        //         name: 'month',
				//
        //         format: 'F, Y',
				value: new Date(),
				// maxValue: new Date(),
				format: 'F, Y',

				listeners: {
					change: function () {

						var id_vessel_adhoc=Ext.getCmp('cb_vessel_adhoc').getValue();
						var month_adhoc=Ext.Date.format(this.getValue(),'Y-m');
						console.log("Combo box adhoc afterrender : [" + cb_vessel_adhoc +"],[" + month_adhoc +"]");
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month_adhoc}});

					},
					afterrender : function(){
						console.log('Date selected: ', this.getValue());
						// tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel1);
						var month_adhoc= this.getValue();
						//var id_vessel_adhoc=cb_vessel_adhoc.getValue();
						console.log("Bulan dipilih: " + month_adhoc);
						//store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month}});
						}
				}
			},'->',
			{
				xtype : 'button',
				text:'Add Fuel',
				listeners:{
					click: function() {
	            // this == the button, as we are in the local scope
	            // this.setText('I was clicked!');
							console.log('diklik');
							window_fuel.show();
							window_fuel.setTitle ('Daily Fuel ');//+data.name);
							// window_fuel.vessel = data.id;
							// hitung_fuel(new Date(),data.id);
	        },
				}

			},{
				xtype : 'button',
				text : 'Export to Excel',
				handler : function(){
					// var tgl = Ext.Date.format(Ext.getCmp('date_total1').getValue(),'Y-m-d');
					// var ves = Ext.getCmp('cb_vessel').getValue();
					// // console.log(comb_kapal1);
					// var kpl = (comb_kapal1=== '')?'1':comb_kapal1;
					// // console.log('export bro dari '+tgl+' ==> '+kpl);
					// window.open('export_data_detail.php?id='+kpl+'&t='+tgl);
					// Ext.Ajax.request({
					// 	params : {t : tgl, id: ves },
					// 	method : 'GET',
					// 	url : 'export.php'
					// })

				}
			}
			// ,{
   //              xtype: 'exporterbutton'
   //          }
        ]
    }],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        // tabel_adhoc
        tabel_r_adhoc
        /*
        ,{
            xtype: 'splitter'
        },{
			title: 'visual data view',
			flex: 5,
			split : true,
			border: true,
			items:[{
				xtype: "component",
				id: 'iframe-win',
				width: '100%',
				height: '100%',
				title: 'Visual',
				autoEl: {
					tag : "iframe",
					src : "visualmonita/visualmonita1.php?xmlfile=layout/kapal.xml"
				}
			}]

        }
        */
    ]
};

var panel_form_bunker = Ext.create('Ext.form.Panel', {
    // title: 'Form Fuel Bunkering',
    bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{

				xtype: 'fieldcontainer',
				fieldLabel: 'Date Time',
				layout: 'hbox',
				combineErrors: true,
				// defaultType: 'textfield',
				defaults: {
				 	hideLabel: 'true'
				},
				items: [{
					 	name: 'date',
					 	xtype:'datefield',
					 	flex: 2,
						value: new Date(),
						format: 'd-M-Y',
					 	allowBlank: false
				}, {
					 	name: 'time',
					 	flex: 2,
					 	margin: '0 0 0 6',
					 	xtype:'timefield',
						increment:30,
						value: new Date(),
						format: 'H:i',
						allowBlank: false
					}]
				},{
					fieldLabel: 'Fuel Volume',
					xtype:'numberfield',
					name: 'value',
					minValue: 0,
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false,
					allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
							var dt = form.getValues();
							dt.titik_ukur_id = 11033;
							console.log(dt);
							Ext.Ajax.request({
							    url: getAPI()+'/pelindo/custom_input',
									method:'POST',

							    params: dt,
							    success: function(response){
							        var text = response.responseText;
							        // console.log(text);
											Ext.Msg.alert('Fuel-Bunkering', 'Sukses.</br>('+dt.date+' '+dt.time+':00) = '+dt.value+' Liters');
							    }
							});
							form.reset();
							store_fuel_bunker.reload();
							
            }
        }
    }],
    // renderTo: Ext.getBody()
});


var model_fuel_sonding = Ext.define('Fuel_Sonding', {
    extend: 'Ext.data.Model',
    fields: ['date','volume']
});
//
var store_fuel_sonding = Ext.create('Ext.data.Store', {
    model: model_fuel_sonding,
    autoLoad: true,
		proxy: {
				type: 'ajax',
				url:'http://10.10.10.11:1336/pelindo/custom_input?titik_ukur_id=12005',
				method: 'GET',
				// params: {titik_ukur_id:12005},
				// reader: {
				//     type: 'json',
				//     //successProperty: 'success',
				//     root: '',
				//     // messageProperty: 'message'
				// }
		},
});

var tabel_fuel_sonding = Ext.create('Ext.grid.Panel', {
    title: 'History Sounding',
    store: store_fuel_sonding,
    columns: [
        { text: 'DateTime', dataIndex: 'date' },
        // { text: 'Level', dataIndex: 'email', flex: 1 },
        { text: 'Volume', dataIndex: 'volume', flex: 1 },
        { text: 'action', dataIndex: 'phone' }
    ],
		// layout :'fit',
		autoscroll: true,
    height: 200,

});

var panel_form_sonding = Ext.create('Ext.form.Panel', {
    // title: 'Form Fuel Bunkering',
    bodyPadding: 5,

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{

				xtype: 'fieldcontainer',
				fieldLabel: 'Date Time',
				layout: 'hbox',
				combineErrors: true,
				// defaultType: 'textfield',
				defaults: {
				 	hideLabel: 'true'
				},
				items: [{
					 	name: 'date',
					 	xtype:'datefield',
					 	flex: 2,
						value: new Date(),
						format: 'd-M-Y',
						submitFormat: 'Y-m-d',
					 	allowBlank: false
				}, {
					 	name: 'time',
					 	flex: 2,
					 	margin: '0 0 0 6',
					 	xtype:'timefield',
						increment:30,
						value: new Date(),
						format: 'H:i',
						allowBlank: false
					}]
				// },{
	      //   fieldLabel: 'Fuel Level',
	      //   name: 'fuel_sond',
	      //   allowBlank: false
				},{
					fieldLabel: 'Fuel Volume',
					xtype:'numberfield',
					name: 'value',
					minValue: 0,
	        hideTrigger: true,
	        keyNavEnabled: false,
	        mouseWheelEnabled: false,
					allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {

							// console.log('lalala');
							// console.log('id titik ukur ==> 12005');

							// console.log(form.getValues());
							var dt = form.getValues();
							// console.log(dt.tgl_son+' '+dt.time_son+':00');
							// var dt_tgl = dt.tgl_son+' '+dt.time_son+':00';
							// var dt_vol = dt.vol_son;
							// var dt_tu = 12005;
							dt.titik_ukur_id = 12005;
							console.log(dt);
							Ext.Ajax.request({
							    url: getAPI()+'/pelindo/custom_input',
									method:'POST',
									// jsonData:json,
							    params: dt,
							    success: function(response){
							        var text = response.responseText;
							        // console.log(text);
											Ext.Msg.alert('Fuel-Sounding', 'Sukses.</br>('+dt.date+' '+dt.time+':00) = '+dt.value+' Liters');
							    }
							});
							form.reset();
							store_fuel_sonding.reload();
							// store_fuel_sonding.load({params:{titik_ukur_id: dt.titik_ukur_id}});
							// tabel_fuel_sonding.reload();
                // form.submit({
								// 	// console.log('lalala');
                //     success: function(form, action) {
                //        Ext.Msg.alert('Success', action.result.msg);
                //     },
                //     failure: function(form, action) {
                //         Ext.Msg.alert('Failed', action.result.msg);
                //     }
                // });
            }
        }
    }],
    // renderTo: Ext.getBody()
});
var model_fuel_bunker = Ext.define('Fuel_Sonding', {
    extend: 'Ext.data.Model',
    fields: ['date','total']
});
//
var store_fuel_bunker = Ext.create('Ext.data.Store', {
    model: model_fuel_bunker,
    autoLoad: true,
		proxy: {
				type: 'ajax',
				url:'http://10.10.10.11:1336/pelindo/custom_input?titik_ukur_id=11033',
				method: 'GET',
				// params: {titik_ukur_id:12005},
				// reader: {
				//     type: 'json',
				//     //successProperty: 'success',
				//     root: '',
				//     // messageProperty: 'message'
				// }
		},
});
var tabel_fuel_bunker = Ext.create('Ext.grid.Panel', {
    title: 'History Bunkering',

    store: store_fuel_bunker,

    columns: [
        { text: 'DateTime', dataIndex: 'date' },
        { text: 'Total', dataIndex: 'total', flex: 1 },
        { text: 'action', dataIndex: 'phone' }
    ],
    height: 200,
    // width: 400,
    // renderTo: Ext.getBody()
});

var window_fuel = Ext.create('Ext.window.Window',{
    title : 'fuel window',
    width : 400,
    modal : true,
    closable: false,
    layout : {
        type : 'fit',
        align : 'stretch'
    },
    items : [{
        xtype : 'tabpanel',
				width: 400,
		    height: 300,
		    defaults: {
		        // bodyPadding: 10,
		        scrollable: true
		    },
				items: [{
			        title: 'Fuel-Bunkering',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							items:[ panel_form_bunker,tabel_fuel_bunker]

			    }, {
			        title: 'Fuel-Sounding',
							items:[ panel_form_sonding,tabel_fuel_sonding]
			    }]
        // itemId : 'hasil_hitung',
    }],

    buttons : [{
        text : 'Close',
        handler : function(){
            this.up('.window').hide();
        }
    }]

});




