// based on the repo https://github.com/gruiz17/explosions 

var svg = d3.select("#svgContainer").append("svg:svg").style("pointer-events", "all");
var colors = d3.scale.category20b();
var ci=0;
var debug = false;
function log(msg) {if (debug) {console.log(msg);}}




stringConverter = {};








function doVisual(visualName, fmx, fmy, timeScale) {
	if (!timeScale) {timeScale=1;}
	var w = window.innerWidth, h = window.innerHeight;
	var visual = visuals[visualName];
	return visual(w*fmx, h*fmy, w, h, timeScale);
}

function setEventHandler(visualName, eventName) {
	// log(visualName, eventName);
	svg.on(eventName, mouseHandler(visualName));
}

function setEventHandlerFromMenuOption(element, eventName) {
	var visualName = element.value;
	setEventHandler(visualName, eventName);
}


$(document).ready(function() {
	/*setEventHandler('miniworks', 'mousemove');
	setEventHandler('hexagon', 'mousedown');
    $("#mousemoveSelector").change(function() {
        setEventHandlerFromMenuOption(this, 'mousemove');
    });
    $("#mousedownSelector").change(function() {
        setEventHandlerFromMenuOption(this, 'mousedown');
    });*/
    // importFromHash();
    console.log(location.href);
    var socket = io.connect(location.href);
    socket.on('news', function (data) {
      doEvent(data);
    });

});

var types = ["miniworks","fireworks","basiccircle","confetti"]
var type = "miniworks";
setInterval(function() {
  type = types[Math.floor(Math.random()*types.length)];
},12000);

var doEvent = function(data) {
//	var w = window.innerWidth, h = window.innerHeight;
//	var fmx = 100/w, fmy = 100/h;
  var d = new Date();
  var x = d.getTime() * 1000 + d.getUTCMilliseconds();
  x = (x/10) % 300000;
  var fmx = x/300000.0;
  var fmy = Math.random(); 
	return doVisual(type, fmx, fmy);
};


