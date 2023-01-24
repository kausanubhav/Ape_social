import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readClient } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

export default function Feed() {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();
    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            readClient.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            setLoading(true);
            readClient.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);

    if (loading) return <Spinner message="We are adding new ideas to your feed" />;
    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}
