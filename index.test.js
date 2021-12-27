const assert = require("assert");
const houskiAddressParser = require("./index.js");
const test = require("baretest")("Houski address parser");

test("Having a street with the name of a province works w/ country", async function () {
  const parsedAddress = houskiAddressParser(
    "458 Quebec Street, Calgary, Alberta, Canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "458 QUEBEC STREET CALGARY ALBERTA",
    fullWithCountry: "458 QUEBEC STREET CALGARY ALBERTA CANADA",
    long: "458 QUEBEC STREET",
    postalCode: null,
    province: "ALBERTA",
    short: "458 QUEBEC ST",
  });
});

test("Having a street with the name of a province works w/ out country", async function () {
  const parsedAddress = houskiAddressParser(
    "458 Quebec Street, Calgary, Alberta"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "458 QUEBEC STREET CALGARY ALBERTA",
    fullWithCountry: "458 QUEBEC STREET CALGARY ALBERTA CANADA",
    long: "458 QUEBEC STREET",
    postalCode: null,
    province: "ALBERTA",
    short: "458 QUEBEC ST",
  });
});

test("Having a street with the name of a city works", async function () {
  const parsedAddress = houskiAddressParser("908 Edmonton Trail");
  assert.deepEqual(parsedAddress, {
    city: null,
    full: "908 EDMONTON TRAIL",
    fullWithCountry: "908 EDMONTON TRAIL",
    long: "908 EDMONTON TRAIL",
    postalCode: null,
    province: null,
    short: "908 EDMONTON TRL",
  });
});

test("Having a street with the name of a city works with the real city after it", async function () {
  const parsedAddress = houskiAddressParser(
    "908 Edmonton Trail, Calgary, AB T2E 3K1"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "908 EDMONTON TRAIL CALGARY ALBERTA T2E3K1",
    fullWithCountry: "908 EDMONTON TRAIL CALGARY ALBERTA CANADA T2E3K1",
    long: "908 EDMONTON TRAIL",
    postalCode: "T2E3K1",
    province: "ALBERTA",
    short: "908 EDMONTON TRL",
  });
});

test("Symbols like hash signs are filtered out correctly", async function () {
  const parsedAddress = houskiAddressParser(
    "#7333 37 AV NW Edmonton street, Calgary alberta, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "7333 37 AVENUE NW EDMONTON STREET CALGARY ALBERTA",
    fullWithCountry: "7333 37 AVENUE NW EDMONTON STREET CALGARY ALBERTA CANADA",
    long: "7333 37 AVENUE NW EDMONTON STREET",
    postalCode: null,
    province: "ALBERTA",
    short: "7333 37 AVE NW EDMONTON ST",
  });
});

test("Postal codes are parsed correctly", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 Edmonton street, Calgary alberta, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "7333 37 AVENUE NW EDMONTON STREET CALGARY ALBERTA T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW EDMONTON STREET CALGARY ALBERTA CANADA T2C3N4",
    long: "7333 37 AVENUE NW EDMONTON STREET",
    postalCode: "T2C3N4",
    province: "ALBERTA",
    short: "7333 37 AVE NW EDMONTON ST",
  });
});

test("Cities with spaces in the name pass", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 Edmonton street, St. John's alberta, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "ST JOHN'S",
    full: "7333 37 AVENUE NW EDMONTON STREET ST JOHN'S ALBERTA T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW EDMONTON STREET ST JOHN'S ALBERTA CANADA T2C3N4",
    long: "7333 37 AVENUE NW EDMONTON STREET",
    postalCode: "T2C3N4",
    province: "ALBERTA",
    short: "7333 37 AVE NW EDMONTON ST",
  });
});

test("French city names pass", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Trois-Rivières, quebec, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "TROIS-RIVIRES",
    full: "7333 37 AVENUE NW 51ST STREET TROIS-RIVIRES QUEBEC T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW 51ST STREET TROIS-RIVIRES QUEBEC CANADA T2C3N4",
    long: "7333 37 AVENUE NW 51ST STREET",
    postalCode: "T2C3N4",
    province: "QUEBEC",
    short: "7333 37 AVE NW 51ST ST",
  });
});

test("Ottawa-Gatineau passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Ottawa-Gatineau, Ontario, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "OTTAWA-GATINEAU",
    full: "7333 37 AVENUE NW 51ST STREET OTTAWA-GATINEAU ONTARIO T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW 51ST STREET OTTAWA-GATINEAU ONTARIO CANADA T2C3N4",
    long: "7333 37 AVENUE NW 51ST STREET",
    postalCode: "T2C3N4",
    province: "ONTARIO",
    short: "7333 37 AVE NW 51ST ST",
  });
});

