import AuthForm from '@/components/AuthForm';

const SignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  const { error } = await searchParams;
  return <AuthForm type="sign-in" authError={error} />;
};

export default SignInPage;
