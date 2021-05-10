import React, { useState } from 'react';
import { FaSistrix } from "react-icons/fa";
import Centers from './components/Centers';
import './App.css';

function App() {

  const [ centers, setCenters ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ triggered, setTriggered ] = useState(false);
  const [ errors, setErrors ] = useState({});
  let [ pincode, setPincode ] = useState('');

  let currentDate = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  const { REACT_APP_ROOT_URL } = process.env;

  async function searchCenters(event, pincode) {
    event.preventDefault();
    if(pincode.length !== 6) {
      setErrors((prev) => ({...prev, pincode: 'Please enter a valid pincode'}));
      setCenters([]);
      setTriggered(false);
    } else {
      try {
        setLoading(true);
        setTriggered(true);
        setErrors((prev) => ({...prev, pincode: ''}));
        const response = await fetch(`${REACT_APP_ROOT_URL}/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${currentDate()}`);
        const jsonResponse = await response.json();
        setCenters(jsonResponse.centers);
      } finally{
        setLoading(false);
      }
    }
  };

  function pinChange(event) {
    if(event.target.value.length === 0) {
      setTriggered(false);
    }
    setPincode(event.target.value);
  }

  return (
    <>
      <div className="header-container"><header className="header"><span>Covid Vaccine Availability Tracker</span></header></div>
      <form onSubmit={(event)=> searchCenters(event, pincode)}>
        <section className="pincode-container">
          <section>
            <input 
              className="search-input"
              placeholder="search by pincode"
              type="number"
              onChange={(event) => pinChange(event)}
            />
            <button className="search-button" type="submit"><FaSistrix/></button>
          </section>
          {errors.pincode ? <span className='input-error'>{errors.pincode}</span> : ''}
        </section>
      </form>
      {
        loading ? <div className="center-section"><span>Loading centers...</span></div> :
          triggered ? <Centers centers={centers}/> : ''
      }
    </>
  );
}

export default App;
