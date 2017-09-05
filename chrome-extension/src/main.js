"use strict";

function getNumberOfTabs(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  let queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    
    let numberOFTabs = tabs.length;

    callback(numberOFTabs);
  });
}

function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  
  getNumberOfTabs( (numberOFTabs) => {
  	let message = "You have " + numberOFTabs + " tabs opened in your current window.";

  	renderStatus(message);
  	});
});