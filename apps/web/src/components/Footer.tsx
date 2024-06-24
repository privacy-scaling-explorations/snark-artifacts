import { owner, repo } from '../constants'

export const Footer = () => (
  <footer>
    <p>
      Copyright &copy;
      <span>{' '}2024</span>
      <span>{' '}PSE</span>
      <a href={`https://github.com/${owner}/${repo}`}>
        <span>
          {' '}GitHub
        </span>
      </a>
    </p>
  </footer>
)
