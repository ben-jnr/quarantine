# quarantine
<strong>quarantine management web app using MERN stack</strong>

<p>have node and mongodb installed on your local machine</p>

<p>to run this app :</p>
<ul>
  <li>clone it to your local machine</li>
  <li>install all the required npm packages</li>
  <li>open your mongo terminal using mongo/mongod command and type in the following commands</li>
  <ol>
    <li>use quarantine</li>
    <li>db.user.insertOne({username:"sam",password:"admin",type:"superadmin"})</li>
    <li>db.user.insertOne({username:"john",password:"admin",type:"admin"})</li>
  </ol>
  </ul>
  <ul>
  <li>Now you have two users ready sam as superadmin and john as admin,similarly type can have 5 different values</li>
  <ol>
    <li>superadmin</li>
    <li>admin</li>
    <li>dashboard</li>
    <li>airport</li>
    <li>institution //dont create this type manually, create as admin or superadmin</li>
  </ol>
  <li>now open the cloned app and inside server folder run the command npm run dev</li>
  <li>this will run react client at port 3000 and node at port 9000</li>
  <li>at port 3000 login with sam to use admin features else as john</li>
</ul>
