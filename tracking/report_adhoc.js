Ext.require([
	'*',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
	'Ext.toolbar.Paging'
]);

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
				emptyText: '- Select vessel -',
				editable : false,
				displayField: 'name',
				valueField: 'id',

				store: store_combo_kapal_ad,

				listeners:{
					select: function() {
						// comb_kapal1 = this.getValue();
						// comb_kapal2 = this.getRawValue();
						//console.log(comb_kapal1);
						//console.log(tgl_sel1);
						var cb_vessel_adhoc=1; 
						var month='2018-02';
						store_adhoc_kapal.load({params: { id: cb_vessel_adhoc, m: month}});
						// Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//tabel_detail_kapal
						//update_text1();
						console.log("Combo box adhoc selected [" + comb_kapal1 +"]" );
					},
					afterrender : function(){
							//var isi = this.getStore().data.items[0].data['name'];
							//this.setValue(isi);
							//comb_kapal2 = (comb_kapal1 != '') ? comb_kapal2 : isi;
							// Ext.getCmp('table_ship').setTitle('Vessel '+isi+' on '+ Ext.Date.format(new Date(), 'd-M-Y' ));
							//console.log(isi);
							var cb_vessel_adhoc=1; 
							var month='2018-02';
							store_adhoc_kapal.load({params: { id: cb_vessel_adhoc, m: month}});
							console.log("Combo box adhoc afterrender : [" + cb_vessel_adhoc +"],[" + month +"]");
							console.log(this.getStore());
						} 
				}


			},{
				padding : '0 0 0 5',
				fieldLabel: 'Date ',
				id: 'date_total_adhoc',
				labelWidth: 40,
				editable : false,
				xtype: 'datefield',
				value: new Date(),
				maxValue: new Date(),
				format: 'F',
				listeners: {
					change: function () {

						//console.log('Date selected: ', Ext.Date.format(this.getValue(),'Y-m-d'));
						//console.log()
						// tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						// // store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						// //console.log(tgl_sel2);
						// Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//update_text1();
					},
					afterrender : function(){
						//console.log('Date selected: ', this.getValue());
						// tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel1);
						console.log("Tanggal dipilih");
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
