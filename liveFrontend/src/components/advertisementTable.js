import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../config';  // Adjust the path accordingly
const apiUrl = `${config.apiBaseUrl}`;

export const AdvertisementTable = () => {
  const [advertisementData, setAdvertisementData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const scrollRef = useRef(null);
  const [questionDetails, setQuestionDetails] = useState([]);


    useEffect(() => {
      fetch(`${apiUrl}/getQuestionDetails`)
        .then(response => response.json())
        .then(results => {
          setQuestionDetails(results.questionData);
        })
        .catch(error => {
          console.error('Error fetching videos:', error);
        });
      },[]);

  // Function to fetch advertisement data from the backend API
  const fetchAdvertisementData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAdvertisementDetails`);
      setAdvertisementData(response.data.adData);
    } catch (error) {
      console.error('Error fetching advertisement data:', error);
    }
  };

  // Fetch advertisement data on component mount
  useEffect(() => {
    fetchAdvertisementData();
  }, []);

  // Function to handle deletion of an advertisement by ID
  const deleteAdvertisement = async (id) => {
    try {
      await axios.delete(`${apiUrl}/deleteAdvertisementDetails/${id}`);
      setAdvertisementData(advertisementData.filter(ad => ad.id !== id));
      alert('Advertisement deleted successfully.');
    } catch (error) {
      console.error('Error deleting advertisement:', error);
    }
  };

  const handleEditAndScroll = (id) =>{

    editAdvertisement(id);
    scrollRef.current.scrollIntoView({behaviour:'smooth'});
  }

  // Function to handle editing of an advertisement by ID
  const editAdvertisement = (id) => {

    // Find the advertisement with the given ID
    const adToEdit = advertisementData.find(ad => ad.id === id);
    // Set the edited data to the advertisement's data
    console.log("adToEdit",advertisementData)
    setEditedData(adToEdit);
  };

  // Function to handle updating an advertisement
  const updateAdvertisement = async () => {
    console.log("editedData before PUT",editedData)
    const adId = editedData.id;
    try {
      await axios.put(`${apiUrl}/updateAdvertisement/${adId}`, editedData);
      console.log('Advertisement updated successfully.',adId);
      console.log("editedData",editedData)
      // Clear the edited data
      setEditedData({});
      // Refresh the advertisement data
      fetchAdvertisementData();
      alert('Advertisement updated successfully.');
    } catch (error) {
      console.error('Error updating advertisement:', error);
    }
  };

  // Function to handle input change in the edit form
  const handleInputChange = (e) => {
    console.log("console for question",e.target.value);
    const { name, value, type, checked } = e.target;
    console.log(value)
    const newValue = type === 'checkbox' ? checked : value;
    setEditedData({ ...editedData, [name]: newValue });
    console.log(editedData)
  };

  return (
    <div>
      <h2>Advertisement Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad Video Link</th>
            <th>Total Option Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {advertisementData.map(ad => (
            <tr key={ad.id}>
              <td>{ad.id}</td>
              <td>{ad.adVideoLink}</td>
              <td>{ad.totalOptionNumber}</td>
              <td>
                <button onClick={() => deleteAdvertisement(ad.id)}>Delete</button>
                <button onClick={() => handleEditAndScroll(ad.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      <div ref={scrollRef}>
        <h2>Edit Advertisement</h2>
        <form>
          <label>ID: </label>
          <input type="text" name="id" value={editedData.id || ''} readOnly />
          <br />
          <label>Ad Video Link: </label>
          <input type="text" name="adVideoLink" value={editedData.adVideoLink || ''} onChange={handleInputChange} />
          <br />
          <label>Total Option Number: </label>
          <input type="number" name="totalOptionNumber" value={editedData.totalOptionNumber || ''} onChange={handleInputChange} />
          <br />
          <label>Is Deleted: </label>
          <select name="isDeleted" value={editedData.isDeleted || ''} onChange={handleInputChange}>
            <option value={"1"}>No</option>
            <option value={"0"}>Yes</option>
          </select>
          <br />

          <label>
            Question:
            <select name="questionTableID" value={editedData.questionTableID || ''} onChange={handleInputChange}>
              <option value="" disabled>Select Question</option>
              {questionDetails.map(question => (
                <option key={question.id} value={question.id}>{question.questionDescription}</option>
              ))}
            </select>
          </label>

          <button type="button" onClick={updateAdvertisement}>Update</button>
        </form>
      </div>
    </div>
  );
};
