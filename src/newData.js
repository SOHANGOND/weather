import React from 'react'
import  './external.css'

const newData = () => {
    return (
        <div className="box">
            <div className="waether_part">

                <div className="header">
                    <div className="searchbox">
                        <input type="text" placeholder="enter your city" className="inpt"/>
                        <button className="fa-solid fa-magnifying-glass " id="searchBtn"/>
                    </div>
                </div>

                <div className="location-not-found">
                    <h1 >Sorry, Location not found!!!</h1>
                    <img src="https://media.istockphoto.com/id/1295689699/vector/print.jpg?s=612x612&w=0&k=20&c=o6VzHvVewc4JnDZAAeOMAjl8w6X6cLe0M4ql-flDKdU=" alt="404 Error"/>
                </div>

                <div className="weather">
                    <img src="weather-app-img/images/clouds.png" className="weather-img" alt=''/>
                        <div className="weatherbox">
                            <h1 className="temp">0°C</h1>
                            <p className="description">Feels Like</p>
                        </div>
                        <div className="weather-details">
                            <div className="humid">
                                <img src="weather-app-img/images/humidity.png" alt=""/>
                                    <div className="text">
                                        <span className="humidity">0%</span>
                                        <p>humidity</p>
                                    </div>
                            </div>
                            <div className="wind">
                                <img src="weather-app-img/images/wind.png" alt=""/>
                                    <div className="text">
                                        <span className="windspeed">0 km/h</span>
                                        <p >windspeed</p>
                                    </div>
                            </div>


                        </div>



                </div>


            </div>

        </div>
    )
}

export default newData
