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
    short: "7333 37 Ave NW 51st St",
  }
```

You can overide the abbreviations by passing in an array with this structure:

```js
const overrides = [
  {
    long: "PARK",
    abbrs: ["PARK", "PRK", "PA"],
    short: "PA",
  },
  {
    long: "TERRACE",
    abbrs: ["TERRACE", "TC"],
    short: "TC",
  },
  {
    long: "MEWS",
    abbrs: ["MEWS", "ME"],
    short: "ME",
  },
];

// and then calling the address parser like so:

houskiAddressParser(
  "7333 37 AV NW t2c3n4 51st street Ottawa-Gatineau, Ontario, canada",
  overrides
);
```

Check the package's index.test.js file for more examples.
