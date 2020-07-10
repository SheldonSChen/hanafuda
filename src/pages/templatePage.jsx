import React from 'react';
import GithubCorner from 'react-github-corner';
import { Link } from 'react-router-dom';
import './styles/templatePage.css';

class TemplatePage extends React.Component {
    render() {
        return (
            <div className="full_height">
                <GithubCorner
                    href={"https://github.com/SheldonSChen/hanafuda"}
                    bannerColor="#c44a41"
                    octoColor="#fff"
                    size={80}
                    direction="left"
                />

                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="title">
                        <img className="logo" src={require('../assets/hanafuda_logo.png')}></img>
                        <div className="title-text">Hanafuda</div>
                    </div>
                </Link>

                {this.props.content}
            </div>
        );
    }
}

export default TemplatePage;