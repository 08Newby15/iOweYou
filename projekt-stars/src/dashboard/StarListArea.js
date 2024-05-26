import React, { useState, useEffect } from 'react';
import { nothingImportantTrustMe } from '../login/nothingImportantTrustMe';
import { useParams } from 'react-router-dom';
import star from '../assets/star.png';
import { Link } from 'react-router-dom';

export default function StarListArea() {
    const { id: loggedInUserId } = useParams();
    const [userInfos, setUserInfos] = useState(() => {
        // Versuche, Benutzerinformationen aus dem localStorage abzurufen
        const storedUserInfos = localStorage.getItem('userInformation');
        return storedUserInfos ? JSON.parse(storedUserInfos) : nothingImportantTrustMe;
    });
    const [loggedInUserStars, setLoggedInUserStars] = useState(0);

    useEffect(() => {
        // Suche nach dem eingeloggten Benutzer und setzt die Anzahl der Sterne
        const loggedInUser = userInfos.find(userInfo => parseInt(userInfo.id) === parseInt(loggedInUserId));
        if (loggedInUser) {
            setLoggedInUserStars(loggedInUser.countStars);
        }
    }, [userInfos, loggedInUserId]);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUserInfos = localStorage.getItem('userInformation');
            if (updatedUserInfos) {
                setUserInfos(JSON.parse(updatedUserInfos));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const showStars = (count) => {
        if (count >= 0) {
            
            const stars = [];
            for (let i = 0; i < count; i++) {
                stars.push(<img src={star} alt="Star" key={i} style={{ height: '15px', width: '15px' }} />);
            }
            return stars;
        } else {
            const negativeStars = [];
            for (let i = 0; i > count; i--) {
                negativeStars.push(<span style={{ color: 'red' }}>X</span>);
            }
            return negativeStars;
        }
    };

    return (
        <div>
            <h2>Überblick</h2>
            <table>
                <thead>
                    <tr style={{ fontSize: "24px" }}>
                        <th style={{ paddingRight: "20px" }}>Name</th>
                        <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                    {userInfos.map((userInfo, index) => (
                        <tr key={index}>
                            <td style={{ paddingRight: "20px" }}>
                                <Link style={{ textDecoration: "none", fontSize: "20px", color: 'white' }} to={`/personInformation/${userInfo.id}`}>{userInfo.name}</Link>
                            </td>
                            <td>{showStars(userInfo.countStars)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
