'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* 
Create the extension unique key and stores it
*/
function createUniqueKey() {
	var key = 1;

	chrome.storage.sync.set({ 'key': key }, function () {
		console.log();
	});
}

/*
Create an instance of the TabLife object
*/
function storeTab() {
	console.log('tab opened');
}

var TabLife = function TabLife(lifeStart) {
	_classCallCheck(this, TabLife);

	this.openedTime = lifeStart;
};

var uniqueKey = getUniqueKey();

if (uniqueKey === 0) {
	uniqueKey = createUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);