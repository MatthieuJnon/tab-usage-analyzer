'use strict';

/* 
Get the unique extension key,
if it doesnt exist, return 0
*/

function getUniqueKey() {
	var key = void 0;

	// key = chrome.storage.sync.get('key', () => {

	// 	});

	return 1;
}

function tabLife(tabId) {
	this.d = new Date();

	Object.defineProperty(this, 'openTIme', {
		value: this.d.getTime(),
		writable: false,
		configurable: true,
		enumerable: false
	});
	Object.defineProperty(this, 'id', {
		value: tabId,
		writable: false,
		configurable: true,
		enumerable: true
	});

	this.setclosedTime = function () {
		this.closedTime = this.d.getTime();
	};

	this.send = function () {
		var response = {
			status: 'error'
		};

		return response;
	};
}

function newDomainList() {

	var API = {};

	return API;
}

/* 
Create the extension unique key and stores it
*/
function createUniqueKey() {
	var key = 1;
	chrome.storage.sync.set({ 'key': key }, function () {});
}

// Store all the tabs currently opened
var tabArray = [];

/*
Create an instance of the TabLife object
*/
function storeTab(tab) {
	var tabId = tab.id;
	tabArray.push(new tabLife(tabId));
	console.log(tabId);
}

function endTabLife(tabId) {
	console.log(tabId);
	console.log(tabArray);
	var tab = tabArray.find(function (item) {
		return item.id == tabId;
	});
	tab.setclosedTime();
	var response = tab.send();

	if (response.status == 'error') {
		console.log('the closed tab was not succesfully sent to mortrevere');
	}
}

var uniqueKey = getUniqueKey();

if (uniqueKey === 0) {
	uniqueKey = createUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);
chrome.tabs.onRemoved.addListener(endTabLife);