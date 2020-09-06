import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from '../Home/Home';
import Navigation from '../Navigation/Navigation';
import Detail from '../Post_detail/Post_detail';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const Main = () => {
    let images = [];
    const userData = (profileImage, postImage) => {
        images[0] = profileImage;
        images[1] = postImage;
    }

    return (
        <>
            <Router>
                <Navigation />
                <Switch>
                    <Route path="/post/:id">
                        <Detail images={images} />
                    </Route>
                    <Route exact path="/videos">
                        <section className="d-flex flex-column align-items-center">
                            <h1>Videos page is coming soon</h1>
                            <Link to="/"><Button variant="contained" color="primary"> Go back to home</Button></Link>
                        </section>
                    </Route>
                    <Route exact path="/profile">
                        <section className="d-flex flex-column align-items-center">
                            <h1>Profile page is coming soon</h1>
                            <Link to="/"><Button variant="contained" color="primary"> Go back to home</Button></Link>
                        </section>
                    </Route>
                    <Route exact path="/">
                        <Home images={userData} />
                    </Route>
                    <Route path="*">
                        <section className="d-flex flex-column align-items-center">
                            <h1>404 error!!! No page found</h1>
                            <Link to="/"><Button variant="contained" color="primary"> Go back to home</Button></Link>
                        </section>
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Main;