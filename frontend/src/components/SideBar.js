import React, { Component } from 'react';
import * as API from './../utils/api.js';
import './../App.css';

class SideBar extends Component {
  state = {
    categories: [],
  }

  componentDidMount(e){
    API.getAllCategories().then(
      ( categories ) => {
        this.setState(categories);
      });
    }

  render() {
    return (
      <div className="side-bar-main-div">
        <ul>
        <li key="Categories"><h2><a href="/#/">Categories</a></h2></li>
          {
            this.state.categories.map((category) => {
              return (<li key={category.name}> <a href={"/#/"+category.name}>{category.name}</a></li>)
            })
          }
        </ul>
        <div className="add-post-div">
          <a href="/#/add-post">New Post</a>
        </div>
      </div>
    );
  }
}

export default SideBar;
