import { useQuery } from 'react-query'
import { artifacts, owner, repo } from '../constants'
import { gh } from '../gh'
import { useStore } from '../hooks'

async function fetchFiles(version: string) {
  const { data: { tree } } = await gh.git.getTree({ owner, repo, tree_sha: version, recursive: 'true' })
  return tree.reduce((files, { path, type }) => {
    if (type === 'blob' && path !== undefined)
      files.push(path)
    return files
  }, [] as string[])
}

export function useFiles() {
  const { selectedProject, selectedVersion } = useStore()
  return useQuery({
    enabled: selectedProject !== '' && selectedVersion !== '',
    queryKey: ['files', selectedProject, selectedVersion],
    queryFn: async () => fetchFiles(`@zk-kit/${selectedProject}-artifacts@${selectedVersion}`),
    select: data => {
      const regex = new RegExp(`^packages/${selectedProject}/.*\\.(${artifacts.join('|')})$`)
      return data.filter(file => regex.test(file)).filter(file => !file.endsWith('package.json')).map(file =>
        file.replace(`packages/${selectedProject}/`, '')
      )
    },
  })
}
