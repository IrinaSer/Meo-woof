chrome.runtime.onInstalled.addListener( () => {
  chrome.tabs.create({url:'index.html'},function(){});
});

chrome.storage.onChanged.addListener(
  function(e) {
    console.log('onChanged', e);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const id: number = tabs[0].id as number;
      chrome.tabs.sendMessage(id, {greeting: "hello"}, function(response) {
        console.log(response);
      });
    });
  }
);