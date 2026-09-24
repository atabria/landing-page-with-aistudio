import React, { useState } from 'react';
import { Mail, Check, Copy, Send, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const email = 'hello@atabria.dev';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="border-b border-[#383244]/60 bg-[#161021] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Status */}
        <div className="flex items-center justify-between border-b border-[#383244]/60 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#d0bcff]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d0bcff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d0bcff]" />
            </span>
            <span className="uppercase tracking-widest font-semibold">Available for frontend & UX/UI roles</span>
          </div>
          <span className="text-xs font-mono text-[#919095]">Responses within 24h</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Call to Action */}
          <div className="lg:col-span-6">
            <h2 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-white leading-tight">
              Have a project or opportunity in mind?
            </h2>
            <p className="mt-4 text-base text-[#c7c6cb]">
              Whether you are architecting a new web product, looking for a design engineer to elevate your user experience, or exploring contract collaborations:
            </p>

            {/* Big Interactive Email Pill */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center justify-between rounded-xl border border-[#46464b] bg-[#1e1929] px-5 py-3.5 shadow-sm">
                <span className="font-mono text-lg font-semibold tracking-wide text-white select-all">
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="ml-4 flex items-center gap-1.5 rounded-md bg-[#2d2738] px-3 py-1.5 text-xs font-medium text-[#d0bcff] transition-colors hover:bg-[#4f3886] hover:text-white"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${email}?subject=Project%20Inquiry%20from%20Atabria%20Portfolio`}
                className="flex items-center gap-2 rounded-xl bg-[#d0bcff] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#161021] transition-all hover:bg-white hover:shadow-lg hover:shadow-[#d0bcff]/20"
              >
                <Mail className="h-4 w-4" />
                <span>Say Hello</span>
              </a>
            </div>

            <div className="mt-8 text-xs font-mono text-[#919095]">
              Location: Remote / Open to International Relocation & Distributed Teams
            </div>
          </div>

          {/* Right Column: Direct Message Box */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[#383244] bg-[#1e1929] p-6 sm:p-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#d0bcff] flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" /> Quick Dispatch
              </h3>
              <p className="mt-1 text-xs text-[#919095]">
                Send a direct dispatch to my inbox.
              </p>

              {messageSent ? (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center text-emerald-300">
                  <Check className="mx-auto h-8 w-8 text-emerald-400" />
                  <p className="mt-2 font-semibold">Message Dispatched!</p>
                  <p className="mt-1 text-xs text-emerald-400/80">Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#c7c6cb] uppercase tracking-wider font-mono">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Olivia Vance"
                      className="mt-1.5 w-full rounded-lg border border-[#46464b] bg-[#161021] px-3.5 py-2.5 text-sm text-white placeholder-[#919095]/60 focus:border-[#d0bcff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c7c6cb] uppercase tracking-wider font-mono">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="olivia@studio.com"
                      className="mt-1.5 w-full rounded-lg border border-[#46464b] bg-[#161021] px-3.5 py-2.5 text-sm text-white placeholder-[#919095]/60 focus:border-[#d0bcff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c7c6cb] uppercase tracking-wider font-mono">
                      Message / Project Scope *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your team or project..."
                      className="mt-1.5 w-full rounded-lg border border-[#46464b] bg-[#161021] px-3.5 py-2.5 text-sm text-white placeholder-[#919095]/60 focus:border-[#d0bcff] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2d2738] border border-[#b59df2]/40 py-2.5 text-xs font-bold uppercase tracking-wider text-[#e9def6] transition-all hover:bg-[#4f3886] hover:text-white"
                  >
                    <Send className="h-3.5 w-3.5 text-[#d0bcff]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
