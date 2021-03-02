import React from 'react'

import{Athlete} from './Athlete'

const Content = (props) => {
    return (
        <div className="content-container">
            <Athlete update_stats_loaded={props.update_stats_loaded} update_goal_loaded={props.update_goal_loaded} update_image_loaded={props.update_image_loaded} />
        </div>
    )
}

export default Content
