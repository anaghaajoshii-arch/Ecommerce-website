const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post("/feedback", (req, res) => {
    const entry = {
        name: req.body.name,
        message: req.body.message,
        time: new Date().toISOString(),
    };

    fs.appendFile("feedback.txt", JSON.stringify(entry) + "\n", (err) => {
        if (err) return res.status(500).send("Error saving feedback");
        res.send("Thank you for your feedback 💐");
    });
});

app.listen(3000, () => console.log("Server: http://localhost:3000"));
