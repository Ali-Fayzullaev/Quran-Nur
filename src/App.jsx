import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Section from "./pages/Section";
import "./App.css";
import Surah from "./pages/Surah";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Section />,
      },
      {
        path: "surah/:numberSurah",
        element: <Surah />, // Бу RootLayout дан ташқарида
      }
    ],
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
