Ext.require([
	'*',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.toolbar.Paging'
]);

//
var model_detail_sum = Ext.define('detail_kapal_sum', {
	extend: 'Ext.data.Model',
	fields: [{
			name: 'date',
			type: 'date'
		},
		'working distance', 'average speed',
		'working hours ME1', 'working hours ME2',
		'working hours AE1', 'working hours AE2',
		'ME1 daily consumption', 'ME2 daily consumtion',
		'ME1 fuel rate', 'ME2 fuel rate',
		'AE1 fuel rate', 'AE2 fuel rate',
		'ME1 average rpm', 'ME2 average rpm', 'AE1 average rpm', 'AE2 average rpm',
		'AE1 consumtion', 'AE2 consumtion', 'vessel', 'Remaining on board', 'Last fuel loading',
		'Total Consumption ME', 'Total Consumption AE', 'Total Consumption',
		'Total Working Hours ME', 'Total Working Hours AE', 'Total Working Hours', 'Total Working Hours'
		//
		// 'waktu', 'lat', 'lng', 'speed', 'heading', 'rpm1', 'prop1', 'inflow1', 'outflow1', 'temp1', 'press1',
		// 'rpm2', 'prop2', 'inflow2', 'outflow2', 'temp2', 'press2',
		// 'rpm3', 'prop3', 'inflow3', 'outflow3', 'temp3', 'press3',
		// 'rpm4', 'prop4', 'inflow4', 'outflow4', 'temp4', 'press4',
		// 'runhour1', 'runhour2','runhour3', 'battery', 'charger', 'modem']
	]
});
//
// var comb_kapal1 = '';
var tgl_sel_sum = '';
var dtt = JSON.parse(atob(Ext.util.Cookies.get("marine")));
//
var store_detail_sum = Ext.create('Ext.data.Store', {
	model: model_detail_sum,
	autoLoad: true,
	proxy: {
		type: 'ajax',
		// url: 'http://192.168.1.17:1337/get_data_summary_ship?tgl=2018-02-26&tz=%2B07:00&user_id=4&id=8',
		url: getAPI() + '/get_data_summary_ship',
		method: 'GET',
		timeout: 60000
		// reader: {
		//     type: 'json',
		//     //successProperty: 'success',
		//     root: 'detail_ship',
		//     messageProperty: 'message'
		// }
	},
	// 	//listeners: {
	// 		//'beforeload': function(store, options) {
	// 			//store.proxy.extraParams.name=comb_kapal1;
	// 			//store.proxy.extraParams.tgl=tgl_sel1;
	// 		//}
	// 	//}
});
//
// var model_combo_kapal_ad = Ext.define('Kapal', {
//     extend: 'Ext.data.Model',
//     fields: ['name']
// });
// //
// var store_combo_kapal_ad = Ext.create('Ext.data.Store', {
//     model: model_combo_kapal_ad,
//     autoLoad: true,
//     proxy: {
//         type: 'ajax',
//         api: {
//             read: 'ship_list.php'
//         },
//         reader: {
// 			//totalProperty:'total',
//             type: 'json',
//             //successProperty: 'success',
//             root: 'ship',
//             messageProperty: 'message'
//         }
//     }
// });
//
//
// //var ship_combo1 = new Ext.form.ComboBox({
//     //displayField: 'name',
//     //queryMode: 'remote',
//     //valueField: 'name',
//     //width: 200,
//     //store: store_combo_kapal1,
//     //listeners:{
//         //select: function() {
//
//         //comb_kapal1 = this.getValue();
//
//         //console.log(comb_kapal1);
//         //store_detail_kapal.load({params: { name: comb_kapal1, tgl: tgl_sel1}});
// 		//update_text1();
//         //}
//     //}
// //});
//
var tabel_r_sum = Ext.create('Ext.grid.Panel', {
	//id : 'table_ship',
	//jdl : '',
	id: 'table_ship_sum',
	title: 'Summary',
	store: store_detail_sum,
	flex: 4,
	columns: [{
		header: "Vessel",
		width: 100,
		dataIndex: 'vessel',
		locked: true
	}, {
		header: "Working Distance",
		width: 100,
		dataIndex: 'working distance',
		renderer: function (v) {
			return parseFloat(v).toFixed(2) + " Km";
		}
	}, {
		header: "Average Speed",
		width: 100,
		dataIndex: 'average speed',
		renderer: function (v) {
			return parseFloat(v).toFixed(2) + " Km/h";
		}
	}, {
		header: "StarBoard Engine (ME1)",
		columns: [{
			header: "Fuel Consumption",
			width: 100,
			dataIndex: "ME1 daily consumption",
			renderer: function (v) {
				if (parseFloat(v) > 0) {
					return parseFloat(v).toFixed(2) + " Liters";
				} else {
					return parseFloat(v).toFixed(2) + " Liter";
				}
			}
		}, {
			header: "Working Hours",
			width: 100,
			dataIndex: "working hours ME1",
			renderer: function (v) {
				return getHour(parseFloat(v).toFixed(2) * 60);
			}
		}, {
			header: "Fuel Rate",
			width: 100,
			dataIndex: "ME1 fuel rate",
			renderer: function (v) {
				return parseFloat(v).toFixed(2) + " lt/hr";
			}
		}]
	}, {
		header: "PortSide Engine (ME2)",
		columns: [{
			header: "Fuel Consumption",
			width: 100,
			dataIndex: "ME2 daily consumtion",
			renderer: function (v) {
				if (parseFloat(v) > 0) {
					return parseFloat(v).toFixed(2) + " Liters";
				} else {
					return parseFloat(v).toFixed(2) + " Liter";
				}
			}
		}, {
			header: "Working Hours",
			width: 100,
			dataIndex: "working hours ME2",
			renderer: function (v) {
				return getHour(parseFloat(v).toFixed(2) * 60);
			}
		}, {
			header: "Fuel Rate",
			width: 100,
			dataIndex: "ME2 fuel rate",
			renderer: function (v) {
				return parseFloat(v).toFixed(2) + " lt/hr";
			}
		}]
	}, {
		header: "Total Main Engine",
		columns: [{
			header: "Fuel Consumption",
			width: 100,
			dataIndex: "Total Consumption ME",
			renderer: function (v) {
				if (parseFloat(v) > 0) {
					return parseFloat(v).toFixed(2) + " Liters";
				} else {
					return parseFloat(v).toFixed(2) + " Liter";
				}
			}
		}, {
			header: "Working Hours",
			width: 100,
			dataIndex: "Total Working Hours ME",
			renderer: function (v) {
				return getHour(parseFloat(v).toFixed(2) * 60);
			}
		}]
	}, {
		header: "StarBoard GenSet (AE1)",
		columns: [{
			header: "Fuel Consumption",
			width: 100,
			dataIndex: "AE1 consumtion",
			renderer: function (v) {
				if (parseFloat(v) > 0) {
					return parseFloat(v).toFixed(2) + " Liters";
				} else {
					return parseFloat(v).toFixed(2) + " Liter";
				}
			}
		}, {
			header: "Working Hours",
			width: 100,
			dataIndex: "working hours AE1",
			renderer: function (v) {
				return getHour(parseFloat(v).toFixed(2) * 60);
			}
		}, {
			header: "Fuel Rate",
			width: 100,
			dataIndex: "AE1 fuel rate",
			renderer: function (v) {
				return parseFloat(v).toFixed(2) + " lt/hr";
			}
		}]
	}, {
		header: "PortSide GenSet (AE2)",
		columns: [{
			header: "Fuel Consumption",
			width: 100,
			dataIndex: "AE2 consumtion",
			renderer: function (v) {
				if (parseFloat(v) > 0) {
					return parseFloat(v).toFixed(2) + " Liters";
				} else {
					return parseFloat(v).toFixed(2) + " Liter";
				}
			}
		}, {
			header: "Working Hours",
			width: 100,
			dataIndex: "working hours AE2",
			renderer: function (v) {
				return getHour(parseFloat(v).toFixed(2) * 60);
			}
		}, {
			header: "Fuel Rate",
			width: 100,
			dataIndex: "AE2 fuel rate",
			renderer: function (v) {
				return parseFloat(v).toFixed(2) + " lt/hr";
			}
		}]
	}, {
		header: "Total Auxiliary Engine",
		columns: [{
			header: "Fuel Consumption",
			width: 100,
			dataIndex: "Total Consumption AE",
			renderer: function (v) {
				if (parseFloat(v) > 0) {
					return parseFloat(v).toFixed(2) + " Liters";
				} else {
					return parseFloat(v).toFixed(2) + " Liter";
				}
			}
		}, {
			header: "Working Hours",
			width: 100,
			dataIndex: "Total Working Hours AE",
			renderer: function (v) {
				return getHour(parseFloat(v).toFixed(2) * 60);
			}
		}]
	}, {
		header: "Remaining onBoard",
		width: 200,
		dataIndex: 'Remaining on board',
		renderer: function (v) {
			if (parseFloat(v) > 0) {
				return parseFloat(v).toFixed(2) + " Liters";
			} else {
				return parseFloat(v).toFixed(2) + " Liter";
			}
		}
	}, {
		header: "Total Consumption",
		width: 200,
		dataIndex: 'Total Consumption',
		renderer: function (v) {
			if (parseFloat(v) > 0) {
				return parseFloat(v).toFixed(2) + " Liters";
			} else {
				return parseFloat(v).toFixed(2) + " Liter";
			}
		}
	}, {
		header: "Last Fuel Loding",
		width: 200,
		dataIndex: 'Last fuel loading',
		renderer: function (v) {
			if (parseFloat(v) > 0) {
				return parseFloat(v).toFixed(2) + " Liters";
			} else {
				return parseFloat(v).toFixed(2) + " Liter";
			}
		}
	}, {
		header: "Total Working Hours",
		width: 200,
		dataIndex: 'Total Working Hours',
		renderer: function (v) {
			return getHour(parseFloat(v).toFixed(2) * 60);
		}
	}]
});
//
//
//
// var range = Ext.create('Ext.data.Store', {
//     fields: ['tipe_range'],
//     data : [
//     {
//         "tipe_range":"daily"
//     },
//
//     {
//         "tipe_range":"monthly"
//     },
//
//     {
//         "tipe_range":"yearly"
//     }
//     ]
// });
//
// // Create the combo box, attached to the states data store
// //var time_range_combo = Ext.create('Ext.form.ComboBox', {
//     //store: range,
//     //width: 80,
//     //queryMode: 'local',
//     //displayField: 'tipe_range',
//     //valueField: 'tipe_range'
// //});
//
// //function update_text1() {
// 	//var content_text1 = '<html><body><div style="font-size: 20px; color:blue">(current view -> '+comb_kapal1+' - date: '+tgl_sel1+')</div></body></html>';
// 	//Ext.getCmp('toolbar_text').update(content_text1);
// 	////Ext.getCmp('table_ship').setTitle(content_text1);
//
// //}

