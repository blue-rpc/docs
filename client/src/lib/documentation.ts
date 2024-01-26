import { docSection } from "@/constants/documentation";

export function getSlugLabel(slug: docSection): string {
  switch (slug) {
    case docSection.GetStarted:
      return "Get Started";
    case docSection.App:
      return "App";
    case docSection.Router:
      return "Router";
    case docSection.Procedures:
      return "Procedures";
    case docSection.Context:
      return "Context";
    case docSection.ClientSide:
      return "Client Side Integration";
    case docSection.TypeGeneration:
      return "Type Generation";
    case docSection.Auth:
      return "Authentication and Authorization"
  }
}
