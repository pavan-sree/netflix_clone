import React, { useEffect, useState } from 'react';
import netlogo from '../assets/images/netlogo.png';
import { storage } from '../config/firebase'; // Ensure you import your Firebase configuration properly
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import copyVideo from './copyVideo';

export const TvShow = ({user}) =>{
    const [videos, setVideos] = useState([]);
    const [desc, setDesc] = useState([]);

    useEffect(() => {
        // Function to fetch video URLs from Firebase Storage
        const fetchVideoUrls = async () => {
            const folders = ['tvShows']; // Add all your folders here

            try {
                const videoUrls = [];
                const videoDescs = [];

                // Iterate through each folder and fetch video URLs
                await Promise.all(folders.map(async (folder) => {
                    const storageRef = ref(storage, folder);
                    const listResult = await listAll(storageRef);

                    await Promise.all(listResult.items.map(async (itemRef) => {
                        const url = await getDownloadURL(itemRef);
                        videoUrls.push(url);
                        const fetchDesc = itemRef._location.path_;
                        const videoDesc = fetchDesc.replace(new RegExp(`^${folder}\/y2mate\.com|\.mp4$`, 'g'), '');

                        
                        videoDescs.push(videoDesc);
                         
                    }));
                }));

                setDesc(videoDescs);
                setVideos(videoUrls);
                
            } catch (error) {
                console.error('Error fetching video URLs:', error);
                // Handle error as needed
            }
        };

        // Call the fetch function to load video URLs on component mount
        fetchVideoUrls();

    }, []); // Empty dependency array ensures useEffect runs once on mount
    const handleAddClick = (videoPath,user) => {
        copyVideo(videoPath,user);
        console.log(videoPath+" "+user)
    };

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
                {Array.isArray(videos) && videos.map((video, index)  => (
                    <div key={index} className="video-container" style={{ border: '1px solid #ccc', padding: '8px' }}>
                        <video width="100%" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <button className="btn-3" onClick={() => handleAddClick(video,user.email)}>Add to Mylist</button>
                        <h3 className="desc">{desc[index]}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

};
export default TvShow;