Type.registerNamespace('Starcrossed');
Starcrossed.SPAgent = Starcrossed.SPAgent || {};

Starcrossed.SPAgent.jQueryScriptOutputted = false;
Starcrossed.SPAgent.clippyScriptOutputted = false;

Starcrossed.SPAgent.initJQuery = function () {
    if (typeof (jQuery) == 'undefined') {
        if (!Starcrossed.SPAgent.jQueryScriptOutputted) {
            Starcrossed.SPAgent.jQueryScriptOutputted = true;
            var headID = document.getElementsByTagName("head")[0];
            var jqueryScript = document.createElement("script");
            jqueryScript.type = "text/javascript";
            jqueryScript.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
            headID.appendChild(jqueryScript);
        }
        setTimeout("Starcrossed.SPAgent.initJQuery()", 50);
    } else {
        Starcrossed.SPAgent.initClippy();
    }
};

Starcrossed.SPAgent.initClippy = function () {
    if (typeof (Starcrossed.SPAgent.Clippy) == 'undefined') {
        if (!Starcrossed.SPAgent.clippyScriptOutputted) {
            Starcrossed.SPAgent.clippyScriptOutputted = true;
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
        setTimeout("Starcrossed.SPAgent.initClippy()", 50);
    } else {
        if (typeof (Starcrossed.SPAgent.Clippy.myAgent) == 'undefined') {
            Starcrossed.SPAgent.Clippy.BASE_PATH = '/SPAgent/clippy.js-master/agents/';
            Starcrossed.SPAgent.Clippy.load('Clippy', function (agent) {
                Starcrossed.SPAgent.Clippy.myAgent = agent;
                Starcrossed.SPAgent.Clippy.myAgent.show();
            });
        }
    }
}

Starcrossed.SPAgent.initJQuery();