import SectionContainer from '@components/SectionContainer';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionContainer>{children}</SectionContainer>;
}
