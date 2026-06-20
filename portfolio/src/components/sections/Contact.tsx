"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Code2, Briefcase, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-[#0f1623]/80 p-8 shadow-2xl backdrop-blur-xl md:p-16"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-500">
                <span className="h-px w-6 bg-blue-500" />
                Contact
              </p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Let&apos;s build something great together.
              </h2>
              <p className="mb-12 text-lg text-slate-400">
                Open to full-time roles, internships, and freelance projects. I
                respond within 24 hours.
              </p>

              <div className="flex flex-col gap-6">
                <a
                  href="mailto:meghpandya7788@gmail.com"
                  className="flex items-center gap-4 text-lg font-medium text-slate-300 transition-colors hover:text-blue-400"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <Mail size={20} />
                  </div>
                  meghpandya7788@gmail.com
                </a>
                <a
                  href="tel:+919726396207"
                  className="flex items-center gap-4 text-lg font-medium text-slate-300 transition-colors hover:text-blue-400"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <Phone size={20} />
                  </div>
                  +91 9726396207
                </a>
                <div className="mt-4 flex items-center gap-4 pl-16">
                  <a
                    href="https://www.linkedin.com/in/megh17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    <Briefcase size={18} />
                  </a>
                  <a
                    href="https://github.com/megh17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                  >
                    <Code2 size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative z-10">
                <Input
                  placeholder="Your Name"
                  {...register("name")}
                  error={errors.name?.message}
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                />
                <Textarea
                  placeholder="Your Message"
                  {...register("message")}
                  error={errors.message?.message}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : isSuccess ? (
                    <>
                      Sent Successfully <CheckCircle2 size={18} />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
              
              {/* Success overlay state if needed, though button text handles it elegantly above */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
