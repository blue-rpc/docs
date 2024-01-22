import { DocLayoutEl } from "@/components/documentation/DocLayoutEl";
import { PageLayout } from "./documentation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function getAccordions(layout: PageLayout): [() => JSX.Element] {
  const JSXElements: [() => JSX.Element] = [() => <></>];
  let accordionContent: Array<({id}: {id: number}) => JSX.Element> = [];

  for (let i = 0; i < layout.length; i++) {
    const currentElement = layout[i];

    if (currentElement.type !== "h3") {
      if (accordionContent.length > 0) {
        JSXElements.push(createAccordion(accordionContent));
        accordionContent = []; // Reset for next accordion
      }
      JSXElements.push(() => (
        <DocLayoutEl key={currentElement.id} layoutEl={currentElement} />
      ));
      continue;
    }

    const [content, nextIndex] = extractAccordionContent(layout, i);
    accordionContent.push(createAccordionItem(currentElement, content));
    i = nextIndex - 1; // Adjust loop index after processing inner content
  }

  if (accordionContent.length > 0) {
    JSXElements.push(createAccordion(accordionContent));
  }

  return JSXElements;
}

function createAccordion(
  accordionElements: Array<({id}: {id: number})  => JSX.Element>
): () => JSX.Element {
  return () => (
    <Accordion
      type="single"
      collapsible
      className="w-full  flex flex-col gap-y-6"
    >
      {accordionElements.map((Element, i) => (
        <Element id={i} key={i} />
      ))}
    </Accordion>
  );
}

function createAccordionItem(
  header: PageLayout[number],
  content: PageLayout
): ({ id }: { id: number }) => JSX.Element {
  console.log("content", content);

  return ({id}) => (
    <AccordionItem
      value={`item-${id}`}
      className="p-4 border-b-2 border-cyan-200 transition-all duration-300 hover:border-white text-cyan-200"
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
