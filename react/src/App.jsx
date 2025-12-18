import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Hero from "./Hero";
import Canteen from "./Canteen";
import NotFound from "./notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Canteen />
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;