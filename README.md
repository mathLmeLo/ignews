## NEXT JS

É um framework para React.

Ele adiciona uma camada a mais entre o Browser e o Servidor, sendo um servidor Node.js ele entrega as paginas para o browser atuando como um SSR(Server side Rendering).

Ele tenta resolver um dos problemas de construir SPAs que rodam direto no Browser: a indexação no google(buscadores e motores de adds etc). Essas ferramentas, muitas vezes buscam puramento dentro do HTML servido numa página, o que faz com que páginas de ecommerces, por exemplo deixem a desejar na performence de resultados de busca.

Como o Next.js entrega a página pronta para o broser, com todo o conteúdo já formado, sem a dinamicidade de chamadas a API que buscam conteudo externo e etc. Isso acaba por resolver esse problema da indexação.

### Notas

- Cada arquivo criado dentro da rota `pages` ou `src/pages` vira uma rota para a aplicação. Com excessão ao `_app.js` e o `_document.js`. Isso é chamado de fileSystem routing.
- O arquivo `_app.tsx` é um componente que sempre vai ficar por volta de todas as páginas, então se a intenção for aplicar algo em todas as páginas, se coloca nesse arquivo, Esse arquivo é recarregado sempre que o usuário troca de página então se algo como as fontes precisarem ser carregadas somente uma única vez no app, se utiliza outro arquivo, i `_document.tsx`
- Assim, o `_document.tsx` funciona de maneira semelhante ao `_app.tsx`, mas ele é carregado somente uma única vez na aplicação. Ele pode ser comparado com o `index.html` em um project React comum
- Uma coisa importante do NextJS é que as imagens ficam sempre dentro da pasta public e podem ser referenciadas da seguinte forma: `src="/images/logo.svg"`
- O after em `&.active::after` funciona colocando um elemento logo em seguida do conteúdo da tag, mas dentro da tag.
- O `& + a` aplica uma regra css para toda ancora que nao seja a primeira, ou seja, que tiver uma outra antes dela.
- Adicionar o border-radius do mesmo tamanho que o height faz com que fique o mais arredondado possivel: `height: 3rem; border-radius: 3rem;`
- `height: calc(100vh - 5rem);` Faz com que a altura seja a altura de toda a tela *menos* 5 rem, que é a altura do cabeçalho
- `> span`: span diretamente dentro da tag, apenas um nível de profundidade
- Com o Next existem tres formas de se executar uma função fora do browser, ou seja, com mais segurança e sem expor variáveis sensíveis:
  - getServerSideProps (SSR)
  - getStaticProps (SSG)
  - API routes

### Criar o projeto com o comando:

- `yarn create next-app ignews`

### Adicionar typescript

- `yarn add typescript @types/react @types/node -D`
Após modificar os arquivos para `.tsx` o next identifica a alteração no próximo `yarn dev` e cria o arquivo de configuração `tsconfig.json` e o arquivo de definição de tipos `next-env.d.ts`.

### Estilização no Nextjs

O nextjs permite realizar o 'scoped css' de forma nativa, de forma que nomear um aquivo css como `nome.module.css` vai fazer com que esse css seja aplicado apenas para um módulo em específico.

Essa estratégia se chama 'css modules' e é possivel instalar uam extensão no vs code para facilitar o uso.

As estilizações dentro desses arquivos não podem ser genéricas a ponto de abranger uma tag, e devem se referir a uma classe.

### Instalar o SASS
- `yarn add sass`

### Chamadas a API no SSR(Server side rendering)
Normalmente no React se usaria um useEffect para realizar a chamada a uma api que com sua resposta faria com que o browser execute a chamada e o componente fosse re-renderizado. 
Com o next a página já vem pronto do lado do servidor, então essas chamadas não acontecem dessa forma.
Se eu precisar de alguma informação "server side" dentro de um componente, é necessário repassar essa info de um *página* para o *componente*.
A página deve exportar uma função do tipo:
`export const getServerSideProps: GetServerSideProps = async () {}`
Esse método, o *getServerSideProps* é executado na camada do servidor Node, e não do browser, então, por exemplo, colocar um console.log() nele não aparece no console do browser, somente no do servidor.

### SSG - Static Site Generation
Uma vez que construiu a página completa usando o React, o NextJS salva uma versão estática desse HTML, de forma que os próximos clientes que solicitarem a página receberão essa versão estática e não vai ser necessário criar toda a página novamente.
Para utilizar essa funcionalidade no next, deve-se usar o *getStaticProps* como em:
`export const getStaticProps: GetServerSideProps = async () {}`
A propriedade *revalidate* retornada por essa função indica quanto tempo em segundos essa página estática sera'servida, antes de criar uma nova versão, revalidada.
Essa funcionalidade só pode ser utilizada em páginas que podem ser estáticas, nas quais o conteúdo é o mesmo, independentemente de quem acesse a aplicação.

Assim, no next ficamos com tres possibilidades de como fazer uma chamada a uma API:
- Client side(no browser)
- Server side
- Static site generation

### API ROUTES
Um backend básico pode ser criado integrado a aplicação NextJS.
Dentro da pasta `/pages/api` qualquer arquivo criado se transforma automaticamente em uma rota para esse backend.

Essas API Routes são implementadas o conceito de Serverless.
Quando há uma chamada a esse mini backend, um ambiente é criado, executa a req e depois morre.


### Métodos de autenticação disponíveis no NextJS
Para a grande maioria dos casos não existe melhor método de sutenticação do que simplesmente gerar um token JWT, salvar ele em um localstorage ou cookies, recuperar esse token, colocar uma data de expiração, e ir trabalhando com o refreshToken.

- JWT salvo no storage
- Next Auth, utilizado quando utilizar um login "social", com um terceito, como github, google, facebook... Utiliza apenas as API routes
-  Cognito da AWS, Auth0 (authentication as a service)

### FaunaDB
Facilita a criação de apps serverless por nao precisar manter uma conexao ativa com o banco de dados.

`yarn add faunadb`