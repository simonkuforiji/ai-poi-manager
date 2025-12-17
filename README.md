### AI- Enhanced POI Manager
#### How to run the app
- Rename all "env.txt" files to ".env"
- Open two terminals
#### To run the web server, run the commands below in the first terminal
- cd poi-api
- npm install
- npm start
- You should see: "Server is Running on http://localhost:9100."

#### POI(Point of Interest) data can be sent to the webserver, to be stored, displayed and managed from the UI dashboard, using this endoint:
- http://localhost:9100/api/poi/database

#### To run the User interface, run the commands below in the second terminal
- cd poi-web
- npm install
- npm start
- Go to http://localhost:3100 in your web browser and you should see the UI dashboard

#### App Demo
https://drive.google.com/file/d/1oUiUjgsK5TC6ft1aRjOJQzxsYZ7fm1-t/view?usp=sharing
