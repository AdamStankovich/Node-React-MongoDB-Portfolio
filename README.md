Personal portfolio, built using Node, Express, React, MySQL

Live deployed version can be found here: https://adamstankovich.herokuapp.com/

NOTE: MongoDB database has since closed, admin features nolonger functional

# Project Overview

The goal of this project is to create a functioning web application hosted on Heroku, a platform
as a service (PaaS) that enables developers to build, run, and operate applications entirely in the
cloud. The application will utilize React.js and Node.js as its primary two functioning languages,
while using MongoDB for the backend database. React.js is a Javascript library focused on
optimizing the reusability of individual components within a website. React works by monitoring
and manipulating elements within a virtual Document Object Model (DOM). In turn, React
updates the real DOM, on the front end of the webpage. In other words, individual elements are
monitored and updated independently, creating more optimized functionality. React.js works
together with Node.js, which will utilize Express.js as a server in order to host the application.
Express.js is a Node.js based framework that acts as a middleman between incoming and
outgoing traffic. It is used to parse and manipulate data to be routed where it needs to go. The
server will also communicate with MongoDB in order to keep an active log of user activity for
security purposes, a user system for application administration, and a log of messages and email
addresses sent by users.

## Table of Contents

- Project Overview
- Table of Contents
- Design and Structure of the Application
- Application Initialization
- Server / Database 
- Client 
- Progress / Problems

## Design and Structure of the Application

The application starts with the Node / Express server. The server will listen for web traffic on a
particular port (3001) which is then navigated to either the React build or to MongoDB.
Depending on what type of request it receives, it will send the traffic to one or the other via a
proxy. The data received is parsed by Express quickly and its path is then routed by Node. If the
data is not related to the front end of the website it will route the traffic to the database in order to
interact with it. Any other requests are sent to the React build. The React build is a compiled
script that is being manipulated and displayed as the index.html page. The components of the
application are stored in many subdirectories and sent to be compiled by React within the live
build running on the Heroku cloud. I have created the diagram below in order to help visualize
the structure of how these technologies will work together in the finalization of the project.

To initialize development, the required technologies were installed. Node Package Manager
(NPM) is installed along with Node.js. Once these are installed the command “npm init -y” is run
to create a package.json file. This file is required to manage both scripts and dependencies within
the app. The command “npm i express” is run in the terminal to install Express.js into the application.
To initialize React, a command “npm create-react-app client” is run which our package manager
(NPM) uses to initialize a React application along with all of its required dependencies.

Since I am using react, I have the ability to add more libraries for use within the application. The
first of those being MaterialUI core and icons, in order to import scalable icons for the front end
of the website.
Another library I’ll be using for a particular typing animation on the homescreen of the website
is called iTyped by Luis Vinicius. This will be used to display different programming languages
that I am familiar with on the homepage of the application.

As the application will be hosted on heroku, certain git commands are used to push
developments. This includes _git add_ , _git commit -m"commit"_ , and _git push heroku master._
When the developments are pushed using git, heroku runs the command “ _cd client && npm
install && npm run build_ ” which initializes the Reactbuild within the server.
Lastly, “react-router-dom” is installed, as it is necessary to be able to route between components
within the React application.


## Server / Database

A database for the project is initialized on MongoDB, accessible through Mongo Atlas, which is
a web based GUI built around Mongo. “Collections,” that act as a “table” in MySQL, are created
including _users_ , _logs_ , and _messages_. These will beused for logging user activity on the website,
receiving messages from users, as well as creating a way for administrators to login.
Within our server, we connect to MongoDB using some lines of code provided by Mongo’s
website, while substituting the credentials for our own.

Within our main directory, there will be a “server” and a “client” folder. Within the server folder,
exist the package-lock.json (file which includes all dependencies) for Node.js / Express.js, as well as the file
which acts as the server (index.js). Express is required into the file and the server is  configured to 
listen for any requests on port 3001. When requests are received, the server will redirect the traffic
to the React build currently running on Heroku. Whenever the server receives a request, 
variables are created which store information from the header of the user's request. 
This includes the type of browser they're using, their operating system, their IP address, 
and the time that the request was made. These variables are then stored within an object called “log” that we 
will use to insert the activity into the database.

We connect to the database using our MongoDB variable we created earlier, and test for errors. If
there is no error, we look for the database titled “capstone” and a collection within the database
named “logs”. Our log object is then inserted into the table and the connection with the database
is closed.

There is a contact page within the application where a user can send a message. This message
along with their email address will be sent to MongoDB and stored within a collection named
“messages.” In order to insert this data into the collection, a post function is created on the server
which will contact the client side script and use the data submitted in order to insert it into the
database.

In order for administrators to login to the website and access the data from MongoDB without
having to directly open the database, a login function was created. This component can be
accessed by clicking the “logo” (>Adam Stankovich) in the top left of the page.

Clicking this link directs the user to “/login” which is a route designated on App.js in React.
Using routes, the application doesn’t need to refresh, but just loads the “<Login />” component
by itself. Login.jsx contains a simple form with a username/password field. If the user correctly enters the
password they are redirected to /admin using routes as seen in the image above.
(client side script for login)

