import PropTypes from 'prop-types';
import React from 'react'


const Link = ({icon, width, height, target, alt, url}) => {
    return (
            <a href={url} target={target} className="header-link">
                <img src={icon} width={width} height={height} alt={alt}></img>
            </a>
    )
}

Link.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    target: PropTypes.string,
    alt: PropTypes.string

};
  
Link.defaultProps = {
    width: 40,
    height: 40,
    target: "_blank",
    alt: "nothing!"
};

const Links = () => {
    return (
        <div>
            <Link icon="/images/LI-In-Bug.png" width="45"  url="https://www.linkedin.com/in/ash-nayar/"/>
            <Link icon="/images/GitHub-Mark-Light-64px.png" url="http://github.com/juggernautrises"/>
            <Link icon="/images/imdb.png" url="https://www.imdb.com/name/nm2363452/"/>
        </div>
    )
}


export default Links


