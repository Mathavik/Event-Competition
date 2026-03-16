import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ✅ User Routes: Header & Footer inga mattum dhaan varum */}

        <Route path="about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;