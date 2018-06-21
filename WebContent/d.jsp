var serverResponse = {
    "page": 1,
        "total": 1,
        "records": 4,
        "rows": [{
        "id": 941,
            "cell": [357967, false, "2015-10-28 00:00:00", 1]
    }, {
        "id": 940,
            "cell": [357963, false, "2015-10-28 00:00:00", 1]
    }, {
        "id": 939,
            "cell": [357967, false, "2015-10-28 00:00:00", 5]
    }, {
        "id": 938,
            "cell": [357967, false, "2015-10-28 00:00:00", 6]
    }]
},
containsOrNot = 'contains',
    $grid = $("#list"),
    lastsel2 = '';

$.extend($.jgrid.search, {
    multipleSearch: true,
    multipleGroup: true,
    recreateFilter: true,
    closeOnEscape: true,
    closeAfterSearch: true,
    overlay: 0
});

$grid.jqGrid({
    url: "/echo/json/", // use JSFiddle echo service
    datatype: "json",
    postData: {
        json: JSON.stringify(serverResponse) // needed for JSFiddle echo service
    },
    mtype: 'POST',
    colNames: ['id', 'Select Labels to Print', 'Item Number', 'Quantity'],
    colModel: [{
        name: 'I_PK',
        index: 'u.I_PK',
        align: 'right',
        editable: false,
        sopt: ['cn', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'ew', 'nc']
    }, {
        name: 'W3LabelSelected',
        index: 'u.W3LabelSelected',
        align: 'center',
        width: 170,
        editable: false,
        edittype: 'checkbox',
        formatter: "checkbox",
        search: false,
        formatoptions: {
            disabled: false
        },
        editoptions: {
            value: "1:0"
        }
    }, {
        name: 'I_ItemNumID',
        index: 'u.I_ItemNumID',
        align: 'right',
        editable: true,
        formatter: 'date',
        formatoptions: {
            srcformat: "ISO8601Long",
            newformat: "d-M-Y",
            disabled: false
        },
        sorttype: "date",
        editoptions: {
            size: 20,
            dataInit: function (el) {
                $(el).datepicker({
                    defaultDate: "+1w",
                    yearRange: "-100:+100",
                    numberOfMonths: 3,
                    dateFormat: 'dd-M-yy',
                    beforeShowDay: $.datepicker.noWeekends
                });
            },
            defaultValue: function () {
                var currentTime = new Date();
                var month = parseInt(currentTime.getMonth() + 1);
                month = month <= 9 ? "0" + month : month;
                var day = currentTime.getDate();
                day = day <= 9 ? "0" + day : day;
                var year = currentTime.getFullYear();
                return year + "-" + month + "-" + day;
            },
            dataEvents: [{
                type: 'focusin',
                fn: function (e) {
                    selectText(e);
                }
            }]
        }
    }, {
        name: 'Quantity',
        index: 'u.Quantity',
        align: 'right',
        editable: true,
        editoptions: {
            dataEvents: [{
                type: 'focusin',
                fn: function (e) {
                    var elem = e.target;
                    setTimeout(function () {
                        elem.select();
                    }, 50);
                }
            }]
        }
    }],
    cmTemplate: {
        width: 170
    },
    //autowidth: true,
    //width: 800,
    height: "auto",
    gridview: true,
    autoencode: true,
    shrinkToFit: false,
    pager: '#pager',
    rowNum: 50,
    rowTotal: 1000000,
    rowList: [50, 100, 500, 1000],
    rownumWidth: 40,
    viewrecords: true,
    caption: 'Label Generation',
    sortname: 'u.id',
    sortorder: 'desc',
    sortable: true,
    iconSet: "fontAwesome",
    autoResizing: {
        compact: true
    },
    loadonce: false,
    editurl: "/echo/json/",
    onCellSelect: function (row, col, content, event) {
        var cm = $("#list").jqGrid("getGridParam", "colModel");
        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.selection) {
            selection = document.selection.createRange();
        }
        selectionColumn = cm[col].name;
        selection.toString() !== '' && $("#gs_" + selectionColumn).val(selection.toString());
        if (selection.toString() != '') {
            $("#list")[0].triggerToolbar();
        }
    },
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
    inlineEditing: {
        keys: true,
        serializeSaveData: function (postData) {
            var changedData = {}, prop, p = $(this).jqGrid("getGridParam"),
                idname = p.keyName || p.prmNames.id,
                oldValue, cm, formatoptions;

            for (prop in postData) {
                oldValue = p.savedRow[0][prop];
                if (p.iColByName[prop] != null) {
                    cm = p.colModel[p.iColByName[prop]];
                    formatoptions = cm.formatoptions || {};
                    if (cm.formatter === "date" && formatoptions.sendFormatted !== true) {
                        oldValue = $.unformat.date.call(this, oldValue, cm);
                    }
                }
                if (postData.hasOwnProperty(prop) && (postData[prop] !== oldValue || prop === idname)) {
                    changedData[prop] = postData[prop];
                }
            }
            alert(JSON.stringify(changedData));
            return changedData;
        }
    },
    beforeSelectRow: function (rowid, e) {
        var $self = $(this),
            $td = $(e.target).closest("tr.jqgrow>td"),
            p = $self.jqGrid("getGridParam"),
            savedRow = p.savedRow,
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
    }

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
}).navButtonAdd('#pager', {
    id: "cn",
    caption: "",
    title: "Search containing this keyword",
    buttonicon: "fa-database",
    onClickButton: function () {
        $grid[0].triggerToolbar();
    },
    position: "last"
}).navButtonAdd('#pager', {
    id: "nc",
    caption: "",
    title: "Search excluding this keyword",
    buttonicon: "fa-exclamation",
    onClickButton: function () {
        containsOrNot = 'notContains';
        $grid[0].triggerToolbar();
    },
    position: "last"
}).navButtonAdd("#pager", {
    id: "firstRecord",
    title: "First Record",
    caption: "",
    buttonicon: "fa-step-backward",
    onClickButton: function () {
        var ids = $grid.getDataIDs();
        $grid.setSelection(ids[0], true);
    }
}).navButtonAdd("#pager", {
    id: "previousRecord",
    title: "Previous Record",
    caption: "",
    buttonicon: "fa-chevron-left",
    onClickButton: function () {
        var selectedRow = $grid.getGridParam('selrow');
        if (selectedRow == null) return;
        var ids = $grid.getDataIDs();
        var index = $grid.getInd(selectedRow);
        if (ids.length < 2) return;
        index--;
        $grid.setSelection(ids[index - 1], true);
    }
}).navButtonAdd("#pager", {
    id: "nextReocrd",
    title: "Next Record",
    caption: "",
    buttonicon: "fa-chevron-right",
    onClickButton: function () {
        var selectedRow = $grid.getGridParam('selrow');
        if (selectedRow == null) return;
        var ids = $grid.getDataIDs();
        var index = $grid.getInd(selectedRow);
        if (ids.length < 2) return;
        index++;
        $grid.setSelection(ids[index - 1], true);
    }
}).navButtonAdd("#pager", {
    id: "lastReocrd",
    title: "Last Record",
    caption: "",
    buttonicon: "fa-step-forward",
    onClickButton: function () {
        var ids = $grid.getDataIDs();
        index = ids.length;
        $grid.setSelection(ids[index - 1], true);
    }
}).jqGrid('gridResize');


function selectText(e) {
    var elem = e.target;
    setTimeout(function () {
        elem.select();
    }, 50);
}