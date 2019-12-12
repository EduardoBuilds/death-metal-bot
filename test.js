var resources = require('./resources.js')
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function TestTemplate(){
	console.log(pickRandom(resources.d.violentAdverbs)+' '+pickRandom(resources.d.political)+' of the '+pickRandom(resources.d.adjectives) )
}
setInterval(()=>TestTemplate(),500)
