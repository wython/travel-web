export default {
    path:'tips',
    getComponent(nextState,cb) {
        require.ensure([],(require)=>{
            cb(null,require('../../../js/component/tips'))
        })
    }
}