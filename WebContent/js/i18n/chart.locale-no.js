(function (DateFormatter) {
    /**
      * DataViz Charts Norwegian Translation
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
            "s�.", "ma.", "ti.", "on.", "to.", "fr.", "l�.",
            "S�ndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "L�rdag"
        ],
        monthNames: [
            "jan.", "feb.", "mars", "april", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des.",
            "januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"
        ],
        amPm: ["", "", "", ""],
        s: function (b) { return "." },
        masks: {
            shortDate: "d.m.yyyy",
            shortTime: "HH:MM",
            longTime: "HH:MM:ss"
        }
    };
})(DataViz.DateFormatter);
