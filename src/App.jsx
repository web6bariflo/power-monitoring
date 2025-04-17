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
        <div className="min-h-screen p-6">
          {/* Navigation with button styles and gap */}
          <nav className="flex gap-52 mb-8 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow"
            >
              Start Test
            </Link>
            <div className="flex gap-6">
              <Link
                to="/part-one"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium shadow"
              >
                Part One
              </Link>
              <Link
                to="/part-two"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium shadow"
              >
                Part Two
              </Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<StartTest />} />
            <Route path="/part-one" element={<PartOne />} />
            <Route path="/part-two" element={<PartTwo />} />
          </Routes>
        </div>
      </Router>
    </MqttProvider>
  );
};

export default App;