import BlogList from './BlogList';
import useFetch from './useFetch';
//import { useUserContext } from './UserContext';

const Home = () => {
	const { data: blogs, isPending, error } = useFetch('https://blogger-api-livid.vercel.app/blogs');
  //const { user } = useUserContext();

	return (
		<div className="home">
			{error && <div>{error}</div>}
			{isPending && <div>Loading...</div>}
			{blogs && <BlogList blogs={blogs} />}
		</div>
	);
}

export default Home;