import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import News from "./containers/News/News";
import PostNews from "./containers/PostNews/PostNews";
import SelectedNews from "./containers/SelectedNews/SelectedNews";

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
            <Route path="/news/:id" exact component={SelectedNews} />
          </Switch>
        </Fragment>
    );
  }
}

export default App;