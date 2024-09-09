# MVC-techblog

## Description
 This is an application called MVC Techblog that functions as a blog for the composing, updating and deletion of blog posts. It employs an Express.js backend, a Postgress database and Handlebars for rendering the frontend.  

## Table of contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  
## Installation
No installation is required as this is an deployed application via render.com.  
  
## Usage
The application can be accessed at: https://mvc-techblog-dk8f.onrender.com/

Per the screenshot of the application below, when the application is opened you are presented with a list of existing blogs including a title and content for a blog post, along with the user and the post's creation date. By clicking on any existing post, you will be taken to view of that post where you can add one or more comments. Note that you will have to be logged on before you can add a comment. 

![Screenshot 2024-09-09 at 10 51 01 pm](https://github.com/user-attachments/assets/7d9bdfcf-0952-42b4-981e-fe4862ffa24e)

There is a list of navigation links along the top that will allow you to get to the home page, view your dashboard, or login to the application. You won't be able to view a dashboard without logging on first. You can log on by either selecting the your dashboard or login navigation links. Once the selection of either, you will be presented with a login screen where you can enter a username and a password. If you do not have an existing username and password, you can click on the link "sign up instead" and you will be taken to sign up form to complete as such. Once you have signed up, you will be taken back to the login page to log onto the app. Once succesfully logged on you will be presented with a Your Dashboard page. The logged on session only lasts for 5 minutes, thereafter you will need to log back in order to use any function that requires a signed in session.

On the Your Dashboard page, you will be shown a form to create a new post on the left, and your current posts on the right. If you are a new user, you won't have any current posts. Once completing the fields of a new post and clicking submit, your new post will appear on the right of the page. On the right hand side, you have the option to either click on an existing post, or delete it by clicking on the red bin. If you clck on an existing post, you have the option of editing the post. You can change either the title or content of the post an commit your changes by clicking on update post. Therafter you be returned to the your dashboard page. Note that you only have the ability to edit or delete your own posts.

If you click back on home, you will see that your new post appears alongside the other existing posts. All posts, comments and users are committed to a backend Postgres database that will allow the data to persist beyond the opening and closing of the application.

Although the application comprises several API routes for it is not recommended that you employ API tools like Postman or Insomnia to do so. All routes are intended operate within the app, along with an existing user session.




## Contributing
All backend express.js code, and frontend handlebars code either written or refactored by Warren Shan. Several code snippets come from various other sources which I did not keep track of.
  
## License
None
