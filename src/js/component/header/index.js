import React from 'react'
import {Link} from 'react-router'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Link to="tips">tips</Link>
                <Link to="asks">asks</Link>
            </header>
        )
    }
}