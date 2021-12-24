let suffix = require("./houski-street-suffix");

module.exports = function houskiAddressParser(address) {
  const onlyLettersAndNumbers = /[^A-Za-z0-9]/gim;
  const onlyLettersNumbersDashesAndApostraphe = /[^A-Za-z0-9\-\' ]/gim;

  const regexDoubleSpaces = /\s\s+/g;

  const postalCode = /[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d/gim;

  const regexAlberta = /\b(?:AB|Alta|alberta)\b/gim;
  const regexBritishColumbia = /\b(?:BC|British Columbia)\b/gim;
  const regexLabrador = /\b(?:LB|Labrador)\b/gim;
  const regexManitoba = /\b(?:MB|Man|Manitoba)\b/gim;
  const regexNewfoundLand = /\b(?:Nfld|NF|Newfoundland)\b/gim;
  const regexNorthwestTerritories = /\b(?:NWT|Northwest Territories)\b/gim;
  const regexNovaScotia = /\b(?:Nova Scotia)\b/gim;
  const regexNewBrunswick = /\b(?:NB|New Brunswick)\b/gim;
  const regexNunavut = /\b(?:Nunavut)\b/gim;
  const regexOntario = /\b(?:ON|ONT|Ontario)\b/gim;
  const regexPrinceEdwardIsland = /\b(?:PE|PEI|Prince Edward Island)\b/gim;
  const regexQuebec = /\b(?:QC|PC|QUE|QU|Quebec)\b/gim;
  const regexSaskatchewan = /\b(?:SK|Sask|Saskatchewan)\b/gim;
  const regexYukon = /\b(?:YT|Yukon|Yukon Territories)\b/gim;

  const provincesRegex = [
    { regex: regexLabrador, province: "Labrador" },
    { regex: regexManitoba, province: "Manitoba" },
    { regex: regexNewfoundLand, province: "Newfoundland" },
    { regex: regexNorthwestTerritories, province: "Northwest Territories" },
    { regex: regexNovaScotia, province: "Nova Scotia" },
    { regex: regexNewBrunswick, province: "New Brunswick" },
    { regex: regexNunavut, province: "Nunavut" },
    { regex: regexPrinceEdwardIsland, province: "Prince Edward Island" },
    { regex: regexQuebec, province: "Quebec" },
    { regex: regexSaskatchewan, province: "Saskatchewan" },
    { regex: regexYukon, province: "Yukon" },
    { regex: regexOntario, province: "Ontario" },
    { regex: regexBritishColumbia, province: "British Columbia" },
    { regex: regexAlberta, province: "Alberta" },
  ];

  const regexCountry = /\b(?:Canada|CA)\b/gim;

  const allProvincesRegex =
    /\b(?:AB|Alta|alberta|BC|British Columbia|LB|Labrador|MB|Man|Manitoba|Nfld|NF|Newfoundland|NWT|Northwest Territories|Nova Scotia|NB|New Brunswick|Nunavut|ON|ONT|Ontario|PE|PEI|Prince Edward Island|QC|PC|QUE|QU|Quebec|SK|Sask|Saskatchewan|YT|Yukon|Yukon Territories)\b/gim;

  const cityRegex =
    /(Ottawa-Gatineau|trois-rivires|Chicoutimi–Jonquière|Toronto|Montreal|Vancouver|Calgary|Edmonton|Ottawa|Gatineau|Winnipeg|Hamilton|Kitchener|Laval|London|Victoria|Halifax|Oshawa|Windsor|Saskatoon|Regina|Kelowna|Barrie|Sherbrooke|Guelph|Abbotsford|Kingston|Kanata|Moncton|Milton|Brantford|Nanaimo|Sudbury|Lethbridge|Peterborough|Kamloops|Chilliwack|Sarnia|Drummondville|Belleville|St. John's|St John's|St. Catharines|St Catharines|Quebec City)/gim;

  const citySpaceRegex =
    /(St. John's|St John's|St. Catharines|St Catharines|Quebec City)/gim;

  let city = null;
  let originalCityElement = null;
  let province = null;
  let originalProvinceElement = null;

  // find and remove the postal code.
  const postalCodeParsed =
    address
      .match(postalCode)
      ?.pop()
      ?.replace(onlyLettersAndNumbers, "")
      ?.toUpperCase() || null;

  address = address.replace(postalCode, "");

  // only allow letters and numbers and spaces
  address = address.replace(onlyLettersNumbersDashesAndApostraphe, "");

  /////////////////////////// CITY LOGIC ///////////////////////////////

  if (address.match(cityRegex)) {
    // Find every value that matches in the address string
    const matchingCityValues = address.match(cityRegex);

    // Split the address into an array for next steps
    address = address.split(" ");

    // Check for cities with spaces and recombine if necessary

    address.forEach((word, index, array) => {
      if ((word + " " + array[index + 1])?.match(citySpaceRegex)) {
        const matchingCity = (word + " " + array[index + 1])
          ?.match(citySpaceRegex)
          ?.pop();

        address.splice(index, 2, matchingCity);
      }
    });

    // Find the indices of those matches in the address array

    let cityValueIndices = [];

    address.forEach((word, i) => {
      if (word.match(cityRegex)) {
        cityValueIndices.push(i);
      }
    });

    cityValueIndices.forEach((i) => {
      // If the next "word" in the array is blank, this is likely our city and not a weird street name with a city in it.
      // OR if the next "word" in the array is a province, this is likely the correct city and not just a weird street name.
      // If true, remove the correct city from the address.
      // Otherwise it is likely a street name, so leave it.
      if (
        address[i + 1] === undefined ||
        address[i + 1]?.match(allProvincesRegex)
      ) {
        originalCityElement = address[i];
        city = address[i].toUpperCase();
      }
    });

    // Rejoin the array for next steps
    address = address.join(" ");
  }

  /////////////////////////// PROVINCE LOGIC ///////////////////////////////

  if (address.match(allProvincesRegex)) {
    // Find every value that matches in the address string
    const matchingProvinceValues = address.match(allProvincesRegex);

    // Split the address into an array for next steps
    address = address.split(" ");

    // Find the indices of those matches in the address array

    let provinceValueIndices = [];

    address.forEach((word, i) => {
      if (word.match(allProvincesRegex)) {
        provinceValueIndices.push(i);
      }
    });

    provinceValueIndices.forEach((i) => {
      // If the next "word" in the array is blank, this is likely our province and not a weird street name with a province in it.
      // If the previous "word" in the array is a city, this is likely our province and not a weird street name with a province in it.
      // OR if the next "word" in the array is Canada, this is likely the correct province and not just a weird street name.
      // If true, remove the correct city from the address.
      // Otherwise it is likely a street name, so leave it.

      if (
        address[i + 1] === undefined ||
        address[i - 1]?.match(cityRegex) ||
        address[i + 1]?.match(regexCountry)
      ) {
        originalProvinceElement = address[i];
        province = address[i];

        // Now that we now we have a province, let's make sure it's standardized to it's full name.
        province =
          provincesRegex
            .find((p) => province?.match(p.regex))
            ?.province?.toUpperCase() || null;
      }
    });

    // Reassemble the address for the next steps.
    address = address.join(" ");
  }

  /////////////////////////// REMOVER LOGIC ///////////////////////////////

  // Remove the proper instances of city, province and country.
  address = address.replace(originalCityElement, "");
  address = address.replace(originalProvinceElement, "");
  address = address.replace(regexCountry, "");

  // Resplit the address for the final steps
  address = address.split(" ");

  // Standardize each "word" of the address according to USPS standards.
  let shortAddress = [...address].map(
    (word) => suffix.abbreviate(word) || word
  );

  let longAddress = [...address].map(
    (word) => (suffix.abbreviate(word) && suffix.expand(word)) || word
  );

  // Rejoin the address and format
  shortAddress = shortAddress
    .join(" ")
    .toUpperCase()
    .replace(regexDoubleSpaces, " ")
    .trim();

  longAddress = longAddress
    .join(" ")
    .toUpperCase()
    .replace(regexDoubleSpaces, " ")
    .trim();

  const cityAndProvinceExist = city && province;

  const result = {
    short: shortAddress,
    long: longAddress,
    full: [longAddress, city, province, postalCodeParsed].join(" ").trim(),
    fullWithCountry: [
      longAddress,
      city,
      province,
      cityAndProvinceExist ? "CANADA" : null,
      postalCodeParsed,
    ]
      .join(" ")
      .trim(),
    city: city,
    province: province,
    postalCode: postalCodeParsed,
  };

  return result;
};
