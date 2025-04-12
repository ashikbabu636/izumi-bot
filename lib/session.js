const fs = require('fs');
const path = require('path');
const axios = require('axios');

const token = '75bb676b5ed3fc45f11ba1092b1d99c5a71510ef876ff77226f9a2cf043625b0b9d97fb7432c0297ea507ace74fc0425bd2415dfc02b5d2b0547f90f3e8d8552';

async function MakeSession(sessionId, folderPath) {
    try {
        const pasteKey = sessionId.split("~")[1];
        const config = {
            method: 'get',
            url: `https://hastebin.com/raw/${pasteKey}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios(config);

        if (!response.data) {
            throw new Error("Empty response from Hastebin.");
        }

        const outputPath = path.join(folderPath, "creds.json");
        const dataToWrite = typeof response.data === "string" ? response.data : JSON.stringify(response.data);

        fs.writeFileSync(outputPath, dataToWrite);
        console.log("Session saved to creds.json successfully.");
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

module.exports = { MakeSession };
