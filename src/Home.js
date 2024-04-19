import BlogList from './BlogList';
import useFetch from './useFetch';
import { app, analytics } from './firebase';

const Home = () => {
	const { data: blogs, isPending, error } = useFetch('https://blogger-api-livid.vercel.app/blogs');
  console.log(app);
  console.log(analytics);

	return (
		<div className="home">
			{error && <div>{error}</div>}
			{isPending && <div>Loading...</div>}
			{blogs && <BlogList blogs={blogs} />}
		</div>
	);
}

export default Home;