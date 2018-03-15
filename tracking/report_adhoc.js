

Ext.Loader.setConfig({
  enabled: true,
  disableCaching: true,
  Path: {'Ext.ux.Exporter': '/ux/Exporter'}
});

Ext.require([
	'*',
	'Ext.grid.plugin.CellEditing',
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
	'Ext.toolbar.Paging'
]);


var Base64 = (function() {
    // Private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // Private method for UTF-8 encoding

    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    // Public method for encoding
    return {
        encode: (typeof btoa == 'function') ? function(input) {
            return btoa(utf8Encode(input));
        } : function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        }
    };
})();


Ext.define('MyGrid', {
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.grid.GridPanel',
    //override: 'Ext.grid.GridPanel',
    requires: 'Ext.form.action.StandardSubmit',
    title: 'My Grid',
    downloadExcelXml: function(includeHidden, title){
    	console.log("downloadExcelXml");
    	 if (!title) title = this.title;

        var vExportContent = this.getExcelXml(includeHidden, title);
        var location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(vExportContent);

        //  dynamically create and anchor tag to force download with suggested filename
        //  note: download attribute is Google Chrome specific


        if (!Ext.isChrome) {
            var gridEl = this.getEl();

            var el = Ext.DomHelper.append(gridEl, {
                tag: "a",
                download: title + "-" + Ext.Date.format(new Date(), 'Y-m-d Hi') + '.xls',
                href: location
            });

            el.click();

            Ext.fly(el).destroy();

        } else {

            var form = this.down('form#uploadForm');
            if (form) {
                form.destroy();
            }
            form = this.add({
                xtype: 'form',
                itemId: 'uploadForm',
                hidden: true,
                standardSubmit: true,
                url: 'http://webapps.figleaf.com/dataservices/Excel.cfc?method=echo&mimetype=application/vnd.ms-excel&filename=' + escape(title + ".xls"),
                items: [{
                    xtype: 'hiddenfield',
                    name: 'data',
                    value: vExportContent
                }]
            });

            form.getForm().submit();

        }
    },


        // Welcome to XML Hell
        // See: http://msdn.microsoft.com/en-us/library/office/aa140066(v=office.10).aspx
        // for more details


    getExcelXml: function(includeHidden, title) {

        var theTitle = title || this.title;

        var worksheet = this.createWorksheet(includeHidden, theTitle);
        var totalWidth = 0;
        var cm=this.columnManager.getColumns();
        totalWidth=cm.length;
        console.log("getExcelXml, totalWidth: " +  totalWidth);


        return ''.concat(
            '<?xml version="1.0"?>',
            '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">',
            '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Title>' + theTitle + '</Title></DocumentProperties>',
            '<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><AllowPNG/></OfficeDocumentSettings>',
            '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">',
            '<WindowHeight>' + worksheet.height + '</WindowHeight>',
            '<WindowWidth>' + worksheet.width + '</WindowWidth>',
            '<ProtectStructure>False</ProtectStructure>',
            '<ProtectWindows>False</ProtectWindows>',
            '</ExcelWorkbook>',

            '<Styles>',

            '<Style ss:ID="Default" ss:Name="Normal">',
            '<Alignment ss:Vertical="Bottom"/>',
            '<Borders/>',
            '<Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"/>',
            '<Interior/>',
            '<NumberFormat/>',
            '<Protection/>',
            '</Style>',

            '<Style ss:ID="title">',
            '<Borders />',
            '<Font ss:Bold="1" ss:Size="18" />',
            '<Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1" />',
            '<NumberFormat ss:Format="@" />',
            '</Style>',

            '<Style ss:ID="headercell">',
            '<Font ss:Bold="1" ss:Size="10" />',
            '<Alignment ss:Horizontal="Center" ss:WrapText="1" />',
            '<Interior ss:Color="#A3C9F1" ss:Pattern="Solid" />',
            '</Style>',


            '<Style ss:ID="even">',
            '<Interior ss:Color="#CCFFFF" ss:Pattern="Solid" />',
            '</Style>',


            '<Style ss:ID="evendate" ss:Parent="even">',
            '<NumberFormat ss:Format="yyyy-mm-dd" />',
            '</Style>',


            '<Style ss:ID="evenint" ss:Parent="even">',
            '<Numberformat ss:Format="0" />',
            '</Style>',

            '<Style ss:ID="evenfloat" ss:Parent="even">',
            '<Numberformat ss:Format="0.00" />',
            '</Style>',

            '<Style ss:ID="odd">',
            '<Interior ss:Color="#CCCCFF" ss:Pattern="Solid" />',
            '</Style>',

            '<Style ss:ID="groupSeparator">',
            '<Interior ss:Color="#D3D3D3" ss:Pattern="Solid" />',
            '</Style>',

            '<Style ss:ID="odddate" ss:Parent="odd">',
            '<NumberFormat ss:Format="yyyy-mm-dd" />',
            '</Style>',

            '<Style ss:ID="oddint" ss:Parent="odd">',
            '<NumberFormat Format="0" />',
            '</Style>',

            '<Style ss:ID="oddfloat" ss:Parent="odd">',
            '<NumberFormat Format="0.00" />',
            '</Style>',


            '</Styles>',
            worksheet.xml,
            '</Workbook>'
        );
    },
        /*

        Support function to return field info from store based on fieldname

    */

    getModelField: function(fieldName) {
 		console.log("getModelField: ");
        var fields = this.store.model.getFields();

        for (var i = 0; i < fields.length; i++) {

            if (fields[i].name === fieldName) {
            	console.log("fields ["+i+"] name: "+ fields[i].name +  ", type: : " + fields[i].type );
                return fields[i];
            }
        }
    },

    /*

        Convert store into Excel Worksheet

    */
    generateEmptyGroupRow: function(dataIndex, value, cellTypes, includeHidden) {

 		console.log("generateEmptyGroupRow ");
        //var cm = this.columnManager.columns;
        var cm = this.columnManager.getColumns();
       // var colCount = cm.length;
        var colCount;
        colCount=cm.length;
        // if(this.columnManager.columns!=null){
        // 	colCount=this.columnManager.columns.length;
        // }
        // else{
        // 	colCount=17;
        // }

        var rowTpl = '<Row ss:AutoFitHeight="0"><Cell ss:StyleID="groupSeparator" ss:MergeAcross="{0}"><Data ss:Type="String"><html:b>{1}</html:b></Data></Cell></Row>';
        var visibleCols = 0;

        // rowXml += '<Cell ss:StyleID="groupSeparator">'

        for (var j = 0; j < colCount; j++) {
            if (cm[j].xtype != 'actioncolumn' && (cm[j].dataIndex != '') && (includeHidden || !cm[j].hidden)) {
                // rowXml += '<Cell ss:StyleID="groupSeparator"/>';
                visibleCols++;
            }
        }

        // rowXml += "</Row>";

        return Ext.String.format(rowTpl, visibleCols - 1, value);
    },

     createWorksheet: function(includeHidden, theTitle) {
     	console.log("createWorksheet");
        // Calculate cell data types and extra class names which affect formatting
        var cellType = [];
        var cellTypeClass = [];
        //var cm = this.columnManager.columns;
        var cm = this.columnManager.getColumns();

        var totalWidthInPixels = 0;
        var colXml = '';
        var headerXml = '';
        var visibleColumnCountReduction = 0;
        var colCount = 0;// cm.length;

        colCount=cm.length;
        console.log("createWorksheet -> colCount: " + colCount);

        for (var i = 0; i < colCount; i++) {
            if (cm[i].xtype != 'actioncolumn' && (cm[i].dataIndex != '') && (includeHidden || !cm[i].hidden)) {
                var w = cm[i].getEl().getWidth();
                totalWidthInPixels += w;

                if (cm[i].text === "") {
                    cellType.push("None");
                    cellTypeClass.push("");
                    ++visibleColumnCountReduction;
                } else {
                    colXml += '<Column ss:AutoFitWidth="1" ss:Width="' + w + '" />';
                    headerXml += '<Cell ss:StyleID="headercell">' +
                        '<Data ss:Type="String">' + cm[i].text + '</Data>' +
                        '<NamedCell ss:Name="Print_Titles"></NamedCell></Cell>';


                    var fld = this.getModelField(cm[i].dataIndex);
                    //console.log("fld.type: " + fld.name);
                    if(fld=="date"){
                    	//console.log("Tanggal dicetak: " + fld.name);
                    	cellType.push("DateTime");
                    	cellTypeClass.push("date");
                    }
                    else{
                    	cellType.push("Number");
                    	cellTypeClass.push("float");
					}
                    // switch (fld.type) {
                    //     case "int":
                    //         cellType.push("Number");
                    //         cellTypeClass.push("int");
                    //         break;
                    //     case "float":
                    //         cellType.push("Number");
                    //         cellTypeClass.push("float");
                    //         break;

                    //     case "bool":

                    //     case "boolean":
                    //         cellType.push("String");
                    //         cellTypeClass.push("");
                    //         break;
                    //     case "date":
                    //         cellType.push("DateTime");
                    //         cellTypeClass.push("date");
                    //         break;
                    //     default:
                    //         cellType.push("String");
                    //         cellTypeClass.push("");
                    //         break;
                    // }
                }
            }
        }
        var visibleColumnCount = cellType.length - visibleColumnCountReduction;

        var result = {
            height: 9000,
            width: Math.floor(totalWidthInPixels * 30) + 50
        };

        // Generate worksheet header details.

        // determine number of rows
        var numGridRows = this.store.getCount() + 2;
        if (!Ext.isEmpty(this.store.groupField) || this.store.groupers.items.length > 0) {
            numGridRows = numGridRows + this.store.getGroups().length;
        }

        // create header for worksheet
        var t = ''.concat(
            '<Worksheet ss:Name="' + theTitle + '">',

            '<Names>',
            '<NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'' + theTitle + '\'!R1:R2">',
            '</NamedRange></Names>',

            '<Table ss:ExpandedColumnCount="' + (visibleColumnCount + 2),
            '" ss:ExpandedRowCount="' + numGridRows + '" x:FullColumns="1" x:FullRows="1" ss:DefaultColumnWidth="65" ss:DefaultRowHeight="15">',
            colXml,
            '<Row ss:Height="38">',
            '<Cell ss:MergeAcross="' + (visibleColumnCount - 1) + '" ss:StyleID="title">',
            '<Data ss:Type="String" xmlns:html="http://www.w3.org/TR/REC-html40">',
            '<html:b>' + theTitle + '</html:b></Data><NamedCell ss:Name="Print_Titles">',
            '</NamedCell></Cell>',
            '</Row>',
            '<Row ss:AutoFitHeight="1">',
            headerXml +
            '</Row>'
        );

        // Generate the data rows from the data in the Store
        var groupVal = "";
        var groupField = "";
        if (this.store.groupers.keys.length > 0) {
            groupField = this.store.groupers.keys[0];
        }
        for (var i = 0, it = this.store.data.items, l = it.length; i < l; i++) {

            if (!Ext.isEmpty(groupField)) {
                if (groupVal != this.store.getAt(i).get(groupField)) {
                    groupVal = this.store.getAt(i).get(groupField);
                    t += this.generateEmptyGroupRow(groupField, groupVal, cellType, includeHidden);
                }
            }
            t += '<Row>';
            var cellClass = (i & 1) ? 'odd' : 'even';
            r = it[i].data;
            var k = 0;
            for (var j = 0; j < colCount; j++) {
                if (cm[j].xtype != 'actioncolumn' && (cm[j].dataIndex != '') && (includeHidden || !cm[j].hidden)) {
                    var v = r[cm[j].dataIndex];
                    if (cellType[k] !== "None") {
                        t += '<Cell ss:StyleID="' + cellClass + cellTypeClass[k] + '"><Data ss:Type="' + cellType[k] + '">';
                        if (cellType[k] == 'DateTime') {
                            t += Ext.Date.format(v, 'Y-m-d');
                        } else {
                            t += v;
                        }
                        t += '</Data></Cell>';
                    }
                    k++;
                }
            }
            t += '</Row>';
        }

        result.xml = t.concat(
            '</Table>',
            '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">',
            '<PageLayoutZoom>0</PageLayoutZoom>',
            '<Selected/>',
            '<Panes>',
            '<Pane>',
            '<Number>3</Number>',
            '<ActiveRow>2</ActiveRow>',
            '</Pane>',
            '</Panes>',
            '<ProtectObjects>False</ProtectObjects>',
            '<ProtectScenarios>False</ProtectScenarios>',
            '</WorksheetOptions>',
            '</Worksheet>'
        );
        return result;
    }
});

