import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import './external.css'

const Data = () => {

    const [data, setData] = useState({
        main: {
            temp: 0
        }
    });
    const [city, setCity] = useState("Chennai")
    const [input, setInput] = useState("");
    const [temp, setTemp] = useState(25);
    let [recent, setRecent] = useState([]);
    const [mode, setMode] = useState("C");
    const [error, setError] = useState(true);
    const apiKey = "78a8a07f048a83a09315f363ab43216b";
    const API_URL = `https://history.openweathermap.org/data/2.5/history/city?q=${city},IN&appid=${apiKey}`;
    const [a, setA] = useState([]);
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
               
                setData(response.data);
                setTemp(response.data.main.temp - 273.15);
                setError(false);                
                let prevRecent = [...recent];
                if (recent.length >= 5) {
                    while (prevRecent.length >= 5) {
                        prevRecent.pop();
                    }
                }
                setRecent([city, ...prevRecent]);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError(true);
            }
        };
        fetchWeatherData();

    }, [city]);
    
    const handleSubmit =async () => {
        try {
            let prev = await axios.get(API_URL);
            setA(prev);            
        } catch (error) {
            console.log(error)
        }
    }
    
    handleSubmit();
    console.log(a);

    useEffect(() => {
        // setMode(e.target.value);
        if (mode === 'F') {
            setTemp((9 / 5 * (data.main.temp - 273.15) + 32).toFixed(3))
        }
        else if (mode === 'C')
            setTemp((data.main.temp - 273.15).toFixed(3))
    }, [mode]);

    

    return (
        <>
            <div>
                <div className="box">
                    <div className="waether_part">
                        <div className="header">
                            <div className="searchbox">
                                <input type="text" placeholder="enter your city" className="inpt" onChange={(e) => setInput(e.target.value)} />
                                <button className="fa-solid fa-magnifying-glass " id="searchBtn" onClick={() => { return( [setCity(input), ()=>{document.querySelector('inpt')}]) }}> <FontAwesomeIcon icon={faSearch} /></button>
                            </div>

                        </div>
                    </div>
                    <div className="recentClass">
                        <h3>Recent searches</h3>
                        <div className="recent">
                            <h5 onClick={(ref)=>setCity(ref.target.textContent)}>
                                {recent.map((item, index) => <p key={index}>{item}</p>)}
                            </h5>
                        </div>
                    </div>
                    {error ?
                        <div className="location-not-found">
                            <h1 >Sorry, Location not found!!!</h1>
                            <img src="https://media.istockphoto.com/id/1295689699/vector/print.jpg?s=612x612&w=0&k=20&c=o6VzHvVewc4JnDZAAeOMAjl8w6X6cLe0M4ql-flDKdU=" alt="404 Error" />
                        </div>
                        :
                        <div className="weather">
                            <img src="weather-app-img/images/clouds.png" className="weather-img" alt='' />
                            <div className="weatherbox">
                                <h1 className="temp">{city}</h1>
                                <h2 className="temp"> {temp}</h2>
                                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                                    <option value="C">C</option>
                                    <option value="F">F</option>
                                </select>
                                <p className="description">Feels Like</p>
                            </div>
                            <div className="weather-details">
                                <div className="humid">
                                    <img src="weather-app-img/images/humidity.png" alt="" />
                                    <div className="text">
                                        <span className="humidity">{data.main.humidity}%</span>
                                        <p>humidity</p>
                                    </div>
                                </div>
                                <div className="wind">
                                    <img src="weather-app-img/images/wind.png" alt="" />
                                    <div className="text">
                                        <span className="windspeed">{data.wind.speed} km/h</span>
                                        <p >windspeed</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Data
