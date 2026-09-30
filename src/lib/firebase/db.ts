import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  Timestamp,
  Query,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';

// Mock data for when Firebase isn't available
const MOCK_PAPERS = [
  {
    id: '1',
    title: 'Urban expansion and agricultural land loss in Indian metropolitan regions',
    authors: ['Dr. Ramesh Kumar', 'Dr. Priya Sharma', 'Dr. Anil Patel'],
    year: 2023,
    abstract: 'This study quantifies agricultural land loss around major Indian cities using Sentinel-2 LULC data.',
    geography: 'Mumbai, Delhi, Bangalore',
    datasets: ['Sentinel-2 LULC', 'Census population'],
    methods: ['Change detection analysis', 'Spatial regression'],
    findings: ['Agricultural loss: 12% over 8 years'],
    limitations: ['Cloud cover affects monsoon data'],
    validationStatus: 'verified',
  },
  {
    id: '2',
    title: 'Land conversion patterns and farmer livelihood impacts in Tier-2 Indian cities',
    authors: ['Dr. Meera Desai', 'Dr. Suresh Iyer'],
    year: 2022,
    abstract: 'Qualitative and quantitative study of how rapid urbanization affects farmer incomes.',
    geography: 'Pune, Nagpur, Aurangabad',
    datasets: ['Household surveys', 'Income data'],
    methods: ['Household surveys', 'FGDs'],
    findings: ['Average income decline: 23%'],
    limitations: ['Sample limited to 3 regions'],
    validationStatus: 'verified',
  },
];

const MOCK_DATASETS = [
  {
    id: '1',
    name: 'Land Use Land Cover (LULC) - Sentinel-2',
    source: 'VEDAS/ISRO-SAC',
    description: 'Satellite-based land-use classification',
    type: 'raster',
    coverage: ['Maharashtra', 'Karnataka'],
    spatialResolution: '30m',
    validationStatus: 'verified',
  },
  {
    id: '2',
    name: 'Population Census 2021',
    source: 'Census of India',
    description: 'District and block level population data',
    type: 'tabular',
    coverage: ['India-wide'],
    spatialResolution: 'District',
    validationStatus: 'verified',
  },
];

export async function createProblem(problemData: any) {
  try {
    const docRef = await addDoc(collection(db, 'problems'), {
      ...problemData,
      createdAt: Timestamp.now(),
      status: 'discovered',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating problem:', error);
    throw error;
  }
}

export async function getProblem(problemId: string) {
  try {
    const docRef = doc(db, 'problems', problemId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error fetching problem:', error);
    throw error;
  }
}

export async function getAllProblems() {
  try {
    const querySnapshot = await getDocs(collection(db, 'problems'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
}

export async function createDataset(datasetData: any) {
  try {
    const docRef = await addDoc(collection(db, 'datasets'), {
      ...datasetData,
      createdAt: Timestamp.now(),
      validationStatus: 'verified',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating dataset:', error);
    throw error;
  }
}

export async function getAllDatasets() {
  try {
    if (!db) {
      return MOCK_DATASETS;
    }
    const querySnapshot = await getDocs(collection(db, 'datasets'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn('Error fetching datasets, using mock data:', error);
    return MOCK_DATASETS;
  }
}

export async function createResearchPaper(paperData: any) {
  try {
    const docRef = await addDoc(collection(db, 'researchPapers'), {
      ...paperData,
      createdAt: Timestamp.now(),
      validationStatus: 'verified',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating research paper:', error);
    throw error;
  }
}

export async function getAllResearchPapers() {
  try {
    if (!db) {
      return MOCK_PAPERS;
    }
    const querySnapshot = await getDocs(collection(db, 'researchPapers'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn('Error fetching research papers, using mock data:', error);
    return MOCK_PAPERS;
  }
}

export async function createExperiment(experimentData: any) {
  try {
    const docRef = await addDoc(collection(db, 'policyExperiments'), {
      ...experimentData,
      createdAt: Timestamp.now(),
      status: 'proposed',
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating experiment:', error);
    throw error;
  }
}

export async function getExperiment(experimentId: string) {
  try {
    const docRef = doc(db, 'policyExperiments', experimentId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error fetching experiment:', error);
    throw error;
  }
}

export async function getAllExperiments() {
  try {
    const querySnapshot = await getDocs(collection(db, 'policyExperiments'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching experiments:', error);
    throw error;
  }
}

export async function recordKPIObservation(observation: any) {
  try {
    const docRef = await addDoc(collection(db, 'kpiObservations'), {
      ...observation,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error recording KPI:', error);
    throw error;
  }
}

export async function getKPIObservations(experimentId: string) {
  try {
    const q = query(
      collection(db, 'kpiObservations'),
      where('experimentId', '==', experimentId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching KPI observations:', error);
    throw error;
  }
}

export async function createPolicyPassport(passportData: any) {
  try {
    const docRef = await addDoc(collection(db, 'policyPassports'), {
      ...passportData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating passport:', error);
    throw error;
  }
}

export async function getPolicyPassport(passportId: string) {
  try {
    const docRef = doc(db, 'policyPassports', passportId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error fetching passport:', error);
    throw error;
  }
}

export async function getAllPolicyPassports() {
  try {
    const querySnapshot = await getDocs(collection(db, 'policyPassports'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching passports:', error);
    throw error;
  }
}

export async function createEvidenceRelationship(relationship: any) {
  try {
    const docRef = await addDoc(collection(db, 'evidenceRelationships'), {
      ...relationship,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating evidence relationship:', error);
    throw error;
  }
}

export async function getEvidenceByProblem(problemId: string) {
  try {
    const q = query(
      collection(db, 'evidenceRelationships'),
      where('problemId', '==', problemId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching evidence:', error);
    throw error;
  }
}

export async function createResearchGap(gapData: any) {
  try {
    const docRef = await addDoc(collection(db, 'researchGaps'), {
      ...gapData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating research gap:', error);
    throw error;
  }
}

export async function getResearchGaps(problemId: string) {
  try {
    const q = query(
      collection(db, 'researchGaps'),
      where('problemId', '==', problemId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching research gaps:', error);
    throw error;
  }
}

export async function findSimilarExperiments(experimentId: string, threshold = 0.7) {
  try {
    const q = query(
      collection(db, 'similarExperiments'),
      where('sourceExperimentId', '==', experimentId),
      where('similarityScore', '>=', threshold)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error finding similar experiments:', error);
    throw error;
  }
}

export async function updateExperiment(experimentId: string, updates: any) {
  try {
    const docRef = doc(db, 'policyExperiments', experimentId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating experiment:', error);
    throw error;
  }
}
