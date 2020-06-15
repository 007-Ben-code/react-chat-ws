import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import NotFound from './components/Share/notFound/notFound'
import Chat from './components/Chat/chat'

class Router extends Component{
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/chat" component={Chat} /> 
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;