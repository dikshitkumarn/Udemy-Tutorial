import React, { Component } from 'react';
import axios from '../../axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedId:null,
        error:false
    }

    componentDidMount () {
        axios.get('/posts')
        .then(res => {
            const posts = res.data.slice(0,4)
            const updatedposts = posts.map(
                post => {
                    return {
                        ...post,
                        author:'Dikshit'
                    }
                }
            )
            this.setState({posts: updatedposts})
            // console.log(res)
        })
        .catch(error => {
            this.setState({error:true})
            // console.log(error)
        })
    }

    postSelected= id => {
        this.setState({selectedId:id})
    }

    render () {
        let posts = <p>Somethig Went Wrong</p>
        if(!this.state.error){
            posts = this.state.posts.map(
                post => {
                    return <Post key={post.id} title={post.title} Author={post.author} clicked={() => this.postSelected(post.id)} />
                }
            )
        }
        return (
            <div>
                <header className="Blog" >
                    <nav>
                        <ul>
                            <li><a href="/" >Home</a></li>
                            <li><a href="/posts" >Posts</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Blog">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;