const assert = require("assert");
const houskiAddressParser = require("./index.js");
const test = require("baretest")("Houski address parser");

test("Having a street with the name of a province works w/ country", async function () {
  const parsedAddress = houskiAddressParser(
    "458 Quebec Street, Calgary, Alberta, Canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "458 Quebec Street Calgary Alberta",
    fullWithCountry: "458 Quebec Street Calgary Alberta Canada",
    key: "458quebecst",
    long: "458 Quebec Street",
    postalCode: null,
    province: "Alberta",
    short: "458 Quebec St",
  });
});

test("Having a street with the name of a province works w/ out country", async function () {
  const parsedAddress = houskiAddressParser(
    "458 Quebec Street, Calgary, Alberta"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "458 Quebec Street Calgary Alberta",
    fullWithCountry: "458 Quebec Street Calgary Alberta Canada",
    key: "458quebecst",
    long: "458 Quebec Street",
    postalCode: null,
    province: "Alberta",
    short: "458 Quebec St",
  });
});

test("Having a street with the name of a city works", async function () {
  const parsedAddress = houskiAddressParser("908 Edmonton Trail");
  assert.deepEqual(parsedAddress, {
    city: null,
    full: "908 Edmonton Trail",
    fullWithCountry: "908 Edmonton Trail",
    key: "908edmontontrl",
    long: "908 Edmonton Trail",
    postalCode: null,
    province: null,
    short: "908 Edmonton Trl",
  });
});

test("Having a street with the name of a city works with the real city after it", async function () {
  const parsedAddress = houskiAddressParser(
    "908 Edmonton Trail, Calgary, AB T2E 3K1"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "908 Edmonton Trail Calgary Alberta",
    fullWithCountry: "908 Edmonton Trail Calgary Alberta Canada",
    key: "908edmontontrl",
    long: "908 Edmonton Trail",
    postalCode: "T2E3K1",
    province: "Alberta",
    short: "908 Edmonton Trl",
  });
});

test("Symbols like hash signs are filtered out correctly", async function () {
  const parsedAddress = houskiAddressParser(
    "#7333 37 AV NW Edmonton street, Calgary alberta, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "7333 37 Avenue NW Edmonton Street Calgary Alberta",
    fullWithCountry: "7333 37 Avenue NW Edmonton Street Calgary Alberta Canada",
    key: "733337avenwedmontonst",
    long: "7333 37 Avenue NW Edmonton Street",
    postalCode: null,
    province: "Alberta",
    short: "7333 37 Ave NW Edmonton St",
  });
});

test("Postal codes are parsed correctly", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 Edmonton street, Calgary alberta, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "7333 37 Avenue NW Edmonton Street Calgary Alberta",
    fullWithCountry: "7333 37 Avenue NW Edmonton Street Calgary Alberta Canada",
    key: "733337avenwedmontonst",
    long: "7333 37 Avenue NW Edmonton Street",
    postalCode: "T2C3N4",
    province: "Alberta",
    short: "7333 37 Ave NW Edmonton St",
  });
});

test("Cities with spaces in the name pass", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 Edmonton street, St. John's alberta, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "St John's",
    full: "7333 37 Avenue NW Edmonton Street St John's Alberta",
    fullWithCountry:
      "7333 37 Avenue NW Edmonton Street St John's Alberta Canada",
    key: "733337avenwedmontonst",
    long: "7333 37 Avenue NW Edmonton Street",
    postalCode: "T2C3N4",
    province: "Alberta",
    short: "7333 37 Ave NW Edmonton St",
  });
});

test("French city names pass", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Trois-Rivières, quebec, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Trois-Rivires",
    full: "7333 37 Avenue NW 51st Street Trois-Rivires Quebec",
    fullWithCountry:
      "7333 37 Avenue NW 51st Street Trois-Rivires Quebec Canada",
    key: "733337avenw51stst",
    long: "7333 37 Avenue NW 51st Street",
    postalCode: "T2C3N4",
    province: "Quebec",
    short: "7333 37 Ave NW 51st St",
  });
});

