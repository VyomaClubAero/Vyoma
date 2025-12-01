// src/App.jsx
import React, { useEffect, useState } from "react";

// Preload all images from the assets folder so paths are resolved by Vite
// Use `import.meta.glob` with `{ eager: true }` for wider compatibility
const __images = import.meta.glob('./assets/*.{jpg,png,svg}', { eager: true });
const imageMap = {};
for (const p in __images) {
  const name = p.replace('./assets/', '');
  const mod = __images[p];
  imageMap[name] = mod && mod.default ? mod.default : mod;
}

const sectionsIds = ["#about", "#what", "#achievements", "#team", "#join"];

const achievements = [
  { id: 1, src: "ach-1.jpg", alt: "Achievement 1" },
  { id: 2, src: "ach-2.jpg", alt: "Achievement 2" },
  { id: 3, src: "ach-3.jpg", alt: "Achievement 3" },
  { id: 4, src: "ach-4.jpg", alt: "Achievement 4" },
  { id: 5, src: "ach-5.jpg", alt: "Achievement 5" },
  { id: 6, src: "ach-6.jpg", alt: "Achievement 6" },
];

// You can swap these placeholders with real member details & images
const teamMembers = [
  {
    id: 1,
    name: "T Nithin",
    role: "President",
    img: "mem-1.jpg",
  },
  {
    id: 2,
    name: "Murthan Ashok",
    role: "Vice President",
    img: "mem-12.jpg",
  },
  {
    id: 3,
    name: "S B Sai Bharadwaj",
    role: "Organizational Head",
    img: "mem-8.jpg",
  },
  {
    id: 4,
    name: "Ayushman Soni",
    role: "Vice organizational Head",
    img: "mem-4.jpg",
  },
  {
    id: 5,
    name: "Soumya Sunil",
    role: "Secretary",
    img: "mem-9.jpg",
  },
  {
    id: 6,
    name: "Kavin Karthik k",
    role: "Vice secretary",
    img: "mem-6.jpg",
  },
  // Add the remaining members up to 14
  {
    id: 7,
    name: "P Pranathi raju",
    role: "Treasurer",
    img: "mem-7.jpg",
  },
  {
    id: 8,
    name: "Tejas V G",
    role: "Deputy Treasurer",
    img: "mem-13.jpg",
  },
  {
    id: 9,
    name: "Fayan",
    role: "Design Head",
    img: "mem-2.jpg",
  },
  {
    id: 10,
    name: "Sourav kor",
    role: "Vice designing head",
    img: "mem-14.jpg",
  },

  {
    id: 11,
    name: "Krithi suvarna",
    role: "Media and marketing head",
    img: "mem-3.jpg",
  },
    {
    id: 12,
    name: "Manideep M",
    role: "Vice media and marketing head",
    img: "mem-11.jpg",
  },
  {
    id: 13,
    name: "Madan L N",
    role: "Pilot",
    img: "mem-5.jpg",
  },
  {
    id: 14,
    name: "Suchinth KG",
    role: "Co-pilot",
    img: "mem-10.jpg",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("#about");
  const [navOpen, setNavOpen] = useState(false);

  // --- smooth scroll (with offset like your original JS) ---
  const scrollToTarget = (target) => {
    const el = document.querySelector(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
    setNavOpen(false);
  };

  // --- scroll reveal (re-using your IntersectionObserver logic) ---
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

  // --- active nav state on scroll (includes achievements section) ---
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
    handleScroll(); // run once on mount

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
              <img src={imageMap['logo.png']} alt="Vyoma Aero Club logo" />
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

          <button className="nav-cta" onClick={() => scrollToTarget("#join")}>
            <span className="icon">●</span> Join Vyoma
          </button>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span></span>
          </button>
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
                        <img src={imageMap['logo.png']} alt="Vyoma logo" />
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

          {/* ACHIEVEMENTS */}
          <section id="achievements">
            <div className="section-header reveal">
              <div className="section-kicker">03 · Achievements</div>
              <h2 className="section-title">
                Milestones <span>We're Proud Of</span>
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
                  <img src={imageMap[ach.src] || ''} alt={ach.alt} />
                </div>
              ))}
            </div>
          </section>

          {/* TEAM */}
          <section id="team">
            <div className="section-header reveal">
              <div className="section-kicker">04 · Team</div>
              <h2 className="section-title">
                The crew behind <span>Vyoma</span>
              </h2>
              <p className="section-subtitle">
                Aircraft don’t build themselves. These are the key roles
                steering design, integration and flight days.
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
                    <img src={imageMap[member.img] || ''} alt={member.name} />
                  </div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-branch">{member.branch}</div>
                  <div className="team-tags">
                    {(member.tags || []).map((tag) => (
                      <span className="team-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <p className="team-note reveal delay-2">
              Keep it human: real names, real branches, one clear responsibility
              each. That’s enough to make the club feel serious and approachable.
            </p>
          </section>

          {/* JOIN */}
          <section id="join">
            <div className="section-header reveal">
              <div className="section-kicker">05 · Join</div>
              <h2 className="section-title">
                Join the <span>flight path</span>
              </h2>
              <p className="section-subtitle">
                You don’t need prior UAV experience. You do need curiosity,
                patience, and willingness to learn from broken wings and noisy
                data.
              </p>
            </div>

            <div className="join-card reveal">
              <div>
                <div className="join-title">
                  From “I like aircraft” to “I helped build this”.
                </div>
                <p className="join-text">
                  Vyoma recruits students who are ready to own a part of the
                  pipeline: design, structures, electronics, software or
                  operations. Grades help, but we value{" "}
                  <strong>ownership</strong> and{" "}
                  <strong>follow-through</strong> far more.
                </p>
                <div className="join-meta">
                  Tip: when you reach out, mention which part of the aircraft
                  lifecycle you want to work on first. It helps us plug you into
                  the right crew.
                </div>
              </div>

              <form
                className="join-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: Replace with your real Google Form link
                  window.open("https://docs.google.com/forms/your-form-id", "_blank");
                }}
              >
                <div className="form-row">
                  <input type="text" placeholder="Your name" required />
                  <input type="email" placeholder="College email" required />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Branch / year" />
                  <select>
                    <option value="">Primary interest</option>
                    <option>Aircraft design & aero</option>
                    <option>Structures & fabrication</option>
                    <option>Electronics & avionics</option>
                    <option>Flight software & controls</option>
                    <option>Operations & competition logistics</option>
                  </select>
                </div>
                <textarea
                  placeholder="In 2–3 lines, tell us why you want to join Vyoma and what you hope to work on."
                ></textarea>

                <div className="join-footer">
                  <button className="btn-primary" type="submit">
                    Send interest <span className="btn-icon">➜</span>
                  </button>
                  <div className="helper-text">
                    This form submits to your Google Form. Swap in your official
                    link above when ready.
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>

        {/* FOOTER */}
<footer className="footer">
  <div>
    © <span id="year">{year}</span> Vyoma Aero Club · Department of Aeronautical Engineering
  </div>

  {/* Social Links */}
  <div className="footer-socials">
    <a href="https://linkedin.com/in/YOUR_CLUB_LINK" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="https://instagram.com/YOUR_CLUB_INSTA" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </div>

  {/* Built By */}
  <div className="footer-built">
    Built by <strong>Tabish</strong> · 
    <a href="https://www.linkedin.com/in/itabishalam/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·
    <a href="https://github.com/itabishalam/" target="_blank" rel="noopener noreferrer">GitHub</a>
  </div>

  <div className="footer-links">
    <a onClick={() => scrollToTarget("#hero")}>Back to top ↑</a>
    <a onClick={() => scrollToTarget("#about")}>About</a>
    <a onClick={() => scrollToTarget("#what")}>What we do</a>
    <a onClick={() => scrollToTarget("#team")}>Team</a>
  </div>
</footer>

      </div>
    </>
  );
}

export default App;
