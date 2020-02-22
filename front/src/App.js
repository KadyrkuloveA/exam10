import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import News from "./containers/News/News";

class App extends Component {
  render() {
    return (
        <Fragment>
          <header>
            <Navbar/>
          </header>
          <Switch>
            <Route path="/" exact component={News} />
          </Switch>
        </Fragment>
    );
  }
}

export default App;