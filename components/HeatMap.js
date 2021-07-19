import { Box } from '@chakra-ui/react';
import { scaleLinear } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';

import { binData } from '@/utils/mockData';

// ? does using an svg grid like GitHub does result in better performance
// ! @visx/heatmap and @visx/shape installed with --legacy-peer-deps
// ! cf. https://github.com/airbnb/visx/issues/872
// todo: make this responsive
const HeatMap = () => {
  // todo: get 53 and 7 from data
  const sideLength = 13;
  const width = 53 * sideLength;
  const height = 7 * sideLength;

  const xScale = scaleLinear({
    range: [0, width],
    domain: [0, 53],
  });

  const yScale = scaleLinear({
    range: [0, height],
    domain: [0, 7],
  });

  const colorScale = scaleLinear({
    range: ['#122549', '#b4fbde'],
    domain: [0, 100], // ! fix this
  });

  return (
    <Box h="33%" bg="white" rounded="md" border="1px" borderColor="gray.200">
      <svg width={width} height={height}>
        <HeatmapRect
          data={binData}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          binWidth={sideLength}
          binHeight={sideLength}
          gap={2}
        />
      </svg>
    </Box>
  );
};

export default HeatMap;
