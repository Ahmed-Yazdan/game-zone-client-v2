import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Modal, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import './EditGames.css';

const style = {
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


const EditGames = () => {
    const [allGames, setAllGames] = useState([]);
    const [updatedInfo, setUpdatedInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [gameId, setGameId] = useState('');
    const {token} = useAuth();
    const handleOpen = id => {
        setOpen(true)
        setGameId(id)
    };
    const handleClose = () => setOpen(false);


    useEffect(() => {
        fetch('https://pure-depths-91725.herokuapp.com/games')
            .then(res => res.json())
            .then(data => {
                setAllGames(data);
            });
    }, []);

    const handleDelete = id => {
        const isExecuted = confirm(`Are you sure you want to delete ${id} ?`);
        if (isExecuted) {
            fetch('https://pure-depths-91725.herokuapp.com/games', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ gameId: id })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        alert(`Deleted ${id} successfully`);
                        const remaningGames = allGames.filter(games => games._id !== id);
                        setAllGames(remaningGames);
                    }
                });
        }
    }
    const handleEdit = e => {
        e.preventDefault();
        fetch('https://pure-depths-91725.herokuapp.com/games', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    alert('Updated successfully. Refresh the page to see the update');
                    handleClose();
                }
            })
    }
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...updatedInfo, id: gameId };
        newInfo[field] = value;
        setUpdatedInfo(newInfo);
        console.log(newInfo);
    }

    return (
        <div className='editgames'>
            <h1 style={{ textAlign: 'center' }}>Edit Games</h1>
            <h3 style={{ textAlign: 'center' }}>Total Games: {allGames.length}</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>unique_id</TableCell>
                            <TableCell>price</TableCell>
                            <TableCell>type</TableCell>
                            <TableCell>creator</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allGames.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ lineHeight:'14px'}} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.unique_id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.price}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.creator}
                                </TableCell>
                                <TableCell style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}} align="right">
                                    <Button className='editGames-button' sx={{ mx: 1 }}  size='small' onClick={() => handleOpen(row._id)}>Edit</Button>
                                    <Button className='editGames-button' sx={{ mx: 1 }} size='small' onClick={() => handleDelete(row._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form
                        style={{
                            display: 'flex',
                            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                            width: '100%',
                            marginTop: '30px'
                        }} onSubmit={handleEdit}>
                        <h1 style={{ margin: '50px 0px', color: '#1988D9' }}>Login</h1>
                        <TextField
                            id="field"
                            name="field"
                            label="Field (case sensitive)"
                            variant="standard"
                            className='textField'
                            type="text"
                            onBlur={handleOnBlur}
                            sx={{ my: 2 }}
                        />
                        <TextField
                            id="value"
                            name="value"
                            label="New Value"
                            variant="standard"
                            className='textField'
                            type="text"
                            onBlur={handleOnBlur}
                            sx={{ my: 2 }}
                        />
                        <Button type='submit' sx={{ my: 1 }} variant='contained' size='small'>Update</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditGames;