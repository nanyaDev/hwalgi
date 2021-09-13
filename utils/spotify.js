const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth = 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64');

let token;

const getSpotifyToken = async () => {
  if (!token) {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { Authorization: auth },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    ({ access_token: token } = await res.json());
  }

  return token;
};

export default getSpotifyToken;
