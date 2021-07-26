import 'bootswatch/dist/slate/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bootswatchOverrides.css'; //must be after!
import ErrorBoundary, { ErrorFallback } from './components/error-boundary';
import Topbar from './components/topbar';
import About from './pages/about';
import CreateBuild from './pages/create-build';
import Home from './pages/home';
import SearchBuild from './pages/search-build';
import ViewBuild from './pages/view-build';
import AuthProvider from './utils/authProvider';
import PrivateRoute from './utils/privateRoute';

const App = () => {
    return (
        <Router>
            <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss pauseOnHover />
            <AuthProvider>
                <Topbar />

                <ErrorBoundary>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route exact path="/builds">
                            <SearchBuild />
                        </Route>
                        <Route path="/builds/:buildId">
                            <ViewBuild />
                        </Route>
                        <PrivateRoute path="/create">
                            <CreateBuild />
                        </PrivateRoute>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/error">
                            <ErrorFallback error={{ stack: 'Backend Auth Failure' }} />
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </AuthProvider>
        </Router>
    );
};

export default App;
