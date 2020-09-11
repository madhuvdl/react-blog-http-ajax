import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import axios from '../../../axios';
import classes from './Posts.module.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount () {
        console.log( this.props );
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice( 0, 4 );
                const updatedPosts = posts.map( post => {
                    return {
                        ...post,
                        author: 'Madhu'
                    }
                } );
                this.setState( { posts: updatedPosts } );
                // console.log( response );
            } )
            .catch( error => {
                console.log( error );
                // this.setState({error: true});
            } );
    }

    selectPostHandler = (id) => {
        // this.props.history.push({pathname: '/posts/'+ id});
        this.props.history.push( '/posts/' + id );
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        clicked={() => this.selectPostHandler(post.id)}
                        author={post.author} />
                 )
            })
        }

        return(
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <Route path="/posts/:id" component={FullPost} />
            </div>
        )
    }
}

export default Posts;