var panel_r_sum = {
	dockedItems: [{
		padding: '0 0 0 10',
		xtype: 'toolbar',
		dock: 'top',
		height: 40,
		items: [{
				padding: '0 0 0 5',
				fieldLabel: 'Date ',
				id: 'date_total_sum',
				labelWidth: 40,
				editable: false,
				xtype: 'datefield',
				value: new Date(),
				maxValue: new Date(),
				format: 'd-M-Y',
				listeners: {
					change: function () {
						//console.log('Date selected: ', Ext.Date.format(this.getValue(),'Y-m-d'));
						// console.log('onselected');
						// tgl_sel_sum = Ext.Date.format(this.getValue(),'Y-m-d');
						// var param = {user_id: dtt.idu,tgl:tgl_sel_sum,tz: getTimeZone(),type: 'data_sum_ship'};
						// store_detail_sum.load({params:param});
						// // store_detail_kapal.load({params: { id: comb_kapal1, tgl: tgl_sel1}});
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						// //console.log(tgl_sel2);
						// Ext.getCmp('table_ship').setTitle('Vessel '+comb_kapal2 +' on '+ tgl_sel2);
						//update_text1();
						tgl_sel_sum = Ext.Date.format(this.getValue(), 'Y-m-d');
					},
					afterrender: function () {
						// console.log('Date selected: ', this.getValue());
						tgl_sel_sum = Ext.Date.format(this.getValue(), 'Y-m-d');
						// var dtt= JSON.parse(atob(Ext.util.Cookies.get("marine")));
						var param = {
							user_id: dtt.idu,
							tgl: tgl_sel_sum,
							tz: getTimeZone(),
							type: 'data_sum_ship'
						};
						store_detail_sum.load({
							params: param
						});
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel1);
					}
				}
			}, {
				padding: '0 0 0 5',
				fieldLabel: 'To ',
				id: 'date_total_sum2',
				labelWidth: 40,
				editable: false,
				xtype: 'datefield',
				value: new Date(),
				maxValue: new Date(),
				format: 'd-M-Y',
				listeners: {
					change: function () {
						tgl_sel_sum2 = Ext.Date.format(this.getValue(), 'Y-m-d');
					},
					afterrender: function () {
						tgl_sel_sum2 = Ext.Date.format(this.getValue(), 'Y-m-d');
					}
				}
			}, {
				xtype: 'button',
				text: 'Submit',
				handler: function () {
					tgl_sel_sum = Ext.Date.format(Ext.getCmp('date_total_sum').getValue(), 'Y-m-d');
					tgl_sel_sum2 = Ext.Date.format(Ext.getCmp('date_total_sum2').getValue(), 'Y-m-d');
					// if (Ext.getCmp('date_total_sum').getValue() > Ext.getCmp('date_total_sum2').getValue()) {
					var param = {
						user_id: dtt.idu,
						tgl: tgl_sel_sum,
						tgl2: tgl_sel_sum2,
						tz: getTimeZone(),
						type: 'data_sum_ship'
					};
					store_detail_sum.load({
						params: param
					});
					// }
				}
			}, '->', {
				xtype: 'button',
				text: 'Export to Excel',
				handler: function () {
					// console.log('dtt.idu', dtt.idu);
					window.open(getAPI() + '/get_data_summary_ship?&user_id=' + dtt.idu + '&tgl=' + tgl_sel_sum + '&tgl2=' + tgl_sel_sum2 + '&tz=' + getTimeZone() + '&type=data_sum_ship&export=true&filename=Pelindo3_Summary_' + tgl_sel_sum + "_until_" + tgl_sel_sum2 + ".xlsx");
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
		// tabel_detail_kapal
		tabel_r_sum

	]
};

function getHour(value) {
	// console.log("value", value);
	if (value == null) {
		return "0 hr";
	}
	if (value <= 0) {
		return "0 hr";
	}
	var hours = Math.floor(value / 60);
	var minutes = value % 60;
	var hour = (hours > 1) ? hours + " hrs " : hours + " hr ";
	var min = (minutes > 0) ? parseFloat(minutes).toFixed(0) + " mins" : "";
	// console.log("result", hour + min);
	return hour + min;
}