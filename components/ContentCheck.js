import Loader from '@/components/Loader';

// ? when using a ContentCheck wrapper review.title and reviews.length in TitleBar need conditional
// ? chaining, but it works if using an if statement above the primary return in <Reviews />
// todo: fix spinner jump when going from AuthCheck to ContentCheck
const ContentCheck = ({ children, content }) => {
  return content === null ? <Loader /> : children;
};

export default ContentCheck;
