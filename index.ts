import chalk from 'chalk';
import ejs from 'ejs';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import { join } from 'path';
import shell from 'shelljs';

import clientDependencies from './const/clientDependencies';
import serverDependencies from './const/serverDependencies';

interface ProjectInfoAnswer {
    name: string;
    template: 'server' | 'client';
}

interface AdditionalClientPackages {
    additionalPackages?: string[];
}

const currentDirectory = process.cwd();
const questions = [
    {
        choices: readdirSync(join(__dirname, 'templates')),
        message: 'What project template would you like to generate?',
        name: 'template',
        type: 'list'
    },
    {
        message: 'Project name:',
        name: 'name',
        type: 'input'
    }
];

function createProject(folder: string): boolean {
    if (existsSync(folder)) {
        console.log(chalk.red(`Folder ${folder} exists. Use another name.`));

        return false;
    }
    mkdirSync(folder);
    console.log(chalk.blueBright(`Folder ${folder} created`));

    return true;
}

function createDirectoryContents(template: string, name: ProjectInfoAnswer['name']) {
    const filesToCreate = readdirSync(template);

    filesToCreate.forEach(object => {
        const originalFilePath = join(template, object);
        const item = statSync(originalFilePath);
        const writePath = join(currentDirectory, name, object);

        if (item.isFile()) {
            const contents = ejs.render(readFileSync(originalFilePath, 'utf8'), { projectName: name });

            writeFileSync(writePath, contents, 'utf8');

            return;
        }
        if (item.isDirectory()) {
            mkdirSync(writePath);
            createDirectoryContents(join(template, object), join(name, object));
        }
    });
}

function postProcess(targetPath: string, command = 'npm i') {
    shell.cd(targetPath);

    console.log(chalk.blueBright(`Installing dependencies`));

    const result = shell.exec(command);

    if (result.code !== 0) return console.log(chalk.red(`Error occurred ${result.stderr}`));
    console.log(chalk.blueBright('Installation complete'));
}

inquirer.prompt(questions).then(async (answer: ProjectInfoAnswer) => {
    const { name, template } = answer;
    const targetPath = join(currentDirectory, name);
    const isClient = template === 'client';

    if (!createProject(targetPath)) return;
    const templatePath = join(__dirname, 'templates', template);

    createDirectoryContents(templatePath, name);
    console.log(chalk.blueBright(`Project files created`));
    const additionalClientQuestions = [
        {
            choices: ['styled-components'].map(i => ({ checked: true, name: i })),
            message: 'Additional packages',
            name: 'additionalPackages',
            type: 'checkbox'
        }
    ];
    // Get dependency list depending on template type
    const dependencies = isClient ? clientDependencies : serverDependencies;
    const additionalPackagesQuestions = isClient ? additionalClientQuestions : [];
    let typesAndDevDependencies = [...dependencies.dev];
    const generalDependencies = dependencies.general;
    const packages = additionalPackagesQuestions.length
        ? await inquirer.prompt(additionalClientQuestions).then((answer: AdditionalClientPackages) => {
              typesAndDevDependencies = [
                  ...typesAndDevDependencies,
                  ...answer.additionalPackages.map(i => clientDependencies.types[i])
              ];

              return [...generalDependencies, ...answer.additionalPackages];
          })
        : generalDependencies;

    postProcess(
        targetPath,
        `npm install ${packages.join(' ')} && npm install ${typesAndDevDependencies.join(' ')} --save-dev`
    );
});
