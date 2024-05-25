
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/theatre.css';
import config from '../config';
const apiUrl = `${config.apiBaseUrl}`;

export const Theateroperator = () => {
  const [schedulerData, setSchedulerData] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');

  useEffect(() => { // Fetch scheduler data from the backend API using axios
    axios.get(`${apiUrl}/getSchedulerData`)
      .then(response => {
        setSchedulerData(response.data);
        console.log("Response",response.data)
      })
      .catch(error => {
        console.error('Error fetching scheduler data:', error);
      });
  }, []);

  const handlePlayButtonClick = (scheduler) => { // Extract video links from the scheduler
    console.log("scheduler",scheduler)
    console.log("scheduler.video_links",scheduler.videoLinks)
    console.log(" type of scheduler.video_links",typeof(scheduler.videoLinks))

    var validVideoLinks = scheduler.video_links
      .filter(videoLink => videoLink && Object.values(videoLink)[0])
      .map(videoLink => videoLink && Object.values(videoLink)[0]);


      const myArray = Object.values(validVideoLinks);//convert object of values - link to array of links

   localStorage.setItem('videoLinks', JSON.stringify(myArray));
  
    // Redirect to the video player page
  window.location.href = 'video-player'; // Change the path as needed*/}
  };
  
  const playVideo = (videoUrl) => {
    console.log('Opening video:', videoUrl);

    // Redirect to the video URL in the same tab
    window.location.href = videoUrl;
  };


  const renderSchedulerPlaylist = () => {

    if (!schedulerData || schedulerData.length === 0) {
      return <p>No scheduler data available.</p>;
    }  
    //swapnil code eliminate duplicate data
    // Flatten the nested arrays
    const flattenedSchedulerData = schedulerData.schedulerData.flat();

    // Use a Set to eliminate duplicates based on scheduler_id
    const uniqueSchedulers = Array.from(new Set(flattenedSchedulerData.map(scheduler => scheduler.id)))
      .map(schedulerId => flattenedSchedulerData.find(scheduler => scheduler.id === schedulerId));

      console.log("uniqueSchedulers",uniqueSchedulers);
      console.log("type of data",typeof(uniqueSchedulers[0].videoLinks))
  return uniqueSchedulers.map((scheduler, index) => (
    <div key={index} className="nested-scheduler-container">
      <div className="scheduler-playlist-item">
        <h3>{`Slot ${scheduler.slotIndex} - ${new Date(scheduler.startDate).toDateString()}`}</h3>
        <ul>
          {JSON.parse(scheduler.videoLinks)
            .filter(videoLink => videoLink && Object.values(videoLink)[0]) // Filter out null or empty links
            .map((videoLink, videoIndex) => (
              <li key={videoIndex}>
                <a href={Object.values(videoLink)[0]} target="_blank" rel="noopener noreferrer">
                  {`Video ${videoIndex + 1}: ${videoLink}`}
                </a>
                <br />
              </li>
            ))}
        </ul>
        {/* <button onClick={() => handlePlayButtonClick(scheduler)}>Play All</button> */}
        <button >Play All</button>
      </div>
    </div>
  ));
};

  const theaters = [
    { id: 1, name: 'Theater A' },
    { id: 2, name: 'Theater B' },
    { id: 3, name: 'Theater C' },
    { id: 4, name: 'Theater D' },
    // Add more theaters as needed
  ];

  return (
    <>
      <h1>Operator Playlist</h1>


      <div className="scheduler-playlist-wrapper">
        {renderSchedulerPlaylist()}
      </div>
    </>
  );
};

