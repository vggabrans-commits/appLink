const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");
const { parse } = require("tldts");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());


/*
========================================
STATUS
========================================
*/

app.get("/api/status", (req, res) => {

    res.json({
        status: "online",
        service: "Privacy Link Guard",
        version: "0.2"
    });

});


/*
========================================
URL ANALYSIS
========================================
*/

app.post("/api/analyze", async (req, res) => {

    const { url } = req.body;


    /*
    ----------------------------------------
    CHECK URL
    ----------------------------------------
    */

    if (!url) {

        return res.status(400).json({
            error: "URL is required"
        });

    }


    let parsedUrl;


    try {

        parsedUrl = new URL(url);

    } catch {

        return res.status(400).json({
            error: "Invalid URL"
        });

    }


    /*
    ----------------------------------------
    START BROWSER
    ----------------------------------------
    */

    let browser;


    try {

        browser = await chromium.launch({
            headless: true
        });


        const page =
            await browser.newPage();

        
        const redirects = [];

        page.on("request", request => {

            const redirectFrom =
                request.redirectedFrom();

            if (redirectFrom) {

                redirects.push({
                    from: redirectFrom.url(),
                    to: request.url()
                });

            }

        });


        /*
        ----------------------------------------
        REQUESTS
        ----------------------------------------
        */

        const requests = [];

        const mainDomain = 
            parse(parsedUrl.href).domain;


        page.on(
            "request",
            request => {
                const requestDomain =
                    parse(request.url()).domain;
                const thirdParty =
                    requestDomain !== null &&
                    requestDomain !== mainDomain;
                requests.push({
                    url: request.url(),
                    method: request.method(),
                    resourceType:
                        request.resourceType(),
                    domain:
                        requestDomain,
                    thirdParty:
                        thirdParty
                });

            }
        );


        /*
        ----------------------------------------
        RESPONSES
        ----------------------------------------
        */

        const responses = [];


        page.on(
            "response",
            response => {

                responses.push({
                    url: response.url(),
                    status: response.status(),
                    contentType:
                        response.headers()["content-type"] || ""
                });

            }
        );


        /*
        ----------------------------------------
        OPEN WEBSITE
        ----------------------------------------
        */

        const response =
            await page.goto(
                parsedUrl.href,
                {
                    waitUntil: "domcontentloaded",
                    timeout: 15000
                }
            );


        /*
        ----------------------------------------
        COLLECT BASIC INFORMATION
        ----------------------------------------
        */

        const finalUrl =
            page.url();


        const title =
            await page.title();


        /*
        ----------------------------------------
        RESULT
        ----------------------------------------
        */

        const result = {

            inputUrl:
                parsedUrl.href,

            finalUrl:
                finalUrl,

            redirects:
                redirects,

            thirdPartyRequests:
                requests.filter(
                    request => request.thirdParty
                ).length,

            thirdPartyDomains:
            [
                ...new Set (
                    requests
                    .filter(
                        request => request.thirdParty
                    )
                    .map(
                        request => request.domain
                    )
                    .filter(Boolean)
            )],

            title:
                title,

            initialStatus:
                response
                    ? response.status()
                    : null,

            requestCount:
                requests.length,

            responseCount:
                responses.length,

            requests:
                requests,

            responses:
                responses

        };


        await browser.close();


        res.json(result);

    }


    catch (error) {

        if (browser) {

            await browser.close();

        }


        console.error(error);


        res.status(500).json({

            error:
                "Unable to analyze URL",

            message:
                error.message

        });

    }

});


/*
========================================
START SERVER
========================================
*/

app.listen(
    PORT,
    () => {

        console.log(
            `Privacy Link Guard backend running on http://localhost:${PORT}`
        );

    }
);