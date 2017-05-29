/**
 * Created by wython on 2017/5/28.
 */

import React from 'react';
import AdminTravelTable from 'layouts/AdminTravelTable';

class AdminTravelPage extends  React.Component{
    render() {
        return (
            <div className="admin-travel-page-wrapper">
                { this.props.children ? this.props.children : <AdminTravelTable/> }
            </div>
        )
    }
}

module.exports = AdminTravelPage;