import ReactGA from 'react-ga';
import {useEffect} from 'react'

import Content from './components/Content'
import Header from './components/Header'

ReactGA.initialize(process.env.REACT_APP_GA_ID);

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location + window.location.search);
  })

  return (
    <div className='container'>
      <Header/>
      <Content/>
      <div className="placeholder">
        WIP. Click here to follow the progress on this site -> [ <a href="http://recoveryride.wordpress.com">Recovery Ride</a> ]
      </div>
    </div>
    
  );
}

export default App;
