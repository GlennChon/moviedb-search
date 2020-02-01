import moviedb from "./config";
// API key should technically be in an environment variable but for the sake of simplicity, it is kept in the config.js file imported above

function searchUrl(searchValue, type, page) {
  //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher&page={page#}
  return `${moviedb.apiUrl}/search/${type}?api_key=${
    moviedb.apiKey
  }&query=${searchValue}${
    page !== null ? "&page=" + page : ""
  }&include_adult=false`;
}

function movieDetailsUrl(movieID) {
  //api.themoviedb.org/3/movie/343611?api_key={api_key}

  return `${moviedb.apiUrl}/movie/${movieID}?api_key=${moviedb.apiKey}`;
}

export async function getSearchResults(
  searchValue,
  type = "movie",
  page = null
) {
  try {
    let response = await fetch(searchUrl(searchValue, type, page));
    if (!response.ok) {
      throw response;
    } else {
      return response.json();
    }
  } catch (err) {
    console.log(err);
    alert(err.status + ": " + err.statusText);
  }
}

export async function getMovieDetails(movieID) {
  try {
    let response = await fetch(movieDetailsUrl(movieID));
    if (!response.ok) {
      throw response;
    } else {
      return response.json();
    }
  } catch (err) {
    console.log(err);
    alert(err.status + ": " + err.statusText);
  }
}