The data from the form in the contact component is posted to /Login. This data is received by the
server, which looks for a match within the “users” in the database. If the credentials entered by
the user result in a positive match, the user is redirected to /admin and able to access the
information stored within MongoDB.

Once the user is directed to /admin, two functions are run within the server. These functions are
identical except for the database they are accessing. The first function accesses the “messages”
collection, while the second accesses the “logs” collection. The data received from MongoDB is
then sent back to React as a “response” within the functions.

## Client

The client, (React), is in a separate directory from the server. When traffic is redirected from 
Node.js to our React build, the initial point of entry is index.js.
This file renders all the information from App.js and displays it in “Strict Mode”. Strict mode is
a tool which does not does not render any visible UI, but logs potential problems in the
application.
Index.js
Within App.js, (the main component that index.js is rendering), all of our other components from
the application are called to the file from throughout our application structure. This includes our
top bar, intro page, portfolio page, portfolio list, works page, contact page, login page, admin
page, and the menu. The menu is set to a “closed” state, and the rest of the components are
rendered below. The function is then exported as “App”.

Although most components are rendered immediately, <Login /> and <Admin /> are held within
a Router component. This router doesn’t render these components until a user has activated it, so
the login and admin pages are initially “hidden.”

As to go in order for the components of the application, first up is Topbar.jsx. This component
contains a wrapper which encases my name and an animated “hamburger menu.” The hamburger
menu has three spans on the page which are colored. Using the OnClick() function, we can make
the application do things when certain objects are clicked. In this instance, when the closed menu
is clicked, the topbar.scss file is used to create an animation on the hamburger menu, as well as
display our Menu.jsx component.

The menu that is opened contains a list of clickable components within the home page. This
includes “Intro,” “portfolio,” “works,” and “contact.” Clicking on each link directs the user to the
selected component within the application and closes the menu.

On the landing page of the application, “Intro.jsx” is displayed. This intro contains the library
referenced earlier, “ityped.” Parameters within the function are used to list different languages
that I am familiar with. This component also contains some basic text and an image meant to be
used to introduce myself. The page is split into 2 halves, a right and a left. The left contains an
image and design while the right contains the ityped library as well as some text.

The portfolio component is displayed next, under the introduction. This portfolio displays
multiple sets of data used to show previous projects as examples and provide a link to each of
them. (Some of the datasets in the image below are collapsed to save space).
Data.js (used for portfolio.jsx)
However, the data is not all displayed at once. It is split up into five items in a list. This includes
“ _lastest_ ,” “ _personal_ ,” “ _freelance_ ,” “ _professional_ ,”and “ _other_ .”

Next comes the works component. This component is meant to display professional experience I
have had. The information is stored in a “slider,” which is a stylized object that looks through a
dataset stored in the function. As of now, this dataset contains 3 examples. The function allows
the user to click on arrows on either side of the screen to scroll through each one. The examples
contain job descriptions, an image, and a reference link that leads to my previous boss’s
LinkedIn accounts or other means of contact.


The contact component is displayed last on the application. This component contains a form with
an email and message field as well as a submit button. When the user submits the form, the
“handleSubmit” function is activated which posts the data to the URL. This data is parsed by
express and saved within the database.

For ease of access, the data stored within MongoDB is displayed for administrators within the
website. If a user clicks the “>Adam Stankovich” in the top left of the page, a route is activated
which loads the login component. The login component works similarly to the Contact
component, but needs to verify the information sent by the user matches what is stored in the
database before navigating to the administrator component. In order to do this, the function
assigns the data to variables and posts the variables to /Login. Express.js receives and parses this
data, and then Node.js runs it against the database to look for a match. If a match is found, a
successful response is sent to Login.jsx, (the client). The client then navigates the user to the

Once the user has successfully logged in, the application is routed to the Admin component. On
this component, two datasets are received from the database as seen in the server section of this
report: messages and logs. The function waits for a response from the server containing the
requested data, and then displays it on the page. These datasets are displayed in a list fashion,
allowing administrators to see what messages have been sent from the Contact form, and what
user sent them.


## Progress / Problems

One of the biggest issues encountered in this project was hosting. Initially, I was going to use a
Google Cloud VM and run the application from there. This caused many problems letting Node
and React communicate with each other. Eventually I had to find another approach, which is
when I discovered Heroku. Once I learned how Heroku worked, things went much smoother and
development was much faster. Unfortunately, I didn’t discover Heroku until I was over halfway
done with the project, so the first half of this project was a lot more tedious than it needed to be.
A still outstanding issue is that users can access ‘/Admin’ without actually having to login. I will
need to change the authentication system to use cookies and tokens instead of the standard
username verification method I am currently using.
During development, one of the biggest recurring issues was the concept of asynchronous
javascript functions. It was hard to wrap my head around how to ensure the scripts are running in
the right order and at the right time. Communication between React and Node became an issue
due to this, since sometimes React needed to wait for a response from Node before displaying
information, (like on the Login/Admin pages.) As for the rest of the project, everything ended up
working out according to plan, and the application is virtually finished. Right now it is filled with
placeholder examples and images until I have started my career. Once I have more information
about my professional life I will be able to fill out the application with that information instead
of placeholders.


