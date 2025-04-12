const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function MakeSession(sessionId, folderPath) {
    try {
        const pasteId = sessionId.split("~")[1];
        const rawUrl = `https://pastebin.com/raw/${pasteId}`;


        const response = await axios.get(rawUrl);

        if (!response.data) {
            throw new Error("Empty response from Pastebin.");
        }

        const outputPath = path.join(folderPath, "creds.json");

        // Convert to string if data is an object
        const dataToWrite = typeof response.data === "string" ? response.data : JSON.stringify(response.data);

        fs.writeFileSync(outputPath, dataToWrite);
  
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

module.exports = { MakeSession };
