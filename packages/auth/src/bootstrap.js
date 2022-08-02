import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import {createMemoryHistory, createBrowserHistory} from 'history'

//Mount function to start up the App
const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath}) => {

    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if(onNavigate){
        // Pass history from container 
        history.listen(onNavigate);
    }
    
    ReactDOM.render(<App onSignIn = {onSignIn} history= {history} />,el );

    return {
        onParentNavigate({pathname:nextPathname},location){
            const {pathname} = history.location;

            
            console.log('Conatiner History object: ', location)
            console.log('Conatiner Just Navigated')

            if (pathname !== nextPathname){
                console.log('Conatiner History object, nextPathname: ', nextPathname)
                history.push(nextPathname);
            }
            
        }

    };
};

/*
* If we are in development and in isolation, 
* call mount immediately
*/
if (process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot){
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }

}


/*
* We are running through container 
* and we should export the mount function
*/
export {mount}