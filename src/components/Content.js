import React from 'react'

import { Athlete } from './Athlete'

const AthleteContent = (props) => {
    return (
        <div className="content-container">
            <Athlete update_stats_loaded={props.update_stats_loaded} update_goal_loaded={props.update_goal_loaded} update_image_loaded={props.update_image_loaded} />
        </div>
    )
}

const Content = (props) => {
    return (
        <div className="simple-container">
            <iframe src="https://player.vimeo.com/video/473690051?h=8b4b76c307" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}

export default Content
