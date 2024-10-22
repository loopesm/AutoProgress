# Auto Progress

## Descrição
**Auto Progress** é uma aplicação de linha de comando (CLI) desenvolvida para automatizar o progresso de aulas na plataforma de ensino OneBitCode, essa ferramenta facilita o acesso e a conclusão de aulas de forma eficiente.

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/) - Para automação do navegador.
- [Chalk](https://github.com/chalk/chalk) - Para estilização de texto no terminal.
- [Figlet](https://github.com/patorjk/figlet.js) - Para gerar arte de texto.
- [Ora](https://github.com/sindresorhus/ora) - Para exibir spinners no terminal.
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - Para criar prompts interativos no terminal.

## Instalação

Para instalar e executar a aplicação, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/loopesm/AutoProgress.git

2. **Navegue até o diretório do projeto:**
   ```bash
    cd AutoProgress

3. **Instalar as dependências:** 
   ```bash
    npm install

## Utilização

1. **Executar a aplicação:**
   ```bash
    npm start

2. **Siga as instruções no terminal:**
 - O script abrirá um navegador para realizar o Login no sistema.
 - ***OBS.:*** Não é viável automatizar o Login, pois a plataforma está hospedada no Cloudflare, e a ação se caracteriza como um robô, onde da erro na aplicação.  
 - Informe o número de aulas do curso.
 - Forneça a URL base do curso (sem o ID da aula).
 - Informe o ID da primeira aula.

## Contribuição ##
Contribuições são bem-vindas! Sinta-se à vontade para abrir um problema ou enviar uma solicitação pull.

## Licença ##

Este projeto é licenciado sob uma licença do MIT .
