const express = require('express')
const request = require('request')

const app = express()
const APIKEY = '30f41c29097f09b679a3cda0188a6c18'

app.use(express.static(__dirname)) //telling the brower to send these files static (no change)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.listen(5000, () => { //portal in which the server is running
    console.log('Server is running on port 5000');
});





