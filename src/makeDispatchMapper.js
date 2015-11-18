module.exports = function (actionCreators) {
  return function (dispatch) {
    const props = {};

    for (const propName in actionCreators) {
      const actionCreator = actionCreators[propName];

      props[propName] = function (...args) { // eslint-disable-line
        return dispatch(actionCreator(...args));
      };
    }

    return props;
  };
};
