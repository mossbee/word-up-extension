chrome.contextMenus.create({
    title: "Save",
    contexts: ["selection"],
    onclick: function(info) {
        let word = info.selectionText;
        chrome.storage.local.get({words: []}, function(result) {
            let words = result.words;
            words.push(word);
            chrome.storage.local.set({words: words});
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'export') {
        chrome.storage.local.get({words: []}, function(result) {
            let words = result.words;
            let blob = new Blob([words.join(',')], {type: 'text/plain'});
            let url = URL.createObjectURL(blob);
            chrome.downloads.download({url: url, filename: 'vocabulary.txt'});
            chrome.storage.local.set({words: []}); // clear saved words
        });
    }
});
