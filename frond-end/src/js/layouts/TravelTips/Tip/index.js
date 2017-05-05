/**
 * Created by wython on 2017/5/6.
 */

import React from 'react';
import './travelTip.css';
import {Icon} from 'antd';

export default class Tips extends React.Component{
    render() {
        return (
            <section className="travel-tip">
                <div className="tips-user_box">
                    <img src="http://upload.jianshu.io/users/upload_avatars/3534836/562ce574f3b6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96"/>
                    <span>wython</span>
                    <time>前天 07:54</time>
                </div>
                <article>
                    <h3 className="travel-tips_title">
                        北海一日游记
                    </h3>
                    <p className="travel-tips_sum">
                        鬼知道余晓晓的父母当初怎么想的，会给她起了这样一个名字，都说人如其名，
                        结果果然应验，余晓晓长大以后，不但个子不高，就连胸也那么小不但个子不高，就连胸也那么小
                        不但个子不高，就连胸也那么小。 闺蜜说她，
                        如果在马路上遇到了流氓，都不用喊...
                    </p>
                    <div className="travel-tips_article_mess">
                        <span className="travel-tips_destination">
                            <Icon type="eye" />
                            3407
                        </span>
                        <span>
                            <Icon type="heart" />
                            140
                        </span>
                    </div>
                </article>
            </section>
        )
    }
}
