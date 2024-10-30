// PageHeader.js

import { Card } from 'react-bootstrap';

export default function PageHeader({ text }) {
    return (
        <Card className="bg-light my-4">
            <Card.Body>
                <h4 style={{ fontWeight: 'bold' }}>{text}</h4>
            </Card.Body>
        </Card>
    );
}
