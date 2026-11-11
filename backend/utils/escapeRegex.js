// Escape user input before using it inside a RegExp so that characters like
// "(" or "*" can't crash the query (500) or cause catastrophic backtracking.
const escapeRegex = (str = "") => String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = escapeRegex;
