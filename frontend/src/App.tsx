import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CreateBuild from './pages/create-build';
import Home from './pages/home';

const App = () => {
    return (
        <Router>
            <header className="App-header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create">Create</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/create">
                    <CreateBuild />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
