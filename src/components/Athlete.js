import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

import Goals from './Goals'
import {meters_to_miles, format_date} from '../util/misc'

const Athlete = () => {

    return (
        <div class="athlete-container">
            <AthleteProfile/>
            <Goals />
        </div>
    )
}

export const AthleteProfile = () => {
    return (
        <div className="profile-container">
            <div className="profile">
                <AthleteImage />
                <AthleteStats />
            </div>
        </div>
    )
}


class AthleteImage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isRecentLoaded: false,
            profile: {}
        };
    }
    componentDidMount(){
        var url_token = 'Bearer ' + process.env.REACT_APP_ATHLETE_TOKEN
        var url = process.env.REACT_APP_ATHLETE_URL+"/athlete/"

        fetch(url,{
            method: 'GET',
            headers:{
                'Authorization': url_token
            }
        })
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    profile: result
                });
            },
            (error) =>{
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
    }
    render(){
        const { error, isLoaded, profile } = this.state;
        if (error){
            return <div>Sorry! A neat picture was supposed to be here!</div>
        } else if (!isLoaded){
            return(
                <div>
                    <Spinner animation="grow" variant="primary" />
                </div>
            )
        } else {
            return(
                <img className="profile-image" src={profile['profile']} alt="meIRL"/>
            );
        }
    }
}

class AthleteStats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isRecentLoaded: false,
            stats: {}
        };
    }

    componentDidMount(){
        var url_token = 'Bearer ' + process.env.REACT_APP_ATHLETE_TOKEN
        var url = process.env.REACT_APP_ATHLETE_URL+"/recent/"

        fetch(url,{
            method: 'GET',
            headers:{
                'Authorization': url_token
            }
        })
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    stats: result
                });
            },
            (error) =>{
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
    }
    render(){
        const { error, isLoaded, stats } = this.state;
        if (error){
            return <div>Fancy stats should be here!</div>
        } else if (!isLoaded){
            return(
                <div class="stats-container">
                    <Spinner animation="grow" variant="primary" />
                </div>
            )
        } else {
            return(
                <div className="stats-container">
                    <span className="peaks"> Recent Activity </span>
                    <AthleteLastRide distance={stats['recent_ride']['distance']} date={stats['recent_ride']['start_date_local']}/>
                    <AthleteLastRun distance={stats['recent_run']['distance']} date={stats['recent_run']['start_date_local']}/>
                    <br></br>
                    <div className="stats">
                    <span className="peaks"> {(new Date().getFullYear())} Peaks </span>
                    </div>
                    <AthleteLongestRun distance={stats['longest_run']} date={stats['longest_run_date']}/>
                    <AthleteLongestRide distance={stats['longest_ride']} date={stats['longest_ride_date']} />
                </div>
            );
        }
    }
}

export const AthleteLastRide = ({distance, date}) => {
    return (
        <div class="stats">
            Last Ride: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export const AthleteLastRun = ({distance, date}) => {
    return (
        <div class="stats">
            Last Run: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export const AthleteLongestRide = ({distance, date}) => {
    return (
        <div class="stats">
            Longest Ride: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export const AthleteLongestRun = ({distance, date}) => {
    return (
        <div class="stats">
            Longest Run: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export {Athlete}
