import { useState } from "react";
import { profile } from "@/lib/data";
import { RevealLines, Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
    need: "Website",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/khushisharmap12@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Inquiry from ${formState.name}`,
          Name: formState.name,
          Email: formState.email,
          Project: formState.project,
          Service_Needed: formState.need,
          Message: formState.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({
          name: "",
          email: "",
          project: "",
          need: "Website",
          message: ""
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12 bg-contact-glow">
      <div className="mx-auto max-w-rail grid gap-16 md:grid-cols-2 md:items-start">
        
        <div>
          <h2 className="font-display text-4xl leading-[1.05] text-text md:text-5xl">
            <RevealLines
              lines={["Let's Build", "Something That Works."]}
              className="block"
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg text-muted">
              Have a website, software or digital project requirement? Share the details and let's discuss the best way to move it forward.
            </p>
          </Reveal>
          
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-col gap-y-4 text-sm text-muted">
              <a href={`mailto:${profile.email}`} className="text-text hover:text-blue-soft transition-colors inline-block w-fit">
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-text hover:text-blue-soft transition-colors inline-block w-fit">
                LinkedIn
              </a>
              <span>{profile.location}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 rounded-2xl bg-surface-gradient border border-line relative overflow-hidden">
            
            {status === "success" && (
              <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-muted">Thanks for reaching out. I'll get back to you shortly.</p>
              </div>
            )}

            {status === "error" && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs text-muted uppercase tracking-widest">Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="bg-transparent border-b border-line pb-2 text-text placeholder-[rgba(154,164,196,0.6)] focus:border-blue focus:shadow-[0_1px_0_0_var(--blue)] outline-none transition-shadow"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs text-muted uppercase tracking-widest">Email</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="bg-transparent border-b border-line pb-2 text-text placeholder-[rgba(154,164,196,0.6)] focus:border-blue focus:shadow-[0_1px_0_0_var(--blue)] outline-none transition-shadow"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="project" className="text-xs text-muted uppercase tracking-widest">Project / Company</label>
              <input 
                id="project"
                type="text" 
                value={formState.project}
                onChange={(e) => setFormState({...formState, project: e.target.value})}
                className="bg-transparent border-b border-line pb-2 text-text placeholder-[rgba(154,164,196,0.6)] focus:border-blue focus:shadow-[0_1px_0_0_var(--blue)] outline-none transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="need" className="text-xs text-muted uppercase tracking-widest">What do you need?</label>
              <select 
                id="need"
                value={formState.need}
                onChange={(e) => setFormState({...formState, need: e.target.value})}
                className="bg-transparent border-b border-line pb-2 text-text placeholder-[rgba(154,164,196,0.6)] focus:border-blue focus:shadow-[0_1px_0_0_var(--blue)] outline-none transition-shadow appearance-none"
              >
                <option value="Website" className="bg-navy text-text">Website</option>
                <option value="Web Application" className="bg-navy text-text">Web Application</option>
                <option value="Software Project" className="bg-navy text-text">Software Project</option>
                <option value="Project Coordination" className="bg-navy text-text">Project Coordination</option>
                <option value="Development Support" className="bg-navy text-text">Development Support</option>
                <option value="Other" className="bg-navy text-text">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="message" className="text-xs text-muted uppercase tracking-widest">Message</label>
              <textarea 
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className="bg-transparent border-b border-line pb-2 text-text placeholder-[rgba(154,164,196,0.6)] focus:border-blue focus:shadow-[0_1px_0_0_var(--blue)] outline-none transition-shadow resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="mt-4 bg-blue text-white py-3 px-6 rounded-full font-medium text-sm hover:bg-blue-soft transition-colors inline-flex items-center justify-center gap-2 self-start disabled:opacity-70"
            >
              {status === "submitting" ? "Sending..." : "Start a Conversation"} 
              {status !== "submitting" && <span>&rarr;</span>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
