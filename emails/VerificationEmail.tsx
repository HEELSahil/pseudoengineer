import * as React from 'react';

type VerificationEmailProps = {
  verificationLink: string;
};

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  verificationLink,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: 1.6,
        color: '#333333',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        <img
          src="https://assets.pseudoengineer.dev/logo-b.png"
          alt="pseudoEngineer Logo"
          style={{
            height: '64px',
            width: '256px',
            objectFit: 'cover',
            margin: '0 auto',
          }}
        />
      </div>

      <div
        style={{
          background: '#f9fafb',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h2
          style={{
            color: '#38b6ff',
            marginTop: '0',
            fontWeight: '600',
            fontSize: '20px',
          }}
        >
          Verify your email address
        </h2>

        <p style={{ marginBottom: '25px' }}>
          Thanks for starting the account creation process. To ensure it's
          really you, we need to verify your email address.
        </p>

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={verificationLink}
            style={{
              backgroundColor: '#38b6ff',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '12px 24px',
              borderRadius: '25px',
              display: 'inline-block',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Verify Email Address
          </a>
        </div>

        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          If the button doesn't work, you can copy and paste this link into your
          browser:
        </p>
        <p
          style={{
            fontSize: '14px',
            wordBreak: 'break-all',
            color: '#4b5563',
            padding: '10px',
            background: '#f3f4f6',
            borderRadius: '4px',
          }}
        >
          {verificationLink}
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          If you did not attempt to create an account with pseudoEngineer,
          please disregard this email.
        </p>
        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#9ca3af',
            fontSize: '14px',
          }}
        >
          © {new Date().getFullYear()} pseudoEngineer. All rights reserved.
        </p>
      </div>
    </div>
  );
};
