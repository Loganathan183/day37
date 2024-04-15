const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const folderPath = 'C:\Users\Loganathan\OneDrive\Desktop\GUVI-ACTIVITY\day01 nodejs';

app.post('C:\Users\Loganathan\OneDrive\Desktop\GUVI-ACTIVITY\day01 nodejs\ 15-04-2024-04 44.txt', (req, res) => {
    const timestamp = Date.now();
    const fileName = `${new Date(timestamp).toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, fileName);
    const fileContent = new Date(timestamp).toString();

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            res.status(500).send('Error creating file');
            return;
        }
        console.log('File created successfully:', filePath);
        res.status(201).send('File created successfully');
    });
});

app.get('/getAllTextFiles', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            res.status(500).send('Error reading folder');
            return;
        }
        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
