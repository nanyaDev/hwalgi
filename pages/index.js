// prettier-ignore
import { Flex  } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Changelog from '@/components/Changelog';
import Forecast from '@/components/Forecast';
import HeatMap from '@/components/HeatMap';

const Dashboard = () => {
  return (
    <AuthCheck>
      <Navbar />
      <Flex grow={1} justify="space-between" bg="gray.50" p={8}>
        <Flex grow={1} direction="column" justify="flex-end">
          <Forecast />
          <HeatMap />
        </Flex>
        <Changelog />
      </Flex>
    </AuthCheck>
  );
};

export default Dashboard;
