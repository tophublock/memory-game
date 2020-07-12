// Classes
export const CARD_CONTAINER_CLASS = 'card-container';
export const CARD_CLASS = 'card';
export const DECK_CLASS = 'deck';
export const CARD_FRONT = 'card-front';
export const CARD_BACK = 'card-back';
export const CARD_FLIP = 'card-flip';

// Card status
export const DEFAULT_STATUS = 'normal';
export const HIDDEN_STATUS = 'hidden';
export const MATCHED_STATUS = 'matched';

// Visibility
export const HIDDEN_VISIBILITY = 'hidden';
export const DEFAULT_VISIBILTY = 'visible';

// Game
export const MAX_ATTEMPTS = 2;

// Game difficulty
export const EASY_DIFFICULTY = 'easy';
export const MEDIUM_DIFFICULTY = 'medium';
export const HARD_DIFFICULTY = 'hard';

// Game difficulty size
export const EASY_SIZE = 4;
export const MEDIUM_SIZE = 6;
export const HARD_SIZE = 8;

// CSS
export const CARD_SIZE = 100;
export const GRID_TEMPLATE = ({ num, size }) => `repeat(${num}, ${size}px)`;
