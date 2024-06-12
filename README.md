# Home Security System Application

## Introduction

This application is written in Node.js with the Mustache frontend framework and uses the Sqlite3 database to store information. Users can register an account on this app, and all members can use the "unlock the door" function once registered. Users can also upload their photos, which can be used for face recognition on our camera. PubNub is utilized to transmit messages/commands to our tracking camera.

This application is part of our Home Security System project, which aims to enhance home safety using advanced technology. The project integrates various modules like motion detection, object tracking, access systems, and alert mechanisms to provide a comprehensive security solution.

The application is hosted on Heroku: [Smart Home](https://smart-home-c847e8fb2263.herokuapp.com/home).

## How to Run This App Locally

1. Download all the code files.
2. Install Node.js on your operating system. You can download it from [Node.js](https://nodejs.org/en).
3. Navigate to the application root folder.
4. Create an .env file to store the [PubNub](https://www.pubnub.com/) secret keys in the following format:
    - PUBNUB_PUBLISH_KEY='pub-c-xxx'
    - PUBNUB_SUBSCRIBE_KEY='sub-c-xxx'
    - PUBNUB_CHANNEL='smart-home'
    - PUBNUB_UUID='smart-home-uuid'  
5. Run the script `npm install` to get all required modules.
6. Run the script `node app.js` to execute the app.

## Project Overview

### Introduction

In an era where home security is paramount, integrating advanced technology to enhance safety measures is crucial. This project proposes the development of a smart security system using Raspberry Pi, a camera, a motion sensor, a servo motor, a buzzer, and a door lock mechanism for home security. The system will track detected individuals approaching the home, allowing authorized access via a pin code or fob key. A web server will be designed for online connectivity, enabling remote control of the security system.

### Modular Design

To make this project a real-world application, we aim to use modular design to ease the effort of connecting different modules together. The functional modules include:

- **Motion Detection System**: Utilizes ultrasonic sensors to detect the presence of individuals.
- **Camera Tracking System**: Builds a rotation mechanism with two degrees of freedom to track individuals within detection. The rotation mechanism will be enabled by a servo motor.
- **Host Recognition**: Utilizes a face recognition model to identify authorized individuals using the Husky AI camera or by training a deep learning model using PiCam or a webcam.
- **Door Locking System**:
  - **Simple Version**: Uses another servo motor or an LED light to indicate whether the door is locked or unlocked.
  - **Advanced Version**: Uses a solenoid door lock with a relay for a more practical application.
- **Gain Access**:
  - **Simple Version**: Uses a push button to gain access.
  - **Advanced Version**: Uses a keypad with a password or an RFID key card to gain access.
- **Alert Mechanism**: Integrates a buzzer and notification system to alert the host of any potential intrusion.
- **User-Friendly Interface**: Designs an interface for easy monitoring and control of the system, with remote control functionality for locking/unlocking and activating/canceling alarms.

### Methodology

1. **Hardware Setup**: Connect all required hardware to the Raspberry Pi and add an external power source.
2. **Software Development**: Program the Raspberry Pi to activate all hardware with proper GPIO setup.
3. **Tracking and Host Recognition Algorithm**: Implement object tracking and facial recognition algorithms using OpenCV, CNN, or a customized YOLO model.
4. **Alert System Integration**: Activate the buzzer upon intrusion detection and configure the system to send real-time alerts to a web account or cell phone via SMS.
5. **Interface Development**: Create a user interface for live feeds and data access.
6. **Testing and Optimization**: Test the system under various scenarios and optimize it for accuracy and speed.

### Expected Outcomes

- A fully functional smart security system capable of detecting and recognizing individuals approaching the house.
- Authorized individuals will be able to unlock the system and gain access, while alerts will be sent to the host for any potential intrusion.
- A user-friendly interface for the host to monitor and control the system, with reliable data storage and retrieval for historical visits.

### Potential Challenges

- Ensuring accurate and smooth operation for all functions.
- Balancing system responsiveness with power consumption.
- Securing the system against potential hacking or tampering.

### Sensors and Devices Needed

| Module                | Sensor/Actuator         | Qty | Note                                     |
|-----------------------|-------------------------|-----|------------------------------------------|
| Motion Detection      | Ultrasonic sensor (HC-SR04) | 1   | Available in Lab                         |
| Camera Tracking       | Pi Camera (or Husky AI Cam) | 1   | Available in Lab                         |
|                       | Micro Servo Motor (SG 90) | 2   | Available in Lab                         |
|                       | Pan Tilt Mechanism      | 1   | 3D Printing Needed                       |
| Door Locking          | Solenoid door lock      | 1   | Available on Amazon (CAD 31.99 4pcs)     |
|                       | Relay                   | 1   | Available in Lab                         |
| Gain Access           | RFID                    | 1   | Available in Lab                         |
| Alert                 | Buzzer                  | 1   | Available in Lab                         |
| Accessories           | Pin extension, additional power supply, jumper wires, LEDs | As needed | Available in Lab                         |

This project documentation and further details can be found in the project proposal document.

---
