(function() {
    var postMessageOrigin = postMessageTarget = 'http://postmessage-iframe.com:40001';

    function postMessage(data) {
        $('#cookie-iframe')[0].contentWindow.postMessage(data, postMessageTarget);
    }

    function receiveMessage (evt) {
        console.log('host: Received message. Evaluating origin.', evt);

        //Verify that we allow receiving of messages from the origin.
        if (evt.origin !== postMessageOrigin) {
            console.warn('host: Invalid origin! Not processing message!');
            return;
        } else {
            console.log('host: Valid origin. Proceeding with message digest.');
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
