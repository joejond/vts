Ext.require([
	'*',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
	'Ext.toolbar.Paging'
]);


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

//
// var model_detail_kapal = Ext.define('detail_kapal', {
//     extend: 'Ext.data.Model',
//     fields: ['waktu', 'lat', 'lng', 'speed', 'heading', 'rpm1', 'prop1', 'inflow1', 'outflow1', 'temp1', 'press1',
// 			'rpm2', 'prop2', 'inflow2', 'outflow2', 'temp2', 'press2',
// 			'rpm3', 'prop3', 'inflow3', 'outflow3', 'temp3', 'press3',
// 			'rpm4', 'prop4', 'inflow4', 'outflow4', 'temp4', 'press4',
// 			'runhour1', 'runhour2','runhour3', 'battery', 'charger', 'modem']
// });
//
// var comb_kapal1 = '';
// var tgl_sel1 = '';
//
// var store_detail_kapal = Ext.create('Ext.data.Store', {
//     model: model_detail_kapal,
//     autoLoad: true,
//     proxy: {
//         type: 'ajax',
//         url: 'ship_detail_sp.php',
//         method: 'GET',
//         reader: {
//             type: 'json',
//             //successProperty: 'success',
//             root: 'detail_ship',
//             messageProperty: 'message'
//         }
//     },
// 	//listeners: {
// 		//'beforeload': function(store, options) {
// 			//store.proxy.extraParams.name=comb_kapal1;
// 			//store.proxy.extraParams.tgl=tgl_sel1;
// 		//}
// 	//}
// });
//

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
      	header: "Working Distance",
		width: 100,
		dataIndex: 'working distance'
		},{
		header: "Average Speed",
		width: 100,
		dataIndex: 'average speed'
	},{
		header: "ME Portside",
      	columns: [{
			header: "Working Hours",
			width: 100,
			dataIndex: 'working hours ME1'
				},{
				header: "Daily Consumption",
				width: 100,
				dataIndex: 'ME1 daily consumption'
				},{
				header: "Hourly Rate",
				width: 100,
				dataIndex: 'ME1 consumption rate'
				}]
			},{
				header: "ME Starboard",
      			columns: [{
				header: "Working Hours",
				width: 100,
				dataIndex: 'working hours ME2'
				},{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'ME2 daily consumption'
				},{
					header: "Hourly Rate",
					width: 100,
					dataIndex: 'ME2 consumption rate'

			}]
			},{
      			header: "AE1",
      			columns: [{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'AE1 consumtion'
				},{
					header: "RPM(rata2)",
					width: 100,
					dataIndex: 'AE1 average rpm'

			}]
			},{
      			header: "AE2",
      			columns: [{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'AE2 consumtion'
			},{
					header: "RPM (rata2)",
					width: 100,
					dataIndex: 'ME1 average rpm'

			}]
		},
		{
			header: "Total Daily Fuel",
			width: 100,
			dataIndex: 'Total-FuelUsage'
		},{
     		header: "Remaining onBoard",
			width: 200,
			dataIndex: 'rpm2'
		},{

			header: "Last Fuel Loading",
			width: 200,
			dataIndex: 'Fuel-Bunkering'

		},{
			header: "F_Sound_Check",
			width: 150,
			dataIndex: 'F_Sound_Check'
		}]

});

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
						// comb_kapal1 = this.getValue();
						// comb_kapal2 = this.getRawValue();
						//console.log(comb_kapal1);
						//console.log(tgl_sel1);
						// store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						// Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//tabel_detail_kapal
						//update_text1();
						// Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//tabel_detail_kapal
						//update_text1();

						//var vessel_id=1;
						var month='2018-02';

						id_vessel_adhoc=this.getValue();
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month}});

						console.log("Combo box adhoc selected [" + id_vessel_adhoc +"],[" + month +"]");
					},
					afterrender : function(){
						var nama_vessel = this.getStore().data.items[0].data['name'];
						this.setValue(nama_vessel);
						// comb_kapal2 = (comb_kapal1 != '') ? comb_kapal2 : isi;
						// Ext.getCmp('table_ship').setTitle('Vessel '+isi+' on '+ Ext.Date.format(new Date(), 'd-M-Y' ));
						//console.log(isi);

						var id_vessel_adhoc=1;
						var month_adhoc='2018-02';
						id_vessel_adhoc=this.getValue();
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month_adhoc}});
						console.log("Combo box adhoc afterrender : [" + id_vessel_adhoc +"],[" + month_adhoc +"]");
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

						console.log('Date selected: ', Ext.Date.format(this.getValue(),'Y-m-d'));
						//console.log()
						// tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						// // store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						// //console.log(tgl_sel2);

						//Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						var month=this.getValue;
						console.log("Combo box adhoc afterrender : [" + cb_vessel_adhoc +"],[" + month +"]");

						//store_adhoc_kapal.load({params: { id: cb_vessel_adhoc, m: month}});
						//update_text1();
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
			//'-',
			//{
				//id: 'toolbar_text',
				//xtype : 'label'
				////html:'<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal1+' - date: '+tgl_sel1+')</div></body></html>'

			//}
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
    // width: 350,

    // The form will submit an AJAX request to this URL when submitted
    // url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
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
					 	name: 'tgl_nya',
					 	xtype:'datefield',
					 	flex: 2,
						value: new Date(),
						format: 'd-M-Y',
					 	allowBlank: false
				}, {
					 	name: 'time_nya',
					 	flex: 2,
					 	margin: '0 0 0 6',
					 	xtype:'timefield',
						increment:30,
						value: new Date(),
						format: 'H:i',
						allowBlank: false
					}]
				},{
	        fieldLabel: 'Total Fuel',
	        name: 'fuel_bunk',
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
                form.submit({
                    success: function(form, action) {
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }],
    // renderTo: Ext.getBody()
});

var tabel_fuel_sonding = Ext.create('Ext.grid.Panel', {
    title: 'History Bunkering',
    //store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        { text: 'DateTime', dataIndex: 'name' },
        { text: 'Level', dataIndex: 'email', flex: 1 },
        { text: 'Volume', dataIndex: 'vol', flex: 1 },
        { text: 'action', dataIndex: 'phone' }
    ],
    height: 200,
    // width: 400,
    // renderTo: Ext.getBody()
});

var panel_form_sonding = Ext.create('Ext.form.Panel', {
    // title: 'Form Fuel Bunkering',
    bodyPadding: 5,
    // width: 350,

    // The form will submit an AJAX request to this URL when submitted
    // url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
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
					 	name: 'tgl_son',
					 	xtype:'datefield',
					 	flex: 2,
						value: new Date(),
						format: 'd-M-Y',
					 	allowBlank: false
				}, {
					 	name: 'time_son',
					 	flex: 2,
					 	margin: '0 0 0 6',
					 	xtype:'timefield',
						increment:30,
						value: new Date(),
						format: 'H:i',
						allowBlank: false
					}]
				},{
	        fieldLabel: 'Fuel Level',
	        name: 'fuel_sond',
	        allowBlank: false
				},{
					fieldLabel: 'Fuel Volume',
					name: 'fuel_vol',
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
                form.submit({
                    success: function(form, action) {
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }],
    // renderTo: Ext.getBody()
});

var tabel_fuel_bunker = Ext.create('Ext.grid.Panel', {
    title: 'History Bunkering',
    //store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        { text: 'DateTime', dataIndex: 'name' },
        { text: 'Total', dataIndex: 'email', flex: 1 },
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






// });
