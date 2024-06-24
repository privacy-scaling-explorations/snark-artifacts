import React from 'react'
import { projects } from '../constants'
import { useStore } from '../hooks'

export function ProjectSelect() {
  const { selectedProject, setSelectedProject, resetSelectedFile, resetSelectedVersion } = useStore()

  const onChange = (e) => {
    resetSelectedFile()
    resetSelectedVersion()
    setSelectedProject(e.target.value)
  }

  return (
    <div>
      <label htmlFor='project'>Project</label>
      <select value={selectedProject} onChange={onChange} id='project'>
        {projects.map((project) => <option key={project} value={project}>{project}</option>)}
      </select>
    </div>
  )
}
