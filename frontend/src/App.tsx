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
import AuthProvider from './utils/authProvider';

const App = () => (
    <Router>
        <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss pauseOnHover />
        <AuthProvider>
            <Topbar />

            <Switch>
                <Route path="/" exact>
                    <ErrorBoundary>
                        <Home />
                    </ErrorBoundary>
                </Route>
                <Route path="/create">
                    <ErrorBoundary>
                        <CreateBuild />
                    </ErrorBoundary>
                </Route>
                <Route path="/about">
                    <ErrorBoundary>
                        <About />
                    </ErrorBoundary>
                </Route>
                <Route path="/error">
                    <ErrorFallback error={{ stack: 'Backend Auth Failure' }} />
                </Route>
            </Switch>
        </AuthProvider>
    </Router>
);

export default App;
