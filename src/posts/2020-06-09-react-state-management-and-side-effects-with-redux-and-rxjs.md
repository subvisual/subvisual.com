---
path: /posts/react-state-management-and-side-effects-with-redux-and-rxjs/
title: React state management and side-effects with Redux and RxJS
author: gabriel-poca
date: 2020-06-09
intro: Over the years I worked on many front-end projects. I don't always enjoy it, but I've found some libraries that make it more pleasant. One of those libraries is RxJS.
---

# React state management and side-effects with Redux and RxJS

In React, state management can take many shapes. I remember when the [Flux architecture](https://facebook.github.io/flux/) was the hot new thing. Eventually Redux became the standard, but new libraries are published all the time, especially when we get React APIs that fundamentally change how we build applications. React Hooks are the most recent example of that, and I believe Redux adapted itself nicely to it.

For side-effects, I don't even know what the game was. I've seen people use a wide range of solutions, from nothing to Redux-Sagas. I've had my share of obscure Redux middlewares.

Over the years I worked on many front-end projects. I don't always enjoy it, but I've found some libraries that make it more pleasant. One of those libraries is RxJS. I found it because of [RxDB](https://rxdb.info/), which combines RxJS and PouchDB to create the best thing I've used so far to build offline-first web apps.

RxJS can be many things, but I only use it to manage side-effects. You may be thinking that if I'm using RxJS I don't need Redux. It's pretty easy to build a Redux clone using _BehaviorSubject_ and _scan_. But the truth is that I would be writing a lot of plumbing code, which Redux already does for me. I would eventually arrive at the same solution or, most likely, a worse one. And I wouldn't be able to use the community-supported packages. I know this because I did try to do it.

Back to Redux for state management, and RxJS for side effects. We just need one other library, to combines these two: [redux-observables](https://redux-observable.js.org/).

In redux-observarbles we work with epics. An epic is a function which takes a stream of actions and returns a stream of actions. **Actions in, actions out.** Let's take this example from the docs:

```js
const pingEpic = (action$) =>
  action$.pipe(
    filter((action) => action.type === "PING"),
    mapTo({ type: "PONG" })
  )

// later...
dispatch({ type: "PING" })
```

In this example, the `pingEpic` listens for actions `PING` and dispatches a `PONG` action when it finds one. This would be the same as:

```js
dispatch({ type: "PING" })
dispatch({ type: "PONG" })
```

Keep in mind that you're not transforming the first action into the second. Actions that you receive in the epic have already finished running through the reducers. Here's an epic I wrote recently to debounce search requests:

```js
export const notesSearchEpic = (action$) =>
  action$.pipe(
    ofType("NOTES_SEARCH"),
    throttle(() => interval(200), { trailing: true }),
    mergeMap(({ payload }) => Notes.search(payload).then(notesSearchResult))
  )
```

In this one, we listen for actions of type `NOTES_SEARCH`, throttle them, run the search, and dispatch the results. The `notesSearchResult` is an action creator. The action `NOTES_SEARCH` is used both to update the reducer with the current search query, but also to initialize this side-effect.

## Similar libraries

Before we move to more advanced examples, you should know that if the only thing you need is to dispatch asynchronous actions, [redux-thunk](https://github.com/reduxjs/redux-thunk) is more than enough.

One question that shows up all the time is, how does it compare to redux-sagas? Having also used redux-sagas in production, I can say that I find the declarative style of redux-observables a lot nicer. It's also important to remember that RxJS is a generic async library, which you can use in a lot of contexts. That being said, there's value in learning redux-sagas, as the concepts behind it are useful, for instance when you're working with event sourcing.

I was looking for a nice example to show the difference between a flow written in sagas and RxJS. I found [this website](https://hackmd.io/@2qVnJRlJRHCk20dvVxsySA/H1xLHUQ8e?type=view) with a bunch of them. Here's a user session flow written in sagas:

```js
import { take, put, call, fork, cancel } from "redux-saga/effects"
import Api from "..."

function* loginWatcher() {
  const { user, password } = yield take("login_request")
  const task = yield fork(authorize, user, password)
  const action = yield take(["logout", "login_error"])

  if (action.type === "logout") {
    yield cancel(task)
    yield put({ type: "login_cancel" })
  }
}

function* authorize(user, password) {
  try {
    const token = yield call(Api.getUserToken, user, password)
    yield put({ type: "login_success", token })
  } catch (error) {
    yield put({ type: "login_error", error })
  }
}
```

The exact same flow, now written in redux-observarbles:

```js
const authEpic = action$ =>
    action$
        .ofType('login_request')
        .flatMap(({ payload: { user, password }})=>
            Observable
                .ajax
                .get('/api/userToken', { user, password })
                .map(({ token }) => ({ type: 'login_success', token }))
                .takeUntil(action$.ofType('login_cancel', 'logout'))
                .catch(error => of({ type: 'login_error', error }))
```

I'm sure you can find examples that benefit sagas in terms of readability, but I like this example because it showcases how different both styles are. The redux-sagas example is pretty similar to something I had in production 3 years ago.

## TypeScript

TypeScript is one of those things that can transform a JavaScript hater into a puppy. I've seen it first-hand. But let's remember that it is not a silver bullet, and it doesn't prevent runtime errors (I guess Elm's the only language promising such thing). TypeScript cannot be an excuse not to write tests. It's a tool, and it's a nice one. Now on with the show.

The first time I tried to use TypeScript in a React project was a shitshow. This was years ago when using high-order components was the real deal. We weren't even using render props at the time. Using TypeScript was terrible. Just trying to figure out the type for a component that was connected to the router was a headache. Things are much nicer now, as you can see in the following examples.

Let's start with the action:

```ts
export const notesSearch = createAction("NOTES_SEARCH")<string>()
export const notesSearchResult = createAction("NOTES_SEARCH_RESULT")<
  SearchResult[]
>()

export type NotesActionTypes =
  | ReturnType<typeof notesSearchResult>
  | ReturnType<typeof notesSearch>
// actions
```

The `createAction` function is a little helper I wrote. It creates an action creator function with a `type` property using the dispatched type.

```ts
type BaseType = string

export default function createAction<T extends BaseType>(type: T) {
  return function <K = undefined>() {
    const builder = function (payload?: K): { type: T; payload: K } {
      return {
        type,
        payload: payload,
      }
    }

    builder.type = type

    return builder
  }
}
```

The reducer saves the actions' payloads to the store.

```ts
// reducer
import { NotesState } from "../models/types"

import { NotesActionTypes, notesSearch, notesSearchResult } from "./actions"

export function notesReducer(
  state: NotesState,
  action: NotesActionTypes
): NotesState {
  switch (action.type) {
    case notesSearch.type:
      return { ...state, searchQuery: action.payload }

    case notesSearchResult.type:
      return { ...state, searchResult: action.payload }

    default:
      return state || initalState
  }
}
```

The component uses a selector to fetch the search query parameter we set in the reducer and dispatches the search action when the input changes.

```ts
export function HomePage() {
  const query = useSelector(getSearchQuery);

  ...

  return (
    ...
      <Search
        value={query}
        onChange={(ev) => dispatch(notesSearch(ev.target.value))}
        placeholder="Search..."
      />
    ...
  )
}
```

The action that transforms a search query into search results is the one you saw above, now in TypeScript:

```ts
export const notesSearchEpic = (
  action$: ActionsObservable<ReturnType<typeof notesSearch>>
) =>
  action$.pipe(
    ofType(notesSearch.type),
    throttle(() => interval(200), { trailing: true }),
    mergeMap(({ payload }) => Notes.search(payload).then(notesSearchResult))
  )
```

This setup works for me and for the people I worked with. I've tried a few libraries for state management and side-effects, but these are the most pleasant ones to work with.

Reach out to me on [Twitter](https://twitter.com/gabrielgpoca) if you have any comments or questions. I'll try to answer them.

Stay safe.
