import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, withRouter,Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost'

class Blog extends Component {
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
                                    to='/' 
                                    activeClassName='active'
                                    exact
                                    >Home</NavLink></li>
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
                <Route path="/" exact component={Posts} />
                <Switch>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Blog);