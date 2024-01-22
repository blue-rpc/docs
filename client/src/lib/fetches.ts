import { rpcAPI } from "@/API";
import { PageLayout, docSection } from "@/constants/documentation";



export async function getPageLayout (params: string):  Promise<undefined | PageLayout> {
    const allowedSlugs = Object.values(docSection); // Array of allowed slugs
    if (!allowedSlugs.includes(params as docSection)) return undefined

    const res = await rpcAPI.api.documentation.files.fileName.query({fileNameSlug: params})

    console.log('res', res);
    
    return res.structure as PageLayout
}