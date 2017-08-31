"use strict";

/* 
Get the unique extension key,
if it doesnt exist, return 0
*/
function getUniqueKey(){
	let key;

	key = chrome.storage.sync.get('key');
}

/* 
Create the extension unique key and stores it
*/
function createUniqueKey(){
	let key = 1;

	chrome.storage.sync.set({'key': key}, () => {

		});
}

/*
Create an instance of the TabLife object
*/
function storeTab(){
	
}

class TabLife {
	
	constructor(lifeStart) {
		this.openedTime = lifeStart;
	}

}

let uniqueKey = getUniqueKey();

if(uniqueKey === 0){
	uniqueKey = createUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);

