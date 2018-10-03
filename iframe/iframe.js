(function() {
    var cookieName = 'iframeCookie';

    function getCookie() {
        return Cookies.get(cookieName);
    }

    function receiveMessage (evt) {
        //Two steps of verification: the source of the message and the request
        console.log('iframe: Received message. Evaluating origin.', evt);

        //Authorize the caller with the (internal/shielded-from-the-public-eye) authorization service.
        return $.post('http://postmessage-iframe.com:40002/authorizesource', {source: evt.origin}).then(
            (authorized) => {
                console.log('iframe: Response from authorization service:', authorized);

                if (!authorized) {
                    console.warn('iframe: Invalid origin! Not processing message from ' + evt.origin + '!');
                    return;
                } else {
                    console.log('iframe: Valid origin. Proceeding with message digest.');

                    if (evt.data === 'sendCookie') {
                        console.log('iframe: Sending cookie.');

                        //Reply to source/origin: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Example
                        evt.source.postMessage({cookie: getCookie()}, evt.origin);
                    }
                }
            }, (error) => {
                console.error('iframe: Error with the authorization service. Not processing message from ' + evt.origin + '!');
                console.error(error);
            }
        );
    }

    $(function() {
        //The cookie would already exist. This next line of code only exists for this POC.
        Cookies.set(cookieName, new Date().toISOString());

        //Set up the (post)message listener.
        window.addEventListener('message', receiveMessage, false);
    })
})();
