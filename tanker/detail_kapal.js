Ext.require([
	'*', 
	'Ext.grid.plugin.CellEditing', 
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
	'Ext.toolbar.Paging'
]);


var model_detail_kapal = Ext.define('detail_kapal', {
    extend: 'Ext.data.Model',
    fields: ['waktu', 'lat', 'lng', 'speed', 'heading', 

    		
    		"level1","interface1","volume1","gwr_temp1","level_product1",
    		"level2","interface2","volume2","gwr_temp2","level_product2",
    		"level3","interface3","volume3","gwr_temp3","level_product3",
    		"level4","interface4","volume4","gwr_temp4","level_product4",
    		"level5","interface5","volume5","gwr_temp5","level_product5",
    		"level6","interface6","volume6","gwr_temp6","level_product6",
    		"level7","interface7","volume7","gwr_temp7","level_product7",
    		"level8","interface8","volume8","gwr_temp8","level_product8",
    		"level9","interface9","volume9","gwr_temp9","level_product9",
    		"level10","interface10","volume10","gwr_temp10","level_product10",
    		"battery2","charger2","wind_speed","wind_direction","modem",
			'battery', 'charger']
});

var comb_kapal1 = '';
var tgl_sel1 = '';

var store_detail_kapal = Ext.create('Ext.data.Store', {
    model: model_detail_kapal,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'ship_detail_sp.php',
        method: 'GET',
        reader: {
            type: 'json',
            //successProperty: 'success',
            root: 'detail_ship',
            messageProperty: 'message'
        }            
    },
	//listeners: {
		//'beforeload': function(store, options) {
			//store.proxy.extraParams.name=comb_kapal1;
			//store.proxy.extraParams.tgl=tgl_sel1;
		//}
	//}
});

var model_combo_kapal1 = Ext.define('Kapal', {
    extend: 'Ext.data.Model',
    fields: ['name']
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


//var ship_combo1 = new Ext.form.ComboBox({
    //displayField: 'name',
    //queryMode: 'remote',
    //valueField: 'name',
    //width: 200,
    //store: store_combo_kapal1,
    //listeners:{
        //select: function() {
								
        //comb_kapal1 = this.getValue();
        
        //console.log(comb_kapal1);
        //store_detail_kapal.load({params: { name: comb_kapal1, tgl: tgl_sel1}});
		//update_text1();
        //}
    //}
//});

var tabel_detail_kapal = Ext.create('Ext.grid.Panel', {
    //id : 'table_ship',
    //jdl : '',
    id : 'table_ship',
    title: 'Data Ship',
    store : store_detail_kapal,
    flex: 4,
    columns: [
    {
        header: "Date Time",
        width: 130, 
        dataIndex: 'waktu',
        locked : true
    },
	{
      header: "Satelite Data",
      columns: [{
			header: "Latitude", 
			width: 50, 
			dataIndex: 'lat'
		},{
			header: "Longitude", 
			width: 55, 
			dataIndex: 'lng'
		},{
			header: "Speed", 
			width: 40, 
			dataIndex: 'speed'
		},{
			header: "Heading", 
			width: 45, 
			dataIndex: 'heading'
		}]
	},{
      header: "Cargo Tank 1P",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product1'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume1'
		}]	  
	},{
      header: "Cargo Tank 1S",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product2'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume6'
		}]	  
	},{
      header: "Cargo Tank 2P",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product3'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume2'
		}]	
	},{
		header: "Cargo Tank 2S",
      	columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product4'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume7'
		}]	
	},{
      header: "Cargo Tank 3P",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product5'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume3'
		}]	  
	},{
      header: "Cargo Tank 3S",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product6'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume8'
		}]	  
	},{
      header: "Cargo Tank 4P",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product7'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume4'
		}]	
	},{
		header: "Cargo Tank 4S",
      	columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product8'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume9'
		}]	
	},{
      header: "Cargo Tank 5P",
      columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product9'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume5'
		}]	
	},{
		header: "Cargo Tank 5S",
      	columns: [{
			header: "Level", 
			width: 70, 
			dataIndex: 'level_product10'
		},{
			header: "Volume", 
			width: 70, 
			dataIndex: 'volume10'
		}]	
	},{
		header: "Panel",
		columns: [{
			header: "Wind Dir", 
			width: 70, 
			dataIndex: 'wind_direction'
		},{
			header: "Wind Speed", 
			width: 70, 
			dataIndex: 'wind_speed'
		},{
			header: "Battery1", 
			width: 70, 
			dataIndex: 'battery'
		},{
			header: "Charger1", 
			width: 70, 
			dataIndex: 'charger'
		},{
			header: "Battery2", 
			width: 70, 
			dataIndex: 'battery2'
		},{
			header: "Charger2", 
			width: 70, 
			dataIndex: 'charger2'
		}]	  
	},{
      header: "Source Data",
      columns: [{
			//header: "id kapal", 
			//width: 40, 
			//dataIndex: 'kapal'
		//},{
			header: "Modem S/N", 
			width: 120, 
			dataIndex: 'modem'
		}]	  
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
						// console.log(comb_kapal1);
						//console.log(tgl_sel1);
						store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//tabel_detail_kapal
						//update_text1();
					},
					afterrender : function(){
							var isi = this.getStore().data.items[0].data['name'];
							this.setValue(isi);
							comb_kapal2 = (comb_kapal1 != '') ? comb_kapal2 : isi;
							Ext.getCmp('table_ship').setTitle('Vessel '+isi+' on '+ Ext.Date.format(new Date(), 'd-M-Y' ));
							// console.log(isi);
							// var id_combo = this.getStore().data.items[0].data['id']
						}
				}
				
				
			},{
				padding : '0 0 0 5',
				fieldLabel: 'Date',
				id: 'date_total1',
				labelWidth: 40,
				editable : false,
				xtype: 'datefield',
				value: new Date(),
				maxValue: new Date(),
				format: 'd-M-Y',
				listeners: {
					change: function () {
						
						//console.log('Date selected: ', Ext.Date.format(this.getValue(),'Y-m-d'));
						//console.log()
						tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel2);
						Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//update_text1();
					}, 
					afterrender : function(){
						//console.log('Date selected: ', this.getValue());
						tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel1);
						}
				}
			},
			// '->',
			// {
			// 	xtype : 'button',
			// 	text : 'Export to Excel',
			// 	handler : function(){
			// 		var tgl = Ext.Date.format(Ext.getCmp('date_total1').getValue(),'Y-m-d');
			// 		var ves = Ext.getCmp('cb_vessel').getValue();
			// 		console.log('export bro dari '+tgl+' ==> '+ves);
			// 		Ext.Ajax.request({
			// 			params : {t : tgl, id: ves },
			// 			method : 'GET',
			// 			url : 'export.php'
			// 		})

			// 	}
			// }
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
