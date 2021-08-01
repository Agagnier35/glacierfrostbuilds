import 'bootswatch/dist/slate/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buildDefaultBuild } from './api/model/build';
import './bootswatchOverrides.css'; //must be after!
import EditBuild from './components/edit-build';
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
            <GoogleReCaptchaProvider reCaptchaKey="6LdJpMsbAAAAAJrK8zVDbQnjqOkImKwbaSHmrHE5">
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
                            <Route exact path="/builds/:buildId">
                                <ViewBuild />
                            </Route>
                            <PrivateRoute path="/builds/edit/:buildId">
                                <EditBuild />
                            </PrivateRoute>
                            <Route path="/create">
                                <CreateBuild initialBuild={buildDefaultBuild()} />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/error">
                                <ErrorFallback error={{ stack: 'Backend Auth Failure' }} />
                            </Route>
                        </Switch>
                    </ErrorBoundary>
                </AuthProvider>
            </GoogleReCaptchaProvider>
        </Router>
    );
};

export default App;
