import { Modal } from 'antd';

/**
 * WebSocket 实例生成类
 * 
 * @param {any} WebSocket 连接地址
 * @param {any} 用户自定义配置
 * @returns WebSocket 实例
 */
function websocket (url, s) {
    let _settings = {
        open: () => {},
        close: () => {},
        message: () => {}
    }
    let evtObj = {};
    if( !window.WebSocket ) {
        // 如果当前浏览器不支持 WebSocket, 则跳转至 Chrome 下载页
        Modal.info({
            title: '您的浏览器不能很好的体验我们的功能哦！',
            content: '点击确定下载 Chrome',
            okText: '确定',
            onOk() {
                location.href =  "http://rj.baidu.com/soft/detail/14744.html";
            },
        });
        return false;
    } else {
        let ws = new WebSocket( url );
        Object.assign( _settings, s );
        ws._send = ws.send;
        ws.send = () => { 
            console.log('WebSocket not ready...'); 
            return false;
        };
        ws.onopen = evt => {
            _settings.open(evt);
            // WebSocket 连接建立成功后，将 send 方法重新赋给 ws 实例
            ws.send = (obj) => {
                ws._send( JSON.stringify(obj) );
            }
        };
        ws.onclose = _settings.close;
        ws.onmessage = evt => {
            let msg = JSON.parse( evt.data );
            let events = evtObj[ msg.model ] || [];

            // 如果是系统级错误，直接处理，不进行后续操作
            if( msg.model == 'system' ) {
                Modal.error({
                    title: '提示',
                    content: msg.msg,
                });
                return false;
            }

            events.forEach( event => {
                event(msg);
            } );
        };

        ws.listen = (type, fn) => {
            if ( !evtObj[ type ] ) {
                evtObj[ type ] = [ fn ];
            } else {
                evtObj[ type ].push( fn );
            }
        };

        // 页面卸载前关闭 WebSocket 连接
        window.addEventListener('unload',  () => { 
            ws.send('bye'); 
            ws.close(); 
            ws = null; 
        } );

        return ws;
    }
}

export default websocket;