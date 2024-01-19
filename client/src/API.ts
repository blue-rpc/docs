async function rpcCall<T>(params: { query?: any, input?: any } | undefined, apiRoute: string): Promise<T> {
  if (params === undefined) {
    const res = await fetch(apiRoute)
    const json = await res.json()
    return json as T
  }
  const url = Object.keys(params.query).length === 0 ? apiRoute : `${apiRoute}?${Object.keys(params.query).map(key => `${key}=${params.query[key]}`).join('&')}`
  const res = await fetch(url, {
    body: Object.keys(params.input).length === 0 ? undefined : params.input
  })
  const json = await res.json()
  return json as T
};
export const rpcAPI ={users:{greet:{query: async (query:{ name: string|undefined, message: string|undefined,}):Promise<{ greet: string,}>=>{return rpcCall({query},'/users')}}}}as const;