import { Building2, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { MockProject } from '../../data/mock';

interface ProjectRowProps {
  project: MockProject;
  onClick: () => void;
}

// Compact project row used on the overview "Keep your work moving" list.
export default function ProjectRow({ project, onClick }: ProjectRowProps) {
  return (
    <button className="project-row" onClick={onClick}>
      <span className={`project-symbol ${project.accent}`}>
        <Building2 size={17} />
      </span>
      <span className="project-row-copy">
        <strong>{project.title}</strong>
        <span>{project.category} · Updated {project.updated}</span>
      </span>
      <span className="project-row-meta">
        <StatusBadge status={project.status} />
        <small>{project.bids} bids</small>
      </span>
      <ChevronRight size={16} className="muted-icon" />
    </button>
  );
}