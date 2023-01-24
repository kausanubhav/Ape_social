import { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import {  readClient } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';
export default function Search({ searchTerm }) {
    const [pins, setPins] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            const query = searchQuery(searchTerm.toLowerCase());
            readClient
                .fetch(query)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                });
        } else {
            readClient
                .fetch(feedQuery)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                });
        }
    }, [searchTerm]);
    return (
        <div>
            {loading && <Spinner message="Searching for pins" />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl">No Pins found</div>
            )}
        </div>
    );
}
