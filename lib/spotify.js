import getSpotifyToken from '@/utils/spotify';

const getPosterFromSpotify = async (itemData) => {
  const token = await getSpotifyToken();

  const opts = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `https://api.spotify.com/v1/albums/${itemData.spotifyID}`;
  const res = await fetch(url, opts);
  const data = await res.json();

  const item = {
    ...itemData,
    posterURL: data.images[0].url,
  };

  return item;
};

const getDataFromSpotify = async (itemData) => {
  const token = await getSpotifyToken();

  const opts = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `https://api.spotify.com/v1/albums/${itemData.spotifyID}`;
  const res = await fetch(url, opts);
  const data = await res.json();

  const item = {
    ...itemData,
    artist: data.artists[0].name,
    year: data.release_date,
    posterURL: data.images[0].url,
    tracks: data.tracks.items.map((itemObj) => itemObj.name),
  };

  const tidbits = {
    tracks: data.tracks.items.length,
  };

  return [item, tidbits];
};

export { getPosterFromSpotify, getDataFromSpotify };
