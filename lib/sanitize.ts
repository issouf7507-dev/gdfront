import sanitizeHtml from "sanitize-html";

// HTML des articles (éditeur Tiptap) : liste blanche stricte
export function sanitizeArticleHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "code", "pre", "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    exclusiveFilter: (frame) =>
      frame.tag === "img" &&
      !(frame.attribs.src?.startsWith("/uploads/") || frame.attribs.src?.startsWith("https://")),
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.target === "_blank"
          ? { ...attribs, rel: "noopener noreferrer" }
          : attribs,
      }),
    },
  });
}
