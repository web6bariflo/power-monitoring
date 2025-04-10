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
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Start Test</Link> |{" "}
          <Link to="/part-one">Part One</Link> |{" "}
          <Link to="/part-two">Part Two</Link>
        </nav>

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
