<h1 align="center"><a href="https://devsblog.herokuapp.com/">devBlog</a></h1>

<h3 align="center">devblog is an blog website user can publish their blog post</h3>

# Tech Stack 📋
  
  1. `next.js`
  2. `express.js`
  3. `mongodb`
  4. `apollo`
  5. `graphql`

# How to run locally 
  
  1. Create `.env` file and paste below code.
     
     <pre>
      <code>
          PORT: 3000,
          GOOGLE_CLIENTID: Your Google client ID,
          GOOGLE_CLIENTSECRET: Your Google client screct code,
          MONGO_URI: Your mongo uri,
          SESSION_SECRET: your session secret
          LOCAL_URL = http://localhost:3000/
          PRODUCTION_URL = Your Production URL
          LOCAL_CALLBACK_URL = Your local callback URL
          PRODUCTION_CALLBACK_URL = Your Production callback URL
      </code>
     </pre>
     
   2. To get Google clientID and Google client secrect you must create oauth in [Google Developer Console](https://console.developers.google.com)
   3. Authentication is done through google-oauth20.
   4. Run the following command `npm install`
   5. To run client run below command
      > npm run client
   6. To run both Client and Server run below command
      > npm run server

## Information

   Application design will look as dev.to with some little changes in styles.

## App Info

<h3>License</h3>

<h4>This project is licensed under the MIT License</h4>

  

