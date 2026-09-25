export type AlternativeId = "charades" | "taboo" | "heads-up" | "nebuu";

export type AlternativeCompareCell = "yes" | "no" | "partial" | string;

export interface AlternativeCompareRow {
  feature: string;
  tadado: AlternativeCompareCell;
  alternative: AlternativeCompareCell;
}

export interface AlternativeFaqItem {
  q: string;
  a: string;
}

export interface AlternativePageContent {
  id: AlternativeId;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  introTitle: string;
  introParagraphs: string[];
  reasonsTitle: string;
  reasons: string[];
  compareTitle: string;
  compareSubtitle: string;
  compareColumnTadado: string;
  compareColumnOther: string;
  compareRows: AlternativeCompareRow[];
  compareNote: string;
  faqTitle: string;
  faq: AlternativeFaqItem[];
  disclaimer: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  relatedTitle: string;
}
