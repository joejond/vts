Ext.onReady(function() {
	var user_login = "";

    var viewport = Ext.create('Ext.Viewport', {
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
							width	: '55%'
						},{
							id		: 'user',
							xtype	: 'label',
							width	: '20%',
							style	: { 'font-size': "20px" }
						},{
							id	: 'jam',
							xtype	: 'label',
							//html	: '<div id="jam"></div><span>'+ user_login +' </span>',
							width	: '20%',
							style	: { 'font-size': "20px" }
						},{
							// id: 'user',
							xtype	: 'button',
							text	: 'LOGOUT',
							width	: '5%',
							handler: function(){
								window.location = '../LogOutUser.php';
								// console.log("logout");
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

										var uu = JSON.parse(atob(Ext.util.Cookies.get("marine")));
										// console.log(uu);
										Ext.fly('user').update('Welcome '+uu.u);
										// console.log('tab muali muncul');
										// update_status(0);
                }
            }
        },{
            region: 'center',
            xtype: 'tabpanel',
            tabPosition: 'left',
            frame: true,
            padding: 5,
            items: [{
                title: 'MAP VIEW',
                layout: 'border',
				id: 'map_tab',
                iconCls: 'tab-icon',
                items: [ peta , ship_list ]
            },{
                title: 'SHIP - DETAIL DATA',
                layout: 'fit',
                id: 'detail_tab',
                items: [ panel_detail ],
                iconCls: 'tab-icon'
            },{
                title: 'DAILY REPORT',
                layout: 'fit',
                id: 'analisis_tab',
                items: [ panel_hitung ],
                // items: [{
				// 	region: 'center',
				// 	xtype: 'tabpanel',
				// 	tabPosition: 'top',
				// 	frame: true,
				// 	padding: 5,
				// 	items: [{
				// 		title: 'Single Ship',
				// 		layout: 'fit',
				// 		id: 'single_ship_tab',
				// 		iconCls: 'tab-icon',
				// 		items: [ panel_hitung ]
				// 	},{
				// 		title: 'Multiple Ship',
				// 		layout: 'fit',
				// 		id: 'multiple_ship_tab',
				// 		iconCls: 'tab-icon',
				// 		items: [ panel_hitung_banyak ]
				// 	}]
				// }],
                iconCls: 'tab-icon'

						},{
							title: 'REPORT AD-HOC',
							layout: 'fit',
							id: 'adhoc_rep',
							items: [ panel_r_adhoc ],

							iconCls: 'tab-icon'
						},{
							title: 'SUMMARY',
							layout: 'fit',
							id: 'summ_tab',
							items: [ panel_r_sum ],
							iconCls: 'tab-icon'

            }],
						listeners: {

							tabchange: function(tabPanel, newCard, oldCard, eOpts){
								// console.log(tabPanel, newCard, oldCard, eOpts);
								// console.log(newCard.id);
								// var tab = newCard.id;
								// (tab == 'analisis_tab')?update_status(1):update_status(0);
								// console.log(ws);
								// ws.close;

							}
						}
        }]
    });



    peta1 = Ext.getCmp('mymap');

});
