document.getElementById('export').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'export'});
});
