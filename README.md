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
- From the root application folder run `docker build -t comics_image .
` to create the docker image
- Then run `docker run -d -p 3000:80 -e SECRET_KEY_BASE=secretkey comics_image` to create the docker container
- navigate on the host machine to `localhost:3000` and the application will be served


**The Problem**

Implement a Ruby on Rails application for the creation of comic strips

- One comic strip is made out of 1 to 6 images. Each image can also contain text.
- User uploads these images to the service. he can enter text and re-order the images in the service. 
- Once ready, the user publishes the comic strip and it can be shared by a dedicated url.

The editing should be implemented as a Single Page Application using a REST backend on the Ruby side. You are free to use whatever frontend technologies you wish.


bonus points for:
- Angular used in the frontend
- Possibility to use camera to take the images on mobile
- Good metadata (sharing, assistive technologies) on the comic page
- Dockerfile for running the service locally