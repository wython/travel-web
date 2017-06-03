/**
 * Created by wython on 2017/5/28.
 */

import React from 'react';
import AdminHotelTable from 'layouts/AdminHotelTable';

class AdminHotelPage extends  React.Component{
    render() {
        return (
            <div className="admin-travel-page-wrapper">
                { this.props.children ? this.props.children : <AdminHotelTable/> }
            </div>
        )
    }
}

module.exports = AdminHotelPage;