Ext.define('Ext.form.field.Month', {
        extend: 'Ext.form.field.Date',
        alias: 'widget.monthfield',
        requires: ['Ext.picker.Month'],
        alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
        selectMonth: null,
        createPicker: function() {
            var me = this,
                format = Ext.String.format;
            return Ext.create('Ext.picker.Month', {
                pickerField: me,
                ownerCt: me.ownerCt,
                renderTo: document.body,
                floating: true,
                hidden: true,
                focusOnShow: true,
                minDate: me.minValue,
                maxDate: me.maxValue,
                disabledDatesRE: me.disabledDatesRE,
                disabledDatesText: me.disabledDatesText,
                disabledDays: me.disabledDays,
                disabledDaysText: me.disabledDaysText,
                format: me.format,
                showToday: me.showToday,
                startDay: me.startDay,
                minText: format(me.minText, me.formatDate(me.minValue)),
                maxText: format(me.maxText, me.formatDate(me.maxValue)),
                listeners: {
                    select: {
                        scope: me,
                        fn: me.onSelect
                    },
                    monthdblclick: {
                        scope: me,
                        fn: me.onOKClick
                    },
                    yeardblclick: {
                        scope: me,
                        fn: me.onOKClick
                    },
                    OkClick: {
                        scope: me,
                        fn: me.onOKClick
                    },
                    CancelClick: {
                        scope: me,
                        fn: me.onCancelClick
                    }
                },
                keyNavConfig: {
                    esc: function() {
                        me.collapse();
                    }
                }
            });
        },
        onCancelClick: function() {
            var me = this;
            me.selectMonth = null;
            me.collapse();
        },
        onOKClick: function() {
            var me = this;
            if (me.selectMonth) {
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
            }
            me.collapse();
        },
        onSelect: function(m, d) {
            var me = this;
            me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        }
    });


