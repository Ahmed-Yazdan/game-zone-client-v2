import { Box, Grid, Modal } from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./GamesCard.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useAuth from '../../../hooks/useAuth';

const GamesCard = (props) => {
    const { name, type, image_url, price, unique_id, _id, description } = props.game;
    const showButton = props.showButton;
    const perType = type.split(',');
    const { email } = useAuth().user;
    const urlForCart = `/cart/:${email}`;
    const urlForDetails = `/games/:${unique_id}`;

    const handleAddToCart = (data) => {
        const gameDetails = {
            name: name,
            price: price,
            unique_id: unique_id,
            email:email,
            gameId: _id
        };
        const url = `https://pure-depths-91725.herokuapp.com/cart?email=${email}`;
        fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(gameDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId)
                    alert(`added ${name} to cart successfully`);
            });
    };

// Modal Things
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const styleForModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

return (
    <Grid item xs={4} sm={4} md={4} className='games-card'>
        <Card>
            <CardMedia
                component="img"
                sx={{ height: '300px' }}
                image={image_url}
            />
            <CardContent>
                <Typography id='game-name' gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ color: 'teal' }} gutterBottom variant="h6" component="div">
                    Price: ${price}
                </Typography>
                <div className="types-container">
                    {
                        perType.map(value => <button className="types-button">{value}</button>)
                    }
                </div>
            </CardContent>
            {
                showButton == true ?
                    <CardActions>
                        <Button variant='small' onClick={handleAddToCart} className="bottom-button">Add to cart</Button>
                        <Button variant='small' onClick={handleOpen} className="bottom-button" >Details</Button>
                    </CardActions>
                    :
                    null
            }
        </Card>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modal'
        >
            <Box sx={styleForModal}>
                <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Tags: {
                        perType.map(type => <h5>{type}</h5>)
                    }
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Price: ${price}
                </Typography>
                <Typography align='center' id="modal-modal-description" sx={{ mt: 2, mb:1 }}>
                    {description && description}
                </Typography>
                <div>
                    <Button onClick={handleAddToCart} className='modal-button'>Add to cart</Button>
                </div>
            </Box>
        </Modal>
    </Grid>
);
};
export default GamesCard;

//  image_url
































/* 


 <div className='container'>
            <div className='card'>
            <div className='imageDiv'>
                <img src="https://assets.xboxservices.com/assets/3d/1a/3d1af36a-b0b2-41c8-95b7-e4e71c146674.jpg?n=Forza-Horizon-5_GLP-Page-Hero-0_1083x609_03.jpg" alt="" />
            </div>
            <div className='contentsDiv'>
                <h1>Forza Horizon 5</h1>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium veritatis asperiores deleniti? Iure, odio? Necessitatibus amet ratione, quasi porro optio alias fuga, fugiat nostrum, quisquam laudantium tenetur asperiores fugit. Rem incidunt nisi ut fugit praesentium, quibusdam obcaecati sapiente consequatur blanditiis! Atque quod voluptatem hic unde aliquam qui error cum excepturi! Qui exercitationem est ipsum! Aspernatur adipisci dolorem, ab sequi illo deserunt perferendis maiores nisi ducimus cum cupiditate cumque, delectus recusandae vero omnis aliquid quo ipsam architecto similique nemo corrupti? Amet odit et aliquid praesentium sapiente, mollitia optio animi modi eligendi distinctio voluptas maiores, temporibus doloremque pariatur, doloribus suscipit accusamus iure. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel maiores cupiditate praesentium assumenda voluptates, cum numquam unde laudantium dolorem quidem earum qui enim amet libero ab nulla vitae at dicta aut doloremque! Exercitationem dignissimos eius nobis quia ipsa quam, odit maiores libero reprehenderit illum cumque aperiam nemo tenetur harum corporis animi itaque aut veniam totam voluptas tempore ut. Iure, inventore dolorem culpa illum voluptate perspiciatis rerum optio. Minus velit omnis esse corrupti illum aliquam voluptates, fugit adipisci officia sunt eum, rem quia temporibus laboriosam earum fugiat accusantium. Reiciendis debitis culpa ducimus animi, nulla aliquid voluptate porro molestias odit? Debitis, quos.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur quasi odit tempore saepe, recusandae velit? Vitae quia minima sequi.</p>
            </div>
        </div>
        <div className='card'>
            <div className='imageDiv'>
                <img src="https://assets.xboxservices.com/assets/3d/1a/3d1af36a-b0b2-41c8-95b7-e4e71c146674.jpg?n=Forza-Horizon-5_GLP-Page-Hero-0_1083x609_03.jpg" alt="" />
            </div>
            <div className='contentsDiv'>
                <h1>Forza Horizon 5</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur quasi odit tempore saepe, recusandae velit? Vitae quia minima sequi.</p>
            </div>
        </div>
        <div className='card'>
            <div className='imageDiv'>
                <img src="https://assets.xboxservices.com/assets/3d/1a/3d1af36a-b0b2-41c8-95b7-e4e71c146674.jpg?n=Forza-Horizon-5_GLP-Page-Hero-0_1083x609_03.jpg" alt="" />
            </div>
            <div className='contentsDiv'>
                <h1>Forza Horizon 5</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur quasi odit tempore saepe, recusandae velit? Vitae quia minima sequi.</p>
            </div>
        </div>
        <div className='card'>
            <div className='imageDiv'>
                <img src="https://assets.xboxservices.com/assets/3d/1a/3d1af36a-b0b2-41c8-95b7-e4e71c146674.jpg?n=Forza-Horizon-5_GLP-Page-Hero-0_1083x609_03.jpg" alt="" />
            </div>
            <div className='contentsDiv'>
                <h1>Forza Horizon 5</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur quasi odit tempore saepe, recusandae velit? Vitae quia minima sequi.</p>
            </div>
        </div>
        </div> 
        */