chrome.runtime.onInstalled.addListener( () => {
  chrome.tabs.create({url:'index.html'},function(){});
});
