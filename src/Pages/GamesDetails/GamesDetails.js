import React, { useEffect, useState } from 'react';

const GamesDetails = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => {
                setGames(data);
            })
    }, []);

    console.log(games)
    return (
        <div>
            This is game details
        </div>
    );
};

export default GamesDetails;