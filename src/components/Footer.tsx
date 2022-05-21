export const Footer = () => {
  return (
    <footer className="p-4 w-full flex items-center justify-center">
      <p className="inline  px-6 rounded-lg p-2 bg-gray-500/10 text-sm">
        © {new Date().getFullYear()} Long Island JavaScript
      </p>
    </footer>
  );
};
