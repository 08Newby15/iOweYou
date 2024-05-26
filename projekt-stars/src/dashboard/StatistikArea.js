import React, { useState, useEffect } from 'react'
import { nothingImportantTrustMe } from '../login/nothingImportantTrustMe';


export default function StatistikArea() {
    const scaleStarsForDisplay = (countStars) => {
        if (countStars === -3) return 0;
        if (countStars === -2) return 1;
        if (countStars === -1) return 2;
        if (countStars === 0) return 3;
        if (countStars === 1) return 4;
        if (countStars === 2) return 5;
        if (countStars === 3) return 6;
    };


    const [userInfos, setUserInfos] = useState(() => {
        const storedUserInfos = localStorage.getItem('userInformation');
        return storedUserInfos ? JSON.parse(storedUserInfos) : nothingImportantTrustMe;
    });

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

    return (
        <div id='statistikArea'>
            {userInfos.map((userInfo, index) => (
                <div key={index}>
                    <label style={{fontSize:"20px"}} htmlFor={`customRange${index}`} className="form-label">
                        {userInfo.name}
                    </label>
                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="6"
                        step="0.5"
                        id={`customRange${index}`}
                        value={scaleStarsForDisplay(userInfo.countStars)}
                        readOnly
                    ></input>
                </div>
            ))}
        </div>
    );
}
