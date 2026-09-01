import React, { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Bell, MessageCircle, Briefcase, DollarSign,
  Award,
  CheckCheck
} from "lucide-react";

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState("ALL");

  const notifications = [
    { id: 1, type: "bid", title: "New bid on your project", description: "John Doe placed a bid on E-commerce Website", time: "5 mins ago", read: false },
    { id: 2, type: "message", title: "New message", description: "Jane Smith sent you a message about Mobile App", time: "1 hour ago", read: false },
    { id: 3, type: "milestone", title: "Milestone completed", description: "Milestone #3 completed on API Development", time: "3 hours ago", read: true },
    { id: 4, type: "payment", title: "Payment received", description: "Received $4500 for E-commerce Website", time: "1 day ago", read: true }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "bid": return <Briefcase className="w-5 h-5 text-blue-600" />;
      case "message": return <MessageCircle className="w-5 h-5 text-green-600" />;
      case "milestone": return <Award className="w-5 h-5 text-purple-600" />;
      case "payment": return <DollarSign className="w-5 h-5 text-yellow-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">Stay updated with your activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["ALL", "BIDS", "MESSAGES", "MILESTONES", "PAYMENTS"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`p-4 hover:shadow-md transition-shadow ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${!notification.read ? "bg-blue-100" : "bg-gray-100"}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                    <p className="text-gray-600 text-sm">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <Badge className="bg-blue-600 text-white text-xs">New</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;



