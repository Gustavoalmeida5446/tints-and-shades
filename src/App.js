import { Routes, Route } from "react-router-dom";
import Home from "./Home";  
import ColorPage from "./ColorPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/color/:colorHex" element={<ColorPage />} />
    </Routes>
  );
}

export default App;
