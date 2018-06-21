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
	var lastsel2;
          $("#Grid1").jqGrid({
              datatype: "jsonstring",
              //editurl:"updatedata",
              datastr:rows,
              colNames: ['S_CNTRY_CDE', 'S_SEG_CDE', 'V_PGM_CDE', 'L1_UPDATE','ISSUE_CATEGORY','ERROR_TEXT'],
              colModel: [{name: 'S_CNTRY_CDE',index: 'S_CNTRY_CDE',width: 100,align: 'center'},
                  {name: 'S_SEG_CDE',index: 'S_SEG_CDE',width: 100,editable: false,align: 'center',sortable: true,sorttype: 'text'},
                  {name: 'V_PGM_CDE',index: 'V_PGM_CDE',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'L1_UPDATE',index: 'L1_UPDATE',width: 100,editable: true,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'ISSUE_CATEGORY',index: 'ISSUE_CATEGORY',width: 100,editable:true, edittype:"select",formatter:'select', editoptions:{value:"DB:DBERRORS;APP:APPLICATION;BATCH:BATCHERROS"}},
                  {name: 'ERROR_TEXT',index: 'ERROR_TEXT',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'}],
              pager: jQuery('#pager1'),
              loadonce: true,
              rowNum: 13,
              height:'auto',
              onSelectRow: function(id){
                  if(id && id!==lastsel2){
                	  $("#Grid1").restoreRow(lastsel2);
                	  $("#Grid1").editRow(id,true);
                      lastsel2=id;
                  }
                },
                inlineEditing: {
                    keys: true,
                    serializeSaveData: function (postData) {
                        var changedData = {}, prop, p = $(this).jqGrid("getGridParam"),
                            idname = p.keyName || p.prmNames.id;

                        for (prop in postData) {
                            if (postData.hasOwnProperty(prop) &&
                                (postData[prop] !== p.savedRow[0][prop] || prop === idname)) {
                                changedData[prop] = postData[prop];
                            }
                        }
                        alert(JSON.stringify(changedData));
                        return changedData;
                    }
                },
              width:1500,
              rowList: [10, 20, 30],
              sortname: 'MODULE',
              sortorder: 'desc',
              viewrecords: true,
              gridview: true,
              rownumbers: true, // show row numbers
              rownumWidth: 25, // the width of the row numbers columns
              sortable: true
          });
          
          };