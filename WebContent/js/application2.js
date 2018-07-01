var createChart=function(series){

        	

        	var chart = new DataViz.Chart({
                title: { text: 'Daily Batch Summary' },
                animation: { duration: 1 },
                shadows: {
                    enabled: true
                },
                series: series
            });
            chart.write('jqChart');
}

var createGoogleChart=function(data){
	
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Year', 'AU', 'ID', 'SG'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 0],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ]);

      var options = {
        chart: {
          title: 'Batch Abends',
          subtitle: 'Batch Abend History Detaqils for Last 7 days',
        }
      };

      var chart = new google.charts.Bar(document.getElementById('jqChart1'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}

requestData = function(request_url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && xhr.status==200) {
            content = xhr.responseText;
            if(content != '' && (content)) {
                callback(JSON.parse(content));
            } else {
                callback(false);
            }
        }
    }
    xhr.open('GET',request_url, true);
    xhr.send(null);
}




requestData("getdata?table=batch_errors", function(data) {
    if(data !== false) {
    	rows=data.rows;
    	CreateGrid(rows);

    	
    	d2=[];
    	
			
    	

    	
    } else {
        callback(false);  
    }
});




var CreateGrid=function(rows){
	containsOrNot = 'contains'
	var lastsel2;
          $("#Grid1").jqGrid({
              datatype: "jsonstring",
              //editurl:"updatedata",
              datastr:rows,
              colNames: ['S_CNTRY_CDE', 'S_SEG_CDE', 'V_PGM_CDE', 'L1_UPDATE','ISSUE_CATEGORY','ERROR_TEXT'],
              colModel: [{name: 'S_CNTRY_CDE',index: 'S_CNTRY_CDE',width: 100,align: 'center'},
                  {name: 'S_SEG_CDE',index: 'S_SEG_CDE',width: 100,editable: false,align: 'center',sortable: true,sorttype: 'text'},
                  {name: 'V_PGM_CDE',index: 'V_PGM_CDE',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'L1_UPDATE',index: 'L1_UPDATE',width: 100,editable: true,sortable: true,align: 'center',sorttype: 'text'
                	  /*,editoptions: {dataEvents: [{
                          							type: 'focusin',
                          							fn: function (e) {
                          							var elem = e.target;
                          							//	setTimeout(function () {elem.select();}, 10000);
                          							}
                      }]}*/
                  },
                  {name: 'ISSUE_CATEGORY',index: 'ISSUE_CATEGORY',width: 100,editable:true, edittype:"select",formatter:'select', editoptions:{value:"DB:DBERRORS;APP:APPLICATION;BATCH:BATCHERROS"}},
                  {name: 'ERROR_TEXT',index: 'ERROR_TEXT',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'}],
              pager: jQuery('#pager1'),
              loadonce: true,
              rowNum: 13,
              height:'auto',
              editurl: "updatedata",
              /*onCellSelect: function (row, col, content, event) {
            	        var cm = $("#Grid1").jqGrid("getGridParam", "colModel");
            	        if (window.getSelection) {
            	            selection = window.getSelection();
            	            
            	        } else if (document.selection) {
            	            selection = document.selection.createRange();
            	        }
            	        selectionColumn = cm[col].name;
            	        selection.toString() !== '' && $("#gs_" + selectionColumn).val(selection.toString());
            	        if (selection.toString() != '') {
            	            $("#Grid1")[0].triggerToolbar();
            	        }
            	    },*/
            	    onSelectRow: function (rowid, status, e) {
            	        var $self = $(this),
            	            $td = $(e.target).closest("tr.jqgrow>td"),
            	            p = $self.jqGrid("getGridParam"),
            	            cm = $td.length > 0 ? p.colModel[$td[0].cellIndex] : null;
            	        cmName = cm !== 0 && cm.editable ? cm.name : 'POD_UISelected';
            	        if (rowid && rowid !== lastsel2) {
            	            if (lastsel2 != "" && typeof lastsel2 !== 'undefined') {
            	                $self.jqGrid('saveRow', lastsel2);
            	            }
            	            lastsel2 = rowid;
            	        }
            	        $self.jqGrid('editRow', rowid, {
            	            keys: true,
            	            focusField: cmName
            	        });
            	        return true;
            	    },
                beforeSelectRow: function (rowid, e) {
                    var $self = $(this),
                        $td = $(e.target).closest("tr.jqgrow>td"),
                        p = $self.jqGrid("getGridParam"),
                        savedRow = p.savedRow,
                        j = $self.jqGrid("getRowData",lastsel2),
                        cm = $td.length > 0 ? p.colModel[$td[0].cellIndex] : null,
                        isChecked;
                    /*                    if (savedRow.length > 0 && savedRow[0].id !== rowid) {
                                    $self.jqGrid("restoreRow", savedRow[0].id);
                                }*/
                    if (cm != null && cm.name === "W3LabelSelected" && $(e.target).is(":checkbox")) {
                        if (savedRow.length > 0) {
                            // some row is editing now
                            isChecked = $(e.target).is(":checked");
                            if (savedRow[0].id === rowid) {
                                $self.jqGrid("saveRow", rowid, {
                                    extraparam: {
                                        POD_UISelected: isChecked ? "1" : "0"
                                    },
                                    aftersavefunc: function (response) {
                                        $self.jqGrid("editRow", rowid);
                                    }
                                });
                            }
                        } else {
                            $.ajax({
                                type: "POST",
                                url: Routing.generate('product_order_expedited_po_select_one'),
                                data: $self.jqGrid("getRowData", rowid)
                            });
                        }
                    }
                    return true; // allow selection
                },
                serializeEditData: function (data) {
                    alert(data);
                },
              width:1500,
              rowList: [10, 20, 30],
              sortname: 'S_CNTRY_CDE',
              sortorder: 'asc',
              viewrecords: true,
              gridview: true,
              rownumbers: true, // show row numbers
              rownumWidth: 25, // the width of the row numbers columns
              sortable: true
          }).jqGrid('filterToolbar', {
        	    searchOperators: true,
        	    stringResult: true,
        	    searchOnEnter: true,
        	    sopt: ['cn', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'ew', 'nc'],
        	    beforeSearch: function () {
        	        if (containsOrNot == "notContains" && containsOrNot != "contains") {
        	            //CODE FOR EXCLUDE EXECUTE HERE
        	            var i, l, rules, rule, $grid = $grid,
        	                postData = $("#list").jqGrid('getGridParam', 'postData'),
        	                filters = $.parseJSON(postData.filters);

        	            if (filters && typeof filters.rules !== 'undefined' && filters.rules.length > 0) {
        	                rules = filters.rules;
        	                for (i = 0; i < rules.length; i++) {
        	                    rule = rules[i];
        	                    if (rule.op === 'cn') {
        	                        // change contains to does not contain
        	                        rule.op = 'nc';
        	                    }
        	                }
        	                postData.filters = JSON.stringify(filters);
        	            }
        	        }
        	    }
        	});
          
          };
          
          
