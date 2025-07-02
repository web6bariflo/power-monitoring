import React from "react";
import { useMqtt } from "../MqttContext";
import { useState } from "react";

const StartTest = () => {
  const { publishMessage } = useMqtt();
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    publishMessage("project/BFL_PomonA001/maintenance/command", "RUN_SELFTEST");
    setShowMessage(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
        Device Self-Test
      </h2>
      <button
        onClick={handleClick}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
      >
        Start Test
      </button>
    </div>
  );
};

export default StartTest;