import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Hero from "./Hero";
import NotFound from "./notfound";
import Hero from "./fjs/canteen"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
            </>
          }
        />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;