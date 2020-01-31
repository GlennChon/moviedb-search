import moviedb from "./config";
// API key should technically be in an environment variable but for the sake of simplicity, it is kept in the config.js file imported above

//https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
function searchUrl(searchValue) {
  return `${moviedb.apiUrl}/search/movie?api_key=${moviedb.apiKey}&query=${searchValue}`;
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
