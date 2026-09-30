import type { Metadata } from "next";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Terms", description: "Terms for using the KJR Labs website and for early project conversations before a written agreement.", alternates: { canonical: "/terms/" } };

const sections = [
  ["Scope", "These terms apply when you use this website or contact KJR Labs about a possible project. Paid client work should be covered by a written proposal, invoice, statement of work, or contract."],
  ["Website content", "The website explains our services, process, and contact options. Details may change as our work, availability, and services evolve."],
  ["Project inquiries", "Sending an inquiry helps us understand your requirement, but it does not create a client relationship or reserve availability. We may ask for more context, suggest a next step, or decline work that is not a good fit."],
  ["Intellectual property", "KJR Labs branding, website copy, design, and original materials belong to KJR Labs unless otherwise stated. Ownership of client deliverables should be defined in the relevant project agreement."],
];

export default function Terms() {
  return (
    <section data-bg="#FAF7F0" className="min-h-svh px-5 pb-24 pt-36 md:px-10">
      <h1 className="display text-[clamp(3rem,9vw,8rem)] font-extrabold">Terms.</h1>
      <div className="mt-10 max-w-[60ch] space-y-4 text-lg leading-relaxed">
        <p>Last updated: May 31, 2026. These terms cover this website and early project conversations before a formal proposal or agreement is in place.</p>
        {sections.map(([h, b]) => (
          <div key={h}><h2 className="font-display text-2xl font-bold">{h}</h2><p>{b}</p></div>
        ))}
        <div><h2 className="font-display text-2xl font-bold">Contact</h2><p>Questions about these terms: <a className="u font-semibold" href={`mailto:${contact.email.value}`}>{contact.email.value}</a>.</p></div>
      </div>
    </section>
  );
}
