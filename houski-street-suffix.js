"use strict";

const streetTypes = require("./houski-street-types");

function checkString(str) {
  if (typeof str !== "string") {
    return;
  }
}

function expand(str, overrides = []) {
  checkString(str);
  const match = [...overrides, ...streetTypes].find((t) =>
    t.abbrs.includes(str)
  );
  if (!match) {
    return str;
  }
  return match.long;
}

function abbreviate(str, overrides = []) {
  checkString(str);
  const match = [...overrides, ...streetTypes].find((t) =>
    t.abbrs.includes(str)
  );
  if (!match) {
    return str;
  }
  return match.short;
}

module.exports = {
  expand,
  abbreviate,
};
