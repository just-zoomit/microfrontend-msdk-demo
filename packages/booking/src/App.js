import React from "react";
import {Switch, Route, Router} from 'react-router-dom'


import { UserProvider } from './components/useAuth';

import Home from './components/pages/Home';
import AppointmentPage from './components/pages/AppointmentPage';
import AppointmentForm from './components/pages/homePagesComponents/AppointmentForm';



import { 
    StylesProvider , 
    createGenerateClassName,
} from '@material-ui/core/styles'



// Add prefix to css className to aviod collsion 
const generateClassName = createGenerateClassName({
    productionPrefix: 'ma',
})

export default ({history}) => {
    return <div>
         <StylesProvider generateClassName={generateClassName}>
            <Router  history= {history}>
                <Switch>
                
                     <UserProvider>
                     <Route exact path="/" component={Home} />;
                     <Route  path="/create-appointment" component={AppointmentPage} />;
                     <Route  path="/appointment-form" component={AppointmentForm} />;
                     </UserProvider>
                   
                </Switch>
            </Router>
         </StylesProvider>
    </div>
}