var model_combo_kapal_ad = Ext.define('Kapal', {
    extend: 'Ext.data.Model',
    fields: ['name']
});
//
var store_combo_kapal_ad = Ext.create('Ext.data.Store', {
    model: model_combo_kapal_ad,
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

var model_adhoc_kapal = Ext.define('adhoc_kapal', {
    extend: 'Ext.data.Model',
    fields:[
		    {name:"date",type:"date"},
		    {name: "working distance", type: "Number"},
		    {name:"average speed",type: "Number"},
		    {name:"working hours ME1",type: "Number"},
		    {name:"working hours ME2",type: "Number"},
		    {name:"ME1 daily consumtion",type: "Number"},
		    {name:"ME1 consumtion rate",type: "Number"},
		    {name:"ME2 daily consumtion",type: "Number"},
		    {name:"ME2 consumtion rate",type: "Number"},
		    {name:"AE1 consumtion" ,type: "Number"},
		    {name:"AE2 consumtion",type: "Number"},
		    {name: "ME1 average rpm",type: "Number"},
		    {name:"ME2 average rpm",type: "Number"},
		    {name:"AE1 average rpm",type: "Number"},
		    {name:"AE2 average rpm",type: "Number"},
		    {name:"Total daily fuel",type: "Number"},
		    {name: "F_Sound check",type: "Number"},
		    {name:"Last fuel loading",type: "Number"},
		    {name: "Remaining on board",type: "Number"}
		 ]
	}
);

var store_adhoc_kapal = Ext.create('Ext.data.Store', {
    model: model_adhoc_kapal,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url:'http://project.daunbiru.com:1336/get_data_adhoc',
        timeout: 40000,
        //url: 'http://project.daunbiru.com:1337/get_data_bima?id=8&user_id=4&tz=%2B07&tgl=2018-02-01',
        method: 'GET',

    },
});

//var tabel_r_adhoc = Ext.create('Ext.grid.Panel', {
var tabel_r_adhoc = Ext.create('MyGrid', {
    id : 'table_ship_adhoc',
    title: 'Report Ad-Hoc',
    store : store_adhoc_kapal,
    flex: 4,
   	dockedItems: [{
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Download to Excel',
                    handler: function(b, e) {
                        b.up('grid').downloadExcelXml();
                    }
                }]
            }
          ],
    columns: [
    {
        header: "Date",
        width: 100,
        dataIndex: 'date',
		renderer: Ext.util.Format.dateRenderer('d-M-Y'),
        locked : true
    },{
      	header: "Working Dist.\n(km)",
		width: 100,
		dataIndex: 'working distance',
		renderer: function(v){return parseFloat(v).toFixed(2);}
		},{
		header: "Average Speed",
		width: 100,
		dataIndex: 'average speed',
		renderer: function(v){return parseFloat(v).toFixed(2);}
	},{
		header: "ME Portside",
      	columns: [{
				header: "Working Hours",
				width: 100,
				dataIndex: 'working hours ME1',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
				header: "Daily Consumption",
				width: 100,
				dataIndex: 'ME1 daily consumption',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
				header: "Hourly Rate",
				width: 100,
				dataIndex: 'ME1 consumption rate',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				}]
			},{
				header: "ME Starboard",
      			columns: [{
				header: "Working Hours",
				width: 100,
				dataIndex: 'working hours ME2',
				renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'ME2 daily consumtion',
					renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
					header: "Hourly Rate",
					width: 100,
					dataIndex: 'ME2 consumtion rate',
					renderer: function(v){return parseFloat(v).toFixed(2);}
			}]
			},{
      			header: "AE1",
      			columns: [{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'AE1 consumtion',
					renderer: function(v){return parseFloat(v).toFixed(2);}
				},{
					header: "RPM(rata2)",
					width: 100,
					dataIndex: 'AE1 average rpm',
					renderer: function(v){return parseFloat(v).toFixed(2);}

			}]
			},{
      			header: "AE2",
      			columns: [{
					header: "Daily Consumption",
					width: 100,
					dataIndex: 'AE2 consumtion',
					renderer: function(v){return parseFloat(v).toFixed(2);}
			},{
					header: "RPM (rata2)",
					width: 100,
					dataIndex: 'ME1 average rpm',
					renderer: function(v){return parseFloat(v).toFixed(2);}

			}]
		},
		{
			header: "Total Daily Fuel",
			width: 100,
			dataIndex: 'Total daily fuel',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		},{
     		header: "Remaining onBoard",
			width: 200,
			dataIndex: 'Remaining on board',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		},{

			header: "Last Fuel Loading",
			width: 200,
			dataIndex: 'Last fuel loading',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		},{
			header: "F_Sound_Check",
			width: 150,
			dataIndex: 'F_Sound check',
			renderer: function(v){return parseFloat(v).toFixed(2);}
		}]

});


