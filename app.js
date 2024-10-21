import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';
import inquirer from 'inquirer';
import puppeteer from 'puppeteer';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function showIntro() {
    console.clear();

    const spinner = ora('Starting Auto Progress...').start();
    await sleep(100);
    spinner.stop();

    console.log(
        chalk.red(
            figlet.textSync('Auto Progress', { horizontalLayout: 'default' })
        )
    );

    await sleep(100);
    console.log(chalk.cyanBright('\nSeja bem vindo a Automação de Progresso de Aulas - Em parceria com a OneBitCode\n'));

    console.log(chalk.cyanBright('Passos para execução da automação:'));
    console.log(chalk.cyanBright('1. Abrir o navegador'));
    console.log(chalk.cyanBright('2. Acessar a plataforma'));
    console.log(chalk.cyanBright('3. Fazer login'));

  // Pergunta se o usuário já está logado
    const { loggedIn } = await inquirer.prompt({
    type: 'confirm',
    name: 'loggedIn',
    message: chalk.cyanBright('Você já está logado na plataforma?'),
    });

    if (!loggedIn) {
    console.log(chalk.redBright('Por favor, faça login antes de continuar.'));
    return;
    }

  // Pergunta quantas aulas o curso tem e a URL da primeira aula
    const { numClasses, baseCourseUrl, startId } = await inquirer.prompt([
    {
        type: 'input',
        name: 'numClasses',
        message: chalk.cyanBright('Quantas aulas o curso possui?'),
        validate: value => !isNaN(value) ? true : chalk.redBright('Por favor, insira um número válido'),
    },
    {
        type: 'input',
        name: 'baseCourseUrl',
        message: chalk.cyanBright('Qual a URL base do curso (sem o ID da aula)?'),
        validate: value => value ? true : chalk.redBright('Por favor, insira uma URL válida'),
    },
    {
        type: 'input',
        name: 'startId',
        message: chalk.cyanBright('Qual o ID da primeira aula?'),
        validate: value => !isNaN(value) ? true : chalk.redBright('Por favor, insira um número válido'),
    },

]);

  // Automação com Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    let currentId = parseInt(startId);
    for (let i = 0; i < numClasses; i++) {
    const classUrl = `${baseCourseUrl}${currentId}`;
    console.log(chalk.yellowBright(`Acessando aula ${i + 1}: ${classUrl}`));

    await page.goto(classUrl);

    // Aqui você pode ajustar o seletor do botão de "concluir aula"
    await page.waitForSelector('button.concluir-aula'); 
    await page.click('button.concluir-aula');
    console.log(chalk.yellowBright(`Aula ${i + 1} concluída.`));

    currentId++; // Incrementa o ID da aula
    await new Promise(r => setTimeout(r, 2000)); // Delay de 2 segundos
}

    await browser.close();
    console.log(chalk.greenBright('Todas as aulas foram concluídas com sucesso!'));

}

showIntro();