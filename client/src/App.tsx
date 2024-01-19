import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./routes/Index"
import Layout from "./components/Layout";
import Documentation from "./routes/documentation/Index"


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
        path : "/documentation",
        element : <Documentation/>
      }
     
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