test("Ottawa-Gatineau passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Ottawa-Gatineau, Ontario, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Ottawa-Gatineau",
    full: "7333 37 Avenue NW 51st Street Ottawa-Gatineau Ontario",
    fullWithCountry:
      "7333 37 Avenue NW 51st Street Ottawa-Gatineau Ontario Canada",
    key: "733337avenw51stst",
    long: "7333 37 Avenue NW 51st Street",
    postalCode: "T2C3N4",
    province: "Ontario",
    short: "7333 37 Ave NW 51st St",
  });
});

test("Ottawa passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Ottawa, Ontario, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Ottawa",
    full: "7333 37 Avenue NW 51st Street Ottawa Ontario",
    fullWithCountry: "7333 37 Avenue NW 51st Street Ottawa Ontario Canada",
    key: "733337avenw51stst",
    long: "7333 37 Avenue NW 51st Street",
    postalCode: "T2C3N4",
    province: "Ontario",
    short: "7333 37 Ave NW 51st St",
  });
});

test("Gatineau passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Gatineau, Ontario, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Gatineau",
    full: "7333 37 Avenue NW 51st Street Gatineau Ontario",
    fullWithCountry: "7333 37 Avenue NW 51st Street Gatineau Ontario Canada",
    key: "733337avenw51stst",
    long: "7333 37 Avenue NW 51st Street",
    postalCode: "T2C3N4",
    province: "Ontario",
    short: "7333 37 Ave NW 51st St",
  });
});

test("Quebec City, Quebec passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Quebec City, Quebec, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Quebec City",
    full: "7333 37 Avenue NW 51st Street Quebec City Quebec",
    fullWithCountry: "7333 37 Avenue NW 51st Street Quebec City Quebec Canada",
    key: "733337avenw51stst",
    long: "7333 37 Avenue NW 51st Street",
    postalCode: "T2C3N4",
    province: "Quebec",
    short: "7333 37 Ave NW 51st St",
  });
});

test("Directions converter for north west works", async function () {
  const parsedAddress = houskiAddressParser(
    "412 kindcora heath north west calgary alberta canada "
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "412 Kindcora Heath NW Calgary Alberta",
    fullWithCountry: "412 Kindcora Heath NW Calgary Alberta Canada",
    key: "412kindcoraheathnw",
    long: "412 Kindcora Heath NW",
    postalCode: null,
    province: "Alberta",
    short: "412 Kindcora Heath NW",
  });
});

test("Directions converter for west works", async function () {
  const parsedAddress = houskiAddressParser(
    "412 kindcora heath west calgary alberta canada "
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "412 Kindcora Heath W Calgary Alberta",
    fullWithCountry: "412 Kindcora Heath W Calgary Alberta Canada",
    key: "412kindcoraheathw",
    long: "412 Kindcora Heath W",
    postalCode: null,
    province: "Alberta",
    short: "412 Kindcora Heath W",
  });
});

test("Make sure SE is kept", async function () {
  const parsedAddress = houskiAddressParser(
    "8, 7630 Ogden Road SE|Calgary, Alberta T2C1C1"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "8 7630 Ogden Road SE Calgary Alberta",
    fullWithCountry: "8 7630 Ogden Road SE Calgary Alberta Canada",
    key: "87630ogdenrdse",
    long: "8 7630 Ogden Road SE",
    postalCode: "T2C1C1",
    province: "Alberta",
    short: "8 7630 Ogden Rd SE",
  });
});

test("Check that CLOSE long works", async function () {
  const parsedAddress = houskiAddressParser(
    "239 Riverside Close SE, Edmonton, Alberta, Canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "Edmonton",
    full: "239 Riverside Close SE Edmonton Alberta",
    fullWithCountry: "239 Riverside Close SE Edmonton Alberta Canada",
    key: "239riversideclse",
    long: "239 Riverside Close SE",
    postalCode: null,
    province: "Alberta",
    short: "239 Riverside Cl SE",
  });
});

test("Check that VILLA long works", async function () {
  const parsedAddress = houskiAddressParser(
    "6 Rivercrest Villas SE|Calgary, Alberta T2C4K4"
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "6 Rivercrest Villas SE Calgary Alberta",
    fullWithCountry: "6 Rivercrest Villas SE Calgary Alberta Canada",
    key: "6rivercrestvise",
    long: "6 Rivercrest Villas SE",
    postalCode: "T2C4K4",
    province: "Alberta",
    short: "6 Rivercrest Vi SE",
  });
});

