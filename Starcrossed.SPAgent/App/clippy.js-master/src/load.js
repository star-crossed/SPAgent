Starcrossed.SPAgent.Clippy.BASE_PATH = 'agents/';

Starcrossed.SPAgent.Clippy.load = function (name, successCb, failCb, path) {
    path = path || Starcrossed.SPAgent.Clippy.BASE_PATH + name;

    var mapDfd = Starcrossed.SPAgent.Clippy.load._loadMap(path);
    var agentDfd = Starcrossed.SPAgent.Clippy.load._loadAgent(name, path);
    var soundsDfd = Starcrossed.SPAgent.Clippy.load._loadSounds(name, path);

    var data;
    agentDfd.done(function (d) {
        data = d;
    });

    var sounds;

    soundsDfd.done(function (d) {
        sounds = d;
    });

    // wrapper to the success callback
    var cb = function () {
        var a = new Starcrossed.SPAgent.Clippy.Agent(path, data,sounds);
        successCb(a);
    };

    $.when(mapDfd, agentDfd, soundsDfd).done(cb).fail(failCb);
};

Starcrossed.SPAgent.Clippy.load._maps = {};
Starcrossed.SPAgent.Clippy.load._loadMap = function (path) {
    var dfd = Starcrossed.SPAgent.Clippy.load._maps[path];
    if (dfd) return dfd;

    // set dfd if not defined
    dfd = Starcrossed.SPAgent.Clippy.load._maps[path] = $.Deferred();

    var src = path + '/map.png';
    var img = new Image();

    img.onload = dfd.resolve;
    img.onerror = dfd.reject;

    // start loading the map;
    img.setAttribute('src', src);

    return dfd.promise();
};

Starcrossed.SPAgent.Clippy.load._sounds = {};

Starcrossed.SPAgent.Clippy.load._loadSounds = function (name, path) {
    var dfd = Starcrossed.SPAgent.Clippy.load._sounds[name];
    if (dfd) return dfd;

    // set dfd if not defined
    dfd = Starcrossed.SPAgent.Clippy.load._sounds[name] = $.Deferred();

    var audio = document.createElement('audio');
    var canPlayMp3 = !!audio.canPlayType && "" != audio.canPlayType('audio/mpeg');
    var canPlayOgg = !!audio.canPlayType && "" != audio.canPlayType('audio/ogg; codecs="vorbis"');

    if (!canPlayMp3 && !canPlayOgg) {
        dfd.resolve({});
    } else {
        var src = path + (canPlayMp3 ? '/sounds-mp3.js' : '/sounds-ogg.js');
        // load
        Starcrossed.SPAgent.Clippy.load._loadScript(src);
    }

    return dfd.promise()
};

Starcrossed.SPAgent.Clippy.load._data = {};
Starcrossed.SPAgent.Clippy.load._loadAgent = function (name, path) {
    var dfd = Starcrossed.SPAgent.Clippy.load._data[name];
    if (dfd) return dfd;

    dfd = Starcrossed.SPAgent.Clippy.load._getAgentDfd(name);

    var src = path + '/agent.js';

    Starcrossed.SPAgent.Clippy.load._loadScript(src);

    return dfd.promise();
};

Starcrossed.SPAgent.Clippy.load._loadScript = function (src) {
    var script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('async', 'async');
    script.setAttribute('type', 'text/javascript');

    var dochead = document.head || document.getElementsByTagName('head')[0];
    dochead.appendChild(script);
};

Starcrossed.SPAgent.Clippy.load._getAgentDfd = function (name) {
    var dfd = Starcrossed.SPAgent.Clippy.load._data[name];
    if (!dfd) {
        dfd = Starcrossed.SPAgent.Clippy.load._data[name] = $.Deferred();
    }
    return dfd;
};

Starcrossed.SPAgent.Clippy.ready = function (name, data) {
    var dfd = Starcrossed.SPAgent.Clippy.load._getAgentDfd(name);
    dfd.resolve(data);
};

Starcrossed.SPAgent.Clippy.soundsReady = function (name, data) {
    var dfd = Starcrossed.SPAgent.Clippy.load._sounds[name];
    if (!dfd) {
        dfd = Starcrossed.SPAgent.Clippy.load._sounds[name] = $.Deferred();
    }

    dfd.resolve(data);
};
