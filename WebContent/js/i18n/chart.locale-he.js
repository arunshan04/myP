(function (DateFormatter) {
    /**
      * DataViz Charts Hebrew Translation
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
            "א", "ב", "ג", "ד", "ה", "ו", "ש",
            "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"
        ],
        monthNames: [
            "ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ",
            "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
        ],
        amPm: ["לפני הצהרים", "אחר הצהרים", "לפני הצהרים", "אחר הצהרים"],
        s: function (j) { return j < 11 || j > 13 ? ['', '', '', ''][Math.min((j - 1) % 10, 3)] : '' },
        masks: {
            shortDate: "m/d/yyyy",
            shortTime: "h:MM TT",
            longTime: "h:MM:ss TT"
        }
    };
})(DataViz.DateFormatter);
