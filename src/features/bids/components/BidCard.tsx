import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DollarSign, Clock, User, CheckCircle, XCircle } from 'lucide-react';

export interface BidCardProps {
  id: string;
  amount: number;
  message?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  developerName: string;
  developerAvatar?: string;
  createdAt: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export const BidCard: React.FC<BidCardProps> = ({
  id,
  amount,
  message,
  status,
  developerName,
  developerAvatar,
  createdAt,
  onAccept,
  onReject
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {developerName.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{developerName}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {amount.toLocaleString()}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {message && (
            <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
              {message}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(status)}
              {status}
            </span>
          </Badge>
          {status === 'PENDING' && (
            <div className="flex gap-2">
              {onAccept && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onAccept}>
                  Accept
                </Button>
              )}
              {onReject && (
                <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={onReject}>
                  Reject
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BidCard;
