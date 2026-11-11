import Image from "next/image";
import { FiArrowDown, FiArrowUpRight, FiCode, FiCpu, FiDatabase, FiFileText, FiInbox, FiLayers, FiSend, FiZap } from "react-icons/fi";
import { assets } from "@/assets/assets";
import CodePreview from "./CodePreview";

const capabilities = ["Full-stack web development", "AI automation", "Conversational AI", "iOS & Android apps", "Flutter · React Native · Capacitor", "Production deployment"];

export default function Header() {
  return (
    <section id="home" className="digital-hero">
      <div className="digital-hero-frame">
        <div className="digital-grid" aria-hidden="true" />
        <div className="hero-ascii" aria-hidden="true">{"+ · + · 01 · + · +\n· + · + · + · + ·\n+ · 10 · + · 01 · +"}</div>
        <div className="digital-hero-copy">
          <span className="digital-badge"><span /> FULL STACK DEVELOPMENT &amp; AI SOLUTIONS</span>
          <p className="digital-intro">Hi, I’m Saurabh Kumar</p>
          <h1>{["I build digital products", "that turn ideas", "into real experiences."].map((line, i) => <span key={line} className={i === 2 ? "silver-text" : ""} style={{ "--delay": `${i * 130}ms` }}>{line}</span>)}</h1>
          <p className="digital-description">I build thoughtful web experiences, practical AI solutions, and cross-platform apps for iOS and Android with Flutter, React Native, and Capacitor.</p>
          <div className="digital-hero-actions"><a href="#work" className="btn btn-primary">Explore my work <FiArrowUpRight /></a><a href="#contact" className="btn btn-ghost">Let’s build together <FiArrowUpRight /></a></div>
          <p className="digital-hero-note"><span>Based in New Delhi</span><span>Founder of TooleraAI</span><a href="/Saurabh-Kumar.pdf" download>Download résumé ↗</a></p>
        </div>
      </div>
      <div className="capability-strip"><p>WHAT I BUILD</p><div className="capability-mask"><div className="capability-track">{[0, 1].map(copy => <div className="capability-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{capabilities.map((name, i) => { const Icon = [FiCode, FiZap, FiCpu, FiLayers][i % 4]; return <span key={name}><Icon />{name}</span>; })}</div>)}</div></div></div>
      <div className="builder-window">
        <div className="builder-titlebar"><span className="window-dots"><i /><i /><i /></span><span>SAURABH / PRODUCT WORKSPACE</span><span className="workspace-status"><i /> SYSTEMS ONLINE</span></div>
        <div className="builder-content">
          <div className="workflow-panel" aria-label="Animated example of an AI workflow">
            <div className="workspace-panel-heading"><span className="mini-label">AUTOMATION FLOW / LEAD INTAKE</span><span className="live-indicator"><i /> RUNNING</span></div>
            <div className="workflow-canvas">
              <svg className="workflow-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {["M27 50 L38 50", "M62 50 C68 50 68 20 74 20", "M62 50 L74 50", "M62 50 C68 50 68 80 74 80"].map((path, index) => (
                  <g key={path}>
                    <path d={path} stroke="currentColor" strokeOpacity=".12" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    <path d={path} pathLength="100" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" className="workflow-dash" />
                    <path d={path} pathLength="100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="14 200" vectorEffect="non-scaling-stroke" className="workflow-pulse" style={{ animationDelay: `${index * 0.35}s` }} />
                  </g>
                ))}
              </svg>
              <div className="flow-node flow-node-trigger"><span><FiInbox /></span><div><strong>New inquiry</strong><small>webhook trigger</small></div></div>
              <div className="flow-node flow-node-agent"><span><FiCpu /></span><div><strong>AI agent</strong><small>qualify &amp; route</small><i className="agent-progress" /></div></div>
              <div className="flow-node flow-node-crm"><span><FiDatabase /></span><div><strong>Update CRM</strong><small>action</small></div></div>
              <div className="flow-node flow-node-reply"><span><FiFileText /></span><div><strong>Draft reply</strong><small>needs review</small></div></div>
              <div className="flow-node flow-node-notify"><span><FiSend /></span><div><strong>Notify team</strong><small>action</small></div></div>
            </div>
            <div className="workflow-caption"><span><FiZap /> AI-assisted routing</span><span>3 actions connected</span></div>
          </div>
          <div className="code-panel" aria-label="Example automation code">
            <div className="code-toolbar"><span><FiCode /> workflow.ts</span><span>TypeScript</span></div>
            <div className="code-editor"><CodePreview /></div>
            <div className="code-status"><span><i /> Deployed</span><span>Build · Connect · Ship</span></div>
          </div>
        </div>
        <div className="workspace-footer"><Image src={assets.profile_img} alt="" width={44} height={44} /><div><span className="mini-label">DESIGN + ENGINEERING</span><strong>From first idea to production.</strong></div><a href="#work">Explore selected work <FiArrowDown /></a></div>
      </div>
    </section>
  );
}
