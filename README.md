# Cross-Origin PostMessage

This is an example of cross-origin postmessaging with a double whitelist to protect both sender and receiver of the message. Both side only explicitly 
accepts messages from a known sender. The example details obtaining a cookie from another domain.

This example can be entirely run on different localhost ports as well. Using different DNS entries in the hosts file here just illustrates the concept across domains 
a bit more clearly.

Ordinarily, this would use https but I did not want to make this more difficult by adding certs, etc. 

## Browser Support
1. Chrome - Works
1. Firefox - Works
1. Internet Explorer - Works if the iframe is referenced on localhost, not postmessage-iframe.com.

## Setup
1. Add these hosts file entries. In Windows, they go into c:\windows\sytem32\drivers\etc\hosts, for example:
    ```    
    127.0.0.1	postmessage-host.com
    127.0.0.1 	postmessage-iframe.com
    ```
1. Run `npm i`.
1. Run `npm run start-iframe`.
1. Open a second console in the same directory.
1. Run `npm run start-host`. 
    * The browser should have opened automatically. If it did not, open browser tab with URL `http://postmessage-host.com:40000` to launch the host.
1. Press the `Get Cookie` button. You should see a date/time appear on the screen, which is the value read out from a cookie that belongs to the iframe.

## Links
1. [MDN postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
1. [JavaScript Cookie](https://github.com/js-cookie/js-cookie/tree/latest#readme)
