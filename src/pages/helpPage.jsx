import React from 'react';
import TemplatePage from './templatePage';
import {getCardImageFromSet} from '../boards/board';
import { ALL_CARD_IDS, DEFAULT_CARD_SET } from '../game/Cards';
import './styles/helpPage.css';
import CardSetDropdown from '../boards/components/cardSetDropdown';
import { getCardImg } from '../modules/mod_cardImg';

var cardSetImgs;

class HelpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardSetName: DEFAULT_CARD_SET
        };
    }

    handleChange = (event) => {
        this.setState({ cardSetName: event.target.value });
    };

    getCard = (cardID) => {
        //TODO: display sets part of on hover
        cardSetImgs = getCardImg(this.state.cardSetName);
        return (
            <div className='card' key={cardID}>
                <div className='card-inside'
                    style={getCardImageFromSet(undefined, cardID, cardSetImgs)}>
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