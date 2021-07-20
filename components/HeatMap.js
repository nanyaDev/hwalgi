import { Box, Flex, Heading } from '@chakra-ui/react';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { AxisBottom, AxisLeft } from '@visx/axis';

import { binData } from '@/utils/mockData';

// ? does using an svg grid like GitHub does result in better performance
// ! @visx/heatmap and @visx/shape installed with --legacy-peer-deps
// ! cf. https://github.com/airbnb/visx/issues/872
// todo: make this responsive, remove all the hardcoded numbers
const HeatMap = () => {
  // todo: get 53 and 7 from data
  const sideLength = 13;
  const width = 53 * sideLength;
  const height = 7 * sideLength;

  const xScale = scaleLinear({
    domain: [0, 53],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, 7],
    range: [0, height],
  });

  const colorScale = scaleLinear({
    domain: [0, 100], // ! fix this
    range: ['#eeedff', '#2b6cb0'],
  });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // prettier-ignore
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const xTickValues = [0, 6, 10, 14, 18, 23, 27, 32, 36, 40, 45, 49];
  // ? what are these parameters
  const xTickFormat = (_, i) => months[i];

  const yTickValues = [1, 2, 3, 4, 5, 6, 7];
  const yTickFormat = (_, i) => days[i];

  return (
    <Flex
      direction="column"
      justify="flex-end"
      align="center"
      h="30%"
      bg="white"
      boxShadow="base"
      rounded="md"
    >
      <Heading alignSelf="flex-start" size="sm" color="gray.600" pl={8} mb={3}>
        Activity Heat Map
      </Heading>
      <svg width={width + 30} height={height + 20}>
        <Group left={30}>
          <HeatmapRect
            data={binData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            binWidth={sideLength}
            binHeight={sideLength}
            gap={2}
          />
          <AxisLeft
            scale={yScale}
            top={-5}
            left={5}
            tickValues={yTickValues}
            tickFormat={yTickFormat}
            hideTicks
            hideAxisLine
            numTicks={7}
          />
          <AxisBottom
            scale={xScale}
            top={height - 10}
            left={8}
            tickValues={xTickValues}
            tickFormat={xTickFormat}
            hideTicks
            hideAxisLine
            numTicks={53}
          />
        </Group>
      </svg>
    </Flex>
  );
};

export default HeatMap;
