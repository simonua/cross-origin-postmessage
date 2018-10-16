# Cross-Origin PostMessage

This is an example of cross-origin postmessaging with a double whitelist to protect both sender and receiver of the message. Both sides only explicitly 
accepts messages from a known sender. The example details obtaining a cookie from another domain.

This example can be entirely run on different localhost ports as well. Using different DNS entries in the hosts file here just illustrates the concept across domains 
a bit more clearly.

An authorization service used by the iframe protects the domain whitelist from the public eye. This can be written in any technology. I chose NodeJS & Express for simplicity's sake.
The service can be protected by firewalls, CORS to limit calling only to the domain that the iframe lives on, etc.

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
1. Run `npm run start-authorizeservice`.
1. Open a third console in the same directory.
1. Run `npm run start-host`. 
    * The browser should have opened automatically. If it did not, open browser tab with URL `http://postmessage-host.com:40000` to launch the host.
1. Press the `Get Cookie` button. You should see a date/time appear on the screen, which is the value read out from a cookie that belongs to the iframe.

## Payload Format
The payload of the message is as follows:

```
{
    data,
    messageType
}
```

`messageType` is a `string` with a value of `sendCookie` in our example.
`data` is variable (can be a `string` or an `object`, etc.) and contains the actual payload to be transmitted with the specified message type. By using the dedicated `data` property, we maintain a rigid format of data and metadata about the data in form of `messageType`.

Example:

```
{
    data: "2018-10-16T17:15:19.269Z",
    messageType: "sendCookie"
}
```

## Links
1. [MDN postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
1. [JavaScript Cookie](https://github.com/js-cookie/js-cookie/tree/latest#readme)
