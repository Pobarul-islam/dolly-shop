import express from 'express';
import dotenv from 'dotenv';

// configure env 
dotenv.config();
// rest object 
const app = express();

// rest api 
app.get('/', (req, res) => {
    res.send("welcome to dolly server side")
})

// PORT 
const PORT = process.env.PORT || 5000;

// run listen 
app.listen(PORT, () => {
    console.log(
      `server running on ${process.env.DEV_MODE} node on port ${PORT}`
    );
})