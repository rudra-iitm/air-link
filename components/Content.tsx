"use client";

import {
  Wind,
  Snowflake,
  Gauge,
  ShieldCheck,
  Cpu,
  Volume2,
  Factory,
  Award,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

/* Sections float transparently above the fixed 3D canvas (z-10).
   Each is one viewport tall; the model is choreographed to sit opposite
   the copy so nothing collides. */

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 bg-black/40 backdrop-blur-xl">
      <div className="hidden gap-3 text-[0.8rem] font-medium text-white md:flex">
        <a className="rounded-full border border-white/20 px-5 py-2 hover:bg-white/10 transition-colors" href="#technology">Technology</a>
        <a className="rounded-full border border-white/20 px-5 py-2 hover:bg-white/10 transition-colors" href="#specs">Specs</a>
        <a className="rounded-full border border-white/20 px-5 py-2 hover:bg-white/10 transition-colors" href="#proof">Proof</a>
        <a className="rounded-full border border-white/20 px-5 py-2 hover:bg-white/10 transition-colors" href="#order">Enquire</a>
      </div>
      <a
        href="#order"
        data-cursor="hot"
        className="btn-glow hidden rounded-full bg-white/15 border border-white/10 px-5 py-2.5 text-[0.8rem] font-medium text-white backdrop-blur-md md:flex items-center gap-2"
      >
        <ArrowUpRight size={14} strokeWidth={1.25} /> Book a demo
      </a>
    </nav>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-section
      className={`relative z-10 flex min-h-screen w-full flex-col justify-center px-6 md:px-12 ${className}`}
    >
      {children}
    </section>
  );
}

