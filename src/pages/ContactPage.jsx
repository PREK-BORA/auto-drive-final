import { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";

import { addMessage } from "../services/firestoreService";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await addMessage(formData);

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={26} />,
      title: "Visit Us",
      text: "123 Auto Tik Tla, Phnom Penh City.",
    },
    {
      icon: <Phone size={26} />,
      title: "Call Us",
      text: "+(885) XXX XXX",
    },
    {
      icon: <Mail size={26} />,
      title: "Email Us",
      text: "info@autodrive.com",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <section className="bg-blue-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mb-3 text-4xl font-extrabold text-white md:text-5xl">
            Get in Touch
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-white/85">
            Have questions? We are here to help. Send us a message and we will
            respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Contact Information
            </h2>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="mb-6">
                <span className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-white">
                  Send us a message
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full rounded-lg border bg-white px-4 py-4 outline-none transition focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-200"
                          : " focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Your Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className={`w-full rounded-lg border px-4 py-4 outline-none transition focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-200"
                          : " focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-950">
                      Your Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+855 12 345 678"
                      className={`w-full rounded-lg border px-4 py-4 outline-none transition focus:ring-2 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "  focus:ring-blue-200"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Your Message
                    </label>

                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      className={`w-full resize-none  rounded-lg border px-5 py-4 outline-none transition focus:ring-2 ${
                        errors.message
                          ? "border-red-500 focus:ring-red-200"
                          : " focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />

                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-block rounded-full bg-blue-700 px-4 py-3 text-xl font-semibold text-white hover:bg-blue-700 "
                    >
                      <Send size={19} />
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>

        </div>
      </section>

      {success && (
        <div className="fixed bottom-6 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl bg-green-600 px-5 py-4 text-white shadow-2xl">

          <CheckCircle size={24} />

          <p className="flex-1 text-sm font-medium">
            Your message has been sent! We will get back to you soon.
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="rounded p-1 hover:bg-white/10"
          >
            <X size={20} />
          </button>

        </div>
      )}

    </div>
  );
}