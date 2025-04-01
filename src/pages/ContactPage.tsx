import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import usePortfolioData from "../hooks/usePortfolioData";
import SectionContainer from "../components/SectionContainer";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const { data, loading } = usePortfolioData();
  const [pageLoading, setPageLoading] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (loading || !data || pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20 dark:bg-gray-900">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { personal } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageLoading(true);
  
    if (!form.current) {
      console.error("Form ref is null");
      setPageLoading(false);
      return;
    }
  
    emailjs
      .sendForm("service_momrrba", "template_z4fm7h2", form.current, {
        publicKey: "5JItNzawcpi4fb6fc",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setName("");
          setEmail("");
          setMsg("");
          setPageLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send message, please try again.");
          setPageLoading(false);
        }
      );
  };
  

  return (
    <div className="min-h-screen bg-white pt-20 dark:bg-gray-900">
      <SectionContainer
        title="Contact Me"
        subtitle="Have a question or want to work together? Feel free to get in touch!"
      >
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Get in Touch</h3>

            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <FiMail className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Email</h4>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <FiPhone className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Phone</h4>
                  <a
                    href={`tel:${personal.phone}`}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <FiMapPin className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">{personal.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Connect with me
              </h4>
              <div className="flex space-x-4">
                {personal.socialLinks.github && (
                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-blue-900"
                    aria-label="GitHub"
                  >
                    <FiGithub className="text-gray-800 dark:text-white" size={24} />
                  </a>
                )}

                {personal.socialLinks.linkedin && (
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-blue-900"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="text-gray-800 dark:text-white" size={24} />
                  </a>
                )}

                {personal.socialLinks.twitter && (
                  <a
                    href={personal.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-blue-900"
                    aria-label="Twitter"
                  >
                    <FiTwitter className="text-gray-800 dark:text-white" size={24} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="form space-y-4" data-form ref={form}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-form-input
                  id="name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-form-input
                  id="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  data-form-input
                  id="message"
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-form-btn
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-green-100 p-3 text-center text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-100 p-3 text-center text-red-800 dark:bg-red-900 dark:text-red-100"
                >
                  {submitError}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ContactPage;
