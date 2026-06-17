# Blockchain como Sistema Distribuído

Apresentação web sobre blockchain a partir da perspectiva de sistemas distribuídos. O projeto explica a tecnologia para além das criptomoedas, conectando conceitos de consenso, replicação, criptografia, descentralização, Bitcoin, smart contracts e Ethereum.

Versão publicada: https://formigteen.github.io/spec-blockchain

## Sobre o projeto

Este repositório reúne uma apresentação interativa feita com React, Spectacle e Vite, além de uma monografia em LaTeX/PDF sobre o mesmo tema.

O conteúdo aborda:

- fundamentos de blockchain como ledger distribuído;
- redes peer-to-peer, descentralização e tolerância a falhas;
- funções hash, árvores de Merkle, criptografia simétrica e assimétrica;
- consenso, Proof of Work, Proof of Stake e trade-offs de arquitetura;
- Bitcoin, transações, blocos, mineração, carteiras e script;
- smart contracts, DApps, DAOs, oráculos e Ethereum.

## Tecnologias

- React
- TypeScript
- Vite
- Spectacle
- Framer Motion
- React Latex

## Como executar

Instale as dependências:

```bash
yarn install
```

Inicie a apresentação localmente:

```bash
yarn start
```

Por padrão, o Vite sobe em `http://localhost:3001`.

## Build

Gere a versão de produção:

```bash
yarn build
```

Os arquivos finais são gerados em `dist/`.

## Estrutura

- `index.tsx`: apresentação principal em Spectacle.
- `src/assets/`: imagens usadas nos slides.
- `monografia.tex`: fonte da monografia.
- `monografia.pdf`: versão compilada da monografia.
- `vite.config.ts`: configuração do Vite e do caminho base de deploy.
