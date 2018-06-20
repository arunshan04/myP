(function (DateFormatter) {
    /**
      * DataViz Charts Italian Translation
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
            "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab",
            "Domenica", "Luned�", "Marted�", "Mercoled�", "Gioved�", "Venerd�", "Sabato"
        ],
        monthNames: [
            "Gen", "Feb", "Mar", "Apr", "Mag", "Gui", "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
            "Genneio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Movembre", "Dicembre"
        ],
        amPm: ["am", "pm", "AM", "PM"],
        s: function (b) { return b < 11 || b > 13 ? ["st", "nd", "rd", "th"][Math.min((b - 1) % 10, 3)] : "th" },
        masks: {
            shortDate: "m/d/yyyy",
            shortTime: "h:MM TT",
            longTime: "h:MM:ss TT"
        }
    };
})(DataViz.DateFormatter);