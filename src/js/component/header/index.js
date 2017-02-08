import React from 'react'
import './header.css'
import Nav from '../nav'

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="header-content">
                    <span>
                    您好,欢迎使用WY旅游网
                </span>
                    <section>
                        <h1>WY旅游</h1>
                        <div className="login-box">
                            用户:xxx
                        </div>
                    </section>
                    <Nav/>
                </div>
            </header>
        )
    }
}