const calgaryOverrides = [
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
  {
    long: "COURT",
    abbrs: ["COURT", "CT", "CO"],
    short: "CO",
  },
  {
    long: "CRESCENT",
    abbrs: ["CRESCENT", "CRES", "CRSENT", "CRSNT"],
    short: "CR",
  },
  {
    long: "GREEN",
    abbrs: ["GREEN", "GR"],
    short: "GR",
  },
  {
    long: "TRAIL",
    abbrs: ["TRAIL", "TRL"],
    short: "TR",
  },
  {
    long: "TRAILS",
    abbrs: ["TRAILS", "TRLS"],
    short: "TRS",
  },
];

test("Check that COURT OVERRIDE long works", async function () {
  const parsedAddress = houskiAddressParser(
    "6 Rivercrest CO SE|Calgary, Alberta T2C4K4",
    calgaryOverrides
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "6 Rivercrest Court SE Calgary Alberta",
    fullWithCountry: "6 Rivercrest Court SE Calgary Alberta Canada",
    key: "6rivercrestcose",
    long: "6 Rivercrest Court SE",
    postalCode: "T2C4K4",
    province: "Alberta",
    short: "6 Rivercrest Co SE",
  });
});

test("Check that COURT OVERRIDE long works 2", async function () {
  const parsedAddress = houskiAddressParser(
    "6 Rivercrest court SE|Calgary, Alberta T2C4K4",
    calgaryOverrides
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "6 Rivercrest Court SE Calgary Alberta",
    fullWithCountry: "6 Rivercrest Court SE Calgary Alberta Canada",
    key: "6rivercrestcose",
    long: "6 Rivercrest Court SE",
    postalCode: "T2C4K4",
    province: "Alberta",
    short: "6 Rivercrest Co SE",
  });
});

test("Check that TRAILS OVERRIDE long works", async function () {
  const parsedAddress = houskiAddressParser(
    "6 Rivercrest trails SE|Calgary, Alberta T2C4K4",
    calgaryOverrides
  );
  assert.deepEqual(parsedAddress, {
    city: "Calgary",
    full: "6 Rivercrest Trails SE Calgary Alberta",
    fullWithCountry: "6 Rivercrest Trails SE Calgary Alberta Canada",
    key: "6rivercresttrsse",
    long: "6 Rivercrest Trails SE",
    postalCode: "T2C4K4",
    province: "Alberta",
    short: "6 Rivercrest Trs SE",
  });
});

test("Check that Warren's bug with caps is fixed", async function () {
  const parsedAddress = houskiAddressParser("243 HAMPSTEAD WY NW");
  assert.deepEqual(parsedAddress, {
    city: null,
    full: "243 Hampstead Way NW",
    fullWithCountry: "243 Hampstead Way NW",
    key: "243hampsteadwaynw",
    long: "243 Hampstead Way NW",
    postalCode: null,
    province: null,
    short: "243 Hampstead Way NW",
  });
});

test("Check that uppercase addresses work properly", async function () {
  const parsedAddress = houskiAddressParser("53 TARAGLEN RD NE");
  assert.deepEqual(parsedAddress, {
    city: null,
    full: "53 Taraglen Road NE",
    fullWithCountry: "53 Taraglen Road NE",
    key: "53taraglenrdne",
    long: "53 Taraglen Road NE",
    postalCode: null,
    province: null,
    short: "53 Taraglen Rd NE",
  });
});

test("Check that lowercase addresses work properly", async function () {
  const parsedAddress = houskiAddressParser("53 Taraglen Rd NE");
  assert.deepEqual(parsedAddress, {
    city: null,
    full: "53 Taraglen Road NE",
    fullWithCountry: "53 Taraglen Road NE",
    key: "53taraglenrdne",
    long: "53 Taraglen Road NE",
    postalCode: null,
    province: null,
    short: "53 Taraglen Rd NE",
  });
});

!(async function () {
  await test.run();
})();
