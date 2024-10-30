import Link from 'next/link';
import { Card } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import MovieDetails from '@/components/MovieDetails';

// Fetch movie data at build time
export async function getStaticProps() {
    const movieId = '573a139af29313caabcf0859'; // Use the provided movie ID for "Traffic in Souls"

    try {
        const res = await fetch(`https://web-422-assignment-01-xdaq.vercel.app/api/movies/${movieId}`);
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
