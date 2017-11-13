import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import * as API from './../utils/api.js'
import './../App.css'
import SideBar from './SideBar.js'
import Category from './Category.js'
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
              <Route exact path='/add-post' component={AddNewPost}/>
              <Route exact path='/:category' component={Category}/>
              <Route exact path='/edit-post/:post_id' component={EditPost}/>
              <Route exact path='/:category/:post_id' component={PostDetailPage}/>
             </Switch>
           </Router>
        </div>
      </div>
    );
  }
}

export default App;
