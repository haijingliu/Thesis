This project is designed to bring an alternative interaction experience for network communications, and engage participants to have a speculative concern on the interaction modes of social meida.

The internet Data is from Twitterstreaming live data, I used a npm module for REST and Streaming API on node https://github.com/ttezel/twit

Physical Interface is designed with an arduinoFio（http://arduino.cc/en/Main/ArduinoBoardFio), RN-XV WiFly Module (https://www.sparkfun.com/products/10822) and a triple axis accelerometer（https://www.sparkfun.com/products/9269）

In order to make the interface and internet connect via a wifi environment , I used wiflyHQ lirary https://github.com/harlequin-tech/WiFlyHQ

I get the Z-rotation data on the accelerometer. since, a real-time twitter datavis requires a communication of Transmission Control Protocol. In this case, I required the websocketAPI that provides full-duplex communication channels over TCP connection, and allows my physical interface sensorData get handshake with the server.

for more information please check:
http://haijing.info/Portfolio/?page=copterwish


special Thanks to Joe Saavedra https://github.com/jmsaavedra for tech side Instructions, Wen Ting Zhang https://github.com/wentin


