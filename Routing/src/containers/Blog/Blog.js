import React, { Component, Suspense, lazy } from 'react';
// import axios from 'axios';
import { Route, NavLink, withRouter, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from "../../hoc/asyncComponent";

// Lazy loading in React 16.6
//  const AsyncNewPost = React.lazy ( () => import('./NewPost/NewPost') )

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
} )

class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        console.log(this.props)
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li> */}
                            <li><NavLink 
                                    to='/posts' 
                                    activeClassName='active'
                                    exact
                                    >Posts</NavLink></li>
                            <li><NavLink 
                                activeClassName='my-active'
                                activeStyle={{
                                    textDecoration: 'underline',
                                    color: "orange"
                                }}
                                to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }} >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                <Switch>
                    {/* { this.state.auth ? <Route path="/new-post" render = { () => <Suspense fallback={<div>Loading...</div>} ><AsyncNewPost /></Suspense> } /> : null } */}
                    { this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }
                    <Route path="/posts" component={Posts} />
                    <Route render={ () => <h1>Not Found</h1> } />
                    {/* <Redirect from='/' to='/posts' /> */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Blog);