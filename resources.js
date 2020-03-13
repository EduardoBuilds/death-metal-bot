/*
These dictionaries are the building blocks of everything.
Adding categories gives more flexibility and words can be repeated throughout 
the different categories but it's helpful if you can reuse the same category more than once.
*/
var dictionaries = {
	medicalTerms:['Excision','Surgery','Evisceration','Autopsy','Amputation','Vivisection','Obstruction','Mutilation','Trauma','Exhumation','Revascularization','Lobotomy','Ablation','Butchery','Malpractice','Dissection'],
	metalSoundingVerbs:['Desecration','Profanation','Heresy','Subjugation','Dissidence','Impalement','Betrayal','Perfidy','Dishonesty','Duplicity','Treason','Corruption','Violence','Strangulation','Asphyxiation','Brutality','Savagery','Cruelty','Slaying','Decadence','Acrimony','Rancor','Animosity','Malice','Virulence'],
	violentAdverbs:['Forceful','Violent','Frenetic','Frenzied','Insistent','Obsessive','Delirious','Rabid','Morbid','Demented','Aggressive','Intense','Compulsive','Mindless','Brutal','Savage','Cruel','Vicious','Callous','Merciless','Bestial','Vile','Inhuman'],
	shockBois:['Striking','Fascinating','Mesmerizing','Hypnotic','Overwhelming','Entrancing','Shocking','Appalling','Horrific','Atrocious','Disgraceful','Repugnant','Unspeakable','Abhorrent','Sickening','Unsettling'],
	singularBodyParts:['Brain','Blood','Soul','Spirit','Flesh','Mind','Psyche'],
	evilAdjective:['Malignant','Malevolent','Rancorous','Hostile','Malefic','Cruel','Fiendish','Foul','Ignoble','Degenerate','Sinister'],
	actualDecay:['Decay','Rot','Putrefaction','Blight','Infestation','Infection','Necrosis','Contagion','Plague','Poison'],
	fears:['Vertigo','Anxiety','Panic','Despair','Fear','Terror','Horror','Disquiet','Unease','Consternation','Hazard','Torment'],
	pluralBodyParts:['Guts','Eyes','Fangs','Bowels','Brains','Blood','Ichor','Flesh','Venom','Bile','Vomit'],
	medicalBodyParts:['Occular','Intestinal','Cardiac','Tracheal','Bronchial','Colonic','Urinary','Abdominal'],
	statesOfDecay:['Contaminated','Septic','Rotted','Fermented','Decayed','Splayed','Twisted','Necrotized','Infected','Bloated','Putrefied','Fetid','Diseased','Defiled','Blighted','Tainted','Blistered','Burst','Flatulent','Grotesque','Deformed','Distorted','Infested'],
	agents:['Vermin','Parasites','Rats','Worms','Maggots','Serpents','Leprous Crowds','Larvae','Roaches','Scorpions','Undead Hordes','Crows','Ghouls','Beasts','Carcasses','Cadavers','Corpses'],
	titles:['Crusher','Destroyer','Heretic','Ruler','Desecrator','Annihilator','Corruptor','Tyrant','Monarch','Emperor','Colossus','Defiler','Despoiler','Inquisitor','Nemesis','Impaler','Prophet','Slayer'],
	pastTenseVerbs:['Devoured','Consumed','Obsessed','Destroyed','Pulverized','Mutilated','Maimed','Massacred','Eaten','Annihilated','Crushed','Obliterated','Decimated'],
	adjectives:['Infirm','Feeble','Decapitated','Mutilated','Diseased','Corrupt','Dead','Defiled','Unwilling','Bloated','Rotten','Tortured','Unholy'],
	naturalDisasters:['Earthquake','Tornado','Hurricane','Volcano','Blizzard','Storm','Monsoon','Cataclysm','Apocalypse','Avalanche','Eruption','Tsunami','Flood','Disaster','Massacre','Infestation','Epidemic'],
	tools:['Laser','Hammer','Icepick','Vice Grip','Wrench','Jackhammer','Cleaver','Bandsaw','Chainsaw','Drill','Guillotine'],
	wildCardAdjectives:['Dark','Flaming','Somber','Dying','Wretched','Fading','Wailing','Nameless','Hideous','Blasphemous','Accursed','Loathsome','Darksome','Decadent','Eldritch','Tenebrous','Forlorn','Dread','Abysmal','Menacing'],
	locations:['Mountain','Cliff','River','Cascade','Swamp','Mire','Bog','Precipice','Mound','Ocean','Marsh','Morass','Abyss','Peak'],
	vagueness:['Air','Atmosphere','Undertones','Overtones','Undercurrent','Echo'],
	buildings:['Fortress','Tower','City','Kingdom','Necropolis','Spire','Pinnacle','Bastion','Bulwark','Gallows','Asylum','Tomb','Catacombs','Cathedral','Gate','Chamber','Prison'],
	political:['Indoctrination','Brainwashing','Propaganda','Lies','Tyranny','Dictatorship','Autocracy','Subjugation','Inquisition','Oppression','Coercion','Necromancy'],
	magic:['Sorcery','Necromancy','Witchcraft','Blasphemy','Invocations','Summoning','Covenant','Pact','Sacrilege','Sortilege','Hymn','Conjurations','Chant'],
	order:['Dethrone','Unseat','Oust','Depose','Overthrow','Dislodge','Usurp','Betray','Evict','Eat']
}