test("Ottawa passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Ottawa, Ontario, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "OTTAWA",
    full: "7333 37 AVENUE NW 51ST STREET OTTAWA ONTARIO T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW 51ST STREET OTTAWA ONTARIO CANADA T2C3N4",
    long: "7333 37 AVENUE NW 51ST STREET",
    postalCode: "T2C3N4",
    province: "ONTARIO",
    short: "7333 37 AVE NW 51ST ST",
  });
});

test("Gatineau passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Gatineau, Ontario, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "GATINEAU",
    full: "7333 37 AVENUE NW 51ST STREET GATINEAU ONTARIO T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW 51ST STREET GATINEAU ONTARIO CANADA T2C3N4",
    long: "7333 37 AVENUE NW 51ST STREET",
    postalCode: "T2C3N4",
    province: "ONTARIO",
    short: "7333 37 AVE NW 51ST ST",
  });
});

test("Quebec City, Quebec passes", async function () {
  const parsedAddress = houskiAddressParser(
    "7333 37 AV NW t2c3n4 51st street Quebec City, Quebec, canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "QUEBEC CITY",
    full: "7333 37 AVENUE NW 51ST STREET QUEBEC CITY QUEBEC T2C3N4",
    fullWithCountry:
      "7333 37 AVENUE NW 51ST STREET QUEBEC CITY QUEBEC CANADA T2C3N4",
    long: "7333 37 AVENUE NW 51ST STREET",
    postalCode: "T2C3N4",
    province: "QUEBEC",
    short: "7333 37 AVE NW 51ST ST",
  });
});

test("Directions converter for north west works", async function () {
  const parsedAddress = houskiAddressParser(
    "412 kindcora heath north west calgary alberta canada "
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "412 KINDCORA HEATH NW CALGARY ALBERTA",
    fullWithCountry: "412 KINDCORA HEATH NW CALGARY ALBERTA CANADA",
    long: "412 KINDCORA HEATH NW",
    postalCode: null,
    province: "ALBERTA",
    short: "412 KINDCORA HEATH NW",
  });
});

test("Directions converter for west works", async function () {
  const parsedAddress = houskiAddressParser(
    "412 kindcora heath west calgary alberta canada "
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "412 KINDCORA HEATH W CALGARY ALBERTA",
    fullWithCountry: "412 KINDCORA HEATH W CALGARY ALBERTA CANADA",
    long: "412 KINDCORA HEATH W",
    postalCode: null,
    province: "ALBERTA",
    short: "412 KINDCORA HEATH W",
  });
});

test("Make sure SE is kept", async function () {
  const parsedAddress = houskiAddressParser(
    "8, 7630 Ogden Road SE|Calgary, Alberta T2C1C1"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "8 7630 OGDEN ROAD SE CALGARY ALBERTA T2C1C1",
    fullWithCountry: "8 7630 OGDEN ROAD SE CALGARY ALBERTA CANADA T2C1C1",
    long: "8 7630 OGDEN ROAD SE",
    postalCode: "T2C1C1",
    province: "ALBERTA",
    short: "8 7630 OGDEN RD SE",
  });
});

test("Check that CLOSE suffix works", async function () {
  const parsedAddress = houskiAddressParser(
    "239 Riverside Close SE, Edmonton, Alberta, Canada"
  );
  assert.deepEqual(parsedAddress, {
    city: "EDMONTON",
    full: "239 RIVERSIDE CLOSE SE EDMONTON ALBERTA",
    fullWithCountry: "239 RIVERSIDE CLOSE SE EDMONTON ALBERTA CANADA",
    long: "239 RIVERSIDE CLOSE SE",
    postalCode: null,
    province: "ALBERTA",
    short: "239 RIVERSIDE CL SE",
  });
});

test("Check that VILLA suffix works", async function () {
  const parsedAddress = houskiAddressParser(
    "6 Rivercrest Villas SE|Calgary, Alberta T2C4K4"
  );
  assert.deepEqual(parsedAddress, {
    city: "CALGARY",
    full: "6 RIVERCREST VILLAS SE CALGARY ALBERTA T2C4K4",
    fullWithCountry: "6 RIVERCREST VILLAS SE CALGARY ALBERTA CANADA T2C4K4",
    long: "6 RIVERCREST VILLAS SE",
    postalCode: "T2C4K4",
    province: "ALBERTA",
    short: "6 RIVERCREST VI SE",
  });
});

!(async function () {
  await test.run();
})();
