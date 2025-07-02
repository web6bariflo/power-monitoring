import React from "react";
import { useMqtt } from "../MqttContext";

const Sensor = ({ name, status }) => (
  <div className="flex justify-between items-center py-2 px-4">
    <span className="text-gray-700 font-medium">{name}</span>
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
      status === "Working" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}>
      {status}
    </span>
  </div>
);

const SensorGroup = ({ title, sensors }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">{title}</h3>
    <div className="space-y-2">
      {Object.entries(sensors).map(([name, status]) => (
        <Sensor key={name} name={name} status={status} />
      ))}
    </div>
  </div>
);

const PartOne = () => {

  const { data, clearTopicData } = useMqtt();
  
  const messages = data["project/BFL_PomonA001/maintenance/status"] || [];
  console.log(messages);
  const latestMessage = messages.length > 0 ? messages[messages.length - 1].value : null;
  console.log(latestMessage);

  const parseMessage = (message) => {
    const parsed = {
      currentMainOne: { R: "Not Working", Y: "Not Working", B: "Not Working" },
      currentMainTwo: { R: "Not Working", Y: "Not Working", B: "Not Working" },
      adcMainOne: "Not Working",
      adcMainTwo: "Not Working",
      relayStarter1: "Not Working",
      relayStarter2: "Not Working",
      ledR: "Not Working",
      ledY: "Not Working",
      ledB: "Not Working",
      mqttStatus: "Not Working"
    };
  
    if (!message) return parsed;
  
    message.split(';').map(s => s.trim()).filter(s => s).forEach(section => {
      if (section.includes("CurrentSensor MainOne")) {
        // Updated to check for both "R= Working" and "R=Working"
        parsed.currentMainOne.R = /R=\s?Working/.test(section) ? "Working" : "Not Working";
        parsed.currentMainOne.Y = /Y=\s?Working/.test(section) ? "Working" : "Not Working";
        parsed.currentMainOne.B = /B=\s?Working/.test(section) ? "Working" : "Not Working";
      }
      else if (section.includes("CurrentSensor MainTwo")) {
        parsed.currentMainTwo.R = /R=\s?Working/.test(section) ? "Working" : "Not Working";
        parsed.currentMainTwo.Y = /Y=\s?Working/.test(section) ? "Working" : "Not Working";
        parsed.currentMainTwo.B = /B=\s?Working/.test(section) ? "Working" : "Not Working";
      }
      // Rest of the parsing logic remains the same...
      else if (section.includes("ADC MainOne")) {
        parsed.adcMainOne = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("ADC MainTwo")) {
        parsed.adcMainTwo = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("Relay (Starter 1)")) {
        parsed.relayStarter1 = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("Relay (Starter 2)")) {
        parsed.relayStarter2 = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("Led_R")) {
        parsed.ledR = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("Led_Y")) {
        parsed.ledY = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("Led_B")) {
        parsed.ledB = section.includes("Working") ? "Working" : "Not Working";
      }
      else if (section.includes("MQTT")) {
        parsed.mqttStatus = section.includes("Working") ? "Working" : "Not Working";
      }
    });
  
    return parsed;
  };

  const sensorData = parseMessage(latestMessage);

  const handleReset = () => {
    clearTopicData("project/BFL_PomonA001/maintenance/status");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Ping Status</h1>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {!latestMessage ? (
          <p className="text-gray-500">No data yet.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SensorGroup
                title="Current Sensor - Main One"
                sensors={sensorData.currentMainOne}
              />
              <SensorGroup
                title="Current Sensor - Main Two"
                sensors={sensorData.currentMainTwo}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <SensorGroup
                title="ADC Sensors"
                sensors={{
                  "Main One": sensorData.adcMainOne,
                  "Main Two": sensorData.adcMainTwo
                }}
              />
              <SensorGroup
                title="Relays"
                sensors={{
                  "Starter 1": sensorData.relayStarter1,
                  "Starter 2": sensorData.relayStarter2
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <SensorGroup
                title="LED Indicators"
                sensors={{
                  "R": sensorData.ledR,
                  "Y": sensorData.ledY,
                  "B": sensorData.ledB
                }}
              />
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">System Status</h3>
                <Sensor name="MQTT Connection" status={sensorData.mqttStatus} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartOne;