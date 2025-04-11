// src/components/StartTest.jsx
import React from "react";
import { useMqtt } from "../MqttContext";
import { useState } from "react";

const StartTest = () => {
  const { publishMessage } = useMqtt();
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    publishMessage("project/maintenance/command", "RUN_SELFTEST");
    setShowMessage(true);
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className=" w-[500px] h-screen flex flex-col rounded-md shadow-xl mx-auto mt-5 bg-white">
        {/* <h2 className="text-xl mb-4">Publish MQTT ID:</h2> */}
        <div className="flex flex-col items-center justify-center mt-20">
          <button
            onClick={handleClick}
            className="bg-red-600 w-48 justify-center text-center px-4 py-2 rounded-xl text-white hover:bg-red-700 transition"
          >
            Start Test
          </button>

          {showMessage && (
            <div className="mt-6 text-black-600">RUN_SELFTEST</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartTest;
