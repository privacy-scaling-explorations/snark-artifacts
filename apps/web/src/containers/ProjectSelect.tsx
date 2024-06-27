import { projects } from '@zk-kit/artifacts'
import type { ChangeEvent } from 'react'
import { Options } from '../components'
import { useStore } from '../hooks'

export function ProjectSelect() {
  const { selectedProject, setSelectedProject } = useStore()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement
    setSelectedProject(target.value)
  }

  return (
    <div>
      <label htmlFor='project'>Project</label>
      <select value={selectedProject} onChange={onChange} id='project'>
        <Options items={projects} />
      </select>
    </div>
  )
}
