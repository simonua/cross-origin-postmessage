(function() {
    var postMessageOrigin = postMessageTarget = 'http://postmessage-iframe.com:40001';

    function postMessage(msgType) {
        $('#cookie-iframe')[0].contentWindow.postMessage({messageType: msgType}, postMessageTarget);
    }

    function receiveMessage (evt) {
        console.log('host: Received message. Evaluating origin.', evt);

        //Verify that we allow receiving of messages from the origin.
        if (evt.origin !== postMessageOrigin) {
            console.warn('host: Invalid origin! Not processing message!');
            return;
        } else {
            console.log('host: Valid origin. Proceeding with message digest.');

            //Look for specific message type(s).
            if (evt.data.messageType === 'sendCookie') {
                console.log(`host: 'sendCookie' message. Receiving cookie now.`);
                $('div#log').append('<p>Cookie value: ' + evt.data.cookie + '</p>');
            } else {
                console.warn('host: Improper message type', evt.data);
            }
        }
    }

    $(function() {
        $('input#btnGetCookie').click(function () {
            postMessage('sendCookie');
        });

        window.addEventListener('message', receiveMessage, false);
    });
})();
