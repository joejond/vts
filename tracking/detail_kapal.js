Ext.require([
	'*',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
	'Ext.toolbar.Paging'
]);

var dt = JSON.parse(atob(Ext.util.Cookies.get("marine")));
var model_detail_kapal = Ext.define('detail_kapal', {
    extend: 'Ext.data.Model',
  		fields:[
			"PM-Door","PM-VBatt","PM-VCharg",
			"ME1-FM In","ME1-FM Ov","ME1-FM Tem",
			"ME2-FM In","ME2-FM Ov","ME2-FM Tem",
			"AE1-FM In","AE1-FM Ov","AE1-FM Tem",
			"AE2-FM In","AE2-FM Ov","AE2-FM Tem",
			"ME1-RPM","ME1-RH","ME2-RPM","ME2-RH",
			"AE1-RPM","AE1-RH","AE2-RPM","AE2-RH",
			"PE-Door","PE-VCharg","PE-VBatt",
			"GPS-Latitude","GPS-Longitude","GPS-Heading","GPS-Velocity",
			"AE1-RH-Daily","AE2-RH-Daily",
			"F_Sound_Check",{name:"t",type:"date"}
		]
	});

	var model_detail_kapal_detik = Ext.define('detail_kapal', {
	    extend: 'Ext.data.Model',
	  		fields:[
				"PM-Door","PM-VBatt","PM-VCharg",
				"ME1-FM In","ME1-FM Ov","ME1-FM Tem",
				"ME2-FM In","ME2-FM Ov","ME2-FM Tem",
				"AE1-FM In","AE1-FM Ov","AE1-FM Tem",
				"AE2-FM In","AE2-FM Ov","AE2-FM Tem",
				"ME1-RPM","ME1-RH","ME2-RPM","ME2-RH",
				"AE1-RPM","AE1-RH","AE2-RPM","AE2-RH",
				"PE-Door","PE-VCharg","PE-VBatt",
				"GPS-Latitude","GPS-Longitude","GPS-Heading","GPS-Velocity",
				"AE1-RH-Daily","AE2-RH-Daily",
				"F_Sound_Check",{name:"t",type:"date"}
			]
		});

var comb_kapal1 = '';
var tgl_sel1 = '';
var id_kpl = '';

