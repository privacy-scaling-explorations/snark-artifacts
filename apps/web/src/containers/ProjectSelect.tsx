import type { ChangeEvent } from 'react'
import { projects } from '../constants'
import { useStore } from '../hooks'

export function ProjectSelect() {
  const { selectedProject, setSelectedProject, resetSelectedFile, resetSelectedVersion } = useStore()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    resetSelectedFile()
    resetSelectedVersion()
    const target = e.target as HTMLSelectElement
    setSelectedProject(target.value)
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
