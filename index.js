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

//Super important helper function
function pickRandom(array){
	return array[Math.floor(Math.random()*array.length)]
}

//Template function definitions don't use parameters in order to maximize fungibility
var templates = {
	violentMedical:function(){
		//Example: Intense Exhumation
		return pickRandom(resources.d.violentAdverbs)+' '+pickRandom(resources.d.medicalTerms)
	},
	decayedBodyPartOperation:function(){
		//Example: Twisted Bronchial Obstruction
		return pickRandom(resources.d.statesOfDecay)+' '+pickRandom(resources.d.medicalBodyParts)+' '+pickRandom(resources.d.medicalTerms)
	},
	doubleRot:function(){
		//Example: 
		//The terms should be different
		let stateA = pickRandom(resources.d.statesOfDecay)
		let stateB = pickRandom(resources.d.statesOfDecay)
		while (stateA === stateB){
			stateB = pickRandom(resources.d.statesOfDecay)
		}
		return stateA+' and '+stateB
	},
	verbAgent:function(){
		//Example: Decimated by Undead Hordes
		return pickRandom(resources.d.pastTenseVerbs)+' by '+pickRandom(resources.d.agents)
	},
	actionsOfTheAdjective:function(){
		//Example: Corruption of the Bloated
		return pickRandom(resources.d.metalSoundingVerbs)+ ' of the '+pickRandom(resources.d.adjectives)
	},
	decayedPartOfTheAgent:function(){
		//Exmaple: Fetid Blood of the Undead Hordes
		return pickRandom(resources.d.statesOfDecay)+' '+pickRandom(resources.d.pluralBodyParts)+' of the '+pickRandom(resources.d.agents)
	},
	violentMedicalLong:function(){
		//Example: Compulsive Lobotomy of the Rotten
		return pickRandom(resources.d.violentAdverbs)+' '+pickRandom(resources.d.medicalTerms)+' of the '+pickRandom(resources.d.adjectives)
	},
	tripleCombo:function(){
		//Example: Horrific Obsessive Strangulation
		return pickRandom(resources.d.shockBois)+' '+pickRandom(resources.d.violentAdverbs)+' '+pickRandom(resources.d.metalSoundingVerbs)
	},
	decayedDisaster:function(){
		//Example: Rotted Eruption
		return pickRandom(resources.d.statesOfDecay)+' '+pickRandom(resources.d.naturalDisasters)
	},
	agentsOfDisaster:function(){
		//Example: Avalanche of Worms
		return pickRandom(resources.d.naturalDisasters)+' of '+pickRandom(resources.d.agents)
	},
	toolTime:function(){
		//Example: Devoured by the Icepick
		return pickRandom(resources.d.pastTenseVerbs)+' by the '+pickRandom(resources.d.tools)
	},
	toolAssistance:function(){
		//Example: Bandsaw-aided Tracheal Vivisection
		return pickRandom(resources.d.tools)+'-aided '+pickRandom(resources.d.medicalBodyParts)+' '+pickRandom(resources.d.medicalTerms)
	},
	violentPolitics:function(){
		//Example: Demented Autocracy of the Dead
		return pickRandom(resources.d.violentAdverbs)+' '+pickRandom(resources.d.political)+' of the '+pickRandom(resources.d.adjectives) 
	},
	visceraLocation:function(){
		//Example: Bog of Eyes
		return pickRandom(resources.d.locations)+' of '+pickRandom(resources.d.pluralBodyParts)
	},
	metalBuildings:function(){
		//Example: Pinnacle of Splayed Worms
		return pickRandom(resources.d.buildings)+' of '+pickRandom(resources.d.statesOfDecay)+' '+pickRandom(resources.d.agents)
	},
	villain:function(){
		//Example: Tyrant of the Wailing Bastion
		return pickRandom(resources.d.titles)+' of the '+pickRandom(resources.d.wildCardAdjectives)+' '+pickRandom(resources.d.buildings)
	},
	politicalImagery:function(){
		//Example: Coercion in the Darksome Gate of the Tortured
		return pickRandom(resources.d.political)+' in the '+pickRandom(resources.d.wildCardAdjectives)+' '+pickRandom(resources.d.buildings)+' of the '+pickRandom(resources.d.adjectives)
	},
	simpleVillain:function(){
		//Example: Soul Tyrant
		return pickRandom(resources.d.singularBodyParts)+' '+pickRandom(resources.d.titles)
	},
	metalLocation:function(){
		//Example: Swamp of Perfidy
		return pickRandom(resources.d.locations)+' of '+pickRandom(resources.d.metalSoundingVerbs)
	},
	rebel:function(){
		//Example: Overthrow the Tyrant!
		return pickRandom(resources.d.order)+' the '+pickRandom(resources.d.titles)+'!';
	},
	badMagic:function(){
		//Example: Grotesque Witchcraft
		return pickRandom(resources.d.statesOfDecay)+' '+pickRandom(resources.d.magic);
	},
	radMagic:function(){
		//Example: Chant of Desecration
		return pickRandom(resources.d.magic)+' of '+pickRandom(resources.d.metalSoundingVerbs);
	},
	adjFear:function(){
		//Example: Somber Horror
		return pickRandom(resources.d.wildCardAdjectives)+' '+pickRandom(resources.d.fears)
	},
	vagueViolence:function(){
		//Example: Overtones of Profanation
		return pickRandom(resources.d.vagueness)+' of '+pickRandom(resources.d.metalSoundingVerbs)
	},
	malignantDecay:function(){
		//Example: Malignant Decay, duh
		return pickRandom(resources.d.evilAdjective)+' '+pickRandom(resources.d.actualDecay)
	},
	magicRuler:function(){
		//Example: Chant of the Malevolent Impaler
		return pickRandom(resources.d.magic)+' of the '+pickRandom(resources.d.evilAdjective) +' '+pickRandom(resources.d.titles)
	},
	wastingBody:function(){
		//Example: Plague of the Spirit
		return pickRandom(resources.d.actualDecay)+' of the '+pickRandom(resources.d.singularBodyParts)
	}
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
	let resource_keys = Object.keys(resources.d)
	let terms = 0;
	let version = '2.1.8' // This is super loose and doesn't follow any kind of conventions
	//Count the total number of terms used in every dictionary in resources
	resource_keys.forEach((key)=>{
		terms += resources.d[key].length
	})
	let message = 'Update to v'+version+' - handling '+Object.keys(templates).length+' templates and '+terms+' terms'
	if (process.env.ENV === 'dev'){
		//in dev we don't post publicly
		console.log(message)
	}  else if (process.env.ENV === 'prd'){
		postMessage(message)
	}
}

