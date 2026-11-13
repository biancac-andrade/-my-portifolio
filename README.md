# Portfólio — Bianca Andrade

Site pessoal em **React + Vite + TypeScript**, com animações (**Motion**), scroll suave (**Lenis**), seções narrativas e identidade visual **Aurora profissional** (`src/index.css`).

## Objetivos

| Foco | Descrição |
|------|-----------|
| **Negócio** | Apresentar trajetória, stack e projetos para recrutadores, freela e parceiros — com ênfase em acessibilidade, Full Stack e IA aplicada. |
| **Produto** | Landing única, navegação por âncoras, dados reais do GitHub quando possível, contato de baixo atrito (WhatsApp, formulário, PDF). |
| **Técnico** | UI moderna sem backend próprio: APIs públicas, Web3Forms e conteúdo versionado em código. |

## Arquitetura do código

```
src/
├── App.tsx                 # Shell: layout global + ordem das seções
├── main.tsx                # React root + Lenis
├── index.css               # Design tokens e tipografia
├── App.css                 # Estilos dos componentes
├── components/
│   ├── layout/             # Nav, scroll, grade, som ambiente
│   ├── sections/           # Hero, Sobre, Formação, Skills, Projetos, Contato
│   ├── hero/               # Vídeo, stage, greeting, scroll cue
│   ├── projects/           # Showcase, preview, lightbox de vídeo
│   ├── education/          # Carrossel de formação
│   ├── skills/             # Hard/soft skills e gráfico GitHub
│   └── ui/                 # Reveal, SectionWash, ícones, retrato
├── data/
│   └── profile.ts          # Textos, links, projetos, formação
├── types/
│   └── profile.ts          # Tipos do domínio (projetos, skills, contato)
├── hooks/                  # Scroll spy, GitHub API, reduced motion
└── lib/                    # Formulário Web3Forms, agregação de linguagens
```

### Convenções

- Imports com alias **`@/`** (configurado em `vite.config.ts` e `tsconfig.app.json`).
- Conteúdo editável concentrado em **`src/data/profile.ts`**; tipos em **`src/types/profile.ts`**.
- **`prefers-reduced-motion`**: Lenis e animações pesadas são reduzidas (`useReducedMotion`).

## Stack

| Pacote | Uso |
|--------|-----|
| React 19 + Vite 8 | App e build |
| Motion | Animações e nav ativo |
| Lenis | Scroll suave (`SmoothScroll`) |
| Web3Forms | Envio do formulário (opcional) |

## Scripts

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção → dist/
npm run preview  # servir o build
npm run lint     # oxlint
```

## Formulário de contato (Web3Forms)

1. Cadastro em [web3forms.com](https://web3forms.com) com **`bc.andrade05@gmail.com`**.
2. **Website URL:** `localhost` para desenvolvimento; depois o domínio publicado (somente host, sem path).
3. Copie a access key:

```bash
cp .env.example .env
```

```env
VITE_WEB3FORMS_ACCESS_KEY=sua-chave
```

Reinicie o `npm run dev` após alterar o `.env`. Sem chave, o botão usa `mailto:`.

| Com chave | Sem chave |
|-----------|-----------|
| POST para Web3Forms → e-mail | Abre cliente de e-mail |

## Fontes de dados

| Fonte | Uso |
|--------|-----|
| [GitHub — biancac-andrade](https://github.com/biancac-andrade) | Links, repos, linguagens (API + fallback em `profile`) |
| [LinkedIn](https://www.linkedin.com/in/bcandrade/) | Avatar de fallback, redes |
| `public/education/*` | Logos UNISAL, PUC Minas, UNIPDS |
| `public/projects/*`, `public/hero/*`, `public/avatar/*` | Mídia estática |

### Logos da formação

| Instituição | Referência | Arquivo |
|-------------|------------|---------|
| UNISAL | [essj.com.br](https://www.essj.com.br/tags/unisal/) | `unisal.png` |
| PUC Minas | [pucminas.br](https://www.pucminas.br/destaques/Paginas/default.aspx) | `pucminas-crest-2025.png` |
| UNIPDS | [unipds.com.br](https://unipds.com.br/gads-pos-ia-v2/) | `unipds-official.png` |

## Vídeo do hero (image-to-video)

Produção com Kling, Hailuo, Luma, Pika e Runway; assets em `public/hero/`. Avatar do nav: recorte em `public/avatar/`.

## Onde editar

| Conteúdo | Arquivo |
|----------|---------|
| Textos, links, projetos, formação | `src/data/profile.ts` |
| Tipos de projeto/skills | `src/types/profile.ts` |
| Ordem das seções | `src/App.tsx` |
| Estilos | `src/App.css`, `src/index.css` |
| GitHub languages (API) | `src/hooks/useGitHubRepoLanguages.ts` |
| Formulário | `src/lib/submitContactForm.ts`, `ContactSection.tsx` |

## Som ambiente

MP3 licenciado em `public/audio/`; metadados em `ambientMusic` em `profile.ts`.

## Acessibilidade

Com **reduzir movimento** ativo: scroll nativo, menos motion, vídeos podem usar só poster.

## Licença e mídia

Código conforme o repositório; vídeo, música e PDF para uso no portfólio — respeitar licenças das ferramentas e da trilha.
