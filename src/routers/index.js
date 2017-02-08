import App from '../js/container/App'
import Tips from '../js/component/tips'
import Asks from '../js/component/asks'
import Index from '../js/component/index'

export default {
    path:'/',
    component: App,
    indexRoute:{component:Index},
    childRoutes:[
        {
            path:'tips',
            component:Tips
        },
        {
            path:'asks',
            component:Asks
        }
    ]
}