var panel_r_adhoc = {
	dockedItems: [{
		padding : '0 0 0 10',
        xtype: 'toolbar',
        dock: 'top',
				height: 40,
        items: [{
				xtype : 'combobox',
				id : 'cb_vessel_adhoc',
				fieldLabel: ' Selected Ship',
				labelWidth : 80,
				width	: 300,
				// queryMode: 'remote',
				emptyText: '- select ship -',
				editable : false,
				displayField: 'name',
				valueField: 'id',
				store: store_combo_kapal1,
				listeners:{
					select: function() {
						var month='2018-02';
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month}});
						console.log("Combo box adhoc selected [" + id_vessel_adhoc +"],[" + month +"]");
					},
					afterrender : function(){
						var isi = this.getStore().data.items[0].data['name'];
						this.setValue(isi);
						id_vessel_adhoc = this.getValue();
						comb_kapal2 = (comb_kapal1 != '') ? comb_kapal2 : isi;
						var month_adhoc =Ext.Date.format(Ext.getCmp('combo_month_adhoc').getValue(),'Y-m');
						//var month_adhoc = Ext.getCmp('combo_month_adhoc').getValue();
						var param = {user_id: dt.idu,id:id_kpl,tgl:tgl_sel1,tz: getTimeZone()};


						console.log("Combo box adhoc afterrender : [" + id_vessel_adhoc +"],[" + month_adhoc +"]");
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month_adhoc}});
						console.log(this.getStore());
						}
				}

			},{
				// padding : '0 0 0 5',
				fieldLabel: 'Date ',
				id: 'combo_month_adhoc',
				labelWidth: 40,
				// editable : false,
				// xtype: 'datefield',
				xtype: 'monthfield',
				submitFormat: 'Y-m-d',
        //         name: 'month',
				//
        //         format: 'F, Y',
				value: new Date(),
				// maxValue: new Date(),
				format: 'F, Y',

				listeners: {
					change: function () {

						var id_vessel_adhoc=Ext.getCmp('cb_vessel_adhoc').getValue();
						var month_adhoc=Ext.Date.format(this.getValue(),'Y-m');
						console.log("Combo box adhoc afterrender : [" + cb_vessel_adhoc +"],[" + month_adhoc +"]");
						store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month_adhoc}});

					},
					afterrender : function(){
						console.log('Date selected: ', this.getValue());
						// tgl_sel1 = Ext.Date.format(this.getValue(),'Y-m-d');
						// tgl_sel2 = (tgl_sel1 != '') ? tgl_sel1 : Ext.Date.format(new Date(), 'd-M-Y' );
						//console.log(tgl_sel1);
						var month_adhoc= this.getValue();
						//var id_vessel_adhoc=cb_vessel_adhoc.getValue();
						console.log("Bulan dipilih: " + month_adhoc);
						//store_adhoc_kapal.load({params: { id: id_vessel_adhoc, m: month}});
						}
				}
			},'->',
			{
				xtype : 'button',
				text:'Add Fuel',
				listeners:{
					click: function() {
	            // this == the button, as we are in the local scope
	            // this.setText('I was clicked!');
							console.log('diklik');
							window_fuel.show();
							window_fuel.setTitle ('Daily Fuel ');//+data.name);
							// window_fuel.vessel = data.id;
							// hitung_fuel(new Date(),data.id);
	        		},
				}

			}

        ]
    }],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        // tabel_adhoc
        tabel_r_adhoc
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

