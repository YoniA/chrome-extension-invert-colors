chrome.runtime.onInstalled.addListener(setInitialState);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "setState") {
      console.log(message);
      const state = message.darkModeActive;
      // Store data in chrome.storage.local
      chrome.storage.local.set({ "darkModeActive": state }, function () {
        console.log("Data set in storage:", state);
      });
    } else if (message.action === "getState") {
      // Retrieve data from chrome.storage.local
      chrome.storage.local.get("darkModeActive", function (result) {
        console.log("Data retrieved from storage:", result.darkModeActive);
        sendResponse({ result }); // Send data back to popup
      });
      return true; // To indicate that the response will be sent asynchronously
    }
  });


function setInitialState() {
  chrome.storage.local.set({ "darkModeActive": "false" }, function () {
    console.log("Set initial state in storage:", "false");
  });
}


// page change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(JSON.stringify(changeInfo));
});