const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// read form fields from POST body
app.use(express.urlencoded({ extended: true }));

app.post("/feedback", (req, res) => {
    const { name, message } = req.body;

    const entry = {
        name,
        message,
        time: new Date().toISOString(),
    };

    const line = JSON.stringify(entry) + "\n";

    const filePath = path.join(__dirname, "feedback.txt");

    fs.appendFile(filePath, line, (err) => {
        if (err) {
            console.error("Error saving feedback:", err);
            return res.status(500).send("Error saving feedback");
        }
        res.send("Thank you for your feedback 💐");
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
