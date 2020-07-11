import React from 'react';
import TemplatePage from './templatePage';
import './styles/joinPage.css';

const regex = /^[\w-]{9}$/;
const defaultID = '0000';

class JoinPage extends React.Component {
    state = { roomID: defaultID };

    handleSubmit = () => {
        const history = this.props.history;

        this.state.roomID = this.state.roomID.replace(/\s/g,'');
        if (!regex.test(this.state.roomID)) {
            this.state.roomID = defaultID;
        }

        history.push('/lobby/' + this.state.roomID);
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
                        <form onSubmit={ this.handleSubmit }>
                            <input
                                type='text'
                                className='game-code-tb'
                                value={ this.state.roomID }
                                onChange={ this.handleChange }
                            />
                            <br />
                            <input
                                type='submit'
                                value='Submit'
                                className='game-code-submit'
                            />
                        </form>
                    </>
                }
            />
        );
    }
}

export default JoinPage;