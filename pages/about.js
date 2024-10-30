import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import MovieDetails from '@/components/MovieDetails';

// Fetch movie data at build time
export async function getStaticProps() {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://web-422-assignment-01-xdaq.vercel.app';
    const movieId = '573a139af29313caabcf0859'; // Your selected movie ID

    try {
        const res = await fetch(`${API_BASE_URL}/api/movies/${movieId}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch movie with ID: ${movieId}`);
        }
        const movie = await res.json();

        return {
            props: { movie },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { movie: null },
        };
    }
}



export default function About({ movie }) {
    return (
        <div>
            <PageHeader text="About the Developer: Alec Josef Serrano"/>
            <p>Hello! My name is Alec Josef Serrano, a developer passionate about web development.</p>
            <p>This project showcases my skills in building responsive and interactive web applications using Next.js,
                React, and Bootstrap.</p>
            <p>
                It is difficult to choose a favourite, but{" "}
                <Link href={`/movies/Dark City`}>
                     Dark City
                </Link>
                (released in 1998) is one that I always enjoy watching.
            </p>
            <p>Here is the featured movie from my collection:</p>
            <MovieDetails movie={movie}/>
        </div>
    );
}
