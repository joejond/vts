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
    fields: ['data_time', 'lat', 'lon', 'speed', 'heading', 'rpm1', 'prop1', 'flow1', 'overflow1', 'temp1', 'press1', 'rpm2', 'prop2', 'flow2', 'overflow2', 'temp2', 'press2', 'runhour1', 'runhour2', 'battery', 'charger','idkapal', 'idmodem']
});

var comb_kapal1 = '';
var tgl_sel1 = '';

var store_detail_kapal = Ext.create('Ext.data.Store', {
    model: model_detail_kapal,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'ship_detail.php?',
        method: 'GET',
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'results',
            messageProperty: 'message'
        }            
    },
	listeners: {
		'beforeload': function(store, options) {
			store.proxy.extraParams.name=comb_kapal1;
			store.proxy.extraParams.tgl=tgl_sel1;
		}
	}
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
            read: 'ship_combo.php'
        },
        reader: {
			totalProperty:'total',
            type: 'json',
            successProperty: 'success',
            root: 'results',
            messageProperty: 'message'
        }            
    }
});


var ship_combo1 = new Ext.form.ComboBox({
    displayField: 'name',
    queryMode: 'remote',
    valueField: 'name',
    width: 200,
    store: store_combo_kapal1,
    listeners:{
        select: function() {
								
        comb_kapal1 = this.getValue();
        
        console.log(comb_kapal1);
        store_detail_kapal.load({params: { name: comb_kapal1, tgl: tgl_sel1}});
		update_text1();
        }
    }
});

var tabel_detail_kapal = Ext.create('Ext.grid.Panel', {
    title: 'ship data list',
    store : store_detail_kapal,
    flex: 4,
    columns: [
    {
        header: "time",
        width: 115, 
        dataIndex: 'data_time'
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
			dataIndex: 'lon'
		},
		{
			header: "speed", 
			width: 40, 
			dataIndex: 'speed'
		},
		{
			header: "heading", 
			width: 45, 
			dataIndex: 'heading'
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
			dataIndex: 'overflow1'
		},
		{
			header: "temp#1", 
			width: 70, 
			dataIndex: 'temp1'
		},
		{
			header: "press#1", 
			width: 70, 
			dataIndex: 'press1'
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
			dataIndex: 'overflow2'
		},
		{
			header: "temp#2", 
			width: 70, 
			dataIndex: 'temp2'
		},
		{
			header: "press#2", 
			width: 70, 
			dataIndex: 'press2'
		}
		]	  
	},
	{
      header: "data genset",
      columns: [
		{
			header: "runhour#1", 
			width: 70, 
			dataIndex: 'runhour1'
		},
		{
			header: "runhour#2", 
			width: 70, 
			dataIndex: 'runhour2'
		}
		]	  
	},
	{
      header: "data panel",
      columns: [
		{
			header: "battery", 
			width: 70, 
			dataIndex: 'battery'
		},
		{
			header: "charger", 
			width: 70, 
			dataIndex: 'charger'
		}
		]	  
	},
	{
      header: "data source",
      columns: [
		{
			header: "id kapal", 
			width: 40, 
			dataIndex: 'idkapal'
		},
		{
			header: "id modem", 
			width: 120, 
			dataIndex: 'idmodem'
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
var time_range_combo = Ext.create('Ext.form.ComboBox', {
    store: range,
    width: 80,
    queryMode: 'local',
    displayField: 'tipe_range',
    valueField: 'tipe_range'
});

function update_text1() {		
	var content_text1 = '<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal1+' - date: '+tgl_sel1+')</div></body></html>';
	Ext.getCmp('toolbar_text').update(content_text1);
}

var panel_detail = {
	dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
		height: 40,
        items: [
            'selected ship :',
            ship_combo1,
			'-',
			{
				fieldLabel: 'Date',
				id: 'date_total1',
				labelWidth: 40,
				xtype: 'datefield',
				value: new Date(),
				format: 'd-M-Y',
				listeners: {
					change: function () {
						console.log(Ext.util.Format.date(Ext.getCmp('date_total1').getValue(), 'd-m-Y'));
						tgl_sel1 = Ext.util.Format.date(Ext.getCmp('date_total1').getValue(), 'Y-m-d');
						store_detail_kapal.load({params: { name: comb_kapal1, tgl: tgl_sel1}});
						update_text1();
					}
				}
			},
			'-',
			{id: 'toolbar_text', html:'<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal1+' - date: '+tgl_sel1+')</div></body></html>'}
        ]
    }],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        tabel_detail_kapal
        ,{
            xtype: 'splitter'
        }, 
        {
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
    ]
};
