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

test("Quebec City, Quebec passes", async function () {
  const parsedAddress = houskiAddressParser(
    "202, 1712 37 Street SE Calgary, Alberta T2A1E8"
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

!(async function () {
  await test.run();
})();
