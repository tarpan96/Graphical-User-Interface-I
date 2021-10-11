$(document).ready(function () {

//For slider contents, Source : https://api.jqueryui.com/slider/
//This sets the min and max value, updates the table based on teh input
// https://coreui.io/docs/2.1/components/sliders/
    $(".allSliders").slider({
        orientation: "horizontal",
        min: -50,
        max: 50,
        animate: true,
        step: 1,
        value: 0,
        slide: function () {
            updateTable();
        },
    });

    //Change value in input field based on slider
    /*https://stackoverflow.com/questions/28932238/how-to-get-input-range-during-change-with-jquery/28932277*/
    $("#minXSlider").slider({
        slide: function (event, ui) {
            $("#minCol").val($("#minXSlider").slider("value"));
            updateTable();
        }
    });
    /* Update slider position based on input field
    https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field8*/
    $("#minCol").change(function () {
        $("#minXSlider").slider("value", $(this).val())
        updateTable();

    });

    $("#maxXSlider").slider({
        slide: function () {
            $("#maxCol").val($("#maxXSlider").slider("value"));

            updateTable();
        }
    });

    $("#maxCol").change(function () {
        $("#maxXSlider").slider("value", $(this).val())
        updateTable();
    });

    $("#minYSlider").slider({
        slide: function () {
            $("#minRow").val($("#minYSlider").slider("value"));
            updateTable();
        }
    });

    $("#minRow").change(function () {
        $("#minYSlider").slider("value", $(this).val())
        updateTable();
    });


    $("#maxYSlider").slider({
        slide: function () {
            $("#maxRow").val($("#maxYSlider").slider("value"));
            updateTable();
        }
    });

    $("#maxRow").change(function () {
        $("#maxYSlider").slider("value", $(this).val())
        updateTable();
    });

    //Function creates tabs to save the table
    // Most of the source was retrieved from :https://jqueryui.com/tabs/#manipulation
    $(function () {

        let tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
            tabCounter = 1;

        let tabs = $("#tabs").tabs();

        //Function add tab creates tabs by setting up properties such as ID and table contents
        function addTab() {
            let tabContent = getTable();
            label = getInput();
            let id = "tabs-" + tabCounter,
                li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
            tabs.find(".ui-tabs-nav").append(li);
            let tabContentHtml = tabContent.innerHTML;
            tabs.append("<div id='" + id + "'>" + tabContentHtml + "</div>");
            tabs.tabs("refresh");
            tabCounter++;

        }

        //function calls addTab when the button is clicked
        $("#add").button().click(function () {
            addTab();
            $("#tabs").show();

        });

        // close icon: removing the tab on click
        tabs.delegate("span.ui-icon-close", "click", function () {
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
            tabCounter--;
        });

        tabs.bind("keyup", function (event) {
            if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
                var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
                $("#" + panelId).remove();
                tabs.tabs("refresh");
                tabCounter--;
            }
        });
    });
});


