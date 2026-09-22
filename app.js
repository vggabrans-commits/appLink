const input = document.querySelector(".data_input");
const startButton = document.querySelector(".start");

const securityScore =
document.querySelector("#securityScore");

const privacyScore =
document.querySelector("#privacyScore");

const securityRisk =
document.querySelector("#securityRisk");

const privacyRisk =
document.querySelector("#privacyRisk");

const domainElement =
document.querySelector("#domain");

const protocolElement =
document.querySelector("#protocol");

const trackingElement =
document.querySelector("#tracking");

const shortUrlElement =
document.querySelector("#shortUrl");

const detectionsElement =
document.querySelector("#detections");

const statusElement =
document.querySelector("#status");

startButton.addEventListener(
"click",
startAnalysis
);

/*

# START ANALYSIS

*/

function startAnalysis() {

const value = input.value.trim();

if (!value) {

    setStatus("Please enter a link.");

    return;
}


let url;

try {

    url = new URL(value);

} catch {

    setStatus("Invalid URL.");

    return;
}


setStatus("Analyzing...");


const result =
    analyzeUrl(url);


displayResult(result);

}

/*

# URL ANALYZER

*/

function analyzeUrl(url) {

let security = 100;
let privacy = 100;


const result = {

    url: url.href,

    domain: url.hostname,

    protocol: url.protocol
        .replace(":", "")
        .toUpperCase(),

    security: 100,

    privacy: 100,

    trackingParameters: [],

    shortUrl: false,

    suspiciousKeywords: [],

    detections: []

};


/*
========================================
HTTPS
========================================
*/

if (url.protocol !== "https:") {

    security -= 25;

    result.detections.push({

        type: "warning",

        text:
            "Connection does not use HTTPS."

    });

} else {

    result.detections.push({

        type: "safe",

        text:
            "HTTPS connection detected."

    });

}


/*
========================================
TRACKING PARAMETERS
========================================
*/

const trackingParameters = [

    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",

    "fbclid",
    "gclid",
    "msclkid",

    "mc_cid",
    "mc_eid"

];


for (
    const parameter of trackingParameters
) {

    if (
        url.searchParams.has(parameter)
    ) {

        result.trackingParameters.push(
            parameter
        );

        privacy -= 10;

    }

}


if (
    result.trackingParameters.length > 0
) {

    result.detections.push({

        type: "warning",

        text:
            "Tracking parameters detected."

    });

} else {

    result.detections.push({

        type: "safe",

        text:
            "No common tracking parameters detected."

    });

}


/*
========================================
SHORT URL
========================================
*/

const shorteners = [

    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "is.gd",
    "ow.ly"

];


if (
    shorteners.includes(url.hostname)
) {

    result.shortUrl = true;

    security -= 10;

    privacy -= 5;


    result.detections.push({

        type: "warning",

        text:
            "Shortened URL detected."

    });

}


/*
========================================
SUSPICIOUS KEYWORDS
========================================
*/

const suspiciousWords = [

    "login",
    "verify",
    "verification",
    "account",
    "password",
    "secure",
    "update"

];


const lowerUrl =
    url.href.toLowerCase();


for (
    const word of suspiciousWords
) {

    if (
        lowerUrl.includes(word)
    ) {

        result.suspiciousKeywords.push(
            word
        );

        security -= 5;

    }

}


if (
    result.suspiciousKeywords.length > 0
) {

    result.detections.push({

        type: "warning",

        text:
            "Potentially sensitive URL keywords detected."

    });

}


/*
========================================
FINAL SCORES
========================================
*/

result.security =
    Math.max(
        0,
        Math.min(100, security)
    );

result.privacy =
    Math.max(
        0,
        Math.min(100, privacy)
    );
return result;

}

/*

# DISPLAY RESULT

*/

function displayResult(result) {


securityScore.textContent =
    `${result.security}/100`;

privacyScore.textContent =
    `${result.privacy}/100`;


securityRisk.textContent =
    getRiskLabel(result.security);


privacyRisk.textContent =
    getRiskLabel(result.privacy);


domainElement.textContent =
    result.domain;


protocolElement.textContent =
    result.protocol;


if (
    result.trackingParameters.length > 0
) {

    trackingElement.textContent =
        result.trackingParameters.join(", ");

} else {

    trackingElement.textContent =
        "None detected";

}


shortUrlElement.textContent =
    result.shortUrl
        ? "Detected"
        : "No";


/*
========================================
DETECTIONS
========================================
*/

detectionsElement.innerHTML = "";


for (
    const detection of result.detections
) {

    const element =
        document.createElement("div");


    element.className =
        `detection ${detection.type}`;


    element.textContent =
        detection.text;


    detectionsElement.appendChild(
        element
    );

}


setStatus(
    "Analysis completed."
);


/*
========================================
DEBUG
========================================
*/

console.log(
    "Privacy Link Guard result:",
    result
);

}
/*

# RISK LABEL

*/

function getRiskLabel(score) {

if (score >= 80) {

    return "LOW RISK";

}


if (score >= 50) {

    return "MEDIUM RISK";

}


return "HIGH RISK";

}
/*
STATUS

*/

function setStatus(message) {

statusElement.textContent =
    message;
}
