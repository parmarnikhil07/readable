import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';
import { Provider } from 'react-redux';
import * as API from './utils/api.js';

const apiMiddleware = (store) => (next) => (action) => {
  /*get all categoires */
  API.getAllCategories().then(
    (res) => {
      action = {
        ...action,
        categories : res.categories
      }
      /*switch for all actions */
        switch (action.type) {
          case 'GET_ALL_POSTS': {
            API.getAllPosts().then(
              (posts) => {
                action = {
                  ...action,
                  payload : posts
                }
                next(action)
              }
            )
            break;
          }
          case 'GET_CATEGORY_POSTS' : {
            API.getCategoryPosts(action.category).then(
              (posts) => {
                action = {
                  ...action,
                  payload : posts
                }
                next(action)
              }
            )
            break;
          }
          case 'GET_POST_DETAIL_BY_ID' : {
            API.getPostDetailById(action.postId).then(
              (posts) => {
                action = {
                  ...action,
                  payload : posts
                }
            API.getCommentsByPostId(action.postId).then(
              (res) => {
                    action = {
                      ...action,
                      comments : res
                    }
                    next(action)
               })
              }
            )
            break;
          }
          case 'VOTE_UP_DOWN' : {
            API.voteUpDown(action.postId, action.data).then(
              (res) => {
                  action = {
                    ...action,
                    NewData : res
                  }
                  next(action)
               }
            )
            break;
          }
          case 'VOTE_UP_DOWN_COMMENT' : {
            API.voteUpDownComment(action.commentId, action.data).then(
              (res) => {
                  action = {
                    ...action,
                    NewData : res
                  }
                  next(action)
               }
            )
            break;
          }
          case 'POST_DELETE' : {
            API.deletePost(action.postId).then(
              (res) => {
                  action = {
                    ...action,
                    deletedData : res
                  }
                  next(action)
               }
            )
            break;
          }
          case 'COMMENT_DELETE' : {
            API.deleteComment(action.commentId).then(
              (res) => {
                  action = {
                    ...action,
                    deletedData : res
                  }
                  next(action)
               }
            )
            break;
          }
          case 'GET_COMMENTS_BY_POST_ID' : {
            API.getCommentsByPostId(action.postId).then(
              (res) => {
                  action = {
                    ...action,
                    comments : res
                  }
                  next(action)
               })
            break;
          }
          case 'ADD_COMMENT': {
            API.addNewComment(action.data).then(
              (res) => {
                action = {
                  ...action,
                  NewComment : res
                }
                next(action)
            })
          break;
          }
          case 'EDIT_COMMENT': {
            API.editComment(action.data).then(
              (res) => {
                action = {
                  ...action,
                  editedComment : res
                }
                next(action)
            })
          break;
          }
          default: {
            next(action)
          }
        }
    }
  );
}

const store = createStore(reducer, {posts:[], comments:[], categories:[]}, applyMiddleware(apiMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
