let darkModeActive = false;
const toggleElement = document.querySelector(".toggle--checkbox");
// toggleElement.checked = true;

// alert("dark mode active? " + darkModeActive);



// When the button is clicked, inject togglePageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    // togglePageBackgroundColor(); // for button
    
    // count = count + 1;
    // alert(count);
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: togglePageBackgroundColor,
    });
});
  
  // The body of this function will be executed as a content script inside the
  // current page
  function togglePageBackgroundColor() {
    this.darkModeActive = !this.darkModeActive;
    document.body.style.filter = darkModeActive ? "invert(1)" : "invert(0)";
    document.body.style.backgroundColor = darkModeActive ? "black" : "white";

    // toggle button color
    // toggleElement = document.querySelector(".toggle--checkbox");
    // toggleElement.checked = this.darkModeActive;
  }


  // function toggleButtonColor() {

  // }