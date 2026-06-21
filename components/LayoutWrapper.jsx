import SectionContainer from './SectionContainer';
import Footer from './Footer';
import Header from './Header';

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex h-screen flex-col justify-between pt-24 md:pt-32">
        <main className="mb-auto">{children}</main>
        <SectionContainer>
          <Footer />
        </SectionContainer>
      </div>
    </>
  );
};

export default LayoutWrapper;
