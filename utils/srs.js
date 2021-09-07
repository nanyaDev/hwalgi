const hour = 60 * 60 * 1000;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;

const srsIntervals = {
  1: 4 * hour,
  2: 8 * hour,
  3: 1 * day,
  4: 2 * day,
  5: 1 * week,
  6: 2 * week,
  7: 1 * month,
  8: 4 * month,
  9: null,
};

const getSRSInterval = (srs) => srsIntervals[srs];

const decrementSRS = (srs, nIncorrect) => {
  const penalty = srs >= 5 ? 2 : 1;
  const leechFactor = Math.ceil(nIncorrect / 2);

  const ret = srs - penalty * leechFactor;
  return ret >= 1 ? ret : 1;
};

export { getSRSInterval, decrementSRS };
