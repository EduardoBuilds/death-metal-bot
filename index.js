require('dotenv').config()
const express = require('express')
const app = express()
var Twitter = require('twitter')
var resources = require('./resources.js')
var client = new Twitter({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret:process.env.CONSUMER_SECRET,
	access_token_key:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_SECRET,
})

var templates = {
	violentMedical:function(){
		return pickRandom(resources.violentAdverbs)+' '+pickRandom(resources.medicalTerms)
	},
	decayedBodyPartOperation:function(){
		return pickRandom(resources.statesOfDecay)+' '+pickRandom(resources.medicalBodyParts)+' '+pickRandom(resources.medicalTerms)
	},
	doubleRot:function(){
		let stateA = pickRandom(resources.statesOfDecay)
		let stateB = pickRandom(resources.statesOfDecay)
		while (stateA === stateB){
			stateB = pickRandom(resources.statesOfDecay)
		}
		return stateA+' and '+stateB
	},
	verbAgent:function(){
		return pickRandom(resources.pastTenseVerbs)+' by '+pickRandom(resources.agents)
	},
	decayedPartOfTheAgent:function(){
		return pickRandom(resources.statesOfDecay)+' '+pickRandom(resources.pluralBodyParts)+' of the '+pickRandom(resources.agents)
	},
	violentMedicalLong:function(){
		return pickRandom(resources.violentAdverbs)+' '+pickRandom(resources.medicalTerms)+' of the '+pickRandom(resources.adjectives)
	}
}

var lastTemplate = 'violentMedical';
var markovChain = {
	violentMedical:['decayedBodyPartOperation','decayedBodyPartOperation',
	'decayedBodyPartOperation','doubleRot','doubleRot','verbAgent','decayedPartOfTheAgent'],
	decayedBodyPartOperation:['doubleRot','doubleRot','doubleRot','violentMedical',
	'violentMedical','violentMedical','verbAgent','verbAgent','violentMedicalLong'],
	doubleRot:['violentMedical','violentMedical','decayedBodyPartOperation',
	'violentMedicalLong','violentMedicalLong','decayedBodyPartOperation',
	'violentMedical','verbAgent','verbAgent','verbAgent','decayedPartOfTheAgent'],
	verbAgent:['decayedBodyPartOperation','decayedBodyPartOperation',
	'decayedBodyPartOperation','decayedBodyPartOperation','violentMedical'
	,'violentMedical','doubleRot','doubleRot'],
	violentMedicalLong:['decayedPartOfTheAgent','decayedPartOfTheAgent',
	'decayedBodyPartOperation','decayedBodyPartOperation','doubleRot','doubleRot','verbAgent'],
	decayedPartOfTheAgent:['verbAgent','verbAgent','violentMedicalLong','violentMedicalLong',
	'violentMedical','doubleRot','decayedBodyPartOperation']
}

function postMessage(message){
	client.post('statuses/update',
		{
			status:message+' #DeathMetalSongTitles'
		},function(error,tweet,response){
			if(error){
				console.log(error)
				console.log(tweet)
			}	
		})
}

function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function createSongTitle(){
	//Fill the template
	let title = templates[lastTemplate]()
	//Tweet it
	postMessage(title)
	//Pick a Template
	lastTemplate = pickRandom(markovChain[lastTemplate])
}
createSongTitle();
setInterval(function(){ createSongTitle()},1000*60*60)


app.listen(process.env.PORT || 4000,()=>{
	console.log('Working')
})