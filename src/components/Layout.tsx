import { Sidebar } from "components/Sidebar";
import { MobileNavigation } from "components/MobileNavigation";
import { Footer } from "components/Footer";

type Props = {
  children?: React.ReactNode;
  pageTitle?: string;
  className?: string;
};

export const Layout = (props: Props) => {
  const { className = "", pageTitle, children } = props;
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <MobileNavigation />

      <main
        className={`md:ml-80 py-4 px-4 md:px-12 mt-12 w-full container mx-auto max-w-4xl flex-1 pb-12`}
      >
        {pageTitle && <h1 className="page-title">{pageTitle}</h1>}

        {children}
      </main>
      <div className="md:hidden my-8 md:my-0">
        <Footer />
      </div>
    </div>
  );
};
