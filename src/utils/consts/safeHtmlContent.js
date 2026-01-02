"use client";

export default function SafeHtmlContent({ html, className = "" }) {
  if (!html) return null;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
