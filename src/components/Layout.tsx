import { Sidebar } from "components/Sidebar";
import { MobileNavigation } from "components/MobileNavigation";
import { Footer } from "components/Footer";

type Props = {
  children?: React.ReactNode;
  pageTitle?: string;
};

export const Layout = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <MobileNavigation />

      <main
        className={`md:ml-80 p-4 mt-12 w-full container mx-auto max-w-4xl flex-1 pb-12`}
      >
        <div className="p-2 text-center bg-slate-700 rounded-lg wiggles text-white m-4 mb-16">
          We are returning to LaunchPad Huntington in June 2022! 🎉
        </div>
        {props.pageTitle && <h1 className="page-title">{props.pageTitle}</h1>}

        {props.children}
      </main>
      <div className="md:hidden my-8 md:my-0">
        <Footer />
      </div>
    </div>
  );
};