function createSongTitle(){
	//Fill the template
	let title = templates[lastTemplate]()
	if (process.env.ENV === 'dev'){
		//Log the message and the template it came from for analysis
		console.log(lastTemplate+': '+title)
	} else if(process.env.ENV === 'prd'){
		//Tweet it
		postMessage(title)
	}
	//Pick a new Template
	let templateOptions = [];
	let t = Object.keys(resources.mc[lastTemplate])
	for (let i = 0; i < t.length; i++){
		for (let j = 0; j < resources.mc[lastTemplate][t[i]]; j++){
			templateOptions.push(t[i])
		}
	}
	//Uncomment the next line for option monitoring
	// console.log(templateOptions)
	lastTemplate = pickRandom(templateOptions)
}

function setup(){
	//Set up the initial parameters
	let ts = Object.keys(templates)
	lastTemplate = pickRandom(ts)
}

//Main code execution
var lastTemplate = '';
setup()
updateMessage();
if (process.env.ENV === 'prd'){
	//We publish tweets every hour
	setInterval(function(){ createSongTitle()},1000*60*60)
} else if (process.env.ENV === 'dev'){
	//In DEV we want to monitor lots of combinations, so log quickly.
	setInterval(function(){ createSongTitle()},500)
}


//Basic server to keep process running in Cloud Foundry
app.listen(process.env.PORT || 4000,()=>{
	console.log('Working')
})