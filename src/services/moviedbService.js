import moviedb from "./config";
// API key should technically be in an environment variable but for the sake of simplicity, it is kept in the config.js file imported above

function searchUrl(searchValue) {
  //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
  return `${moviedb.apiUrl}/search/movie?api_key=${moviedb.apiKey}&query=${searchValue}`;
}

function movieDetailsUrl(movieID) {
  //api.themoviedb.org/3/movie/343611?api_key={api_key}
  return `${moviedb.apiUrl}/movie/${movieID}?api_key=${moviedb.apiKey}`;
}

export async function getSearchResults(searchValue) {
  try {
    let response = await fetch(searchUrl(searchValue));
    if (!response.ok) {
      throw response;
    } else {
      return response.json();
    }
  } catch (err) {
    alert(err);
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
    alert(err);
  }
}
