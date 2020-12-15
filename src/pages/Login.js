import React, { useEffect, useState } from 'react';
import '../style/Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth, provider } from '../components/firebase';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = `Login | instaapp`;
  }, []);

  // const signIn = () => {
  //   auth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       history.push('/');
  //     })
  //     .catch((error) => {
  //       // alert(error.message);
  //     });
  // };

  const signInEmail = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };

  // const register = (e) => {
  //   e.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       if (auth) {
  //         history.push('/');
  //       }
  //     })
  //     .catch((error) => alert(error.message));
  // };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <Link to='/' className='link'>
          <h1 className='loginLogo'>instaapp</h1>
        </Link>
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='submit'
            onClick={signInEmail}
            className='loginSignInButton'
          >
            Sign In
          </button>
        </form>

        {/* <button className='loginRegisterButton' onClick={register}>
          Create your instaapp Account
        </button> */}

        <br />
        {/* <h5>OR</h5>
        <button onClick={signIn} className='loginSignInButtonGoogle'>
          <i className='fab fa-google'></i> Sign In with Google
        </button> */}

        <p>
          Disclaimer: This is a fake social media platform called instaapp. If
          you want to try this app without using your personal information use
          email: <b>demotest@gmail.com</b> and <b>demotest</b> as password.
        </p>
      </div>
    </div>
  );
}

