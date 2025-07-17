import { useState, useEffect } from 'react';
import { Project, ProjectFormData } from '@/types/project';

const STORAGE_KEY = 'project-dashboard-data';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProjects(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        })));
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  };

  const addProject = (projectData: ProjectFormData) => {
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    saveProjects([...projects, newProject]);
  };

  const updateProject = (id: string, projectData: ProjectFormData) => {
    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...projectData, updatedAt: new Date() }
        : project
    );
    saveProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    saveProjects(updatedProjects);
  };

  const saveAllData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    saveAllData
  };
};