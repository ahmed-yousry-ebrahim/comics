# Commics Creator application
Consists of two parts 
- An API provider built with Ruby on Rails built using _Rails API gem_ 
- A front end client application built using AngularJS

**Runnig the application localy**
Just checkout the respository to your local machine 
- navigate to the application root folder
- run _bundle install_
- run _rake db:create && rake db:migrate_
- initiate the rails server using the command _rails s_
- navigate to the client folder and run _grunt serve_ and it will open a broswer running the angular application

**Running using docker**
This app is docker friendly.
- From the root application folder run `sudo docker build -t comics_image .
` to create the docker image
- Then run `docker run -d -p 3000:80 -e SECRET_KEY_BASE=secretkey comics_image` to create the docker container
- navigate on the host machine to `localhost:3000` and the application will be served


