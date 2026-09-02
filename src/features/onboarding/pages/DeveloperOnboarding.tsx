import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card } from "../../../components/ui/Card";
import { Award } from "lucide-react";

const DeveloperOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    skills: "",
    experience: "",
    portfolio: "",
    github: "",
    linkedin: "",
    bio: ""
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/developer/dashboard");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Skills & Experience</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills *
              </label>
              <Input
                placeholder="React, TypeScript, Node.js, etc."
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="2-3">2-3 years</option>
                <option value="4-6">4-6 years</option>
                <option value="7+">7+ years</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Portfolio & Links</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio URL
              </label>
              <Input
                placeholder="https://your-portfolio.com"
                value={formData.portfolio}
                onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub URL
              </label>
              <Input
                placeholder="https://github.com/your-username"
                value={formData.github}
                onChange={(e) => setFormData({...formData, github: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about yourself
              </label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your skills, experience, and what you're looking for..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <Award className="w-4 h-4 inline mr-1" />
                Complete your profile to get noticed by clients!
              </p>
            </div>
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
            Developer Onboarding
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

export default DeveloperOnboarding;



