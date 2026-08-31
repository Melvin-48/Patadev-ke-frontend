import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { bidsService } from '../services/bids.service';

export default function SubmitBidPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setLoading(true);
      await bidsService.createBid({
        projectId: id,
        amount: parseFloat(amount),
        message: message || undefined
      });
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(`/projects/${id}`)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Project
      </Button>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Bid</h1>
        <p className="text-gray-500 mb-6">Submit your proposal for this project</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bid Amount ($)
            </label>
            <Input
              type="number"
              min="1"
              step="0.01"
              required
              placeholder="Enter your bid amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proposal Message
            </label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Explain why you're the right person for this project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Bid
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
