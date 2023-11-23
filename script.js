
//Variable are defined here

const apiKey = "97d2d828";
const omdbapiUrl = `https://www.omdbapi.com`;
const searchBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".search-input");
const resultsDiv = document.querySelector(".results");
const favouritesDiv = document.querySelector(".favourites");
let searchResults = [];

//favourite movie lists in local storage
let favouriteMovies = [];
if (localStorage.getItem("favouriteMovies")) {
  favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
}


//function to seach the movie on getting the value from the search bar

function onClickSearch() {
  getMovieDetails(searchInput.value);
}
function getMovieDetails(keyword) {
  const apiUrl = omdbapiUrl + `?s=${keyword}&apiKey=${apiKey}`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data?.Search?.length > 0) {
        searchResults = data.Search;
        refreshResults();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//function to update the page after each and evry search

function refreshResults() {
  resultsDiv.innerHTML = ""; //clear the div to prevent continous appending
  for (let i = 0; i < searchResults.length; i++) {
    let movieDetails = searchResults[i];
    createMovieCard(
      movieDetails?.Title,
      movieDetails?.Poster,
      movieDetails?.Year,
      movieDetails?.imdbID
    );
  }
}



//function to create a novie card, html is embedded using JS 
function createMovieCard(title, imgSrc, Year, imdbID) {

  const divElement = document.createElement("div");
  divElement.classList.add(
    "col-md-2",
    "card",
    "pt-2",
    "ml-2",
    "cursor-pointer"
  );


  const a_tag = document.createElement("a");
  a_tag.href = `movie.html?id=${imdbID}`;

  const imgElement = document.createElement("img");
  imgElement.classList.add("poster");
  imgElement.setAttribute("src", imgSrc);
  imgElement.setAttribute("alt", "Movie poster");

  const favSvg = document.createElement("span");
  favSvg.classList.add("icon");
  for (let i = 0; i < favouriteMovies?.length; i++) {
    if (favouriteMovies[i]?.id === imdbID) {
      favSvg.classList.toggle("pink-icon");
      break;
    }
  }

  //toggle the change in colour once the favourite button is clicked
  favSvg.addEventListener("click", (e) => {
    e.preventDefault();

    
    if (e.target.classList.contains("pink-icon")) {
      removeFromFavourites(imdbID);
      e.target.classList.toggle("pink-icon");
    } else {
      e.target.classList.toggle("pink-icon");
      addmovieToFavourites(title, imgSrc, Year, imdbID);
    }
  });

  const pElementTitle = document.createElement("p");
  pElementTitle.classList.add("mt-2");
  pElementTitle.textContent = title;

  const pElementYear = document.createElement("p");

  pElementYear.textContent = Year;

  // Append the elements to the div
  a_tag.appendChild(imgElement);
  a_tag.appendChild(favSvg);
  a_tag.appendChild(pElementTitle);
  a_tag.appendChild(pElementYear);
  divElement.appendChild(a_tag);

  //show the card on ui
  resultsDiv.appendChild(divElement);
}

//function to add all the favourite movies and form a list 
function addmovieToFavourites(title, imgSrc, year, imdbID) {
  const obj = {
    Title: title,
    Year: year,
    Poster: imgSrc,
    id: imdbID,
  };
  favouriteMovies.push(obj);
  localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
}


//event listener to call the onClickSeearch function once the search button is pressed
searchBtn.addEventListener("click", () => {
  onClickSearch();
});
searchInput.addEventListener("input", onClickSearch);


//function to remove movies from faourites list 
function removeFromFavourites(imdbID) {
  favouriteMovies = favouriteMovies.filter((obj) => {
    return obj.id != imdbID;
  });
  localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
}
