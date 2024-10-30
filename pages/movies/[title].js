import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieDetails from '@/components/MovieDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Movie() {
    const router = useRouter();
    const { title } = router.query; // Retrieve the "title" parameter from the URL

    // Fetch movie data based on title
    const { data, error } = useSWR(title ? `https://web-422-assignment-01-xdaq.vercel.app/api/movies?page=1&perPage=10&title=${title}` : null, fetcher);

    // Handle loading and error states
    if (error) return <p>Failed to load movie.</p>;
    if (!data) return null; // Show nothing while loading

    // Check if the movie was found
    if (data.length === 0) {
        return <Error statusCode={404} />; // Show a 404 error if no movie was found
    }

    const movie = data[0]; // Get the first movie (assuming there's only one match)

    return (
        <div>
            <PageHeader text={movie.title} />
            <MovieDetails movie={movie} />
        </div>
    );
}
