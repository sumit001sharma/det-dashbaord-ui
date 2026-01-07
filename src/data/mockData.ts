export interface TourismData {
  month: string;
  visitors: number;
  hotelOccupancy: number;
  revenue: number;
  satisfaction: number;
}

export interface HotelData {
  category: string;
  rooms: number;
  occupancy: number;
  adr: number;
}

export interface VisitorOrigin {
  country: string;
  visitors: number;
  growth: number;
}

export interface EconomicIndicator {
  indicator: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export const tourismTrends: TourismData[] = [
  { month: 'Jan 2024', visitors: 1770000, hotelOccupancy: 82, revenue: 520, satisfaction: 4.5 },
  { month: 'Feb 2024', visitors: 1900000, hotelOccupancy: 85, revenue: 580, satisfaction: 4.6 },
  { month: 'Mar 2024', visitors: 1510000, hotelOccupancy: 78, revenue: 490, satisfaction: 4.4 },
  { month: 'Apr 2024', visitors: 1500000, hotelOccupancy: 80, revenue: 510, satisfaction: 4.5 },
  { month: 'May 2024', visitors: 1440000, hotelOccupancy: 79, revenue: 495, satisfaction: 4.4 },
  { month: 'Jun 2024', visitors: 1630000, hotelOccupancy: 83, revenue: 540, satisfaction: 4.6 },
  { month: 'Jul 2024', visitors: 1310000, hotelOccupancy: 76, revenue: 465, satisfaction: 4.3 },
  { month: 'Aug 2024', visitors: 1310000, hotelOccupancy: 77, revenue: 470, satisfaction: 4.4 },
  { month: 'Sep 2024', visitors: 1360000, hotelOccupancy: 79, revenue: 485, satisfaction: 4.4 },
  { month: 'Oct 2024', visitors: 1670000, hotelOccupancy: 85, revenue: 560, satisfaction: 4.6 },
  { month: 'Nov 2024', visitors: 1830000, hotelOccupancy: 88, revenue: 620, satisfaction: 4.7 },
  { month: 'Dec 2024', visitors: 1930000, hotelOccupancy: 92, revenue: 680, satisfaction: 4.8 },
];

export const hotelCategories: HotelData[] = [
  { category: '5 Star', rooms: 55284, occupancy: 79, adr: 450 },
  { category: '4 Star', rooms: 43326, occupancy: 81, adr: 280 },
  { category: '1-3 Star', rooms: 29387, occupancy: 81, adr: 180 },
  { category: 'Hotel Apartment (Deluxe/Superior)', rooms: 13892, occupancy: 82, adr: 220 },
  { category: 'Hotel Apartment (Standard)', rooms: 11403, occupancy: 84, adr: 180 },
];

export const visitorOrigins: VisitorOrigin[] = [
  { country: 'India', visitors: 2100000, growth: 5.0 },
  { country: 'Saudi Arabia', visitors: 1850000, growth: 8.5 },
  { country: 'United Kingdom', visitors: 1320000, growth: 6.2 },
  { country: 'Oman', visitors: 980000, growth: 12.3 },
  { country: 'United States', visitors: 890000, growth: 7.8 },
  { country: 'Russia', visitors: 780000, growth: 15.2 },
  { country: 'Germany', visitors: 720000, growth: 4.5 },
  { country: 'China', visitors: 650000, growth: 18.7 },
];

export const economicIndicators: EconomicIndicator[] = [
  { indicator: 'Total FDI Projects', value: 1826, change: 11, trend: 'up' },
  { indicator: 'Greenfield FDI Projects', value: 1117, change: 0.2, trend: 'up' },
  { indicator: 'FDI Capital (AED Bn)', value: 52.3, change: 33, trend: 'up' },
  { indicator: 'Jobs Created via FDI', value: 58680, change: 31, trend: 'up' },
  { indicator: 'VC-Backed FDI (AED M)', value: 815, change: -6.6, trend: 'down' },
  { indicator: 'VC Startup Deals', value: 110, change: 39, trend: 'up' },
];

export const monthlyRevenue = [
  { month: 'Jan', retail: 2.8, hospitality: 3.2, entertainment: 1.5, transport: 1.8 },
  { month: 'Feb', retail: 3.1, hospitality: 3.5, entertainment: 1.7, transport: 2.0 },
  { month: 'Mar', retail: 3.4, hospitality: 3.8, entertainment: 1.9, transport: 2.2 },
  { month: 'Apr', retail: 3.2, hospitality: 3.6, entertainment: 1.8, transport: 2.1 },
  { month: 'May', retail: 2.9, hospitality: 3.3, entertainment: 1.6, transport: 1.9 },
  { month: 'Jun', retail: 3.3, hospitality: 3.7, entertainment: 1.8, transport: 2.1 },
  { month: 'Jul', retail: 3.8, hospitality: 4.2, entertainment: 2.2, transport: 2.5 },
  { month: 'Aug', retail: 4.0, hospitality: 4.5, entertainment: 2.4, transport: 2.7 },
  { month: 'Sep', retail: 3.5, hospitality: 3.9, entertainment: 2.0, transport: 2.3 },
  { month: 'Oct', retail: 3.7, hospitality: 4.1, entertainment: 2.1, transport: 2.4 },
  { month: 'Nov', retail: 4.2, hospitality: 4.6, entertainment: 2.5, transport: 2.8 },
  { month: 'Dec', retail: 4.5, hospitality: 5.0, entertainment: 2.8, transport: 3.0 },
];

export interface IndustryData {
  industry: string;
  gdpContribution: number;
  companies: number;
  employment: number;
  growth: number;
  category: string;
}

export const dubaiIndustries: IndustryData[] = [
  { industry: 'Tourism & Hospitality', gdpContribution: 11.5, companies: 8500, employment: 385000, growth: 12.3, category: 'Services' },
  { industry: 'Financial Services', gdpContribution: 13.2, companies: 4200, employment: 125000, growth: 8.7, category: 'Services' },
  { industry: 'Real Estate & Construction', gdpContribution: 9.8, companies: 12000, employment: 420000, growth: 6.5, category: 'Construction' },
  { industry: 'Trade & Logistics', gdpContribution: 26.5, companies: 15000, employment: 520000, growth: 10.2, category: 'Trade' },
  { industry: 'Technology & Innovation', gdpContribution: 4.8, companies: 3500, employment: 95000, growth: 18.5, category: 'Technology' },
  { industry: 'Healthcare & Life Sciences', gdpContribution: 3.2, companies: 2800, employment: 85000, growth: 14.2, category: 'Healthcare' },
  { industry: 'Manufacturing', gdpContribution: 8.5, companies: 6500, employment: 280000, growth: 7.8, category: 'Manufacturing' },
  { industry: 'Retail & E-commerce', gdpContribution: 7.2, companies: 18000, employment: 320000, growth: 11.5, category: 'Retail' },
  { industry: 'Media & Entertainment', gdpContribution: 2.8, companies: 2200, employment: 65000, growth: 9.8, category: 'Media' },
  { industry: 'Education', gdpContribution: 2.5, companies: 1800, employment: 75000, growth: 8.2, category: 'Education' },
  { industry: 'Energy & Utilities', gdpContribution: 5.8, companies: 850, employment: 45000, growth: 5.5, category: 'Energy' },
  { industry: 'Transportation', gdpContribution: 4.2, companies: 3200, employment: 185000, growth: 7.2, category: 'Transport' },
];

export interface IndustryPerformance {
  quarter: string;
  tourism: number;
  finance: number;
  trade: number;
  technology: number;
  healthcare: number;
  manufacturing: number;
}

export const industryPerformance: IndustryPerformance[] = [
  { quarter: 'Q1 2023', tourism: 8.2, finance: 12.5, trade: 24.8, technology: 4.2, healthcare: 2.8, manufacturing: 7.8 },
  { quarter: 'Q2 2023', tourism: 9.5, finance: 12.8, trade: 25.2, technology: 4.5, healthcare: 2.9, manufacturing: 8.1 },
  { quarter: 'Q3 2023', tourism: 10.8, finance: 13.0, trade: 25.8, technology: 4.7, healthcare: 3.0, manufacturing: 8.3 },
  { quarter: 'Q4 2023', tourism: 11.5, finance: 13.2, trade: 26.5, technology: 4.8, healthcare: 3.2, manufacturing: 8.5 },
];

export interface FDISourceCountry {
  country: string;
  capitalShare: number;
  projectsShare: number;
  capitalRank: number;
  projectsRank: number;
}

export const fdiSourceCountries: FDISourceCountry[] = [
  { country: 'India', capitalShare: 21.5, projectsShare: 15, capitalRank: 1, projectsRank: 2 },
  { country: 'United States', capitalShare: 13.7, projectsShare: 14, capitalRank: 2, projectsRank: 3 },
  { country: 'United Kingdom', capitalShare: 10, projectsShare: 17, capitalRank: 4, projectsRank: 1 },
  { country: 'France', capitalShare: 11, projectsShare: 4.5, capitalRank: 3, projectsRank: 4 },
  { country: 'Switzerland', capitalShare: 6.9, projectsShare: 3.2, capitalRank: 5, projectsRank: 6 },
  { country: 'Italy', capitalShare: 3.5, projectsShare: 4, capitalRank: 7, projectsRank: 5 },
];

export interface FDISector {
  sector: string;
  capitalShare: number;
  projectsShare: number;
  projectCount: number;
}

export const fdiSectorsByCapital: FDISector[] = [
  { sector: 'Hotels & Tourism', capitalShare: 14, projectsShare: 2.5, projectCount: 45 },
  { sector: 'Real Estate', capitalShare: 14, projectsShare: 0.6, projectCount: 11 },
  { sector: 'Software & IT Services', capitalShare: 9.2, projectsShare: 14.3, projectCount: 261 },
  { sector: 'Building Materials', capitalShare: 9, projectsShare: 0.5, projectCount: 9 },
  { sector: 'Financial Services', capitalShare: 6.8, projectsShare: 2.8, projectCount: 51 },
];

export const fdiSectorsByProjects: FDISector[] = [
  { sector: 'Business Services', capitalShare: 8.5, projectsShare: 19.2, projectCount: 350 },
  { sector: 'Food & Beverages', capitalShare: 5.2, projectsShare: 16.5, projectCount: 301 },
  { sector: 'Software & IT Services', capitalShare: 9.2, projectsShare: 14.3, projectCount: 261 },
  { sector: 'Textiles', capitalShare: 3.8, projectsShare: 9.6, projectCount: 175 },
  { sector: 'Consumer Products', capitalShare: 4.1, projectsShare: 8.3, projectCount: 152 },
];

export interface FDIBusinessFunction {
  function: string;
  capitalShare: number;
  projectsShare: number;
}

export const fdiBusinessFunctions: FDIBusinessFunction[] = [
  { function: 'Construction', capitalShare: 35.4, projectsShare: 2 },
  { function: 'Retail', capitalShare: 12, projectsShare: 35.4 },
  { function: 'Business Services', capitalShare: 10, projectsShare: 32.7 },
  { function: 'Manufacturing', capitalShare: 11.1, projectsShare: 1.3 },
  { function: 'Sales, Marketing & Support', capitalShare: 8.2, projectsShare: 21.4 },
  { function: 'Logistics, Distribution & Transportation', capitalShare: 8.8, projectsShare: 1.8 },
  { function: 'Headquarters', capitalShare: 2.5, projectsShare: 2.7 },
];

export interface FDIInvestmentType {
  type: string;
  share: number;
  description: string;
}

export const fdiInvestmentTypes: FDIInvestmentType[] = [
  { type: 'Greenfield (wholly-owned)', share: 53.2, description: 'New FDI projects and business ventures' },
  { type: 'New Forms of Investments (NFIs)', share: 34.6, description: 'Non-equity modes including JVs, alliances, franchising' },
  { type: 'Reinvestment', share: 5.7, description: 'Existing FDI projects expansion' },
  { type: 'VC Backed FDI', share: 4.5, description: 'FDI into Dubai-based startups' },
  { type: 'Mergers & Acquisitions', share: 2, description: 'M&A deals' },
  { type: 'Greenfield (JV)', share: 0.1, description: 'Joint venture projects' },
];

export interface GlobalRanking {
  category: string;
  rank: number;
  value: number | string;
  region?: string;
}

export const dubaiGlobalRankings: GlobalRanking[] = [
  { category: 'Greenfield FDI Projects', rank: 1, value: 1117, region: 'Global' },
  { category: 'FDI Capital Attraction', rank: 4, value: 'AED 52.3B', region: 'Global' },
  { category: 'Job Creation via FDI', rank: 3, value: 58680, region: 'Global' },
  { category: 'AIT FDI Projects', rank: 1, value: 146, region: 'Global' },
  { category: 'Headquarters FDI Projects', rank: 1, value: 50, region: 'Global' },
  { category: 'MEA Greenfield FDI Capital', rank: 1, value: 'AED 52.3B', region: 'MEA' },
];

export interface DETService {
  id: string;
  name: string;
  category: string;
  subcategories: string[];
  description: string;
  serviceType: 'Permit' | 'Registration' | 'Approval' | 'Classification' | 'Training' | 'Ticketing' | 'Complaint' | 'Partnership';
}

export const detServices: DETService[] = [
  { id: 'S001', name: 'Apply for an event permit', category: 'Event organisers and retail', subcategories: ['Permits'], description: 'Required for venues organizing entertainment, sport, charity, religious or business events', serviceType: 'Permit' },
  { id: 'S002', name: 'Apply for an activity permit', category: 'Event organisers and retail', subcategories: ['Permits', 'Hospitality services'], description: 'For venues including hotels, restaurants or malls for recurring entertainment activations up to 3 months', serviceType: 'Permit' },
  { id: 'S003', name: 'Classify a hotel establishment', category: 'Hospitality services', subcategories: ['Classification'], description: 'All hotels must apply for classification to operate in Dubai', serviceType: 'Classification' },
  { id: 'S004', name: 'New Holiday Homes Permit Issuance', category: 'Hospitality services', subcategories: ['Permits'], description: 'Apply for residential unit to operate as a Holiday Home', serviceType: 'Permit' },
  { id: 'S005', name: 'Apply to become a licensed tour guide', category: 'Tourism companies', subcategories: ['Permits'], description: 'Complete Dubai tour guide online program to become licensed', serviceType: 'Permit' },
  { id: 'S006', name: 'Apply for electronic certificates', category: 'Tourism companies', subcategories: ['Registration', 'Hospitality services'], description: 'Submit traveller details for desert safari excursions', serviceType: 'Registration' },
  { id: 'S007', name: 'Register safari drivers and vehicles', category: 'Tourism companies', subcategories: ['Registration'], description: 'Register drivers and vehicles for safari trips in Dubai', serviceType: 'Registration' },
  { id: 'S008', name: 'Apply for safari driver training', category: 'Tourism companies', subcategories: ['Training accreditation', 'Permits'], description: 'Five-day safari driving training required by RTA', serviceType: 'Training' },
  { id: 'S009', name: 'Dubai Way online platform', category: 'Training accreditation', subcategories: ['Tourism companies', 'Hospitality services'], description: 'Professional tourism training for organizations', serviceType: 'Training' },
  { id: 'S010', name: 'Dubai Expert training', category: 'Tourism companies', subcategories: ['Training accreditation'], description: 'Training game for travel trade professionals to develop Dubai expertise', serviceType: 'Training' },
  { id: 'S011', name: 'Issue event tickets', category: 'Event organisers and retail', subcategories: ['Ticketing'], description: 'Apply for ticketing with approved ticket seller or registration provider', serviceType: 'Ticketing' },
  { id: 'S012', name: 'Register as a ticket seller (API)', category: 'Event organisers and retail', subcategories: ['Ticketing'], description: 'Integration with DET ticketing system via API', serviceType: 'Registration' },
  { id: 'S013', name: 'File trademark infringement complaint', category: 'Intellectual Property owners', subcategories: ['Complaints'], description: 'Submit infringement complaints via IP Gateway portal', serviceType: 'Complaint' },
  { id: 'S014', name: 'List event on Dubai Calendar', category: 'Event organisers and retail', subcategories: ['Partnerships'], description: 'Connect with audiences by listing events on Dubai Calendar', serviceType: 'Partnership' },
  { id: 'S015', name: 'Apply for LESI sponsorship', category: 'Event organisers and retail', subcategories: ['Partnerships'], description: 'Leisure Events Strategic Investment fund for innovative event concepts', serviceType: 'Partnership' },
  { id: 'S016', name: 'Register as timeshare operator', category: 'Hospitality services', subcategories: ['Registration', 'DET'], description: 'Valid permit required for timeshare activity in Dubai', serviceType: 'Registration' },
  { id: 'S017', name: 'Apply for desert camp permit', category: 'Tourism companies', subcategories: ['Permits'], description: 'Required to open and operate a desert camp as tourism activity', serviceType: 'Permit' },
  { id: 'S018', name: 'Register as supplier', category: 'Vendors and suppliers', subcategories: ['Registration'], description: 'Register for contract bidding via Government Resources Planning system', serviceType: 'Registration' },
  { id: 'S019', name: 'Contactless check-in platform', category: 'Hospitality services', subcategories: ['Registration'], description: 'Hotels and holiday homes registration for contactless check-in service', serviceType: 'Registration' },
  { id: 'S020', name: 'Apply for promotion certificate', category: 'Event organisers and retail', subcategories: ['Approvals', 'Vendors and suppliers'], description: 'DFRE certificate for retail promotions during festivals and events', serviceType: 'Approval' },
];

export interface ServiceCategory {
  category: string;
  serviceCount: number;
  popularServices: string[];
  icon: string;
}

export const detServiceCategories: ServiceCategory[] = [
  { category: 'Event organisers and retail', serviceCount: 15, popularServices: ['Event permits', 'Activity permits', 'Ticketing'], icon: 'Calendar' },
  { category: 'Hospitality services', serviceCount: 25, popularServices: ['Hotel classification', 'Holiday Homes', 'Contactless check-in'], icon: 'Hotel' },
  { category: 'Tourism companies', serviceCount: 18, popularServices: ['Tour guide licensing', 'Safari permits', 'Electronic certificates'], icon: 'Compass' },
  { category: 'Training accreditation', serviceCount: 8, popularServices: ['Dubai Way', 'Dubai Expert', 'Safari driver training'], icon: 'GraduationCap' },
  { category: 'Permits', serviceCount: 22, popularServices: ['Event permits', 'Holiday Homes', 'Desert camps'], icon: 'FileCheck' },
  { category: 'Registration', serviceCount: 12, popularServices: ['Timeshare operators', 'Safari drivers', 'Suppliers'], icon: 'UserPlus' },
  { category: 'Classification', serviceCount: 8, popularServices: ['Hotel classification', 'Reclassification', 'Advisory services'], icon: 'Star' },
  { category: 'Ticketing', serviceCount: 5, popularServices: ['Event tickets', 'Walk-in tickets', 'Ticket seller API'], icon: 'Ticket' },
];

export interface ServiceMetrics {
  totalServices: number;
  activePermits: number;
  registeredOperators: number;
  trainedProfessionals: number;
  eventsSupported: number;
  classifiedHotels: number;
}

export const detServiceMetrics: ServiceMetrics = {
  totalServices: 60,
  activePermits: 12500,
  registeredOperators: 8500,
  trainedProfessionals: 15000,
  eventsSupported: 3200,
  classifiedHotels: 850,
};

export interface DETOrganization {
  name: string;
  vision: string;
  mission: string;
  mandate: string[];
  website: string;
  industry: string;
  companySize: string;
  headquarters: string;
  type: string;
  specialties: string[];
}

export const detOrganization: DETOrganization = {
  name: 'Dubai Department of Economy and Tourism (DET)',
  vision: 'Making Dubai the world\'s leading commercial centre, investment hub and tourism destination',
  mission: 'Support the Government in positioning the emirate as a major hub for global economy and tourism, and boost the city\'s economic and tourism competitiveness indicators',
  mandate: [
    'Enhance Dubai\'s diversified, innovative service-based economy',
    'Attract top global talent',
    'Deliver a world-class business environment',
    'Accelerate productivity growth',
    'Promote Dubai as the world\'s best city to live and work in',
    'Principal authority for planning, supervision, development and marketing of Dubai\'s business and tourism sectors',
    'Licensing and classification of all types of businesses, hotels, tour operators and travel agents',
  ],
  website: 'https://www.visitdubai.com/',
  industry: 'Government Administration',
  companySize: '501-1,000 employees',
  headquarters: 'Dubai, Dubai',
  type: 'Government Agency',
  specialties: [
    'Tourism in Dubai',
    'Dubai\'s Hotels Classifications and Licensing',
    'Digital Marketing',
    'Public Relations',
    'Events Marketing',
    'Customer Service',
    'Legal',
    'Procurement',
    'Finance',
    'Social Media',
    'Dubai Sustainable Tourism',
    'Dubai College of Tourism',
    'Dubai Business Events',
    'Dubai Industries and Exports',
    'Dubai Investment Development Agency',
    'Dubai FDI',
    'Dubai SME',
    'Dubai Calendar',
    'Dubai Festivals and Retail Establishment',
    'Dubai Corporation for Tourism and Commerce Marketing',
  ],
};

export interface DETPortfolioEntity {
  name: string;
  abbreviation: string;
  focus: string;
  description: string;
  category: 'Tourism' | 'Business' | 'Investment' | 'SME' | 'Consumer Protection' | 'Education' | 'Events';
}

export const detPortfolio: DETPortfolioEntity[] = [
  { name: 'Dubai Corporation for Tourism and Commerce Marketing', abbreviation: 'DCTCM', focus: 'Tourism Marketing', description: 'Promotes Dubai as a leading tourism destination globally', category: 'Tourism' },
  { name: 'Dubai Festivals and Retail Establishment', abbreviation: 'DFRE', focus: 'Events & Retail', description: 'Organizes major festivals and retail events in Dubai', category: 'Events' },
  { name: 'Dubai Commercial Registration and Licensing Corporation', abbreviation: 'DCRLC', focus: 'Business Licensing', description: 'Handles commercial registration and business licensing', category: 'Business' },
  { name: 'Dubai Economic Development Corporation', abbreviation: 'DEDC', focus: 'Economic Development', description: 'Drives economic development initiatives and strategies', category: 'Business' },
  { name: 'Dubai Investment Development Agency', abbreviation: 'Dubai FDI', focus: 'Foreign Investment', description: 'Attracts and facilitates foreign direct investment into Dubai', category: 'Investment' },
  { name: 'Dubai SME', abbreviation: 'Dubai SME', focus: 'SME Support', description: 'Supports small and medium enterprises development', category: 'SME' },
  { name: 'Dubai Consumer Protection and Fairtrade Corporation', abbreviation: 'DCPFC', focus: 'Consumer Rights', description: 'Protects consumer rights and ensures fair trade practices', category: 'Consumer Protection' },
  { name: 'Dubai Industries and Exports', abbreviation: 'DIE', focus: 'Industrial Development', description: 'Promotes industrial development and export activities', category: 'Business' },
  { name: 'Dubai College of Tourism', abbreviation: 'DCT', focus: 'Tourism Education', description: 'Provides professional tourism education and training', category: 'Education' },
  { name: 'Dubai Sustainable Tourism', abbreviation: 'DST', focus: 'Sustainability', description: 'Promotes sustainable tourism practices and initiatives', category: 'Tourism' },
  { name: 'Dubai Calendar', abbreviation: 'DC', focus: 'Events Platform', description: 'Central platform for all Dubai events and activities', category: 'Events' },
  { name: 'Dubai Business Events', abbreviation: 'DBE', focus: 'MICE', description: 'Promotes Dubai as a leading business events destination', category: 'Events' },
];

export interface DETStrategicPillar {
  pillar: string;
  description: string;
  keyInitiatives: string[];
  impact: string;
}

export const detStrategicPillars: DETStrategicPillar[] = [
  {
    pillar: 'Economic Diversification',
    description: 'Enhance Dubai\'s service-based economy and attract global businesses',
    keyInitiatives: ['FDI attraction', 'SME support', 'Innovation hubs', 'Startup ecosystem'],
    impact: 'AED 52.3B FDI capital in 2024',
  },
  {
    pillar: 'Tourism Excellence',
    description: 'Position Dubai as world\'s leading tourism destination',
    keyInitiatives: ['Destination marketing', 'Hotel classification', 'Sustainable tourism', 'Visitor experience'],
    impact: '18.72M annual visitors in 2024',
  },
  {
    pillar: 'Business Environment',
    description: 'Deliver world-class business infrastructure and services',
    keyInitiatives: ['Digital transformation', 'Licensing efficiency', 'Regulatory excellence', 'Investor support'],
    impact: '12,500+ active permits',
  },
  {
    pillar: 'Talent & Skills',
    description: 'Attract and develop top global talent',
    keyInitiatives: ['Professional training', 'Dubai College of Tourism', 'Dubai Way platform', 'Certification programs'],
    impact: '15,000+ trained professionals',
  },
  {
    pillar: 'Events & Festivals',
    description: 'Create vibrant calendar of world-class events',
    keyInitiatives: ['Dubai Calendar', 'Business events', 'Retail festivals', 'Cultural celebrations'],
    impact: '3,200+ events supported',
  },
];

export interface AnnualTourismData {
  year: number;
  visitors: number;
  growth: number;
  topSourceMarket: string;
  topSourceVisitors: number;
}

export const annualTourismData: AnnualTourismData[] = [
  { year: 2018, visitors: 15920000, growth: 0.8, topSourceMarket: 'India', topSourceVisitors: 2000000 },
  { year: 2019, visitors: 16730000, growth: 5.1, topSourceMarket: 'India', topSourceVisitors: 2000000 },
  { year: 2020, visitors: 5510000, growth: -67.1, topSourceMarket: 'India', topSourceVisitors: 865000 },
  { year: 2021, visitors: 7280000, growth: 32.1, topSourceMarket: 'India', topSourceVisitors: 910000 },
  { year: 2022, visitors: 14360000, growth: 97.3, topSourceMarket: 'India', topSourceVisitors: 1800000 },
  { year: 2023, visitors: 17150000, growth: 19.4, topSourceMarket: 'India', topSourceVisitors: 2000000 },
  { year: 2024, visitors: 18720000, growth: 9.2, topSourceMarket: 'India', topSourceVisitors: 2100000 },
];

export interface Tourism2025Data {
  period: string;
  visitors: number;
  growth: number;
}

export const tourism2025Progress: Tourism2025Data[] = [
  { period: 'Jan 2025', visitors: 1940000, growth: 9 },
  { period: 'Jan-Feb 2025', visitors: 3820000, growth: 4 },
  { period: 'Jan-Mar 2025', visitors: 5310000, growth: 3 },
  { period: 'Jan-Apr 2025', visitors: 7150000, growth: 7 },
  { period: 'Jan-May 2025', visitors: 8680000, growth: 7 },
  { period: 'Jan-Jun 2025', visitors: 9880000, growth: 6 },
  { period: 'Jan-Jul 2025', visitors: 11170000, growth: 5 },
  { period: 'Jan-Aug 2025', visitors: 12540000, growth: 5 },
  { period: 'Jan-Sep 2025', visitors: 13950000, growth: 5 },
  { period: 'Jan-Oct 2025', visitors: 15700000, growth: 5 },
  { period: 'Jan-Nov 2025', visitors: 17550000, growth: 5 },
];

export interface VisitorsByRegion {
  region: string;
  percentage: number;
  visitors2025: number;
  visitors2024: number;
  growth: number;
}

export const visitorsByRegion2025: VisitorsByRegion[] = [
  { region: 'Western Europe', percentage: 21, visitors2025: 3654000, visitors2024: 3298000, growth: 10.8 },
  { region: 'GCC', percentage: 16, visitors2025: 2757000, visitors2024: 2509000, growth: 9.9 },
  { region: 'South Asia', percentage: 15, visitors2025: 2597000, visitors2024: 2858000, growth: -9.1 },
  { region: 'CIS & Eastern Europe', percentage: 15, visitors2025: 2583000, visitors2024: 2353000, growth: 9.8 },
  { region: 'MENA', percentage: 11, visitors2025: 1955000, visitors2024: 1933000, growth: 1.1 },
  { region: 'NE & SE Asia', percentage: 9, visitors2025: 1642000, visitors2024: 1622000, growth: 1.2 },
  { region: 'Americas', percentage: 7, visitors2025: 1232000, visitors2024: 1117000, growth: 10.3 },
  { region: 'Africa', percentage: 4, visitors2025: 774000, visitors2024: 791000, growth: -2.1 },
  { region: 'Australasia', percentage: 2, visitors2025: 357000, visitors2024: 319000, growth: 11.9 },
];

export const accommodationOctober2025: AccommodationSupply[] = [
  { category: '5 Star', establishments2025: 172, establishments2024: 172, rooms2025: 55027, rooms2024: 55027, inventoryShare: 36, occupancy2025: 78, occupancy2024: 77 },
  { category: '4 Star', establishments2025: 193, establishments2024: 193, rooms2025: 43279, rooms2024: 43279, inventoryShare: 28, occupancy2025: 79, occupancy2024: 79 },
  { category: '1-3 Star', establishments2025: 276, establishments2024: 276, rooms2025: 29114, rooms2024: 29114, inventoryShare: 19, occupancy2025: 80, occupancy2024: 80 },
  { category: 'Hotel Apartment (Deluxe/Superior)', establishments2025: 81, establishments2024: 81, rooms2025: 14052, rooms2024: 14052, inventoryShare: 9, occupancy2025: 81, occupancy2024: 81 },
  { category: 'Hotel Apartment (Standard)', establishments2025: 98, establishments2024: 98, rooms2025: 11403, rooms2024: 11403, inventoryShare: 8, occupancy2025: 83, occupancy2024: 83 },
];

export interface TourismMilestone {
  year: number;
  milestone: string;
  achievement: string;
}

export const tourismMilestones: TourismMilestone[] = [
  { year: 2024, milestone: 'Record Annual Visitors', achievement: '18.72M overnight visitors (+9% YoY)' },
  { year: 2023, milestone: 'Post-Pandemic Recovery', achievement: '17.15M visitors (+19% YoY)' },
  { year: 2022, milestone: 'Strong Recovery', achievement: '14.36M visitors (+97% YoY)' },
  { year: 2019, milestone: 'Pre-Pandemic Peak', achievement: '16.73M visitors (+5.1% YoY)' },
  { year: 2025, milestone: 'Sustained Growth', achievement: '17.55M visitors Jan-Nov (+5% YoY)' },
];

export interface AccommodationSupply {
  category: string;
  establishments2025: number;
  establishments2024: number;
  rooms2025: number;
  rooms2024: number;
  inventoryShare: number;
  occupancy2025: number;
  occupancy2024: number;
}

export const accommodationSupply: AccommodationSupply[] = [
  { category: '5 Star', establishments2025: 173, establishments2024: 173, rooms2025: 55284, rooms2024: 55284, inventoryShare: 36, occupancy2025: 79, occupancy2024: 78 },
  { category: '4 Star', establishments2025: 194, establishments2024: 194, rooms2025: 43326, rooms2024: 43326, inventoryShare: 28, occupancy2025: 81, occupancy2024: 81 },
  { category: '1-3 Star', establishments2025: 279, establishments2024: 279, rooms2025: 29387, rooms2024: 29387, inventoryShare: 19, occupancy2025: 81, occupancy2024: 81 },
  { category: 'Hotel Apartment (Deluxe/Superior)', establishments2025: 81, establishments2024: 81, rooms2025: 13892, rooms2024: 13892, inventoryShare: 9, occupancy2025: 82, occupancy2024: 82 },
  { category: 'Hotel Apartment (Standard)', establishments2025: 98, establishments2024: 98, rooms2025: 11403, rooms2024: 11403, inventoryShare: 8, occupancy2025: 84, occupancy2024: 84 },
];

export interface AccommodationSummary {
  year: number;
  totalEstablishments: number;
  totalRooms: number;
  averageOccupancy: number;
}

export const accommodationSummary: AccommodationSummary[] = [
  { year: 2025, totalEstablishments: 825, totalRooms: 153292, averageOccupancy: 80 },
  { year: 2024, totalEstablishments: 828, totalRooms: 153390, averageOccupancy: 78 },
];

export interface HotelEconomicKPIs {
  year: number;
  occupiedRoomNights: number;
  lengthOfStay: number;
  averageDailyRate: number;
  revPAR: number;
  averageOccupancy: number;
  occupiedRoomNightsGrowth: number;
  lengthOfStayGrowth: number;
  adrGrowth: number;
  revPARGrowth: number;
}

export const hotelEconomicKPIs: HotelEconomicKPIs[] = [
  { 
    year: 2025, 
    occupiedRoomNights: 40.85, 
    lengthOfStay: 3.7, 
    averageDailyRate: 557, 
    revPAR: 448, 
    averageOccupancy: 80.4,
    occupiedRoomNightsGrowth: 4,
    lengthOfStayGrowth: 0,
    adrGrowth: 7,
    revPARGrowth: 10
  },
  { 
    year: 2024, 
    occupiedRoomNights: 39.19, 
    lengthOfStay: 3.6, 
    averageDailyRate: 520, 
    revPAR: 405, 
    averageOccupancy: 78.0,
    occupiedRoomNightsGrowth: 0,
    lengthOfStayGrowth: 0,
    adrGrowth: 0,
    revPARGrowth: 0
  },
];

export interface MonthlyTourismData {
  month: string;
  year: number;
  totalVisitors: number;
  totalVisitorsPrevYear: number;
  growth: number;
  regionalBreakdown: VisitorsByRegion[];
  accommodationData: {
    totalEstablishments: number;
    totalRooms: number;
    averageOccupancy: number;
  };
  economicKPIs: {
    occupiedRoomNights: number;
    lengthOfStay: number;
    averageDailyRate: number;
    revPAR: number;
  };
}

export const monthlyTourismReports: MonthlyTourismData[] = [
  {
    month: 'November',
    year: 2025,
    totalVisitors: 17550000,
    totalVisitorsPrevYear: 16790000,
    growth: 5,
    regionalBreakdown: [
      { region: 'Western Europe', percentage: 21, visitors2025: 3654000, visitors2024: 3298000, growth: 10.8 },
      { region: 'GCC', percentage: 16, visitors2025: 2757000, visitors2024: 2509000, growth: 9.9 },
      { region: 'South Asia', percentage: 15, visitors2025: 2597000, visitors2024: 2858000, growth: -9.1 },
      { region: 'CIS & Eastern Europe', percentage: 15, visitors2025: 2583000, visitors2024: 2353000, growth: 9.8 },
      { region: 'MENA', percentage: 11, visitors2025: 1955000, visitors2024: 1933000, growth: 1.1 },
      { region: 'NE & SE Asia', percentage: 9, visitors2025: 1642000, visitors2024: 1622000, growth: 1.2 },
      { region: 'Americas', percentage: 7, visitors2025: 1232000, visitors2024: 1117000, growth: 10.3 },
      { region: 'Africa', percentage: 4, visitors2025: 774000, visitors2024: 791000, growth: -2.1 },
      { region: 'Australasia', percentage: 2, visitors2025: 357000, visitors2024: 319000, growth: 11.9 },
    ],
    accommodationData: {
      totalEstablishments: 825,
      totalRooms: 153292,
      averageOccupancy: 80,
    },
    economicKPIs: {
      occupiedRoomNights: 40.85,
      lengthOfStay: 3.7,
      averageDailyRate: 557,
      revPAR: 448,
    },
  },
  {
    month: 'October',
    year: 2025,
    totalVisitors: 15700000,
    totalVisitorsPrevYear: 14960000,
    growth: 5,
    regionalBreakdown: [
      { region: 'Western Europe', percentage: 21, visitors2025: 3264000, visitors2024: 2939000, growth: 11.1 },
      { region: 'GCC', percentage: 16, visitors2025: 2501000, visitors2024: 2217000, growth: 12.8 },
      { region: 'South Asia', percentage: 15, visitors2025: 2330000, visitors2024: 2543000, growth: -8.4 },
      { region: 'CIS & Eastern Europe', percentage: 15, visitors2025: 2270000, visitors2024: 2075000, growth: 9.4 },
      { region: 'MENA', percentage: 11, visitors2025: 1745000, visitors2024: 1739000, growth: 0.3 },
      { region: 'NE & SE Asia', percentage: 9, visitors2025: 1469000, visitors2024: 1460000, growth: 0.6 },
      { region: 'Americas', percentage: 7, visitors2025: 1096000, visitors2024: 986000, growth: 11.2 },
      { region: 'Africa', percentage: 4, visitors2025: 698000, visitors2024: 713000, growth: -2.1 },
      { region: 'Australasia', percentage: 2, visitors2025: 329000, visitors2024: 292000, growth: 12.7 },
    ],
    accommodationData: {
      totalEstablishments: 820,
      totalRooms: 152875,
      averageOccupancy: 79,
    },
    economicKPIs: {
      occupiedRoomNights: 36.71,
      lengthOfStay: 3.6,
      averageDailyRate: 531,
      revPAR: 421,
    },
  },
];

// DET Publications and Reports
export interface DETPublication {
  id: string;
  title: string;
  publishDate: string;
  description: string;
  category: 'Report' | 'Study' | 'Whitepaper' | 'Guide';
  collaborators?: string[];
  keyStats: {
    label: string;
    value: string;
  }[];
  downloadUrl?: string;
  featured: boolean;
}

export const detPublications: DETPublication[] = [
  {
    id: 'jobs-future-2025',
    title: 'Jobs of the Future Report',
    publishDate: '2025-04-15',
    description: 'Explores how global trends and emerging industries are reshaping the job market, emphasising the critical need for aligning education systems with the evolving workforce demands.',
    category: 'Report',
    collaborators: ['Knowledge and Human Development Authority (KHDA)'],
    keyStats: [
      { label: 'Students in Vocational Education', value: '60,000+' },
      { label: 'Work Tasks Transformable by AI', value: '25%' },
      { label: 'Survey Participants', value: '7,800+' }
    ],
    featured: true
  },
  {
    id: 'tourism-outlook-2025',
    title: 'Dubai Tourism Outlook 2025',
    publishDate: '2025-01-10',
    description: 'Comprehensive analysis of tourism trends, visitor statistics, and economic impact projections for Dubai.',
    category: 'Report',
    keyStats: [
      { label: 'Projected Visitors', value: '18.72M' },
      { label: 'Hotel Occupancy', value: '80.4%' },
      { label: 'Tourism Revenue Growth', value: '+9%' }
    ],
    featured: true
  },
  {
    id: 'fdi-performance-2024',
    title: 'Foreign Direct Investment Performance Report 2024',
    publishDate: '2024-12-20',
    description: 'Annual review of FDI flows, investment projects, and economic diversification initiatives in Dubai.',
    category: 'Report',
    keyStats: [
      { label: 'Total FDI Projects', value: '1,826' },
      { label: 'FDI Capital', value: 'AED 52.3B' },
      { label: 'Growth Rate', value: '+33%' }
    ],
    featured: false
  },
  {
    id: 'sustainability-roadmap',
    title: 'Dubai Sustainable Tourism Roadmap',
    publishDate: '2024-11-05',
    description: 'Strategic framework for sustainable tourism development aligned with Dubai\'s net-zero targets.',
    category: 'Guide',
    keyStats: [
      { label: 'Green Certified Hotels', value: '150+' },
      { label: 'Carbon Reduction Target', value: '30%' },
      { label: 'Sustainable Attractions', value: '85' }
    ],
    featured: false
  }
];
