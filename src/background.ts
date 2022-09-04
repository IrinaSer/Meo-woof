chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({url: 'index.html'}, function () {
  });
});

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    const id = tabs[0].id;
    if (id) {
      chrome.tabs.sendMessage(id, {msg: 'onActivated'});
    }
  });
});
