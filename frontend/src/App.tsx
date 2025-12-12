import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "@/App.css";
import Products from "@/pages/Products";

function App() {
  useEffect(() => {
    document.title = "Assigment";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Products />} />
    </Routes>
  );
}

export default App;
