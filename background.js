let isExtensionActive = true;

chrome.storage.sync.set({
	isExtensionActive: isExtensionActive
});

const sportingnewsNbaCookieBasics = {
	url: "https://www.sportingnews.com/",
	name: "edition",
	domain: "www.sportingnews.com"
};

const nbaCookieBasics = {
	url: "https://www.nba.com/",
	name: "gr",
	domain: "www.nba.com"
};

const removeSportingnewsNbaCookieDetails = {
	url: sportingnewsNbaCookieBasics.url,
	name: sportingnewsNbaCookieBasics.name
};

const removeNbaCookieDetails = {
	url: nbaCookieBasics.url,
	name: nbaCookieBasics.name
};

chrome.storage.onChanged.addListener((changes) => {
	for (const [key, { newValue }] of Object.entries(changes)) {
		isExtensionActive = newValue;
	}
});

const getSportingNewsTabs = async () => {
	const queryOptions = { url: "*://www.sportingnews.com/au/nba*" };
	const tabs = await chrome.tabs.query(queryOptions);
	return tabs;
};

chrome.webNavigation.onCommitted.addListener(
	async (e) => {
		if (!isExtensionActive) return;

		const now = new Date();
		const cookieExpirationDate = Math.round(now.getTime() / 1000) + 365 * 24 * 60 * 60;

		const sportingnewsNbaCookie = {
			url: sportingnewsNbaCookieBasics.url,
			name: sportingnewsNbaCookieBasics.name,
			domain: sportingnewsNbaCookieBasics.domain,
			value: "us",
			expirationDate: cookieExpirationDate
		};

		const nbaCookieDetails = {
			url: nbaCookieBasics.url,
			name: nbaCookieBasics.name,
			domain: nbaCookieBasics.domain,
			value: "australiauw",
			expirationDate: cookieExpirationDate
		};

		chrome.cookies.remove(removeSportingnewsNbaCookieDetails);
		chrome.cookies.set(sportingnewsNbaCookie);

		chrome.cookies.remove(removeNbaCookieDetails);
		chrome.cookies.set(nbaCookieDetails);

		const sportingnewsTabs = await getSportingNewsTabs();
		const tabUpdateProps = {
			url: "https://www.nba.com"
		};

		sportingnewsTabs.forEach((tab) => {
			chrome.tabs.update(tab.id, tabUpdateProps);
		});
	},
	{
		url: [{ hostSuffix: "sportingnews.com", pathContains: "au/nba" }]
	}
);
