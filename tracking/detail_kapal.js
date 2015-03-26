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
    fields: ['waktu', 'lat', 'lng', 'spd', 'head', 'rpm1', 'prop1', 'flow1', 'ovflow1', 'temp1', 'pres1', 'rpm2', 'prop2', 'flow2', 'ovflow2', 'temp2', 'pres2', 'rh1', 'rh2', 'batt', 'char','kapal', 'modem']
});

var comb_kapal1 = '';
var tgl_sel1 = '';

var store_detail_kapal = Ext.create('Ext.data.Store', {
    model: model_detail_kapal,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'ship_detail.php',
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
        header: "time",
        width: 115, 
        dataIndex: 'waktu',
        locked : true
    },
	{
      header: "data satelit",
      columns: [
		{
                   header: "latitude", 
                   width: 50, 
                   dataIndex: 'lat'
		},
		{
			header: "longitude", 
			width: 55, 
			dataIndex: 'lng'
		},
		{
			header: "speed", 
			width: 40, 
			dataIndex: 'spd'
		},
		{
			header: "heading", 
			width: 45, 
			dataIndex: 'head'
		}]
	},
    {
      header: "data engine#1",
      columns: [
		{
			header: "rpm#1", 
			width: 70, 
			dataIndex: 'rpm1'
		},
		{
			header: "prop#1", 
			width: 70, 
			dataIndex: 'prop1'
		},
		{
			header: "flowmeter#1", 
			width: 70, 
			dataIndex: 'flow1'
		},
		{
			header: "overflow#1", 
			width: 70, 
			dataIndex: 'ovflow1'
		},
		{
			header: "temp#1", 
			width: 70, 
			dataIndex: 'temp1'
		},
		{
			header: "press#1", 
			width: 70, 
			dataIndex: 'pres1'
		}
		]	  
	},
	{
      header: "data engine#2",
      columns: [
		{
			header: "rpm#2", 
			width: 70, 
			dataIndex: 'rpm2'
		},
		{
			header: "prop#2", 
			width: 70, 
			dataIndex: 'prop2'
		},
		{
			header: "flowmeter#2", 
			width: 70, 
			dataIndex: 'flow2'
		},
		{
			header: "overflow#2", 
			width: 70, 
			dataIndex: 'ovflow2'
		},
		{
			header: "temp#2", 
			width: 70, 
			dataIndex: 'temp2'
		},
		{
			header: "press#2", 
			width: 70, 
			dataIndex: 'pres2'
		}
		]	  
	},
	{
      header: "data genset",
      columns: [
		{
			header: "runhour#1", 
			width: 70, 
			dataIndex: 'rh1'
		},
		{
			header: "runhour#2", 
			width: 70, 
			dataIndex: 'rh2'
		}
		]	  
	},
	{
      header: "data panel",
      columns: [
		{
			header: "battery", 
			width: 70, 
			dataIndex: 'batt'
		},
		{
			header: "charger", 
			width: 70, 
			dataIndex: 'char'
		}
		]	  
	},
	{
      header: "data source",
      columns: [
		{
			header: "id kapal", 
			width: 40, 
			dataIndex: 'kapal'
		},
		{
			header: "id modem", 
			width: 120, 
			dataIndex: 'modem'
		}
		]	  
	}
    ]
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
						//console.log(comb_kapal1);
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
							//console.log(isi);
						}
				}
				
				
			},{
				padding : '0 0 0 5',
				fieldLabel: 'Date',
				id: 'date_total1',
				labelWidth: 40,
				xtype: 'datefield',
				value: new Date(),
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
						console.log(tgl_sel1);
						}
				}
			},
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
