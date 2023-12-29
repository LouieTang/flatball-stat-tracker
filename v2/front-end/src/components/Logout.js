import React from "react";

const Logout = ({logout}) => {
    return (
        <button type="button" className="btn__right" onClick={logout}>Logout</button>
    );
};

export default Logout;