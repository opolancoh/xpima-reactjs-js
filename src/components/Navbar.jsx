import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">XPIMA</h5>
      <nav className="my-2 my-md-0 mr-md-3">        
        <NavLink className="p-2 text-dark" to="/expense-categories">
          Expense Categories
        </NavLink>
      </nav>
      <Link className="btn btn-outline-primary" to="/">
        Sign up
      </Link>
    </div>
  );
};

/*
<Link className="p-2 text-dark" to="/">
          Income
        </Link>
        <NavLink className="p-2 text-dark" to="/">
          Income Categories
        </NavLink>
        <NavLink className="p-2 text-dark" to="/expenses">
          Expenses
        </NavLink>
*/

export default Navbar;
