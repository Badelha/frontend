import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { title: 'من نحن', path: '/about' },
    { title: 'السوق', path: '#market' },
    { title: 'كيف تعمل المنصة', path: '/how-it-works' },
    { title: 'الأسئلة الشائعة', path: '/faq' },
  ];

  const supportLinks = [
    { title: 'مركز المساعدة', path: '/help' },
    { title: 'قوانين المنصة', path: '/terms' },
    { title: 'الإبلاغ عن مشكلة', path: '/report' },
    { title: 'سياسة الخصوصية', path: '/privacy' },
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/',
      hover: 'hover:bg-[#25D366] hover:border-[#25D366]',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.2A8.4 8.4 0 1 1 21 11.5Z" />

          <path d="M8.5 8.5c.5 2.5 2.5 4.5 5 5l1.2-1.2 2 1c-.2 1.5-1.5 2.5-3 2.2-3.5-.8-6.2-3.5-7-7-.3-1.5.7-2.8 2.2-3l1 2-1.4 1Z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/',
      hover: 'hover:bg-[#C13584] hover:border-[#C13584]',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/',
      hover: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5V10H7v3h2.9v8h3.6Z" />
        </svg>
      ),
    },
  ];

  const appButtonClass =
    'group flex min-h-11 items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 hover:shadow-md';

  return (
    <footer dir="rtl" className="w-full bg-gradient-to-r from-[#3A73AA] to-[#4F9D9E] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1480px] px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            {/* Logo */}
            <Link to="/" className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white shadow-sm transition-all duration-300 hover:rotate-6 hover:bg-white/25">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M7 7h11l-3-3" />
                  <path d="M18 7l-3 3" />
                  <path d="M17 17H6l3 3" />
                  <path d="M6 17l3-3" />
                </svg>
              </span>

              <span className="text-3xl font-bold text-white">بدّلها</span>
            </Link>

            {/* Description */}
            <p className="max-w-sm text-sm leading-7 text-white/85">
              أول منصة فلسطينية للتبادل والبيع.
              <br />
              اتصنعت بايد أهل غزة لأهل غزة، عشان
              <br className="hidden xl:block" />
              نوصل احتياجاتنا لبعض بأسرع طريق.
            </p>

            {/* Social Media */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.hover}`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">روابط سريعة</h3>

            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-white/80 transition-all duration-300 hover:translate-x-[-3px] hover:text-white">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">الدعم والأمان</h3>

            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-white/80 transition-all duration-300 hover:translate-x-[-3px] hover:text-white">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">تواصل معنا</h3>

            <ul className="flex flex-col gap-3">
              {/* Phone */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 text-[#FFE0B2]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
                  </svg>
                </span>

                <a
                  href="tel:0599999999"
                  dir="ltr"
                  className="text-sm text-white/85 transition-colors hover:text-white">
                  0599999999
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 text-[#FFE0B2]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>

                <a
                  href="mailto:support@badelha.ps"
                  dir="ltr"
                  className="break-all text-sm text-white/85 transition-colors hover:text-white">
                  support@badelha.ps
                </a>
              </li>

              {/* Location */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 text-[#FFE0B2]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>

                <span className="text-sm text-white/85">غزة، فلسطين</span>
              </li>
            </ul>

            {/* App Buttons */}
            <div className="mt-5 flex flex-col gap-2">
              {/* App Store */}
              <a href="#" className={appButtonClass}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                  <path d="M16.4 12.6c0-2 1.6-3 1.7-3.1a3.7 3.7 0 0 0-2.9-1.6c-1.2-.1-2.3.7-2.9.7s-1.5-.7-2.5-.7a3.9 3.9 0 0 0-3.3 2c-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2s1.4-.6 2.6-.6 1.5.6 2.6.6 1.8-1 2.5-2c.5-.7.9-1.5 1.1-2.3a3.5 3.5 0 0 1-2.4-3ZM14.4 6.5a3.7 3.7 0 0 0 .9-2.7 3.8 3.8 0 0 0-2.5 1.3 3.5 3.5 0 0 0-.9 2.6 3.2 3.2 0 0 0 2.5-1.2Z" />
                </svg>

                <span>قريباً على آب ستور</span>
              </a>

              {/* Google Play */}
              <a href="#" className={appButtonClass}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                  <path d="M3 2.5 14 12 3 21.5v-19ZM16 10.2l4.1-2.3a1.3 1.3 0 0 1 0 2.3L17.6 12l-1.6-1.8ZM16 13.8l4.1 2.3a1.3 1.3 0 0 1 0 2.3L16 16.1l-1.4-1.2 1.4-1.1ZM14 13.5l-9.5 8.1 11-9.6-1.5 1.5Z" />
                </svg>

                <span>قريباً على جوجل بلاي</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20 bg-black/5">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-white/80 sm:px-10 md:flex-row lg:px-12">
          <p className="text-center">© جميع الحقوق محفوظة – صنعت بحب في غزة.</p>

          <div className="flex items-center gap-5">
            <Link to="/terms" className="transition-colors hover:text-white">
              الشروط والأحكام
            </Link>

            <Link to="/privacy" className="transition-colors hover:text-white">
              الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
