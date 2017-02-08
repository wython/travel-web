export default {
    path:'asks',
    getComponent(nextState,cb) {
        require.ensure([],(require)=>{
            cb(null,require('../../../js/component/asks'))
        })
    }
}