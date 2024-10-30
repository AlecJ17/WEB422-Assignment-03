import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export default function MovieDetails({ movie }) {
    return (
        <Container>
            <Row>
                {movie.poster && (
                    <Col md>
                        <Image src={movie.poster} alt="poster" width={500} height={750} className="w-100" />
                        <br />
                        <br />
                    </Col>
                )}
                <Col md>
                    <strong>Directed By:</strong> {movie.directors ? movie.directors.join(', ') : 'N/A'}
                    <br /><br />
                    <p>{movie.fullplot}</p>
                    <strong>Cast:</strong> {movie.cast ? movie.cast.join(', ') : 'N/A'}
                    <br /><br />
                    <strong>Awards:</strong> {movie.awards ? movie.awards.text : 'N/A'}
                    <br />
                    <strong>IMDB Rating:</strong> {movie.imdb ? `${movie.imdb.rating} (${movie.imdb.votes} votes)` : 'N/A'}
                </Col>
            </Row>
        </Container>
    );
}
