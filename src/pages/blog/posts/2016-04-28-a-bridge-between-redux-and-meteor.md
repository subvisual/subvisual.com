---
id: 79
path: /posts/79-a-bridge-between-redux-and-meteor/
title: "A bridge between Redux and Meteor"
author: gabriel-poca
date: 2016-04-28
tags:
  - development
intro: "The purpose of this article is to demonstrate how to use Redux on a Meteor application. You may find it is unnecessarily complex for your application, and that is ok, there are [other options][other-data-loading] for you."
---

The purpose of this article is to demonstrate how to use Redux on a Meteor application. You may find it is unnecessarily complex for your application, and that is ok, there are [other options][other-data-loading] for you.

Redux is hot and shiny, and everyone wants to use it. I do enjoy using Redux, but the reasons for this approach go beyond the JavaScript fever:

1. The front-end is always a jungle, but being able to write applications using the same technologies and structure across projects with different back-ends (such as Meteor, Rails or Express) allows us to setup faster. Or join a project faster. It also lets us write more guides and conventions, reducing the amount of decisions necessary for every project.
2. Collections, Session, and ReactiveVar, aren't great to handle application state. You lose track of what triggered what. With Redux you get predictable state, you can look at the state at different times and see the actions that set off a change.

Now, with NPM and modules support on 1.3, the doors are open for an easy integration. In this tutorial I will cover four topics:

1. Installing React and Redux.
2. Connecting Collections to the Redux store.
3. Subscribing to publications.
4. Calling methods.


**Note:** I will assume you have a basic understanding of Meteor, React, and Redux (or any Flux implementation). The code I show here is not enough to make an application work, you should [go here for a working example][app].

## Installing React and Redux

If you have ever gone through the hell of setting up Webpack, I have some good news for you:

```
$ meteor create messages-app
$ cd messages-app
$ meteor remove autopublish insecure
$ npm install --save react react-dom react-redux react-router redux redux-thunk
$ rm client/* server/*
```

For a router, `react-router` serves my purpose better than `flow-router`. You should also notice `redux-thunk` to allow for asynchronous action creators.

Ready to go!

## Connecting Collections to the Redux store

Coming from Flux you will find that on Redux the Store is a little different. Here is a quick explanation from the [Redux documentation][redux-store]:

> If you’re coming from Flux, there is a single important difference you need to understand. Redux doesn’t have a Dispatcher or support many stores. Instead, there is just a single store with a single root reducing function. As your app grows, instead of adding stores, you split the root reducer into smaller reducers independently operating on the different parts of the state tree.

The Store is the application state, and we should look at it as the only source of data we can use. This means we cannot access data from the Meteor collections directly and it has to come from the Store. To do this, we can observe the collections and dispatch changes to the Store.

Start by creating a collection:

_lib/messages.js_

```javascript
// create a collection
import { Mongo } from 'meteor/mongo';
const Messages = new Mongo.Collection('messages');
export default Messages;
```

Then, on the client, observe for changes and dispatch an action to the Store with the new data.

_client/setup.js_

```javascript
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker';

// import the messages collection
import Messages from '../lib/messages';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.messages;
    default:
      return state;
  }
};

const reducers = combineReducers({ messages: messagesReducer });
const store = createStore(reducers, {});

// will run every time Messages changes
Tracker.autorun(() => {
  store.dispatch({
    type: 'SET_MESSAGES',
    messages: Messages.find().fetch(),
  });
});
```

The Store will update with the Messages collection. This way our data will always be up to date on React.

We could optimize, but I will keep it simple in this tutorial. We could also automate this setup for every collection, but I'll leave that for later.

## Subscribing to publications

Working with an HTTP back-end, we would create a set of special components called *containers*. They have three responsibilities:

1. Calling actions to load data from the back-end.
2. Connecting to the store.
3. Sending the data to the child components.

We did not invent this concept. Many people [wrote about it][containers]. The important thing to remember is that these components should not be rendering anything. Their only responsibility is to fetch data and send it to the component that will render stuff.

Our data already goes from the collections to the store, but after you remove `insecure` there will not be anything in the collections. We need a publication and a subscription.

Here is a quick publication for Messages:

_server/publications.js_

```javascript
import { Meteor } from 'meteor/meteor';
import Messages from '../lib/messages';
Meteor.publish('messages', function() {
  return Messages.find({});
});
```

