module.exports = function(){
	
	function randNum(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	function randFrontNum(){
		return randNum(1,9);
	}
	
	function randIdVal(){
		var opts = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l",
					"m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
		idVal = "";
			
		for(var i=0;i<8;i++){
			idVal += opts[randNum(1,36)];
		}
		
		return idVal;
	}
	
	var frontNum = randFrontNum();
	
	return {
		"start":"http://front"+frontNum+".omegle.com/start?rcs=1&firstevents=1&spid=&randid="+randIdVal().toUpperCase()+"&lang=en",
		"base":"http://front"+frontNum+".omegle.com"
	};
};