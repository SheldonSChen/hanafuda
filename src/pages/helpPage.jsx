import React from 'react';
import TemplatePage from './templatePage';
import {getCardImage} from '../boards/board';
import { ALL_CARD_IDS, CARD_SETS } from '../game/Cards';
import './styles/helpPage.css';
import CardSetDropdown from '../boards/components/cardSetDropdown';

var cardSetImgs;

class HelpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardSetName: CARD_SETS.NO_NUMBERS
        };
    }

    handleChange = (event) => {
        this.setState({ cardSetName: event.target.value });
    };

    getCard = (cardID) => {
        //TODO: display sets part of on hover
        cardSetImgs = require('../modules/mod_cardImg.js')(this.state.cardSetName);
        return (
            <div className='card' key={cardID}>
                <div className='card-inside'
                    style={getCardImage(undefined, cardID, cardSetImgs)}>
                </div>
            </div>
        );
    }

    getMonthCards = (monthCards, month) => {
        return (
            <div className={'month ' + month} key={month}>
                <h3>{month}</h3>
                <div className='help-cards'>
                    {monthCards.map((cardID) => this.getCard(cardID))}
                </div>
            </div>
        );
    }

    getAllCards = () => {
        return (
            <div className='all-cards'>
                {ALL_CARD_IDS.map((monthCards, index) => this.getMonthCards(monthCards, index+1))}
            </div>
        );
    }

    render() {
        return (
            <TemplatePage
                content={
                    <>
                        <CardSetDropdown
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                        {this.getAllCards()}
                    </>
                }
            />
        );
    }
}

export default HelpPage;