import { getAccordions } from "@/constants/createAccordion";
import { PageLayout, docSection } from "@/constants/documentation";
import React, { useEffect, useMemo } from "react";

import { Link } from "react-router-dom";

interface props {
  slug: docSection;
  layout: PageLayout;
}
const DocumentationMain = ({ slug, layout }: props) => {
  const JSXEs = useMemo(() => getAccordions(layout), [layout]);
  useEffect(() => {
    // Get the current hash from the URL (without the #)
    const hash = window.location.hash.substring(1);

    if (hash) {
      // Find the element with that ID
      const element = document.getElementById(hash);

      // If the element exists, scroll to it
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []);
  return (
    <article className="w-full flex flex-col lg:max-w-[60vw] pb-[10vh] max-w-[100vw] ">
      <section className="mt-8 ml-1 flex flex-col gap-y-8">
        {JSXEs.map((Element, i) => (
          <Element key={i} />
        ))}
      </section>
      <Link
        to={`https://github.com/blue-rpc/docs/edit/master/server/docs/${slug}.md`}
        className="mt-24 text-lg text-cyan-400 underline hover:text-cyan-200 transition-all duration-300"
      >
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
