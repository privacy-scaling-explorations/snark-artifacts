import { Footer, Header } from './components'
import { DownloadButton, FileSelect, ProjectSelect, VersionSelect } from './containers'

export const App = () => (
  <>
    <Header />
    <div className='form'>
      <ProjectSelect />
      <VersionSelect />
      <FileSelect />
      <DownloadButton />
    </div>
    <Footer />
  </>
)
