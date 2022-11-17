import siteMetadata from '../data/siteMetadata'
import headerNavLinks from '../data/headerNavLinks'
import Link from 'next/link'
import SectionContainer from './sectioncontainer'
import Footer from './footer'
import ThemeSwitch from './themeswitch'
import MobileNav from './mobilenav'


const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-8">
          <div>
            <Link href="/" aria-label={siteMetadata.initial}>
              <div className="flex items-center justify-between">
                <div className="mr-3 bg-image-one dark:bg-image-two h-16 w-64 bg-cover">
                  {/* <img className='h-20 w-80 logo-switch' src="https://heelsahil.com/logo-w.png" width='50' height='100' alt=''></img> */}
                </div>
                {/* {typeof siteMetadata.initial === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.initial}
                  </div>
                ) : (
                  siteMetadata.initial
                )} */}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
