import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, SocialCard } from '@/components/portal/shared';
import { pageHead } from '@/data/portal';
export const Route = createFileRoute('/social')({ head: () => pageHead('My Digital Profiles', 'Connect professionally on LinkedIn and explore the coding journey on LeetCode.'), component: SocialPage });
function SocialPage() { return <div className="page-content social-page"><PageHeading eyebrow="BEYOND THE CLASSROOM" title="My Digital Profiles" subtitle="Connect, collaborate, and follow my coding journey."/><div className="social-grid"><SocialCard platform="LinkedIn"/><SocialCard platform="LeetCode"/></div></div>; }
