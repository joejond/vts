Ext.onReady(function() {
	
    var viewport = Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        //defaults: {
            ////split: true
        //},
        items: [{
            region: 'north',
            //collapsible: false,
            //split: false,
            //border: false,
			//id: "panel_title",
            height: 45,
            padding: '0 5 5 5',
			//html: content_t
			xtype : 'container',
			layout	: 'hbox',
			items : [{
				xtype	: 'component',
				id		: 'app-header-title',
				html	: document.title,
				//flex 	: 1,
				width	: '70%'
			},{
				id		: 'user',
				xtype	: 'label',
				width	: '10%'
			},{
				id	: 'jam',
				xtype	: 'label',
				//html	: '<div id="jam"></div><span>'+ user_login +' </span>',
				width	: '15%'			
			},{
				//id: 'user',
				xtype	: 'button',
				text	: 'LOGOUT',
				width	: '5%',	
				handler: function(){
					window.location = '../LogOutUser.php';
				}		
			}],
			listeners : {
                render :function() {                
                    Ext.TaskManager.start({
                        run : function() {
                            Ext.fly('jam').update(Ext.Date.format(new Date(), 'd M Y, H:i:s'));  
                         },
                        //scope: me,
                        interval : 1000
                    });
                    Ext.Ajax.request({
						url: 'get_user_session.php',
						method: 'GET',
						success: function(data) {
							var user = Ext.JSON.decode(data.responseText);
							Ext.fly('user').update('Welcome '+user.loged.user);
						}
					});
                }
            }
        },{
            region: 'center',
            xtype: 'tabpanel',
            //tabPosition: 'left',
            frame: true,
            padding: 5,		
            layout : 'fit',		
            items: [{
                title: 'MAP VIEW', 
                layout: 'border',
                iconCls: 'tab-icon',
                items: [ peta, ship_list ]
                //items : [{
						//xtype: 'panel',
						//html : 'panel1'
					//}]
            },{
                title: 'SHIP - DETAIL DATA', 
                layout: 'fit',                
                id: 'detail_tab',
                iconCls: 'tab-icon',
                items: [ panel_detail ]
     //            items : [{
					// 	xtype: 'panel',
					// 	html : 'panel2'
					// }]
            },{
                title: 'DAILY REPORT', 
                layout: 'fit',                
                id: 'analisis_tab',
                iconCls: 'tab-icon',
				items: [ panel_hitung ]
				// items : [{
				// 		xtype: 'panel',
				// 		html : 'panel3'
				// 	}]
            }]           
        }]
    });    
	

    peta1 = Ext.getCmp('mymap');

});


