import { useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { firestore as db } from '@/utils/firebase';
import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import CatalogFilter from '@/components/CatalogFilter';

export const getStaticProps = async () => {
  const catalogRef = db.collection('catalog');
  // todo: abstract this to a helper function, also in [slug].js
  const catalog = (await catalogRef.get()).docs.map((doc) => doc.data());

  // todo: error handling
  await Promise.all(
    catalog.map(async (item) => {
      const request = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}?api_key=${process.env.TMDB_API_KEY}&language=en`;
      const response = await fetch(request);
      const data = await response.json();

      // todo: get api base url from coniguration (cf. api docs)
      item.posterURL = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    })
  );

  return {
    props: { catalog },
  };
};

// todo: make the grid responsive
// ? might be a good idea to move navbar and gray.50 bg to a shell
const Catalog = ({ catalog }) => {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');

  let catalogToShow = catalog;

  for (let [key, value] of Object.entries(filters)) {
    catalogToShow = catalogToShow.filter((item) => item[key] === value);
  }

  if (search) {
    catalogToShow = catalogToShow.filter((item) => {
      const re = new RegExp(search, 'i');
      return item.title.match(re);
    });
  }

  const updateFilter = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const updateSearch = (str) => {
    console.log('update');
    setSearch(str);
  };

  // todo: figure out a way to make this clear search
  const clearFilters = () => {
    setFilters({});
  };

  return (
    <AuthCheck>
      <Navbar />
      <CatalogFilter
        updateFilter={updateFilter}
        updateSearch={updateSearch}
        clearFilters={clearFilters}
      />
      <SimpleGrid columns={6} spacing={4} px={40} bg="gray.50">
        {catalogToShow.map((item) => (
          <Thumbnail key={item.tmdbID} item={item} w="140px" h="210px" />
        ))}
      </SimpleGrid>
      {/* {catalog.map((item) => (
        <pre key={item.title}>{JSON.stringify(item, null, 2)}</pre>
      ))} */}
    </AuthCheck>
  );
};

export default Catalog;
