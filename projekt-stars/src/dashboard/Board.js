import React, { Component } from 'react'
import { useNavigate } from "react-router-dom";


export default function Board() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }

  return (
      <div><h1>Board</h1>
          <button className='btn btn-danger' onClick={handleBack}>Zurück</button>
      </div>  )
}
