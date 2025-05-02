import { ReactNode } from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Authentication | pseudoEngineer',
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-auth-pattern bg-cover bg-center bg-no-repeat flex items-center justify-center font-sans antialiased">
      {children}
    </main>
  );
};

export default AuthLayout;
