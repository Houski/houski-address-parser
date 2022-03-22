"use strict";

const streetTypes = require("./houski-street-types");

function checkString(str) {
  if (typeof str !== "string") {
    return;
  }
}

function expand(str, overrides = [], append) {
  checkString(str);
  let types = streetTypes;
  if (overrides.length > 0) {
    types = overrides;
  }
  if (overrides.length > 0 && append) {
    types = [...overrides, ...streetTypes];
  }
  const match = types.find((t) => t.abbrs.includes(str));
  if (typeof match?.long !== "string") {
    return str;
  }
  return match.long;
}

function abbreviate(str, overrides = [], append) {
  checkString(str);
  let types = streetTypes;
  if (overrides.length > 0) {
    types = overrides;
  }
  if (overrides.length > 0 && append) {
    types = [...overrides, ...streetTypes];
  }
  const match = types.find((t) => t.abbrs.includes(str));
  if (typeof match?.short !== "string") {
    return str;
  }
  return match.short;
}

module.exports = {
  expand,
  abbreviate,
};
