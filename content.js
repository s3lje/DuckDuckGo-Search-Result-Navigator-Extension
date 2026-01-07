const style = document.createElement("style");
style.textContent = `
.react-results--main li[tabindex="0"]:focus-visible {
    outline: none;
    border-radius: 10px;
    background: linear-gradient(
        90deg,
        rgba(0, 120, 212, 0.12),
        rgba(0, 120, 212, 0.04)
    );
    box-shadow:
        0 0 0 2px rgba(0, 120, 212, 0.6),
        0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
    transition: background 0.15s ease, box-shadow 0.15s ease;
}

.react-results--main li[tabindex="0"] {
    transition: transform 0.12s ease;
}
`;
document.head.appendChild(style);

let skipAds = true;

// Load settings
browser.storage.local.get({ skipAds: true }).then((result) => {
    skipAds = result.skipAds;
});

// React to live popup changes
browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.skipAds) {
        skipAds = changes.skipAds.newValue;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key !== "Tab") return;

    let resultItems = getResultItems(skipAds);
    if (!resultItems.length) return;

    // Make <li> focusable (required for Firefox)
    resultItems.forEach(item => {
        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
    });

    let activeElement = document.activeElement;
    let currentIndex = resultItems.indexOf(activeElement);

    // If nothing is focused yet, focus the first result
    if (currentIndex === -1) {
        resultItems[0].focus();
        event.preventDefault();
        return;
    }

    let nextIndex = currentIndex + (event.shiftKey ? -1 : 1);

    if (nextIndex >= 0 && nextIndex < resultItems.length) {
        resultItems[nextIndex].focus();
        event.preventDefault();
    }

});

function getResultItems(skipAds) {
    const allItems = Array.from(
        document.querySelectorAll('.react-results--main li')
    );

    if (!skipAds) return allItems;

    // Duck Duck Go saves whether its a ad or not in the
    // dataset layout, so here we only return the non ad results
    return allItems.filter(item =>
        item.dataset.layout === "organic"
    );
}

