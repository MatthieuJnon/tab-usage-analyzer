

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

function newTabLife(){

	let openTime;
	let closedTime;
	let domainList = newDomainList;
	let d = new Date();

	function setOpenTime(){
		openTime = d.getTime();
	}

	function setClosedTime(){
		closedTime = d.getTime();
	}

	function sendTab(){

	}

	let API = {
		setOpenTime : setOpenTime,
		setClosedTime : setClosedTime,
		sendTab : sendTab
	};

	return API;
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

/*
Create an instance of the TabLife object
*/
function storeTab(){
	
}


let uniqueKey = getUniqueKey();

if(uniqueKey === 0){
	uniqueKey = createUniqueKey();
}

chrome.tabs.onCreated.addListener(storeTab);

