const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Hastebin API token
const token = "75bb676b5ed3fc45f11ba1092b1d99c5a71510ef876ff77226f9a2cf043625b0b9d97fb7432c0297ea507ace74fc0425bd2415dfc02b5d2b0547f90f3e8d8552"; // your API token

async function MakeSession(sessionId, folderPath) {
    try {
        const pasteId = sessionId.split("~")[1]; // Extract paste ID from session ID
        const rawUrl = `https://hastebin.com/raw/${pasteId}`;

        // Make request to get the raw content from Hastebin
        const response = await axios.get(rawUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.data) {
            throw new Error("Empty response from Hastebin.");
        }

        const outputPath = path.join(folderPath, "creds.json");

        // Convert to string if data is an object
        const dataToWrite = typeof response.data === "string" ? response.data : JSON.stringify(response.data);

        fs.writeFileSync(outputPath, dataToWrite); // Save to creds.json
  
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

module.exports = { MakeSession };
