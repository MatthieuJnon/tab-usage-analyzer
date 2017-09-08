'use strict';

/* 
Get the unique extension key,
if it doesn't exist, return 0
*/

function getUniqueKey() {
	var key = void 0;

	// key = chrome.storage.sync.get('key', () => {

	// 	});

	return 1;
}

function Domain(domain) {
	var _this = this;

	this.domain = domain;
	this.openTime = d.getTime();

	this.defineProperty(this, "openTime", {
		get: function get() {
			return _this.openTime;
		},
		enumerable: false,
		configurable: false });

	this.defineProperty(this, "closedTime", {
		set: function set(newVal) {
			return _this._closedTime_ = newVal;
		},
		get: function get() {
			return _this._closedTime_;
		},
		enumerable: false,
		configurable: false });
}

function TabLife(tabId) {
	var _this2 = this;

	this.domainsVisited = [];
	this.closedTime = 0;
	this.id = tabId;

	Object.defineProperty(this, 'openTime', {
		value: d.getTime(),
		writable: false,
		configurable: true,
		enumerable: false
	});

	Object.defineProperty(this, "id", {
		get: function get() {
			return _this2._id_;
		},
		set: function set(newVal) {
			_this2._id_ = newVal;
		}
	});
	this.id = tabId;

	// TODO : create a unique tab id and move all of this in a function
	this.refId = 1;
	Object.defineProperty(this, 'refId', {
		writable: false,
		configurable: true,
		enumerable: true
	});

	this.send = function () {
		return {
			status: 'error'
		};
	};

	this.change = function () {
		if (_this2.domainsVisited.length === 0) {
			var _domain = getDomainFromURL();
			_this2.domainsVisited.push(new Domain(_domain));
		}
	};
}

/* 
Create the extension unique key and stores it
*/
function getAUniqueKey() {
	var key = 1;
	chrome.storage.sync.set({ 'key': key }, function () {});
}

function getDomainFromURL(url) {

	return domain;
}

// Store all the tabs currently opened
var tabArray = [];
var d = new Date();

/*
Create an instance of the TabLife object
*/
function storeTab(tab) {
	var tabId = tab.id;
	console.log(tabId);
	tabArray.push(new TabLife(tabId));
	console.log(tabArray);
}

function endTabLife(tabId) {
	var tab = tabArray.find(function (item) {
		return item.id === tabId;
	});
	var tabIndex = tabArray.findIndex(function (item) {
		return item.id === tabId;
	});
	tab.closedTime = d.getTime();
	var response = tab.send();

	if (response.status === 'error') {
		console.log('the closed tab was not successfully sent to mortrevere');
	} else if (response.status === 'success') {
		console.log('what do you know ? It worked !!');
	}

	tabArray.splice(tabIndex, 1);
	console.log('has been spliced, examining : ');
	console.log(tabArray);
}

/* This event is fired when a tab is updated
/  For instance when a preloaded tab replace an existent tab
/  This way we can keep the proper reference for this tab
*/
function updateTabId(tabDetails) {
	console.log('updating tab');
	console.log(tabDetails);
	var tab = tabArray.find(function (item) {
		return item.id === tabDetails.replacedTabId;
	});
	if (tab !== undefined) {
		tab.id = tabDetails.tabId;
	} else {
		console.log('a tab was updated and no corresponding original tab was found');
	}
}

var uniqueKey = getUniqueKey();

if (uniqueKey === 0) {
	uniqueKey = getAUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);
chrome.tabs.onRemoved.addListener(endTabLife);
chrome.webNavigation.onTabReplaced.addListener(updateTabId);