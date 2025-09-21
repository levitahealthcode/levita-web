import { useEffect } from "react";

type JsonLd = Record<string, any> | Record<string, any>[];

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  og?: Partial<{
    title: string;
    description: string;
    url: string;
    type: string;
    image: string;
    site_name: string;
  }>;
  twitter?: Partial<{
    card: string;
    title: string;
    description: string;
    image: string;
  }>;
  structuredData?: JsonLd;
};

function upsertMetaByName(name: string, content?: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content?: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href?: string) {
  if (!href) return;
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setNoIndex(noindex?: boolean) {
  const content = noindex ? "noindex, nofollow" : "index, follow";
  upsertMetaByName("robots", content);
}

function setJsonLd(data?: JsonLd) {
  // Remove old JSON-LD if present
  document.head
    .querySelectorAll('script[data-seo-jsonld="1"]')
    .forEach((s) => s.remove());
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-jsonld", "1");
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SEO({
  title,
  description,
  canonical,
  noindex,
  og,
  twitter,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMetaByName("description", description);
    if (canonical) upsertCanonical(canonical);
    setNoIndex(noindex);

    // Open Graph
    const ogTitle = og?.title ?? title;
    const ogDesc = og?.description ?? description;
    const ogUrl = og?.url ?? canonical;

    if (ogTitle) upsertMetaByProperty("og:title", ogTitle);
    if (ogDesc) upsertMetaByProperty("og:description", ogDesc);
    if (ogUrl) upsertMetaByProperty("og:url", ogUrl);
    if (og?.type) upsertMetaByProperty("og:type", og.type);
    if (og?.image) upsertMetaByProperty("og:image", og.image);
    if (og?.site_name) upsertMetaByProperty("og:site_name", og.site_name);

    // Twitter
    if (twitter?.card) upsertMetaByName("twitter:card", twitter.card);
    if (twitter?.title ?? title)
      upsertMetaByName("twitter:title", twitter?.title ?? title!);
    if (twitter?.description ?? description)
      upsertMetaByName(
        "twitter:description",
        twitter?.description ?? description!
      );
    if (twitter?.image) upsertMetaByName("twitter:image", twitter.image);

    // JSON-LD
    setJsonLd(structuredData);
  }, [title, description, canonical, noindex, og, twitter, structuredData]);

  return null;
}
