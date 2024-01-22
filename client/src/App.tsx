import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./routes/Index"
import Layout from "./components/Layout";
import Documentation from "./routes/documentation/Index"
import NotFound from "./routes/404"
import { getPageLayout } from "./lib/fetches";
import { Toaster } from "@/components/ui/toaster"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path : "/documentation/:slug*",
        element : <Documentation/>,
        loader: async ({ params }) => {
          if (!params.slug) return undefined
          return await getPageLayout(params.slug);
        },
        
      },
      {
        path : '/404',
        element : <NotFound/>

      }
     
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
