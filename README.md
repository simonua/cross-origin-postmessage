#Cross-Origin PostMessage

This is an example of cross-origin postmessaging with double whitelist for sender and receiver. 
Ordinarily, this would use https but I did not want to make this more difficult by adding certs, etc. 

## Setup
1. Add these hosts file entries. In Windows, they go into c:\windows\sytem32\drivers\etc\hosts, for example:
    ```    
    127.0.0.1	postmessage-host.com
    127.0.0.1 	postmessage-iframe.com
    ```
1. Run `npm i`.
1. Run `npm run start-host`.
1. Open a second console in the same directory.
1. Run `npm run start-iframe`.
1. Open browser tab with URL `http://postmessage-host.com:40000` to launch the host.
1. Press the `Get Cookie` button. You should see a date/time appear on the screen, which is the value read out from a cookie that belongs to the iframe.
