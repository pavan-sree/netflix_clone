import React, { useEffect, useState } from 'react';
import netlogo from '../assets/images/netlogo.png';
import { storage } from '../config/firebase'; // Ensure you import your Firebase configuration properly
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

export const Mylist = ({user}) =>{
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Function to fetch video URLs from Firebase Storage
        const fetchVideoUrls = async () => {
            try {
                
                const storageRef = ref(storage, user.email);

                // List all items in the storage bucket
                const listResult = await listAll(storageRef);

                // Array to hold all video URLs
                const videoUrls = [];

                // Iterate through each item and get its download URL
                await Promise.all(listResult.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    videoUrls.push(url);
                }));

                // Set the state with fetched video URLs
                setVideos(videoUrls);

            } catch (error) {
                console.error('Error fetching video URLs:', error);
                // Handle error as needed
            }
        };

        // Call the fetch function to load video URLs on component mount
        fetchVideoUrls();

    }, []); // Empty dependency array ensures useEffect runs once on mount

    return (
        <div>
            <nav className="nav-1">
                <img className="img-1" src={netlogo} alt="Net Logo" />
                <Link className="navtext" to='/home'>Home</Link>
                <Link className="navtext" to='/tvShow'>TV Shows</Link>
                <Link className="navtext" to='/movies'>Movies</Link>
                <Link className="navtext" to='/Mylist'>My List</Link>
                <img className="img-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile" />
                <a className="navtext-0">{user.email}</a>
            </nav>
           
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '16px' }}>
           
                {Array.isArray(videos) && videos.map((video, index) => (
                    <div key={index} className="video-container" style={{ border: '1px solid #ccc', padding: '8px' }}>
                        <video width="100%" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
        </div>
    )

}
export default Mylist;