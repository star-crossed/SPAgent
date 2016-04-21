var jQueryScriptOutputted = false;
function initJQuery() {
    if (typeof (jQuery) == 'undefined') {
        if (!jQueryScriptOutputted) {
            jQueryScriptOutputted = true;
            var headID = document.getElementsByTagName("head")[0];
            var jqueryScript = document.createElement("script");
            jqueryScript.type = "text/javascript";
            jqueryScript.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
            headID.appendChild(jqueryScript);
        }
        setTimeout("initJQuery()", 50);
    } else {
        var headID = document.getElementsByTagName("head")[0];
        var clippyCss = document.createElement("link");
        clippyCss.rel = "stylesheet";
        clippyCss.type = "text/css";
        clippyCss.href = "/SPAgent/clippy.js-master/build/clippy.css";
        clippyCss.media = "all";
        headID.appendChild(clippyCss);

        SP.SOD.registerSod('clippy.js', '/SPAgent/clippy.js-master/build/clippy.min.js');
        LoadSodByKey("clippy.js", function () {
            clippy.load('Rocky', function (agent) {
                clippy.myAgent = agent;
                clippy.myAgent.show();
            });
        });
    }
}

initJQuery();