/*
The numbers in the Markov Chains indicate how often to replicate them in an array of options
So for agentsOfDisaster, the system would create this array:
[
	'violentMedical','violentMedical','decayedBodyPartOperation',
	'decayedBodyPartOperation','doubleRot','doubleRot',
	'verbAgent','actionsOfTheAdjective','actionsOfTheAdjective',
	'decayedPartOfTheAgent','violentMedicalLong','violentMedicalLong',
	'medicalDisaster','decayedDisaster','toolTime',
	'toolTime','toolAssistance','toolAssistance',
	'violentPolitics','violentPolitics','visceraLocation',
	'visceraLocation','metalBuildings','metalBuildings',
	'villain','villain','politicalImagery',
	'politicalImagery','simpleVillain','simpleVillain',
	'metalLocation','metalLocation','rebel'
	'badMagic','radMagic'
]
and then pick a random name from that array.
*/
var markovChain = {
	agentsOfDisaster:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':1,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':1,
		'agentsOfDisaster':0,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	violentMedical:{
		'violentMedical':0,'decayedBodyPartOperation':1,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':1,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':1,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':1,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	decayedBodyPartOperation:{
		'violentMedical':1,'decayedBodyPartOperation':0,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':1,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':1,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':1,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':2,'wastingBody':1
	},
	doubleRot:{
		'violentMedical':2,'decayedBodyPartOperation':1,'doubleRot':0,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':1,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':1,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':1,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':2,'wastingBody':1
	},
	verbAgent:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':0,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':1,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':1,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':1,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	violentMedicalLong:{
		'violentMedical':1,'decayedBodyPartOperation':1,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':0,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':1,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':1,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	decayedPartOfTheAgent:{
		'violentMedical':2,'decayedBodyPartOperation':1,'doubleRot':1,
		'verbAgent':1,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':0,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':1,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':1,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':2,'wastingBody':1
	},
	actionsOfTheAdjective:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':1,'actionsOfTheAdjective':0,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':1,'simpleVillain':2,'metalLocation':1,
		'rebel':2,'badMagic':2,'radMagic':1,'adjFear':2, 'tripleCombo':1,
		'vagueViolence':1,'malignantDecay':1,'magicRuler':2,'wastingBody':1
	},
	decayedDisaster:{
		'violentMedical':2,'decayedBodyPartOperation':1,'doubleRot':1,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':0,
		'agentsOfDisaster':1,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':1,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':2,'wastingBody':1
	},
	toolTime:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':1,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':0,'toolAssistance':1,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	toolAssistance:{
		'violentMedical':1,'decayedBodyPartOperation':1,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':1,'toolAssistance':0,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	violentPolitics:{
		'violentMedical':1,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':1,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':0,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':1,'simpleVillain':2,'metalLocation':2,
		'rebel':1,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':1,
		'vagueViolence':1,'malignantDecay':2,'magicRuler':1,'wastingBody':2
	},
	visceraLocation:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':1,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':0,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':1,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':1
	},
	metalBuildings:{
		'violentMedical':2,'decayedBodyPartOperation':1,'doubleRot':1,
		'verbAgent':1,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':1,
		'agentsOfDisaster':1,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':0,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':1,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':2,'wastingBody':2
	},
	villain:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':0,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':1,'badMagic':2,'radMagic':2,'adjFear':1, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':1,'wastingBody':3
	},
	politicalImagery:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':1,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':1,'politicalImagery':0,'simpleVillain':2,'metalLocation':2,
		'rebel':1,'badMagic':2,'radMagic':2,'adjFear':1, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	simpleVillain:{
		'violentMedical':2,'decayedBodyPartOperation':1,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':1,'politicalImagery':2,'simpleVillain':0,'metalLocation':2,
		'rebel':1,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':1,'wastingBody':2
	},
	metalLocation:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':1,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':1,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':0,
		'rebel':2,'badMagic':2,'radMagic':1,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	rebel:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':1,'politicalImagery':1,'simpleVillain':1,'metalLocation':2,
		'rebel':0,'badMagic':2,'radMagic':2,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':2,'wastingBody':3
	},
	badMagic:{
		'violentMedical':2,'decayedBodyPartOperation':1,'doubleRot':1,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':1,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':0,'radMagic':1,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':1,'wastingBody':2
	},
	radMagic:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':1,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':1,'metalBuildings':1,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':1,
		'rebel':2,'badMagic':1,'radMagic':0,'adjFear':2, 'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':2,'magicRuler':1,'wastingBody':2
	},
	adjFear:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':2,'visceraLocation':2,'metalBuildings':2,
		'villain':1,'politicalImagery':1,'simpleVillain':2,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':0,'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':2,'wastingBody':2
	},
	tripleCombo:{
		'violentMedical':1,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':1,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':1,
		'rebel':2,'badMagic':2,'radMagic':1,'adjFear':2,'tripleCombo':0,
		'vagueViolence':1,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	vagueViolence:{
		'violentMedical':1,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':1,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':1,
		'rebel':2,'badMagic':2,'radMagic':1,'adjFear':2,'tripleCombo':1,
		'vagueViolence':0,'malignantDecay':2,'magicRuler':2,'wastingBody':2
	},
	malignantDecay:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':1,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':1,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':2,'metalLocation':1,
		'rebel':2,'badMagic':2,'radMagic':1,'adjFear':2,'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':0,'magicRuler':1,'wastingBody':1
	},
	magicRuler:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':2,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':2,
		'violentMedicalLong':2,'decayedDisaster':2,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':1,'politicalImagery':2,'simpleVillain':1,'metalLocation':1,
		'rebel':2,'badMagic':1,'radMagic':1,'adjFear':2,'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':0,'wastingBody':1
	},
	wastingBody:{
		'violentMedical':2,'decayedBodyPartOperation':2,'doubleRot':1,
		'verbAgent':2,'actionsOfTheAdjective':2,'decayedPartOfTheAgent':1,
		'violentMedicalLong':2,'decayedDisaster':1,
		'agentsOfDisaster':2,'toolTime':2,'toolAssistance':2,
		'violentPolitics':1,'visceraLocation':2,'metalBuildings':2,
		'villain':2,'politicalImagery':2,'simpleVillain':1,'metalLocation':2,
		'rebel':2,'badMagic':2,'radMagic':2,'adjFear':2,'tripleCombo':2,
		'vagueViolence':2,'malignantDecay':1,'magicRuler':1,'wastingBody':0
	}

}



module.exports = {d:dictionaries,mc:markovChain}