/**
 * Created by wython on 2017/6/9.
 */
import React from 'react';
import Item from './item';
import './commentBox.css';

export default class CommentBox extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.comments.map((item, index) => {
                        return (
                            <Item tid={this.props.tid} key={index} item={item}/>
                        )
                    })
                }
            </div>
        )
    }
}