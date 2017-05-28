/**
 * Created by wython on 2017/5/19.
 */
import React from 'react';
import AdminNav from 'layouts/AdminNav';

class AdminAppPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <AdminNav>
                { this.props.children }
            </AdminNav>
        )
    }
}

module.exports = AdminAppPage;
