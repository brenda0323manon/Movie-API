const button = document.getElementById("button")
const input = document.getElementById("input")
const movies = document.getElementById("movies")
const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGY0MWMyOTA5N2YwOWI2NzlhM2NkYTAxODhhNmMxOCIsInN1YiI6IjY1NzliZjUzN2VjZDI4MDEwMWQyY2UxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eYCBFqjQzYpiZlPmvvPD97AGScj8dCILqODkNEZL5xg"
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
}

const fetchData = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    return data 
}

const addMovieClick = () => {
    const movieElements = document.querySelectorAll(".movieName")
    movieElements.forEach(movieElement => {
        movieElement.addEventListener("click", async () => {
            const movieId = movieElement.dataset.id
            similarMovies(movieId)
        })
    })
}

const similarMovies = async (movieId) => {
    const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1';`
    const data = await fetchData(similarUrl, options)
    movies.innerHTML = data.results.map(movie => {
        return `<h2 data-id="${movie.id}" class="movieName">${movie.title}</h2>`
    }).join("")
    addMovieClick()
}

button.addEventListener("click", async (e) => {
    const valueInput = input.value
    const url = `https://api.themoviedb.org/3/search/movie?query=${valueInput}&include_adult=false&language=en-US&page=1`

    const data = await fetchData(url, options)
    movies.innerHTML = data.results.map( movie => {
        return `<h2 data-id="${movie.id}" class="movieName">${movie.title}</h2>`
    }).join("")
    addMovieClick()

    
    console.log(data)

})

