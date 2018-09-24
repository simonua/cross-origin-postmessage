(function() {
    var postMessageOrigin = 'http://postmessage-iframe.com:40001',
        postMessageSender = 'http://postmessage-host.com:40000',
        postMessageTarget = 'http://postmessage-iframe.com:40001';

    function postMessage(data) {
        $('#cookie-iframe')[0].contentWindow.postMessage(data, postMessageTarget);
    }

    function receiveMessage (evt) {
        console.log('Host received message. Evaluating origin.', evt);

        //Verify that we allow receiving of messages from the origin.
        if (evt.origin !== postMessageOrigin) {
            console.warn('Invalid origin! Not processing message!');
            return;
        } else {
            console.log('Valid origin. Proceeding with message digest.', evt);
            console.log('Message data received:', evt.data);
            $('div#log').append('<p>Cookie value: ' + evt.data.cookie + '</p>');
        }
    }

    $(function() {
        $('input#btnGetCookie').click(function () {
            postMessage('sendCookie');
        });

        window.addEventListener('message', receiveMessage, false);
    });
})();
