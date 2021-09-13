// todo: import as just firestore
import { firestore as db } from '@/utils/firebase';
import { Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import ItemInfo from '@/components/ItemInfo';
import WordGrid from '@/components/WordGrid';
// prettier-ignore
import { getItemFromTMDB, getCreditsFromTMDB, getTrailerFromTMDB, } from '@/lib/tmdb';
import { getDataFromSpotify } from '@/lib/spotify';

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

  const itemRef = db.collection('catalog').doc(slug);
  const itemData = (await itemRef.get()).data();

  let item, tidbits, media;
  const { type } = itemData;

  if (type === 'movie' || type === 'tv') {
    [item, tidbits, media] = await Promise.all([
      getItemFromTMDB(itemData),
      getCreditsFromTMDB(itemData),
      getTrailerFromTMDB(itemData),
    ]);
  }

  if (type === 'music') {
    [item, tidbits] = await getDataFromSpotify(itemData);
    media = null;
  }

  // ? is this good practice
  // ? how to do a named dynamic import
  let cards;
  if (process.env.NODE_ENV === 'development') {
    const mockData = await import('@/utils/mockData');
    cards = mockData.cardData;
  } else {
    const cardsRef = db.collection('catalog').doc(slug).collection('cards');
    const cardsSnapshot = await cardsRef.get();
    cards = cardsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  return {
    props: { item, tidbits, media, cards },
  };
};

// ? why does tidbits.director work even though it's an array
const CatalogItem = ({ item, tidbits, media, cards }) => {
  return (
    <>
      <NextSeo title={item.title} />
      <AuthCheck>
        <GradientBar />
        <Navbar />
        <Flex direction="column" grow={1} bg="gray.50">
          <ItemInfo item={item} tidbits={tidbits} media={media} />
          <WordGrid cards={cards} />
        </Flex>
      </AuthCheck>
    </>
  );
};

export default CatalogItem;
