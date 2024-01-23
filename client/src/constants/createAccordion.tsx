import { DocLayoutEl } from "@/components/documentation/DocLayoutEl";
import { PageLayout } from "./documentation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAtom } from "jotai";
import { scrollSearchedAtom } from "@/components/Nav";
import { useEffect } from "react";

export function getAccordions(layout: PageLayout): [() => JSX.Element] {
  const JSXElements: [() => JSX.Element] = [() => <></>];
  let accordionContent: Array<() => JSX.Element> = [];

  for (let i = 0; i < layout.length; i++) {
    const currentElement = layout[i];

    if (currentElement.type !== "h3") {
      if (accordionContent.length > 0) {
        JSXElements.push(CreateAccordion(accordionContent));
        accordionContent = []; // Reset for next accordion
      }
      JSXElements.push(() => (
        <DocLayoutEl key={currentElement.id} layoutEl={currentElement} />
      ));
      continue;
    }

    const [content, nextIndex] = extractAccordionContent(layout, i);
    accordionContent.push(CreateAccordionItem(currentElement, content));
    i = nextIndex - 1; // Adjust loop index after processing inner content
  }

  if (accordionContent.length > 0) {
    JSXElements.push(CreateAccordion(accordionContent));
  }

  return JSXElements;
}

function CreateAccordion(
  accordionElements: Array<() => JSX.Element>
): () => JSX.Element {
  return () => <DocsAccordion accordionElements={accordionElements} />;
}

function DocsAccordion({
  accordionElements,
}: {
  accordionElements: Array<() => JSX.Element>;
}) {



  const [scrolled, setScrolled] = useAtom(scrollSearchedAtom);

  useEffect(() => {
    setTimeout(() => setScrolled(null), 200);
  }, [])
  
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={scrolled ?? ""}
      className="w-full  flex flex-col gap-y-6"
    >
      {accordionElements.map((Element, i) => (
        <Element key={i} />
      ))}
    </Accordion>
  );
}

function CreateAccordionItem(
  header: PageLayout[number],
  content: PageLayout
): () => JSX.Element {
  const headerContent = header.content as string;
  return () => (
    <AccordionItem
    key={headerContent}
      value={headerContent.replace(" ", "").replace("(", "").replace(")", "")}
      className="p-4 border-b-2 border-stone-900 transition-all duration-300 hover:border-white text-cyan-200"
    >
      <AccordionTrigger className="hover:!border-none hover:!outline-none border-none outline-none ">
        <DocLayoutEl layoutEl={header} />
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-y-8 text-lg border-none outline-none">
        {content.map((Element) => (
          <DocLayoutEl key={Element.id} layoutEl={Element} />
        ))}
        {/* <p>Hello</p> */}
      </AccordionContent>
    </AccordionItem>
  );
}

function extractAccordionContent(
  layout: PageLayout,
  startIndex: number
): [PageLayout, number] {
  const content: PageLayout = [];
  let index = startIndex + 1;

  while (index < layout.length && layout[index].type !== "h3") {
    content.push(layout[index]);
    index++;
  }

  return [content, index];
}
