/**
 * Created by wython on 2017/5/29.
 */
export default {
    getHotelType(val) {
        const obj = {
            long: '长住型',
            travel: '度假型',
            car: '汽车型',
            center: '市中心区酒店',
            plane: '机场酒店',
            business: '商务酒店'
        };
        return obj[val];
    }
}