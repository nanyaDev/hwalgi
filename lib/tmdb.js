const getItemFromTMDB = async (itemData) => {
  const tmdbRequest = `https://api.themoviedb.org/3/${itemData.type}/${itemData.tmdbID}?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const tmdbResponse = await fetch(tmdbRequest);
  const tmdbData = await tmdbResponse.json();

  // ? is this a bad way to pass data
  // todo: fix overpassing info to <Thumbnail />
  // todo: make this resilient to badly formatted api responses
  const item = {
    ...itemData,
    koreanTitle: tmdbData.original_title || tmdbData.original_name,
    overview: tmdbData.overview,
    tagline: tmdbData.tagline,
    episodeCount: tmdbData.number_of_episodes || null,
    year: tmdbData.first_air_date || tmdbData.release_date,
    posterURL: `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`,
  };

  return item;
};

const getCreditsFromTMDB = async (itemData) => {
  const creditsRequest = `https://api.themoviedb.org/3/${itemData.type}/${itemData.tmdbID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const creditsResponse = await fetch(creditsRequest);
  const creditsData = await creditsResponse.json();

  // todo: make this less obscure
  const credits = {
    cast: creditsData.cast
      .filter((person) => person.order <= 3)
      .map((p) => ({ name: p.name, id: p.id, char: p.character })),
    director: creditsData.crew
      .filter((person) => person.job === 'Director')
      .map((p) => p.name),
  };

  return credits;
};

const getTrailerFromTMDB = async (itemData) => {
  const videosRequest = `https://api.themoviedb.org/3/${itemData.type}/${itemData.tmdbID}/videos?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const videosResponse = await fetch(videosRequest);
  const videosData = await videosResponse.json();

  const video = videosData.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  // todo: make sure everything has a trailer
  const trailer = video?.key || null;

  return trailer;
};

export { getItemFromTMDB, getCreditsFromTMDB, getTrailerFromTMDB };
