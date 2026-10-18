import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  MapPin,
  ThumbsUp,
  ArrowRight,
  ExternalLink,
  Hash,
  FileText,
  UploadCloud,
  Check,
  ChevronDown,
  Lock,
  RefreshCw,
  Eye,
  Share2,
  Layers,
  Cpu,
  Database,
  Award,
  Info,
  BookOpen,
  Video,
  Code,
  HelpCircle,
  X,
  Compass,
  Radio,
  Sparkles,
  ChevronRight,
  Fingerprint,
  Calendar,
  Building2,
  CheckCircle,
  Copy,
  ArrowUpRight,
  Activity,
  SlidersHorizontal,
  Flame,
  FileCheck2,
  Radar,
  Workflow,
  Network,
  Camera,
  Maximize2,
  ImageIcon
} from 'lucide-react';

// --- TYPES ---
type PageType = 'landing' | 'discover' | 'draft' | 'digilocker' | 'track' | 'know_more';

interface Complaint {
  id: string;
  hashId: string;
  title: string;
  category: string;
  description: string;
  locality: string;
  ward: string;
  distanceKm: number;
  upvotes: number;
  hasUpvoted?: boolean;
  status: 'Pending' | 'Municipal Verified' | 'Action Assigned' | 'Resolved';
  stageIndex: number; // 1 to 4
  timestamp: string;
  blockNumber: number;
  txHash: string;
  ipfsCid: string;
  verifiedCitizen: boolean;
  assignedDept?: string;
  contractorName?: string;
  resolutionTimeExpected?: string;
  resolutionProofCid?: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  imageUrl: string;
  imageCaption: string;
  photoEvidenceMeta?: {
    camera: string;
    fileSize: string;
    sha256Proof: string;
  };
}

// --- CURATED REAL CIVIC PROBLEMS PHOTOGRAPHY REPOSITORY ---
const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'c1',
    hashId: 'DPN-2026-09841',
    title: 'Severe Arterial Crater & Waterlogging at Outer Ring Flyover Junction',
    category: 'Roads & Infrastructure',
    description: 'Deep 1.2-meter hazardous pothole exposed near pillar 42 causing traffic bottlenecks, bike skids, and rim damage during evening rush hour.',
    locality: 'Indiranagar Sector 4, Metro Pillar 42',
    ward: 'Ward 82 (East Zone)',
    distanceKm: 2.4,
    upvotes: 384,
    status: 'Resolved',
    stageIndex: 4,
    timestamp: '2026-10-12 14:22 UTC',
    blockNumber: 20489110,
    txHash: '0x9d4a6f8b1c2e3d5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a',
    ipfsCid: 'ipfs://bafybeihdwdcefgh4dqkjv5gafv5mxe3ox23mkvq7e6x2v5x',
    verifiedCitizen: true,
    assignedDept: 'PWD Public Works Division IV',
    contractorName: 'Apex Infra Concessions Ltd.',
    resolutionTimeExpected: 'Completed within 48h SLA',
    resolutionProofCid: 'ipfs://bafybeifastrepairproof847293xvmqe',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Deep asphalt surface cavitation with dislodged aggregate stone ballast across primary commuting carriageway.',
    photoEvidenceMeta: {
      camera: 'Citizen Mobile Sensor (48MP, f/1.8)',
      fileSize: '4.2 MB RAW',
      sha256Proof: '7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a'
    }
  },
  {
    id: 'c2',
    hashId: 'DPN-2026-04128',
    title: 'Contaminated Industrial Effluent Leak into Potable Storm Pipeline',
    category: 'Water Supply',
    description: 'Chemical discharge with pungent odor seeping from adjacent fabrication unit into domestic drinking water sub-feeder line.',
    locality: 'Peenya Industrial Area Stage II',
    ward: 'Ward 14 (North Zone)',
    distanceKm: 4.8,
    upvotes: 612,
    status: 'Action Assigned',
    stageIndex: 3,
    timestamp: '2026-10-15 09:14 UTC',
    blockNumber: 20490455,
    txHash: '0x3f8a1c9e2b4d6f8a0b2c4e6f8a0b2c4e6f8a0b2c4e6f8a0b2c4e6f8a0b2c4e6f',
    ipfsCid: 'ipfs://bafybeiaqwe4939vkxnxkweq09812487192837498127398',
    verifiedCitizen: true,
    assignedDept: 'Pollution Control & Water Quality Board',
    contractorName: 'HydroSafe Rapid Remediation Taskforce',
    resolutionTimeExpected: 'Inspection underway; valve isolation active',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Effluent surface puddling with persistent iridescent chemical residue near municipal drinking distribution valve.',
    photoEvidenceMeta: {
      camera: 'Handheld Inspector Camera (24mm, f/2.2)',
      fileSize: '5.8 MB JPEG',
      sha256Proof: '8a0b2c4e6f8a0b2c4e6f8a0b2c4e6f8a0b2c4e6f'
    }
  },
  {
    id: 'c3',
    hashId: 'DPN-2026-11892',
    title: 'Overflowing Secondary Garbage Transfer Dumpster & Vector Infestation',
    category: 'Sanitation & Waste',
    description: 'Solid waste uncollected for 5 days. Bio-hazard leachate pooling near public elementary school pedestrian crosswalk.',
    locality: 'Gandhi Bazaar Cross, Basavanagudi',
    ward: 'Ward 154 (South Zone)',
    distanceKm: 8.1,
    upvotes: 195,
    status: 'Municipal Verified',
    stageIndex: 2,
    timestamp: '2026-10-16 11:30 UTC',
    blockNumber: 20491820,
    txHash: '0x7b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c',
    ipfsCid: 'ipfs://bafybeih678912345abcdef123456789abcdef123456789abcdef12345',
    verifiedCitizen: true,
    assignedDept: 'Solid Waste Management Cell',
    resolutionTimeExpected: 'Escalated to Zonal Supervisor. Dispatch scheduled.',
    severity: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Decomposed organic and non-segregated refuse spilling 6 meters onto public pedestrian footpath.',
    photoEvidenceMeta: {
      camera: 'Citizen Field Device (35mm)',
      fileSize: '3.6 MB JPEG',
      sha256Proof: '3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c'
    }
  },
  {
    id: 'c4',
    hashId: 'DPN-2026-15403',
    title: 'Dangerous High-Tension Wire Sagging Over Residential Children Park',
    category: 'Power & Grid',
    description: 'Snapped tension insulator causing 11kV distribution line to hang just 2.4m above playground swings.',
    locality: 'Koramangala 5th Block, 80 Feet Road',
    ward: 'Ward 151 (Central Zone)',
    distanceKm: 12.0,
    upvotes: 840,
    status: 'Pending',
    stageIndex: 1,
    timestamp: '2026-10-17 01:45 UTC',
    blockNumber: 20492194,
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    ipfsCid: 'ipfs://bafybeicwirehazardsafetynet9812739182379182739182739',
    verifiedCitizen: true,
    assignedDept: 'Awaiting Municipal Dispatch Routing',
    resolutionTimeExpected: 'SLA countdown: 24h remaining for triage',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Structural sag on overhead cable cluster between distribution poles #14 and #15.',
    photoEvidenceMeta: {
      camera: 'Telephoto Zoom Lens (85mm, f/2.8)',
      fileSize: '6.1 MB RAW',
      sha256Proof: '0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e'
    }
  },
  {
    id: 'c5',
    hashId: 'DPN-2026-18934',
    title: 'Illegal Commercial Encroachment on Footpath & Disabled Blind Tactile Paving',
    category: 'Public Safety',
    description: 'Permanent metal shed and debris constructed on pedestrian walkway completely blocking wheelchair and tactile guiding tiles.',
    locality: 'Commercial Street West End',
    ward: 'Ward 110 (Central Zone)',
    distanceKm: 3.2,
    upvotes: 278,
    status: 'Municipal Verified',
    stageIndex: 2,
    timestamp: '2026-10-14 16:10 UTC',
    blockNumber: 20489912,
    txHash: '0x88e1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1',
    ipfsCid: 'ipfs://bafybeifootpathblocked7291837198273918273918273',
    verifiedCitizen: true,
    assignedDept: 'Town Planning & Enforcement Squad',
    resolutionTimeExpected: 'Notice issued under Section 288A',
    severity: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Extensive brickwork and steel frames obstructing yellow universal access paving.',
    photoEvidenceMeta: {
      camera: 'Citizen Field Sensor (26mm)',
      fileSize: '4.5 MB JPEG',
      sha256Proof: '7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d'
    }
  },
  {
    id: 'c6',
    hashId: 'DPN-2026-20194',
    title: 'Unfunctioning Streetlights along 1.5km Stretch of Ring Road Corridor',
    category: 'Power & Grid',
    description: '14 consecutive LED light poles down for 2 weeks, leading to safety concerns for female night-shift commuters and pedestrians.',
    locality: 'Whitefield Main Road, Near ITPL Gate 2',
    ward: 'Ward 84 (East Zone)',
    distanceKm: 18.5,
    upvotes: 450,
    status: 'Action Assigned',
    stageIndex: 3,
    timestamp: '2026-10-13 18:40 UTC',
    blockNumber: 20489500,
    txHash: '0x5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d',
    ipfsCid: 'ipfs://bafybeistreetlightoutage84729182739182739182739',
    verifiedCitizen: true,
    assignedDept: 'Electrical Services Wing',
    contractorName: 'Lumina Smart Urban Maintenance JV',
    resolutionTimeExpected: 'Cable fault located; transformer replacement in progress',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Complete night illumination outage documented across four consecutive street spans.',
    photoEvidenceMeta: {
      camera: 'Night Sight Sensor (f/1.7, ISO 1600)',
      fileSize: '5.1 MB RAW',
      sha256Proof: '5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a'
    }
  }
];

