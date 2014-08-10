module.exports = function(robot,msg){

	var knowledge = [
		["(hello)|(hey)|(hi)|(yo+)","Hey, how's it going?"],
		["(male)|(m or f)|(asl)|(female)","F 19 here haha"]
	]
	
	for(var i=0;i<knowledge.length;i++){
		curr = knowledge[i];
		if(msg.match(new RegExp(curr[0],"gi"))){
			robot.send(curr[1]);
			console.log("Robot: ".yellow + curr[1].toString().green);
			return;
		}
	}
	robot.send("Honestly I don't know what to say.");
	console.log("Robot: ".yellow + "Honestly I don't know what to say.".green);
}