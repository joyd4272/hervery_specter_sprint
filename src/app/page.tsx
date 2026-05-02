'use client';

import { useState, useEffect } from 'react';
import { client } from '../lib/sanity.client';

type PortfolioItem = {
  title: string;
  imageUrl: string | null;
  tags: string[];
  url: string | null;
};

const heroBgDesktop = "/harvey-hero.png";
const heroBgMobile  = "https://www.figma.com/api/mcp/asset/be5f3fad-df87-4c13-bdde-c4cd31670f0e";

const Arrow = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ProjectCard({ project, size }: { project: PortfolioItem; size: 'tall' | 'short' }) {
  const href = project.url || '#';
  return (
    <div className="work__project">
      <div className={`work__card work__card--${size}`}>
        {project.imageUrl && (
          <img
            src={`${project.imageUrl}?w=900&auto=format&fit=crop`}
            alt={project.title}
            loading="lazy"
          />
        )}
        <div className="work__tags">
          {(project.tags || []).map(tag => (
            <span key={tag} className="work__tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="work__proj-foot">
        <p className="work__proj-name">{project.title}</p>
        <a href={href} className="work__arrow" aria-label={`View ${project.title}`}>
          <Arrow />
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    client
      .fetch<PortfolioItem[]>(
        `*[_type == "portfolio" && featured == true] | order(order asc) {
          title,
          "imageUrl": image.asset->url,
          tags,
          url
        }[0...4]`
      )
      .then(setProjects)
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__bg">
          <img src={heroBgDesktop} alt="Harvey Specter" />
        </div>
        <div className="hero__frost"></div>

        <div className="hero__inner">
          <nav className="nav" aria-label="Main navigation">
            <a href="#" className="nav__logo">H.Studio</a>

            <ul className="nav__links" role="list">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#news">News</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            <a href="#contact" className="btn nav__cta-desktop">Let&apos;s talk</a>

            <button
              className="nav__hamburger"
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>

          <div className="hero__content">
            <div className="hero__name-block">
              <span className="hero__label">[ Hello I&apos;m ]</span>
              <h1 className="hero__name">Harvey<span className="name-gap">&nbsp;&nbsp;&nbsp;</span><br className="name-break" />Specter</h1>
            </div>

            <div className="hero__bottom">
              <div className="hero__desc-block">
                <p className="hero__desc">
                  H.Studio is a <em>full-service</em> creative studio creating beautiful digital
                  experiences and products. We are an <em>award winning</em> design and art group
                  specializing in branding, web design and engineering.
                </p>
                <a href="#contact" className="btn">Let&apos;s talk</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="intro__inner">
          <div className="intro__header">
            <p className="intro__years">[ 8+ years in industry ]</p>
            <div className="intro__rule"></div>
          </div>

          <div className="intro__type">
            <div className="intro__row intro__row--1">
              <span className="intro__meta">001</span>
              <p className="intro__heading">A creative director&nbsp;&nbsp;&nbsp;/</p>
            </div>

            <div className="intro__row intro__row--2">
              <p className="intro__heading">Photographer</p>
            </div>

            <div className="intro__row intro__row--3">
              <p className="intro__heading">Born <span className="intro__amp">&amp;</span> raised</p>
            </div>

            <div className="intro__row intro__row--4">
              <p className="intro__heading">on the south side</p>
            </div>

            <div className="intro__row intro__row--5">
              <p className="intro__heading">of chicago.</p>
              <span className="intro__meta">[ creative freelancer ]</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about__mob-top">
          <p className="about__meta">002</p>
          <p className="about__meta">[ About ]</p>
        </div>

        <div className="about__inner">
          <p className="about__meta about__desk-label">[ About ]</p>

          <div className="about__right">
            <div className="about__text-frame">
              <div className="about__bkts about__bkts--l">
                <span className="about__corner about__corner--tl"></span>
                <span className="about__corner about__corner--bl"></span>
              </div>
              <p className="about__text">Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.</p>
              <div className="about__bkts about__bkts--r">
                <span className="about__corner about__corner--tr"></span>
                <span className="about__corner about__corner--br"></span>
              </div>
            </div>

            <div className="about__img-col">
              <span className="about__meta about__desk-index">002</span>
              <div className="about__img-wrap">
                <img
                  src="https://www.figma.com/api/mcp/asset/2bbae7b3-70a7-49e1-a5ab-4f82de12e7aa"
                  alt="Portrait"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="full-bleed">
        <img
          src="https://www.figma.com/api/mcp/asset/2b2af880-9c25-460e-85f9-cb5a2de79267"
          alt="Photographer with camera"
        />
      </section>

      <section className="services" id="services">
        <p className="svc__label">[ services ]</p>

        <div className="svc__count-row">
          <span>[4]</span>
          <span>Deliverables</span>
        </div>

        <div className="svc__list">

          <div className="svc__item">
            <div className="svc__item-head">
              <p className="svc__item-num">[ 1 ]</p>
              <div className="svc__rule"></div>
            </div>
            <div className="svc__item-body">
              <p className="svc__item-name">Brand Discovery</p>
              <div className="svc__item-right">
                <p className="svc__item-desc">Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.</p>
                <div className="svc__item-img">
                  <img src="https://www.figma.com/api/mcp/asset/aba613a3-acb6-4ce2-84d2-1a1e511a4f4c" alt="Brand Discovery" />
                </div>
              </div>
            </div>
          </div>

          <div className="svc__item">
            <div className="svc__item-head">
              <p className="svc__item-num">[ 2 ]</p>
              <div className="svc__rule"></div>
            </div>
            <div className="svc__item-body">
              <p className="svc__item-name">Web Design &amp; Dev</p>
              <div className="svc__item-right">
                <p className="svc__item-desc">Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.</p>
                <div className="svc__item-img">
                  <img src="https://www.figma.com/api/mcp/asset/4eedc66f-d974-42b7-b9de-0841c14c69b6" alt="Web Design &amp; Dev" />
                </div>
              </div>
            </div>
          </div>

          <div className="svc__item">
            <div className="svc__item-head">
              <p className="svc__item-num">[ 3 ]</p>
              <div className="svc__rule"></div>
            </div>
            <div className="svc__item-body">
              <p className="svc__item-name">Marketing</p>
              <div className="svc__item-right">
                <p className="svc__item-desc">Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.</p>
                <div className="svc__item-img">
                  <img src="https://www.figma.com/api/mcp/asset/3a2c7f3e-9671-4b5b-90c7-a6624ae386b7" alt="Marketing" />
                </div>
              </div>
            </div>
          </div>

          <div className="svc__item">
            <div className="svc__item-head">
              <p className="svc__item-num">[ 4 ]</p>
              <div className="svc__rule"></div>
            </div>
            <div className="svc__item-body">
              <p className="svc__item-name">Photography</p>
              <div className="svc__item-right">
                <p className="svc__item-desc">Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.</p>
                <div className="svc__item-img">
                  <img src="https://www.figma.com/api/mcp/asset/1edc5640-78ea-42ea-9e33-be03453cd2ad" alt="Photography" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="work" id="projects">

        <div className="work__hdr work__hdr--desk">
          <div className="work__hdr-left">
            <div>
              <p className="work__title">Selected</p>
              <p className="work__title">Work</p>
            </div>
            <span className="work__index">004</span>
          </div>
          <div className="work__port-wrap">
            <span className="work__port">[ portfolio ]</span>
          </div>
        </div>

        <div className="work__hdr work__hdr--mob">
          <span className="work__port">[ portfolio ]</span>
          <div className="work__hdr-mob-row">
            <div>
              <p className="work__title">Selected</p>
              <p className="work__title">Work</p>
            </div>
            <span className="work__index">004</span>
          </div>
        </div>

        <div className="work__grid">

          <div className="work__col work__col--l">
            {projects.slice(0, 2).map((p, i) => (
              <ProjectCard key={p.title} project={p} size={i === 0 ? 'tall' : 'short'} />
            ))}
            <div className="work__cta work__cta--desk">
              <div className="about__bkts about__bkts--l">
                <span className="about__corner about__corner--tl"></span>
                <span className="about__corner about__corner--bl"></span>
              </div>
              <div className="work__cta-body">
                <p className="work__cta-text">Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.</p>
                <a href="#contact" className="btn">Let&apos;s talk</a>
              </div>
              <div className="about__bkts about__bkts--r">
                <span className="about__corner about__corner--tr"></span>
                <span className="about__corner about__corner--br"></span>
              </div>
            </div>
          </div>

          <div className="work__col work__col--r">
            {projects.slice(2, 4).map((p, i) => (
              <ProjectCard key={p.title} project={p} size={i === 0 ? 'short' : 'tall'} />
            ))}
          </div>

        </div>

        <div className="work__cta work__cta--mob">
          <div className="about__bkts about__bkts--l">
            <span className="about__corner about__corner--tl"></span>
            <span className="about__corner about__corner--bl"></span>
          </div>
          <div className="work__cta-body">
            <p className="work__cta-text">Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.</p>
            <a href="#contact" className="btn">Let&apos;s talk</a>
          </div>
          <div className="about__bkts about__bkts--r">
            <span className="about__corner about__corner--tr"></span>
            <span className="about__corner about__corner--br"></span>
          </div>
        </div>

      </section>

      <section className="testi">
        <h2 className="testi__heading">Testimonials</h2>

        <div className="testi__cards">

          <div className="testi__card testi__card--1">
            <img className="testi__card-logo"
              src="https://www.figma.com/api/mcp/asset/25e190db-1890-41be-b46c-3f22838a3d13"
              alt="Logoidsum" />
            <p className="testi__card-quote">A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.</p>
            <p className="testi__card-author">Marko Stojković</p>
          </div>

          <div className="testi__card testi__card--2">
            <img className="testi__card-logo"
              src="https://www.figma.com/api/mcp/asset/b88d807e-5c50-4c36-878f-08154e6a1167"
              alt="Logoidsum" />
            <p className="testi__card-quote">Professional, precise, and incredibly fast at handling complex product visualizations and templates.</p>
            <p className="testi__card-author">Lukas Weber</p>
          </div>

          <div className="testi__card testi__card--3">
            <img className="testi__card-logo"
              src="https://www.figma.com/api/mcp/asset/8b64a487-10af-4448-a8f0-713d25085803"
              alt="Logoidsum University" />
            <p className="testi__card-quote">A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don&apos;t just make things look good; they solve business problems through visual clarity.</p>
            <p className="testi__card-author">Sarah Jenkins</p>
          </div>

          <div className="testi__card testi__card--4">
            <img className="testi__card-logo"
              src="https://www.figma.com/api/mcp/asset/9f27b615-8cbe-4b1c-b943-882a3f6b280a"
              alt="Logoidsum" />
            <p className="testi__card-quote">An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.</p>
            <p className="testi__card-author">Sofia Martínez</p>
          </div>

        </div>
      </section>

      <section className="news" id="news">
        <div className="news__inner">

          <div className="news__title-wrap">
            <div className="news__title">
              <p>Keep up with my latest</p>
              <p>news &amp; achievements</p>
            </div>
          </div>

          <div className="news__grid">

            <div className="news__card news__card--1">
              <div className="news__card-img">
                <img src="https://www.figma.com/api/mcp/asset/990f1eaa-e4fe-4752-9922-28fda630d5a7" alt="News article 1" />
              </div>
              <p className="news__card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" className="news__read-more">
                Read more
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 15L15 3M15 3H7M15 3V11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="news__sep"></div>

            <div className="news__card news__card--2">
              <div className="news__card-img">
                <img src="https://www.figma.com/api/mcp/asset/c7a52632-6850-4644-b573-a118d9f3c6d6" alt="News article 2" />
              </div>
              <p className="news__card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" className="news__read-more">
                Read more
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 15L15 3M15 3H7M15 3V11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="news__sep"></div>

            <div className="news__card news__card--3">
              <div className="news__card-img">
                <img src="https://www.figma.com/api/mcp/asset/97e4cc7a-b7be-40de-ab4e-1cd9cb23f237" alt="News article 3" />
              </div>
              <p className="news__card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" className="news__read-more">
                Read more
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 15L15 3M15 3H7M15 3V11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      <footer className="footer" id="contact">

        <div className="footer__top">
          <div className="footer__top-row">

            <div className="footer__cta">
              <p className="footer__cta-heading">Have a <strong className="footer__cta-strong">project</strong> in mind?</p>
              <a href="#contact" className="btn--outline">Let&apos;s talk</a>
            </div>

            <div className="footer__social footer__social--center">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>

            <div className="footer__social footer__social--right">
              <a href="#">X.com</a>
              <a href="#">Linkedin</a>
            </div>

          </div>
          <div className="footer__rule"></div>
        </div>

        <div className="footer__bottom">

          <div className="footer__brand">
            <div className="footer__coded-wrap">
              <span className="footer__coded">[ Coded By Claude ]</span>
            </div>
            <p className="footer__brand-name">H.Studio</p>
          </div>

          <div className="footer__legal">
            <a href="#">Licences</a>
            <a href="#">Privacy policy</a>
          </div>

        </div>

      </footer>

      <div
        id="mobile-drawer"
        className={`nav__drawer${drawerOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="nav__drawer-top">
          <span className="nav__logo">H.Studio</span>
          <button className="nav__drawer-close" aria-label="Close navigation" onClick={() => setDrawerOpen(false)}>&times;</button>
        </div>
        <ul className="nav__drawer-links" role="list">
          <li><a href="#about"    onClick={() => setDrawerOpen(false)}>About</a></li>
          <li><a href="#services" onClick={() => setDrawerOpen(false)}>Services</a></li>
          <li><a href="#projects" onClick={() => setDrawerOpen(false)}>Projects</a></li>
          <li><a href="#news"     onClick={() => setDrawerOpen(false)}>News</a></li>
          <li><a href="#contact"  onClick={() => setDrawerOpen(false)}>Contact</a></li>
        </ul>
        <a
          href="#contact"
          className="btn"
          style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
          onClick={() => setDrawerOpen(false)}
        >
          Let&apos;s talk
        </a>
      </div>
    </>
  );
}
