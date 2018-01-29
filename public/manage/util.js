window.Util = {
    generateTabelHTML: function (currentContentId, data, commands, customColumnFunc, customButtonFunc) {
        var orderedColumns = [];
        $("#" + currentContentId + " table tr th[data-column-id]").each(function () {
            orderedColumns.push($(this).attr("data-column-id"));
        });
        var contentTemp = '';
        data.forEach(function (item) {
            var tr = '<tr>'
            orderedColumns.forEach(function (column) {
                var value = item.hasOwnProperty(column) ? item[column] : "";
                if (!customColumnFunc) {
                    tr += '<td>' + value + '</td>'
                }
                else {
                    tr += customColumnFunc(column, value, item);
                }
            });
            tr += "<td>";
            if (commands) {
                for (var i = 0; i < commands.length; i++) {
                    //probably should rewrite this at some point
                    tr += commands[i].replace("{{0}}", item.id).replace("{{1}}", item.secondaryId) + " ";
                }
            }
            tr += "</td>";
            tr += '</tr>';

            if (customButtonFunc) {
                tr = customButtonFunc(tr, item);
            }

            contentTemp += tr;
        });

        $('#' + currentContentId + ' table tbody').html('');
        $('#' + currentContentId + ' table tbody').html(contentTemp);
    },
    getCurrentTrColumnValue: function (currentTrEl, columnName) {
        var parentEl = currentTrEl.parentNode;
        var returnColumnValue = '';
        while (parentEl != null && parentEl.tagName != "TABLE") {
            parentEl = parentEl.parentNode;
        }
        if (parentEl.tagName == "TABLE") {
            var columnIndex = -1;
            $(parentEl).find("th").toArray().find(function (item, index) {
                if ($(item).attr("data-column-id").toLowerCase() == columnName.toLowerCase()) {
                    columnIndex = index;
                    return true;
                }
                return false;
            });
            if (columnIndex > -1) {
                returnColumnValue = $(currentTrEl).find("td")[columnIndex].innerHTML;
            }
        }
        return returnColumnValue;
    }
}