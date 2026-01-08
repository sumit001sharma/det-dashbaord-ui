import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Shield, 
  TrendingUp, 
  Briefcase, 
  Calendar, 
  Users, 
  GraduationCap,
  ArrowRight,
  Activity
} from 'lucide-react';

interface EntityCard {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: any;
  color: string;
  route: string;
  hasData: boolean;
  status?: 'excellent' | 'good' | 'attention' | 'critical';
  imageUrl?: string;
}

export default function DETEntities() {
  const navigate = useNavigate();

  const entities: EntityCard[] = [
    {
      id: 'tourism-marketing',
      name: 'Corporation for Tourism & Commerce Marketing',
      shortName: 'Tourism & Marketing',
      description: 'Promoting Dubai as a global tourism and business destination',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      route: '/tourism',
      hasData: true,
      status: 'excellent',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/det-entities/tourism-and-commerce-marketing.jpg?iar=0&cw=1040&ch=400'
    },
    {
      id: 'business-licensing',
      name: 'Business Registration & Licensing Corporation',
      shortName: 'Business Licensing',
      description: 'Facilitating business setup and commercial licensing in Dubai',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
      route: '/entities/business-licensing',
      hasData: false,
      status: 'good',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/det-entities/business-registration-and-licensing.jpg?iar=0&cw=1040&ch=400'
    },
    {
      id: 'consumer-protection',
      name: 'Corporation for Consumer Protection & Fair Trade',
      shortName: 'Consumer Protection',
      description: 'Ensuring fair trade practices and protecting consumer rights',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      route: '/entities/consumer-protection',
      hasData: false,
      status: 'good',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/det-entities/consumer-protection-and-fair-trade.jpg?iar=0&cw=1040&ch=400'
    },
    {
      id: 'economic-development',
      name: 'Economic Development Corporation',
      shortName: 'Economic Development',
      description: 'Driving economic growth and diversification initiatives',
      icon: Briefcase,
      color: 'from-orange-500 to-orange-600',
      route: '/fdi',
      hasData: true,
      status: 'excellent',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/det-entities/economic-development.jpg?iar=0&cw=1040&ch=400'
    },
    {
      id: 'festivals-retail',
      name: 'Festivals & Retail Establishment',
      shortName: 'Festivals & Retail',
      description: 'Managing festivals, events, and retail sector development',
      icon: Calendar,
      color: 'from-pink-500 to-pink-600',
      route: '/entities/festivals-retail',
      hasData: false,
      status: 'attention',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/det-entities/festivals-and-retail-establishments.jpg?iar=0&cw=1040&ch=400'
    },
    {
      id: 'sme-development',
      name: 'MBR Establishment for SME Development',
      shortName: 'SME Development',
      description: 'Supporting and empowering small and medium enterprises',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      route: '/entities/sme-development',
      hasData: false,
      status: 'good',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/det-entities/mbr-establishment-for-sme-development.jpg?iar=0&cw=1040&ch=400'
    },
    {
      id: 'tourism-college',
      name: 'College of Tourism',
      shortName: 'Tourism College',
      description: 'Providing world-class tourism and hospitality education',
      icon: GraduationCap,
      color: 'from-teal-500 to-teal-600',
      route: '/entities/tourism-college',
      hasData: false,
      status: 'good',
      imageUrl: 'https://www.dubaidet.gov.ae/-/media/det-sme-cr-release-1-new-media-files/banner-images/dct-students.jpg?rev=cd417df1c08340b7aca986413522ffa3&cx=0.38&cy=0.31'
    }
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'attention': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'attention': return 'Needs Attention';
      case 'critical': return 'Critical';
      default: return 'N/A';
    }
  };

  const handleEntityClick = (entity: EntityCard) => {
    if (entity.hasData) {
      navigate(entity.route);
    } else {
      alert(`Dashboard for ${entity.name} is coming soon. Currently, only Tourism & Marketing and Economic Development (FDI) dashboards have data available.`);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-det-primary to-primary-800 text-white rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Building2 size={32} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">DET Entities</h1>
            <p className="text-white/90 mt-1">Dubai Department of Economy & Tourism</p>
          </div>
        </div>
        <p className="text-white/80 text-sm sm:text-base max-w-3xl">
          Explore the organizational structure and performance of Dubai's seven key entities driving economic growth, 
          tourism excellence, and business development across the emirate.
        </p>
      </motion.div>

      {/* Performance Overview - CXO Feature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="text-det-primary" size={24} />
            <h2 className="text-xl font-bold text-det-dark">Overall Performance</h2>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            CXO Dashboard Feature
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-xs text-gray-600 mt-1">Excellent</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-xs text-gray-600 mt-1">Good</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-xs text-gray-600 mt-1">Attention</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">0</div>
            <div className="text-xs text-gray-600 mt-1">Critical</div>
          </div>
        </div>
      </motion.div>

      {/* Entity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity, index) => {
          const Icon = entity.icon;
          return (
            <motion.div
              key={entity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              onClick={() => handleEntityClick(entity)}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 ${
                entity.hasData ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'
              }`}
            >
              {/* Image Header */}
              {entity.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={entity.imageUrl} 
                    alt={entity.shortName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${entity.color} opacity-60`}></div>
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                    {entity.status && (
                      <>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(entity.status)} animate-pulse shadow-lg`}></div>
                        <span className="text-xs text-white font-medium bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                          {getStatusLabel(entity.status)}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/90 rounded-lg backdrop-blur-sm">
                        <Icon size={24} className="text-det-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">{entity.shortName}</h3>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{entity.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {entity.hasData ? (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                        Data Available
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {entity.hasData && (
                    <div className="flex items-center gap-1 text-det-primary text-sm font-medium">
                      View Dashboard
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Information Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <Activity className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Performance Indicators (CXO Feature)</p>
            <p className="text-xs text-blue-800">
              The performance status indicators (RAG - Red, Amber, Green) can be enabled for internal CXO dashboards 
              to track entity-level BSC (Balanced Scorecard) metrics and KPIs. This feature provides real-time 
              performance monitoring across all DET entities.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
