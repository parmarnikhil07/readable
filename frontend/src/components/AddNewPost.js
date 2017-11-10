import React, { Component } from 'react';
import * as API from './../utils/api.js';
import './../App.css';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'

class AddNewPost extends Component {

    state = {
      selectedCategoryId: '',
      redirect:false,
      id:''
    }

    //If you use arrow function you don't need to bind function, else you have to use bind in constructor
    callAddFunction = (e) => {
      e.preventDefault();
      if(ReactDOM.findDOMNode(this.refs.title).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.body).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.author).value.trim().length <= 0 || ReactDOM.findDOMNode(this.refs.category).value.trim().length <= 0){
        alert("Please fill all fields!");
      } else {
        let data = {};
        data.id = new Date().getTime();
        data.timestamp = new Date().getTime();
        data.title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        data.body = ReactDOM.findDOMNode(this.refs.body).value.trim();
        data.author = ReactDOM.findDOMNode(this.refs.author).value.trim();
        data.category = ReactDOM.findDOMNode(this.refs.category).value.trim();
        API.addNewPost(data).then((res) => {
          this.setState({redirect:true,id:res.id});
        });
    }
    }
  render() {
    if(this.state.redirect){
       return <Redirect to={`/posts/${this.state.id}`} />
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
              <td><input type="text" ref="title" name="title"/></td>
            </tr>
            <tr>
              <td>Body:</td>
              <td><textarea type="text" ref="body" name="body" rows="4"></textarea></td>
            </tr>
            <tr>
              <td>Author:</td>
              <td><input type="text" ref="author" name="author"/></td>
            </tr>
            <tr>
              <td>Category:</td>
              <td><select ref="category"
                onChange={this.onCategoryChange}>
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
