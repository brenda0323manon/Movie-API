const express = require('express')
const request = require('request')

const app = express()
const APIKEY = '30f41c29097f09b679a3cda0188a6c18'


const movielookUp = (moviename, callback)=>{
    url ='https://api.themoviedb.org/3/search/movie?query='+ moviename + '&api_key=' + APIKEY
    request({url, json: true}, (err, res)=>{
        if(err){
            callback('Unable to connect', undefined)
        }else if (res.body.results.length === 0){
            callback(' Try again', undefined)
        }else{
            callback(undefined,{
                movieID: res.body.results[0].id
            })
        }
    })
}
const movieSimilar = (movieID, callback) =>{
    const url = 'https://api.themoviedb.org/3/movie/'+movieID+'/similar?language=en-US&page=1'+ '&api_key=' + APIKEY
request({url, json: true},(err, res)=> {
    if(err){
        callback('Unable to connect', undefined)
    }else if (res.body.results.length === 0){
        callback(' Try again', undefined)
    }else{
        callback(res.body.results)
    }
})
}

app.get('/getMovieInfo', (req, res) => {
    const movieName = req.query.movieName; //  Passing the movieName as a query parameter
    movielookUp(movieName, (err, result) => {
        if (err) {
            res.status(500).send(err); // Sends an error response with status code 500
        } else {
            movieSimilar(result.movieID, (error, result) => {
                if (error) {
                    res.status(500).send(error); // Sends an error response with status code 500
                } else {
                    res.send(result); // Sends the result of the response
                }
            });
        }
    });
});

app.listen(5000, () => { //portal in which the server is running
    console.log('Server is running on port 5000');
});





