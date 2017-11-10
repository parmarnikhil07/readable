import React, { Component } from 'react';
import './../App.css';
import { connect } from 'react-redux';

class ReduxCategory extends Component {

    componentDidMount(e){
      this.props.getCategoryPost('redux');
    }

    voteUpDownAction = (postId, upORdown) => {
      let data = {'option': upORdown}
      this.props.voteUpDown(data, postId);
    }

    deletePostAction = (postId) => {
      this.props.deletePost(postId)
    }

    sortMethodAction = (e) => {
      this.props.sortMethod(e.target.value);
    }

  render() {
    return (
      <div className="content-div">
        <div className="sorting-div">
          <label>Sort by</label>
          <select onChange={(e) => this.sortMethodAction(e)}>/select>
            <option value="">Select</option>
            <option value="vote_asc">Vote Asc</option>
            <option value="vote_desc">Vote Desc</option>
            <option value="time_asc">Time Asc</option>
            <option value="time_desc">Time Desc</option>
            <option value="title_asc">Title Asc</option>
            <option value="title_desc">Title Desc</option>
          </select>
          </div>
        {
          this.props.reduxPosts.length > 0 && this.props.reduxPosts.map((reduxPost, i) => {
            return (
              <div key={i} className="post-list-div">
                <h2><a href={`/#/posts/${reduxPost.id}`}>{reduxPost.title}</a></h2>
                <div className='post-list-info-div'>
                  <span>Author: {reduxPost.author}</span>
                  <span>Time: {new Date((reduxPost.timestamp)).toUTCString()}</span>
                  <span>Category: {reduxPost.category}</span>
                </div>
                <div className='post-list-action-div'>
                  <span>VoteCount: {reduxPost.voteScore}</span>
                  <span><button onClick={() => this.voteUpDownAction(reduxPost.id,'upVote')}>Up Vote</button></span>
                  <span><button onClick={() => this.voteUpDownAction(reduxPost.id,'downVote')}>Down Vote</button></span>
                  <span><a href={`/#/edit-post/${reduxPost.id}`}>Edit</a></span>
                  <span><button onClick={() => this.deletePostAction(reduxPost.id)}>Delete</button></span>
                </div>
              </div>
            );
          })
        }
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    reduxPosts: state.posts,
    sort: state.sort
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryPost : () => dispatch({type:'GET_CATEGORY_POSTS', category:'redux'}),
    voteUpDown : (data, postId) => dispatch({type:'VOTE_UP_DOWN', data:data, postId:postId}),
    deletePost : (postId) => dispatch({type:'POST_DELETE', postId:postId}),
    sortMethod : (sort) => dispatch({type:'SORT_POST', sort:sort})
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ReduxCategory);