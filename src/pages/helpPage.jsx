import React from 'react';
import TemplatePage from './templatePage';
import {getCardImage} from '../boards/board';
import { generateCardID } from '../game/Cards';
import './styles/helpPage.css';

const ALL_CARD_IDS = [];
for (let month = 0; month < 12; month++) {
    const row = [];
    for (let index = 0; index < 4; index++) {
        row.push(generateCardID(month+1, index));
    }
    ALL_CARD_IDS.push(row);
}

class HelpPage extends React.Component {
    getCard = (cardID) => {
        //TODO: display sets part of on hover
        return (
            <div className='card'>
                <div className='card-inside'
                    style={getCardImage(undefined, cardID)}>
                </div>
            </div>
        );
    }

    getMonthCards = (monthCards, month) => {
        return (
            <div className={'month ' + month}>
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
                        {this.getAllCards()}
                    </>
                }
            />
        );
    }
}

export default HelpPage;