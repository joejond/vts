Ext.onReady(function() {
	var user_login = "";
	// host_ku = "hasndasdasd";
// Ext.fly('user').update('Welcome '+user_login);
///*
	// var login_y = Ext.Ajax.request({
	// 		url: 'get_user_session.php',
	// 		method: 'GET',
	// 		success: function(data) {
	// 			var user = Ext.JSON.decode(data.responseText);
	// 			// user_login = user.loged.user;
	// 			user_login = 'jono';
	// 			//console.log ('usernya : '+user.loged.user);
				// Ext.fly('user').update('Welcome '+user_login);
	// 		},
	// 		params: {}
	// });
	//*/
		// Ext.fly('user').update('Welcome ');
	//user_login1 = user_login;
	//console.log (login_y);


	//var updateClock = function () {
		//Ext.fly('jam').update(new Date().format('g:i:s A'));
	//}
	////var updateClock = function () {
		////new Date().format('g:i:s A')
	////};

	//var runner = new Ext.util.TaskRunner();
	//var task = runner.start({
		 //run: updateClock,
		 //interval: 1000
	//});


	//var time_t = 'dd-MM-YYYY hh:mm';
	//var content_t = '<html><head><title></title></head><body><div style="background:#E0E0E0; width: 100%; overflow: hidden; vertical-align: middle; "><div style="width: 65px; float: left;"> <img src="header.png"></div><div align=right style="width: 200px; float: right; font-size: 14px;">'+user_login+'  <br> </div><div style="font-size: 28px;">MONITA - Vessel Tracking System</div></div></body></html>';

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
				id: 'user',
				xtype	: 'button',
				text	: 'LOGOUT' + user_login,
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
										console.log('render bro');
										// console.log(getAPI());
										// console.log('host => '+host_ku);
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
                iconCls: 'tab-icon'
<<<<<<< HEAD
			},{
				title: 'REPORT AD-HOC',
				layout: 'fit',
				id: 'adhoc_rep',
				items: [ panel_r_adhoc ],
				// xtype: 'panel',
				iconCls: 'tab-icon'
=======
						},{
							title: 'REPORT AD-HOC',
							layout: 'fit',
							id: 'adhoc_rep',
							items: [ panel_r_adhoc ],
							// abc:'asdasd',
							// xtype: 'panel',
							iconCls: 'tab-icon'
						},{
							title: 'SUMMARY',
							layout: 'fit',
							id: 'summ_tab',
							// items: [ panel_r_adhoc ],
							// abc:'asdasd',
							xtype: 'panel',
							iconCls: 'tab-icon'
>>>>>>> pelindo3

            }]
        }]
    });

	//function update_tittle() {

		//Ext.Ajax.request({
			//url: 'servertime.php',
			//method: 'GET',
			//success: function(data) {
			//time_t = (data.responseText);
			//},
			//params: {}
		//});

		//var content_t = '<html><head><title></title></head><body><div style="background:#E0E0E0; width: 100%; overflow: hidden; vertical-align: middle; "><div style="width: 65px; float: left;"> <img src="header.png"></div><div align=right style="width: 200px; float: right; font-size: 14px;">'+user_login+'  <a href="http://monita.daunbiru.com:8999/tracking/logout.php">(logout)</a>  <br> '+time_t+' WITA</div><div style="font-size: 28px;">MONITA - Vessel Tracking System</div></div></body></html>';

		//Ext.getCmp('panel_title').update(content_t);
	//}


	//setInterval(function() {
		//update_tittle();
	//}, 10000);

    peta1 = Ext.getCmp('mymap');

});
