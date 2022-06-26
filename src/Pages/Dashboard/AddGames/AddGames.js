import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import './AddGames.css';

const AddGames = () => {
    const [gameData, setGameData] = useState({});
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        let newData = { ...gameData };
        newData[field] = value
        setGameData(newData);
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        fetch('https://pure-depths-91725.herokuapp.com/games', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(gameData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert(`Added ${gameData.name} successfully`);
                };
            });
    };

    return (
        <div className='add-games'>
            <h1 style={{ textAlign: 'center' }}>Add a Game</h1>
            <form
                onSubmit={handleOnSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="standard"
                    className='textField'
                    type="text"
                    onBlur={handleOnBlur}
                    sx={{ width: '50%' }}
                    required
                />
                <TextField
                    id="image_url"
                    name="image_url"
                    label="Image url"
                    variant="standard"
                    className='textField'
                    type="text"
                    onBlur={handleOnBlur}
                    sx={{ width: '50%' }}
                    required
                />
                <TextField
                    id="unique_id"
                    name="unique_id"
                    label="Unique ID"
                    variant="standard"
                    className='textField'
                    type="text"
                    onBlur={handleOnBlur}
                    sx={{ width: '50%' }}
                    required
                />
                <TextField
                    id="type"
                    name="type"
                    label="Types ,for example: shooter,fps"
                    variant="standard"
                    className='textField'
                    type="text"
                    onBlur={handleOnBlur}
                    sx={{ width: '50%' }}
                    required
                />
                <TextField
                    id="creator"
                    name="creator"
                    label="Creator"
                    variant="standard"
                    className='textField'
                    type="text"
                    onBlur={handleOnBlur}
                    sx={{ width: '50%' }}
                    required
                />
                <TextField
                    id="price"
                    name="price"
                    label="Price"
                    variant="standard"
                    className='textField'
                    type="number"
                    onBlur={handleOnBlur}
                    sx={{ width: '50%' }}
                    required
                />
                <TextField
                    id="description"
                    label="Description"
                    name='description'
                    multiline
                    maxRows={4}
                    onBlur={handleOnBlur}
                    sx={{ width: '50%', mt: 2 }}
                    required
                />
                <Button type='submit' sx={{ display: 'block', my: 5, p:1 }} className='addgames-button'>Add game</Button>
            </form>
        </div>
    );
};

export default AddGames;