import { getCardMonth } from "../game/Cards";

export function checkMatch(card, fieldCards) {
    return (card && fieldCards.some((fCard) => getCardMonth(fCard) === getCardMonth(card)));
};