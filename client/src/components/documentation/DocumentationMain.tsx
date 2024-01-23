import { PageLayout, docSection } from "@/constants/documentation";
import { getSlugLabel } from "@/lib/documentation";
import React, { useMemo } from "react";

import {  getAccordions } from "@/constants/createAccordion";
import { Link } from "react-router-dom";

interface props {
  slug: docSection;
  layout: PageLayout;
}
const DocumentationMain = ({ slug, layout }: props) => {
  const slugLabel = useMemo(() => getSlugLabel(slug), [slug]);
  const JSXEs = useMemo(() => getAccordions(layout), [layout]);

  return (
    <article className="w-full flex flex-col lg:max-w-[60vw] pb-[10vh]">

      <p className="text-3xl font-serif text-yellow-300">{slugLabel}</p>
      <section className="mt-8 ml-1 flex flex-col gap-y-8">
        {JSXEs.map((Element, i) => (
          <Element key={i} />
        ))}
      </section>
      <Link to={"https://www.github.com"} className="mt-12 text-cyan-400 underline hover:text-cyan-200 transition-all duration-300">
      Edit this page
      </Link>
    </article>
  );
};


const areEqual = (prevProps: props, nextProps: props) => {
  return (
    prevProps.layout === nextProps.layout && prevProps.slug === nextProps.slug
  );
};
const MemoDocumentationMain = React.memo(DocumentationMain, areEqual);
export default MemoDocumentationMain;
