import ReactGA from 'react-ga';

import React from 'react'
import Header from './components/Header'
import Content from './components/Content'

import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

ReactGA.initialize(process.env.REACT_APP_GA_ID);
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        ImageLoaded: false,
        StatsLoaded: false,
        GoalLoaded: false,
    };

  }

  componentDidMount(){
    ReactGA.pageview(window.location + window.location.search);
  }

  update_image_loaded = ({value}) => {
    this.setState({ImageLoaded: value})
  }

  update_stats_loaded = ({value}) => {
    this.setState({StatsLoaded: value})
  }

  update_goal_loaded = ({value}) => {
    this.setState({GoalLoaded: value})
  }

  current_state = () => {
    if (this.state.ImageLoaded ){
        return <div></div>
    }
    else{
        return <div>Stats are still a work in progress. Please be patient while they load! <FontAwesomeIcon icon={faSmileBeam} />
        </div>
    }

  }
  render = () =>{
    return (
        <div className='container'>
          <Header/>
          <Content update_stats_loaded={this.update_stats_loaded} update_goal_loaded={this.update_goal_loaded} update_image_loaded={this.update_image_loaded} />
          <div className="api-status">{this.current_state()}</div>
        </div>
      )
  }
}

export default App;
