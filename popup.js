// download function to download image/video from the url
var download = (url) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url // to convert into full resolution images
    a.download = url.split("?")[0].split("/")[url.split("?")[0].split("/").length - 1];
    a.click();
    window.URL.revokeObjectURL(url);

}


// iterate the urls and initiate download
var triggerDownload = (urls) => {
    for (var i = 0; i < urls.length; i++) {
        download(urls[i]);
    }
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function() {
    // click listener for download images button
    document.getElementById('imageDownloadBtn').addEventListener('click', function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, {
                    from: 'popup',
                    subject: 'instagramImages'
                },
                triggerDownload);
        });
    });

    // click listener for download images button
    document.getElementById('videoDownloadBtn').addEventListener('click', function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, {
                    from: 'popup',
                    subject: 'instagramVideos'
                },
                triggerDownload);
        });
    });
});
