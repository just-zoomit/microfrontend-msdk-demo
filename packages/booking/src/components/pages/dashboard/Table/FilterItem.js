import React from 'react';


const FilterItem = ({ indx, item }) => {


  

  return (

    
    <tr className="border-0">
       <td className="text-left">{item.name}</td>
       <td>{item.time.split('-')[0]}</td>
      
      <td>
        {/* Add logic to append link to button if meeting is active */}
        <div id="meetingSDKElement"></div>
        
        <button className="btn tableBtn"  > {item.isSuccess ? 'Pending'  :  'Approve'}</button>
      </td>
      
    </tr>
  );
};

export default FilterItem;