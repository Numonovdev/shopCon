import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../axios';

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    const data = {
      identifier: emailRef.current.value,
      password: passwordRef.current.value,
    };

    http
      .post('auth/local', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem('token', JSON.stringify(response.data.jwt));
          navigate('/');
        }
      })
      .catch((error) => {
        setError('Invalid email or password. Please try again.');
        console.error(error);
      });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-neutral">
      <div className="card w-96 bg-black shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="text-neutral">
          <div className="form-control mb-4">
            <label className="label">
              <span>Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              ref={emailRef}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span>Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              ref={passwordRef}
            />
          </div>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mb-2">
            LOGIN
          </button>

          <button className="btn btn-secondary w-full mb-4">GUEST USER</button>

          <p className="text-center">
            Not a member yet? <Link to="/register" className="link link-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
