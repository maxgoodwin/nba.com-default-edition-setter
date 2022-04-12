const removeSportingnewsNbaCookieDetails = {
	url: "https://www.sportingnews.com/",
	name: "edition"
};

const removeNbaCookieDetails = {
	url: "https://www.nba.com/",
	name: "gr"
};

const resetButton = document.getElementById("reset-button");
const activeContainerText = document.getElementById("active-container-text");
const activeCheckbox = document.getElementById("extension-active");

chrome.storage.local.get(["isExtensionActive"], (result) => {
	activeContainerText.innerText = result.isExtensionActive ? "On" : "Off";
	activeCheckbox.checked = result.isExtensionActive;
});

const setToggleState = (state) => {
	chrome.storage.local.set({
		isExtensionActive: state
	});
};

const reset = () => {
	chrome.cookies.remove(removeSportingnewsNbaCookieDetails);
	chrome.cookies.remove(removeNbaCookieDetails);
};

resetButton.addEventListener("click", reset, false);
activeCheckbox.addEventListener(
	"change",
	() => {
		activeContainerText.innerText = activeCheckbox.checked ? "On" : "Off";
		setToggleState(activeCheckbox.checked);
	},
	false
);
