// src/App.jsx
import React, { useEffect, useState } from "react";

// Preload all images from the assets folder so paths are resolved by Vite
const __images = import.meta.glob("./assets/*.{jpg,png,svg}", { eager: true });
const imageMap = {};
for (const p in __images) {
  const name = p.replace("./assets/", "");
  const mod = __images[p];
  imageMap[name] = mod && mod.default ? mod.default : mod;
}

// Order here controls active nav highlighting
const sectionsIds = ["#about", "#what", "#events", "#achievements", "#team"];

const achievements = [
  { id: 1, src: "ach-1.jpg", alt: "Achievement 1" },
  { id: 2, src: "ach-2.jpg", alt: "Achievement 2" },
  { id: 3, src: "ach-3.jpg", alt: "Achievement 3" },
  { id: 4, src: "ach-4.jpg", alt: "Achievement 4" },
  { id: 5, src: "ach-5.jpg", alt: "Achievement 5" },
  { id: 6, src: "ach-6.jpg", alt: "Achievement 6" },
];

const teamMembers = [
  { id: 1, name: "T Nithin", role: "President", img: "mem-1.jpg" },
  { id: 2, name: "Murthan Ashok", role: "Vice President", img: "mem-12.jpg" },
  {
    id: 3,
    name: "S B Sai Bharadwaj",
    role: "Organizational Head",
    img: "mem-8.jpg",
  },
  {
    id: 4,
    name: "Ayushman Soni",
    role: "Vice Organizational Head",
    img: "mem-4.jpg",
  },
  { id: 5, name: "Soumya Sunil", role: "Secretary", img: "mem-9.jpg" },
  {
    id: 6,
    name: "Kavin Karthik K",
    role: "Vice Secretary",
    img: "mem-6.jpg",
  },
  { id: 7, name: "P Pranathi Raju", role: "Treasurer", img: "mem-7.jpg" },
  { id: 8, name: "Tejas V G", role: "Deputy Treasurer", img: "mem-13.jpg" },
  { id: 9, name: "Fayan", role: "Design Head", img: "mem-2.jpg" },
  {
    id: 10,
    name: "Sourav Kori",
    role: "Vice Designing Head",
    img: "mem-14.jpg",
  },
  {
    id: 11,
    name: "Krithi Suvarna",
    role: "Media and Marketing Head",
    img: "mem-3.jpg",
  },
  {
    id: 12,
    name: "Manideep M",
    role: "Vice Media and Marketing Head",
    img: "mem-11.jpg",
  },
  { id: 13, name: "Madan L N", role: "Pilot", img: "mem-5.jpg" },
  { id: 14, name: "Suchinth KG", role: "Co-pilot", img: "mem-10.jpg" },
];

