const button = document.getElementById("button")
const input = document.getElementById("input")
const movies = document.getElementById("movies")
const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGY0MWMyOTA5N2YwOWI2NzlhM2NkYTAxODhhNmMxOCIsInN1YiI6IjY1NzliZjUzN2VjZDI4MDEwMWQyY2UxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eYCBFqjQzYpiZlPmvvPD97AGScj8dCILqODkNEZL5xg"
const options = { //bearerToken - Its  JSON Web token used to authorize the api request 
    method: 'GET', //Specifies the HTTP request, set to GET
    headers: { //infomation of   the request
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}` 
    }
}

const fetchData = async (url, options) => { // declared using "async" keyword making it asynchronous operation
    const response = await fetch(url, options) //fetch function is used to create async HTTP request
    const data = await response.json() //returns a "promise" object representing the complition or failure of the async operation. 
    return data 
}

const addMovieClick = () => { //allos you to click a movie and renders another list
    const movieElements = document.querySelectorAll(".movieName") //selects all elements from class="movieName" from NodeList
    movieElements.forEach(movieElement => { // iterate thru each matching elemnet
        movieElement.addEventListener("click", async () => { // adds a click event listener the element is added
            const movieId = movieElement.dataset.id //dataset property access data from the "id" attribute 
            similarMovies(movieId)
        })
    })
}

const similarMovies = async (movieId) => { 
    const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1';` //URL that fetches similar movies
    const data = await fetchData(similarUrl, options)  //Fetches data from the API using FetchData function 
    movies.innerHTML = data.results.map(movie => { //Updates the HTML content based on the data retrived 
        return `<h2 data-id="${movie.id}" class="movieName">${movie.title}</h2>`
    }).join("")
    addMovieClick() // click event listeners to the newly added movie elements
}

button.addEventListener("click", async (e) => {
    const valueInput = input.value //grabs the value from the input field
    const url = `https://api.themoviedb.org/3/search/movie?query=${valueInput}&include_adult=false&language=en-US&page=1`
    // creats a URL by searching movies with the input value they have searched
    const data = await fetchData(url, options) // Fetches data from the API from the fetchData function
    movies.innerHTML = data.results.map( movie => { // updates the HTML content with movie title from the API response
        return `<h2 data-id="${movie.id}" class="movieName">${movie.title}</h2>`
    }).join("")
    addMovieClick() //  click event listeners to the newly added movie elements

    
    console.log(data)

})

