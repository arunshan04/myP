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
    	series=[];
    	var Countries = alasql('SELECT distinct S_CNTRY_CDE  FROM ? ',[rows]);
    	Countries.forEach(function(object){
    		d1=alasql('SELECT V_MISDATE,count(*) as cnt  FROM ? where S_CNTRY_CDE= ? group by V_MISDATE ',[rows,object.S_CNTRY_CDE]);
    		var data= [];
    		d1.forEach(function(object1){
    			data.push([object1.V_MISDATE,object1.cnt]);
    			
    		});
    		 var obj = new Object();
    		   obj.type= "column";
    		   obj.title = object.S_CNTRY_CDE;
    		   obj.data =data;
    		   series.push(obj);
    	});
    	createChart(series);
    	//CreateGrid(rows);
    	
    	d2=[];
    	
    	var batch_date= alasql('SELECT distinct V_MISDATE  FROM ? order by V_MISDATE',[rows]);
    	
    	batch_date.forEach(function(object1){
			data.push([object1.V_MISDATE,object1.cnt]);
			
		});    	


    	

    	
    } else {
        callback(false);  
    }
});

requestData("getdata?table=test123", function(data) {
    if(data !== false) {
    	//alert(JSON.stringify(data));
    } else {
        callback(false);
    }
});



var CreateGrid=function(rows){

          $("#Grid1").jqGrid({
              datatype: "jsonstring",
              datastr:rows,
              colNames: ['S_CNTRY_CDE', 'S_SEG_CDE', 'V_PGM_CDE', 'I_PASS_NO','I_SEQ_NUM','ERROR_TEXT'],
              colModel: [{name: 'S_CNTRY_CDE',index: 'S_CNTRY_CDE',width: 100,align: 'center'},
                  {name: 'S_SEG_CDE',index: 'S_SEG_CDE',width: 100,editable: false,align: 'center',sortable: true,sorttype: 'text'},
                  {name: 'V_PGM_CDE',index: 'V_PGM_CDE',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'I_PASS_NO',index: 'I_PASS_NO',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'I_SEQ_NUM',index: 'I_SEQ_NUM',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'},
                  {name: 'ERROR_TEXT',index: 'ERROR_TEXT',width: 100,editable: false,sortable: true,align: 'center',sorttype: 'text'}],
              pager: jQuery('#pager1'),
              loadonce: true,
              rowNum: 13,
              height:'auto',
              width:1500,
              rowList: [10, 20, 30],
              sortname: 'MODULE',
              sortorder: 'desc',
              viewrecords: true,
              gridview: true,
              rownumbers: true, // show row numbers
              rownumWidth: 25, // the width of the row numbers columns
              sortable: true
          }).jqGrid('navGrid', '#pager1', {refresh: true,edit: false,add: false,del: false,search: true});
          
          };