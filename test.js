var resources = require('./resources.js')
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function TestTemplate(){
	console.log(pickRandom(resources.naturalDisasters)+' of '+pickRandom(resources.agents))
}
setInterval(()=>TestTemplate(),1000*2)