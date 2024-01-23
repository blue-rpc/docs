/* eslint-disable @typescript-eslint/no-explicit-any */
async function rpcCall<T>( apiRoute: string, params?: { query?: any, input?: any } ): Promise<T> {
  if (params === undefined) {
    const res = await fetch(apiRoute)
    const json = await res.json()
    return json as T
  }
const host = "";
let path = apiRoute;
if (Object.keys(params.query).length !== 0){
  path += `?${Object.keys(params.query).map(key => `${key}=${params.query[key]}`).join('&')}`
}
const url = host + path;
  const res = await fetch(url, {
    body: !params.input || Object.keys(params.input).length === 0 ? undefined : params.input
  })
  const json = await res.json()
  return json as T
}
export const rpcAPI ={api:{documentation:{files:{[`fileName`]:{query: async (query:{ fileNameSlug: string,}):Promise<{ structure: Array<{ type?: string, content?: any, id?: string,}>,}>=>{return rpcCall(`/api/documentation/files/${query.fileNameSlug}`,{query})}}}}},users:{info:{query: async (query:{ id: string,}):Promise<{ name?: string, email?: string, isMature?: boolean,}>=>{return rpcCall(`/users/info`,{query})}}}}as const;