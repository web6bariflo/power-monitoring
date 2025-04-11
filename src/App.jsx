// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MqttProvider } from "./MqttContext";
import StartTest from "./components/StartTest";
import PartOne from "./components/PartOne";
import PartTwo from "./components/PartTwo";

const App = () => {
  return (
<MqttProvider>
  <Router>
  <div className="flex flex-row items-center justify-center gap-86 mt-6 mb-6">
  {/* Start Test Button */}
  <Link
    to="/"
    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:bg-blue-800 text-center"
  >
    Start Test
  </Link>

  {/* Part Buttons */}
  <div className="flex flex-row gap-4">
    <Link
      to="/part-one"
      className="bg-green-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-green-800 transition duration-200 text-center shadow"
    >
      Part One
    </Link>
    <Link
      to="/part-two"
      className="bg-green-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-green-800 transition duration-200 text-center shadow"
    >
      Part Two
    </Link>
  </div>
</div>



    <Routes>
      <Route path="/" element={<StartTest />} />
      <Route path="/part-one" element={<PartOne />} />
      <Route path="/part-two" element={<PartTwo />} />
    </Routes>
  </Router>
</MqttProvider>

  );
};

export default App;
