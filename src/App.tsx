//package imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

//local imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Home,
  Details,
  Explore,
  SearchResults,
  PageNotFound,
} from "./pages/index";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
