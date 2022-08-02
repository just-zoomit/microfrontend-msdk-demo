import {mount} from 'auth/AuthApp';
import React, {useRef, useEffect} from 'react'

import {useHistory} from 'react-router-dom'

console.log("Mounted App element",mount)


export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(()=> {
       const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,

            onNavigate: ({pathname: nextPathname},  location) => {
                
                // The current path location
                const pathname = history.location;
                console.log("Memory object Pathname: ", nextPathname)

                if (pathname !==nextPathname){
                    history.push(nextPathname)
                }

                console.log("Memory object captured history: ", location)
                console.log('The Container noticed navigation in Marketing App')
            },
            onSignIn: () => {
                onSignIn();
                console.log('User Signed in ! ')

            },
        });
        //
        history.listen(onParentNavigate)
        console.log("Memory object onParentNavigate: ", onParentNavigate)
    // Only run one time,add empty array
    }, []);

    return <div ref={ref} />;
};