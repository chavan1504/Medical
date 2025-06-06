import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../utils/auth';

const EmailVerification = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await auth.verifyEmail(token);
        setStatus('success');
        setMessage(response.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.message);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="verification-container">
      <div className="verification-card">
        {status === 'verifying' && (
          <div>
            <h2>Verifying your email...</h2>
            <div className="spinner"></div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="success">
            <h2>✅ Email Verified!</h2>
            <p>{message}</p>
            <button onClick={() => window.location.href = '/signin'}>
              Go to Sign In
            </button>
          </div>
        )}
        
        {status === 'error' && (
          <div className="error">
            <h2>❌ Verification Failed</h2>
            <p>{message}</p>
            <button onClick={() => window.location.href = '/signin'}>
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;