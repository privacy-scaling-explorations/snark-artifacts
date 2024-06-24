export const Options = ({ items }: { items: string[] }) => (
  <>{items.map((item) => <option key={item} value={item}>{item}</option>)}</>
)
