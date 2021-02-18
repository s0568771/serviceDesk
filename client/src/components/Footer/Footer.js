import './Footer.css';
import React, { Component } from 'react';

class Footer extends Component{
    constructor() {
        super();
    }

    render(){
        return(
            <div>
                <a href="/footer">
                    <h3 className="center" style={{margin:0}}>MenuPanel</h3>
                </a>
            </div>
        )
    }
}

export default Footer;