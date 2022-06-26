import React, { useEffect, useState } from 'react';
import GamesCard from '../../Components/Games/GamesCard/GamesCard';
import "./Games.css";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Grid, Container } from '@mui/material';
import NavbarCustom from '../../Components/Home/NavbarCustom/NavbarCustom';

const Games = (props) => {

    const { itemCount, isNavbar, showButton } = props;
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://pure-depths-91725.herokuapp.com/games')
            .then(res => res.json())
            .then(data => {
                setGames(data);
            })
    }, []);

    return (
        <div className='Games'>
            {
                isNavbar == true && <NavbarCustom />
            }
            <Box sx={{ flexGrow: 1 }}>
                <Container >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            games.slice(0, itemCount).map(game =>
                                <GamesCard game={game} key={game.unique_id} showButton={showButton} />
                            )
                        }
                    </Grid>
                </Container>
            </Box>
        </div>

    );
};

export default Games;