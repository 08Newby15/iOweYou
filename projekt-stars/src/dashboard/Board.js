import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import StarListArea from './StarListArea';
import StatistikArea from './StatistikArea';
import AddStars from './AddStars';
import './dashboard.css'

export default function Board() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }



    return (
        
        <div id='backgroundDashboard'><header className='d-flex justify-content-between align-content-center '>
            <h1 style={{ marginLeft: "5%", marginTop: "2%" }}>Dashboard</h1>
            <button className='btn btn-danger ' onClick={handleBack} style={{marginRight:"5%", marginTop:"2%"}}>Abmelden</button>
        </header>
            <div className='d-flex justify-content-center mt-5'>
                <AddStars ></AddStars>
            </div>
            <div className='row'  >
                <div className='col-md-6'>
                    <div className='d-flex justify-content-center align-items-center' id="starListArea">

                    <StarListArea  ></StarListArea>
                    </div>
                    
                </div>
                <div className='col-md-6'>
                    <StatistikArea></StatistikArea>

                </div>
            </div>
        </div>)
}
