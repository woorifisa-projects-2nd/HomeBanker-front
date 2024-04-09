import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function index() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => setPosts(response.data))
    })
  return (
    <ul>
        {posts.map(post => {
            <li key={post.id}>{post.title}</li>
        })}
        {/* {posts.length} */}
    </ul>
  )
}
