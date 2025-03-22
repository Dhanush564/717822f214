const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/numbers/even", (req, res) => {
    res.json({ numbers: [2, 4, 6, 8, 10] });
});

app.listen(9876, () => {
    console.log("Server running on http://localhost:9876");
});
