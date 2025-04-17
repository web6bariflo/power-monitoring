import React from "react";
import { useMqtt } from "../MqttContext";

const PartTwo = () => {
  const { data, clearTopicData } = useMqtt();
  const messages = data["project/maintenance/test"] || [];
  console.log(messages);
  

  const handleReset = () => {
    clearTopicData("project/maintenance/test");
  };

  return (
    <div className="p-4 flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl border-4 border-blue-500 rounded-lg shadow-lg bg-white p-6 relative">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          Reset
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Topic: project/maintenance/test
        </h1>

        <div className="p-4 border border-gray-300 rounded bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">Waiting for data...</p>
          ) : (
            <div>
              <div className="mb-2 text-sm text-gray-600">
                Total messages: {messages.length}
              </div>
              <ul className="pl-5 max-h-[70vh] overflow-y-auto">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className="mb-2 p-2 bg-blue-100 border border-blue-300 rounded"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      Message #{index + 1} - {new Date(msg.time).toLocaleTimeString()}
                    </div>
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      {msg.value}
                    </pre>
                  </li>
                ))}

              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartTwo;