import React, { useState } from "react";
import { motion } from "framer-motion";

const apply = [
  { id: "3e9674783c", label: "Potential User" },
  { id: "2c89e34c34", label: "Caregiver of potential user" },
  { id: "9cf4792c2d", label: "Clinician" },
  { id: "88250873c7", label: "Researcher" },
  { id: "a9ddcec96f", label: "Business Partner" },
  { id: "0857f9d895", label: "Other" },
];

const interested_in = [
  { id: "a83591fd5c", label: "Participating in future clinical trials" },
  { id: "f7178dd798", label: "Company updates & product development news" },
  { id: "3d9e8277a5", label: "Joining the Uplift Waitlist"}
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    apply: new Set<string>(),
    interested_in: new Set<string>(),
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: "apply" | "interested_in"
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newSet = new Set(prev[category]);
      if (checked) {
        newSet.add(value);
      } else {
        newSet.delete(value);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      name: formData.name,
      email_address: formData.email,
      phone: formData.phone,
      message: formData.message,
      apply: apply.reduce((acc, condition) => {
        acc[condition.id] = formData.apply.has(condition.id);
        return acc;
      }, {} as Record<string, boolean>),
      interested_in: interested_in.reduce((acc, interest) => {
        acc[interest.id] = formData.interested_in.has(interest.id);
        return acc;
      }, {} as Record<string, boolean>),
    };

    try {
      const response = await fetch("/api/vercelmailer.js", { //changed to match outer api folder change to mailer when local
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("Form submission successful:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-levita-blue-dark">
        <motion.div
          className="container mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg text-levita-blue-light">
            We've received your information and will be in touch soon. We
            appreciate your interest in Levita Health.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-slate-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">
            Contact Us!
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                            We would love
                  to hear from you and are

                  here to help however

                  we can.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name *"
                required
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-levita-blue-light focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-levita-blue-light focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Phone (Optional)"
                maxLength={14}
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-levita-blue-light focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-levita-blue-dark mb-3">
              Tell us a bit about yourself (check all that apply): Ages 16+           </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {apply.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      value={c.id}
                      onChange={(e) => handleCheckboxChange(e, "apply")}
                      className="h-5 w-5 text-levita-blue-light rounded border-slate-300 focus:ring-levita-blue-light"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-levita-blue-dark mb-3">
                I'm interested in:
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {interested_in.map((interest) => (
                  <label
                    key={interest.id}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      value={interest.id}
                      onChange={(e) => handleCheckboxChange(e, "interested_in")}
                      className="h-5 w-5 text-levita-blue-light rounded border-slate-300 focus:ring-levita-blue-light"
                    />
                    <span>{interest.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <textarea
                placeholder="Message (Optional)"
                rows={4}
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-levita-blue-light focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-levita-blue-light text-white font-bold py-3 px-12 rounded-full hover:bg-levita-blue-dark transition-transform transform hover:scale-105 shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
