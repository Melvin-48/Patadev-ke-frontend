import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = ""
}: EmptyStateProps) {

  return (
    <div className={"text-center py-12 " + className}>

      {icon && (
        <div className="mx-auto mb-4">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-gray-500 mb-6">
          {description}
        </p>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {action.label}
        </button>
      )}

    </div>
  );
}

export default EmptyState;