var store_detail_kapal = Ext.create('Ext.data.Store', {
    model: model_detail_kapal,
   // autoLoad: true,
    proxy: {
        type: 'ajax',
        // url: 'ship_detail_sp.php',
				// url: 'http://project.daunbiru.com:1336/get_data_bima',
				url: getAPI()+'/get_data_bima',
        // url: 'http://192.168.1.17:1337/get_data_bima?id=8&user_id=4&tz=%2B07:00&tgl=2018-02-26',
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

var store_detail_kapal_detik = Ext.create('Ext.data.Store', {
    model: model_detail_kapal_detik,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
				url: getAPI()+'/get_data_bima',
        method: 'GET',
    },
});

//==================================================================
var detail_jam_index;
var store_detail_jam = Ext.create('Ext.data.Store', {
    model: model_detail_kapal,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
				url: getAPI()+'/get_data_bima',
        method: 'GET',
    },

});
var tabel_detail_jam = Ext.create('Ext.grid.Panel', {
    title: 'Tabel Detail Jam',
    store: store_detail_kapal_detik,
    listeners: {
			afterrender : function(){
				console.log("[tabel_detail_jam] afterrender: " + detail_jam_index);
				//tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
				//tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
				//var param = {user_id: dt.idu,id:comb_kapal1,tgl:tgl_sel1,tz: getTimeZone()};

				//store_detail_kapal.load({params: param});
			},
			show: function(){
				console.log("[tabel_detail_jam] show:" + detail_jam_index + 'user_id=' +dt.idu);

			}
		},
    columns: [{
        header: "Date Time",
        width: 130,
        dataIndex: 't',
				renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
        locked : true
    },{
      header: "Satelite Data",
      columns: [{
			header: "Latitude",
			width: 50,
			dataIndex: 'GPS-Latitude'
		},{
			header: "Longitude",
			width: 55,
			dataIndex: 'GPS-Longitude'
		},{
			header: "Speed",
			width: 40,
			dataIndex: 'GPS-Velocity'
		},{
			header: "Heading",
			width: 45,
			dataIndex: 'GPS-Heading'
		}]
	},{
      header: "PortSide Engine",
      columns: [{
				header: "FM-In",
				width: 70,
				dataIndex: 'ME2-FM In'
			},{
				header: "FM-Ov",
				width: 70,
				dataIndex: 'ME2-FM Ov'
			},{
				header: "FM-Temp",
				width: 70,
				dataIndex: 'ME2-FM Tem'
			},{
				header: "RPM",
				width: 70,
				dataIndex: 'ME2-RPM'
			},{
				header: "RunHours",
				width: 70,
				dataIndex: 'ME2-RH'

			}]
	},{
      header: "StarBoard Engine",
			columns: [{
				header: "FM-In",
				width: 70,
				dataIndex: 'ME1-FM In'
			},{
				header: "FM-Ov",
				width: 70,
				dataIndex: 'ME1-FM Ov'
			},{
				header: "FM-Temp",
				width: 70,
				dataIndex: 'ME1-FM Tem'
			},{
				header: "RPM",
				width: 70,
				dataIndex: 'ME1-RPM'
			},{
				header: "RunHours",
				width: 70,
				dataIndex: 'ME1-RH'

			}]
	},{
      header: "PortSide GenSet",
			columns: [{
				header: "FM-In",
				width: 70,
				dataIndex: 'AE2-FM In'
			},{
				header: "FM-Ov",
				width: 70,
				dataIndex: 'AE2-FM Ov'
			},{
				header: "FM-Temp",
				width: 70,
				dataIndex: 'AE2-FM Tem'
			},{
				header: "RPM",
				width: 70,
				dataIndex: 'AE2-RPM'
			},{
				header: "RunHours",
				width: 70,
				dataIndex: 'AE2-RH'
			// },{
			// 	header: "Press",
			// 	width: 70,
			// 	dataIndex: 'press1'
			}]
	},{
		header: "StarBoard GenSet",
		columns: [{
			header: "FM-In",
			width: 70,
			dataIndex: 'AE1-FM In'
		},{
			header: "FM-Ov",
			width: 70,
			dataIndex: 'AE1-FM Ov'
		},{
			header: "FM-Temp",
			width: 70,
			dataIndex: 'AE1-FM Tem'
		},{
			header: "RPM",
			width: 70,
			dataIndex: 'AE1-RPM'
		},{
			header: "RunHours",
			width: 70,
			dataIndex: 'AE1-RH'
		// },{
		// 	header: "Press",
		// 	width: 70,
		// 	dataIndex: 'press1'
		}]
	},
	{
      header: "Panel",
      columns: [{
				header: "PM Battery",
				width: 70,
				dataIndex: 'PM-VBatt'
			},{
				header: "PM Charger",
				width: 70,
				dataIndex: 'PM-VCharg'
			},{
				header: "PM Door",
				width: 70,
				dataIndex: 'PM-Door'
			},{
				header: "PE Battery",
				width: 70,
				dataIndex: 'PE-VBatt'
			},{
				header: "PE Charger",
				width: 70,
				dataIndex: 'PE-VCharg'
			},{
				header: "PE Door",
				width: 70,
				dataIndex: 'PE-Door'
			}]
	}],
    flex:1
});

//==================================================================

var model_combo_kapal1 = Ext.define('Kapal', {
    extend: 'Ext.data.Model',
    fields: ['name', 'id']
});

var store_combo_kapal1 = Ext.create('Ext.data.Store', {
    model: model_combo_kapal1,
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

var tabel_detail_kapal = Ext.create('Ext.grid.Panel', {
    //id : 'table_ship',
    //jdl : '',
    id : 'table_ship',
    title: 'Data Ship',
    store : store_detail_kapal,
    flex: 4,
    listeners: {
		    	select: function(selModel, record, index, options){
		        	// detail_jam_index=index;
							var index_jam = record.getData().t;
							// console.log(Ext.Date.format(index_jam,'Y-m-d H'));
							// console.log('index tgljam = '+Ext.Date.format(index_jam,'Y-m-d H'));
							detail_jam_index = Ext.Date.format(index_jam,'Y-m-d H');


		   //      	tgl_sel1 = Ext.Date.format(Ext.getCmp('comb_kapal1').getValue(),'Y-m-d');
					// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
					// var param = {user_id: dt.idu,id:comb_kapal1,tgl:tgl_sel1,tz: getTimeZone()};

					// store_detail_jam.load({params: param});
		        	window_detail_jam.show();
		    	},
			},
    columns: [
    {
        header: "Date Time",
        width: 130,
        dataIndex: 't',
				renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
        locked : true
    },
	{
      header: "Satelite Data",
      columns: [{
			header: "Latitude",
			width: 50,
			dataIndex: 'GPS-Latitude'
		},{
			header: "Longitude",
			width: 55,
			dataIndex: 'GPS-Longitude'
		},{
			header: "Speed",
			width: 40,
			dataIndex: 'GPS-Velocity'
		},{
			header: "Heading",
			width: 45,
			dataIndex: 'GPS-Heading'
		}]
	},{
      header: "PortSide Engine",
      columns: [{
				header: "FM-In",
				width: 70,
				dataIndex: 'ME2-FM In'
			},{
				header: "FM-Ov",
				width: 70,
				dataIndex: 'ME2-FM Ov'
			},{
				header: "FM-Temp",
				width: 70,
				dataIndex: 'ME2-FM Tem'
			},{
				header: "RPM",
				width: 70,
				dataIndex: 'ME2-RPM'
			},{
				header: "RunHours",
				width: 70,
				dataIndex: 'ME2-RH'

			}]
	},{
      header: "StarBoard Engine",
			columns: [{
				header: "FM-In",
				width: 70,
				dataIndex: 'ME1-FM In'
			},{
				header: "FM-Ov",
				width: 70,
				dataIndex: 'ME1-FM Ov'
			},{
				header: "FM-Temp",
				width: 70,
				dataIndex: 'ME1-FM Tem'
			},{
				header: "RPM",
				width: 70,
				dataIndex: 'ME1-RPM'
			},{
				header: "RunHours",
				width: 70,
				dataIndex: 'ME1-RH'

			}]
	},{
      header: "PortSide GenSet",
			columns: [{
				header: "FM-In",
				width: 70,
				dataIndex: 'AE2-FM In'
			},{
				header: "FM-Ov",
				width: 70,
				dataIndex: 'AE2-FM Ov'
			},{
				header: "FM-Temp",
				width: 70,
				dataIndex: 'AE2-FM Tem'
			},{
				header: "RPM",
				width: 70,
				dataIndex: 'AE2-RPM'
			},{
				header: "RunHours",
				width: 70,
				dataIndex: 'AE2-RH'
			// },{
			// 	header: "Press",
			// 	width: 70,
			// 	dataIndex: 'press1'
			}]
	},{
		header: "StarBoard Genset",
		columns: [{
			header: "FM-In",
			width: 70,
			dataIndex: 'AE1-FM In'
		},{
			header: "FM-Ov",
			width: 70,
			dataIndex: 'AE1-FM Ov'
		},{
			header: "FM-Temp",
			width: 70,
			dataIndex: 'AE1-FM Tem'
		},{
			header: "RPM",
			width: 70,
			dataIndex: 'AE1-RPM'
		},{
			header: "RunHours",
			width: 70,
			dataIndex: 'AE1-RH'
		// },{
		// 	header: "Press",
		// 	width: 70,
		// 	dataIndex: 'press1'
		}]
	},
	{
      header: "Panel",
      columns: [{
				header: "PM Battery",
				width: 70,
				dataIndex: 'PM-VBatt'
			},{
				header: "PM Charger",
				width: 70,
				dataIndex: 'PM-VCharg'
			},{
				header: "PM Door",
				width: 70,
				dataIndex: 'PM-Door'
			},{
				header: "PE Battery",
				width: 70,
				dataIndex: 'PE-VBatt'
			},{
				header: "PE Charger",
				width: 70,
				dataIndex: 'PE-VCharg'
			},{
				header: "PE Door",
				width: 70,
				dataIndex: 'PE-Door'
			}]
	// },{
  //     header: "Source Data",
  //     columns: [{
	// 		//header: "id kapal",
	// 		//width: 40,
	// 		//dataIndex: 'kapal'
	// 	//},{
	// 		header: "Modem S/N",
	// 		width: 120,
	// 		dataIndex: 'modem'
	// 	}]
	}]
});



var range = Ext.create('Ext.data.Store', {
    fields: ['tipe_range'],
    data : [
    {
        "tipe_range":"daily"
    },

    {
        "tipe_range":"monthly"
    },

    {
        "tipe_range":"yearly"
    }
    ]
});

// Create the combo box, attached to the states data store
//var time_range_combo = Ext.create('Ext.form.ComboBox', {
    //store: range,
    //width: 80,
    //queryMode: 'local',
    //displayField: 'tipe_range',
    //valueField: 'tipe_range'
//});

//function update_text1() {
	//var content_text1 = '<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal1+' - date: '+tgl_sel1+')</div></body></html>';
	//Ext.getCmp('toolbar_text').update(content_text1);
	////Ext.getCmp('table_ship').setTitle(content_text1);

//}

var panel_detail = {
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
				id : 'cb_vessel',
				fieldLabel: ' Selected Ship',
				labelWidth : 80,
				width	: 300,
				queryMode: 'remote',
				emptyText: '- select ship -',
				editable : false,
				displayField: 'name',
				valueField: 'id',
				store: store_combo_kapal1,
				listeners:{
					select: function() {
						comb_kapal1 = this.getValue();
						comb_kapal2 = this.getRawValue();
						var param = {user_id: dt.idu,id:comb_kapal1,tgl:tgl_sel1,tz: getTimeZone(),type: 'vts'};
						console.log('param select', param);
						store_detail_kapal.load({params: param});
						Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//tabel_detail_kapal
						//update_text1();
						// console.log(comb_kapal1,comb_kapal2);
					},
					afterrender : function(){
							var isi = this.getStore().data.items[0].data['name'];
							this.setValue(isi);
							id_kpl = this.getStore().data.items[0].data['id'];
							comb_kapal2 = (comb_kapal1 != '') ? comb_kapal2 : isi;
							comb_kapal1 = id_kpl;
							var tgl_ini = Ext.getCmp('date_total_harian').getValue();
							var tgl_sesuai = Ext.Date.format(tgl_ini, 'd-M-Y' );
							tgl_sel1 = Ext.Date.format(new Date(), 'Y-m-d' );
							var param = {user_id: dt.idu,id:id_kpl,tgl:tgl_sel1,tz: getTimeZone(), type: 'vts'};
							console.log('param afterrender', param);
							// console.log(param);
							// store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
							store_detail_kapal.load({params: param});
							// console.log('====>>>> ',this.getStore().data.items[0].data['id']+' === >> ',tgl_ini);
							Ext.getCmp('table_ship').setTitle('Vessel '+isi+' on '+ tgl_sesuai);
						}
				}


			},{
				padding : '0 0 0 5',
				fieldLabel: 'Date',
				id: 'date_total_harian',
				labelWidth: 40,
				editable : false,
				xtype: 'datefield',
				value: new Date(),
				maxValue: new Date(),
				format: 'd-M-Y',
				listeners: {
					change: function () {
						tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						var param = {user_id: dt.idu,id:comb_kapal1,tgl:tgl_sel1,tz: getTimeZone(), type: 'vts'};
						// store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						store_detail_kapal.load({params: param});
						tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel2);
						// console.log('comb_kapal1', comb_kapal1);
						// console.log('comb_kapal2', comb_kapal2);
						Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//update_text1();
					},
					afterrender : function(){
						//console.log('Date selected: ', this.getValue());
						tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						var param = {user_id: dt.idu,id:comb_kapal1,tgl:tgl_sel1,tz: getTimeZone(), type: 'vts'};

						store_detail_kapal.load({params: param});
					}
				}
			},'->',
			{
				xtype : 'button',
				text : 'Export to Excel',
				handler : function(){
					// var tgl = Ext.Date.format(Ext.getCmp('date_total1').getValue(),'Y-m-d');
					// var ves = Ext.getCmp('cb_vessel').getValue();
					// // console.log(comb_kapal1);
					// var kpl = (comb_kapal1=== '')?'1':comb_kapal1;
					// // console.log('export bro dari '+tgl+' ==> '+kpl);
					// // window.open('export_data_detail.php?id='+kpl+'&t='+tgl);
					// // Ext.Ajax.request({
					// // 	params : {t : tgl, id: ves },
					// // 	method : 'GET',
					// // 	url : 'export.php'
					// // })
					window.open(getAPI()+'/get_data_bima?user_id=' + dt.idu + '&id=' + id_kpl + '&tgl=' + tgl_sel1 + '&tz=' + getTimeZone() + '&type=vts&export=true');

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
        tabel_detail_kapal
    ]
};

var window_detail_jam = Ext.create('Ext.window.Window',{
    title : 'Raw Data Detail',
    width : 800,
    modal : true,
    closable: false,
    listeners: {
    	boxready: function(){
    		console.log("Window detail jam: " + detail_jam_index);
    	},
			show: function(panel){
				console.log("Window onShow : "+detail_jam_index);
				param = {id:comb_kapal1,user_id:dt.idu,tgl:detail_jam_index,tz:dt.tz,density:'m', type:'vts'};
				store_detail_kapal_detik.load({params:param});
			}
    },
    layout : {
        type : 'fit',
        align : 'stretch'
    },
    items : [{
        xtype : 'tabpanel',
				// width: 00,
		    height: 300,
		    defaults: {
		        // bodyPadding: 10,
		        scrollable: true
		    },
				items: [{
			        title: 'Raw Data Detail',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							items:[ tabel_detail_jam]
			    }]
    }],

    buttons : [{
        text : 'Close',
        handler : function(){
            this.up('.window').hide();
            // this.up('.window').destroy();
        }
    }]

});
