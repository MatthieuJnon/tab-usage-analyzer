"use strict";

function getNumberOfTabs(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {

    var numberOFTabs = tabs.length;

    callback(numberOFTabs);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function () {
  getNumberOfTabs(function (numberOFTabs) {
    var message = "You have " + numberOFTabs + " tabs opened in your current window.";

    renderStatus(message);
  });
});