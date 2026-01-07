const checkbox = document.getElementById("skipAds");

// Load saved settings, default is false
browser.storage.local.get({ skipAds: true }).then((result) => {
    checkbox.checked = result.skipAds;
});

checkbox.addEventListener("change", () => {
    browser.storage.local.set({
        skipAds: checkbox.checked
    });
});
