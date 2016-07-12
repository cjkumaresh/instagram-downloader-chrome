// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    // First, validate the message's structure
    var instagramImageClassName = '._icyx7',
        instagramVideoClassName = '._c8hkj',
        urls = [];
    if (msg.from === 'popup') {
        if (msg.subject === 'instagramImages') {
            if (document.querySelectorAll('._n3cp9 ._icyx7').length === 1) {
                instagramImageClassName = '._n3cp9 ' + instagramImageClassName;
            }
            Array.prototype.forEach.call(document.querySelectorAll(instagramImageClassName), function(el, i) {
                var url = el.getAttribute('src');
                // Convert the image (640x640/750x750) url into full resolution images url
                url = url.split('/').filter((val, index) => {
                    if (val.indexOf('c') === 0 || val === 'sh0.08' || val === 's640x640' || val === 's750x750')
                        return false;
                    else
                        return true;
                }).join('/');
                urls.push(url);
            });
        } else {
            Array.prototype.forEach.call(document.querySelectorAll(instagramVideoClassName), (el, i) => {
                var url = el.getAttribute('src');
                urls.push(url);
            });
        }
        response(urls);
    }
});
