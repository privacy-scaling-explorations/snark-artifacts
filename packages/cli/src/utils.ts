import inquirer, { type Answers, type DistinctQuestion } from 'inquirer'

export async function prompt<T extends Answers>(
  question: DistinctQuestion<T> & { name: string },
): Promise<string> {
  const { name } = question
  const { [name]: result } = await inquirer.prompt<T>(question)
  return result
}
