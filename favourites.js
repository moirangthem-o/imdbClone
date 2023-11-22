const favouritesDiv = document.querySelector(".favourites");
let favouriteMovies = [];
let searchResults = [];
if (localStorage.getItem("favouriteMovies")) {
  favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
  refreshFavourites();
}

//Favourites
function refreshFavourites() {
  favouritesDiv.innerHTML = "";
  for (let i = 0; i < favouriteMovies.length; i++) {
    let movieDetails = favouriteMovies[i];
    createMovieCardFavourites(
      movieDetails?.Title,
      movieDetails?.Poster,
      movieDetails?.Year,
      movieDetails?.id

    );
  }
}

function createMovieCardFavourites(title, imgSrc, Year, imdbID) {
  // Create the elements
  const divElement = document.createElement("div");
  divElement.classList.add("col-3", "card", "pt-2", "ml-2");

  const imgElement = document.createElement("img");
  imgElement.classList.add("poster");
  imgElement.setAttribute("src", imgSrc);
  imgElement.setAttribute("alt", "Movie poster");

  const favSvg = document.createElement("span");
  favSvg.classList.add("icon");
    console.log(favouriteMovies);
  for (let i = 0; i < favouriteMovies?.length; i++) {
    if (favouriteMovies[i]?.id == imdbID) {
      favSvg.classList.toggle("pink-icon");
      break;
    }
  }
  favSvg.addEventListener("click", (e) => {
    e.preventDefault();
    removeFromFavourites(imdbID);
  });

  const pElementTitle = document.createElement("p");
  pElementTitle.classList.add("mt-2");
  pElementTitle.textContent = title;

  const pElementYear = document.createElement("p");

  pElementYear.textContent = Year;

  // Append the elements to the div
  divElement.appendChild(imgElement);
  divElement.appendChild(favSvg);
  divElement.appendChild(pElementTitle);
  divElement.appendChild(pElementYear);

  //show the card on ui
  favouritesDiv.appendChild(divElement);


}

function removeFromFavourites(imdbID) {
  favouriteMovies = favouriteMovies.filter((obj) => {
    return obj.id != imdbID;
  });
  localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
  refreshFavourites();
}

// function addmovieToFavourites(title, imgSrc, year, imdbID) {
//   const obj = {
//     Title: title,
//     Year: year,
//     Poster: imgSrc,
//     id: imdbID,
//   };
//   favouriteMovies.push(obj);
//   localStorage["favouriteMovies"] = JSON.stringify(favouriteMovies);
// }
