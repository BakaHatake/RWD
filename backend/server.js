const express = require('express');
require('dotenv').config();    
require('./models/db');          

const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const auth=require('./routes/auth')


const PORT = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Backend working");
});
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',auth)
app.listen(PORT, () => {
    console.log(`Express running on ${PORT}`);
});
