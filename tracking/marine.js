Ext.onReady(function() {
	var user_login = "";
	Ext.Ajax.request({
			url: 'get_user_session.php',
			method: 'GET',
			success: function(data) {
			user_login = (data.responseText);
			},
			params: {}
	});
	
	
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
	

	var time_t = 'dd-MM-YYYY hh:mm';
	var content_t = '<html><head><title></title></head><body><div style="background:#E0E0E0; width: 100%; overflow: hidden; vertical-align: middle; "><div style="width: 65px; float: left;"> <img src="header.png"></div><div align=right style="width: 200px; float: right; font-size: 14px;">'+user_login+' <a href="http://monita.daunbiru.com:8999/tracking/logout.php">(logout)</a>  <br> '+time_t+' WITA</div><div style="font-size: 28px;">MONITA - Vessel Tracking System</div></div></body></html>';
	
    var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items: [
        {
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
				width	: '85%'
				
			},{
				xtype	: 'label',
				html	: '<div id="jam"></div>',
				width	: '10%'
			
			
			//*
			
			},{
				
				//id: 'clock',
				xtype	: 'button',
				html	: '<div id="">LOGOUT</div>',
				width	: '5%'			
			//*/
			}],
			
			listeners : {
                render :function() {                
                    Ext.TaskManager.start({
                        run : function() {
                            Ext.fly('jam').update(Ext.Date.format(new Date(), 'F j, Y, g:i:s A'));  
                         },
                        //scope: me,
                        interval : 1000
                    });
                }
            }
			
			
			
        
        
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            tabPosition: 'left',
            frame: true,
            padding: 5,				
            items: [
            {
                title: 'MAP VIEW', 
                layout: 'border',
                iconCls: 'tab-icon',
                items: [ peta, ship_list ]
            },
            {
                title: 'SHIP - DETAIL DATA', 
                layout: 'fit',                
                id: 'detail_tab',
                items: [ panel_detail ],
                iconCls: 'tab-icon'
            },
            {
                title: 'DAILY REPORT', 
                layout: 'fit',                
                id: 'analisis_tab',
                items: [ panel_hitung ],
                iconCls: 'tab-icon'
            }
            ]           
        }
        ]
    });    
	
	function update_tittle() {
	
		Ext.Ajax.request({
			url: 'servertime.php',
			method: 'GET',
			success: function(data) {
			time_t = (data.responseText);
			},
			params: {}
		});	
		
		var content_t = '<html><head><title></title></head><body><div style="background:#E0E0E0; width: 100%; overflow: hidden; vertical-align: middle; "><div style="width: 65px; float: left;"> <img src="header.png"></div><div align=right style="width: 200px; float: right; font-size: 14px;">'+user_login+'  <a href="http://monita.daunbiru.com:8999/tracking/logout.php">(logout)</a>  <br> '+time_t+' WITA</div><div style="font-size: 28px;">MONITA - Vessel Tracking System</div></div></body></html>';

		Ext.getCmp('panel_title').update(content_t);
	}
	
	
	//setInterval(function() {
		//update_tittle();
	//}, 10000);

    peta1 = Ext.getCmp('mymap');

});


