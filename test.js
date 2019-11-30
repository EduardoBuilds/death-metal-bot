var resources = require('./resources.js')
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function TestTemplate(){
	console.log(pickRandom(resources.d.wildCardAdjectives)+' '+pickRandom(resources.d.fears))
}
setInterval(()=>TestTemplate(),500)
