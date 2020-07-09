import React from 'react';
import GithubCorner from 'react-github-corner';
import { Link } from 'react-router-dom';
import './styles/templatePage.css';

class TemplatePage extends React.Component {
    render() {
        return (
            <div className="full_height">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="title">
                        <div class="hanafuda-logo"/>
                        <div class="title-text">Hanafuda</div>
                    </div>
                </Link>

                {this.props.content}

                <GithubCorner
                    href={"https://github.com/SheldonSChen/hanafuda"}
                    bannerColor="#c44a41"
                    octoColor="#fff"
                    size={80}
                    direction="left"
                />
            </div>
        );
    }
}

export default TemplatePage;