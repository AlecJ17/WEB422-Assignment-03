import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieDetails from '@/components/MovieDetails';
import Error from 'next/error';
import PageHeader from '@/components/PageHeader';

const fetcher = (url) => fetch(url).then((res) => res.json());

const API_BASE_URL = process.env.API_BASE_URL || 'https://web-422-assignment-01-xdaq.vercel.app';

export default function Movie() {
    const router = useRouter();
    const { title } = router.query;

    const { data, error } = useSWR(
        title ? `${API_BASE_URL}/api/movies?page=1&perPage=10&title=${title}` : null,
        fetcher
    );

    if (error) return <p>Failed to load movie.</p>;
    if (!data) return null;

    if (data.length === 0) {
        return <Error statusCode={404} />;
    }

    const movie = data[0];

    return (
        <div>
            <PageHeader text={movie.title} />
            <MovieDetails movie={movie} />
        </div>
    );
}

