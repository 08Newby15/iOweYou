import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './personInfo.css';
import star from '../assets/star.png';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

const userImages = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
};

export default function PersonInformation() {
    const { id: loggedInUserId } = useParams();
    const storedUserInfos = localStorage.getItem('userInformation');
    const userInfos = storedUserInfos ? JSON.parse(storedUserInfos) : [];

    // Hier wird der eingeloggte Benutzer gesucht
    const loggedInUser = userInfos.find(userInfo => parseInt(userInfo.id) === parseInt(loggedInUserId));

    // Wieviele Sterne hat der eingeloggte Benutzer von wem erhalten
    const starSendersCount = loggedInUser.starsReceivedFrom.reduce((acc, senderId) => {
        const sender = userInfos.find(userInfo => parseInt(userInfo.id) === parseInt(senderId));
        if (sender) {
            acc[sender.name] = (acc[sender.name] || 0) + 1;
        }
        return acc;
    }, {});

    // Hier wird gezählt, wieviele Sterne der eingeloggte Benutzer an wen gegeben hat
    const starsGivenToCount = loggedInUser.starsGivenTo.reduce((acc, receiverId) => {
        const receiver = userInfos.find(userInfo => parseInt(userInfo.id) === parseInt(receiverId));
        if (receiver) {
            acc[receiver.name] = (acc[receiver.name] || 0) + 1;
        }
        return acc;
    }, {});

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const showStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<img src={star} alt="Star" key={i} style={{ height: '30px', width: '30px' }} />);
        }
        return stars;
    }

    return (
        <div id='backgroundPersonInfo'>
            <header className='d-flex justify-content-between align-content-center '>
                <h1 style={{ marginLeft: "5%", marginTop: "2%" }}>Persönliche Infos</h1>
                <button className='btn btn-info ' onClick={handleBack} style={{ marginRight: "5%", marginTop: "2%" }}>Zurück</button>
            </header>
            <div id='starField'>
                <h2>Deine Sterne</h2>
                <p>{showStars(loggedInUser.countStars)}</p>
            </div>
            <div className='row' id="rowPerson">
                <h2 style={{ marginBottom: "50px" }}>Infos</h2>
                <div className='col-md-6'>
                    <img src={userImages[loggedInUserId]} className='img-thumbnail' alt="User" style={{ height: '350px', width: '350px' }}></img>
                </div>
                <div className='col-md-6' id="textLeft">
                    <h2>Name: {loggedInUser.name}</h2>
                    <h2>Sterne: {loggedInUser.countStars}</h2>
                    <hr style={{marginRight: "20%", height:"10px", backgroundColor: "black", borderRadius:"50px"}}></hr>
                    <div className='row' style={{marginRight:"20%"}}>
                        
                        <div className='col-md-6'>
                            <h2>Sterne von:</h2>
                            <ul>
                                {Object.entries(starSendersCount).map(([name, count], index) => (
                                    <li key={index}>{name} {count > 1 && `(${count}x)`}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <h2>Sterne an:</h2>
                            <ul>
                                {Object.entries(starsGivenToCount).map(([name, count], index) => (
                                    <li key={index}>{name} {count > 1 && `(${count}x)`}</li>
                                ))}
                            </ul>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}
