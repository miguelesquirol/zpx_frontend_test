import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import classes from './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import GameDetails from './components/GameDetails/GameDetails';



const routing = (
          <Router>
            <div>
                      <div className={classes.Tobar}>
                          <Link to="/" className={classes.Logo} >
                                Dashboard
                          </Link>
                      </div>

                  <Switch>
                      <Route path="/" component={App} exact />
                      <Route path="/Games/:id" component={GameDetails} />
                  </Switch>
            </div>
          </Router>

)

ReactDOM.render(routing, document.getElementById('root'));
