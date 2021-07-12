import { SimpleGrid } from '@chakra-ui/react';

import { firestore as db } from '@/utils/firebase';
import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';

export const getStaticProps = async () => {
  const catalogRef = db.collection('catalog');
  // todo: abstract this to a helper function, also in [slug].js
  const catalog = (await catalogRef.get()).docs.map((doc) => doc.data());

  // todo: error handling
  await Promise.all(
    catalog.map(async (item) => {
      const request = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}/images?api_key=${process.env.TMDB_API_KEY}`;
      const response = await fetch(request);
      const data = await response.json();
      const posterFilePath = data.posters[0].file_path;
      // todo: get api base url from coniguration (cf. api docs)
      item.posterURL = `https://image.tmdb.org/t/p/w500${posterFilePath}`;
    })
  );

  return {
    props: { catalog },
  };
};

// todo: make the grid responsive
const Catalog = ({ catalog }) => {
  return (
    <AuthCheck>
      <Navbar />
      <SimpleGrid columns={6} spacing={8} p={8}>
        {catalog.map((item) => (
          <Thumbnail key={item.tmdbID} item={item} />
        ))}
      </SimpleGrid>
      {catalog.map((item) => (
        <pre key={item.title}>{JSON.stringify(item, null, 2)}</pre>
      ))}
    </AuthCheck>
  );
};

export default Catalog;
