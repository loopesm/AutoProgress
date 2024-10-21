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
            figlet.textSync('Auto Progress', { horizontalLayout: 'default', defaultViewport: { width: 1366, height: 768 } })
        )
    );

    await sleep(100);
    console.log(chalk.cyanBright('\nSeja bem vindo a Automação de Progresso de Aulas - Em parceria com a OneBitCode\n'));

    console.log(chalk.cyanBright('Passos para execução da automação:'));
    console.log(chalk.cyanBright('1. Abrir o navegador'));
    console.log(chalk.cyanBright('2. Acessar a plataforma'));
    console.log(chalk.cyanBright('3. Realize o login'));
    console.log(chalk.cyanBright('3. Acesse o Curso que deseja automatizar o progresso'));

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://comunidade.onebitcode.com/sign_in?post_login_redirect=https%3A%2F%2Fcomunidade.onebitcode.com%2Ffeed#email');

    await page.waitForNavigation();

    console.log('Login realizado com sucesso!');

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

    let currentId = parseInt(startId);
    for (let i = 0; i < numClasses; i++) {
    const classUrl = `${baseCourseUrl}${currentId}`;
    console.log(chalk.yellowBright(`Acessando aula ${i + 1}: ${classUrl}`));

    await page.goto(classUrl);

      // Aguarde até que o footer e a div estejam presentes
  await page.waitForSelector('footer div'); // Aguarda a presença da div dentro do footer

  // Selecione o botão que está dentro do footer e da div
  const button = await page.$('footer div button[class="focus-visible:!outline-secondary font-bold transition-colors duration-200 focus-visible:!outline focus-visible:!outline-2 focus-visible:!outline-offset-2 disabled:cursor-not-allowed px-[18px] py-[6px] text-sm rounded-full border-circle-button bg-circle-button text-circle-button hover:border-circle-button-hover hover:bg-circle-button-hover disabled:border-disabled disabled:bg-disabled border w-44 !px-3"]');

    if (button) {
      await button.click(); // Clica no botão encontrado
        console.log(chalk.greenBright(`Aula ${i + 1} concluída.`));
    } else {
        console.log(chalk.redBright("Botão 'Concluir Aula' não encontrado."));
    }

    currentId++; // Incrementa o ID da aula
    await new Promise(r => setTimeout(r, 1000)); // Delay de 2 segundos

}

    await browser.close();
    console.log(chalk.greenBright('Todas as aulas foram concluídas com sucesso!'));

}

showIntro();