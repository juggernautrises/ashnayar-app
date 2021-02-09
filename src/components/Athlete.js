import React from 'react'

const Athlete = () => {
    return (
        <div>
            <AthleteImage />
            <AthleteLastRide />
            <AthleteLastRun />
        </div>
    )
}


export const AthleteImage = () => {
    return (
        <div className="profile-image">
            <img src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/4374448/3484902/11/large.jpg"/>
        </div>
    )
}

export const AthleteLastRide = () => {
    return (
        <div>Last Ride: 22 miles on 02/02/2021</div>
    )
}

export const AthleteLastRun = () => {
    return (
        <div>Last Run: 2.2 miles on 02/02/2021</div>
    )
}
export default Athlete
