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
	actionsOfTheAdjective:function(){
		return pickRandom(resources.metalSoundingVerbs)+ ' of the '+pickRandom(resources.adjectives)
	},
	decayedPartOfTheAgent:function(){
		return pickRandom(resources.statesOfDecay)+' '+pickRandom(resources.pluralBodyParts)+' of the '+pickRandom(resources.agents)
	},
	violentMedicalLong:function(){
		return pickRandom(resources.violentAdverbs)+' '+pickRandom(resources.medicalTerms)+' of the '+pickRandom(resources.adjectives)
	},
	medicalDisaster:function(){
		return pickRandom(resources.medicalTerms)+' '+pickRandom(resources.naturalDisasters)
	},
	decayedDisaster:function(){
		return pickRandom(resources.statesOfDecay)+' '+pickRandom(resources.naturalDisasters)
	},
	agentsOfDisaster:function(){
		return pickRandom(resources.naturalDisasters)+' of '+pickRandom(resources.agents)
	},
	toolTime:function(){
		return pickRandom(resources.pastTenseVerbs)+' by the '+pickRandom(resources.tools)
	},
	toolAssistance:function(){
		return pickRandom(resources.tools)+'-aided '+pickRandom(resources.medicalTerms)
	}
}

var lastTemplate = 'violentMedical';
var markovChain = {
	violentMedical:['decayedBodyPartOperation','medicalDisaster','actionsOfTheAdjective','agentsOfDisaster',
	'decayedBodyPartOperation','decayedDisaster','toolTime','doubleRot','verbAgent','decayedPartOfTheAgent','toolAssistance'],
	decayedBodyPartOperation:['doubleRot','violentMedicalLong','doubleRot','violentMedical','actionsOfTheAdjective',
	'agentsOfDisaster','violentMedical','medicalDisaster','verbAgent','violentMedicalLong','decayedDisaster','toolAssistance',
	'toolTime','toolTime','toolTime'],
	doubleRot:['violentMedical','medicalDisaster','decayedBodyPartOperation','actionsOfTheAdjective',
	'violentMedicalLong','violentMedicalLong','toolAssistance','decayedBodyPartOperation','agentsOfDisaster','toolTime',
	'violentMedical','verbAgent','toolTime','decayedDisaster','verbAgent','decayedPartOfTheAgent'],
	verbAgent:['medicalDisaster','toolTime','decayedBodyPartOperation','actionsOfTheAdjective','toolAssistance','toolAssistance',
	'agentsOfDisaster','decayedBodyPartOperation','violentMedical','decayedDisaster','toolAssistance','violentMedical','doubleRot','doubleRot','toolTime'],
	violentMedicalLong:['medicalDisaster','toolTime','decayedPartOfTheAgent','actionsOfTheAdjective','actionsOfTheAdjective','agentsOfDisaster',
	'decayedBodyPartOperation','toolAssistance','toolAssistance','decayedBodyPartOperation','decayedDisaster','doubleRot','verbAgent'],
	decayedPartOfTheAgent:['verbAgent','verbAgent','agentsOfDisaster','violentMedicalLong','medicalDisaster','toolAssistance',
	'violentMedical','doubleRot','toolAssistance','decayedBodyPartOperation','decayedDisaster','toolTime'],
	actionsOfTheAdjective:['doubleRot','doubleRot','doubleRot','violentMedicalLong','violentMedicalLong','violentMedicalLong',
	'decayedBodyPartOperation','toolAssistance','decayedBodyPartOperation','decayedBodyPartOperation','decayedDisaster','medicalDisaster','agentsOfDisaster'],
	medicalDisaster:['violentMedical','decayedBodyPartOperation','doubleRot','verbAgent','actionsOfTheAdjective','toolAssistance',
	'decayedPartOfTheAgent','violentMedicalLong','decayedDisaster','agentsOfDisaster','toolTime'],
	decayedDisaster:['violentMedical','decayedBodyPartOperation','doubleRot','verbAgent','actionsOfTheAdjective',
	'decayedPartOfTheAgent','violentMedicalLong','medicalDisaster','agentsOfDisaster','toolTime'],
	agentsOfDisaster:['violentMedical','decayedBodyPartOperation','doubleRot','verbAgent','actionsOfTheAdjective',
	'decayedPartOfTheAgent','violentMedicalLong','medicalDisaster','decayedDisaster','toolTime','toolAssistance','toolAssistance'],
	toolTime:['violentMedical','decayedBodyPartOperation','doubleRot','verbAgent','violentMedicalLong','decayedPartOfTheAgent',
	'actionsOfTheAdjective','medicalDisaster','decayedDisaster','agentsOfDisaster','toolAssistance'],
	toolAssistance:['violentMedical','decayedBodyPartOperation','doubleRot','verbAgent','violentMedicalLong','decayedPartOfTheAgent',
	'actionsOfTheAdjective','medicalDisaster','decayedDisaster','agentsOfDisaster','toolTime']
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

function updateMessage(){
	let resource_keys = Object.keys(resources)
	let terms = 0;
	let version = '1.3.0'
	resource_keys.forEach((key)=>{
		terms += resources[key].length
	})
	let message = 'Update to v'+version+' - handling '+Object.keys(templates).length+' templates and '+terms+' terms'
	postMessage(message)
	// DEV ONLY
	// console.log(message)
}

function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

function createSongTitle(){
	//Fill the template
	let title = templates[lastTemplate]()
	//Tweet it
	postMessage(title)
	//DEV ONLY
	// console.log(title)
	//Pick a Template
	lastTemplate = pickRandom(markovChain[lastTemplate])
}
updateMessage();
setInterval(function(){ createSongTitle()},1000*60*60)

//DEV ONLY
// setInterval(function(){ createSongTitle()},1000*2)


app.listen(process.env.PORT || 4000,()=>{
	console.log('Working')
})