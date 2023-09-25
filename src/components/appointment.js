import React, { useEffect, useState } from "react";
import "../css/appointment.css";
import { consultentData } from "../apiData/consultentData";
import { useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const Appointment = () => {
  const [apiData, setApiData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    consultentData()
      .then((data) => {
        console.log(data.doctors[id].specialist_doctors);
        setApiData(data.doctors[id].specialist_doctors);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, [id]); // Include 'id' as a dependency to re-fetch data when it changes

  return (
    <div>
      {apiData.length ? (
        apiData.map((doctor, index) => (
          <div key={index}>
            <div className="doctor-card">
              <img
                className="doctor-image"
                src={doctor.image_url}
                alt={`Dr. ${doctor.name}`}
              />
              <div className="doctor-info">
                <div className="doctor-details">
                  <p className="doctor-name">{doctor.name}</p>
                  <p className="doctor-type">{doctor.type}</p>
                  <p className="doctor-experience">
                    {doctor.experience_years} years of experience overall
                  </p>
                  <div className="doctor-location">
                    <p>{doctor.location}</p>
                    <p>⚫</p>
                    <p>{doctor.name.replace(/^Dr.\s+/i, "")} Clinic</p>
                  </div>
                  <p className="doctor-fee">
                    {doctor.fee} Consultation fee at Clinic
                  </p>
                  <div className="doctor-ratings">
                    <p className="doctor-assurance">👍🏻{doctor.assurance}%</p>
                    <p className="patient-stories">
                      {doctor.patient_stories_count} Patient Stories
                    </p>
                  </div>
                </div>
                <div className="doctor-actions">
                  <button className="book-appointment-button">
                    Book Appointment No Booking Fee
                  </button>

                  <p>
                    <img
                      className="book-appoinment-img"
                      src="https://private-user-images.githubusercontent.com/86207985/270438330-1b6557b0-2f72-42b1-aa2f-2c4e740c0a5e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTU2Njc5NDQsIm5iZiI6MTY5NTY2NzY0NCwicGF0aCI6Ii84NjIwNzk4NS8yNzA0MzgzMzAtMWI2NTU3YjAtMmY3Mi00MmIxLWFhMmYtMmM0ZTc0MGMwYTVlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA5MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwOTI1VDE4NDcyNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWEyNGQ1MjQ2YjJiM2I3OGFhMTllYTIxM2VhODhkZDA0MzMzNTA2Y2U3MzU3Y2NiM2RjYzMyMGNmNDBlMmU5ODQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Ch04Y8upA1l_180WIrFX7Mq19pkzqafvZ6u1uyYmlNo"
                    />
                    Available Today
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Appointment;
