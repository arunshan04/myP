(function (DateFormatter) {
    /**
      * DataViz Charts Japanese Translation
      * http://www.jqchart.com/
      * 
      * In order to use a particular language pack, you need to include the JavaScript language
      * pack to the head of your page, after referencing the dataviz.chart JavaScript file.
      * 
      * <script src="../js/dataviz.chart.min.js" type="text/javascript"></script>
      * <script src="../js/i18n/chart.locale-xx.js" type="text/javascript"></script>
      **/
    DateFormatter.DateFormat = {
        dayNames: [
            "\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f",
            "\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f"
        ],
        monthNames: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
            "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"
        ],
        amPm: ["am", "pm", "AM", "PM"],
        S: "\u756a\u76ee",
        masks: {
            shortDate: "m/d/yyyy",
            shortTime: "h:MM TT",
            longTime: "h:MM:ss TT"
        }
    };
})(DataViz.DateFormatter);
