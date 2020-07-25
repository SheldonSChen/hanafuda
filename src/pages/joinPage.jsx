import React from 'react';
import TemplatePage from './templatePage';
import './styles/joinPage.css';

const regex = /^[\w-]{9}$/;
const defaultID = '0000';

class JoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: defaultID
        };
    }

    handleSubmit = () => {
        let roomID = this.state.roomID;
        roomID = roomID.replace(/\s/g,'');
        if (!regex.test(roomID)) {
            roomID = defaultID;
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