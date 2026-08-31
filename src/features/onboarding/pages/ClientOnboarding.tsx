import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card } from "../../../components/ui/Card";
import { Building2, Globe, Users, CheckCircle } from "lucide-react";

const ClientOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    size: ""
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      navigate("/client/dashboard");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Company Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <Input
                placeholder="Your company name"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <Input
                placeholder="e.g., Technology, Finance, Healthcare"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <Input
                placeholder="https://your-company.com"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Size
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201+">201+ employees</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              You're All Set!
            </h2>
            <p className="text-gray-600">
              Your company profile is ready. Start posting projects and hiring talent.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-lg w-full p-8">
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Client Onboarding
          </h1>
          <p className="text-gray-600 text-center">
            Step {step} of 3
          </p>
        </div>

        {renderStep()}

        <div className="mt-6 flex gap-3">
          {step < 3 && (
            <Button className="flex-1" onClick={handleNext}>
              Continue
            </Button>
          )}
          {step === 3 && (
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleNext}>
              Go to Dashboard
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ClientOnboarding;
