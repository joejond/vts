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
    fields: ['waktu', 'lat', 'lng', 'speed', 'heading', 'rpm1', 'prop1', 'inflow1', 'outflow1', 'temp1', 'press1', 
			'rpm2', 'prop2', 'inflow2', 'outflow2', 'temp2', 'press2', 
			'rpm3', 'prop3', 'inflow3', 'outflow3', 'temp3', 'press3', 
			'rpm4', 'prop4', 'inflow4', 'outflow4', 'temp4', 'press4', 
			'runhour1', 'runhour2','runhour3', 'battery', 'charger', 'modem']
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
      header: "PortSide Engine",
      columns: [{
			header: "Engine", 
			width: 70, 
			dataIndex: 'rpm1'
		},{
			header: "Propeller", 
			width: 70, 
			dataIndex: 'prop1'
		},{
			header: "InFlow", 
			width: 70, 
			dataIndex: 'inflow1'
		},{
			header: "OutFlow", 
			width: 70, 
			dataIndex: 'outflow1'
		},{
			header: "Temp", 
			width: 70, 
			dataIndex: 'temp1'
		},{
			header: "Press", 
			width: 70, 
			dataIndex: 'press1'
		}]	  
	},{
      header: "StarBoard Engine",
      columns: [{
			header: "Engine", 
			width: 70, 
			dataIndex: 'rpm2'
		},{
			header: "Propeller", 
			width: 70, 
			dataIndex: 'prop2'
		},{
			header: "InFlow", 
			width: 70, 
			dataIndex: 'inflow2'
		},{
			header: "OutFlow", 
			width: 70, 
			dataIndex: 'outflow2'
		},{
			header: "Temp", 
			width: 70, 
			dataIndex: 'temp2'
		},{
			header: "Press", 
			width: 70, 
			dataIndex: 'press2'
		}]	  
	},{
      header: "Center I Engine",
      columns: [{
			header: "Engine", 
			width: 70, 
			dataIndex: 'rpm3'
		},{
			header: "Propeller", 
			width: 70, 
			dataIndex: 'prop3'
		},{
			header: "InFlow", 
			width: 70, 
			dataIndex: 'inflow3'
		},{
			header: "OutFlow", 
			width: 70, 
			dataIndex: 'outflow3'
		},{
			header: "Temp", 
			width: 70, 
			dataIndex: 'temp3'
		},{
			header: "Press", 
			width: 70, 
			dataIndex: 'press3'
		}]	
	},{
		header: "Center II Engine",
      columns: [{
			header: "Engine", 
			width: 70, 
			dataIndex: 'rpm4'
		},{
			header: "Propeller", 
			width: 70, 
			dataIndex: 'prop4'
		},{
			header: "InFlow", 
			width: 70, 
			dataIndex: 'inflow4'
		},{
			header: "OutFlow", 
			width: 70, 
			dataIndex: 'outflow4'
		},{
			header: "Temp", 
			width: 70, 
			dataIndex: 'temp4'
		},{
			header: "Press", 
			width: 70, 
			dataIndex: 'press4'
		}]	
	},{
      header: "GenSet",
      columns: [
		{
			header: "GenSet #1", 
			width: 70, 
			dataIndex: 'runhour1'
		},{
			header: "GenSet #2", 
			width: 70, 
			dataIndex: 'runhour2'
		},{
			header: "GenSet #3", 
			width: 70, 
			dataIndex: 'runhour3'
		}
		]	  
	},
	{
      header: "Panel",
      columns: [{
			header: "Battery", 
			width: 70, 
			dataIndex: 'battery'
		},{
			header: "Charger", 
			width: 70, 
			dataIndex: 'charger'
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
			//},'->',
			//{
				//xtype : 'button',
				//text : 'Export to Excel',
				//handler : function(){
					//var tgl = Ext.Date.format(Ext.getCmp('date_total1').getValue(),'Y-m-d');
					//var ves = Ext.getCmp('cb_vessel').getValue();
					//console.log('export bro dari '+tgl+' ==> '+ves);
					//Ext.Ajax.request({
						//params : {t : tgl, id: ves },
						//method : 'GET',
						//url : 'export.php'
					//})

				//}
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
