# redux-boilerplate [![Travis Build Status](https://travis-ci.org/fahad19/redux-boilerplate.svg?branch=master)](https://travis-ci.org/fahad19/redux-boilerplate) [![npm](https://img.shields.io/npm/v/redux-boilerplate.svg)](https://www.npmjs.com/package/redux-boilerplate)

> Boilerplate generator for Redux

## Install

```
$ npm install --save redux-boilerplate
```

## Target audience

This package is aimed at projects using:

* [redux](https://github.com/rackt/redux)
* [react](https://github.com/facebook/react)
* [react-redux](https://github.com/rackt/react-redux): Redux bindings for React

Examples are in ES6/7. If you are building React applications, you are highly recommended to use [Babel](https://babeljs.io/) for transpiling ES6/7 to ES5, mostly via tools like [Webpack](https://github.com/webpack/webpack) or [Browserify](https://github.com/substack/node-browserify).

## API

* [makeActionCreator](#generating-action-creators)
* [makeDispatchMapper](#generating-mapdispatchtoprops)

## Usage

### Generating Action Creators

Redux recommends generating Action objects through a function (action creator).

#### Before

In action generators file, you may export some functions like this:

```js
// file: ./actions/todos.js
const ADD_TODO = 'ADD_TODO';

export function addTodo(text) {
  return {
  	type: ADD_TODO,
  	text
  };
}
```

#### After

The code above can be written like this instead using `redux-boilerplate`:

```js
// file: ./actions/todos.js
import { makeActionCreator } from 'redux-boilerplate';

const ADD_TODO = 'ADD_TODO';

export const addTodo = makeActionCreator(ADD_TODO, 'text');
```

### Generating `mapDispatchToProps()`

When you have smart React components (often called container components), you are expected to pass `mapStateToProps` and occassionally `mapDispatchToProps` functions to `react-redux`'s `connect()`.

#### Before

```js
// file: ./containers/Todos.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/todos';

class Todos extends Component {
  handleClick() {
    this.props.addTodo('blah');
  }

  render() {
    return (
      <a onClick={this.handleClick}>
        Add Todo
      </a>
    );
  }
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: function (text) {
      return dispatch(addTodo(text));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
```

#### After

The above code for `mapDispatchToProps` can be written in a much shorter form as:

```js
// file: ./containers/Todos.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeDispatchMapper } from 'redux-boilerplate';

import { addTodo } from '../actions/todos';

class Todos extends Component {
	// ...
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = makeDispatchMapper({
	addTodo
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
```

---

If you are using ES7 decorators, you could write it in a more readable form too:

```js
// file: ./containers/Todos.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeDispatchMapper } from 'redux-boilerplate';

import { addTodo } from '../actions/todos';

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = makeDispatchMapper({
	addTodo
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Todos extends Component {
	// ...
}
```

#### Separating mapped actions in your properties

If your app contains a large number of actions, you may wish to have them all mapped to an object under a specific key in your properties. Just pass a second argument with the desired key name to makeDispatchMapper, e.g:

```js
const mapDispatchToProps = makeDispatchMapper({
	addTodo
}, 'actions');  // Put them all in component's this.props.actions

/**
 * This will give props like:
 * {
 *   actions: {
 *     addTodo: function() {...}
 *   }
 * }
 */
```

## License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
