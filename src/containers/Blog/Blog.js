import React, { Component } from 'react';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import axios from 'axios';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
import classes from './Blog.module.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {


    render () {
        return (
            <div>
                <header>
                    <ul className={classes.NavLinks}>
                        <li><NavLink to="/" exact activeClassName={classes.active}>Home</NavLink></li>
                        <li><NavLink to={{
                            pathname: '/new-post',
                            hash: '#submit',
                            search: '?quick-submit=true'
                        }}>New Post</NavLink></li>
                    </ul>
                </header>
                <Switch>
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;