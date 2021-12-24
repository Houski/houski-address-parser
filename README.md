# houski-address-parser

This package standardizes Canadian postal addresses.

Does it work for all of them? Probably not. Does it work for most of them? ... probably. 🤷

## How to install

In your node project:

`const houskiAddressParser = require("houski-address-parser");`

`import houskiAddressParser from "houski-address-parser"`

## How to use

Simply run the function on an address string:

`houskiAddressParser("202, 1712 37 Street SE Calgary, Alberta T2A1E8")`

That should give the resulting object of:

```js
{
  city: 'CALGARY',
  full: '202 1712 37 STREET SE CALGARY ALBERTA T2A1E8',
  fullWithCountry: '202 1712 37 STREET SE CALGARY ALBERTA CANADA T2A1E8',
  long: '202 1712 37 STREET SE',
  postalCode: 'T2A1E8',
  province: 'ALBERTA',
  short: '202 1712 37 ST SE'
}
```

Check the package's index.test.js file for more examples.
