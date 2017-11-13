import React, { Component } from 'react';
import './../App.css';
import { connect } from 'react-redux';

class Category extends Component {
    state = {
      currentCategory:this.props.match.params.category,
    }

    componentDidMount (e) {
      this.props.getCategoryPost(this.props.match.params.category);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({currentCategory: this.props.match.params.category});
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
    if(this.props.match.params.category !== this.state.currentCategory){
      this.componentDidMount();
    }
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
          this.props.categoryPosts.length > 0 && this.props.categoryPosts.map((categoryPost, i) => {
            return (
              <div key={i} className="post-list-div">
                <h2><a href={`/#/${categoryPost.category}/${categoryPost.id}`}>{categoryPost.title}</a></h2>
                <div className='post-list-info-div'>
                  <span>Author: {categoryPost.author}</span>
                  <span>Time: {new Date((categoryPost.timestamp)).toUTCString()}</span>
                  <span>Category: {categoryPost.category}</span>
                </div>
                <div className='post-list-action-div'>
                  <span>VoteCount: {categoryPost.voteScore}</span>
                  <span><button onClick={() => this.voteUpDownAction(categoryPost.id,'upVote')}>Up Vote</button></span>
                  <span><button onClick={() => this.voteUpDownAction(categoryPost.id,'downVote')}>Down Vote</button></span>
                  <span><a href={`/#/edit-post/${categoryPost.id}`}>Edit</a></span>
                  <span><button onClick={() => this.deletePostAction(categoryPost.id)}>Delete</button></span>
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
    categoryPosts: state.posts,
    sort: state.sort
  }
}
const mapDispatchToProps = (dispatch, props, category) => {
  return {
    getCategoryPost : (category) => dispatch({type:'GET_CATEGORY_POSTS', category:category}),
    voteUpDown : (data, postId) => dispatch({type:'VOTE_UP_DOWN', data:data, postId:postId}),
    deletePost : (postId) => dispatch({type:'POST_DELETE', postId:postId}),
    sortMethod : (sort) => dispatch({type:'SORT_POST', sort:sort})
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Category);
