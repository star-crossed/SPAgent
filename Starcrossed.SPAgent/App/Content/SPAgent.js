var jQueryScriptOutputted = false;
function initJQuery() {

    //if the jQuery object isn't available
    if (typeof (jQuery) == 'undefined') {


        if (!jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;

            //output the script (load it from google api)
            document.write("<scr" + "ipt type=\"text/javascript\" src=\"//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js\"></scr" + "ipt>");
        }
        setTimeout("initJQuery()", 50);
    } else {

        $(function () {
            //do anything that needs to be done on document.ready
            document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"clippy.css\" media=\"all\">");

            clippy.load('Rocky', function (agent) {
                // do anything with the loaded agent
                clippy.myAgent = agent;
                clippy.myAgent.show();
            });
        });
    }

}

initJQuery();