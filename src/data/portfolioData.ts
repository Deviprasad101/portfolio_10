export interface ProjectCaseStudy {
  id: string;
  issueNumber: string;
  category: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  outcome: string;
  contribution: string[];
  techStack: string[];
  architectureNodes: {
    stage: string;
    detail: string;
    tech: string;
  }[];
  blueprintAnnotations: {
    code: string;
    label: string;
    note: string;
  }[];
  /**
   * Supply exact project-specific URLs here when ready.
   * Left null by default rather than inventing unverified URLs.
   */
  liveUrl: string | null;
  repoUrl: string | null;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  shortOrg: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface SkillGroup {
  id: string;
  code: string;
  title: string;
  editorialNote: string;
  items: string[];
}

/**
 * SINGLE SOURCE OF TRUTH — Verified from Devi_Prasad_Full_Stack_Developer_Resume.pdf
 * and repository git configuration.
 *
 * CONFIGURATION NOTES FOR PUBLISHING:
 * 1. Portrait: Place your portrait photo at `public/portrait.jpg` (or update `portraitPath` below).
 * 2. LinkedIn: Cleaned from the PDF annotation (`deviprasad-reddy-chinthamreddy-759b2326b`); verify slug.
 * 3. Project URLs: Supply exact per-project `liveUrl` / `repoUrl` below if public links are available.
 */
export const PORTFOLIO_DATA = {
  identity: {
    fullName: 'Devi Prasad Chinthamreddy',
    firstName: 'Devi Prasad',
    lastName: 'Chinthamreddy',
    monogram: 'DPC',
    role: 'Full Stack Developer',
    editorialTagline:
      'Building full-stack web systems, REST APIs, and geospatial platforms—from pilgrimage route logistics to 3D PostGIS catalogs.',
    summary:
      'Full Stack Developer with professional experience building and supporting web applications using Python, FastAPI, Flask, REST APIs, PostgreSQL, JavaScript, and React.js. Hands-on experience with Git/GitHub, Docker, deployment, testing, debugging, and application optimization—with an active trajectory toward DevOps, cloud engineering, and Site Reliability Engineering.',
    location: 'Arlapadu, Pellakuru, Tirupati, Andhra Pradesh, India',
    shortLocation: 'Tirupati, Andhra Pradesh · India',
    coordinates: '13.6288° N, 79.4192° E',
    languages: ['English', 'Telugu'],
    /**
     * Drop your actual portrait image into `public/portrait.jpg` (or `.png` / `.webp` and update path).
     * When the file is present, EditorialPortrait automatically renders the art-directed cutout/plate.
     */
    portraitPath: '/portrait.jpg',
    resumePdfPath: '/Devi_Prasad_Full_Stack_Developer_Resume.pdf',
  },

  contact: {
    email: 'cdpreddyap@gmail.com',
    phone: '+91 6281604440',
    phoneRaw: '6281604440',
    githubUsername: 'deviprasad101',
    githubUrl: 'https://github.com/Deviprasad101',
    linkedinDisplay: 'Deviprasad Reddy Chinthamreddy',
    // Extracted from resume PDF annotation & sanitized of trailing FlowCV placeholder text
    linkedinUrl: 'https://www.linkedin.com/in/deviprasad-reddy-chinthamreddy-759b2326b',
    existingPortfolioUrl: 'https://deviprasad-portfolio.vercel.app',
  },

  about: {
    headline: 'Where backend rigor meets interactive spatial clarity.',
    leadParagraph:
      'Trained in Computer Science & Engineering (AI & ML) and sharpened in production at IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF), I build full-stack web applications that turn complex operational data into clear, dependable interfaces.',
    workingApproach: [
      {
        code: '01 // API-FIRST FOUNDATIONS',
        title: 'Clean relational schemas & resilient services',
        description:
          'Structuring Python services in FastAPI and Flask backed by well-indexed PostgreSQL and PostGIS queries so interfaces stay fast and predictable.',
      },
      {
        code: '02 // GEOSPATIAL & INTERACTIVE UI',
        title: 'Maps, routes, and 3D layers made legible',
        description:
          'Combining React.js, vanilla JS, Leaflet, OSRM, GeoServer, and Cesium to make multi-stop routing, rasters, vectors, and 3D spatial layers intuitive in the browser.',
      },
      {
        code: '03 // CONTAINERIZED RELIABILITY',
        title: 'Toward DevOps, Cloud & SRE',
        description:
          'Shipping with Git/GitHub version control, Docker containerization, systematic debugging, testing, and optimization with an engineering mindset oriented toward reliability.',
      },
    ],
  },

  experience: [
    {
      id: 'iittnif',
      role: 'Full Stack Developer',
      organization: 'IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)',
      shortOrg: 'IITTNiF · IIT Tirupati',
      period: '11/2025 – 09/2026',
      location: 'Tirupati, Andhra Pradesh',
      summary:
        'Full-stack application engineering, relational API integration, responsive UI delivery, and Dockerized deployment within IIT Tirupati’s technology innovation hub.',
      highlights: [
        'Developed full-stack web applications using Python, FastAPI, Flask, React.js, HTML, CSS, and JavaScript.',
        'Built and integrated REST APIs with PostgreSQL using structured SQL queries.',
        'Used Git and GitHub for version control while supporting testing, debugging, deployment, and application optimization.',
        'Implemented responsive web interfaces and used Docker for application containerization and deployment.',
      ],
      stack: [
        'Python',
        'FastAPI',
        'Flask',
        'React.js',
        'PostgreSQL',
        'SQL',
        'REST APIs',
        'HTML5 & CSS',
        'JavaScript',
        'Docker',
        'Git / GitHub',
      ],
    },
  ] satisfies ExperienceEntry[],

  projects: [
    {
      id: 'geo-trip-planner',
      issueNumber: 'CASE STUDY 01 // LOGISTICS & ROUTING',
      category: 'Geospatial Web Application · Route Optimization & QR Telemetry',
      title: 'Geo Trip Planner',
      subtitle:
        'A guided multi-stop Tirupati pilgrimage planner uniting budget-tiered packages, live OSRM map routing, temple QR check-ins, and an operational admin dashboard.',
      problem:
        'Pilgrims struggle to plan multi-stop Tirupati trips, pick the right budget tier, and track temple visits without a simple digital flow.',
      solution:
        'Built Geo Trip Planner with budget-based packages, an interactive place picker, live route mapping, personal temple QR check-in passes, and a centralized admin visit dashboard.',
      outcome:
        'Users plan multi-stop trips faster and share routes directly on the map, on-ground staff scan QR codes to log temple visits, and administrators inspect visitor flow data in one unified place.',
      contribution: [
        'Architected the Python Flask backend, session-based authentication, and relational persistence across PostgreSQL and SQLite.',
        'Integrated OpenStreetMap and OSRM routing with an interactive Leaflet map and place-picker workflow aligned to budget tiers.',
        'Built the personal QR check-in verification flow for temple staff alongside the administrative visit analytics view.',
      ],
      techStack: [
        'Python',
        'Flask',
        'HTML / CSS / JS',
        'Leaflet',
        'PostgreSQL / SQLite',
        'OpenStreetMap / OSRM',
        'Session-Based Auth',
      ],
      architectureNodes: [
        {
          stage: '01. INPUT & TIER',
          detail: 'Budget package selector + multi-stop temple place picker',
          tech: 'HTML / CSS / JS · Session Auth',
        },
        {
          stage: '02. SPATIAL ENGINE',
          detail: 'Turn-by-turn corridor computation & shareable map geometry',
          tech: 'Leaflet · OpenStreetMap · OSRM',
        },
        {
          stage: '03. FIELD CHECK-IN',
          detail: 'Personal QR token scan at temple checkpoints',
          tech: 'Flask Endpoints · QR Verification',
        },
        {
          stage: '04. ADMIN TELEMETRY',
          detail: 'Centralized visitor logs & checkpoint completion dashboard',
          tech: 'PostgreSQL / SQLite',
        },
      ],
      blueprintAnnotations: [
        {
          code: 'OSRM // ROUTE_GRAPH',
          label: 'Corridor Waypoint Solver',
          note: 'Computes road segments across selected Tirupati stops via OpenStreetMap + OSRM.',
        },
        {
          code: 'AUTH // QR_CHECKIN',
          label: 'Session-Bound Visit Token',
          note: 'Links authenticated pilgrim itinerary to staff scan verification logs.',
        },
        {
          code: 'DB // VISIT_LEDGER',
          label: 'PostgreSQL / SQLite Store',
          note: 'Persists package tiers, selected stops, and timestamped QR scan events.',
        },
      ],
      liveUrl: null, // CONFIGURE: e.g. 'https://your-geo-trip-planner-url.app'
      repoUrl: null, // CONFIGURE: e.g. 'https://github.com/Deviprasad101/geo-trip-planner'
    },
    {
      id: 'geo-intel-meta-hub',
      issueNumber: 'CASE STUDY 02 // SPATIAL DATA INFRASTRUCTURE',
      category: '2D/3D Geospatial Catalog · PostGIS, GeoServer & Cesium',
      title: 'Geo Intel Meta Hub',
      subtitle:
        'A unified geospatial ingestion and publishing platform turning scattered vectors, rasters, LiDAR (LAS), and 3D assets into searchable WMS/WFS and Cesium globe layers.',
      problem:
        'Scattered geospatial data—spanning vectors, rasters, LAS point clouds, and 3D models—is difficult to store, standardize, publish, and inspect in one place.',
      solution:
        'Engineered a Flask ingestion pipeline that uploads raw spatial files into PostGIS and GeoServer, paired with a unified web interface for metadata search, 2D maps, and 3D globe rendering.',
      outcome:
        'Delivers a central spatial catalog with OGC-compliant WMS/WFS services alongside raster and 3D previews so teams discover, inspect, and serve layers from a single platform.',
      contribution: [
        'Built the Python/Flask upload and processing pipeline leveraging GDAL, PDAL, and ogr2ogr for multi-format spatial translation.',
        'Configured PostgreSQL/PostGIS storage and automated publishing workflows into GeoServer for WMS and WFS layer delivery.',
        'Developed the unified HTML/JS catalog search interface and integrated Cesium for interactive 3D spatial previewing.',
      ],
      techStack: [
        'Python / Flask',
        'PostgreSQL / PostGIS',
        'GeoServer (WMS / WFS)',
        'GDAL / PDAL / ogr2ogr',
        'HTML / JS',
        'Cesium 3D',
      ],
      architectureNodes: [
        {
          stage: '01. MULTI-FORMAT INGEST',
          detail: 'Upload vectors, GeoTIFF rasters, LAS point clouds & 3D files',
          tech: 'Flask Upload Pipeline',
        },
        {
          stage: '02. SPATIAL TRANSLATION',
          detail: 'CRS normalization, vector/raster conversion & point-cloud parsing',
          tech: 'GDAL · PDAL · ogr2ogr',
        },
        {
          stage: '03. CATALOG & OGC SERVE',
          detail: 'Spatial indexing & standardized WMS / WFS layer publishing',
          tech: 'PostgreSQL / PostGIS · GeoServer',
        },
        {
          stage: '04. 2D / 3D DISCOVERY UI',
          detail: 'Metadata search, layer preview & interactive 3D globe',
          tech: 'HTML / JS · Cesium',
        },
      ],
      blueprintAnnotations: [
        {
          code: 'ETL // GDAL_PDAL',
          label: 'Spatial Format Normalizer',
          note: 'Processes vectors (ogr2ogr), rasters (GDAL), and LAS LiDAR data (PDAL) on ingest.',
        },
        {
          code: 'OGC // WMS_WFS',
          label: 'GeoServer + PostGIS Core',
          note: 'Exposes spatial tables and rasters as standardized web map & feature services.',
        },
        {
          code: 'VIEW // CESIUM_3D',
          label: '3D Globe & Layer Inspector',
          note: 'Streams cataloged terrain, 3D tiles, and WMS overlays inside browser viewport.',
        },
      ],
      liveUrl: null, // CONFIGURE: e.g. 'https://your-geo-intel-hub-url.app'
      repoUrl: null, // CONFIGURE: e.g. 'https://github.com/Deviprasad101/geo-intel-meta-hub'
    },
  ] satisfies ProjectCaseStudy[],

  skillGroups: [
    {
      id: 'backend',
      code: 'SYS.01',
      title: 'Backend & API Architecture',
      editorialNote: 'Service layer design, request validation, session auth, and RESTful integration.',
      items: ['Python', 'FastAPI', 'Flask', 'REST APIs'],
    },
    {
      id: 'frontend',
      code: 'SYS.02',
      title: 'Frontend & Interactive Mapping UI',
      editorialNote: 'Responsive interfaces alongside 2D/3D browser cartography applied in projects.',
      items: ['JavaScript', 'React.js', 'HTML5', 'CSS', 'Leaflet (Project)', 'Cesium (Project)'],
    },
    {
      id: 'data',
      code: 'SYS.03',
      title: 'Relational & Geospatial Data Systems',
      editorialNote: 'Structured SQL queries, spatial indexing, and OGC geospatial pipelines.',
      items: [
        'SQL',
        'PostgreSQL',
        'PostGIS (Project)',
        'SQLite (Project)',
        'GeoServer (Project)',
        'GDAL / PDAL / ogr2ogr (Project)',
      ],
    },
    {
      id: 'devops',
      code: 'SYS.04',
      title: 'Containerization, Delivery & Reliability',
      editorialNote: 'Version control, reproducible containers, testing, debugging, and Cloud/SRE focus.',
      items: ['Docker', 'Git', 'GitHub', 'Deployment & Optimization', 'Testing & Debugging'],
    },
    {
      id: 'ai-workflow',
      code: 'SYS.05',
      title: 'AI-Assisted Engineering Workflow',
      editorialNote: 'High-velocity coding, architectural exploration, UI prototyping, and systematic debugging.',
      items: ['Cursor', 'Antigravity', 'VS Code', 'Claude AI', 'ChatGPT', 'Stitch'],
    },
    {
      id: 'collaboration',
      code: 'SYS.06',
      title: 'Collaboration & Communication',
      editorialNote: 'Cross-functional teamwork across technical and field stakeholders.',
      items: [
        'Written & Verbal Communication',
        'Analytical Problem-Solving',
        'Teamwork & Collaboration',
        'English & Telugu',
      ],
    },
  ] satisfies SkillGroup[],

  education: [
    {
      degree: 'B.Tech — Computer Science & Engineering (AI & ML)',
      institution: 'Malla Reddy Engineering College',
      location: 'Hyderabad, India',
      period: '2021 – 2025',
      score: '7.06 CGPA',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Viswa Sai Junior College',
      location: 'Nellore, Andhra Pradesh',
      period: '2020 – 2021',
      score: '7.17 CGPA',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Narayana',
      location: 'Nellore, Andhra Pradesh',
      period: '2018 – 2019',
      score: '8.3 CGPA',
    },
  ] satisfies EducationEntry[],
} as const;

