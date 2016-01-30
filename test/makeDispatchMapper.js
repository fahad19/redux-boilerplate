/* global describe, it */
import expect from 'expect.js';

import { makeDispatchMapper } from '../index';

describe('makeDispatchMapper', function () {
  it('is a function', function () {
    expect(makeDispatchMapper).to.be.a('function');
  });

  describe('props generation', function () {
    const dispatch = function (action) {
      return action.type;
    };

    const ADD_TODO = 'ADD_TODO';
    const addTodo = function (text) {
      return {
        type: ADD_TODO,
        text
      };
    };

    it('generates props with functions', function () {

      const mapDispatchToProps = makeDispatchMapper({
        addTodo
      });

      expect(mapDispatchToProps).to.be.a('function');

      const props = mapDispatchToProps(dispatch);
      expect(props).to.have.key('addTodo');
      expect(props.addTodo).to.be.a('function');
      expect(props.addTodo()).to.be(ADD_TODO);
    });

    it('returns nested props if optional "key" arg is provided', function () {
      const KEY = 'this_is_where_I_want_my_actions';
      const mapDispatchToProps = makeDispatchMapper({
        addTodo
      }, KEY);
      const props = mapDispatchToProps(dispatch);
      expect(props).to.have.key(KEY);
      expect(props[KEY].addTodo).to.be.a('function');
      expect(props[KEY].addTodo()).to.be(ADD_TODO);
    });
  });

});
