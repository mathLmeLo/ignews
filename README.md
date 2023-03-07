## NEXT JS

É um framework para React.

Ele adiciona uma camada a mais entre o Browser e o Servidor, sendo um servidor Node.js ele entrega as paginas para o browser atuando como um SSR(Server side Rendering).

Ele tenta resolver um dos problemas de construir SPAs que rodam direto no Browser: a indexação no google(buscadores e motores de adds etc). Essas ferramentas, muitas vezes buscam puramento dentro do HTML servido numa página, o que faz com que páginas de ecommerces, por exemplo deixem a desejar na performence de resultados de busca.

Como o Next.js entrega a página pronta para o broser, com todo o conteúdo já formado, sem a dinamicidade de chamadas a API que buscam conteudo externo e etc. Isso acaba por resolver esse problema da indexação.

### Notas

- Cada arquivo criado dentro da rota `pages` ou `src/pages` vira uma rota para a aplicação. Com excessão ao `_app.js` e o `_document.js`. Isso é chamado de fileSystem routing.

### Criar o projeto com o comando:

- `yarn create next-app ignews`

### Adicionar typescript

- `yarn add typescript @types/react @types/node -D`
Após modificar os arquivos para `.tsx` o next identifica a alteração no próximo `yarn dev` e cria o arquivo de configuração `tsconfig.json` e o arquivo de definição de tipos `next-env.d.ts`.

### Estilização no Nextjs

O nextjs permite realizar o 'scoped css' de forma nativa, de forma que nomear um aquivo css como `nome.module.css` vai fazer com que esse css seja aplicada apenas para um módulo em específico.

Essa estratégia se chama 'css modules' e é possivel instalar uam extenão no vs code para facilitar o uso.

As estilizações dentro desses arquivos não podem ser genéricas a ponto de abranger uma tag, e devem se referir a uma classe.

### Instalar o SASS
- `yarn add sass`