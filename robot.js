var robot = require("./omegle.js");
var colors = require("colors");
var reply = require("./reply.js")

robot.on("gotMessage",function(cid,msg){
	console.log("Stranger: ".yellow + msg.toString().green);
	reply(robot,msg);
});

robot.on("connected",function(cid){
	console.log("connected.".red);
});

robot.on("typing",function(cid){
	console.log("typing...".red);
});

robot.on("disconnected",function(){
	console.log("disconnected.".red);
	robot.connect();
});

robot.connect();