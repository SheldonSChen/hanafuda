export function checkMatch(card, fieldCards) {
    return (card && fieldCards.some((fCard) => fCard.month === card.month));
};