function App() {
  const [activeSection, setActiveSection] = useState("#about");
  const [navOpen, setNavOpen] = useState(false);

  // Smooth scroll with offset
  const scrollToTarget = (target) => {
    const el = document.querySelector(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
    setNavOpen(false);
  };

  // Reveal animations with IntersectionObserver
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Update active nav item on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = null;
      const offset = 120;

      sectionsIds.forEach((id) => {
        const el = document.querySelector(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
          current = id;
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const year = new Date().getFullYear();

  return (
    <>
      {/* Background glows */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="page">
        {/* NAVBAR */}
        <header className={`nav ${navOpen ? "open" : ""}`}>
          <div className="nav-left">
            <div className="nav-logo-circle">
              <img src={imageMap["logo.png"]} alt="Vyoma Aero Club logo" />
            </div>
            <div>
              <div className="nav-title-main">Vyoma Aero Club</div>
              <div className="nav-title-sub">
                Department of Aeronautical Engineering
              </div>
            </div>
          </div>

          <nav className="nav-links">
            <button
              className={`nav-link ${
                activeSection === "#about" ? "active" : ""
              }`}
              onClick={() => scrollToTarget("#about")}
            >
              About
            </button>
            <button
              className={`nav-link ${
                activeSection === "#what" ? "active" : ""
              }`}
              onClick={() => scrollToTarget("#what")}
            >
              What we do
            </button>
            <button
              className={`nav-link ${
                activeSection === "#events" ? "active" : ""
              }`}
              onClick={() => scrollToTarget("#events")}
            >
              Events
            </button>
            <button
              className={`nav-link ${
                activeSection === "#achievements" ? "active" : ""
              }`}
              onClick={() => scrollToTarget("#achievements")}
            >
              Achievements
            </button>
            <button
              className={`nav-link ${
                activeSection === "#team" ? "active" : ""
              }`}
              onClick={() => scrollToTarget("#team")}
            >
              Team
            </button>
          </nav>

        </header>

        <main>
          {/* HERO */}
          <section className="hero" id="hero">
            <div className="hero-text reveal">
              <div className="eyebrow">
                <span className="eyebrow-pill"></span>
                Vyoma Aero Club · Est. 2024
              </div>
              <h1 className="hero-title">
                Where students
                <br />
                <span className="highlight">design, build & fly</span>
                <br />
                their own aircraft.
              </h1>
              <p className="hero-tagline">
                <strong>Vyoma Aero Club</strong> is a student-led aeronautical
                club where teams build <strong>UAVs and RC aircraft</strong>{" "}
                from concept to flight, competing at national-level events and
                representing the institute on the aerospace stage.
              </p>
              <div className="hero-meta">
                Mechanical · Electronics · Computer · Aerospace · Allied
                branches
              </div>

              <div className="hero-cta-row">
                <button
                  className="btn-primary"
                  onClick={() => scrollToTarget("#about")}
                >
                  Our story <span className="btn-icon">↓</span>
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => scrollToTarget("#what")}
                >
                  What we build <span className="btn-icon">✦</span>
                </button>
              </div>

              <div className="hero-footnote">
                If you want your equations, code and circuits to end up in the
                air — not just in notebooks — this is your hangar.
              </div>

              <div className="hero-scroll">
                <div className="scroll-wheel">
                  <div className="scroll-dot"></div>
                </div>
                <span>Scroll to enter the flight deck</span>
              </div>
            </div>

            <div className="hero-visual reveal delay-1">
              <div className="hero-card">
                <div className="hero-card-header">
                  <span>Flight Deck · Vyoma</span>
                  <span className="hero-chip">
                    Active Season
                    <span></span>
                  </span>
                </div>

                <div className="hero-trajectory">
                  <div className="hero-logo-wrap">
                    <div className="hero-logo-circle">
                      <div className="hero-logo-border"></div>
                      <div className="hero-logo-inner">
                        <img src={imageMap["logo.png"]} alt="Vyoma logo" />
                      </div>
                    </div>
                  </div>

                  <div className="hero-metrics">
                    <div className="metric">
                      <div className="metric-label">Founded</div>
                      <div className="metric-value">
                        2024 · Aeronautical Dept.
                      </div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">Core Focus</div>
                      <div className="metric-value">
                        UAV & RC aircraft design-build-fly
                      </div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">Ambition</div>
                      <div className="metric-value">
                        Strong presence at national competitions (incl. IITs)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-quote">
                  “From a sketch on the whiteboard to a silhouette against the
                  sky — entirely built by students.”
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about">
            <div className="section-header reveal">
              <div className="section-kicker">01 · About</div>
              <h2 className="section-title">
                <span>Vyoma Aero Club</span> in brief
              </h2>
              <p className="section-subtitle">
                A cross-branch, student-operated space for aeronautical
                experimentation: where aircraft are treated as projects and
                prototypes, not just diagrams.
              </p>
            </div>

            <div className="about-layout">
              <article className="about-text reveal">
                <p>
                  <strong>Vyoma Aero Club</strong> was established in 2024
                  within the Department of Aeronautical Engineering to create a{" "}
                  <strong>hands-on, multidisciplinary platform</strong>.
                  Students from mechanical, electronics, computer, aerospace and
                  allied branches work together to design, build and compete
                  with{" "}
                  <strong>UAVs (unmanned aerial vehicles)</strong> and{" "}
                  <strong>RC (radio-controlled) aircraft</strong>.
                </p>
                <br />
                <p>
                  Instead of treating aircraft design as a one-semester theory
                  subject, Vyoma turns it into an ongoing studio. Teams sketch,
                  prototype, simulate, fabricate, wire, program and test —
                  iterating until the aircraft actually flies the mission it was
                  designed for.
                </p>

                <div className="about-tags">
                  <span className="about-tag">Hands-on builds</span>
                  <span className="about-tag">Student-led</span>
                  <span className="about-tag">Lab + flight line</span>
                </div>
              </article>

              <aside className="about-side">
                <div className="vision-box reveal delay-1">
                  <div className="vision-label">Vision</div>
                  <p className="vision-text">
                    To pioneer a new wave of{" "}
                    <span>student-led aerospace innovation</span>: empowering
                    young engineers to conceive, test and fly aerial craft that
                    excel at{" "}
                    <span>design, performance and mission-capability</span> —
                    and to raise our institution’s standing at{" "}
                    <span>
                      national competitions (including those hosted by the IITs)
                    </span>
                    .
                  </p>
                </div>

                <div className="timeline-box reveal delay-2">
                  <div className="timeline-label">How we work</div>
                  <div className="timeline-list">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div>
                        <strong>Concept lab.</strong>
                        <br />
                        Missions, constraints and configurations are debated at
                        the whiteboard — not locked inside slides.
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div>
                        <strong>Build & integrate.</strong>
                        <br />
                        Structures, avionics, propulsion and software move in
                        parallel across mixed-branch teams.
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div>
                        <strong>Test & iterate.</strong>
                        <br />
                        Ground tests and flight days turn failures into data and
                        data into better aircraft.
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* WHAT WE DO */}
          <section id="what">
            <div className="section-header reveal">
              <div className="section-kicker">02 · What we do</div>
              <h2 className="section-title">
                From <span>idea</span> to <span>aircraft</span>
              </h2>
              <p className="section-subtitle">
                A simple but demanding pipeline: design with intent, build what
                you simulate, then fly and learn.
              </p>
            </div>

            <div className="what-grid">
              <article className="what-card reveal">
                <h3 className="what-title">Design with intent</h3>
                <p>
                  Aerodynamics, structures, stability, control and avionics are
                  treated as one system problem: making the mission flyable.
                </p>
                <div className="pill-row">
                  <span className="pill">Concept & sizing</span>
                  <span className="pill">Aero & stability</span>
                  <span className="pill">Configuration trade-offs</span>
                </div>
              </article>

              <article className="what-card reveal delay-1">
                <h3 className="what-title">Build & integrate</h3>
                <p>
                  Members turn designs into real airframes using foam, balsa,
                  composites, 3D-prints and electronics — wiring everything into
                  a working aircraft.
                </p>
                <div className="pill-row">
                  <span className="pill">Structures & mechanisms</span>
                  <span className="pill">Electronics & avionics</span>
                  <span className="pill">Ground control</span>
                </div>
              </article>

              <article className="what-card reveal delay-2">
                <h3 className="what-title">Fly & compete</h3>
                <p>
                  Projects are aligned with national events, including those
                  hosted by IITs, so every build has a clear mission and
                  deadline.
                </p>
                <div className="list-compact">
                  <span>✦ IIT-hosted aeromodelling & UAV contests</span>
                  <span>✦ Inter-college RC aircraft challenges</span>
                  <span>✦ Payload, endurance & mission-based events</span>
                </div>
              </article>
            </div>
          </section>

          {/* EVENTS */}
          <section id="events" className="events-section">
            <div className="section-header reveal">
              <div className="section-kicker">03 · Events</div>
              <h2 className="section-title">
                Highlights <span>from the flight line</span>
              </h2>
              <p className="section-subtitle">
                Workshops, test days and showcases that turned sketches into
                aircraft and aircraft into data.
              </p>
            </div>

            <div className="events-grid">
              {/* Event 1 */}
              <div className="event-card reveal">
                <div className="event-image">
                  <img src={imageMap["event-1.jpg"]} alt="Aeromodelling Workshop" />
                </div>
                <div className="event-overlay">
                  <h3>Aircraft Workshop for M-tech</h3>
                  <p>
                    “A hands-on RC aircraft workshop for M.Tech students was conducted on 21st and 22nd November, offering practical training in aeromodelling, design, assembly, and flight fundamentals.”
                  </p>
                  <span className="event-tag">Rc Aircraft Workshop</span>
                </div>
              </div>

              {/* Event 2 */}
              <div className="event-card reveal delay-1">
                <div className="event-image">
                  <img src={imageMap["event-2.jpg"]} alt="RC Flight Challenge" />
                </div>
                <div className="event-overlay">
                  <h3>RC Workshop 25</h3>
                  <p>
                    “Club Vyoma conducted an RC aircraft workshop on 11th October, providing hands-on training in model building, aerodynamics, and flight fundamentals.”
                  </p>
                  <span className="event-tag">Workshop</span>
                </div>
              </div>

              {/* Event 3 */}
              <div className="event-card reveal delay-2">
                <div className="event-image">
                  <img src={imageMap["event-3.jpg"]} alt="Aerospace Industry Meet" />
                </div>
                <div className="event-overlay">
                  <h3>Vyoma 25</h3>
                  <p>
                    Vyoma 25, a national-level aeromodelling competition by Club Vyoma, was held on 25–27 April, showcasing innovative RC aircraft designs, technical skills, and competitive flying challenges.”
                  </p>
                  <span className="event-tag">Aeromodelling Competion</span>
                </div>
              </div>
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements">
            <div className="section-header reveal">
              <div className="section-kicker">04 · Achievements</div>
              <h2 className="section-title">
                Milestones <span>we're proud of</span>
              </h2>
            </div>

            <div className="achievement-grid">
              {achievements.map((ach, index) => (
                <div
                  key={ach.id}
                  className={`achievement-item reveal ${
                    index < 3 ? "delay-1" : "delay-2"
                  }`}
                >
                  <img src={imageMap[ach.src] || ""} alt={ach.alt} />
                </div>
              ))}
            </div>
          </section>

          {/* TEAM */}
          <section id="team">
            <div className="section-header reveal">
              <div className="section-kicker">05 · Team</div>
              <h2 className="section-title">
                The crew behind <span>Vyoma</span>
              </h2>
              <p className="section-subtitle">
                Aircraft don’t build themselves. These are the people keeping
                design, fabrication and flight tests moving forward.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, idx) => (
                <article
                  key={member.id}
                  className={`team-card reveal ${
                    idx % 3 === 1 ? "delay-1" : idx % 3 === 2 ? "delay-2" : ""
                  }`}
                >
                  <div className="team-img">
                    <img src={imageMap[member.img] || ""} alt={member.name} />
                  </div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                </article>
              ))}
            </div>

            <p className="team-note reveal delay-2">
              Keep it human: real names, real roles, one clear responsibility
              each. That’s enough to make the club feel serious and approachable.
            </p>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-grid">
              {/* Column 1 */}
              <div className="footer-col footer-left">
                <div className="footer-meta">
                  © {year} Vyoma Aero Club · Department of Aeronautical
                  Engineering
                </div>
              </div>

              {/* Column 2 */}
              <div className="footer-col footer-center">
                <h4>Faculty Coordinators</h4>
                <p>
                  Dr. Jini Raj —{" "}
                  <a href="tel:+919952458480">99524 58480</a>
                </p>
                <p>
                  Mr. Deepak Kumar P —{" "}
                  <a href="tel:+919791577306">97915 77306</a>
                </p>

                <h4 style={{ marginTop: "1rem" }}>Student Coordinators</h4>
                <p>
                  Nithin — <a href="tel:+919113057554">91130 57554</a>
                </p>
                <p>
                  Murthan Ashok —{" "}
                  <a href="tel:+919606896851">96068 96851</a>
                </p>
              </div>

              {/* Column 3 */}
              <div className="footer-col footer-right">
                <div className="footer-social-row">
                  <a
                    href="https://instagram.com/aeroclub_vyoma"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="social-icon">📷</span>
                    <span>@AEROCLUB_VYOMA</span>
                  </a>
                </div>

                <div className="footer-social-row">
                  <a href="mailto:vyomaaeroclub@gmail.com">
                    <span className="social-icon">📧</span>
                    <span>vyomaaeroclub@gmail.com</span>
                  </a>
                </div>

                <div className="footer-built">
                  <span style={{ color: "var(--gold-strong)" }}>Built by</span>{" "}
                  <a
                    href="https://linkedin.com/in/tabishalam"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tabish Alam
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://github.com/TabishAlam"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
