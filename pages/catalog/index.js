import { useState } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { firestore as db } from '@/utils/firebase';
import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import CatalogFilter from '@/components/CatalogFilter';
import { getPosterFromTMDB } from '@/lib/tmdb';
import { getPosterFromSpotify } from '@/lib/spotify';

export const getStaticProps = async () => {
  const catalogRef = db.collection('catalog');
  const catalogData = (await catalogRef.get()).docs.map((doc) => doc.data());

  // todo: error handling
  const catalog = await Promise.all(
    catalogData.map(async (itemData) => {
      let item;
      if (itemData.type === 'movie' || itemData.type === 'tv') {
        item = getPosterFromTMDB(itemData);
      } else if (itemData.type === 'music') {
        item = getPosterFromSpotify(itemData);
      }
      return item;
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
      <GradientBar />
      <Navbar />
      <Box flexGrow={1} bg="gray.50">
        <Text align="center" color="red" fontWeight="semibold" pt={6}>
          IMPORTANT: Parasite is the only show enabled for the beta testing
          period.
        </Text>
        <CatalogFilter
          updateFilter={updateFilter}
          updateSearch={updateSearch}
          clearFilters={clearFilters}
        />
        <SimpleGrid columns={6} spacing={4} px={40} pb={20}>
          {catalogToShow.map((item) => (
            <Thumbnail key={item.slug} item={item} w="140px" h="210px" />
          ))}
        </SimpleGrid>
      </Box>
      {/* {catalog.map((item) => (
        <pre key={item.title}>{JSON.stringify(item, null, 2)}</pre>
      ))} */}
    </AuthCheck>
  );
};

export default Catalog;
