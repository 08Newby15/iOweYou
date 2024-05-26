import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddStars() {
    const { id: loggedInUserId } = useParams();
    const [userInfos, setUserInfos] = useState(() => {
        const storedUserInfos = localStorage.getItem('userInformation');
        return storedUserInfos ? JSON.parse(storedUserInfos) : [];
    });
    const [loggedInUserStars, setLoggedInUserStars] = useState(0);
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [starTimers, setStarTimers] = useState(() => {
        const storedTimers = localStorage.getItem('starTimers');
        return storedTimers ? JSON.parse(storedTimers) : {};
    });

    useEffect(() => {
        const loggedInUser = userInfos.find(userInfo => parseInt(userInfo.id) === parseInt(loggedInUserId));
        if (loggedInUser) {
            setLoggedInUserStars(loggedInUser.countStars);
            setLoggedInUserName(loggedInUser.name);
        }
    }, [userInfos, loggedInUserId]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const updatedTimers = { ...starTimers };

            for (const key in updatedTimers) {
                if (now - updatedTimers[key] >= 1 * 60 * 1000) {
                    delete updatedTimers[key];
                }
            }

            setStarTimers(updatedTimers);
            localStorage.setItem('starTimers', JSON.stringify(updatedTimers));
        }, 1000);

        return () => clearInterval(interval);
    }, [starTimers]);

    const starsSend = (receiverName) => toast.success(`${receiverName} hat 1 Stern erhalten :) `, { autoClose: 2000, theme: 'colored', transition: Slide });

    const addStar = (receiverId) => {
        const now = Date.now();

        if (starTimers[`${loggedInUserId}_${receiverId}`] && now - starTimers[`${loggedInUserId}_${receiverId}`] < (60 * 60 * 1000)) {
            const remaining = (60 * 60 * 1000) - (now - starTimers[`${loggedInUserId}_${receiverId}`]);
            const minutes = Math.floor(remaining / 60000);
            const seconds = ((remaining % 60000) / 1000).toFixed(0);
            toast.info(`Bitte warte ${minutes}:${seconds < 10 ? '0' : ''}${seconds} Minuten, bevor du ${userInfos.find(user => parseInt(user.id) === parseInt(receiverId)).name} erneut einen Stern vergibst.`, { autoClose: 5000, theme: 'colored', transition: Slide });
            return;
        }

        const loggedInUserIndex = userInfos.findIndex(userInfo => parseInt(userInfo.id) === parseInt(loggedInUserId));
        if (loggedInUserIndex === -1) return;

        const receiverIndex = userInfos.findIndex(userInfo => parseInt(userInfo.id) === parseInt(receiverId));
        if (receiverIndex === -1) return;

        const loggedInUser = userInfos[loggedInUserIndex];
        const receiver = userInfos[receiverIndex];

        const userHasGivenStar = loggedInUser.starsGivenTo.includes(receiverId);
        const receiverHasReceivedStar = receiver.starsReceivedFrom.includes(loggedInUserId);

        // if (userHasGivenStar || receiverHasReceivedStar) {
        //     toast.warning(`Du hast ${receiver.name} bereits einen Stern gegeben.`, { autoClose: 3000, theme: 'colored', transition: Slide });
        //     return;
        // }

        const updatedUserInfos = [...userInfos];
        updatedUserInfos[loggedInUserIndex] = {
            ...loggedInUser,
            countStars: loggedInUser.countStars - 1,
            starsGivenTo: [...loggedInUser.starsGivenTo, receiverId],
        };
        updatedUserInfos[receiverIndex] = {
            ...receiver,
            countStars: receiver.countStars + 1,
            starsReceivedFrom: [...receiver.starsReceivedFrom, loggedInUserId],
        };

        setUserInfos(updatedUserInfos);
        localStorage.setItem('userInformation', JSON.stringify(updatedUserInfos));
        setStarTimers({ ...starTimers, [`${loggedInUserId}_${receiverId}`]: now });
        localStorage.setItem('starTimers', JSON.stringify({ ...starTimers, [`${loggedInUserId}_${receiverId}`]: now }));

        setLoggedInUserStars(updatedUserInfos[loggedInUserIndex].countStars);
        starsSend(receiver.name);
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div>
            <h2>User: {loggedInUserName}</h2>
            <h4>Deine Sterne: {loggedInUserStars}</h4>
            <table>
                <thead>
                    <tr>
                        <th style={{ fontSize: '20px' }}>Sterne verteilen</th>
                        <th style={{ fontSize: '20px', paddingLeft: '25px', paddingRight: '25px' }}>Anzahl</th>
                    </tr>
                </thead>
                <tbody>
                    {userInfos.map((userInfo, index) => (
                        <tr key={index}>
                            <td>{userInfo.name}</td>
                            <td>{userInfo.countStars}</td>
                            <td>
                                {userInfo.id === parseInt(loggedInUserId) ? (
                                    <h3>-</h3>
                                ) : (
                                    <button className='btn btn-info' onClick={() => addStar(userInfo.id)}>
                                        Stern vergeben
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer style={{ width: '30%' }} />
        </div>
    );
}
