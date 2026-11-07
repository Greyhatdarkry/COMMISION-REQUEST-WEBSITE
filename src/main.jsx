
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import {
  ArrowUpRight,
  Cpu,
  CircuitBoard,
  Wifi,
  Code2,
  Menu,
  X,
  Mail,
  ArrowRight,
  Zap
} from 'lucide-react'
import './style.css'

function ChipScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const host = mountRef.current
    if (!host) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      38,
      host.clientWidth / host.clientHeight,
      0.1,
      100
    )

    camera.position.set(0, 4.5, 10)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0x9bbcff, 1.5))

    const key = new THREE.PointLight(0x20cfff, 38, 30)
    key.position.set(4, 5, 5)
    scene.add(key)

    const rim = new THREE.PointLight(0x345bff, 28, 30)
    rim.position.set(-5, 1, -3)
    scene.add(rim)

    const group = new THREE.Group()
    scene.add(group)

    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x111d31,
      metalness: 0.8,
      roughness: 0.26
    })

    const topMat = new THREE.MeshStandardMaterial({
      color: 0x152c49,
      metalness: 0.65,
      roughness: 0.22,
      emissive: 0x062342
    })

    const chip = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.38, 3.2),
      chipMat
    )

    group.add(chip)

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 0.12, 2.35),
      topMat
    )

    top.position.y = 0.25
    group.add(top)

    const core = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.16, 0.95),
      new THREE.MeshStandardMaterial({
        color: 0x39d9ff,
        metalness: 0.35,
        roughness: 0.2,
        emissive: 0x087ca8,
        emissiveIntensity: 1.4
      })
    )

    core.position.y = 0.38
    group.add(core)

    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x7d9cb7,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x12334b
    })

    for (let i = 0; i < 8; i++) {
      for (const side of [-1, 1]) {
        const pinA = new THREE.Mesh(
          new THREE.BoxGeometry(0.52, 0.07, 0.12),
          pinMat
        )

        pinA.position.set(
          side * 1.78,
          -0.02,
          -1.28 + i * 0.36
        )

        group.add(pinA)

        const pinB = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.07, 0.52),
          pinMat
        )

        pinB.position.set(
          -1.28 + i * 0.36,
          -0.02,
          side * 1.78
        )

        group.add(pinB)
      }
    }

    const traceMat = new THREE.MeshBasicMaterial({
      color: 0x14bce8,
      transparent: true,
      opacity: 0.7
    })

    for (let i = 0; i < 12; i++) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.025,
          0.025,
          1.1 + (i % 3) * 0.3
        ),
        traceMat
      )

      line.position.set(
        -3.4 + (i % 6) * 1.35,
        -0.25,
        -2.7 + Math.floor(i / 6) * 5.4
      )

      group.add(line)
    }

    const particles = new THREE.BufferGeometry()
    const positions = []

    for (let i = 0; i < 180; i++) {
      positions.push(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12
      )
    }

    particles.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    const stars = new THREE.Points(
      particles,
      new THREE.PointsMaterial({
        color: 0x66dfff,
        size: 0.025,
        transparent: true,
        opacity: 0.75
      })
    )

    scene.add(stars)

    let frame

    const animate = () => {
      frame = requestAnimationFrame(animate)

      group.rotation.y += 0.003
      group.rotation.x = Math.sin(Date.now() * 0.00035) * 0.08
      stars.rotation.y -= 0.00025

      renderer.render(scene, camera)
    }

    animate()

    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight

      if (!w || !h) return

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(host)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      renderer.dispose()

      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()

        if (obj.material) {
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material]

          mats.forEach(m => m.dispose())
        }
      })

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      className="chip-scene"
      ref={mountRef}
      aria-label="Animated 3D microcontroller illustration"
    />
  )
}

