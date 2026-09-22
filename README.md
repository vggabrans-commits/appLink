HOW TO TEST IT .
1) OPEN ,,server,, folder
2) Open Two separate terminals
3) First terminal type
   3.1) PS C:\Users\zlavi\OneDrive\Desktop\appLink> cd .\server
   3.2) PS C:\Users\zlavi\OneDrive\Desktop\appLink\server> node server.js
4) Second terminal  Invoke-RestMethod -Uri "http://localhost:3000/api/analyze" -Method POST -ContentType "application/json" -Body '{"url":"Invoke-RestMethod -Uri "http://localhost:3000/api/analyze" -Method POST -ContentType "application/json" -Body '{"url":"https://chililabs.io/"}'
5) YOU MUST GET THIS DATA
inputUrl           : https://chililabs.io/
finalUrl           : https://chililabs.io/
redirects          : {}
thirdPartyRequests : 4
thirdPartyDomains  : {googletagmanager.com, clarity.ms}
title              : Mobile App Development company | Award-winning apps | Chili Labs
initialStatus      : 200
requestCount       : 54
responseCount      : 46
requests           : {@{url=https://chililabs.io/; method=GET; resourceType=document; domain=chililabs.io; thirdParty=False}, 
                     @{url=https://chililabs.io/_next/static/css/c39f18cdca1206f3.css; method=GET; resourceType=stylesheet; domain=chililabs.io; 
                     thirdParty=False}, @{url=https://chililabs.io/_next/static/css/706e79a094b4a8e8.css; method=GET; resourceType=stylesheet; 
                     domain=chililabs.io; thirdParty=False}, @{url=https://chililabs.io/_next/static/chunks/8711-28c88f34dabe6723.js; 
                     method=GET; resourceType=script; domain=chililabs.io; thirdParty=False}...}
responses          : {@{url=https://chililabs.io/; status=200; contentType=text/html; charset=utf-8}, 
                     @{url=https://chililabs.io/_next/static/css/c39f18cdca1206f3.css; status=200; contentType=text/css; charset=UTF-8}, 
                     @{url=https://chililabs.io/_next/static/css/706e79a094b4a8e8.css; status=200; contentType=text/css; charset=UTF-8}, 
                     @{url=https://chililabs.io/_next/static/chunks/8711-28c88f34dabe6723.js; status=200; contentType=application/javascript; 
                     charset=UTF-8}...} 
