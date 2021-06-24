import Head from 'next/head';
import { useAuth } from '../lib/auth';

export default function Home() {
  const auth = useAuth();

  // testing code: start
  const handleSignup = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signup(email, password);
  };

  const handleSignin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signin(email, password);
  };
  // testing code: end

  return (
    <div>
      <Head>
        <title>Hwalgi // Development</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* testing code: start */}
      <h1>Auth Skeleton</h1>

      <div>Signed in as: {auth.user?.email}</div>

      <form onSubmit={handleSignup}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
      <br />

      <form onSubmit={handleSignin}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Sign In</button>
      </form>
      <br />

      <button type="button" onClick={() => auth.signout()}>
        Sign Out
      </button>
      {/* testing code: end */}
    </div>
  );
}
