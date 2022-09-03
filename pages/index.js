import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';

export default function Home() {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async () =>{
      const postsData = await DataStore.query(Post);
      console.log(postsData)
      setPosts(postsData)
    }
    DataStore.observe(Post).subscribe(()=> {
      fetchPosts()
    });
    fetchPosts()
  }, [])

  return (
    <div className={styles.container}>
      <h1>ola</h1>
      {
        posts.map(post=>{
          return(
            <Link key={post.id} href={`/posts/${post.id}`}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
            )
        })
      }
    </div>
  )
}
