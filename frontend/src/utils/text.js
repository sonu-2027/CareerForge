// Plain-text preview of a (possibly HTML) description
export const toPlainText = (html = "") => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};
