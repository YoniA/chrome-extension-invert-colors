// page state
let darkModeActive = false;

// constants
const TOGGLE_KEY = "i";
const toggleButton = document.querySelector("#toggle-button");


// When the button is clicked, inject togglePageBackgroundColor into current page
toggleButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePageBackgroundColor
    });
});


document.addEventListener("keyup", (event) => toggleFromKeyboard(event));
  
  function togglePageBackgroundColor() {
    this.darkModeActive = !this.darkModeActive;
    document.body.style.filter = darkModeActive ? "invert(1)" : "invert(0)";
    document.body.style.backgroundColor = darkModeActive ? "black" : "white";
  }

  // activate toggle button without mouse
  async function toggleFromKeyboard(event) {
    if (event.key === TOGGLE_KEY) {
      toggleButton.checked = true;
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: togglePageBackgroundColor
      });
    }
  }

  