const services = [
  {
    icon: Wifi,
    number: '01',
    title: 'IoT & Automation',
    desc: 'Connected devices, sensor networks, smart monitoring and automation prototypes.',
    tags: ['ESP32', 'ESP8266', 'MQTT']
  },
  {
    icon: Cpu,
    number: '02',
    title: 'Embedded Systems',
    desc: 'Microcontroller-based systems, firmware logic and hardware integration.',
    tags: ['Arduino', 'NodeMCU', 'C/C++']
  },
  {
    icon: CircuitBoard,
    number: '03',
    title: 'Electronics & Prototyping',
    desc: 'Circuit planning, component selection, wiring and functional prototype assembly.',
    tags: ['Sensors', 'Modules', 'Circuits']
  },
  {
    icon: Code2,
    number: '04',
    title: 'Programming & Debugging',
    desc: 'Code development, integration, troubleshooting and system testing support.',
    tags: ['Firmware', 'Integration', 'Testing']
  }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    project: 'IoT / Smart System',
    budget: '',
    deadline: '',
    details: ''
  })

  const [notice, setNotice] = useState('')
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!endpoint) {
      setNotice(
        'The request form is in preview mode. Email delivery will be activated after the inbox connection is configured.'
      )
      return
    }

    try {
      const body = new URLSearchParams({
        ...form,
        source: 'CircuitWorks website - GR3Y'
      })

      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body
      })

      setNotice(
        'Your request has been submitted. Thank you — we will review your project details.'
      )

      setForm({
        name: '',
        email: '',
        project: 'IoT / Smart System',
        budget: '',
        deadline: '',
        details: ''
      })
    } catch {
      setNotice(
        'We could not submit your request. Please try again later.'
      )
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app-shell">
      <div className="grid-glow" />

      {/* NAVIGATION */}

      <header className="nav-wrap">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <CircuitBoard size={21} />
          </span>

          <span>
            CIRCUIT<span className="brand-light">WORKS</span>
            <small>ENGINEERED BY GR3Y</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#process" onClick={closeMenu}>How it works</a>
          <a href="#about" onClick={closeMenu}>About</a>

          <a
            className="nav-cta"
            href="#request"
            onClick={closeMenu}
          >
            Request a deal <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main>

        {/* HERO */}

        <section className="hero section" id="home">
          <div className="hero-copy">

            <div className="eyebrow">
              <span className="pulse-dot" />
              TECHNICAL PROJECT DEVELOPMENT / GR3Y
            </div>

            <h1>
              BUILD.<br />
              <span>CONNECT.</span><br />
              INNOVATE.
            </h1>

            <p className="hero-lead">
              Turning engineering ideas into functional prototypes.
            </p>

            <p className="hero-desc">
              Practical development support for IoT, embedded systems,
              electronics and automation — from the first concept
              to a tested prototype.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#request">
                Start a project <ArrowUpRight size={17} />
              </a>

              <a className="text-link" href="#services">
                Explore services <ArrowRight size={16} />
              </a>
            </div>

            <div className="hero-meta">
              <span><i /> IoT & EMBEDDED</span>
              <span><i /> ELECTRONICS</span>
              <span><i /> PROTOTYPING</span>
            </div>

          </div>

          <div className="hero-visual">
            <div className="visual-label label-top">
              <span>FIG. 001</span> MICROCONTROLLER CORE
            </div>

            <ChipScene />

            <div className="visual-label label-bottom">
              <span className="signal" />
              SYSTEM ONLINE
              <span>3D / REAL-TIME</span>
            </div>

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </div>

          <div className="hero-index">
            <span>01</span> / 04
          </div>
        </section>

        {/* EXPERTISE TICKER */}

        <section className="ticker" aria-label="Areas of expertise">
          <div>
            INTERNET OF THINGS <b>✳</b>
            EMBEDDED SYSTEMS <b>✳</b>
            ELECTRONICS <b>✳</b>
            SMART AUTOMATION <b>✳</b>
            PROTOTYPE DEVELOPMENT <b>✳</b>
          </div>
        </section>

        {/* SERVICES */}

        <section className="section services-section" id="services">
          <div className="section-heading">
            <div>
              <div className="eyebrow">WHAT WE WORK ON / 01</div>
              <h2>
                TECH THAT<br />
                <span>MAKES SENSE.</span>
              </h2>
            </div>

            <p>
              Focused technical services to help turn a project brief
              into a working, testable system.
            </p>
          </div>

          <div className="service-grid">
            {services.map(({ icon: Icon, number, title, desc, tags }) => (
              <article className="service-card" key={number}>
                <div className="card-top">
                  <span>{number} / SERVICE</span>
                  <Icon size={22} />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <div className="tags">
                  {tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}

        <section className="process-section" id="process">
          <div className="section narrow">
            <div className="eyebrow">A CLEAR WORKFLOW / 02</div>

            <h2>
              FROM IDEA<br />
              <span>TO IMPLEMENTATION.</span>
            </h2>

            <div className="process-grid">
              <div>
                <b>01</b>
                <h3>Tell us the idea</h3>
                <p>
                  Share your concept, required features, timeline
                  and constraints.
                </p>
              </div>

              <div>
                <b>02</b>
                <h3>Review & quotation</h3>
                <p>
                  We assess scope, components, complexity
                  and estimated costs.
                </p>
              </div>

              <div>
                <b>03</b>
                <h3>Build & test</h3>
                <p>
                  Agree on milestones, develop the prototype
                  and test its functions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT GR3Y */}

        <section className="section about-section" id="about">
          <div className="about-mark">
            <Zap size={42} />
          </div>

          <div>
            <div className="eyebrow">
              THE CIRCUITWORKS APPROACH / 03
            </div>

            <h2>
              ENGINEERING<br />
              <span>WITHOUT THE GUESSWORK.</span>
            </h2>

            <p>
              CircuitWorks is built around practical engineering,
              creative problem-solving and functional technology.
              From embedded systems to connected devices, every
              project is approached with precision, transparency
              and attention to detail.

              <br /><br />

              <strong>Designed and engineered by GR3Y.</strong>
            </p>
          </div>
        </section>

        {/* PROJECT REQUEST */}

        <section className="section request-section" id="request">
          <div className="request-intro">
            <div className="eyebrow">
              LET'S BUILD SOMETHING / 04
            </div>

            <h2>
              HAVE A<br />
              <span>PROJECT IN MIND?</span>
            </h2>

            <p>
              Tell us what you're planning. Submit a project inquiry
              and we'll review the requirements before discussing
              a quotation.
            </p>

            <div className="contact-note">
              <Mail size={18} />

              <span>
                Private project inquiries
                <br />
                <small>
                  Your contact details are used to respond to your request.
                </small>
              </span>
            </div>
          </div>

          <form className="request-form" onSubmit={submit}>
            <div className="form-title">
              <span>PROJECT INQUIRY</span>
              <span>FORM / 001</span>
            </div>

            <label>
              Your name
              <input
                required
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Name"
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Project category
              <select
                name="project"
                value={form.project}
                onChange={update}
              >
                <option>IoT / Smart System</option>
                <option>Embedded Systems</option>
                <option>Electronics / Prototype</option>
                <option>Programming / Debugging</option>
                <option>Other</option>
              </select>
            </label>

            <div className="form-row">
              <label>
                Estimated budget
                <input
                  name="budget"
                  value={form.budget}
                  onChange={update}
                  placeholder="e.g. ₱3,000–₱5,000"
                />
              </label>

              <label>
                Target deadline
                <input
                  name="deadline"
                  value={form.deadline}
                  onChange={update}
                  placeholder="e.g. December 2026"
                />
              </label>
            </div>

            <label>
              Project details
              <textarea
                required
                name="details"
                value={form.details}
                onChange={update}
                rows="4"
                placeholder="Describe the system, features, components, and what you need built..."
              />
            </label>

            <button
              className="button button-primary submit-button"
              type="submit"
            >
              Submit project inquiry <ArrowUpRight size={17} />
            </button>

            {notice && (
              <p className="form-notice" role="status">
                {notice}
              </p>
            )}

            <small className="form-footnote">
              Submitting an inquiry does not confirm a booking
              or final price. Scope and terms will be agreed
              before work begins.
            </small>
          </form>
        </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">
            <CircuitBoard size={19} />
          </span>

          <span>
            CIRCUIT<span className="brand-light">WORKS</span>
            <small>ENGINEERED BY GR3Y</small>
          </span>
        </a>

        <span>BUILD. CONNECT. INNOVATE.</span>

        <span>
          © {new Date().getFullYear()} CIRCUITWORKS | GR3Y
        </span>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
