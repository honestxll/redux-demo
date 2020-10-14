import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, Dispatch } from 'redux'
import { Provider, connect } from 'react-redux'

import './style.css'

interface Post {
  id?: number
  title?: string
}

const postReducer = (state: Post[] = [], action: any) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          ...action.post,
        },
      ]
    case 'DELETE_POST':
      return state.filter((post: Post) => post.id !== action.id)
    default:
      return state
  }
}

const mainReducer = combineReducers({
  posts: postReducer,
})

const store = createStore(mainReducer)
store.dispatch({
  type: 'ADD_POST',
  post: {
    id: 1,
    title: 'welcome to anhui',
  },
})
store.dispatch({
  type: 'ADD_POST',
  post: {
    id: 2,
    title: '欢迎来到安徽',
  },
})

const PostItem = ({
  entity,
  onClickDeleteButton,
}: {
  entity: Post
  onClickDeleteButton: Function
}) => {
  return (
    <div className="post-item">
      <h3>{entity.title}</h3>
      <button onClick={() => onClickDeleteButton()}>DELETE</button>
    </div>
  )
}

const PostList = ({
  entities,
  onClickDeleteButton,
}: {
  entities: Post[]
  onClickDeleteButton: Function
}) => {
  const items = entities.map((item: Post) => (
    <PostItem
      key={item.id}
      entity={item}
      onClickDeleteButton={() => onClickDeleteButton(item.id)}
    />
  ))
  return <div>{items}</div>
}

const mapStateToProps = (state: { posts: Post[] }) => ({
  entities: state.posts,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickDeleteButton: (id: number) => {
    dispatch({
      type: 'DELETE_POST',
      id,
    })
  },
})

const PostConnect = connect(mapStateToProps, mapDispatchToProps)(PostList)

const App = () => (
  <div className="container">
    <h1 className="app-title">App</h1>
    <PostConnect />
  </div>
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
