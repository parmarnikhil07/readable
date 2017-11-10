
export function reducer (state = {}, action) {
  switch (action.type) {
    case 'GET_ALL_POSTS': {
      state = {
        ...state,
        posts : action.payload
      }
      break;
    }
    case 'GET_CATEGORY_POSTS': {
      state = {
        ...state,
        posts : action.payload
      }
      break;
    }
    case 'GET_POST_DETAIL_BY_ID': {
      state = {
        ...state,
        posts : action.payload,
        comments: action.comments
      }
      break;
    }
    case 'VOTE_UP_DOWN': {
      if(!action.detailPage){
        let newPost = state.posts.map((post, index) => {
          if(action.NewData.id === post.id) {
            return action.NewData
          } else {
            return post
          }
        });
        state = {
          ...state,
          posts:newPost
        }
      } else {
        state = {
          ...state,
          posts:action.NewData
        }
      }
      break;
    }
    case 'VOTE_UP_DOWN_COMMENT': {
      let newCommentData = state.comments.map((comments, index) => {
        if(action.NewData.id === comments.id) {
          return action.NewData
        } else {
          return comments
        }
      });
      state = {
        ...state,
        comments:newCommentData
      }
      break;
    }
    case 'ADD_COMMENT': {
      state = {
        ...state,
        comments: [...state.comments, action.NewComment]
      }
      break;
    }
    case 'POST_DELETE': {
      if(!action.detailPage){
        let newPost = state.posts.filter((post, index) => {
          if(action.deletedData.id === post.id) {
            //do not return anything so it will be removed
            return ''
          } else {
            return post
          }
        });
        state = {
          ...state,
          posts:newPost,
        }
      } else {
        state = {
          ...state,
          posts:[],
          redirect:true //for detail page only
        }
      }
      break;
    }
    case 'COMMENT_DELETE': {
      let newComments = state.comments.filter((comment, index) => {
        if(action.deletedData.id === comment.id) {
          //do not return anything so it will be removed
          return ''
        } else {
          return comment
        }
      });
      state = {
        ...state,
        comments:newComments,
      }
      break;
    }
    case 'EDIT_COMMENT': {
      let newComments = state.comments.map((comment, index) => {
        if(action.editedComment.id === comment.id) {
          //do not return anything so it will be removed
          return action.editedComment
        } else {
          return comment
        }
      });
      state = {
        ...state,
        comments:newComments,
      }
      break;
    }
    case 'SORT_POST' : {
      let sortedPosts = "";
      if(action.sort === 'vote_asc'){
        sortedPosts = state.posts.sort((a, b) =>{
        if(parseInt(a.voteScore, 10) < parseInt(b.voteScore, 10)) {
          return -1
        } else {
          return 1
        }
      });
      } else if(action.sort === 'vote_desc'){
        sortedPosts = state.posts.sort((a, b) =>{
          if(parseInt(a.voteScore, 10) > parseInt(b.voteScore, 10)) {
            return -1
          } else {
            return 1
          }
        });
      } else if(action.sort === 'title_desc'){
        sortedPosts = state.posts.sort((a, b) =>{
          if(a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1
          } else {
            return 1
          }
        });
      } else if(action.sort === 'title_asc'){
        sortedPosts = state.posts.sort((a, b) =>{
          if(a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1
          } else {
            return 1
          }
        });
      } else if(action.sort === 'time_asc'){
        sortedPosts = state.posts.sort((a, b) =>{
          if(a.time > b.time) {
            return -1
          } else {
            return 1
          }
        });
      } else if(action.sort === 'time_desc'){
        sortedPosts = state.posts.sort((a, b) =>{
          if(a.time < b.time) {
            return -1
          } else {
            return 1
          }
        });
      } else {
        sortedPosts = state.posts;
      }
      state = {
        ...state,
        posts:sortedPosts,
        sort:action.sort
      }
      break;
    }
    default: {
      state
    }
  }
  return state;
}

export default reducer
