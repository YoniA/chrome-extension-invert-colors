// set initial state based on existing storage value
getState();

// constants
const TOGGLE_KEY = "i";
const toggleButton = document.querySelector("#toggle-button");

// When the button is clicked, inject togglePageBackgroundColor into current page
toggleButton.addEventListener("click", async () => {
    setState(toggleButton.checked.toString());
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePageBackgroundColor,
        args: [toggleButton.checked]
    });
});


document.addEventListener("keyup", (event) => toggleFromKeyboard(event));


function togglePageBackgroundColor(darkModeActive) {
  // this.darkModeActive = !this.darkModeActive;
  document.body.style.filter = darkModeActive ? "invert(1)" : "invert(0)";
  document.body.style.backgroundColor = darkModeActive ? "black" : "white";
}

// activate toggle button without mouse
async function toggleFromKeyboard(event) {
  if (event.key === TOGGLE_KEY) {
    toggleButton.checked = !toggleButton.checked;
    setState(toggleButton.checked.toString());
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePageBackgroundColor,
        args: [toggleButton.checked]
    });
  }
}


// background service messages

function setState(darkModeActive) {
  console.log("sending data to service");
  chrome.runtime.sendMessage({ action: "setState", darkModeActive });
}

function getState() {
  chrome.runtime.sendMessage({ action: "getState" }, async (response) => {
    const darkModeActive = response.result.darkModeActive;
    toggleButton.checked = darkModeActive === "true" ? true: false;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePageBackgroundColor,
        args: [toggleButton.checked]
    });
  });
}