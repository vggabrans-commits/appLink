HOW TO TEST IT
1. Open the server folder

Open the project folder and navigate to:

appLink/server
2. Open two separate PowerShell terminals

You will need two terminals:

Terminal 1: start the backend server
Terminal 2: send a test request

3. Start the backend

In the first terminal & ENTER:

   cd .\server

Then run:

   node server.js

You should see:

   Privacy Link Guard backend running on http://localhost:3000

Keep this terminal running.

4. Send a URL for analysis

Open the second PowerShell terminal and run:
   Invoke-RestMethod -Uri "http://localhost:3000/api/analyze" -Method POST -ContentType "application/json" -Body '{"url":"https://chililabs.io/"}'
The application will open the URL using Playwright and analyze its network activity.
5. Expected result
inputUrl : https://chililabs.io/ 
finalUrl : https://chililabs.io/ 
redirects : {} 
thirdPartyRequests : 4 
thirdPartyDomains : {googletagmanager.com, clarity.ms} 
title : Mobile App Development company | Award-winning apps | Chili Labs 
initialStatus : 200 
requestCount : 54 
responseCount : 46
The response also contains detailed information about individual network requests and responses.

Example request:

url          : https://chililabs.io/
method       : GET
resourceType : document
domain       : chililabs.io
thirdParty   : False

Example response:

url         : https://chililabs.io/
status      : 200
contentType : text/html; charset=utf-8

The complete response includes:

   inputUrl
   finalUrl
   redirects
   thirdPartyRequests
   thirdPartyDomains
   title
   initialStatus
   requestCount
   responseCount
   requests
   responses

What the demo shows
Privacy Link Guard currently demonstrates how a URL can be analyzed by:

1. Opening the target website in an automated browser.
2. Following redirects.
3. Monitoring network requests.
4. Identifying third-party domains.
5. Recording HTTP responses and status codes.
6. Returning the collected information as structured JSON.
Note: Privacy Link Guard is currently a prototype/demo. The results should not be considered a complete security or privacy assessment of a website.

