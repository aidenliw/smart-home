# Home Security System Application

## Introduction

This application is written in Node.js with the Mustache frontend framework and uses the Sqlite3 database to store information. Users can register an account on this app, and all members can use the "unlock the door" function once registered. Users can also upload their photos, which can be used for face recognition on our camera. PubNub is utilized to transmit messages/commands to our tracking camera.

This application is part of our Home Security System project, which aims to enhance home safety using advanced technology. The project integrates various modules like motion detection, object tracking, access systems, and alert mechanisms to provide a comprehensive security solution.

The application is hosted on Heroku: [Smart Home](http://www.smart-home-app.site).

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

### Modules and Implementation

#### Smart Home System: Remote Control Web Application

**Overview**
The web application is built using Node.js with the Mustache framework and SQLite for database management. It leverages the PubNub library for real-time communication to control hardware components such as the door lock and camera. The application consists of eight pages: Home, Door, Camera, Member, Admin, Log, About, and Login/Register.

**Hosting and Source Code**
- The application is hosted and can be accessed on [Heroku](https://smart-home-c847e8fb2263.herokuapp.com).
- The source code is open-sourced and available on [GitHub](https://github.com/aidenliw/smart-home).

**Programming Technology**
- **Node.js and Mustache**: Used for server-side scripting and rendering dynamic web pages.
- **SQLite**: Stores user credentials securely, with hashed passwords to enhance security.
- **PubNub**: Facilitates real-time communication between the web application and hardware components.

**Web Application Pages**
- **Home Page**: Provides a brief introduction to the project and its functionalities.
- **Door Page**: Allows users to lock and unlock the door using two buttons.
- **Camera Page**: Users can adjust the camera angle using arrow buttons, activate/deactivate the auto-tracking function, and reset the camera to its initial position. Additionally, this page includes a window to display real-time streaming from the camera, allowing users to see live footage as they control the camera.
- **Member Page**: Users can update a portrait for their account.
- **Admin Page**: Administrators can manage user accounts, including changing account levels and deleting accounts/portraits.
- **Log Page**: Available to administrators, this page logs user actions such as account registration, door lock/unlock events, and camera activation/deactivation.
- **About Page**: Introduces team members, highlighting their skills and contributions to the project.
- **Login/Register Page**: Facilitates user registration and login.

**User Authentication and Authorization**
The application implements a role-based access control system:
- **Unauthenticated Users**: Can access Home, About, and Login/Register pages.
- **Member Level Users**: Have access to Home, About, Door, Camera, Member, and Login/Register pages.
- **Admin Level Users**: In addition to member access, admins can access the Admin and Log pages.

**Database Design**
The SQLite database stores user credentials, including usernames, passwords, and user portraits. Each user has an assigned role that determines their access level.

**Real-time Control with PubNub**
The PubNub library is integral to the application's real-time control capabilities:
- **Door Control**: Sends commands to lock or unlock the door.
- **Camera Control**: Sends commands to adjust the camera angle, toggle the auto-tracking feature, and stream real-time video footage to the Camera page.

**Challenges and Solutions**
- **Real-time Communication**: Ensuring seamless and secure communication with hardware components required extensive testing and optimization.
- **User Authentication**: Implementing robust authentication mechanisms to prevent unauthorized access was crucial.
- **Database Security**: Protecting user data, especially passwords, was addressed by using hashing and secure storage practices.

**Conclusion**
The web application for our smart home system provides an intuitive and secure interface for managing home security functions. Its modular design allows for easy integration with various hardware components, enhancing the overall functionality and user experience.

**Future Work**
Future enhancements could include:
- **Enhanced Security Features**: Implementing two-factor authentication for added security.
- **Mobile App Integration**: Developing a mobile application to complement the web interface.
- **Expanded Functionality**: Adding more control features for other smart home devices.

### Design and Development Stages

1. **Research**: Analyze existing systems and identify potential improvements.
2. **Planning**: Design the architecture of the system, including hardware and software components.
3. **Development**: Implement the modules and integrate them into the system.
4. **Testing**: Test the system under various scenarios and optimize it for accuracy and speed.

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
