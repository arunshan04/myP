<!DOCTYPE html>
<html>
<head>
        <title>
    Column Chart Example - HTML5 jQuery Chart Plugin by jqChart
</title>
        	<link rel="stylesheet" type="text/css" href="css/dataviz.chart.css" />
	<link rel="stylesheet" type="text/css" href="themes/le-frog/styles.css" />
	<script src="js/dataviz.chart.min.js" type="text/javascript"></script>
		<script src="https://cdn.jsdelivr.net/npm/alasql@0.4"></script>
        <script src="js/application.js" type="text/javascript"></script>
        
            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        
		
		

   <script type="text/ecmascript" src="js/jquery.min.js"></script> 
   <script type="text/ecmascript" src="js/trirand/jquery.jqGrid.min.js"></script>
    <!-- We support more than 40 localizations -->
    <script type="text/ecmascript" src="js/trirand/i18n/grid.locale-en.js"></script>
    <!-- This is the Javascript file of jqGrid -->   
    <script type="text/ecmascript" src="js/trirand/jquery.jqGrid.min.js"></script>
    <!-- A link to a Boostrap  and jqGrid Bootstrap CSS siles-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"> 
    <link rel="stylesheet" type="text/css" media="screen" href="css/trirand/ui.jqgrid-bootstrap.css" />
	<script>
		$.jgrid.defaults.width = 780;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
	</script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script type="text/ecmascript" src="js/bootstrap-datepicker.js"></script> 
    <script type="text/ecmascript" src="js/bootstrap3-typeahead.js"></script> 
    <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap-datepicker.css" />
    	<script type="text/javascript" language="javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    

        
        
        
        


</head>
<body>
    
    <div>
        <div id="Grid2" style="width: 500px; height: 30px;"></div>
        <table id="Grid1"></table>
			<div id="pager1"></div>
    </div>
    
    <table id="list"></table>
			<div id="pager1"></div>
            <button id="export">Export to Excel</button>
        <button id="SAVE">Save Changes</button>
        
    
    
</body>
</html>