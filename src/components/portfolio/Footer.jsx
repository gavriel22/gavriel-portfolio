export function Footer({ name }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="px-6 md:px-8 py-10 max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/5 dark:border-white/5">
      <span className="font-serif text-base tracking-tight text-customText-light dark:text-customText-dark font-medium">
        {name}
      </span>
      <span className="text-xs text-customText-subLight dark:text-customText-subDark">
        © {currentYear} · Dibangun dengan ❤️ dan banyak ☕
      </span>
    </footer>
  );
}

export default Footer;
