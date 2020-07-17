Ext.onReady(function () {
    var user_login = "",
        viewport = Ext.create("Ext.Viewport", {
            layout: {
                type: "border",
                padding: 5
            },
            items: [{
                region: "north",
                height: 45,
                padding: "0 5 5 5",
                xtype: "container",
                layout: "hbox",
                items: [{
                    xtype: "component",
                    id: "app-header-title",
                    html: document.title,
                    width: "55%"
                }, {
                    id: "user",
                    xtype: "label",
                    width: "20%",
                    style: {
                        "font-size": "20px"
                    }
                }, {
                    id: "jam",
                    xtype: "label",
                    width: "20%",
                    style: {
                        "font-size": "20px"
                    }
                }, {
                    xtype: "button",
                    text: "LOGOUT",
                    width: "5%",
                    handler: function () {
                        window.location = "../LogOutUser.php"
                    }
                }],
                listeners: {
                    render: function () {
                        Ext.TaskManager.start({
                            run: function () {
                                Ext.fly("jam").update(Ext.Date.format(new Date, "d M Y, H:i:s"))
                            },
                            interval: 1e3
                        });
                        var uu = JSON.parse(atob(Ext.util.Cookies.get("marine")));
                        Ext.fly("user").update("Welcome " + uu.u)
                    }
                }
            }, {
                region: "center",
                xtype: "tabpanel",
                tabPosition: "left",
                frame: !0,
                padding: 5,
                items: [{
                    title: "MAP VIEW",
                    layout: "border",
                    id: "map_tab",
                    iconCls: "tab-icon",
                    items: [peta, ship_list]
                }, {
                    title: "SHIP - DETAIL DATA",
                    layout: "fit",
                    id: "detail_tab",
                    items: [panel_detail],
                    iconCls: "tab-icon"
                }, {
                    title: "DAILY REPORT",
                    layout: "fit",
                    id: "analisis_tab",
                    items: [panel_hitung],
                    iconCls: "tab-icon"
                }, {
                    title: "REPORT AD-HOC",
                    layout: "fit",
                    id: "adhoc_rep",
                    items: [panel_r_adhoc],
                    iconCls: "tab-icon"
                }, {
                    title: "SUMMARY",
                    layout: "fit",
                    id: "summ_tab",
                    items: [panel_r_sum],
                    iconCls: "tab-icon"
                }, {
                    title: "MASTER",
                    layout: "fit",
                    id: "master_tab",
                    hidden: true,
                    items: [
                        {
                            xtype : "component",
                            id:"f_master",
                            autoEl : {
                                tag : "iframe",
                                src : "http://monita.pelindo.co.id:1999"
                            },
                            listeners:{
                                afterrender: function(){
                                    console.log(this.getEl());
                                }
                            }
                        }
                    ],
                    iconCls: "tab-icon"
                }],
                listeners: {
                    tabchange: function (tabPanel, newCard, oldCard, eOpts) {
                        // console.log(newCard);
                        if(newCard.id == "master_tab"){
                            // console.log('pilih master tab');
                            // Ext.get('f_master').getEl();
                        }
                        
                    },
                    afterrender: function (tab, opt) {
                        // console.log(window.location.hash);
                        var id = window.location.hash.substring(1);
                        // console.log(id);
                        tab.setActiveTab(Ext.getCmp(id));
                    }
                }
            }]
        });
    peta1 = Ext.getCmp("mymap")
});