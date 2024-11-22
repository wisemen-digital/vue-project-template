/* eslint-disable no-console */
import chalk from 'chalk'
import fs from 'fs-extra'
import inquirer from 'inquirer'

function changeProjectName(projectName: string): void {
  // Find all files and search for `$projectName` and replace it with the new project name
  fs.readdirSync('.').forEach((file) => {
    const filePath = `./${file}`

    if (fs.lstatSync(filePath).isDirectory()) {
      return
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')

    fs.writeFileSync(filePath, fileContent.replace(/\$projectName/g, projectName))
  })
}

async function setup(): Promise<void> {
  console.log(chalk.blue('Setting up project...'))

  const answers = await inquirer.prompt([
    {
      name: 'projectName',
      message: 'What is the name of your project?',
      type: 'input',
      validate: (value): boolean => value.length > 0,
    },
  ])

  changeProjectName(answers.projectName)
}

void setup()
