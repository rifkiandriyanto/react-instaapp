import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../components/firebase';
import firebase from 'firebase';
import { useStateValue } from '../components/StateProvider';
import '../style/SinglePost.css';

export default function SinglePost() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likedPosts, setlikedPosts] = useState([]);
  const [post, setPost] = useState({});
  const [{ user }] = useStateValue();
  const icon = document.getElementById(id);

  useEffect(() => {
    document.title = `${post?.username + ' ' + post?.caption} | instaapp`;
  }, [post?.caption, post?.username]);

  useEffect(() => {
    if (id) {
      db.collection('posts')
        .doc(id)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      db.collection('posts')
        .doc(id)
        .get()
        .then((doc) => {
          setPost(doc.data());
        });
    }
  }, [id]);

  useEffect(() => {
    if (id && user) {
      db.collection('users')
        .doc(user.email)
        .collection('likes')
        .onSnapshot((snapshot) => {
          setlikedPosts(snapshot.docs.map((doc) => doc.id));
        });

      if (likedPosts.indexOf(id) >= 0) {
        icon.classList.add('fas');
      }
    }
  }, [id, likedPosts.length, icon, user]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection('posts')
      .doc(id)
      .collection('comments')
      .add({
        text: comment,
        username: user.displayName || user.email.split('@')[0],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setComment('');
  };

  const changeHeart = () => {
    if (id && user) {
      icon.classList.toggle('fas');

      if (icon.classList.contains('fas')) {
        db.collection('users').doc(user.email).collection('likes').doc(id).set({
          post: id,
        });
      } else {
        db.collection('users')
          .doc(user.email)
          .collection('likes')
          .doc(id)
          .delete()
          .then(function () {
            console.log('Unliked Photo!');
          })
          .catch(function (error) {
            console.error('Error unliking: ', error);
          });
      }
    }
  };

  return (
    post && (
      <div className='singlePostContainer'>
        <div className='singlePost'>
          <img className='singlePostImage' src={post.imageUrl} alt={id} />

          <div className='singlePostRight'>
            <div className='postHeader'>
              <img
                className='avatar'
                src={post.avatar}
                alt={post.username}
                title={post.username}
              />
              <Link className='commentLink' to={`/profile/${post.email}`}>
                <h3 className='postUsername'>{post.username}</h3>
              </Link>
            </div>
            <div className='postComments singlePostComments'>
              {post.caption && (
                <p className='postCaption'>
                  <strong>
                    <Link className='commentLink' to={`/profile/${post.email}`}>
                      {post.username}
                    </Link>
                  </strong>{' '}
                  {post.caption}
                </p>
              )}
              {comments.map((comment, i) => (
                <p key={i} className='postCaption'>
                  <strong>
                    <Link className='commentLink' to={`/profile/${post.email}`}>
                      {comment.username}
                    </Link>
                  </strong>{' '}
                  {comment.text}
                </p>
              ))}
            </div>
            <div className='postInteractionBar singlePostInteractionBar'>
              <i
                onClick={changeHeart}
                id={id}
                className='far fa-heart postInteractionItem postHeart'
              ></i>
              <i className='far fa-comment postInteractionItem'></i>
            </div>
            {user ? (
              <form className='postCommentsInput'>
                <input
                  className='postComment'
                  type='text'
                  placeholder='Add a comment...'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className='postCommentButton'
                  type='submit'
                  disabled={!comment}
                  onClick={postComment}
                >
                  {' '}
                  Post{' '}
                </button>
              </form>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  );
}

