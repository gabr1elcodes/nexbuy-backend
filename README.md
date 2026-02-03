🛠️ NexBuy – Backend API
<p align="center"> <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white" /> <img src="https://img.shields.io/badge/OAuth_2.0-4285F4?logo=google&logoColor=white" /> </p>

📌 Sobre o Projeto

Esta é a engine que sustenta o ecossistema NexBuy. Uma API REST robusta, desenvolvida com foco em segurança, integridade de dados e escalabilidade. O objetivo foi construir um servidor capaz de gerenciar autenticações complexas e operações de marketplace com alta confiabilidade.

O backend foi estruturado seguindo princípios de Clean Architecture e separação de responsabilidades, garantindo que a lógica de negócio esteja isolada da infraestrutura.

🧠 Decisões de Engenharia
Segurança em Camadas: Implementação de autenticação híbrida (Local + Social).

Modelagem de Dados: Uso do Mongoose para garantir esquemas consistentes em um banco NoSQL (MongoDB).

Escalabilidade: Estrutura de pastas preparada para o crescimento do domínio e adição de novas features sem gerar débito técnico.

🛠️ Stack Utilizada
Runtime: Node.js 20+

Framework: Express.js

Linguagem: TypeScript (Tipagem em toda a pipeline de dados)

Banco de Dados: MongoDB via Mongoose

Autenticação: JWT (JSON Web Tokens) e OAuth 2.0 (Google Cloud)

Criptografia: Bcrypt para hashing de senhas

🔐 Segurança e Autenticação
A segurança não foi tratada como um plugin, mas como o core da aplicação:

OAuth 2.0: Integração segura com Google APIs.

Bcrypt: Salting e hashing de senhas para evitar exposição em caso de vazamentos.

Middlewares de Proteção: Validação de tokens JWT em rotas privadas e sanitização de inputs.

CORS: Configuração rigorosa para permitir apenas origens autorizadas.

🧱 Estrutura de Pastas
Plaintext
src/
├── config/         # Configurações de DB, Google Strategy e Env
├── controllers/    # Lógica de recebimento de requisições
├── middlewares/    # Validação de JWT, Erros e Auth
├── models/         # Definição de Schemas do Mongoose
├── routes/         # Definição dos endpoints da API
├── services/       # Lógica de negócio e comunicação com DB
├── types/          # Interfaces e Types globais do TS
└── utils/          # Funções utilitárias e helpers
🧼 Boas Práticas Aplicadas
Principais do SOLID: Responsabilidade única em cada Service.

Tratamento de Erros Global: Middleware centralizado para respostas consistentes.

Environment Variables: Proteção total de chaves sensíveis (API Keys, Secrets).

Status Codes Semânticos: Uso correto de 201, 204, 401, 403, 500 etc.

📈 Aprendizados Principais
Gerenciamento de fluxos de OAuth 2.0 e renovação de tokens.

Importância de uma arquitetura de pastas que sobreviva ao crescimento do projeto.

Como o TypeScript no backend evita bugs de tipagem no banco de dados.

Implementação de middlewares para garantir que apenas usuários autorizados acessem recursos sensíveis.

▶️ Como Rodar Localmente
Clone o repositório:

Bash
git clone https://github.com/gabr1elcodes/nexbuy-backend.git
Instale as dependências:

Bash
npm install
Configure as variáveis de ambiente: Crie um arquivo .env na raiz conforme o .env.example:

Snippet de código
PORT=3000
MONGO_URI=seu_link_mongodb
JWT_SECRET=sua_chave_secreta
GOOGLE_CLIENT_ID=seu_id
GOOGLE_CLIENT_SECRET=seu_secret
Inicie o servidor:

Bash
npm run dev
Desenvolvido por Gabriel Oliveira 🚀 Sinta-se à vontade para abrir uma issue ou enviar um feedback técnico!
