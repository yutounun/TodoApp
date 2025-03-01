const Header = () => {
  return (
    <div className="flex items-center justify-between bg-primary w-full h-16 px-16">
      <nav>
        <ul className="flex items-center gap-4 text-neutral-200">
          <li className="hover:text-neutral-100 transition-colors">
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
