# houski-address-parser

This package standardizes Canadian postal addresses.

Does it work for all of them? Probably not. Does it work for most of them? ... probably. 🤷

## How to install

In your node project:

`const houskiAddressParser = require("houski-address-parser");`

`import houskiAddressParser from "houski-address-parser"`

## How to use

Simply run the function on an address string:

`houskiAddressParser("7333 37 AV NW t2c3n4 51st street Ottawa-Gatineau, Ontario, canada")`

That should give the resulting object of:

```js
{
    city: "Ottawa-Gatineau",
    full: "7333 37 Avenue NW 51st Street Ottawa-Gatineau Ontario",
    fullWithCountry:
      "7333 37 Avenue NW 51st Street Ottawa-Gatineau Ontario Canada",
    key: "733337avenw51stst",
    long: "7333 37 Avenue NW 51st Street",
    postalCode: "T2C3N4",
    province: "Ontario",
    short: "7333 37 AVE NW 51st ST",
  }
```

Check the package's index.test.js file for more examples.
