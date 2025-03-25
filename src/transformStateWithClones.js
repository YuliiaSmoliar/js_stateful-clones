'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    let nextState = { ...currentState };

    switch (type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          nextState = { ...nextState, ...action.extraData };
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            if (nextState.hasOwnProperty(key)) {
              delete nextState[key];
            }
          }
        }
        break;
    }

    statesHistory.push(nextState);
    currentState = nextState; // Оновлюємо поточний стан для наступної ітерації
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
