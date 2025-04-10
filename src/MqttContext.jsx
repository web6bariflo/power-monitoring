// src/MqttContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import mqtt from "mqtt";

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("mqttData")) || {
      "project/maintenance/status": [],
      "pump/alerts": [],
    };
  });

  useEffect(() => {
    const mqttClient = mqtt.connect({
      hostname: "mqttbroker.bc-pl.com",
      port: 443,
      protocol: "wss",
      path: "/mqtt",
      username: "mqttuser",
      password: "Bfl@2025",
      clientId: "project/maintenance/command", // publisher ID
    });

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT Broker");
      mqttClient.subscribe(["project/maintenance/status", "pump/alerts"]);
    });

    mqttClient.on("message", (topic, message) => {
      const newMessage = {
        time: new Date().toISOString(),
        value: message.toString(),
      };

      setData((prevData) => {
        const updatedData = {
          ...prevData,
          [topic]: [...(prevData[topic] || []), newMessage].slice(-300),
        };
        localStorage.setItem("mqttData", JSON.stringify(updatedData));
        return updatedData;
      });
      console.log(`📩 Message received on ${topic}:`, message.toString());
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const publishMessage = (topic, message) => {
    if (client && client.connected) {
      client.publish(topic, message);
      console.log(`🚀 Published to ${topic}:`, message);
    } else {
      console.warn("❌ MQTT client not connected");
    }
  };

  // MqttContext.jsx (append inside MqttProvider)
const clearTopicData = (topic) => {
  setData((prevData) => {
    const updatedData = {
      ...prevData,
      [topic]: [],
    };
    localStorage.setItem("mqttData", JSON.stringify(updatedData));
    return updatedData;
  });
};


  return (
    <MqttContext.Provider value={{ data, publishMessage, clearTopicData }}>
    {children}
  </MqttContext.Provider>
  
  );
};

export const useMqtt = () => useContext(MqttContext);
