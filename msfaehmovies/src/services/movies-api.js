class MoviesApi {
  #apiURL = "http://www.omdbapi.com/";
  #apiKey = import.meta.env.VITE_MOVIE_API_KEY;
  s;
  ITEMS_PER_PAGE = 10;

  constructor() {
    this.#updateRandomParam();
  }

  #updateRandomParam() {
    // prettier-ignore
    const searchWords = [
      "cat", "dog", "butterfly", "car", "bad",
      "super", "hero", "girl", "boy", "murder",
      "kill", "bat", "happy", "hello", "chance",
      "clever",
    ];

    this.s = searchWords[Math.floor(Math.random() * searchWords.length)];
  }

  async getAll({ requestParams, signal }) {
    let params = new URLSearchParams({
      apikey: this.#apiKey,
      s: this.s,
      ...requestParams,
    });
    let url = this.#apiURL + "?" + params;
    // try {
      let response = await fetch(url, { signal });
      return await response.json();
    // } catch (error) {
      // console.log("error", error);
    // }
  }
}

export const api = new MoviesApi();
