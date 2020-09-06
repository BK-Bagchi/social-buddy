import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Posts from '../Posts/Posts'

const Home = (props) => {
    const imageCapture = props.images;
    const [user, setUser] = useState([]);
    const [profilePicture, setProfilePicture] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/')
            .then(data => setUser(data.data))
            .catch(error => console.log(error))

        axios.get('https://randomuser.me/api/?results=100')
            .then(data => setProfilePicture(data.data.results))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="row d-flex justify-content-center">
            {
                user.map((data, index) => {
                    let userId = data.id % 10;
                    if (userId === 0) {
                        userId = 5;
                    }

                    const maxSize = Math.floor(Math.random() * (500 - 300) + 300);
                    const minSize = Math.floor(Math.random() * (500 - 300) + 300);
                    const image = `https://picsum.photos/${maxSize}/${minSize}`;

                    return (
                        <Posts user={data}
                            userId={userId}
                            image={image}
                            key={data.id}
                            getImage={imageCapture}
                            profilePicture={profilePicture[index]} />
                    )
                })
            }
        </div>
    );
};

export default Home;