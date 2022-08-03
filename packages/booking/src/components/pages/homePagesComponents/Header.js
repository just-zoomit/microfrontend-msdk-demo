import React from 'react';

import HeaderBottom from './HeaderBottom';

const Header = (props) => {  
  return (
    <section className="main-home">
      <div className="container">
        <header>
          <HeaderBottom  {...props} />
        </header>
      </div>
    </section>
  );
};

export default Header;