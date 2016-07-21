
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {

    var pat = "nytimes";
    if (changeInfo.url.search(pat) != -1) {
      var createData = {url: changeInfo.url, incognito: true};
      chrome.windows.create(createData, function() {
        console.log("Created new window!");
      });
    }
  }
});

