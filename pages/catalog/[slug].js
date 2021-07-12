import { firestore as db } from '@/utils/firebase';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import { Box, Heading } from '@chakra-ui/react';

// ? what does fallback: true do
export const getStaticPaths = async () => {
  const catalogRef = db.collection('catalog');
  const catalog = (await catalogRef.get()).docs.map((doc) => doc.data());

  const paths = catalog.map((item) => ({ params: { slug: item.slug } }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const catalogRef = db.collection('catalog');
  const snapshot = await catalogRef.where('slug', '==', slug).limit(1).get();
  const item = snapshot.docs[0].data();

  // todo: repeated from index.js => abstract helper function
  const request = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}/images?api_key=${process.env.TMDB_API_KEY}`;
  const response = await fetch(request);
  const data = await response.json();
  const posterFilePath = data.posters[0].file_path;
  item.posterURL = `https://image.tmdb.org/t/p/w500${posterFilePath}`;
  return {
    props: { item },
  };
};

const CatalogItem = ({ item }) => {
  return (
    <AuthCheck>
      <Navbar />
      <Thumbnail item={item} />
      <Heading>{item.title}</Heading>
    </AuthCheck>
  );
};

export default CatalogItem;
