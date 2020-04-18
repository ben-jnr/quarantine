# quarantine
<strong>quarantine management web app using MERN stack</strong>

<p>have node and mongodb installed on your local machine</p>
<p>install all the required npm packages</p>

<p>to run this app :</p>
<ul>
  <li>clone it to your local machine</li>
  <li>open your mongo terminal using mongo/mongod command and type in the following commands</li>
  <ol>
    <li>use quarantine</li>
    <li>db.user.insertOne({username:"sam",password:"admin",admin:"y")}</li>
    <li>db.user.insertOne({username:"john",password:"admin",admin:"n")}</li>
  </ol>
  </ul>
  <ul>
  <li>Now you have two users ready sam as admin and john as normal user</li>
  <li>now open the cloned app and inside server folder run the command npm run dev</li>
  <li>this will run react client at port 3000 and node at port 9000</li>
  <li>at port 3000 login with sam to use admin features else as john</li>
</ul>
