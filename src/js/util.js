/**
 * @returns {Number}
 */
function currentTime() {
    return new Date().getTime();
}

function $(selector, scope) {
    return $$(selector, scope)[0];
}

function $$(selector, scope) {
    return (scope || document.body).querySelectorAll(selector);
}

/**
 * @param {Number} raceTime
 * @returns {String}
 */
function formatRaceTime(raceTime) {
    var dt = new Date(raceTime);
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var millis =  dt.getMilliseconds();
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + "." + (millis < 10 ? "00" : millis < 100 ? "0" : "") + millis;
}

function isTouchDevice() {
    return ((typeof window["ontouchstart"] != "undefined")
         || (navigator["MaxTouchPoints"] > 0)
         || (navigator["msMaxTouchPoints"] > 0));
}

function requestFullScreen() {
    var docEl = document.documentElement;
    if (docEl.requestFullscreen) docEl.requestFullscreen();
    else if (docEl.mozRequestFullscreen) docEl.mozRequestFullscreen();
    else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
}