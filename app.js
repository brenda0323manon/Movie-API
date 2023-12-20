const express = require('express') //modules
const request = require('request') //modules

const app = express()
const APIKEY = '30f41c29097f09b679a3cda0188a6c18'

app.use(express.static(__dirname)) //telling the brower to send these files as static (no change)
app.get("/", (req, res) => { //route of the path sends it to the index.html
    res.sendFile(__dirname + "/index.html")
})


app.listen(5000, () => { // starts the express server, portal in which the server is running
    console.log('Server is running on port 5000');
});





