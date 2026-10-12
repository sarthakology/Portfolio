import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiTwitter } from "react-icons/fi";
import usePortfolioData from "../hooks/usePortfolioData";

const cardClass =
  "group flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-colors hover:border-blue-500 hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 md:p-8";

const ContactPage = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20 dark:bg-gray-900">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { personal } = data;

  const details: {
    label: string;
    value: string;
    href: string;
    icon: IconType;
    external?: boolean;
  }[] = [
    {
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: FiMail,
    },
    {
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
      icon: FiPhone,
    },
    {
      label: "Location",
      value: personal.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personal.location)}`,
      icon: FiMapPin,
      external: true,
    },
  ];

  const socials = [
    personal.socialLinks.github
      ? { label: "GitHub", href: personal.socialLinks.github, icon: FiGithub }
      : null,
    personal.socialLinks.linkedin
      ? { label: "LinkedIn", href: personal.socialLinks.linkedin, icon: FiLinkedin }
      : null,
    personal.socialLinks.twitter
      ? { label: "Twitter", href: personal.socialLinks.twitter, icon: FiTwitter }
      : null,
  ].filter((item): item is { label: string; href: string; icon: IconType } => item !== null);

  return (
    <div className="flex min-h-screen flex-col bg-white pt-20 dark:bg-gray-900">
      <section className="container mx-auto flex w-full flex-1 flex-col justify-center px-4 py-10 md:py-14">
        <div className="mb-8 text-center md:mb-10">
          <motion.h1
            className="mb-3 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Me
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Have a question or want to work together? Feel free to get in touch!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {details.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cardClass}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                    <Icon className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <FiArrowUpRight
                    className="text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500"
                    size={22}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="mt-2 break-words text-lg font-semibold text-gray-800 dark:text-white md:text-xl">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {socials.length > 0 && (
          <div
            className={`mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 ${
              socials.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {socials.map((item) => {
              const Icon = item.icon;
              const handle = item.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm transition-colors hover:border-blue-500 hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 md:p-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                    <Icon className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white">{item.label}</p>
                    <p className="truncate text-gray-600 dark:text-gray-300">{handle}</p>
                  </div>
                  <FiArrowUpRight
                    className="shrink-0 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500"
                    size={22}
                  />
                </motion.a>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ContactPage;
