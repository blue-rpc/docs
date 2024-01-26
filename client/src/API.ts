/* eslint-disable @typescript-eslint/no-explicit-any */
type Method = "GET" | "POST"
async function rpcCall<T>(
  apiRoute: string,
  method: Method,
  params?: { query?: any; input?: any },
  headers?: HeadersInit
): Promise<{ body: T; status: number; headers: Headers }> {
  const requestOptions: RequestInit = {
    method: method,
    headers: headers,
  };
  if (params?.input) {
    requestOptions.body = JSON.stringify(params.input);
  }
const host = "";
  let path = apiRoute;
  if (params?.query && Object.keys(params.query).length !== 0) {
    path += `?${Object.keys(params.query)
      .map(key => {
        if (key.includes('Slug')) {
          return '';
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(params.query[key])}`;
      })
      .join('&')}`;
  }
  const url = host + path
  const res = await fetch(url, requestOptions);
  const contentType = res.headers.get('content-type');
  let body: any;
  if (contentType?.includes('application/json')) {
    body = await res.json();
  } else if (contentType?.includes('text')) {
    body = await res.text();
  } else {
    body = await res.blob(); // or arrayBuffer, depending on the expected response
  }

  return { 
    body: body as T, 
    status: res.status, 
    headers: res.headers 
  };
}
export const rpcAPI ={api:{documentation:{files:{[`fileName`]:{query: async (query:{ fileNameSlug: string,},headers?: HeadersInit,):Promise<{body:{ structure: Array<{ type?: string, content?: any, id?: string,}>,},status: number, headers: Headers}>=>{return rpcCall(`/api/documentation/files/${query.fileNameSlug}`,'GET',{query},headers)}},}}}}as const;