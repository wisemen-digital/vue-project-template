/* eslint-disable no-console */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import chalk from 'chalk'
import inquirer from 'inquirer'

const pathsToIgnore = [
  './setup.ts',
  './src/modules',
  'node_modules',
  '.git',
  'dist',
]

// Function to determine if a path should be ignored
function shouldIgnore(filePath: string): boolean {
  // Normalize paths to ensure consistent comparison across OS
  const normalizedPath = path.resolve(filePath)

  return pathsToIgnore.some((ignorePath) => {
    const normalizedIgnorePath = path.resolve(ignorePath)

    return normalizedPath.startsWith(normalizedIgnorePath)
  })
}

/**
 * Recursively scan the project and replace all occurrences of `$projectName` with the new project name.
 * @param projectName - The new project name to replace `$projectName`.
 */
function changeProjectName(projectName: string): void {
  const rootDir = process.cwd() // Use the current working directory as the root.

  // Function to process files and directories recursively
  function processDirectory(dir: string): void {
    const filesAndDirs = fs.readdirSync(dir)

    for (const fileOrDir of filesAndDirs) {
      const fullPath = path.join(dir, fileOrDir)

      // Skip ignored paths
      if (shouldIgnore(fullPath)) {
        continue
      }

      // Check if the path is a directory
      if (fs.statSync(fullPath).isDirectory()) {
        processDirectory(fullPath) // Recursively process the directory
      }
      else {
        // Process individual files
        processFile(fullPath, projectName)
      }
    }
  }

  // Function to replace occurrences of `$projectName` in a file
  function processFile(filePath: string, projectName: string): void {
    // Read the file contents
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Check if the file contains `$projectName` to avoid unnecessary writes
    if (fileContent.includes('$$projectName')) {
      const updatedContent = fileContent.replace(/\$projectName/g, projectName)

      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent, 'utf8')
      console.log(chalk.gray(`Updated project name in ${filePath}`))
    }
  }

  // Start processing from the root directory
  processDirectory(rootDir)

  console.log(chalk.green(`✅ Finished changing project name to ${projectName}`))
}

/**
 * Whether the setup has already been run.
 * @returns {boolean} Whether the setup has already been run.
 */
function hasSetupBeenRun(): boolean {
  const indexHtmlContent = fs.readFileSync('./index.html', 'utf8')

  return !indexHtmlContent.includes('$projectName')
}

async function setup(): Promise<void> {
  const isProjectTemplate = process.env.PWD?.includes('project-template')

  if (isProjectTemplate || hasSetupBeenRun()) {
    return
  }

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

  console.log(chalk.green('------------------------------------------------'))
  console.log(chalk.green('Project setup complete!'))
}

void setup()
