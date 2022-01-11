import React from 'react';
import {SERVER_URL} from "../../../../utils/constants";

const PayPalRedirect = () => {
    window.location = SERVER_URL+window.location.pathname+window.location.search
    return (
        <div>

        </div>
    );
};

export default PayPalRedirect;
