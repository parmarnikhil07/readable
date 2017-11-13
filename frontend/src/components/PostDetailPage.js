import React, { Component } from 'react';
import './../App.css';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';

class PostDetailPage extends Component {

    componentDidMount(e){
      this.props.getPostDetailById(this.props.match.params.post_id);  //
    }

    voteUpDownAction = (postId, upORdown) => {
      let data = {'option': upORdown}
      this.props.voteUpDown(data, postId);
    }

    voteUpDownCommentAction = (commentId, upORdown) => {
      let data = {'option': upORdown}
      this.props.voteUpDownComment(data, commentId);
    }

    deletePostAction = (postId) => {
      this.props.deletePost(postId)
    }

    deleteCommentAction = (commentId) => {
      this.props.deleteComment(commentId)
    }

    callAddCommentFunction = (e) => {
      e.preventDefault();
      if(ReactDOM.findDOMNode(this.refs.body).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.author).value.trim().length <= 0){
        alert("Please fill all fields!");
      } else {
        let data = {};
        data.id = new Date().getTime();
        data.timestamp = new Date().getTime();
        data.parentId = this.props.match.params.post_id;
        data.body = ReactDOM.findDOMNode(this.refs.body).value.trim();
        data.author = ReactDOM.findDOMNode(this.refs.author).value.trim();
        this.props.addNewComment(data);
        ReactDOM.findDOMNode(this.refs.addCategoryForm).reset();
      }
    }

    editButtonClick = (commentId) => {
      document.getElementById("edit_"+commentId).style.display = 'none';
      document.getElementById("save_"+commentId).style.display = 'inline';
      document.getElementById("body_"+commentId).style.display = 'none';
      document.getElementById("textarea_"+commentId).style.display = 'inline';
    }

    saveButtonClick = (commentId) => {
      if(document.getElementById("textarea_"+commentId).value.length <= 0){
        alert("Comment can't be empty");
      } else {
        let data = {};
        data.timestamp = new Date().getTime();
        data.body = document.getElementById("textarea_"+commentId).value;
        data.id = commentId;
        this.props.editComment(data);
        document.getElementById("edit_"+commentId).style.display = 'inline';
        document.getElementById("save_"+commentId).style.display = 'none';
        document.getElementById("body_"+commentId).style.display = 'inline';
        document.getElementById("textarea_"+commentId).style.display = 'none';
      }
    }

  render() {
    if(this.props.redirect){  //check if rediriect state is true, redirect to post detail page
      return <Redirect to={`/`}/>
    }
    return (
      <div className="content-div">
          {
            this.props.postDetail ?
            <div>
              <div className="post-list-div">
                <h2>{this.props.postDetail.title}</h2>
                <div className='post-list-info-div'>
                  <span>Author: {this.props.postDetail.author}</span>
                  <span>Time: {new Date(this.props.postDetail.timestamp).toUTCString()}</span>
                  <span>Category: {this.props.postDetail.category}</span>
                  <span>Comments: {this.props.comments.length}</span>
                </div>
                <div className='post-list-action-div'>
                  <span>VoteCount: {this.props.postDetail.voteScore}</span>
                  <span><button onClick={() => this.voteUpDownAction(this.props.postDetail.id,'upVote')}>Up Vote</button></span>
                  <span><button onClick={() => this.voteUpDownAction(this.props.postDetail.id,'downVote')}>Down Vote</button></span>
                  <span><a href={`/#/edit-post/${this.props.postDetail.id}`}>Edit</a></span>
                  <span><button onClick={() => this.deletePostAction(this.props.postDetail.id)}>Delete</button></span>
                </div>
              </div>
              <h2 style={{textAlign:'left',marginLeft:"20px"}}>Comments</h2>
              {
                this.props.comments.map((comment, i) => {
                  return (
                    <div key={i} className="comment-list-div">
                      <table className="Comment-table">
                        <tbody>
                          <tr>
                            <td className="author-box" width='20px'>Author: <br/>{comment.author}</td>
                            <td>
                              <h3 id={"body_"+comment.id} value={comment.body}>{comment.body}</h3>
                              <textarea className="comment_textarea" id={"textarea_"+comment.id} defaultValue={comment.body}></textarea>
                              <div className='comment-list-info-div'>
                                <span>Time: {new Date(comment.timestamp).toUTCString()}</span>
                                <span>VoteCount: {comment.voteScore}</span>
                              </div>
                              <div className='comment-list-action-div'>
                                <span><button onClick={() => this.voteUpDownCommentAction(comment.id,'upVote')}>Up Vote</button></span>
                                <span><button onClick={() => this.voteUpDownCommentAction(comment.id,'downVote')}>Down Vote</button></span>
                                <span>
                                  <button onClick={() => this.editButtonClick(comment.id)} id={"edit_"+comment.id}  >Edit</button>
                                  <button  onClick={() => this.saveButtonClick(comment.id)} id={"save_"+comment.id} className="comment_save_button">Save</button>
                                </span>
                                <span><button onClick={() => this.deleteCommentAction(comment.id)}>Delete</button></span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })
              }
                <div className="add-comment-div">
                  <h2 style={{textAlign:'left',padding:"20px", background:"#EEEEEE"}}>Add Comment</h2>
                  <form ref="addCategoryForm" encType="multipart/form-data" id="category-add" onSubmit={this.callAddCommentFunction}>
                    <table>
                      <tbody>
                        <tr>
                          <td>Body:</td>
                        </tr>
                        <tr>
                          <td><textarea type="text" ref="body" name="body" rows="4"></textarea></td>
                        </tr>
                        <tr>
                          <td>Author:</td>
                        </tr>
                        <tr>
                          <td><input type="text" ref="author" name="author"/></td>
                        </tr>
                        <tr>
                          <td><button type='submit'>Save</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
              : ""
            }
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    postDetail: state.posts,
    redirect: state.redirect,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostDetailById : (postId) => dispatch({type:'GET_POST_DETAIL_BY_ID', postId:postId}),
    voteUpDown : (data, postId) => dispatch({type:'VOTE_UP_DOWN', data:data, postId:postId, detailPage:'true'}),
    addNewComment : (data) => dispatch({type:'ADD_COMMENT', data:data}),
    deletePost : (postId) => dispatch({type:'POST_DELETE', postId:postId, detailPage:'true'}),
    voteUpDownComment : (data, commentId) => dispatch({type:'VOTE_UP_DOWN_COMMENT', data:data, commentId:commentId}),
    deleteComment : (commentId) => dispatch({type:'COMMENT_DELETE', commentId:commentId}),
    editComment : (data) => dispatch({type:'EDIT_COMMENT', data:data}),
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(PostDetailPage);
