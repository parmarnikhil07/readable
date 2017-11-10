import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import * as API from './../utils/api.js'
import './../App.css'
import SideBar from './SideBar.js'
import UdacityCategory from './UdacityCategory.js'
import ReactCategory from './ReactCategory.js'
import ReduxCategory from './ReduxCategory.js'
import HomeContent from './HomeContent.js'
import AddNewPost from './AddNewPost.js'
import PostDetailPage from './PostDetailPage.js'
import EditPost from './EditPost.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <SideBar />
          <div className="main-content-div">
          <Router>
            <Switch>
              <Route exact path='/' component={HomeContent}/>
              <Route exact path='/react' component={ReactCategory}/>
              <Route exact path='/redux' component={ReduxCategory}/>
              <Route exact path='/udacity' component={UdacityCategory}/>
              <Route exact path='/add-post' component={AddNewPost}/>
              <Route exact path='/posts/:post_id' component={PostDetailPage}/>
              <Route exact path='/edit-post/:post_id' component={EditPost}/>
             </Switch>
           </Router>
        </div>
      </div>
    );
  }
}

export default App;
