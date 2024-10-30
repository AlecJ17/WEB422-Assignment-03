/*********************************************************************************
 *  WEB422 – Assignment 3
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Alec Josef Serrano
 *  Student ID: 133592238
 *  Date: October 29, 2024
 ********************************************************************************/
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Accordion, Pagination } from 'react-bootstrap';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';

export default function Home() {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const API_BASE_URL = process.env.API_BASE_URL || 'https://web-422-assignment-01-xdaq.vercel.app';

    // Fetch movie data using SWR
    const { data, error } = useSWR(`${API_BASE_URL}/api/movies?page=${page}&perPage=10`);

    // Update pageData whenever new data is fetched
    useEffect(() => {
        if (data) {
            console.log("Fetched data:", data);
            setPageData(data);
        } else {
            console.log("No data found");
        }
    }, [data]);

    // Handle pagination
    const previous = () => {
        if (page > 1) setPage(page - 1);
    };

    const next = () => {
        setPage(page + 1);
    };

    if (error) return <p>Failed to load movies.</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <PageHeader text="Film Collection : Sorted by Date" />

            <Accordion>
                {pageData.map((movie) => (
                    <Accordion.Item eventKey={movie._id} key={movie._id}>
                        <Accordion.Header>
                            <strong>{movie.title}</strong> ({movie.year}) - {movie.directors.join(', ')}
                        </Accordion.Header>
                        <Accordion.Body>
                            <MovieDetails movie={movie} />
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Pagination className="mt-4">
                <Pagination.Prev onClick={previous} disabled={page === 1} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={next} />
            </Pagination>
        </div>
    );
}
