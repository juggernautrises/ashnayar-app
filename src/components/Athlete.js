import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

import Goals from './Goals'
import {meters_to_miles, format_date} from '../util/misc'

const Athlete = (props) => {
    return (
        <div className="athlete-container">
            <AthleteProfile update_stats_loaded={props.update_stats_loaded}
            update_image_loaded={props.update_image_loaded} />
            <Goals update_goal_loaded={props.update_goal_loaded} />
        </div>
    )
}

export const AthleteProfile = (props) => {
    return (
        <div className="profile-container">
            <div className="profile">
                <AthleteImage update_image_loaded={props.update_image_loaded}/>
                <AthleteStats update_stats_loaded={props.update_stats_loaded}/>
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
        var url = process.env.REACT_APP_ATHLETE_URL+"/athlete/"

        fetch(url,{
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) =>{
                this.props.update_image_loaded({value:true})
                this.setState({
                    isLoaded: true,
                    profile: result
                });
            },
            (error) =>{
                this.props.update_image_loaded({value:false})
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
        var url = process.env.REACT_APP_ATHLETE_URL+"/recent/"

        fetch(url,{
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) =>{
                this.props.update_stats_loaded({value:true})
                this.setState({
                    isLoaded: true,
                    stats: result
                });
            },
            (error) =>{
                this.props.update_stats_loaded({value:false})
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
                <div className="stats-container">
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
        <div className="stats">
            Last Ride: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export const AthleteLastRun = ({distance, date}) => {
    return (
        <div className="stats">
            Last Run: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export const AthleteLongestRide = ({distance, date}) => {
    return (
        <div className="stats">
            Longest Ride: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export const AthleteLongestRun = ({distance, date}) => {
    return (
        <div className="stats">
            Longest Run: {meters_to_miles(distance)} miles on {format_date(date)}
        </div>
    )
}

export {Athlete}
