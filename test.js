var resources = require('./resources.js')
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function TestTemplate(){
	console.log(pickRandom(resources.d.shockBois)+' '+pickRandom(resources.d.violentAdverbs)+' '+pickRandom(resources.d.metalSoundingVerbs))
}
setInterval(()=>TestTemplate(),500)
