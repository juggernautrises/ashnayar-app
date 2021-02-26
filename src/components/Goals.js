import React from 'react'
import { faBicycle, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Spinner from 'react-bootstrap/Spinner'
import PropTypes from 'prop-types';


class Goals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ride: {},
            run: {},
        };
    }

    componentDidMount(){
        var url_token = 'Bearer ' + process.env.REACT_APP_ATHLETE_TOKEN
        var url = process.env.REACT_APP_ATHLETE_URL+"/goals/"

        fetch(url, {
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
                    ride: result['ride'],
                    run: result['run']
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
        const { error, isLoaded, ride, run } = this.state;
        if (error){
            return (
                <div className="goals-container">
                <div className="goal-stats">
                    Goals progress should be here! :(
                </div>
            </div>

            )
        } else if (!isLoaded){
            return   (
            <div className="goals-container">
                <div className="goal-stats">
                    <Spinner animation="grow" variant="primary" />
                </div>
            </div>
            )
        } else {
            return(
                <div className="goals-container">
                    <div className="goal-stats">
                        <div className="goals-title">{(new Date().getFullYear())} Goals</div>
                        <RideGoal target={ride['target']} ytd={ride['ytd']} progress={ride['progress']}/>
                        <RunGoal target={run['target']} ytd={run['ytd']} progress={run['progress']}/>
                    </div>
                </div>
            );
        }
    }

    // return (
    //     <div className="goals-container">
    //         <div className="goal-stats">
    //             <RideGoal/>
    //             <RunGoal/>
    //         </div>
    //     </div>
    // )
}



export default Goals


export const RunGoal = ({target, ytd, progress}) => {
    console.log(target);
    return (
        <div className="run-goal">
            <FontAwesomeIcon icon={faRunning} />
            
            <ProgressBar variant="success" now={Math.round(progress)} label={Math.round(progress)+'%'} />
            <div className="goal-progress">{Math.round(ytd)}/{target} miles</div>
        </div>
    )
}

export const RideGoal = ({target, ytd, progress}) => {
    return (
        <div className="ride-goal">
            <FontAwesomeIcon icon={faBicycle} />
            <ProgressBar now={Math.round(progress)} label={Math.round(progress)+'%'} />
            <div className="goal-progress">{Math.round(ytd)}/{target} miles</div>
        </div>
    )
}

RunGoal.propTypes = {
    target: PropTypes.number,
    ytd: PropTypes.number,
    progress: PropTypes.number,
};

RideGoal.propTypes = {
    target: PropTypes.number,
    ytd: PropTypes.number,
    progress: PropTypes.number,
}