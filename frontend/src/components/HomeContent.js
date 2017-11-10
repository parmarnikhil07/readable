import React, { Component } from 'react';
import './../App.css';
import { connect } from 'react-redux';

class HomeContent extends Component {
    componentDidMount(e){
      this.props.getAllPost({});
    }

    voteUpDownAction = (postId, upORdown) => {
      let data = {'option': upORdown};
      this.props.voteUpDown(data, postId);
    }

    deletePostAction = (postId) => {
      this.props.deletePost(postId);
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
        this.props.posts.length > 0 &&
        this.props.posts.map((post, i) => {
          return (
            <div key={i} className="post-list-div">
              <h2><a href={`/#/posts/${post.id}`}>{post.title}</a></h2>
              <div className='post-list-info-div'>
                <span>Author: {post.author}</span>
                <span>Time: {new Date((post.timestamp)).toUTCString()}</span>
                <span>Category: {post.category}</span>
              </div>
              <div className='post-list-action-div'>
                <span>VoteCount: {post.voteScore}</span>
                <span><button onClick={() => this.voteUpDownAction(post.id,'upVote')}>Up Vote</button></span>
                <span><button onClick={() => this.voteUpDownAction(post.id,'downVote')}>Down Vote</button></span>
                <span><a href={`/#/edit-post/${post.id}`}>Edit</a></span>
                <span><button onClick={() => this.deletePostAction(post.id)}>Delete</button></span>
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
    posts: state.posts,
    sort: state.sort
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPost : (data) => dispatch({type:'GET_ALL_POSTS', payload:''}),
    voteUpDown : (data, postId) => dispatch({type:'VOTE_UP_DOWN', data:data, postId:postId}),
    deletePost : (postId) => dispatch({type:'POST_DELETE', postId:postId}),
    sortMethod : (sort) => dispatch({type:'SORT_POST', sort:sort})
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(HomeContent);
