# DataBox - Plataforma Interativa para Engenharia de Dados

Uma plataforma educacional moderna e interativa para aprender algoritmos e estruturas de dados essenciais para engenharia de dados. Criada para estudantes e profissionais que desejam visualizar e compreender conceitos fundamentais da ciência da computação e engenharia de dados.

## 🚀 Características

- **Visualizações Interativas**: Veja algoritmos em ação com animações em tempo real
- **Algoritmos de Data Engineering**: MapReduce, Hashing Consistente, Bloom Filters e mais
- **Controles Personalizáveis**: Ajuste velocidade, tamanho do array e entrada de dados
- **Análise de Complexidade**: Visualize complexidade de tempo e espaço
- **Interface Moderna**: Design escuro e profissional com Tailwind CSS
- **Multilíngue**: Suporte completo para Português e Inglês
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias

- **Next.js 16** - Framework React para produção
- **TypeScript** - JavaScript tipado para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos

## 📚 Conteúdo Implementado

### Algoritmos Clássicos
- **Bubble Sort** - Algoritmo simples para aprendizado
- **Quick Sort** - Algoritmo eficiente dividir e conquistar

### Algoritmos de Data Engineering ⭐
- **MapReduce** - Paradigma de processamento distribuído com visualização completa
- **Consistent Hashing** *(em desenvolvimento)*
- **Bloom Filter** *(em desenvolvimento)*
- **Window Functions** *(em desenvolvimento)*
- **Partitioning Algorithms** *(em desenvolvimento)*

### Estruturas de Dados
- **Array** - Estrutura fundamental com exemplos práticos
- **Outras estruturas** *(em desenvolvimento)*

## 🎯 Algoritmos de Data Engineering Planejados

### ETL & Processamento
- **MapReduce** ✅ - Implementado com visualização interativa
- **Window Functions** - Funções analíticas SQL
- **Partitioning Algorithms** - Range, Hash, Round-robin

### Sistemas Distribuídos
- **Consistent Hashing** - Distribuição de dados com mínima reorganização
- **Bloom Filter** - Estrutura probabilística para teste de pertencimento
- **Compression Algorithms** - Snappy, Gzip, Parquet encoding

### Stream Processing
- **Sliding Window** - Processamento de janelas deslizantes
- **Event Time Processing** - Tratamento de eventos fora de ordem
- **Watermarks** - Controle de progresso em tempo de evento

## 🏗️ Conceitos Fundamentais Cobertos

- **ETL Pipelines** - Padrões Extract, Transform, Load
- **Distributed Processing** - Processamento paralelo e tolerância a falhas
- **Data Partitioning** - Estratégias de divisão de dados
- **Stream Processing** - Processamento em tempo real
- **SQL Optimization** - Otimização de queries e índices
- **Fault Tolerance** - Tolerância a falhas em sistemas distribuídos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd data-structures-algorithms
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🌐 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── [locale]/          # Rotas internacionalizadas
│   │   ├── algorithms/    # Algoritmos clássicos
│   │   ├── data-engineering/ # Algoritmos de Data Engineering ⭐
│   │   ├── data-structures/ # Estruturas de dados
│   │   └── about/         # Página sobre
├── components/            # Componentes React
│   ├── Navigation.tsx     # Barra de navegação
│   ├── SortingVisualizer.tsx # Visualizador de ordenação
│   └── MapReduceVisualizer.tsx # Visualizador MapReduce ⭐
├── lib/                   # Utilitários
│   └── i18n.ts           # Sistema de internacionalização
└── messages/             # Arquivos de tradução
    ├── en.json           # Traduções em inglês
    └── pt.json           # Traduções em português
```

## 💡 Sugestões de Nomes Alternativos

Se "DataBox" não for ideal, aqui estão outras opções:

### Nomes Técnicos
- **DataFlow Academy**
- **BigData Visualizer**
- **DataPipe Learning**
- **StreamLab**
- **DataEngine Studio**

### Nomes Modernos
- **DataViz Pro**
- **AlgoStream**
- **DataCraft**
- **PipelineHub**
- **DataForge**

### Nomes Educacionais
- **DataEng Academy**
- **LearnDataOps**
- **DataSkills Lab**
- **BigData Bootcamp**
- **DataMaster Platform**

## 🎨 Funcionalidades Destacadas

### MapReduce Visualizer ⭐
- Visualização completa do paradigma MapReduce
- Exemplo prático de contagem de palavras
- Fases claramente separadas (Map, Shuffle, Reduce)
- Controles interativos de velocidade
- Explicações detalhadas em PT/EN

### Interface Moderna
- Design dark theme profissional
- Animações suaves com Framer Motion
- Gradientes e efeitos visuais
- Totalmente responsivo

### Sistema Educacional
- Explicações detalhadas de cada algoritmo
- Análise de complexidade
- Casos de uso reais em Data Engineering
- Exemplos de código práticos

## 🎯 Roadmap

### Próximas Implementações
- [ ] Consistent Hashing com visualização de nós
- [ ] Bloom Filter com demonstração de falsos positivos
- [ ] Window Functions SQL com exemplos práticos
- [ ] Algoritmos de compressão
- [ ] Stream processing com Kafka simulation

### Melhorias Planejadas
- [ ] Modo de comparação de algoritmos
- [ ] Playground de código interativo
- [ ] Exportação de visualizações
- [ ] Testes automatizados
- [ ] PWA support

## 📞 Contato

Para dúvidas, sugestões ou contribuições, entre em contato através das issues do GitHub.

---

Desenvolvido com ❤️ para a comunidade de engenharia de dados e ciência da computação.