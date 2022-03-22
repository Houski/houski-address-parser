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

You can _APPEND_ overiding suffixes to the default suffix set by passing in an array with this structure, and calling the function as shown.

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

houskiAddressParser(
  "7333 37 AV NW t2c3n4 51st street Ottawa-Gatineau, Ontario, canada",
  overrides,
  true // THIS TRUE PARAMETER IS NEEDED TO APPEND EXTRA SUFFIXES INSTEAD OF ENTIRELY REPLACING THEM.
);
```

You can _REPLACE_ the entire default suffix set by passing in an array (as shown above) and then calling the function as shown:

```js
houskiAddressParser(
  "7333 37 AV NW t2c3n4 51st street Ottawa-Gatineau, Ontario, canada",
  overrides
);
```

Check the package's index.test.js file for more examples.
