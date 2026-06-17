# DataBox — Algoritmos & Engenharia de Dados, visualizados

Plataforma educacional **interativa** para aprender algoritmos, estruturas de dados e os
padrões de sistemas distribuídos que sustentam a engenharia de dados moderna — vendo-os a
correr passo a passo, não apenas lendo sobre eles.

Bilingue (🇵🇹 Português / 🇬🇧 English), tema escuro moderno e totalmente responsivo.

## ✨ O que inclui

**28 tópicos**, cada um com página própria, complexidade, características, código de
exemplo e — em **17** deles — uma **visualização interativa** com controlos de
reprodução (play / pausa / passo-a-passo / velocidade).

### Algoritmos

- **Ordenação** — Bubble, Selection, Insertion, Merge, Quick e Heap Sort
  (animação passo a passo com comparações, trocas e pivô).
- **Busca** — Linear e Binária.
- **Grafos** — BFS, DFS e Dijkstra (traversal animado sobre um grafo).

### Estruturas de Dados

- **Lineares** — Array, Lista Ligada, Pilha, Fila (inserir/remover/procurar ao vivo).
- **Não-lineares** — Árvore Binária de Busca, Heap (vista em árvore), Grafo, Tabela Hash
  (com encadeamento de colisões).

### Engenharia de Dados

- **ETL** — MapReduce (Split→Map→Shuffle→Reduce), Window Functions (SQL), Particionamento
  (range / hash / round-robin com indicador de skew).
- **Distribuídos** — Consistent Hashing (anel), Bloom Filter (bits + falsos positivos),
  Compressão (RLE).
- **Streaming** — Janela Deslizante, Event-Time e Watermarks (timeline com eventos fora
  de ordem).

📖 Explicação detalhada de **todos** os algoritmos: [`DOCUMENTACAO.md`](./DOCUMENTACAO.md).

## 🛠️ Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (tokens de tema em CSS via `@theme`)
- **Framer Motion** (animações) · **Lucide** (ícones)

Sem dependências de rede em build (fontes do sistema), totalmente pré-renderizável.

## 🚀 Como executar

```bash
npm install
npm run dev      # http://localhost:3000  → redireciona para /en
```

Outros comandos:

```bash
npm run build    # build de produção (gera 70 páginas estáticas)
npm run start    # servir o build
npm run lint     # ESLint
```

## 🗂️ Estrutura

```
src/
├── app/
│   ├── layout.tsx                  # <html>/<body>, metadata, fontes do sistema
│   ├── page.tsx                    # redirect → /en
│   └── [locale]/                   # rotas internacionalizadas (en | pt)
│       ├── layout.tsx              # valida o locale, generateStaticParams
│       ├── page.tsx                # home (hero + secções)
│       ├── about/
│       ├── algorithms/             # listagem + [slug] dinâmico
│       ├── data-structures/        # listagem + [slug] dinâmico
│       └── data-engineering/       # listagem + [slug] dinâmico
├── components/
│   ├── Navigation, Hero, Footer, Icon, CodeBlock
│   ├── SectionListing.tsx          # listagem por secção (data-driven)
│   ├── TopicPage.tsx               # template de cada tópico (data-driven)
│   └── visualizers/                # 17 visualizadores + dispatcher + UI partilhada
└── lib/
    ├── content.ts                  # registo bilingue de TODOS os tópicos
    └── i18n.ts                     # helpers de tradução
messages/ en.json · pt.json         # textos da navegação/UI
```

### Como tudo é gerado
Toda a navegação e todas as páginas de detalhe são geradas a partir de
[`src/lib/content.ts`](./src/lib/content.ts). Adicionar um tópico = adicionar uma entrada
nesse ficheiro (e, se tiver visualização, mapear o `visualizer` em
[`src/components/visualizers/Visualizer.tsx`](./src/components/visualizers/Visualizer.tsx)).
Não há páginas "em desenvolvimento" nem links partidos.

---

Feito para quem aprende engenharia de dados e ciência da computação. ❤️
