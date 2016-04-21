var jQueryScriptOutputted = false;
var clippyScriptOutputted = false;
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
        initClippy();
    }
}

function initClippy() {
    if (typeof (clippy) == 'undefined') {
        if (!clippyScriptOutputted) {
            clippyScriptOutputted = true;
            var headID = document.getElementsByTagName("head")[0];
            var clippyCss = document.createElement("link");
            clippyCss.rel = "stylesheet";
            clippyCss.type = "text/css";
            clippyCss.href = "/SPAgent/clippy.js-master/build/clippy.css";
            clippyCss.media = "all";
            headID.appendChild(clippyCss);
            var clippyScript = document.createElement("script");
            clippyScript.type = "text/javascript";
            clippyScript.src = "/SPAgent/clippy.js-master/build/clippy.js";
            headID.appendChild(clippyScript);

        }
        setTimeout("initClippy()", 50);
    } else {
        clippy.BASE_PATH = '/SPAgent/clippy.js-master/agents/';
        clippy.load('Clippy', function (agent) {
            clippy.myAgent = agent;
            clippy.myAgent.show();
        });
    }
}

initJQuery();