/**
 * Created by wython on 2017/5/6.
 */

import React from 'react';
import './travelTip.css';
import {Icon} from 'antd';
import {Link} from 'react-router';

export default class Tips extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        defaultFace: require('assets/default.png')
    };
    render() {
        console.log('this',this.props.item);
        const url = "/tips/t/" + this.props.item.task.tid;
        return (
            <section className="travel-tip">
                <div className="tips-user_box">
                    <img src={this.props.item.user.headPic || this.state.defaultFace}/>
                    <span>{this.props.item.user.username}</span>
                    <time>{this.props.item.task.createdAt}</time>
                </div>
                <article>
                    <h3 className="travel-tips_title">
                        <Link to={url}>{ this.props.item.task.title }</Link>
                    </h3>
                    <p className="travel-tips_sum" dangerouslySetInnerHTML={{__html: this.props.item.task.content}}>
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
