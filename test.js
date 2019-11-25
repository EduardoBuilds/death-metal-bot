var resources = require('./resources.js')
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function TestTemplate(){
	console.log(pickRandom(resources.d.statesOfDecay)+' '+pickRandom(resources.d.pluralBodyParts)+' of the '+pickRandom(resources.d.agents))
}
setInterval(()=>TestTemplate(),500)
