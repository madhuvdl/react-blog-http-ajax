import React, { Component } from 'react';

// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        axios.get('/posts')
            .then(respose => {
                const posts = respose.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'madhu'
                    }
                })
                this.setState({posts: updatedPosts})
                // console.log(res)
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    selectPostHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                 key={post.id}
                 title={post.title}
                 clicked={() => this.selectPostHandler(post.id)}
                 author={post.author} />
            })
        }
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;