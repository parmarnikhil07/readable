import React, { Component } from 'react';
import * as API from './../utils/api.js';
import './../App.css';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
// var ReactDOM = require('react-dom');

class AddNewPost extends Component {

    state = {
      postDetail: {
        title:'',
        body: '',
        author: '',
        category: ''
      },
      redirect:false
    }

    componentDidMount(){
      API.getPostDetailById(this.props.match.params.post_id)
      .then((postDetail) => {
        this.setState({postDetail});
      })
    }

    //If you use arrow function you don't need to bind function, else you have to use bind in constructor
    callAddFunction = (e) => {
      e.preventDefault();
      if(ReactDOM.findDOMNode(this.refs.title).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.body).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.author).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.category).value.trim().length <= 0){
        alert("Please fill all fields!");
      } else {
        let data = {};
        data.id = this.props.match.params.post_id;
        data.title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        data.body = ReactDOM.findDOMNode(this.refs.body).value.trim();
        data.author = ReactDOM.findDOMNode(this.refs.author).value.trim();
        data.category = ReactDOM.findDOMNode(this.refs.category).value.trim();
        API.editPost(data).then((postDetail) => {
          this.setState({redirect:true}); //set to true to redirect to another page
        });
      }
    }

    ChangeInput = (e) => {
      let postDetail = this.state.postDetail; //get state to local varibale
      postDetail[e.target.name] = e.target.value; //update key(name) of the object to new passed value
      this.setState({postDetail});  //set changes to state
    }

  render() {
    if(this.state.redirect){  //check if rediriect state is true, redirect to post detail page
      return <Redirect to={`/posts/${this.state.postDetail.id}`}/>
    }
    return (
      <div className="content-div">
        <form ref="addForm" encType="multipart/form-data" id="product-add" onSubmit={this.callAddFunction}>
          <table>
            <tbody>
              <tr>
                <td colSpan='2'><h2>NEW POST</h2>
                </td>
              </tr>
              <tr>
                <td>Title:</td>
                <td><input type="text" ref="title" value={this.state.postDetail.title} name="title" onChange={this.ChangeInput} /></td>
              </tr>
              <tr>
                <td>Body:</td>
                <td><textarea type="text" ref="body" name="body" rows="4" onChange={this.ChangeInput} value={this.state.postDetail.body}></textarea></td>
              </tr>
              <tr>
                <td>Author:</td>
                <td><input type="text" ref="author" value={this.state.postDetail.author} name="author" onChange={this.ChangeInput}/></td>
              </tr>
              <tr>
                <td>Category:</td>
                <td><select  value={this.state.postDetail.category} ref="category" name="category"
                   onChange={this.ChangeInput}>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                  </select></td>
              </tr>
              <tr>
                <td colSpan="2"><center><button type='submit'>Save</button></center></td>
              </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
  }
}

export default AddNewPost;
