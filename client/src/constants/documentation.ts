export enum docSection {
  GetStarted = "get-started",
  App = "app",
  Router = "router",
  Auth= "authentication",
  Procedures = "procedures",
  Context = "context",
  ClientSide = "client-side-integration",
  TypeGeneration = "type-generation",
}

type docMdType = "h1" | "h2" | "h3" | "h4" | "p" | "important" | "note";

export type listContent = {
  title: string;
  bulletPoints: string[];
};

type ListComponentDetails = { type: "list"; content: listContent; id: string };
type CodeComponentDetails = {
  type: "code";
  content: { language: string; code: string };
  id: string;
};

type PageComponent =
  | { type: docMdType; content: string; id: string }
  | ListComponentDetails
  | CodeComponentDetails;
export type PageLayout = PageComponent[];
