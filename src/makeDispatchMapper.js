module.exports = function (actionCreators, key) {
  return function (dispatch) {
    const props = {};

    for (const propName in actionCreators) {
      const actionCreator = actionCreators[propName];

      props[propName] = function (...args) { // eslint-disable-line
        return dispatch(actionCreator(...args));
      };
    }

    // If the optional 'key' argument was given, return an object which nests the props under that key.
    if (typeof key == 'string' || typeof key == 'number') {
      var nested_props = {};
      nested_props[key] = props;
      return nested_props;
    }

    return props;
  };
};
