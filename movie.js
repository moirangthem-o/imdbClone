const apiKey = "97d2d828";
const omdbapiUrl = `http://www.omdbapi.com`;
const movieCardDiv = document.querySelector(".results");
let movieDetails;

let favouriteMovies = [];
if (localStorage.getItem("favouriteMovies")) {
  favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
}

const url = new URL(window.location.href);

// Get the value of the 'id' parameter
const id = url.searchParams.get("id");

function getMovieDetails(id) {
  const apiUrl = omdbapiUrl + `?i=${id}&apiKey=${apiKey}`;
  fetch(apiUrl)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      movieDetails = data;
      createMovieCard();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
getMovieDetails(id);

function createMovieCard() {
  // Create the elements

  const childDiv1 = document.createElement("div");
  childDiv1.classList.add("col-3");
  const childDiv2 = document.createElement("div");
  childDiv2.classList.add("col");

  const actorP = document.createElement("p");
  actorP.textContent = movieDetails?.Actors;

  const countryP = document.createElement("p");
  countryP.textContent = movieDetails?.Country;

  const plotP = document.createElement("p");
  plotP.textContent = movieDetails?.Plot;

  const divElement = document.createElement("div");
  divElement.classList.add( "p-3", "row", "bg-grad");

  const imgElement = document.createElement("img");
  imgElement.classList.add("poster");
  imgElement.setAttribute("src", movieDetails?.Poster);
  imgElement.setAttribute("alt", "Movie poster");

  const favSvg = document.createElement("span");
  favSvg.classList.add("icon");

  for (let i = 0; i < favouriteMovies?.length; i++) {
    if (favouriteMovies[i]?.id == movieDetails?.imdbID) {
      favSvg.classList.toggle("pink-icon");
      break;
    }
  }
  favSvg.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("pink-icon")) {
      removeFromFavourites(movieDetails?.imdbID);
      e.target.classList.toggle("pink-icon");
    } else {
      e.target.classList.toggle("pink-icon");
      addmovieToFavourites();
    }
  });

  const pElementTitle = document.createElement("p");
  pElementTitle.classList.add("mt-2");
  pElementTitle.textContent = movieDetails?.Title;

  const pElementYear = document.createElement("p");

  pElementYear.textContent = movieDetails?.Year;

  childDiv1.appendChild(imgElement);
  childDiv1.appendChild(favSvg);
  childDiv1.appendChild(pElementTitle);
  childDiv1.appendChild(pElementYear);

  childDiv2.appendChild(actorP);
  childDiv2.appendChild(countryP);
  childDiv2.appendChild(plotP);

  divElement.appendChild(childDiv1);
  divElement.appendChild(childDiv2);

  //show the card on ui
  movieCardDiv.appendChild(divElement);
}

function removeFromFavourites(imdbID) {
  favouriteMovies = favouriteMovies.filter((obj) => {
    return obj.id != imdbID;
  });
  localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
}

function addmovieToFavourites() {
  const obj = {
    Title: movieDetails?.Title,
    Year: movieDetails?.Year,
    Poster: movieDetails?.Poster,
    id: movieDetails?.imdbID,
  };
  favouriteMovies.push(obj);
  localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
}

// function removeFromFavourites(){

// }
