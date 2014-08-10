var eventEmitter = require('events').EventEmitter;
var request = require("request");
var readLine = require ("readline");
var portals = require("./lib/portals.js");
var omegle = new eventEmitter();
var connected = false;
var cid;
var urls;

omegle.timer = {};

if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });

    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });

}

process.on ("SIGINT", function(){
  omegle.disconnect();
  process.exit ();
});

function poll(){
	request.post({
		"url":urls.base+"/events",
		"form":{
			"id":cid
		}
	},function(err,res,bod){
		if(bod != "null"){
			bod = JSON.parse(bod);
			for(var i=0;i<bod.length;i++){
				var currArr = bod[i];
				if(currArr[0] === "connected"){
					omegle.emit("connected",cid);
				}
				else if(currArr[0] === "typing"){
					omegle.emit("typing",cid);
				}
				else if(currArr[0] === "gotMessage"){
					omegle.emit("gotMessage",cid,currArr[1]);
				}
				else if(currArr[0] === "strangerDisconnected"){
					connected = false;
					omegle.emit("disconnected");
				}
			}
		}
	});
}

omegle.send = function(msg){
	request.post({
		"url":urls.base+"/send",
		"form":{
			"id":cid,
			"msg":msg
		}
	});
}

omegle.connect = function(){
	if (connected) return;
	connected = true;
	urls = portals();
	request.post(urls.start,function(err,res,bod){
		cid = JSON.parse(bod).clientID;
		this.timer = setInterval(poll,1500);
	});
}

omegle.disconnect = function(){
	if (!connected) return;
	request.post({
		"url":urls.base+"/disconnect",
		"form":{
			"id":cid
		}
	},function(err,res,bod){
		connected = false;
		clearTimeout(timer);
	});
}

omegle.reconnect = function(){
	if (!connected) return;
	omegle.disconnect();
	omegle.connect();
}

module.exports = omegle;