console.log('content 1');
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);

chrome.storage.onChanged.addListener(
  function(e) {
    console.log('onChanged', e);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const id = tabs[0].id;
      chrome.tabs.sendMessage(id, {greeting: "hello"}, function(response) {
        console.log(response);
      });
    });
  }
);