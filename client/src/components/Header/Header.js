import './Header.css';
import React, { Component } from 'react';

class Header extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <a href="/header">
                    <h3 className="center" style={{margin:0}}>Appeteria</h3>
                </a>
            </div>
        )
    }
}

export default Header;