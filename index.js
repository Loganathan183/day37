const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

const folderPath = path.join(__dirname, 'files');


if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Helper function to get the current timestamp and format it
function getCurrentTimestamp() {
    const currentTimestamp = new Date();
    return currentTimestamp.toISOString().replace(/:/g, '-');
}

// Endpoint to create a text file
app.post('/create-file', (req, res) => {
    const formattedDate = getCurrentTimestamp();
    const fileName = `${formattedDate}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, new Date().toString(), (err) => {
        if (err) {
            return res.status(500).send('Error creating the file');
        }
        res.json({ message: 'File created successfully', fileName });
    });
});

// Endpoint to retrieve all text files
app.get('/get-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error retrieving files');
        }

        const txtFiles = files.filter(file => path.extname(file) === '.txt');
        res.json({ files: txtFiles });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on:${PORT}`);
});
