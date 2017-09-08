'use strict';

/* 
Get the unique extension key,
if it doesn't exist, return 0
*/
function getUniqueKey(){
	let key;

	// key = chrome.storage.sync.get('key', () => {

	// 	});

	return 1;
}

function Domain(domain){
	this.domain = domain;
	this.openTime = d.getTime();

	this.defineProperty(this, "openTime", {
		get : () => this.openTime,
		enumerable : false,
		configurable : false});

	this.defineProperty(this, "closedTime", {
		set : (newVal) => this._closedTime_ = newVal ,
		get : () => this._closedTime_,
		enumerable : false,
		configurable : false});

}

function TabLife(tabId){
	this.domainsVisited = [];
	this.closedTime = 0;
	this.id = tabId;

	Object.defineProperty(this,'openTime', {
		value: d.getTime(),
		writable: false,
		configurable: true,
		enumerable: false
	});

	Object.defineProperty(this,"id", {
		get : () => this._id_ ,
		set : (newVal) => {this._id_ = newVal},
	});
	this.id = tabId;

	// TODO : create a unique tab id and move all of this in a function
	this.refId = 1;
	Object.defineProperty(this,'refId', {
		writable: false,
		configurable: true,
		enumerable: true
	});

	this.send = () => {
		return {
			status: 'error'
		};
	};

	this.change = () => {
		if(this.domainsVisited.length === 0){
			let domain = getDomainFromURL();
			this.domainsVisited.push(new Domain(domain));
		}
	};

}

/* 
Create the extension unique key and stores it
*/
function getAUniqueKey(){
	let key = 1;
	chrome.storage.sync.set({'key': key}, () => {

		});
}

function getDomainFromURL(url){
	return domain;
}

// Store all the tabs currently opened
let tabArray = [];
let d = new Date();

/*
Create an instance of the TabLife object
*/
function storeTab(tab){
	let tabId = tab.id;
	console.log(tabId);
	tabArray.push(new TabLife(tabId));
	console.log(tabArray);
}

function endTabLife(tabId) {
	let tab = tabArray.find(item => item.id === tabId);
	let tabIndex = tabArray.findIndex(item => item.id === tabId);
	tab.closedTime = d.getTime();
	let response = tab.send();

	if(response.status === 'error'){
		console.log('the closed tab was not successfully sent to mortrevere');
	} else if (response.status === 'success') {
		console.log('what do you know ? It worked !!');
	}

	tabArray.splice(tabIndex,1);
	console.log('has been spliced, examining : ');
	console.log(tabArray);
}


/* This event is fired when a tab is updated
/  For instance when a preloaded tab replace an existent tab
/  This way we can keep the proper reference for this tab
*/ 
function updateTabId(tabDetails){
	console.log('updating tab');
	console.log(tabDetails);
	let tab = tabArray.find(item => item.id === tabDetails.replacedTabId);
	if(tab !== undefined){
		tab.id = tabDetails.tabId;
	} else {
		console.log('a tab was updated and no corresponding original tab was found');
	}
}

let uniqueKey = getUniqueKey();

if(uniqueKey === 0){
	uniqueKey = getAUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);
chrome.tabs.onRemoved.addListener(endTabLife);
chrome.webNavigation.onTabReplaced.addListener(updateTabId);