var panel_form_bunker = Ext.create('Ext.form.Panel', {
    // title: 'Form Fuel Bunkering',
    bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{

				xtype: 'fieldcontainer',
				fieldLabel: 'Date Time',
				layout: 'hbox',
				combineErrors: true,
				// defaultType: 'textfield',
				defaults: {
				 	hideLabel: 'true'
				},
				items: [{
					 	name: 'date',
					 	xtype:'datefield',
					 	flex: 2,
            maxValue: new Date(),
						value: new Date(),
						submitFormat: 'Y-m-d',
						format: 'd-M-Y',
					 	allowBlank: false
				}, {
					 	name: 'time',
					 	flex: 2,
					 	margin: '0 0 0 6',
					 	xtype:'timefield',
						increment:30,
						value: new Date(),
						format: 'H:i',
						allowBlank: false
					}]
				},{
					fieldLabel: 'Fuel Volume',
					xtype:'numberfield',
					name: 'value',
					minValue: 0,
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false,
					allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
							var dt = form.getValues();
							dt.titik_ukur_id = 11033;
							console.log(dt);
							Ext.Ajax.request({

							    url: getAPI()+'/pelindo/custom_input',
									method:'POST',

							    params: dt,
							    success: function(response){
							        var text = response.responseText;
							        // console.log(text);
											Ext.Msg.alert('Fuel-Bunkering', 'Sukses.</br>('+dt.date+' '+dt.time+':00) = '+dt.value+' Liters');
							    }
							});
							form.reset();
							store_fuel_bunker.reload();

            }
        }
    }],
    // renderTo: Ext.getBody()
});


