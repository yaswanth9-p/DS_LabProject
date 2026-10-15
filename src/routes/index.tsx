import { createFileRoute, Link } from '@tanstack/react-router';
import type { CSSProperties, PointerEvent } from 'react';
import { ArrowRight, ArrowUpRight, FlaskConical, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileCard, ExperimentCard, SocialCard, SectionHeading } from '@/components/portal/shared';
import { pageHead, usePortal } from '@/data/portal';
import jinwooBackground from '@/assets/sung-jin-woo.jpeg.asset.json';
import laboratory from '@/assets/laboratory.jpg';
export const Route = createFileRoute('/')({ head: () => pageHead('Student Laboratory Portal', 'Explore student laboratory experiments, academic profiles and the programming journey at Mohan Babu University.'), component: Home });
function Home() {
  const { experiments } = usePortal();
  const heroStyle = { '--hero-image': `url("${jinwooBackground.url}")` } as CSSProperties;
  const moveBackground = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || event.currentTarget.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    const layer = event.currentTarget;
    layer.style.setProperty('--parallax-x', `${x * -9}px`);
    layer.style.setProperty('--parallax-y', `${y * -7}px`);
    layer.style.setProperty('--parallax-rotate-x', `${y * 0.35}deg`);
    layer.style.setProperty('--parallax-rotate-y', `${x * -0.35}deg`);
  };
  const resetBackground = (event: PointerEvent<HTMLElement>) => {
    const layer = event.currentTarget;
    layer.style.setProperty('--parallax-x', '0px');
    layer.style.setProperty('--parallax-y', '0px');
    layer.style.setProperty('--parallax-rotate-x', '0deg');
    layer.style.setProperty('--parallax-rotate-y', '0deg');
  };
  return <><section className="hero" style={heroStyle} onPointerMove={moveBackground} onPointerLeave={resetBackground}><div className="hero-eyebrow"><span className="tiny-dot"/> A SPACE TO LEARN. A PLACE TO GROW.</div><h1><span>MOHAN BABU</span><span>UNIVERSITY</span></h1><h2>Student Laboratory Portal</h2><p className="hero-description">Explore my academic laboratory experiments, student profile, and programming journey — all in one place.</p><div className="hero-actions"><Button size="lg" asChild><Link to="/lab">View Lab Experiments <ArrowRight/></Link></Button><Button size="lg" variant="secondary" asChild><Link to="/profile">My Profile <ArrowUpRight/></Link></Button></div><div className="hero-caption"><ShieldCheck size={12}/> Learning today. Innovating tomorrow.</div></section><div className="home-content"><section className="home-overview"><ProfileCard/><div className="lab-feature"><img src={laboratory} alt="Electronics and IoT equipment in a modern university laboratory" width={1536} height={1024} loading="lazy"/><div className="lab-feature-copy"><span className="eyebrow">CURIOSITY MEETS POSSIBILITY</span><h3>Small experiments.<br/>Big discoveries.</h3><p>Every experiment is a step forward.</p><Link to="/lab" className="text-link">Explore the laboratory <ArrowRight size={14}/></Link></div></div></section><section className="section-space"><SectionHeading eyebrow="LEARN. BUILD. DISCOVER." title="Inside the laboratory" text="A little theory. A lot of possibility." action={<Link to="/lab" className="text-link">View all experiments<ArrowRight size={14}/></Link>}/><div className="experiment-grid">{experiments.slice(0, 3).map((e, i) => <ExperimentCard key={e.id} experiment={e} index={i}/>)}</div>{experiments.some(e => e.demo) && <p className="demo-note">Sample experiments · Your own work can be added in the laboratory.</p>}</section><section className="section-space"><SectionHeading eyebrow="BEYOND THE CLASSROOM" title="My Digital Profiles" text="Connections, challenges, and a growing coding journey."/><div className="social-grid"><SocialCard platform="LinkedIn"/><SocialCard platform="GitHub"/></div></section></div></>;
}
