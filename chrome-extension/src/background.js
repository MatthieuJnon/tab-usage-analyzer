'use strict';

/* 
Get the unique extension key,
if it doesnt exist, return 0
*/
function getUniqueKey(){
	let key;

	// key = chrome.storage.sync.get('key', () => {

	// 	});

	return 1;
}

function tabLife(tabId){
	this.d = new Date();

	Object.defineProperty(this,'openTIme', {
		value: this.d.getTime(),
		writable: false,
		configurable: true,
		enumerable: false
	});
	Object.defineProperty(this,'id', {
		value: tabId,
		writable: false,
		configurable: true,
		enumerable: true
	});

	this.setclosedTime = function(){
		this.closedTime = this.d.getTime();
	};

	this.send = function() {
		let response = {
			status: 'error'
		};

		return response;
	};

}

function newDomainList(){

	let API = {

	};

	return API;
}


/* 
Create the extension unique key and stores it
*/
function createUniqueKey(){
	let key = 1;
	chrome.storage.sync.set({'key': key}, () => {

		});
}


// Store all the tabs currently opened
let tabArray = [];

/*
Create an instance of the TabLife object
*/
function storeTab(tab){
	let tabId = tab.id;
	tabArray.push(new tabLife(tabId));
	console.log(tabId);
}

function endTabLife(tabId) {
	console.log(tabId);
	console.log(tabArray);
	let tab = tabArray.find(item => item.id == tabId);
	tab.setclosedTime();
	let response = tab.send();

	if(response.status == 'error'){
		console.log('the closed tab was not succesfully sent to mortrevere');
	}
}


let uniqueKey = getUniqueKey();

if(uniqueKey === 0){
	uniqueKey = createUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);
chrome.tabs.onRemoved.addListener(endTabLife);

