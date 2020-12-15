import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
// import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import '../style/Profile.css';
import { useStateValue } from '../components/StateProvider';
import Post from './Post';

export default function Profile() {
  const { userid } = useParams();
  const [posts, setPosts] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    document.title = `${posts[0]?.post.username} | instaapp`;
  }, [posts[0]?.post.username]);

  useEffect(() => {
    if (userid && userid) {
      db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs
              .filter((doc) => (doc.data().email === userid) === true)
              .map((doc) => ({
                id: doc.id,
                post: doc.data(),
              }))
          );
        });
    }
  }, [userid]);

  return (
    <div>
      <div className='profileContainer'>
        <img
          className='profileAvatar'
          src={posts[0]?.post.avatar}
          alt='avatar'
        />
        <h2 className='profileName'>{posts[0]?.post.username}</h2>
      </div>

      <div className='posts'>
        {posts.map(({ id, post }) => (
          <Post key={id} postId={id} user={user} post={post} />
        ))}
      </div>
    </div>
  );
}
