let suffix = require("./houski-street-suffix");

module.exports = function capitalizeAddress(input) {
  if (input == null) {
    return null;
  }
  let str = input;
  str = str.trim();
  str = str.toLowerCase();

  str = str.charAt(0).toUpperCase() + str.substr(1);

  str = str.replace(
    /(?<=\s|-)\b([a-z])/gim,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1)
  );

  str = str.split(" ");

  str = str.map((s) => {
    if (s.toUpperCase() === "NE") {
      return "NE";
    }

    if (s.toUpperCase() === "NW") {
      return "NW";
    }

    if (s.toUpperCase() === "SE") {
      return "SE";
    }

    if (s.toUpperCase() === "SW") {
      return "SW";
    }

    if (s.toUpperCase() === "N") {
      return "N";
    }

    if (s.toUpperCase() === "W") {
      return "W";
    }

    if (s.toUpperCase() === "S") {
      return "S";
    }

    if (s.toUpperCase() === "W") {
      return "W";
    }

    return s;
  });

  str = str.join(" ");

  return str;
};
