import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { barData } from '@/utils/mockData';

// todo: make this responsive
const Forecast = () => {
  const xMax = 680;
  const yMax = 180;

  // ? why are these memoized for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: barData.map((d) => d.letter),
        padding: 0.4,
      }),
    [xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...barData.map((d) => +d.frequency))],
      }),
    [yMax]
  );

  const xPoint = (d) => xScale(d.letter);
  const yPoint = (d) => yScale(d.frequency);

  return (
    <Box h="33%" bg="white" rounded="md" border="1px" borderColor="gray.200">
      <svg width={700} height={200}>
        {barData.map((d) => {
          return (
            <Bar
              key={`bar-${d.letter}`}
              x={xPoint(d)}
              y={yPoint(d)}
              width={xScale.bandwidth()}
              height={yMax - yPoint(d)}
              fill="tomato"
            />
          );
        })}
      </svg>
    </Box>
  );
};

export default Forecast;
