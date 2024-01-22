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
      case docSection.Intro:
        return "Intro";
      case docSection.ClientSide:
        return "Client Side Integration";
    }
  }
  