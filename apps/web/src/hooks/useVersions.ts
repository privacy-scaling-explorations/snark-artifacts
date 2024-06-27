import { useQuery } from 'react-query'
import { owner, repo } from '../constants'
import { gh } from '../gh'
import { useStore } from './useStore'

async function queryFn() {
  const { data: tags } = await gh.repos.listTags({ owner, repo })
  return tags.map(tag => tag.name)
}

export function useVersions() {
  const { selectedProject } = useStore()

  return useQuery({
    enabled: selectedProject !== '',
    queryKey: ['versions', selectedProject],
    queryFn,
    select: (data) =>
      data
        .filter(tag => tag.includes(`@zk-kit/${selectedProject}-artifacts@`))
        .map(tag => tag.split('@')[2])
        .filter(version => version !== 'latest'),
  })
}
