const apiKey = "97d2d828";
const omdbapiUrl = `http://www.omdbapi.com`;
const searchBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".search-input");
const resultsDiv = document.querySelector(".results");
const favouritesDiv = document.querySelector(".favourites");
let favouriteMovies = [];
if (localStorage.getItem("favouriteMovies")) {
  favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
}

let searchResults = [];

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

function createMovieCard(title, imgSrc, Year, imdbID) {
  // Create the elements
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

searchBtn.addEventListener("click", () => {
  onClickSearch();
});
searchInput.addEventListener("input", onClickSearch);

function removeFromFavourites(imdbID) {
  favouriteMovies = favouriteMovies.filter((obj) => {
    return obj.id != imdbID;
  });
  localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
}
