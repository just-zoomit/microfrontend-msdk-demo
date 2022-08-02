import {mount} from 'dashboard/DashboardApp';
import React, {useRef, useEffect} from 'react'



console.log("Mounted App element",mount)


export default () => {
    const ref = useRef(null);
    

    useEffect(()=> {
        mount(ref.current);
    
    // Only run one time,add empty array
    }, []);

    return <div ref={ref} />;
};