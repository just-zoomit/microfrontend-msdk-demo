import React, {lazy, Suspense, useState, useEffect} from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import { 
    StylesProvider , 
    createGenerateClassName,
} from '@material-ui/core/styles'

import {createBrowserHistory} from 'history';


// import AuthApp  from './components/AuthApp'; 
import Header from './components/Header';
import Progress from './components/Progress';

const BookingLazy = lazy(() => import('./components/BookingApp'))
const MarketingLazy = lazy(() => import('./components/MsdkApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const MsdkLazy = lazy(() => import('./components/MsdkApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

console.log("Marketing App ", MarketingLazy)
console.log("MsdkLazy  App ", MsdkLazy )
console.log("BookingLazy App ", BookingLazy)
console.log("Global Header App ", Header)

// Add prefix to css className to aviod collsion 
const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
})

const history = createBrowserHistory();
export default () => {
    const [isSignedIn,setIsSignedIn] = useState(false);

    useEffect(()=> {
        if(isSignedIn){
            history.push('/dashboard');
        }

    }, [isSignedIn]);

    return (
    <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
        <div>
    
            <Header onSignOut= {() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>

          
            <Suspense fallback={ <Progress/> }  >
            <Switch>
                
                <Route path="/auth" >
                <AuthLazy onSignIn={ () => setIsSignedIn(true) }/>
                </Route>

                <Route path="/dashboard" >
                {!isSignedIn && <Redirect to="/" />}    
                <DashboardLazy/>
                </Route>

                <Route path="/msdk" component={MarketingLazy}/>

            

                <Route path="/" component={BookingLazy}/>
               
            </Switch>

            </Suspense>
           
        </div>
        </StylesProvider>
    </Router>
    );
};
