# redux-boilerplate [![Build Status](https://travis-ci.org/fahad19/redux-boilerplate.svg?branch=master)](https://travis-ci.org/fahad19/redux-boilerplate)

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

## Usage

### Generating Action Creators

In action generators file, you may export some functions like this:

```js
// BEFORE
// file: ./actions/todos.js
const ADD_TODO = 'ADD_TODO';

export function addTodo(text) {
  return {
  	type: ADD_TODO,
  	text
  };
}
```

The code above can be written like this instead using `redux-boilerplate`:

```js
// AFTER
// file: ./actions/todos.js
import { makeActionCreator } from 'redux-boilerplate';

const ADD_TODO = 'ADD_TODO';

export const addTodo = makeActionCreator(ADD_TODO, 'text');
```

### Generating `mapDispatchToProps()`

When you have smart React components (often called container components), you are expected to pass `mapStateToProps` and occassionally `mapDispatchToProps` functions to `react-redux`'s `connect()`.

For e.g., in here:

```js
// BEFORE
// file: ./containers/Todos.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/todos';

class Todos extends Component {
  render() {
    return (
      <a onClick={this.props.addTodo('blah')}>
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

The above code for `mapDispatchToProps` can be written in a much shorter form as:

```js
// AFTER
// file: ./containers/Todos.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeDispatchMapper } from 'redux-boilerplate';

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

If you are using ES7 decorators, you could write it in a more readable form too:

```js
// AFTER
// file: ./containers/Todos.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeDispatchMapper } from 'redux-boilerplate';

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

## License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
