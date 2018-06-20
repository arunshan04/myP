(function (DateFormatter) {
    /**
      * DataViz Charts Bulgarian Translation
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
            "���", "���", "��", "��", "���", "���", "���",
            "������", "����������", "�������", "�����", "���������", "�����", "������"
        ],
        monthNames: [
            "���", "���", "���", "���", "���", "���", "���", "���", "���", "���", "���", "���",
            "������", "��������", "����", "�����", "���", "���", "���", "������", "���������", "��������", "�������", "��������"
        ],
        amPm: ["", "", "", ""],
        s: function (j) {
            if (j == 7 || j == 8 || j == 27 || j == 28) {
                return '��';
            }
            return ['��', '��', '��'][Math.min((j - 1) % 10, 2)];
        },
        masks: {
            shortDate: "d/m/yyyy",
            shortTime: "H:MM",
            longTime: "H:MM:ss"
        }
    };
})(DataViz.DateFormatter);
