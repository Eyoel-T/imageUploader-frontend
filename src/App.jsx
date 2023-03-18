import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DisplayImage from "./pages/DisplayImage/DisplayImage";
import DisplayTable from "./pages/DisplayTable/DisplayTable";
import Upload from "./pages/upload/Upload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayImage />} />
        <Route path="/with-table" element={<DisplayTable />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
  s;
}

export default App;
