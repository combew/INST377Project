# INST377Project
This project was made by Judah Kamadinata, Steven Nguyen, Hayden Kim, and Kibron Tesfatsion

# Title: Wicked Weather Project

# Description:
Our project is a website with 3 pages that perform various JS library and API calls to a database server. This website targets the Chrome web browser.
Use url https://inst-377-project-git-main-combews-projects.vercel.app/ to access it!

# Developer Manual
## Installing Application and Dependencies
We used HTML, CSS, JS, Node, Express, and, Supabase, and Vercel throughout this project. Once you install nvm and node in your terminal, enter npm init, node index.js, nodemon index.js, npm install express, npm install nodemon, and npm install @supabase/supabase-js into your vscode terminal. To start the server, type npm start into your VSCode terminal (make sure your working direction is the project folder)
## Server API
### Getting Data
You can access the table by sending a GET fetch request to: https://inst-377-project-zeta.vercel.app/feedback.
You will receive a JSON array as a response, and you can iterate through it to access the name and feedback attributes.
### Posting Data
You can add data to this table by sending a POST fetch request to: https://inst-377-project-zeta.vercel.app/add, and add a "name" and "feedback" attribute to your request body.