var model_fuel_sonding = Ext.define('Fuel_Sonding', {
    extend: 'Ext.data.Model',
    fields: ['date','volume']
});
//
var store_fuel_sonding = Ext.create('Ext.data.Store', {
    model: model_fuel_sonding,
    autoLoad: true,
		proxy: {
				type: 'ajax',
				url:getAPI()+'/pelindo/custom_input?titik_ukur_id=12005',
				method: 'GET',
				// params: {titik_ukur_id:12005},
				// reader: {
				//     type: 'json',
				//     //successProperty: 'success',
				//     root: '',
				//     // messageProperty: 'message'
				// }
		},
});

var tabel_fuel_sonding = Ext.create('Ext.grid.Panel', {
    title: 'History Sounding',
    store: store_fuel_sonding,
    columns: [
        { text: 'DateTime', dataIndex: 'date' },
        // { text: 'Level', dataIndex: 'email', flex: 1 },
        { text: 'Volume', dataIndex: 'volume', flex: 1 },
        { text: 'action', dataIndex: 'phone' }
    ],
		// layout :'fit',
    flex:1
		// autoscroll: true,
    // height: 200,

});

var panel_form_sonding = Ext.create('Ext.form.Panel', {
    // title: 'Form Fuel Bunkering',
    bodyPadding: 5,

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{

				xtype: 'fieldcontainer',
				fieldLabel: 'Date Time',
				layout: 'hbox',
				combineErrors: true,
				// defaultType: 'textfield',
				defaults: {
				 	hideLabel: 'true'
				},
				items: [{
					 	name: 'date',
					 	xtype:'datefield',
					 	flex: 2,
            maxValue: new Date(),
						value: new Date(),
						format: 'd-M-Y',
						submitFormat: 'Y-m-d',
					 	allowBlank: false
				}, {
					 	name: 'time',
					 	flex: 2,
					 	margin: '0 0 0 6',
					 	xtype:'timefield',
						increment:30,
						value: new Date(),
						format: 'H:i',
						allowBlank: false
					}]
				// },{
	      //   fieldLabel: 'Fuel Level',
	      //   name: 'fuel_sond',
	      //   allowBlank: false
				},{
					fieldLabel: 'Fuel Volume',
					xtype:'numberfield',
					name: 'value',
					minValue: 0,
	        hideTrigger: true,
	        keyNavEnabled: false,
	        mouseWheelEnabled: false,
					allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {

							// console.log('lalala');
							// console.log('id titik ukur ==> 12005');

							// console.log(form.getValues());
							var dt = form.getValues();
							// console.log(dt.tgl_son+' '+dt.time_son+':00');
							// var dt_tgl = dt.tgl_son+' '+dt.time_son+':00';
							// var dt_vol = dt.vol_son;
							// var dt_tu = 12005;
							dt.titik_ukur_id = 12005;
							console.log(dt);
							Ext.Ajax.request({
							    url: getAPI()+'/pelindo/custom_input',
									method:'POST',
									// jsonData:json,
							    params: dt,
							    success: function(response){
							        var text = response.responseText;
							        // console.log(text);
              				Ext.Msg.alert('Fuel-Sounding', 'Sukses.</br>('+dt.date+' '+dt.time+':00) = '+dt.value+' Liters');
                      store_fuel_sonding.reload();
                  }
							});
							form.reset();

							// store_fuel_sonding.load({params:{titik_ukur_id: dt.titik_ukur_id}});
							// tabel_fuel_sonding.reload();
                // form.submit({
								// 	// console.log('lalala');
                //     success: function(form, action) {
                //        Ext.Msg.alert('Success', action.result.msg);
                //     },
                //     failure: function(form, action) {
                //         Ext.Msg.alert('Failed', action.result.msg);
                //     }
                // });
            }
        }
    }],
    // renderTo: Ext.getBody()
});
var model_fuel_bunker = Ext.define('Fuel_Sonding', {
    extend: 'Ext.data.Model',
    fields: ['date','total']
});
//
var store_fuel_bunker = Ext.create('Ext.data.Store', {
    model: model_fuel_bunker,
    autoLoad: true,
		proxy: {
				type: 'ajax',

				// url:'http://10.10.10.11:1336/pelindo/custom_input?titik_ukur_id=11033',
				// url:'http://192.168.1.17:1337/pelindo/custom_input?titik_ukur_id=11033',
				url:getAPI()+'/pelindo/custom_input?titik_ukur_id=11033',

				method: 'GET',
				// params: {titik_ukur_id:12005},
				// reader: {
				//     type: 'json',
				//     //successProperty: 'success',
				//     root: '',
				//     // messageProperty: 'message'
				// }
		},
});
var tabel_fuel_bunker = Ext.create('Ext.grid.Panel', {
    title: 'History Bunkering',

    store: store_fuel_bunker,

    columns: [
        { text: 'DateTime', dataIndex: 'date' },
        { text: 'Total', dataIndex: 'total', flex: 1 },
        { text: 'action', dataIndex: 'phone' }
    ],
    // height: 200,
    flex:1
    // width: 400,
    // renderTo: Ext.getBody()
});

var window_fuel = Ext.create('Ext.window.Window',{
    title : 'fuel window',
    width : 400,
    modal : true,
    closable: false,
    layout : {
        type : 'fit',
        align : 'stretch'
    },
    items : [{
        xtype : 'tabpanel',
				width: 400,
		    height: 300,
		    defaults: {
		        // bodyPadding: 10,
		        scrollable: true
		    },
				items: [{
			        title: 'Fuel-Bunkering',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							items:[ panel_form_bunker,tabel_fuel_bunker]

			    }, {
			        title: 'Fuel-Sounding',
							items:[ panel_form_sonding,tabel_fuel_sonding]
			    }]
        // itemId : 'hasil_hitung',
    }],

    buttons : [{
        text : 'Close',
        handler : function(){
            this.up('.window').hide();
        }
    }]

});
