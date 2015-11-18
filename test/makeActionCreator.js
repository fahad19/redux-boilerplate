/* global describe, it */
import expect from 'expect.js';

import { makeActionCreator } from '../index';

describe('makeActionCreator', function () {
  it('is a function', function () {
    expect(makeActionCreator).to.be.a('function');
  });

  it('generates an Action creator', function () {
    const ADD_TODO = 'ADD_TODO';
    const addTodo = makeActionCreator(ADD_TODO, 'text');

    expect(addTodo).to.be.a('function');

    const action = addTodo('Hello World');
    expect(action).to.eql({
      type: ADD_TODO,
      text: 'Hello World'
    });
  });
});
