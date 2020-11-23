import React from 'react';
import TemplatePage from './templatePage';
import './styles/joinPage.css';

const REGEX = /^[\w-]{9}$/;
const DEFAULT_ID = '0000';

class JoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: DEFAULT_ID
        };
    }

    handleSubmit = () => {
        let roomID = this.state.roomID;
        roomID = roomID.replace(/\s/g,'');
        if (!REGEX.test(roomID)) {
            roomID = DEFAULT_ID;
        }

        this.props.history.push('/lobby/' + roomID);
    };

    handleChange = (event) => {
        this.setState({ roomID: event.target.value });        
    };

    render() {
        return (
            <TemplatePage
                content={
                    <>
                        <h3>Enter the Game Code below to join:</h3>
                        <input
                            type='text'
                            className='display-box'
                            id='game-code-box'
                            placeholder='game code here!'
                            onChange={ this.handleChange }
                        />
                        <div 
                            className='btn'
                            id='submit-btn' 
                            onClick={ this.handleSubmit }>
                                Join Game!
                        </div>
                    </>
                }
            />
        );
    }
}

export default JoinPage;