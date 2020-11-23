import React from 'react';
import { CARD_SETS } from '../../game/Cards';

class CardSetDropdown extends React.Component {
    render() {
        const onChange = this.props.onChange;
        const value = this.props.value;
        
        //TODO: defaultSet
        return (
            <div>
                <label htmlFor="cardSet">Choose a card set to view: </label>
                <select id="cardSet" onChange={ onChange } value={ value }>
                    {Object.entries(CARD_SETS).map( function([key, value]) {
                        return (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
}

export default CardSetDropdown;