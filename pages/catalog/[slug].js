// todo: import as just firestore
import { firestore as db } from '@/utils/firebase';
import { Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import ItemInfo from '@/components/ItemInfo';
import WordGrid from '@/components/WordGrid';

export const getStaticPaths = async () => {
  const catalogRef = db.collection('catalog');
  const catalog = (await catalogRef.get()).docs.map((doc) => doc.data());

  const paths = catalog.map((item) => ({ params: { slug: item.slug } }));

  // ? why does fallback: true break build
  // ? cf: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const catalogRef = db.collection('catalog');
  const catalogSnapshot = await catalogRef
    .where('slug', '==', slug)
    .limit(1)
    .get();
  let item = catalogSnapshot.docs[0].data();

  // todo: repeated from index.js => abstract helper function
  const infoRequest = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const infoResponse = await fetch(infoRequest);
  const infoData = await infoResponse.json();

  // ? is this a bad way to pass data
  // todo: fix overpassing info to <Thumbnail />
  // todo: make this resilient to badly formatted api responses
  item = {
    ...item,
    koreanTitle: infoData.original_title || infoData.original_name,
    overview: infoData.overview,
    tagline: infoData.tagline,
    episodeCount: infoData.number_of_episodes || null,
    year: infoData.first_air_date || infoData.release_date,
    posterURL: `https://image.tmdb.org/t/p/w500${infoData.poster_path}`,
  };

  const creditsRequest = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en`;
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

  const videosRequest = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}/videos?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const videosResponse = await fetch(videosRequest);
  const videosData = await videosResponse.json();

  const video = videosData.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  // todo: make sure everything has a trailer
  const trailer = video?.key || null;

  // ? is this good practice
  // ? how to do a named dynamic import
  let cards;
  if (process.env.NODE_ENV === 'development') {
    const mockData = await import('@/utils/mockData');
    cards = mockData.cardData;
  } else {
    const cardsRef = db.collection('catalog').doc(slug).collection('cards');
    const cardsSnapshot = await cardsRef.get();
    cards = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  return {
    props: { item, credits, trailer, cards },
  };
};

// ? why does credits.director work even though it's an array
const CatalogItem = ({ item, credits, trailer, cards }) => {
  return (
    <>
      <NextSeo title={item.title} />
      <AuthCheck>
        <GradientBar />
        <Navbar />
        <Flex direction="column" grow={1} bg="gray.50">
          <ItemInfo item={item} credits={credits} trailer={trailer} />
          <WordGrid cards={cards} />
        </Flex>
      </AuthCheck>
    </>
  );
};

export default CatalogItem;
