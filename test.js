var resources = require('./resources.js')
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function TestTemplate(){
	console.log(pickRandom(resources.d.evilAdjective)+' '+pickRandom(resources.d.actualDecay))
}
setInterval(()=>TestTemplate(),500)
