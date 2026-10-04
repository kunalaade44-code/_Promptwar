import { 
  Search, 
  Brain, 
  Compass, 
  PenLine, 
  Cpu, 
  ScanEye, 
  CheckCircle2 
} from 'lucide-react';

export const HERO_CONTENT = {
  badge: 'AI-Powered Critical Thinking',
  titleHighlight: 'See Beyond',
  titleMain: 'What You Think.',
  description: 'Every decision has a blind spot. Discover what you might be missing with AI-powered critical thinking.',
  primaryCTA: 'Start Thinking Clearly',
  secondaryCTA: 'Explore How It Works',
  trustPoints: [
    'Zero bias, pure objective analysis',
    'Private & confidential reasoning'
  ]
};

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: '/images/slide1-discovery.jpg',
    tag: 'Factor Discovery',
    title: 'Discover What You Might Be Missing.',
    description: 'Uncover overlooked factors that could change how you see a decision.',
    alt: 'AI neural connections discovering hidden ideas and overlooked factors'
  },
  {
    id: 2,
    image: '/images/slide2-assumptions.jpg',
    tag: 'Assumption Analysis',
    title: 'Challenge the Obvious.',
    description: 'Explore assumptions and consider perspectives beyond your first impression.',
    alt: 'Optical prism refracting light representing alternative perspectives and challenging assumptions'
  },
  {
    id: 3,
    image: '/images/slide3-pathways.jpg',
    tag: 'Decision Pathways',
    title: 'Think Deeper. Decide Smarter.',
    description: 'Ask better questions and understand the trade-offs behind your choices.',
    alt: 'Illuminated pathways and branching possibilities in thoughtful decision making'
  }
];

export const OVERVIEW_CONTENT = {
  badge: 'Core Capabilities',
  heading: 'Your Decisions Deserve a Second Perspective.',
  subheading: 'We often make decisions based on what stands out first. But what about the factors we overlook?',
  cards: [
    {
      id: 'uncover',
      icon: Search,
      title: 'Uncover Blind Spots',
      description: 'Identify potentially overlooked factors, missing information, and hidden considerations in your reasoning.',
      stepNumber: 'FEATURE 01',
      accentColor: 'blue'
    },
    {
      id: 'challenge',
      icon: Brain,
      title: 'Challenge Assumptions',
      description: 'Examine beliefs and assumptions that may influence your decisions without sufficient evidence.',
      stepNumber: 'FEATURE 02',
      accentColor: 'indigo'
    },
    {
      id: 'perspectives',
      icon: Compass,
      title: 'Explore New Perspectives',
      description: 'Discover alternative viewpoints, possible risks, and thoughtful questions that encourage deeper reflection.',
      stepNumber: 'FEATURE 03',
      accentColor: 'cyan'
    }
  ]
};

export const HOW_IT_WORKS_CONTENT = {
  badge: 'Process & Methodology',
  heading: 'A Smarter Way to Think Through Decisions.',
  subheading: 'Turn uncertainty into clarity through a simple, guided thinking process.',
  ctaHeading: 'Ready to reveal what you might be missing?',
  ctaSubheading: 'Gain clarity and discover critical perspectives on your most important decision today.',
  ctaButtonText: 'Start Your Analysis',
  steps: [
    {
      number: '01',
      icon: PenLine,
      title: 'Share Your Decision',
      description: "Describe the decision you're facing, your reasoning, priorities, and concerns."
    },
    {
      number: '02',
      icon: Cpu,
      title: 'AI Examines Your Thinking',
      description: 'Our AI analyzes your reasoning to identify possible assumptions, missing factors, and conflicting priorities.'
    },
    {
      number: '03',
      icon: ScanEye,
      title: 'Discover Your Blind Spots',
      description: 'Explore potential risks, alternative perspectives, and important questions you may not have considered.'
    },
    {
      number: '04',
      icon: CheckCircle2,
      title: 'Reflect and Decide',
      description: 'Use these insights to examine your options and make your own informed decision.'
    }
  ]
};

export const FOOTER_CONTENT = {
  brandName: 'GuruDev',
  description: 'Helping you see beyond the obvious and think more critically.',
  tagline: 'Think beyond the obvious.',
  copyright: '© 2026 GuruDev. All rights reserved.',
  exploreLinks: [
    { name: 'Overview', targetId: 'overview' },
    { name: 'How It Works', targetId: 'how-it-works' }
  ],
  accountLinks: [
    { name: 'Log In', mode: 'login' },
    { name: 'Sign Up', mode: 'signup' }
  ]
};
