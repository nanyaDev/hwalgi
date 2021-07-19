import NextLink from 'next/link';
// prettier-ignore
import { Flex, Button  } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Changelog from '@/components/Changelog';
import Forecast from '@/components/Forecast';
import HeatMap from '@/components/HeatMap';

const Dashboard = () => {
  return (
    <AuthCheck>
      <Navbar />
      <Flex grow={1} px={8} py={4} justify="space-between">
        <Flex grow={1} direction="column" justify="space-between">
          <Forecast />
          <HeatMap />
        </Flex>
        <Changelog />
      </Flex>
    </AuthCheck>
  );
};

export default Dashboard;