// Curated preset sample evidence photos for drafting complaints
const PRESET_EVIDENCE_PHOTOS = [
  {
    title: 'Pothole & Road Crater',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Asphalt cavity with surface breakdown'
  },
  {
    title: 'Water Pipe Leakage',
    url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Water main rupture & street ponding'
  },
  {
    title: 'Solid Waste Overflow',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80',
    caption: 'Uncollected refuse spilling on sidewalk'
  },
  {
    title: 'Dangling Power Line',
    url: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80',
    caption: 'Low clearance electrical wire hazard'
  },
  {
    title: 'Sidewalk Encroachment',
    url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
    caption: 'Broken pavement & commercial blockage'
  }
];

export default function App() {
  // Navigation / Routing state
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [myComplaintDropdownOpen, setMyComplaintDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Complaints state
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);

  // Discover filter & search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRadius, setSelectedRadius] = useState('All'); // 'All' | '5km' | '10km' | '100km'
  const [sortBy, setSortBy] = useState<'upvotes' | 'recent' | 'distance'>('upvotes');

  // Draft Form State
  const [draftCategory, setDraftCategory] = useState('Roads & Infrastructure');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [draftLocality, setDraftLocality] = useState('');
  const [draftWard, setDraftWard] = useState('Ward 82 (East Zone)');
  const [draftSeverity, setDraftSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [draftFileName, setDraftFileName] = useState('');
  const [draftIpfsHash, setDraftIpfsHash] = useState('');
  const [draftSelectedPhotoUrl, setDraftSelectedPhotoUrl] = useState(PRESET_EVIDENCE_PHOTOS[0].url);
  const [draftSelectedPhotoCaption, setDraftSelectedPhotoCaption] = useState(PRESET_EVIDENCE_PHOTOS[0].caption);
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [gpsDetected, setGpsDetected] = useState(false);

  // DigiLocker & Hash Generation State
  const [activeDraftForHash, setActiveDraftForHash] = useState<{
    title: string;
    category: string;
    locality: string;
    ward: string;
    description: string;
    ipfsCid: string;
    imageUrl: string;
    imageCaption: string;
  } | null>(null);

  const [digilockerAgreed, setDigilockerAgreed] = useState(false);
  const [isVerifyingDigilocker, setIsVerifyingDigilocker] = useState(false);
  const [mintedHashResult, setMintedHashResult] = useState<{
    hashId: string;
    txHash: string;
    blockNumber: number;
    timestamp: string;
    title: string;
  } | null>(null);

  // Track progress state
  const [trackSearchInput, setTrackSearchInput] = useState('DPN-2026-09841');
  const [activeTrackedComplaint, setActiveTrackedComplaint] = useState<Complaint | null>(INITIAL_COMPLAINTS[0]);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [smartContractModalOpen, setSmartContractModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [videosModalOpen, setVideosModalOpen] = useState(false);

  // Photo Lightbox modal state
  const [inspectedPhoto, setInspectedPhoto] = useState<{
    url: string;
    title: string;
    caption: string;
    locality?: string;
    hashId?: string;
    meta?: {
      camera: string;
      fileSize: string;
      sha256Proof: string;
    };
  } | null>(null);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2200);
  };

  // Upvote handler
  const handleToggleUpvote = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const hasUpvoted = !!c.hasUpvoted;
          return {
            ...c,
            upvotes: hasUpvoted ? c.upvotes - 1 : c.upvotes + 1,
            hasUpvoted: !hasUpvoted
          };
        }
        return c;
      })
    );
  };

  // Switch page helper
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setMyComplaintDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle GPS detection
  const handleDetectGPS = () => {
    setGpsDetecting(true);
    setTimeout(() => {
      setGpsDetecting(false);
      setGpsDetected(true);
      setDraftLocality('12.9716° N, 77.5946° E • MG Road Metro Corridor');
      setDraftWard('Ward 111 (Central Zone)');
    }, 1200);
  };

  // Handle Draft submission -> redirect to DigiLocker page
  const handleProceedToAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedIpfs = draftIpfsHash || `ipfs://bafybeig${Math.random().toString(36).substring(2, 10)}${Date.now()}`;
    const payload = {
      title: draftTitle || 'Severe Municipal Infrastructure Degradation on Pedestrian Corridor',
      category: draftCategory,
      locality: draftLocality || 'MG Road Central Corridor',
      ward: draftWard,
      description: draftDescription || 'Urgent civic issue submitted via Darpan client node for zero-knowledge citizen verification and on-chain timestamping.',
      ipfsCid: generatedIpfs,
      imageUrl: draftSelectedPhotoUrl || PRESET_EVIDENCE_PHOTOS[0].url,
      imageCaption: draftSelectedPhotoCaption || 'Field photographic evidence recorded by citizen device'
    };
    setActiveDraftForHash(payload);
    setMintedHashResult(null);
    setDigilockerAgreed(false);
    navigateTo('digilocker');
  };

  // Handle DigiLocker external trigger + on-chain hash minting
  const handleConfirmDigiLocker = () => {
    if (!digilockerAgreed) return;

    // Strict requirement: open digilocker in new tab
    window.open('https://www.digilocker.gov.in/', '_blank');

    setIsVerifyingDigilocker(true);

    setTimeout(() => {
      setIsVerifyingDigilocker(false);
      const randomHex = Math.floor(10000 + Math.random() * 90000);
      const newHashId = `DPN-2026-${randomHex}`;
      const newTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newBlock = 20492200 + Math.floor(Math.random() * 150);

      const targetTitle = activeDraftForHash ? activeDraftForHash.title : (draftTitle || 'Civic Infrastructure Redressal Log');
      const targetCategory = activeDraftForHash ? activeDraftForHash.category : draftCategory;
      const targetLocality = activeDraftForHash ? activeDraftForHash.locality : (draftLocality || 'Ward 82 Municipal Grid');
      const targetWard = activeDraftForHash ? activeDraftForHash.ward : draftWard;
      const targetDesc = activeDraftForHash ? activeDraftForHash.description : (draftDescription || 'Civic issue verified through DigiLocker sovereign citizen node.');
      const targetCid = activeDraftForHash ? activeDraftForHash.ipfsCid : `ipfs://bafybeih${Math.random().toString(36).substring(2, 12)}`;
      const targetImg = activeDraftForHash?.imageUrl || draftSelectedPhotoUrl || PRESET_EVIDENCE_PHOTOS[0].url;
      const targetCaption = activeDraftForHash?.imageCaption || 'Citizen photographic submission verified on-chain';

      const newRecord: Complaint = {
        id: `c-user-${Date.now()}`,
        hashId: newHashId,
        title: targetTitle,
        category: targetCategory,
        description: targetDesc,
        locality: targetLocality,
        ward: targetWard,
        distanceKm: 1.1,
        upvotes: 1,
        hasUpvoted: true,
        status: 'Pending',
        stageIndex: 1,
        timestamp: 'Just now (Block confirmed)',
        blockNumber: newBlock,
        txHash: newTxHash,
        ipfsCid: targetCid,
        verifiedCitizen: true,
        assignedDept: 'Awaiting Zonal Municipal Dispatch',
        resolutionTimeExpected: 'SLA countdown: 72h standard turnaround',
        severity: draftSeverity,
        imageUrl: targetImg,
        imageCaption: targetCaption,
        photoEvidenceMeta: {
          camera: 'Citizen DigiLocker Device (GPS Sealed)',
          fileSize: '4.8 MB RAW',
          sha256Proof: newTxHash.substring(0, 42)
        }
      };

      setComplaints((prev) => [newRecord, ...prev]);

      setMintedHashResult({
        hashId: newHashId,
        txHash: newTxHash,
        blockNumber: newBlock,
        timestamp: '2026-10-17 03:00 UTC',
        title: targetTitle
      });

      // Also set as active for tracking
      setActiveTrackedComplaint(newRecord);
      setTrackSearchInput(newHashId);
    }, 1600);
  };

  // Filtered complaints for discover page
  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hashId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      let matchesRadius = true;
      if (selectedRadius === '5km') matchesRadius = item.distanceKm <= 5;
      else if (selectedRadius === '10km') matchesRadius = item.distanceKm <= 10;
      else if (selectedRadius === '100km') matchesRadius = item.distanceKm <= 100;

      return matchesSearch && matchesCategory && matchesRadius;
    }).sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return b.blockNumber - a.blockNumber; // recent
    });
  }, [complaints, searchQuery, selectedCategory, selectedRadius, sortBy]);

  // Handle Track Search
  const handleExecuteTrack = (targetId?: string) => {
    const query = (targetId || trackSearchInput).trim().toUpperCase();
    const found = complaints.find(
      (c) => c.hashId.toUpperCase() === query || c.hashId.toUpperCase().includes(query)
    );
    if (found) {
      setActiveTrackedComplaint(found);
      setTrackSearchInput(found.hashId);
    } else {
      // Create on-the-fly demo match for realistic experience
      const simulated: Complaint = {
        id: `sim-${Date.now()}`,
        hashId: query.startsWith('DPN-') ? query : `DPN-2026-${query}`,
        title: 'Municipal Water Distribution Sensor Malfunction',
        category: 'Water Supply',
        description: 'Verified on-chain telemetry anomaly logged via Ward municipal node telemetry quorum.',
        locality: 'Station Road Ward Grid 4',
        ward: 'Ward 44 (Central)',
        distanceKm: 3.5,
        upvotes: 42,
        status: 'Municipal Verified',
        stageIndex: 2,
        timestamp: '2026-10-16 08:30 UTC',
        blockNumber: 20491024,
        txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
        ipfsCid: 'ipfs://bafybeihtelemetryfaultreport8491823719823',
        verifiedCitizen: true,
        assignedDept: 'Water Board Rapid Audit',
        resolutionTimeExpected: 'Technician dispatched to inspection chamber',
        severity: 'Medium',
        imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Telemetry flowmeter anomaly and road cavity inspection photo.',
        photoEvidenceMeta: {
          camera: 'Municipal Field Sensor (GPS Attached)',
          fileSize: '3.8 MB JPEG',
          sha256Proof: '4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e'
        }
      };
      setActiveTrackedComplaint(simulated);
      setComplaints((prev) => [simulated, ...prev]);
    }
  };

  // Advance stage helper for interactive demonstration
  const handleAdvanceStage = () => {
    if (!activeTrackedComplaint) return;
    const nextStage = activeTrackedComplaint.stageIndex < 4 ? activeTrackedComplaint.stageIndex + 1 : 1;
    const statusMap: Record<number, Complaint['status']> = {
      1: 'Pending',
      2: 'Municipal Verified',
      3: 'Action Assigned',
      4: 'Resolved'
    };
    const updated: Complaint = {
      ...activeTrackedComplaint,
      stageIndex: nextStage,
      status: statusMap[nextStage]
    };
    setActiveTrackedComplaint(updated);
    setComplaints((prev) => prev.map((c) => (c.hashId === updated.hashId ? updated : c)));
  };

  return (
    <div className="relative min-h-screen bg-[#F8F5EE] text-[#1A1F18] flex flex-col font-sans selection:bg-[#E8DCC8] selection:text-[#1A1F18] overflow-x-hidden">
      
      {/* =========================================================================
          PERSISTENT TOP NAVIGATION BAR (WITH DISTINGUISHED RED LOGO)
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F8F5EE]/95 border-b border-[#E2D9C8] transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          
          {/* 1. Brand Logo: ALL LOGOS RED AS DIRECTED */}
          <div 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* The primary Darpan shield logo in bold red */}
            <div className="w-11 h-11 rounded-2xl bg-[#DC2626] border border-[#B91C1C] flex items-center justify-center shadow-[0_4px_16px_rgba(220,38,38,0.28)] group-hover:bg-[#B91C1C] transition-all duration-300">
              <Shield className="w-6 h-6 text-white stroke-[2.2] transform group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold tracking-tight text-xl sm:text-2xl text-[#1A1F18] font-serif">Darpan</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#FEF2F2] text-[#DC2626] border border-[#FCA5A5] font-mono">
                  REGISTRY
                </span>
              </div>
              <p className="text-[12px] text-[#6B7264] font-medium tracking-tight hidden sm:block">
                Public Civic Transparency Gazette
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links with generous spacing */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 text-xs lg:text-sm font-medium">
            
            {/* Direct Link: DISCOVER -> Page 2 */}
            <button
              onClick={() => navigateTo('discover')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                currentPage === 'discover'
                  ? 'text-[#1A1F18] bg-white border border-[#D5CABB] shadow-sm font-bold'
                  : 'text-[#596353] hover:text-[#1A1F18] hover:bg-[#EFEAE0]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#4B5842]" />
              <span>DISCOVER</span>
            </button>

            {/* Interactive Dropdown: MY COMPLAINT */}
            <div 
              className="relative"
              onMouseEnter={() => setMyComplaintDropdownOpen(true)}
              onMouseLeave={() => setMyComplaintDropdownOpen(false)}
            >
              <button
                onClick={() => setMyComplaintDropdownOpen(!myComplaintDropdownOpen)}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentPage === 'draft' || (currentPage === 'track' && activeTrackedComplaint?.id.startsWith('c-user'))
                    ? 'text-[#1A1F18] bg-white border border-[#D5CABB] shadow-sm font-bold'
                    : 'text-[#596353] hover:text-[#1A1F18] hover:bg-[#EFEAE0]'
                }`}
                aria-expanded={myComplaintDropdownOpen}
              >
                <span>MY COMPLAINT</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${myComplaintDropdownOpen ? 'rotate-180 text-[#DC2626]' : 'text-[#879180]'}`} />
              </button>

              <AnimatePresence>
                {myComplaintDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-72 mt-2 bg-white border border-[#DDD3C2] rounded-2xl shadow-[0_16px_40px_rgba(40,45,35,0.12)] p-2.5 z-50"
                  >
                    {/* Sub-item a: Draft new complaint -> switches to Page 3 */}
                    <button
                      onClick={() => navigateTo('draft')}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#F8F5EE] text-[#1A1F18] text-xs flex items-start gap-3 transition-all group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-[#DC2626]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1F18]">Draft New Complaint</div>
                        <div className="text-[11px] text-[#6B7264] mt-0.5">Lodge with real photo & GPS proof</div>
                      </div>
                    </button>

                    {/* Sub-item b: Track already existing complaint -> switches to Page 5 */}
                    <button
                      onClick={() => navigateTo('track')}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#F8F5EE] text-[#1A1F18] text-xs flex items-start gap-3 transition-all group mt-1 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F3EFE6] border border-[#DDD3C2] flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-[#3E4A37]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1F18]">Track Existing Complaint</div>
                        <div className="text-[11px] text-[#6B7264] mt-0.5">View live Merkle timeline & inspection</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Link: GENERATE HASH ID -> Page 4 */}
            <button
              onClick={() => navigateTo('digilocker')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                currentPage === 'digilocker'
                  ? 'text-[#1A1F18] bg-white border border-[#D5CABB] shadow-sm font-bold'
                  : 'text-[#596353] hover:text-[#1A1F18] hover:bg-[#EFEAE0]'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-[#4B5842]" />
              <span>GENERATE HASH ID</span>
            </button>

            {/* Direct Link: TRACK PROGRESS -> Page 5 */}
            <button
              onClick={() => navigateTo('track')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                currentPage === 'track'
                  ? 'text-[#1A1F18] bg-white border border-[#D5CABB] shadow-sm font-bold'
                  : 'text-[#596353] hover:text-[#1A1F18] hover:bg-[#EFEAE0]'
              }`}
            >
              <Radio className="w-4 h-4 text-[#4B5842]" />
              <span>TRACK PROGRESS</span>
            </button>

            {/* Direct Link: KNOW MORE -> Page 6 */}
            <button
              onClick={() => navigateTo('know_more')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                currentPage === 'know_more'
                  ? 'text-[#1A1F18] bg-white border border-[#D5CABB] shadow-sm font-bold'
                  : 'text-[#596353] hover:text-[#1A1F18] hover:bg-[#EFEAE0]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#4B5842]" />
              <span>KNOW MORE</span>
            </button>
          </nav>

          {/* Right Status Indicator: Web3 Network Node Status & Primary Action */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDD3C2] text-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
              <span className="font-mono text-[11px] text-[#1A1F18] font-bold">Polygon</span>
              <span className="text-[#C2BAAA]">/</span>
              <span className="font-mono text-[11px] text-[#4B5842] font-semibold">#20,492,194</span>
            </div>

            <button 
              onClick={() => navigateTo('draft')}
              className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.98] text-white font-medium text-xs shadow-[0_4px_14px_rgba(220,38,38,0.25)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Report Civic Issue</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#DDD3C2] text-[#1A1F18] shadow-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transform transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transform transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#E2D9C8] bg-white px-6 pt-4 pb-8 space-y-2 text-sm overflow-hidden"
            >
              <button
                onClick={() => navigateTo('landing')}
                className={`w-full text-left px-4 py-3 rounded-xl ${currentPage === 'landing' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                HOME & DASHBOARD
              </button>
              <button
                onClick={() => navigateTo('discover')}
                className={`w-full text-left px-4 py-3 rounded-xl ${currentPage === 'discover' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                DISCOVER FEED
              </button>
              <div className="border-t border-[#E8E0D0] pt-3 pb-1 text-[11px] text-[#DC2626] uppercase tracking-wider px-4 font-bold">
                My Complaint
              </div>
              <button
                onClick={() => navigateTo('draft')}
                className={`w-full text-left pl-8 pr-4 py-2 rounded-xl ${currentPage === 'draft' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                • Draft New Complaint
              </button>
              <button
                onClick={() => navigateTo('track')}
                className={`w-full text-left pl-8 pr-4 py-2 rounded-xl ${currentPage === 'track' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                • Track Existing Complaint
              </button>
              <button
                onClick={() => navigateTo('digilocker')}
                className={`w-full text-left px-4 py-3 rounded-xl ${currentPage === 'digilocker' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                GENERATE HASH ID
              </button>
              <button
                onClick={() => navigateTo('track')}
                className={`w-full text-left px-4 py-3 rounded-xl ${currentPage === 'track' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                TRACK PROGRESS
              </button>
              <button
                onClick={() => navigateTo('know_more')}
                className={`w-full text-left px-4 py-3 rounded-xl ${currentPage === 'know_more' ? 'bg-[#F8F5EE] text-[#1A1F18] font-bold' : 'text-[#4F574A]'}`}
              >
                KNOW MORE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          PAGE 1: LANDING & MAIN DASHBOARD (EDITORIAL CIVIC GAZETTE STYLE)
         ========================================================================= */}
      {currentPage === 'landing' && (
        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-24">
          
          {/* SECTION 1: EDITORIAL CIVIC HEADLINE & INVESTIGATIVE OVERVIEW */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* HERO GAZETTE TILE (Col span 8) */}
            <div className="lg:col-span-8 rounded-3xl bg-white border border-[#DDD3C2] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-[0_6px_30px_rgba(40,45,35,0.04)] flex flex-col justify-between">
              
              <div className="space-y-7 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
                    MUNICIPAL OBSERVATORY v2.4
                  </span>
                  <span className="text-xs text-[#6B7264] font-medium">
                    Published under Right to Information Act & Sovereign Web3 Quorum
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1F18] leading-[1.12] font-serif tracking-tight">
                  Public Civic Registry & <br />
                  <span className="italic font-serif text-[#3E4A37]">Radical Transparency</span>
                </h1>

                <p className="text-base sm:text-lg text-[#4A5344] leading-relaxed max-w-2xl font-sans font-normal">
                  Every civic failure documented by citizens is timestamped on the public ledger. Authenticate without exposing personal data via DigiLocker zero-knowledge proofs, enforce municipal completion SLAs, and eliminate file burying forever.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => navigateTo('draft')}
                    className="px-6 py-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.98] text-white font-medium text-sm shadow-[0_4px_16px_rgba(220,38,38,0.25)] transition-all flex items-center gap-2.5 cursor-pointer group"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Lodge Civic Grievance</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigateTo('discover')}
                    className="px-6 py-4 rounded-xl bg-[#F8F5EE] hover:bg-[#EFEAE0] text-[#1A1F18] border border-[#DDD3C2] font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#4B5842]" />
                    <span>Browse Photographic Feed</span>
                  </button>

                  <button
                    onClick={() => navigateTo('track')}
                    className="px-4 py-4 rounded-xl text-[#6B7264] hover:text-[#1A1F18] font-medium text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Hash className="w-4 h-4" />
                    <span>Track DPN Hash</span>
                  </button>
                </div>
              </div>

              {/* Bottom Telemetry Ticker inside Hero */}
              <div className="mt-12 pt-8 border-t border-[#EAE2D2] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                <div>
                  <span className="text-[#848E7E] block text-[11px] uppercase tracking-wider font-medium">Consensus Block</span>
                  <span className="text-[#1A1F18] font-mono font-bold text-sm">#20,492,194</span>
                </div>
                <div>
                  <span className="text-[#848E7E] block text-[11px] uppercase tracking-wider font-medium">Turnaround Velocity</span>
                  <span className="text-[#3E4A37] font-semibold text-sm">4.2 Days (↓ 68%)</span>
                </div>
                <div>
                  <span className="text-[#848E7E] block text-[11px] uppercase tracking-wider font-medium">Citizen Identity</span>
                  <span className="text-[#1A1F18] font-medium text-sm">DigiLocker ZK Proof</span>
                </div>
                <div>
                  <span className="text-[#848E7E] block text-[11px] uppercase tracking-wider font-medium">Active Wards</span>
                  <span className="text-[#DC2626] font-bold text-sm">48 Divisions</span>
                </div>
              </div>

            </div>

            {/* BENTO STAT TILES (Col span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Stat Tile 1 */}
              <div className="rounded-3xl bg-white border border-[#DDD3C2] p-8 shadow-[0_4px_20px_rgba(40,45,35,0.03)] flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#6B7264] font-bold font-mono">Complaints Logged</span>
                    <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-normal font-serif text-[#1A1F18]">14,892</div>
                  <p className="text-xs text-[#596353] mt-3 leading-relaxed">
                    Citizen reports registered directly onto Polygon smart contract with IPFS photo evidence.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#EAE2D2] flex items-center justify-between text-xs">
                  <span className="text-[#6B7264]">Verified On-Chain</span>
                  <span className="font-mono text-[#3E4A37] font-bold">11,240 resolved</span>
                </div>
              </div>

              {/* Stat Tile 2: Municipal Validator Health */}
              <div className="rounded-3xl bg-white border border-[#DDD3C2] p-8 shadow-[0_4px_20px_rgba(40,45,35,0.03)] flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#6B7264] font-bold font-mono">Zonal Quorum</span>
                    <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] border border-[#DDD3C2] flex items-center justify-center text-[#3E4A37]">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-normal font-serif text-[#1A1F18]">48 Wards</div>
                  <p className="text-xs text-[#596353] mt-3 leading-relaxed">
                    Decentralized field inspectors and municipal supervisors providing multi-witness attestations.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#EAE2D2] flex items-center justify-between text-xs">
                  <span className="text-[#6B7264] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                    <span>SLA Integrity</span>
                  </span>
                  <span className="font-mono text-[#1A1F18] font-bold">99.8% verified</span>
                </div>
              </div>

            </div>

          </section>

          {/* SECTION 2: LIVE CIVIC PHOTO REEL & FEATURED CASES */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#DC2626] uppercase tracking-wider">CIVIC FIELD EVIDENCE</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1F18] mt-1 font-normal">
                  Recent Photographic Reports from Citizens
                </h2>
                <p className="text-sm text-[#596353] mt-2 max-w-2xl leading-relaxed">
                  Real unedited field photographs captured by local residents with embedded GPS coordinates and verified through sovereign DigiLocker identities.
                </p>
              </div>

              <button
                onClick={() => navigateTo('discover')}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F8F5EE] border border-[#DDD3C2] text-xs font-bold text-[#1A1F18] transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-sm"
              >
                <span>View All Complaints</span>
                <ArrowRight className="w-4 h-4 text-[#DC2626]" />
              </button>
            </div>

            {/* Photo Cards Grid with generous whitespace */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INITIAL_COMPLAINTS.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveTrackedComplaint(item);
                    setTrackSearchInput(item.hashId);
                    navigateTo('track');
                  }}
                  className="rounded-3xl bg-white border border-[#DDD3C2] overflow-hidden hover:border-[#B5A895] transition-all duration-300 shadow-[0_4px_20px_rgba(40,45,35,0.03)] hover:shadow-md cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Real Civic Photo Frame */}
                    <div className="relative h-56 w-full overflow-hidden bg-stone-200">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1A1F18]/80 backdrop-blur-sm text-white text-[11px] font-mono flex items-center gap-1.5">
                        <Camera className="w-3 h-3 text-[#FCA5A5]" />
                        <span>EVIDENCE PROTOCOL</span>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-[#1A1F18] text-[11px] font-bold font-mono shadow-sm">
                        {item.status}
                      </div>
                    </div>

                    <div className="p-7 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-[#6B7264]">
                        <span className="font-bold text-[#3E4A37]">{item.category}</span>
                        <span>·</span>
                        <span>{item.ward}</span>
                      </div>

                      <h3 className="text-lg font-serif text-[#1A1F18] font-normal leading-snug group-hover:text-[#DC2626] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#596353] leading-relaxed line-clamp-2">
                        {item.imageCaption}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-6 pt-4 border-t border-[#EAE2D2] flex items-center justify-between text-xs text-[#6B7264] font-mono">
                    <span>{item.hashId}</span>
                    <span className="text-[#3E4A37] font-bold flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {item.upvotes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: EDITORIAL GAZETTE CORE PILLARS */}
          <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white border border-[#DDD3C2] space-y-10 shadow-[0_4px_24px_rgba(40,45,35,0.03)]">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-[#DC2626] uppercase tracking-wider">PLATFORM PILLARS</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1F18] mt-1 font-normal">
                How Darpan Solves Municipal File Burying
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3.5 pr-4 border-b md:border-b-0 md:border-r border-[#EAE2D2] pb-6 md:pb-0">
                <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1F18] font-normal">1. Zero-Knowledge Identity</h3>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Authenticate using sovereign DigiLocker credentials. Your genuine resident status is proven mathematically on-chain without revealing your name, phone number, or Aadhaar to public officials.
                </p>
              </div>

              <div className="space-y-3.5 pr-4 border-b md:border-b-0 md:border-r border-[#EAE2D2] pb-6 md:pb-0">
                <div className="w-10 h-10 rounded-xl bg-[#F8F5EE] border border-[#DDD3C2] flex items-center justify-center text-[#3E4A37]">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1F18] font-normal">2. Photographic Telemetry</h3>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Every issue includes high-resolution photographic proof pinned to decentralized IPFS storage. Municipal contractors cannot close cases without verified before-and-after photographic evidence.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1F18] font-normal">3. Guaranteed SLA Contracts</h3>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Smart contracts maintain an automated countdown timer. If a department fails to respond within statutory SLA blocks (e.g., 48 hours), the grievance auto-escalates to the Zonal Commissioner.
                </p>
              </div>
            </div>
          </section>

        </main>
      )}

      {/* =========================================================================
          PAGE 2: DISCOVER FEED (RICH REAL PHOTOGRAPHY & GENEROUS WHITESPACE)
         ========================================================================= */}
      {currentPage === 'discover' && (
        <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
              <Camera className="w-3.5 h-3.5" />
              <span>CITIZEN EVIDENCE STREAM</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#1A1F18] font-serif tracking-tight">
              Civic Issue Discovery Feed
            </h1>
            <p className="text-sm sm:text-base text-[#596353] max-w-2xl leading-relaxed">
              Explore geotagged complaints and unedited photographic evidence uploaded by local citizens across municipal wards. Upvote urgent civic hazards to accelerate smart contract triage.
            </p>
          </div>

          {/* Functional Filter & Search Bar with generous padding */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDD3C2] shadow-[0_4px_20px_rgba(40,45,35,0.03)] space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Input */}
              <div className="relative md:col-span-6">
                <Search className="w-4 h-4 text-[#848E7E] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by issue title, keyword, locality, or DPN hash..."
                  className="w-full pl-11 pr-10 py-3 bg-[#F8F5EE] border border-[#DDD3C2] rounded-xl text-xs sm:text-sm text-[#1A1F18] placeholder-[#8F8B80] focus:outline-none focus:border-[#DC2626] focus:bg-white transition-all font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Radius Filter */}
              <div className="md:col-span-3 flex items-center gap-1 bg-[#F8F5EE] p-1.5 rounded-xl border border-[#DDD3C2] text-xs">
                <span className="text-[11px] text-[#6B7264] px-2 font-bold shrink-0">Radius:</span>
                {(['All', '5km', '10km', '100km'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRadius(r)}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                      selectedRadius === r
                        ? 'bg-white text-[#1A1F18] border border-[#D5CABB] font-bold shadow-sm'
                        : 'text-[#6B7264] hover:text-[#1A1F18]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Sort By Filter */}
              <div className="md:col-span-3 flex items-center gap-1 bg-[#F8F5EE] p-1.5 rounded-xl border border-[#DDD3C2] text-xs">
                <span className="text-[11px] text-[#6B7264] px-2 font-bold shrink-0">Sort:</span>
                <button
                  onClick={() => setSortBy('upvotes')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    sortBy === 'upvotes'
                      ? 'bg-white text-[#DC2626] border border-[#D5CABB] font-bold shadow-sm'
                      : 'text-[#6B7264] hover:text-[#1A1F18]'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Upvotes</span>
                </button>
                <button
                  onClick={() => setSortBy('recent')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                    sortBy === 'recent'
                      ? 'bg-white text-[#1A1F18] border border-[#D5CABB] font-bold shadow-sm'
                      : 'text-[#6B7264] hover:text-[#1A1F18]'
                  }`}
                >
                  Recent
                </button>
                <button
                  onClick={() => setSortBy('distance')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                    sortBy === 'distance'
                      ? 'bg-white text-[#1A1F18] border border-[#D5CABB] font-bold shadow-sm'
                      : 'text-[#6B7264] hover:text-[#1A1F18]'
                  }`}
                >
                  Nearest
                </button>
              </div>

            </div>

            {/* Category Quick Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE2D2]">
              <span className="text-[11px] text-[#6B7264] font-bold mr-1">Filter Category:</span>
              {[
                'All',
                'Roads & Infrastructure',
                'Sanitation & Waste',
                'Water Supply',
                'Power & Grid',
                'Public Safety'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1A1F18] text-white shadow-sm'
                      : 'bg-[#F8F5EE] text-[#596353] hover:text-[#1A1F18] border border-[#DDD3C2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Complaint Cards Stream: SPACIOUS & PHOTO-FORWARD */}
          <div className="space-y-10 sm:space-y-12">
            {filteredComplaints.length === 0 ? (
              <div className="p-16 text-center rounded-3xl bg-white border border-[#DDD3C2] space-y-4">
                <AlertTriangle className="w-10 h-10 text-[#DC2626] mx-auto" />
                <h3 className="text-[#1A1F18] font-serif text-xl font-normal">No Matching Complaints in this Radius</h3>
                <p className="text-xs sm:text-sm text-[#6B7264] max-w-md mx-auto">
                  Try adjusting your radial search filter, keyword terms, or category selections.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedRadius('All');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-xs text-white font-bold cursor-pointer transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredComplaints.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-white border border-[#DDD3C2] p-7 sm:p-9 shadow-[0_4px_24px_rgba(40,45,35,0.03)] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Actual Civic Evidence Picture Frame */}
                    <div className="w-full lg:w-80 shrink-0 space-y-2">
                      <div 
                        onClick={() => setInspectedPhoto({
                          url: item.imageUrl,
                          title: item.title,
                          caption: item.imageCaption,
                          locality: item.locality,
                          hashId: item.hashId,
                          meta: item.photoEvidenceMeta
                        })}
                        className="relative h-60 sm:h-64 lg:h-52 w-full rounded-2xl overflow-hidden bg-stone-200 group cursor-pointer border border-[#E2D9C8]"
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="px-3 py-1.5 rounded-xl bg-white/95 text-[#1A1F18] text-xs font-bold font-mono shadow-md flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-[#DC2626]" /> Inspect Proof
                          </span>
                        </div>
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#1A1F18]/80 text-white text-[10px] font-mono tracking-wider">
                          EVIDENCE PHOTO #1
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6B7264] italic leading-tight">
                        "{item.imageCaption}"
                      </p>
                    </div>

                    {/* Details Column */}
                    <div className="space-y-4 flex-1">
                      
                      {/* Unboxed clean metadata line (less AI looking, no pill spam) */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6B7264]">
                        <span className="font-bold text-[#DC2626] uppercase font-mono">{item.category}</span>
                        <span>·</span>
                        <span className="text-[#1A1F18] font-bold">{item.ward}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#4B5842]" /> {item.distanceKm} km away</span>
                        <span>·</span>
                        <span className={`font-bold ${item.status === 'Resolved' ? 'text-[#3E4A37]' : 'text-[#DC2626]'}`}>{item.status}</span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h2 
                          onClick={() => {
                            setActiveTrackedComplaint(item);
                            setTrackSearchInput(item.hashId);
                            navigateTo('track');
                          }}
                          className="text-xl sm:text-2xl font-serif text-[#1A1F18] hover:text-[#DC2626] transition-colors cursor-pointer font-normal leading-snug"
                        >
                          {item.title}
                        </h2>
                        <p className="text-sm text-[#4A5344] mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Locality & On-Chain Timestamp */}
                      <div className="p-3.5 rounded-xl bg-[#F8F5EE] border border-[#EAE2D2] text-xs text-[#596353] flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-[#1A1F18]">Location: </span>
                          <span>{item.locality}</span>
                        </div>
                        <div className="font-mono text-[11px] text-[#6B7264]">
                          Logged: {item.timestamp}
                        </div>
                      </div>

                      {/* Actions & Cryptographic Proof */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#1A1F18]">
                          <span className="text-[#848E7E]">HASH ID:</span>
                          <span className="font-bold">{item.hashId}</span>
                          <button
                            onClick={() => handleCopy(item.hashId, item.id)}
                            className="text-[#848E7E] hover:text-[#1A1F18] p-1 cursor-pointer"
                            title="Copy Hash ID"
                          >
                            {copiedHash === item.id ? <Check className="w-3.5 h-3.5 text-[#DC2626]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleUpvote(item.id)}
                            className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono transition-all cursor-pointer ${
                              item.hasUpvoted
                                ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5] font-bold shadow-sm'
                                : 'bg-[#F8F5EE] hover:bg-[#EFEAE0] text-[#1A1F18] border-[#DDD3C2]'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${item.hasUpvoted ? 'text-[#DC2626]' : 'text-[#848E7E]'}`} />
                            <span>{item.upvotes} Upvotes</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveTrackedComplaint(item);
                              setTrackSearchInput(item.hashId);
                              navigateTo('track');
                            }}
                            className="px-4 py-2 rounded-xl bg-[#1A1F18] hover:bg-[#3E4A37] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Inspect Timeline</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.article>
              ))
            )}
          </div>

        </main>
      )}

      {/* =========================================================================
          PAGE 3: DRAFT COMPLAINT FORM (WITH PHOTO SELECTION & UPLOAD DROPZONE)
         ========================================================================= */}
      {currentPage === 'draft' && (
        <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
              <Camera className="w-3.5 h-3.5" />
              <span>STEP 1 OF 2 · GRIEVANCE SPECIFICATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#1A1F18] font-serif tracking-tight">
              Draft Sovereign Civic Complaint
            </h1>
            <p className="text-sm sm:text-base text-[#596353] leading-relaxed max-w-2xl">
              Attach genuine photographic evidence and geotagging. After drafting, you will verify citizenship through DigiLocker to seal your immutable Darpan Hash ID.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Structured Entry Form (Col span 8) */}
            <form onSubmit={handleProceedToAuth} className="lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD3C2] shadow-[0_6px_30px_rgba(40,45,35,0.03)] space-y-8">
              
              {/* Field 1: Category */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#1A1F18] uppercase tracking-wider">
                  1. Issue Category <span className="text-[#DC2626]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'Roads & Infrastructure',
                    'Sanitation & Waste',
                    'Water Supply',
                    'Power & Grid',
                    'Public Safety',
                    'Other Civic Hazard'
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setDraftCategory(cat)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                        draftCategory === cat
                          ? 'border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] font-bold shadow-sm'
                          : 'border-[#DDD3C2] bg-[#F8F5EE] text-[#4A5344] hover:bg-[#EFEAE0]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: Title */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1A1F18] uppercase tracking-wider">
                  2. Incident Title <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="e.g. Broken water pipeline flooding pedestrian crossing near Metro Pillar 12"
                  className="w-full px-4 py-3.5 bg-[#F8F5EE] border border-[#DDD3C2] rounded-xl text-sm text-[#1A1F18] placeholder-[#8F8B80] focus:outline-none focus:border-[#DC2626] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Field 3: Evidence Photograph Selection & Dropzone */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#1A1F18] uppercase tracking-wider">
                    3. Civic Problem Photograph (Select or Upload) <span className="text-[#DC2626]">*</span>
                  </label>
                  <span className="text-[11px] text-[#6B7264]">Encrypted onto IPFS</span>
                </div>

                {/* Preset photographic evidence chooser */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRESET_EVIDENCE_PHOTOS.map((photo) => (
                    <div
                      key={photo.title}
                      onClick={() => {
                        setDraftSelectedPhotoUrl(photo.url);
                        setDraftSelectedPhotoCaption(photo.caption);
                        setDraftFileName(photo.title);
                      }}
                      className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        draftSelectedPhotoUrl === photo.url ? 'border-[#DC2626] shadow-md' : 'border-[#DDD3C2] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-20 object-cover" />
                      <div className="p-1.5 bg-white text-[10px] font-bold text-[#1A1F18] truncate">
                        {photo.title}
                      </div>
                      {draftSelectedPhotoUrl === photo.url && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Custom File Upload Simulation */}
                <div className="p-6 border-2 border-dashed border-[#DDD3C2] rounded-2xl bg-[#F8F5EE] text-center space-y-2 hover:border-[#DC2626] transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-[#DC2626] mx-auto" />
                  <div className="text-xs text-[#1A1F18] font-bold">
                    Or upload camera photo from device
                  </div>
                  <p className="text-[11px] text-[#6B7264]">PNG, JPG, HEIC up to 15MB with GPS EXIF metadata preserved</p>
                </div>
              </div>

              {/* Field 4: Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1A1F18] uppercase tracking-wider">
                  4. Detailed Description <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  placeholder="Describe the severity, duration of the issue, risk to public safety, and nearby municipal landmarks..."
                  className="w-full px-4 py-3 bg-[#F8F5EE] border border-[#DDD3C2] rounded-xl text-sm text-[#1A1F18] placeholder-[#8F8B80] focus:outline-none focus:border-[#DC2626] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Field 5: Incident Location & GPS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#1A1F18] uppercase tracking-wider">
                    5. Incident Location / GPS Coordinates
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectGPS}
                    className="text-xs text-[#DC2626] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{gpsDetecting ? 'Detecting Satellites...' : gpsDetected ? '✓ GPS Locked' : 'Auto-Detect Device GPS'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={draftLocality}
                  onChange={(e) => setDraftLocality(e.target.value)}
                  placeholder="e.g. 12.9716° N, 77.5946° E • Indiranagar 100ft Road"
                  className="w-full px-4 py-3 bg-[#F8F5EE] border border-[#DDD3C2] rounded-xl text-sm text-[#1A1F18] placeholder-[#8F8B80] focus:outline-none focus:border-[#DC2626] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Proceed Action Button */}
              <div className="pt-4 border-t border-[#EAE2D2]">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.98] text-white font-medium text-sm shadow-[0_4px_16px_rgba(220,38,38,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to DigiLocker Authentication & Hash Generation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

            {/* Sidebar Guidelines (Col span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-[#DDD3C2] space-y-4 shadow-[0_4px_20px_rgba(40,45,35,0.03)]">
                <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1F18] font-normal">How Your Complaint is Sealed</h3>
                <p className="text-xs text-[#596353] leading-relaxed">
                  Upon submission, your complaint title, photo, and geolocation are hashed into a SHA-256 Merkle leaf. DigiLocker will then certify your citizenship without exposing your personal information.
                </p>
                <div className="pt-4 border-t border-[#EAE2D2] text-[11px] font-mono text-[#6B7264] space-y-1">
                  <div>• Public Record: Immutable</div>
                  <div>• Private PII: Zero Exposure</div>
                  <div>• SLA Guaranteed: 72 Hours</div>
                </div>
              </div>
            </div>

          </div>

        </main>
      )}

      {/* =========================================================================
          PAGE 4: DARPAN ID GENERATION & DIGILOCKER AUTHENTICATION
         ========================================================================= */}
      {currentPage === 'digilocker' && (
        <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>STEP 2 OF 2 · IMMUTABLE HASH SEALING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#1A1F18] font-serif tracking-tight">
              DigiLocker Citizen Verification
            </h1>
            <p className="text-sm sm:text-base text-[#596353] leading-relaxed max-w-2xl">
              Authenticate via the National DigiLocker Sovereign Gateway to generate your unique immutable Darpan Hash ID.
            </p>
          </div>

          {!mintedHashResult ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DDD3C2] shadow-[0_6px_30px_rgba(40,45,35,0.03)] space-y-8">
              
              {/* Draft Summary Card */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-3">
                <span className="text-[11px] font-mono text-[#DC2626] font-bold uppercase tracking-wider">PAYLOAD TO BE ANCHORED</span>
                <h3 className="text-lg font-serif text-[#1A1F18] font-normal">
                  {activeDraftForHash?.title || 'Severe Arterial Crater & Waterlogging at Outer Ring Flyover Junction'}
                </h3>
                <div className="text-xs text-[#596353]">
                  Ward: <span className="text-[#1A1F18] font-bold">{activeDraftForHash?.ward || 'Ward 82 (East Zone)'}</span> · 
                  Locality: <span className="text-[#1A1F18]">{activeDraftForHash?.locality || 'Indiranagar Sector 4'}</span>
                </div>
              </div>

              {/* Strict Requirement: DigiLocker Checkbox and Confirmation */}
              <div className="p-6 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] space-y-4">
                <div className="flex items-start gap-3.5">
                  <input
                    type="checkbox"
                    id="digilockerCheckbox"
                    checked={digilockerAgreed}
                    onChange={(e) => setDigilockerAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#DC2626] rounded cursor-pointer"
                  />
                  <label htmlFor="digilockerCheckbox" className="text-xs sm:text-sm text-[#1A1F18] leading-relaxed cursor-pointer font-medium">
                    I agree to be redirected to an external application (DigiLocker) for identity verification.
                  </label>
                </div>
                <p className="text-[11px] text-[#6B7264] pl-7">
                  Clicking authenticate will open <span className="font-mono text-[#DC2626]">https://www.digilocker.gov.in/</span> in a new browser tab to certify your residential citizenship without revealing personal identity.
                </p>
              </div>

              <button
                disabled={!digilockerAgreed || isVerifyingDigilocker}
                onClick={handleConfirmDigiLocker}
                className={`w-full py-4 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  digilockerAgreed && !isVerifyingDigilocker
                    ? 'bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.98] text-white shadow-[0_4px_16px_rgba(220,38,38,0.25)] cursor-pointer'
                    : 'bg-[#EAE2D2] text-[#848E7E] cursor-not-allowed'
                }`}
              >
                {isVerifyingDigilocker ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Citizen Proof & Minting On-Chain Hash...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Authenticate via DigiLocker & Generate Darpan Hash ID</span>
                    <ExternalLink className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>
          ) : (
            /* Minted Certificate Receipt */
            <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#DC2626] shadow-[0_8px_30px_rgba(220,38,38,0.12)] space-y-8">
              
              <div className="flex items-center justify-between border-b border-[#EAE2D2] pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif text-[#1A1F18] font-normal">Darpan Hash ID Generated</h2>
                    <p className="text-xs text-[#6B7264]">DigiLocker Verified Citizen Grievance Certificate</p>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px] text-[#DC2626] font-bold bg-[#FEF2F2] px-3 py-1.5 rounded-lg border border-[#FCA5A5]">
                  [ON-CHAIN ANCHORED]
                </div>
              </div>

              {/* Certificate Data */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] font-mono text-xs space-y-3 text-[#1A1F18]">
                <div className="flex justify-between items-center pb-2 border-b border-[#EAE2D2]">
                  <span className="text-[#6B7264]">IMMUTABLE HASH ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#DC2626]">{mintedHashResult.hashId}</span>
                    <button
                      onClick={() => handleCopy(mintedHashResult.hashId, 'minted')}
                      className="p-1 text-[#848E7E] hover:text-[#1A1F18] cursor-pointer"
                    >
                      {copiedHash === 'minted' ? <Check className="w-4 h-4 text-[#DC2626]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#6B7264]">POLYGON BLOCK:</span>
                  <span className="font-bold">#{mintedHashResult.blockNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#6B7264]">TRANSACTION HASH:</span>
                  <span className="truncate max-w-xs text-[#4B5842]">{mintedHashResult.txHash}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#6B7264]">TIMESTAMP:</span>
                  <span>{mintedHashResult.timestamp}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => {
                    setTrackSearchInput(mintedHashResult.hashId);
                    navigateTo('track');
                  }}
                  className="flex-1 py-4 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Track Complaint Progress</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('discover')}
                  className="py-4 px-6 rounded-xl bg-[#F8F5EE] hover:bg-[#EFEAE0] text-[#1A1F18] border border-[#DDD3C2] font-semibold text-sm transition-all cursor-pointer"
                >
                  View Citizen Feed
                </button>
              </div>

            </div>
          )}

        </main>
      )}

      {/* =========================================================================
          PAGE 5: TRACK COMPLAINT PROGRESS & AUDIT TIMELINE
         ========================================================================= */}
      {currentPage === 'track' && (
        <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>ON-CHAIN AUDIT TIMELINE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#1A1F18] font-serif tracking-tight">
              Track Grievance Resolution
            </h1>
            <p className="text-sm sm:text-base text-[#596353] leading-relaxed max-w-2xl">
              Inspect the cryptographic lifecycle of any complaint from DigiLocker logging to municipal field verification and completion proof.
            </p>
          </div>

          {/* Lookup Input */}
          <div className="p-6 rounded-3xl bg-white border border-[#DDD3C2] shadow-[0_4px_20px_rgba(40,45,35,0.03)] flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={trackSearchInput}
              onChange={(e) => setTrackSearchInput(e.target.value)}
              placeholder="Enter Darpan Hash ID (e.g. DPN-2026-09841)"
              className="flex-1 px-4 py-3 bg-[#F8F5EE] border border-[#DDD3C2] rounded-xl text-sm font-mono text-[#1A1F18] placeholder-[#8F8B80] focus:outline-none focus:border-[#DC2626]"
            />
            <button
              onClick={() => handleExecuteTrack()}
              className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold font-mono transition-colors cursor-pointer"
            >
              Audit Hash
            </button>
          </div>

          {activeTrackedComplaint && (
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DDD3C2] shadow-[0_6px_30px_rgba(40,45,35,0.03)] space-y-10">
              
              {/* Header card info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EAE2D2]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#6B7264] font-mono">
                    <span className="font-bold text-[#DC2626]">{activeTrackedComplaint.hashId}</span>
                    <span>·</span>
                    <span>{activeTrackedComplaint.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1F18] font-normal">
                    {activeTrackedComplaint.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#596353]">
                    {activeTrackedComplaint.locality} · {activeTrackedComplaint.ward}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  <button
                    onClick={handleAdvanceStage}
                    className="px-4 py-2.5 rounded-xl bg-[#F8F5EE] hover:bg-[#EFEAE0] border border-[#DDD3C2] text-xs font-mono font-bold text-[#1A1F18] transition-colors cursor-pointer"
                  >
                    Simulate Next Stage →
                  </button>
                </div>
              </div>

              {/* 4-Stage Progressive Timeline */}
              <div className="space-y-8 pl-4 sm:pl-6 border-l-2 border-[#EAE2D2]">
                
                {/* Stage 1: Logged */}
                <div className="relative pl-6 sm:pl-8 space-y-1.5">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeTrackedComplaint.stageIndex >= 1 ? 'bg-[#DC2626] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    1
                  </div>
                  <div className="text-xs font-mono font-bold text-[#DC2626]">STAGE 1: DIGILOCKER CITIZEN LOGGING</div>
                  <h3 className="text-base font-serif text-[#1A1F18]">Complaint Anchored onto Blockchain</h3>
                  <p className="text-xs text-[#596353]">
                    Grievance signed with citizen zero-knowledge proof and timestamped on Polygon Block #{activeTrackedComplaint.blockNumber}.
                  </p>
                </div>

                {/* Stage 2: Municipal Verification */}
                <div className="relative pl-6 sm:pl-8 space-y-1.5">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeTrackedComplaint.stageIndex >= 2 ? 'bg-[#DC2626] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    2
                  </div>
                  <div className="text-xs font-mono font-bold text-[#DC2626]">STAGE 2: ZONAL MUNICIPAL TRIAGE</div>
                  <h3 className="text-base font-serif text-[#1A1F18]">Ward Inspector Attestation</h3>
                  <p className="text-xs text-[#596353]">
                    {activeTrackedComplaint.stageIndex >= 2
                      ? 'Nodal revenue officer verified ground telemetry and assigned SLA category.'
                      : 'Pending inspector queue. Statutory countdown running.'}
                  </p>
                </div>

                {/* Stage 3: Action Assigned */}
                <div className="relative pl-6 sm:pl-8 space-y-1.5">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeTrackedComplaint.stageIndex >= 3 ? 'bg-[#DC2626] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    3
                  </div>
                  <div className="text-xs font-mono font-bold text-[#DC2626]">STAGE 3: DISPATCH & WORK ORDER</div>
                  <h3 className="text-base font-serif text-[#1A1F18]">Contractor Work Milestone Escrow</h3>
                  <p className="text-xs text-[#596353]">
                    {activeTrackedComplaint.stageIndex >= 3
                      ? `Contractor ${activeTrackedComplaint.contractorName || 'Apex Rapid Infra Taskforce'} dispatched with materials.`
                      : 'Awaiting department tender assignment.'}
                  </p>
                </div>

                {/* Stage 4: Resolved */}
                <div className="relative pl-6 sm:pl-8 space-y-1.5">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeTrackedComplaint.stageIndex >= 4 ? 'bg-[#3E4A37] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    4
                  </div>
                  <div className="text-xs font-mono font-bold text-[#3E4A37]">STAGE 4: RESOLVED & VERIFIED</div>
                  <h3 className="text-base font-serif text-[#1A1F18]">Photographic Completion Seal</h3>
                  <p className="text-xs text-[#596353]">
                    {activeTrackedComplaint.stageIndex >= 4
                      ? 'Ground repair completed. Before-and-after photographic telemetry verified on-chain.'
                      : 'Pending field completion proof from contractor.'}
                  </p>
                </div>

              </div>

            </div>
          )}

        </main>
      )}

      {/* =========================================================================
          PAGE 6: KNOWLEDGE HUB (4 CARDS + QUIZ LINK)
         ========================================================================= */}
      {currentPage === 'know_more' && (
        <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-12">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CIVIC TRANSPARENCY KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#1A1F18] font-serif tracking-tight">
              Knowledge Hub & Public Resources
            </h1>
            <p className="text-sm sm:text-base text-[#596353] leading-relaxed max-w-2xl">
              Understand how decentralized consensus stops corruption, inspect verified open-source smart contracts, and test your Web3 literacy.
            </p>
          </div>

          {/* 4 Resource Cards with generous whitespace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Read More about Web3 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD3C2] flex flex-col justify-between shadow-[0_4px_24px_rgba(40,45,35,0.03)] space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F18] font-normal">
                  Read More about Web3 & Blockchain
                </h2>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Deep dive into decentralized consensus, Byzantine fault tolerance, state machines, and how smart contracts eliminate single points of failure in municipal governance.
                </p>
              </div>

              <button
                onClick={() => setDocsModalOpen(true)}
                className="py-3.5 px-5 rounded-xl bg-[#F8F5EE] hover:bg-[#EFEAE0] text-[#1A1F18] text-xs font-bold flex items-center justify-center gap-2 border border-[#DDD3C2] transition-colors cursor-pointer"
              >
                <span>Open Documentation</span>
                <ExternalLink className="w-4 h-4 text-[#DC2626]" />
              </button>
            </div>

            {/* Card 2: Videos & Media */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD3C2] flex flex-col justify-between shadow-[0_4px_24px_rgba(40,45,35,0.03)] space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] flex items-center justify-center text-[#3E4A37]">
                  <Video className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F18] font-normal">
                  Watch Web3 Videos & Documents
                </h2>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Visual briefings, animated architecture overviews, and documentary case studies exploring civic public ledger rollouts across global smart cities.
                </p>
              </div>

              <button
                onClick={() => setVideosModalOpen(true)}
                className="py-3.5 px-5 rounded-xl bg-[#F8F5EE] hover:bg-[#EFEAE0] text-[#1A1F18] text-xs font-bold flex items-center justify-center gap-2 border border-[#DDD3C2] transition-colors cursor-pointer"
              >
                <span>Watch Media Library</span>
                <ExternalLink className="w-4 h-4 text-[#3E4A37]" />
              </button>
            </div>

            {/* Card 3: Smart Contract Code */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDD3C2] flex flex-col justify-between shadow-[0_4px_24px_rgba(40,45,35,0.03)] space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626]">
                  <Code className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F18] font-normal">
                  Read the Smart Contract
                </h2>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Inspect the open-source Solidity code powering the DarpanRegistry contract. Verify data structures, modifiers, SLA timeout triggers, and state machine functions.
                </p>
              </div>

              <button
                onClick={() => setSmartContractModalOpen(true)}
                className="py-3.5 px-5 rounded-xl bg-[#F8F5EE] hover:bg-[#EFEAE0] text-[#1A1F18] text-xs font-bold flex items-center justify-center gap-2 border border-[#DDD3C2] transition-colors cursor-pointer"
              >
                <span>Inspect Solidity Code</span>
                <ExternalLink className="w-4 h-4 text-[#DC2626]" />
              </button>
            </div>

            {/* Card 4: Official Web3 Quiz (STRICT EXTERNAL LINK) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-[#FFF8F8] to-[#FEE2E2] border-2 border-[#DC2626] flex flex-col justify-between shadow-[0_6px_30px_rgba(220,38,38,0.12)] space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-[#DC2626] bg-[#FEF2F2] px-3 py-1 rounded-full border border-[#FCA5A5] font-bold">
                    CERTIFIED TEST
                  </span>
                </div>

                <h2 className="text-2xl font-serif text-[#1A1F18] font-normal">
                  Take Web3 Quiz
                </h2>
                <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                  Test your understanding of decentralized civic complaints, blockchain immutability, zero-knowledge proofs, and sovereign citizen verification on the official Quiz Maker portal.
                </p>
              </div>

              {/* STRICT REQUIREMENT: direct link to quiz-maker url opening in new tab */}
              <a
                href="https://take.quiz-maker.com/QV9WG8U62"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Launch Official Web3 Quiz</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* =========================================================================
              TECHNOLOGY STACK & ARCHITECTURAL SPECIFICATIONS
             ========================================================================= */}
          <section className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DDD3C2] shadow-[0_4px_24px_rgba(40,45,35,0.03)] space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE2D2] pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] text-xs font-bold font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>SYSTEM ARCHITECTURE</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1F18] font-normal mt-2">
                  Darpan Technology Stack
                </h2>
                <p className="text-xs sm:text-sm text-[#596353] mt-1 max-w-2xl leading-relaxed">
                  Engineered with modern frontend standards, sovereign cryptographic identity primitives, and decentralized smart contracts.
                </p>
              </div>

              <div className="font-mono text-xs text-[#DC2626] bg-[#FEF2F2] px-3.5 py-1.5 rounded-xl border border-[#FCA5A5] font-bold self-start sm:self-auto">
                PRODUCTION STACK v2.4
              </div>
            </div>

            {/* Stack Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Category 1: Frontend & Core Runtime */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7264] font-bold">CLIENT RUNTIME</span>
                    <span className="text-xs font-mono font-bold text-[#DC2626]">REACT 19</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1F18] font-normal">React 19 & TypeScript</h3>
                  <p className="text-xs text-[#596353] leading-relaxed">
                    Single-page state machine architecture managing routing, real-time civic filters, and reactive transaction hashing with strict TypeScript safety.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE2D2] text-[11px] font-mono text-[#1A1F18] space-y-1">
                  <div>• React v19.0.1</div>
                  <div>• TypeScript v7.0 (Strict ES2022)</div>
                  <div>• Vite v8.3 Bundler</div>
                </div>
              </div>

              {/* Category 2: Styling & Typography */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7264] font-bold">DESIGN SYSTEM</span>
                    <span className="text-xs font-mono font-bold text-[#3E4A37]">TAILWIND v4</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1F18] font-normal">Tailwind CSS & Motion</h3>
                  <p className="text-xs text-[#596353] leading-relaxed">
                    Bespoke editorial newspaper typography pairing *Newsreader* (editorial serif) and *DM Sans*, with Motion spring-physics for layout transitions.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE2D2] text-[11px] font-mono text-[#1A1F18] space-y-1">
                  <div>• Tailwind CSS v4.3 Engine</div>
                  <div>• Motion / Framer Motion v12.23</div>
                  <div>• Lucide React Icons v0.546</div>
                </div>
              </div>

              {/* Category 3: Smart Contract & Blockchain */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7264] font-bold">CONSENSUS LAYER</span>
                    <span className="text-xs font-mono font-bold text-[#DC2626]">SOLIDITY 0.8</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1F18] font-normal">Polygon PoS & EVM</h3>
                  <p className="text-xs text-[#596353] leading-relaxed">
                    Custom <span className="font-mono text-[#DC2626]">DarpanCivicRegistry.sol</span> contract enforcing 4-stage civic lifecycle, SLA escalation blocks, and contractor escrow milestones.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE2D2] text-[11px] font-mono text-[#1A1F18] space-y-1">
                  <div>• Solidity ^0.8.20</div>
                  <div>• Polygon Proof-of-Stake L2</div>
                  <div>• ERC-4337 Account Abstraction</div>
                </div>
              </div>

              {/* Category 4: Sovereign Identity & Privacy */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7264] font-bold">CITIZEN IDENTITY</span>
                    <span className="text-xs font-mono font-bold text-[#DC2626]">DIGILOCKER</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1F18] font-normal">DigiLocker & ZK-SNARKs</h3>
                  <p className="text-xs text-[#596353] leading-relaxed">
                    Integration with India's national DigiLocker gateway. Validates genuine citizenship and residency without publishing Aadhaar numbers or personal PII on-chain.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE2D2] text-[11px] font-mono text-[#1A1F18] space-y-1">
                  <div>• DigiLocker National Gateway</div>
                  <div>• Groth16 Zero-Knowledge Proofs</div>
                  <div>• Anti-Sybil Citizen Node Quorum</div>
                </div>
              </div>

              {/* Category 5: Decentralized Storage */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7264] font-bold">MEDIA STORAGE</span>
                    <span className="text-xs font-mono font-bold text-[#3E4A37]">IPFS CID</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1F18] font-normal">IPFS & Merkle Trees</h3>
                  <p className="text-xs text-[#596353] leading-relaxed">
                    Photographic civic telemetry and EXIF camera proofs are content-addressed via cryptographic IPFS CIDs, preventing retrospective photo tampering.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE2D2] text-[11px] font-mono text-[#1A1F18] space-y-1">
                  <div>• InterPlanetary File System (IPFS)</div>
                  <div>• SHA-256 Merkle Proof Leaves</div>
                  <div>• Geo-EXIF Coordinate Retention</div>
                </div>
              </div>

              {/* Category 6: Server & Infrastructure */}
              <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7264] font-bold">INFRASTRUCTURE</span>
                    <span className="text-xs font-mono font-bold text-[#DC2626]">NODE / TSX</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1F18] font-normal">Express & Node.js</h3>
                  <p className="text-xs text-[#596353] leading-relaxed">
                    Lightweight backend middleware with proxy routing, CORS protection, and production cloud container orchestration.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE2D2] text-[11px] font-mono text-[#1A1F18] space-y-1">
                  <div>• Node.js & tsx engine</div>
                  <div>• Express v4.21 Gateway</div>
                  <div>• Cloud Run Production Host</div>
                </div>
              </div>

            </div>
          </section>

        </main>
      )}

      {/* =========================================================================
          PHOTO INSPECTION LIGHTBOX MODAL
         ========================================================================= */}
      <AnimatePresence>
        {inspectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#DDD3C2]"
            >
              <div className="p-5 border-b border-[#EAE2D2] flex items-center justify-between bg-[#F8F5EE]">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-5 h-5 text-[#DC2626]" />
                  <span className="font-serif font-normal text-base text-[#1A1F18]">
                    {inspectedPhoto.title}
                  </span>
                </div>
                <button
                  onClick={() => setInspectedPhoto(null)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-black">
                  <img src={inspectedPhoto.url} alt={inspectedPhoto.title} className="w-full h-full object-contain" />
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] text-xs font-mono text-[#596353] space-y-1.5">
                  <div className="text-[#1A1F18] font-bold font-sans text-sm">Evidence Metadata:</div>
                  <div>• Caption: {inspectedPhoto.caption}</div>
                  <div>• Camera EXIF: {inspectedPhoto.meta?.camera || 'Citizen Field Camera (GPS Timestamp Sealed)'}</div>
                  <div>• File Size: {inspectedPhoto.meta?.fileSize || '4.2 MB RAW'}</div>
                  <div>• Merkle SHA-256: {inspectedPhoto.meta?.sha256Proof || '0x9d4a6f8b1c2e3d5a7b9c1d3e5f7a9b1c'}</div>
                </div>
              </div>

              <div className="p-4 border-t border-[#EAE2D2] flex justify-end bg-[#F8F5EE]">
                <button
                  onClick={() => setInspectedPhoto(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-xs text-white font-bold cursor-pointer"
                >
                  Close Photo Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SMART CONTRACT, DOCS, VIDEOS MODALS
         ========================================================================= */}
      {/* Smart Contract Modal */}
      <AnimatePresence>
        {smartContractModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-3xl max-h-[85vh] bg-white border border-[#DDD3C2] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-5 border-b border-[#EAE2D2] flex items-center justify-between bg-[#F8F5EE]">
                <div className="flex items-center gap-2.5">
                  <Code className="w-5 h-5 text-[#DC2626]" />
                  <span className="font-bold text-[#1A1F18] text-sm font-mono">DarpanCivicRegistry.sol</span>
                </div>
                <button onClick={() => setSmartContractModalOpen(false)} className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 font-mono text-xs text-[#1A1F18] leading-relaxed">
                <pre className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] overflow-x-auto">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DarpanCivicRegistry
 * @dev Sovereign Civic Complaint State Machine with ZK DigiLocker Verification
 */
contract DarpanCivicRegistry {
    enum Status { Pending, MunicipalVerified, ActionAssigned, Resolved }

    struct ComplaintRecord {
        bytes32 hashId;
        address citizenZKHash;
        uint32 wardId;
        string ipfsCid;
        Status currentStatus;
        uint64 loggedBlock;
        uint64 slaDeadlineBlock;
        address assignedContractor;
        string resolutionProofCid;
    }

    mapping(bytes32 => ComplaintRecord) public registry;
    event ComplaintLogged(bytes32 indexed hashId, address indexed citizen, uint32 wardId);
    event StatusAdvanced(bytes32 indexed hashId, Status newStatus, address authority);

    function logComplaint(
        bytes32 _hashId,
        uint32 _wardId,
        string calldata _ipfsCid,
        bytes calldata _zkProof
    ) external returns (bool) {
        require(registry[_hashId].loggedBlock == 0, "Hash already registered");
        registry[_hashId] = ComplaintRecord({
            hashId: _hashId,
            citizenZKHash: msg.sender,
            wardId: _wardId,
            ipfsCid: _ipfsCid,
            currentStatus: Status.Pending,
            loggedBlock: uint64(block.number),
            slaDeadlineBlock: uint64(block.number + 14400),
            assignedContractor: address(0),
            resolutionProofCid: ""
        });
        emit ComplaintLogged(_hashId, msg.sender, _wardId);
        return true;
    }
}`}
                </pre>
              </div>

              <div className="p-4 border-t border-[#EAE2D2] flex justify-end bg-[#F8F5EE]">
                <button
                  onClick={() => setSmartContractModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-xs text-white font-bold cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Docs Modal */}
      <AnimatePresence>
        {docsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-2xl bg-white border border-[#DDD3C2] rounded-3xl p-8 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-normal text-[#1A1F18] flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-[#DC2626]" />
                  <span>Darpan Civic Whitepaper</span>
                </h3>
                <button onClick={() => setDocsModalOpen(false)} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#596353] leading-relaxed">
                Darpan's architecture whitepaper outlines the integration of municipal ward governance with layer-2 rollups. The complete documentation covers Merkle-proof verification, zero-knowledge Aadhaar integration, and automated municipal penalty distribution for SLA non-compliance.
              </p>
              <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] text-xs font-mono space-y-1.5 text-[#1A1F18]">
                <div>• Version: 2.4.1 Production Release</div>
                <div>• Cryptographic primitives: Groth16 ZK-SNARKs, SHA-256, Keccak-256</div>
                <div>• Consensus Layer: Ethereum L2 / Polygon Proof-of-Stake</div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setDocsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold cursor-pointer"
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Videos Modal */}
      <AnimatePresence>
        {videosModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-2xl bg-white border border-[#DDD3C2] rounded-3xl p-8 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-normal text-[#1A1F18] flex items-center gap-2.5">
                  <Video className="w-5 h-5 text-[#DC2626]" />
                  <span>Civic Media Library</span>
                </h3>
                <button onClick={() => setVideosModalOpen(false)} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#1A1F18]">Episode 1: How Smart Contracts Enforce Civic SLAs</div>
                    <div className="text-[11px] text-[#6B7264]">14-minute masterclass on decentralized accountability</div>
                  </div>
                  <span className="text-xs text-[#DC2626] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#DDD3C2]">1080p HD</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DDD3C2] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#1A1F18]">Episode 2: DigiLocker & Sovereign Identity (Zero-Knowledge)</div>
                    <div className="text-[11px] text-[#6B7264]">Understanding citizen privacy without PII exposure</div>
                  </div>
                  <span className="text-xs text-[#DC2626] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#DDD3C2]">4K Ultra</span>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setVideosModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold cursor-pointer"
                >
                  Close Media Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PERSISTENT BESPOKE FOOTER (WITH RED LOGO AS REQUIRED)
         ========================================================================= */}
      <footer className="relative z-10 w-full border-t border-[#E2D9C8] bg-[#F1EDE4] mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#6B7264]">
          
          {/* Footer Logo in bold RED */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#DC2626] border border-[#B91C1C] flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-serif text-[#1A1F18] font-bold text-sm">DARPAN</span>
              <span className="text-[#848E7E] ml-2 font-mono text-[11px]">Civic Public Good Protocol</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button onClick={() => navigateTo('discover')} className="hover:text-[#1A1F18] transition-colors cursor-pointer">Discover</button>
            <button onClick={() => navigateTo('draft')} className="hover:text-[#1A1F18] transition-colors cursor-pointer">Draft</button>
            <button onClick={() => navigateTo('digilocker')} className="hover:text-[#1A1F18] transition-colors cursor-pointer">Generate Hash</button>
            <button onClick={() => navigateTo('track')} className="hover:text-[#1A1F18] transition-colors cursor-pointer">Track</button>
            <button onClick={() => navigateTo('know_more')} className="hover:text-[#1A1F18] transition-colors cursor-pointer">Know More</button>
            <a 
              href="https://take.quiz-maker.com/QV9WG8U62" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#DC2626] hover:text-[#B91C1C] font-bold flex items-center gap-0.5"
            >
              <span>Quiz</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="font-mono text-[11px] text-[#6B7264]">
            Node Consensus #20,492,194 · Sovereign DigiLocker Enabled
          </div>
        </div>
      </footer>

    </div>
  );
}
