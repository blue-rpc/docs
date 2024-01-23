import { PageLayout } from '@/constants/documentation';
import Code from "@/components/ui/code";
import Note from "@/components/ui/note";
import List from "@/components/ui/list";
import Important from "@/components/ui/important";

interface layoutProps {
    layoutEl: PageLayout[number];
  }
  export function DocLayoutEl ({ layoutEl }: layoutProps): JSX.Element  {
    switch (layoutEl.type) {
      case "h1":
        return (
          <h1 id={layoutEl.content.replace(" ", "").replace("(", "").replace(")", "")} className="text-4xl  text-cyan-300 pb-4 border-cyan-200 font-serif w-full border-b-[1px]">
            {layoutEl.content}
          </h1>
        );
      case "h2":
        return (
          <h2 id={layoutEl.content.replace(" ", "").replace("(", "").replace(")", "")} className="text-3xl   text-cyan-200 font-serif">
            {layoutEl.content}
          </h2>
        );
      case "h3":
        return (
          <h3 id={layoutEl.content.replace(" ", "").replace("(", "").replace(")", "")} className="text-2xl font-bold underline   text-cyan-200 font-serif">
            {layoutEl.content}
          </h3>
        );
      case "h4":
        return (
          <h4 className="text-xl font-bold text-cyan-100">{layoutEl.content}</h4>
        );
      case "p":
        return <p className="text-lg text-stone-200">{layoutEl.content}</p>;
      case "code":
        return (
          <Code
            code={layoutEl.content.code}
            language={layoutEl.content.language}
          />
        );
      case "note":
        return <Note text={layoutEl.content} />;
  
      case "list":
        return (
          <List
            bulletPoints={layoutEl.content.bulletPoints}
            title={layoutEl.content.title}
          />
        );
      case "important":
        return <Important text={layoutEl.content} />;
      default:
        return <></>;
    }
  }
