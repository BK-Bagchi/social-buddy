import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        background: 'linear-gradient(to right bottom, #ecf0f1, #7f8c8d, #747d8c)',
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
    root2: {
        width: '100%',
        background: 'linear-gradient(to right bottom, #ecf0f1 20%, #7f8c8d 20%, #747d8c 10%)',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
}));

const Post_detail = (props) => {
    const [profileImage, postImage] = props.images;
    const [getName, setName] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentPicture, setCommentPicture] = useState([]);
    const [post, setPost] = useState([]);

    const { id } = useParams();
    let userId = id % 10;
    if (userId === 0) {
        userId = 5;
    }

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(data => setName(data.data))
            .catch(err => console.log(err));

        axios.get(`https://jsonplaceholder.typicode.com/posts/${userId}`)
            .then(data => setPost(data.data))
            .catch(err => console.log(err));

        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`)
            .then(data => setComment(data.data))
            .catch(err => console.log(err));

        axios.get('https://randomuser.me/api/?results=10')
            .then(data => setCommentPicture(data.data.results))
            .catch(err => console.log(err))
    }, [])

    const { name, email } = getName;
    const { title, body } = post;

    const classes = useStyles();

    return (
        <div className="col-md-6 mx-auto">
            <div className="my-2">
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <img src={profileImage} alt="" />
                            </Avatar>
                        }
                        title={name}
                        subheader={email}
                    />
                    <CardMedia
                        className={classes.media}
                        image={postImage}
                    />
                    <CardContent>
                        <Typography style={{ color: 'white' }} className="mb-4" variant="body2" color="textSecondary" component="p">
                            {title}
                        </Typography>
                        <Typography style={{ color: 'white' }} variant="body2" color="textSecondary" component="p">
                            {body}
                        </Typography>
                    </CardContent>


                    <div className={classes.root2}>
                        <Accordion style={{
                            background: 'linear-gradient(to right bottom, #ecf0f1, #7f8c8d, #747d8c)',
                        }}>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Comments</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <section className="comments-section">
                                    <small>View {comment.length} more comments</small>
                                    {
                                        comment.map((data, index) => {
                                            let commenterImage = '';
                                            if (commentPicture[index] !== undefined) {
                                                commenterImage = <img src={commentPicture[index].picture.medium} alt="Commenter Img" />
                                            }
                                            return (
                                                <div className="row d-flex" key={data.id}>
                                                    <div className="col-2 mb-3">
                                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                                            {commenterImage}
                                                        </Avatar>
                                                    </div>
                                                    <div className="col-10 mb-3">
                                                        <p className="m-0">{data.name}</p>
                                                        <small>{data.email}</small>
                                                        <h6 className="mt-2">{data.body}</h6><hr />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Post_detail;