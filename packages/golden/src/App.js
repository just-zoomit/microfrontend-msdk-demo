import React from "react";
import {Switch, Route, Router} from 'react-router-dom'

import { 
    StylesProvider , 
    createGenerateClassName,
} from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

// Add prefix to css className to aviod collsion 
const generateClassName = createGenerateClassName({
    productionPrefix: 'go',
})

export default ({history}) => {
    return <div>
         <StylesProvider generateClassName={generateClassName}>
            <Router  history= {history}>
                <Switch>
                {/* Replace routes */}
                    <Route exact path= "/pricing" component={Pricing} />
                    <Route path= "/" component={Landing} />
                </Switch>
            </Router>
         </StylesProvider>
    </div>
}