Subscriptions are tricky because we need to unsubscribe once the data is not necessary anymore. Which translates to: we need to unsubscribe when the container is removed. I wrote a high order component that abstracts this logic. The following is a simplified version, you can [go here for a robust solution][subscribe-container].

_client/helpers/SubscribeComponent.jsx_

```javascript
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default ComposedComponent => class extends Component {
  constructor() {
    super();
    this.subs = {};
  }

  subscribe(name, ...args) {
    if (this.subs[name])
      this.subs[name].stop();

    this.subs[name] = Meteor.subscribe(name, ...args);
  }

  componentWillUnmount() {
    Object.keys(this.subs).map(key => this.subs[key].stop());
  }

  render() {
    return (
      <ComposedComponent
        {...this.props}
        subscribe={this.subscribe.bind(this)}
        subscriptionReady={this.subscriptionReady.bind(this)}
      />
    );
  }
};
```

Using this high order component we can write a container that subscribes to the messages:

_client/containers/App.jsx_

```javascript
import SubscribeComponent from '../helpers/SubscribeComponent';
import MessagesList from '../components/MessagesList';

class App extends Component {
  componentWillMount() {
    this.props.subscribe('messages');
  }

  render() {
    return <MessagesList {…this.props} />;
  }
}

const mapStateToProps = state => {
  return { messages: state.messages };
};

export default connect(mapStateToProps)(SubscribeComponent(App))
```

I’m assuming there is a component called `MessagesList` that renders the list of messages. This component will always receive an up to date list of messages. The only thing missing would be to connect the Store and this container to the router. This can be accomplished by adding the following code.

_client/setup.js_

```javascript
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import createStore from './store/createStore';
import App from './containers/App';

Meteor.startup(() => {
  render((
    <Provider store={createStore()}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  ), document.getElementById('app'));
});
```

Please keep in mind that this is not a complete tutorial, the code will not work as there are some missing parts. [Go here for a working example][app].

## Calling methods

I have already mentioned actions in the previous sections, but to establish a common understanding here is the definition from the Redux [documentation][redux-actions]:

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. (…) Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants.

We are already dispatching the list of messages using the type `'SET_MESSAGES'`.

Now another concept, Action Creators, also from the documentation:

> Action creators are exactly that—functions that create actions.

You will use actions and action creators for everything: loading the messages from the back-end; creating a message; anything related user interactions.    

On Meteor we usually do not make HTTP requests, we call methods. And if the method changes any collection you will see the Store update automatically.

Sometimes you may be interested in the return value from a method, or you may be dealing with data that only exists on the client. In those scenarios, you still want to dispatch that data to the store.

The following is a Meteor method that creates messages:

_server/methods.js_

```javascript
import { Meteor } from 'meteor/meteor';
import Messages from '../lib/messages';

Meteor.methods({
  createMessage: function(message) {
    Messages.insert({ text: message });
  },
});
```

And our action creator that calls the method:

_client/actions.js_

```javascript
export default createMessage = message => {
    dispatch => Meteor.call('createMessage', message);
}
```

And the same action creator, but, this time, we are interested in the return value.

_client/actions.js_

```javascript
export default createMessage = message => {
  return dispatch => {
    Meteor.call('createMessage', message, err => {
      if (err)
        dispatch({
          type: ‘CREATE_MESSAGE_ERROR’,
          err,
        });
    });
  };
}
```

## Final Thoughts

This approach is still under test, and I have more ideas to share on it, but I will leave them for a next article. I understand that this setup will nor work for everyone nor every application. For me, it provides a sense of structure and control that I could never find before with Blaze.

You should look at the [working example][app]. Feel free to ask questions and leave your feedback, and for more [subscribe to our newsletter][newsletter].

[other-data-loading]: https://www.discovermeteor.com/blog/data-loading-react/
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[meteor]: https://www.meteor.com/
[redux-actions]: http://redux.js.org/docs/basics/Actions.html
[redux-store]: http://redux.js.org/docs/api/Store.html
[containers]: https://medium.com/@learnreact/container-components-c0e67432e005#.wtehcfws1
[subscribe-container]: https://github.com/gabrielpoca/meteor-redux-demo/blob/7f71ae2dbba1c72ff5b93c2d8d10fdb646e6010c/client/helpers/SubscribeComponent.jsx
[app]: https://github.com/gabrielpoca/meteor-redux-demo/tree/7f71ae2dbba1c72ff5b93c2d8d10fdb646e6010c
[newsletter]: https://subvisual.co/newsletter/
