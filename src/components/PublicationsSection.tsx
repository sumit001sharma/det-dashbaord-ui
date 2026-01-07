import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Users, TrendingUp } from 'lucide-react';
import { DETPublication } from '../data/mockData';

interface PublicationsSectionProps {
  publications: DETPublication[];
  showAll?: boolean;
}

export default function PublicationsSection({ publications, showAll = false }: PublicationsSectionProps) {
  const displayPublications = showAll ? publications : publications.filter(p => p.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Report':
        return 'bg-det-primary text-white';
      case 'Study':
        return 'bg-det-secondary text-white';
      case 'Whitepaper':
        return 'bg-det-accent text-white';
      case 'Guide':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-det-primary mb-2">DET Publications & Reports</h2>
          <p className="text-sm text-gray-600">Latest insights and research from Dubai Economy & Tourism</p>
        </div>
        <FileText className="text-det-primary" size={32} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayPublications.map((publication, index) => (
          <motion.div
            key={publication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-det-primary/5 to-det-secondary/5 p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(publication.category)}`}>
                  {publication.category}
                </span>
                {publication.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-det-primary mb-2">{publication.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{formatDate(publication.publishDate)}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{publication.description}</p>

              {/* Collaborators */}
              {publication.collaborators && publication.collaborators.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <Users size={14} />
                    <span className="font-medium">In collaboration with:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {publication.collaborators.map((collab, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {collab}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {publication.keyStats.map((stat, idx) => (
                  <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp size={16} className="text-det-primary" />
                    </div>
                    <p className="text-lg font-bold text-det-primary">{stat.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-det-primary hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors">
                  <Download size={16} />
                  <span>Download Report</span>
                </button>
                <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAll && publications.length > displayPublications.length && (
        <div className="text-center">
          <button className="px-6 py-3 bg-white hover:bg-gray-50 text-det-primary border-2 border-det-primary rounded-lg font-medium transition-colors">
            View All Publications ({publications.length})
          </button>
        </div>
      )}
    </div>
  );
}
