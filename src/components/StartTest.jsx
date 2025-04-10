// src/components/StartTest.jsx
import React from "react";
import { useMqtt } from "../MqttContext";

const StartTest = () => {
  const { publishMessage } = useMqtt();

  const handleClick = () => {
    publishMessage("project/maintenance/command", "RUN_SELFTEST");
  };

  return (
    <div>
      <h2>publish mqtt id </h2>
      <button onClick={handleClick}>Start Test</button>
    </div>
  );
};

export default StartTest;
