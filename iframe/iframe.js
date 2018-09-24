var postMessageOrigin = 'http://postmessage-host.com:40000',
    postMessageSender = 'http://postmessage-iframe.com:40001',
    postMessageTarget = 'http://postmessage-host.com:40000';

var cookieName = 'manualCookie';

function getCookie() {
    return Cookies.get(cookieName);
}

function setCookie() {
    Cookies.set(cookieName, new Date().toISOString());
}

function receiveMessage (evt) {
    console.log('iframe received message. Evaluating origin.', evt);

    if (evt.origin !== postMessageOrigin) {
        console.warn('Invalid origin! Not processing message from ' + postMessageOrigin + '!');
        return;
    } else {
        console.log('Valid origin. Proceeding with message digest.');

        if (evt.data === 'sendCookie') {
            console.log('Message is to send cookie. Sending cookie now.');

            postMessage({cookie: getCookie()});
        }
    }
}

function postMessage (data) {
    //Only sending to parent of the iframe.
    window.parent.postMessage(data, postMessageTarget);
}

$(function() {
    setCookie();

    //Set up postmessage.
    window.addEventListener('message', receiveMessage, false);
})
