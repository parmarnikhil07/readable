import React, { Component } from 'react';
import './../App.css';
import { connect } from 'react-redux';

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar-main-div">
        <ul>
        <li key="Categories"><h2><a href="/#/">Categories</a></h2></li>
          {
            this.props.categories && this.props.categories.map((category) => {
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

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect (mapStateToProps)(SideBar);
