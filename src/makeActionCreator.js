module.exports = function (type, ...argNames) {
  return function (...args) {
    const action = {
      type
    };

    argNames.forEach((argName, k) => {
      action[argName] = args[k];
    });

    return action;
  };
};
