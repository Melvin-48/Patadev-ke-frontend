import { Card } from "../../../components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import type { Project } from "../types/project.types";

interface ProjectCardProps {
  project: Project;
  bids?: number;
  views?: number;
  daysLeft?: number;
  onClick?: () => void;
}

export function ProjectCard({
  project,
  bids = 0,
  views = 0,
  daysLeft = 0,
  onClick
}: ProjectCardProps) {

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <h3 className="text-lg font-semibold text-gray-900">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            <Badge
              variant={
                project.status === "OPEN"
                  ? "success"
                  : "info"
              }
            >
              {project.status}
            </Badge>

            {project.category && (
              <Badge variant="default">
                {project.category}
              </Badge>
            )}

          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">

            <div>
              <div className="font-semibold">
                {bids}
              </div>
              <div className="text-gray-500">
                Bids
              </div>
            </div>

            <div>
              <div className="font-semibold">
                {views}
              </div>
              <div className="text-gray-500">
                Views
              </div>
            </div>

            <div>
              <div className="font-semibold">
                {daysLeft}
              </div>
              <div className="text-gray-500">
                Days left
              </div>
            </div>

          </div>

        </div>

        {onClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClick}
          >
            View
          </Button>
        )}

      </div>

    </Card>
  );
}

export default ProjectCard;