export default function Content() {
  return (
    <main className="relative z-10">
      <Nav />

      {/* ============================ 1 · HERO ============================ */}
      <Section id="hero" className="items-center justify-end pb-28 text-center">
        <p className="max-w-xl text-balance text-lg leading-snug text-frost md:text-2xl">
          Where precision meets air.
          <br />
          Step into the future of climate.
        </p>

        <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="cue h-10 w-px bg-white/35" />
          <span className="text-[0.6rem] uppercase tracking-[0.35em] text-steel">
            Keep scrolling
          </span>
        </div>
      </Section>

      {/* ========================= 2 · TECHNOLOGY ======================== */}
      <Section id="technology" className="items-start">
        <div className="max-w-xl">
          <div data-reveal className="eyebrow mb-5 flex items-center gap-3">
            <Wind size={14} strokeWidth={1.25} className="text-white" /> Engineered Airflow
          </div>
          <h2
            data-reveal
            className="font-medium leading-[1.05] tracking-[-0.04em] text-white text-[10vw] md:text-[6vw]"
          >
            Moves air,
            <br />
            <span className="text-white">not noise.</span>
          </h2>
          <p
            data-reveal
            className="mt-7 max-w-md text-sm leading-relaxed text-steel md:text-base"
          >
            Eleven aerofoil blades, computationally swept and balanced to a
            thousandth of a gram. The Aether turbine pushes up to 12,000 m³/h of
            conditioned air while staying below a whisper.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
            <Stat icon={<Wind size={16} strokeWidth={1.25} />} value="12,000" unit="m³/h" label="Airflow" />
            <Stat icon={<Volume2 size={16} strokeWidth={1.25} />} value="28" unit="dBA" label="At full load" />
            <Stat icon={<Snowflake size={16} strokeWidth={1.25} />} value="2–40" unit="TR" label="Modular cooling" />
          </div>
        </div>
      </Section>

      {/* =========================== 3 · SPECS =========================== */}
      <Section id="specs" className="items-end text-right">
        <div className="max-w-xl">
          <div data-reveal className="eyebrow mb-5 flex items-center justify-end gap-3">
            Built to the micron <Gauge size={14} strokeWidth={1.25} className="text-white" />
          </div>
          <h2
            data-reveal
            className="font-medium leading-[1.05] tracking-[-0.04em] text-white text-[10vw] md:text-[6vw]"
          >
            Pure
            <br />
            <span className="text-white">power.</span>
          </h2>

          <dl
            data-reveal
            className="mt-9 grid grid-cols-2 gap-x-10 gap-y-7 text-left"
          >
            <Spec label="Efficiency" value="ISEER 5.2" note="Best-in-class" />
            <Spec label="Filtration" value="HEPA H14" note="99.995% @ 0.3µm" />
            <Spec label="Panel" value="25 mm PUF" note="Double-skin shell" />
            <Spec label="Refrigerant" value="R-32" note="Low-GWP, future-proof" />
            <Spec label="Control" value="BACnet / IoT" note="Cloud telemetry" />
            <Spec label="Warranty" value="10 years" note="On the core engine" />
          </dl>
        </div>
      </Section>

      {/* =========================== 4 · CORE ============================ */}
      <Section id="core" className="items-start">
        <div className="max-w-xl">
          <div data-reveal className="eyebrow mb-5 flex items-center gap-3">
            <Cpu size={14} strokeWidth={1.25} className="text-white" /> The Intelligent Core
          </div>
          <h2
            data-reveal
            className="font-medium leading-[1.05] tracking-[-0.04em] text-white text-[10vw] md:text-[6vw]"
          >
            It thinks
            <br />
            <span className="text-white">in air.</span>
          </h2>
          <p
            data-reveal
            className="mt-7 max-w-md text-sm leading-relaxed text-steel md:text-base"
          >
            A dedicated climate processor samples temperature, humidity and
            particulate load 200 times a second — modulating the turbine in real
            time so a room never overshoots, and never wastes a watt.
          </p>
          <ul data-reveal className="mt-8 space-y-4">
            <Feature icon={<Cpu size={16} strokeWidth={1.25} />} title="Adaptive load sensing" desc="Predicts demand before the room feels it." />
            <Feature icon={<Leaf size={16} strokeWidth={1.25} />} title="Eco-modulation" desc="Up to 41% lower energy draw at part load." />
            <Feature icon={<ShieldCheck size={16} strokeWidth={1.25} />} title="Self-diagnostics" desc="Flags a failing part weeks ahead." />
          </ul>
        </div>
      </Section>

      {/* =========================== 5 · PROOF =========================== */}
      <Section id="proof" className="items-end text-right">
        <div className="max-w-2xl">
          <div data-reveal className="eyebrow mb-5 flex items-center justify-end gap-3">
            Proven at scale <Award size={14} strokeWidth={1.25} className="text-white" />
          </div>
          <h2
            data-reveal
            className="font-medium leading-[1.05] tracking-[-0.04em] text-white text-[10vw] md:text-[6vw]"
          >
            Trusted by
            <br />
            <span className="text-white">India&apos;s critical air.</span>
          </h2>
          <p
            data-reveal
            className="ml-auto mt-7 max-w-md text-sm leading-relaxed text-steel md:text-base"
          >
            Airlink conditions the air in the places that cannot fail — airports,
            data centres, cleanrooms and operating theatres. The Aether is the
            distillation of that obsession.
          </p>
          <div
            data-reveal
            className="ml-auto mt-9 grid max-w-lg grid-cols-2 gap-x-10 gap-y-7 text-left md:grid-cols-4"
          >
            <Big value="35+" label="Years engineering" />
            <Big value="12k+" label="Installations" />
            <Big value="30+" label="Countries served" />
            <Big value="ISO" label="9001 · 14001" />
          </div>
          <div
            data-reveal
            className="ml-auto mt-8 flex max-w-lg flex-wrap items-center justify-end gap-6 text-[0.7rem] uppercase tracking-[0.2em] text-steel"
          >
            <span className="flex items-center gap-2"><Factory size={14} strokeWidth={1.25} className="text-white" /> Pharma-grade</span>
            <span className="flex items-center gap-2"><Leaf size={14} strokeWidth={1.25} className="text-white" /> IGBC certified</span>
            <span className="flex items-center gap-2"><ShieldCheck size={14} strokeWidth={1.25} className="text-white" /> ISO 9001 · 14001</span>
          </div>
        </div>
      </Section>

      {/* ============================ 6 · CTA ============================ */}
      <Section id="order" className="items-center text-center">
        <div data-reveal className="eyebrow mb-6">Begin the install</div>
        <h2 className="font-medium leading-[1.05] tracking-[-0.04em] text-white text-[10vw] leading-[1.05] md:text-[5vw] mb-4">
          <span data-reveal className="block">Ready to Breathe?</span>
          <span data-reveal className="block">Experience the Aether Difference</span>
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-md text-balance text-sm leading-relaxed text-steel md:text-base"
        >
          Configure an Aether engine for your space. Our engineers will model the
          airflow and return a precision quote within 48 hours.
        </p>
        <div data-reveal className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#"
            data-cursor="hot"
            className="btn-glow flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-sm font-medium text-white"
          >
            Subscribe
          </a>
          <a
            href="#"
            data-cursor="hot"
            className="btn-glow flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black"
          >
            <ArrowUpRight size={16} strokeWidth={1.25} /> Pre-order Now
          </a>
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-12">
          <div className="divider-line mb-6" />
          <div className="flex flex-col items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-steel md:flex-row">
            <span className="font-display font-bold text-frost">AIR·LINK</span>
            <span>Precision Climate Engineering · Made in India</span>
            <span>© MMXXVI Airlink</span>
          </div>
        </footer>
      </Section>
    </main>
  );
}

/* ----------------------------- small bits ----------------------------- */

function Stat({
  icon,
  value,
  unit,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div>
      <div className="mb-1 text-white">{icon}</div>
      <div className="font-display text-2xl font-semibold text-frost md:text-3xl">
        {value}
        <span className="ml-1 text-sm font-normal text-steel">{unit}</span>
      </div>
      <div className="text-[0.68rem] uppercase tracking-[0.2em] text-steel">{label}</div>
    </div>
  );
}

function Spec({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div>
      <dt className="text-[0.66rem] uppercase tracking-[0.22em] text-steel">{label}</dt>
      <dd className="font-display text-xl font-semibold text-frost md:text-2xl">{value}</dd>
      <dd className="text-xs text-steel/80">{note}</dd>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white">
        {icon}
      </span>
      <div>
        <div className="font-display text-base font-medium text-frost">{title}</div>
        <div className="text-sm text-steel">{desc}</div>
      </div>
    </li>
  );
}

function Big({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-frost md:text-4xl">{value}</div>
      <div className="mt-1 text-[0.64rem] uppercase tracking-[0.18em] text-steel">{label}</div>
    </div>
  );
}
