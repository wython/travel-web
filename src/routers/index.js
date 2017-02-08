import App from '../js/container/App'
import Index from '../js/component/index'
import Asks from './routes/asks'
import Tips from './routes/tips'

export default {
    path:'/',
    component: App,
    indexRoute:{component:Index},
    childRoutes:[
        Asks,
        Tips
    ]
}