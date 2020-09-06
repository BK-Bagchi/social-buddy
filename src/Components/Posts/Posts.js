import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        background: 'linear-gradient(to right bottom, #ecf0f1 20%, #7f8c8d 20%, #747d8c 10%)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    //default profile picture to avoid undefined assign error
    let profilePicture = 'https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png';
    if (props.profilePicture !== undefined) {
        profilePicture = props.profilePicture.picture.medium;
    }

    const imageCapture = props.getImage;

    const { id, title, body } = props.user;
    const [userName, setUserName] = useState([]);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
            .then(data => setUserName(data.data))
            .catch(error => console.log(error))
    }, []);
    const { name, email } = userName;

    const classes = useStyles();

    return (
        <div className="col-md-4">
            <div className="my-2 d-flex justify-content-center">
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <img src={profilePicture} alt="" />
                            </Avatar>
                        }
                        title={name}
                        subheader={email}
                    />
                    <CardMedia
                        className={classes.media}
                        image={props.image}
                    />
                    <CardContent>
                        <Typography style={{ color: 'lightgray' }} className="mb-4" variant="body2" color="textSecondary" component="p">
                            {title}
                        </Typography>
                        <Typography style={{ color: 'lightgray' }} variant="body2" color="textSecondary" component="p">
                            {body}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Link to={"/post/" + id}><Button style={{ color: 'white' }} onClick={() => imageCapture(profilePicture, props.image)}>See More</Button></Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
