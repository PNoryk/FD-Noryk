class MoviesApi {
  #apiURL = "http://www.omdbapi.com/";
  #apiKey = import.meta.env.VITE_MOVIE_API_KEY;
  #cacheByPage = {};
  #cachedMovies = [];
  ITEMS_PER_PAGE = 10;

  async getAll({ requestParams, signal }) {
    let newRequestParams = {
      apikey: this.#apiKey,
      ...requestParams,
    };
    let cacheKey = [newRequestParams.s, newRequestParams.page].join("_");
    let savedData = this.#cacheByPage[cacheKey];
    if (savedData) {
      return savedData;
    }

    let params = new URLSearchParams(newRequestParams);
    let url = this.#apiURL + "?" + params;
    // try {
    let response = await fetch(url, { signal });
    let data = await response.json();
    this.#cacheByPage[cacheKey] = data;
    let savedDataByMoviesId = new Set(
      this.#cachedMovies.map((el) => el.imdbID)
    );
    let dataToSave = data["Search"].filter(
      ({ imdbID }) => !savedDataByMoviesId.has(imdbID)
    );
    this.#cachedMovies.push(...dataToSave);
    return data;
    // } catch (error) {
    // console.log("error", error);
    // }
  }

  async getById({ movieId, signal }) {
    let requestParams = {
      apikey: this.#apiKey,
      i: movieId,
    };

    let movie = this.#cachedMovies.find(({ imdbID }) => imdbID === movieId);
    if (movie) {
      return movie;
    }

    let params = new URLSearchParams(requestParams);
    let url = this.#apiURL + "?" + params;
    let response = await fetch(url, { signal });
    let data = await response.json();
    this.#cachedMovies.push(data);
    return data;
  }
}

export const api = new MoviesApi();
