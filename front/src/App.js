import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import News from "./containers/News/News";
import PostNews from "./containers/PostNews/PostNews";

class App extends Component {
  render() {
    return (
        <Fragment>
          <header>
            <Navbar/>
          </header>
          <Switch>
            <Route path="/" exact component={News} />
            <Route path="/postNews" exact component={PostNews} />
          </Switch>
        </Fragment>
    );
  }
}

export default App;