import React from 'react';
import TemplatePage from './templatePage';
import {getCardImage} from '../boards/board';
import { generateCardID } from '../game/Cards';
import './styles/helpPage.css';

const ALL_CARD_IDS = [];
//TODO: move to Cards
for (let month = 0; month < 12; month++) {
    const row = [];
    for (let index = 0; index < 4; index++) {
        row.push(generateCardID(month+1, index));
    }
    ALL_CARD_IDS.push(row);
}
var cardSetImgs;

class HelpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardSetName: "noNumbers"
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
                        <div>
                            <label htmlFor="cardSet">Choose a card set to view: </label>
                            <select id="cardSet" onChange={ this.handleChange } value={ this.state.cardSetName }>
                                <option key="noNumbers" value="noNumbers">No Numbers (default)</option>
                                <option key="numbers" value="numbers">Numbers</option>
                            </select>
                        </div>

                        {this.getAllCards()}
                    </>
                }
            />
        );
    }
}

export default HelpPage;