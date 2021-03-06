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




requestData("getdata?query=select cast(rowid as varchar(20)) ROWID1,a.* from batch_errors a", function(data) {
    if(data !== false) {
    	rows=data.rows;
    	CreateGrid(rows);

    	
    	d2=[];
    	
			
    	

    	
    } else {
        callback(false);  
    }
});




var CreateGrid=function(rows){
	
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	editList={};
	containsOrNot = 'contains'
	var lastsel2;
          $("#Grid1").jqGrid({
              datatype: "jsonstring",
              //editurl:"updatedata",
              datastr:rows,
              colNames: ['S_CNTRY_CDE', 'S_SEG_CDE', 'V_PGM_CDE', 'L1_UPDATE','ROWID','ISSUE_CATEGORY','ERROR_TEXT'],
              colModel: [{name: 'S_CNTRY_CDE',index: 'S_CNTRY_CDE',width: 100,align: 'center'},
                  {name: 'S_SEG_CDE',index: 'S_SEG_CDE',width: 100,editable: false,align: 'center',sortable: true,sorttype: 'text'},
                  {name: 'V_PGM_CDE',index: 'V_PGM_CDE',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'L1_UPDATE',index: 'L1_UPDATE',width: 100,editable: true,sortable: true,align: 'center',sorttype: 'text'},
                  {name:'ROWID1',index:'ROWID1',width:100,editable:false,hidden:false},
                  {name: 'ISSUE_CATEGORY',index: 'ISSUE_CATEGORY',width: 100,editable:true, edittype:"select",formatter:'select', editoptions:{value:":Select;DB:DBERRORS;APP:APPLICATION;BATCH:BATCHERROS"}},
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
            	            savedRow=$("#Grid1").jqGrid('getRowData', lastsel2);
            	        }
            	        
            	        $self.jqGrid('editRow', rowid, {
            	            keys: true,
            	            focusField: cmName
            	        });
            	        return true;
            	    },
            	    serializeRowData:function(postdata){
            	    	d1={}
            	    	Object.keys(postdata).forEach(function(key) {
            	    	    if (savedRow[key]!=postdata[key] && typeof savedRow[key] != "undefined")
            	    	    {	
            	    	    	d1[key]=postdata[key]
            	    	    	
            	    	    	};
            	    	});
            	    	if (!isEmpty(d1)) {editList[savedRow["ROWID1"]]=d1}
            	        return false;
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
          });
          
          $("#Grid1").jqGrid('filterToolbar');
          
			$("#export").on("click", function(){
				$("#Grid1").jqGrid("exportToExcel",{
					includeLabels : true,
					includeGroupHeader : true,
					includeFooter: true,
					fileName : "jqGridExport.xlsx",
					maxlength : 40 // maxlength for visible string data 
				})
			})

			$("#SAVE").on("click", function(){

				$("#Grid1").jqGrid('saveRow', lastsel2);
				//alert(JSON.stringify(editList))
				var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
				xmlhttp.open("POST", "updatedata");
				xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				xmlhttp.send(JSON.stringify({"data":{"table":"batch_errors","rows":editList}}));
				editList={};
				})

			
          
          };
          
          
