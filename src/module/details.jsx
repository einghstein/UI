import { Container } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";

export function DetailsScreen(props) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://devtest.teskalabs.com/detail/${id}`)
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                const text = await res.text();
                if (!text) return null; // Return null if response is empty
                return JSON.parse(text);
            })
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Container className="h-100 d-flex justify-content-center align-items-center">
                <Spinner color="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="h-100 d-flex justify-content-center align-items-center">
                {error.message}
            </Container>
        );
    }

    if (!data) {
        return (
            <Container className="h-100 d-flex justify-content-center align-items-center">
                No details found for this item.
            </Container>
        );
    }

    return (
        <Container className="h-100 py-4">
            <Card>
                <CardBody>
                    <CardTitle tag="h4">{data.title || "Detail"}</CardTitle>
                    {Object.entries(data).map(([key, value]) => (
                        <CardText key={key}>
                            <strong>{key}:</strong> {String(value)}
                        </CardText>
                    ))}
                </CardBody>
            </Card>
        </Container>
    );
}