export const CRUD_PAGE_SIZE = 5;

export const PERSON_ROLES = [
  'Engineer',
  'Admiral',
  'Mathematician',
  'Inventor',
  'Researcher',
  'Cryptographer',
] as const;

export type PersonStatus = 'active' | 'away';

export interface PersonRow {
  id: string;
  name: string;
  role: string;
  status: PersonStatus;
  email: string;
  joined: string;
  skills: string[];
  notes: string;
  progress: number;
}

export const CRUD_SEED: PersonRow[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    role: 'Engineer',
    status: 'active',
    email: 'ada@example.com',
    joined: '1843-10-01',
    skills: ['analytics', 'algorithms'],
    notes: 'First published algorithm for a computer.',
    progress: 92,
  },
  {
    id: '2',
    name: 'Grace Hopper',
    role: 'Admiral',
    status: 'active',
    email: 'grace@example.com',
    joined: '1944-06-01',
    skills: ['compilers', 'cobol'],
    notes: 'Led early compiler research.',
    progress: 88,
  },
  {
    id: '3',
    name: 'Katherine Johnson',
    role: 'Mathematician',
    status: 'away',
    email: 'katherine@example.com',
    joined: '1953-06-01',
    skills: ['orbital', 'navigation'],
    notes: 'Trajectory analysis for crewed missions.',
    progress: 95,
  },
  {
    id: '4',
    name: 'Margaret Hamilton',
    role: 'Engineer',
    status: 'active',
    email: 'margaret@example.com',
    joined: '1965-02-01',
    skills: ['apollo', 'reliability'],
    notes: 'Coined “software engineering”.',
    progress: 90,
  },
  {
    id: '5',
    name: 'Radia Perlman',
    role: 'Inventor',
    status: 'active',
    email: 'radia@example.com',
    joined: '1980-09-01',
    skills: ['networking', 'spanning-tree'],
    notes: 'STP and network resilience work.',
    progress: 86,
  },
  {
    id: '6',
    name: 'Barbara Liskov',
    role: 'Researcher',
    status: 'away',
    email: 'barbara@example.com',
    joined: '1972-11-01',
    skills: ['abstraction', 'types'],
    notes: 'Liskov substitution principle.',
    progress: 91,
  },
  {
    id: '7',
    name: 'Shafi Goldwasser',
    role: 'Cryptographer',
    status: 'active',
    email: 'shafi@example.com',
    joined: '1983-01-01',
    skills: ['crypto', 'complexity'],
    notes: 'Zero-knowledge proofs.',
    progress: 84,
  },
  {
    id: '8',
    name: 'Frances Allen',
    role: 'Researcher',
    status: 'active',
    email: 'frances@example.com',
    joined: '1966-07-01',
    skills: ['compilers', 'optimization'],
    notes: 'Pioneer in optimizing compilers.',
    progress: 87,
  },
  {
    id: '9',
    name: 'Mary Allen Wilkes',
    role: 'Engineer',
    status: 'away',
    email: 'mary@example.com',
    joined: '1959-05-01',
    skills: ['lisp', 'systems'],
    notes: 'Early personal computing work.',
    progress: 80,
  },
];
