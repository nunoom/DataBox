# 📚 DataBox — Documentação dos Algoritmos e Estruturas de Dados

Este documento explica **todos** os algoritmos e estruturas de dados implementados na
plataforma DataBox, com a sua intuição, complexidade, funcionamento passo a passo e
quando os usar. Cada tópico tem também uma **visualização interativa** na aplicação.

> Notação Big-O: `n` = número de elementos · `V` = vértices · `E` = arestas ·
> `k` = nº de chaves distintas · `w` = tamanho da janela · `m` = nº de bits · `p` = nº de partições.

## Índice

1. [Algoritmos de Ordenação](#1-algoritmos-de-ordenação)
2. [Algoritmos de Busca](#2-algoritmos-de-busca)
3. [Algoritmos de Grafos](#3-algoritmos-de-grafos)
4. [Estruturas de Dados Lineares](#4-estruturas-de-dados-lineares)
5. [Estruturas de Dados Não-Lineares](#5-estruturas-de-dados-não-lineares)
6. [Engenharia de Dados — ETL & Processamento](#6-engenharia-de-dados--etl--processamento)
7. [Engenharia de Dados — Sistemas Distribuídos](#7-engenharia-de-dados--sistemas-distribuídos)
8. [Engenharia de Dados — Processamento de Streams](#8-engenharia-de-dados--processamento-de-streams)
9. [Tabela Resumo de Complexidade](#9-tabela-resumo-de-complexidade)

---

## 1. Algoritmos de Ordenação

Ordenar é organizar elementos por uma ordem (crescente, por exemplo). É a base de
buscas eficientes, junções (joins), deduplicação e muitos outros processos.

Conceitos importantes:
- **Estável**: mantém a ordem relativa de elementos iguais.
- **In-place**: usa memória extra O(1) (ordena dentro do próprio array).
- **Adaptativo**: fica mais rápido quando os dados já estão quase ordenados.

### 1.1 Bubble Sort
**Ideia:** percorre o array comparando pares adjacentes e trocando-os quando estão fora
de ordem. A cada passagem, o maior valor "borbulha" para o fim.

**Como funciona:**
1. Compara `arr[j]` com `arr[j+1]`.
2. Se `arr[j] > arr[j+1]`, troca-os.
3. Repete até ao fim; o último elemento fica ordenado.
4. Se uma passagem não fizer trocas, o array já está ordenado (paragem antecipada).

**Complexidade:** Melhor `O(n)` (já ordenado) · Médio `O(n²)` · Pior `O(n²)` · Espaço `O(1)`.
**Estável**, in-place, adaptativo.
**Quando usar:** ensino e arrays minúsculos/quase ordenados. Evitar em produção.

### 1.2 Selection Sort
**Ideia:** procura o menor elemento da parte não ordenada e coloca-o no início.

**Como funciona:**
1. Encontra o mínimo do subarray não ordenado.
2. Troca-o com a primeira posição não ordenada.
3. Aumenta o prefixo ordenado e repete.

**Complexidade:** `O(n²)` em todos os casos · Espaço `O(1)`.
**Não estável**, in-place. Faz o **menor número de trocas** entre os simples (`O(n)` trocas),
útil quando escrever em memória é caro.

### 1.3 Insertion Sort
**Ideia:** constrói um prefixo ordenado inserindo cada elemento na posição correta —
como ordenar cartas na mão.

**Como funciona:**
1. Pega no próximo elemento (a *chave*).
2. Desloca para a direita todos os elementos ordenados maiores que a chave.
3. Insere a chave no espaço aberto.

**Complexidade:** Melhor `O(n)` · Médio/Pior `O(n²)` · Espaço `O(1)`.
**Estável**, in-place, **adaptativo** (excelente em dados quase ordenados).
Usado dentro de algoritmos híbridos (ex.: Timsort) para subarrays pequenos.

### 1.4 Merge Sort
**Ideia:** dividir-para-conquistar — parte o array ao meio, ordena cada metade
recursivamente e **junta** (merge) as duas metades ordenadas em tempo linear.

**Como funciona:**
1. Divide o array em duas metades.
2. Ordena recursivamente cada metade.
3. Faz merge das duas metades ordenadas, comparando as cabeças.

**Complexidade:** `O(n log n)` garantido em todos os casos · Espaço `O(n)` (array auxiliar).
**Estável**, **não** in-place.
**Quando usar:** ordenação estável de grandes volumes, listas ligadas e **ordenação
externa** (dados que não cabem em memória).

### 1.5 Quick Sort
**Ideia:** escolhe um *pivô*, particiona os elementos menores à esquerda e maiores à
direita, e recorre em cada partição.

**Como funciona (partição de Lomuto):**
1. Escolhe um pivô (aqui, o último elemento).
2. Move os menores que o pivô para a esquerda.
3. Coloca o pivô na posição final correta.
4. Recorre nas partições esquerda e direita.

**Complexidade:** Melhor/Médio `O(n log n)` · Pior `O(n²)` (entrada já ordenada com
pivô mau) · Espaço `O(log n)` (pilha de recursão).
**Não estável**, in-place.
**Otimizações:** mediana-de-três, pivô aleatório, partição de 3 vias (dados com muitos
duplicados), insertion sort para subarrays pequenos. É a ordenação padrão em muitas
bibliotecas pela excelente velocidade média.

### 1.6 Heap Sort
**Ideia:** transforma o array num **max-heap** binário e extrai repetidamente o máximo.

**Como funciona:**
1. Constrói um max-heap (heapify de baixo para cima).
2. Troca a raiz (máximo) com o último elemento.
3. Reduz o heap em 1 e faz o novo topo descer (sift down).
4. Repete até o heap ficar vazio.

**Complexidade:** `O(n log n)` garantido · Espaço `O(1)`.
**Não estável**, in-place. Ótimo quando se precisa do limite `O(n log n)` **sem** memória extra.

---

## 2. Algoritmos de Busca

### 2.1 Busca Linear
**Ideia:** percorre a coleção do início ao fim comparando cada elemento.

**Complexidade:** Melhor `O(1)` · Médio/Pior `O(n)` · Espaço `O(1)`.
Funciona em **qualquer** estrutura, ordenada ou não. É a única opção sem ordenação prévia.

### 2.2 Busca Binária
**Ideia:** em dados **ordenados**, compara o alvo com o elemento do meio e descarta
metade do intervalo de cada vez.

**Como funciona:**
1. Olha para o meio do intervalo `[lo, hi]`.
2. Se for igual ao alvo, terminou.
3. Se o alvo for menor, procura na metade esquerda; senão na direita.

**Complexidade:** `O(log n)` · Espaço `O(1)` (iterativa).
**Pré-requisito:** dados ordenados. Base de índices de bases de dados, `bisect`, etc.

---

## 3. Algoritmos de Grafos

Um grafo tem **vértices** (V) ligados por **arestas** (E). Pode ser dirigido/não-dirigido
e ponderado/não-ponderado. Representação típica: lista de adjacência.

### 3.1 BFS — Busca em Largura
**Ideia:** explora nível a nível usando uma **fila (FIFO)**.

**Como funciona:**
1. Enfileira o nó inicial e marca-o visitado.
2. Desenfileira um nó e visita os vizinhos não visitados.
3. Enfileira esses vizinhos; repete até a fila esvaziar.

**Complexidade:** `O(V + E)` · Espaço `O(V)`.
**Propriedade-chave:** encontra o **caminho mais curto** em grafos **não ponderados**.

### 3.2 DFS — Busca em Profundidade
**Ideia:** mergulha o mais fundo possível antes de retroceder, usando **pilha** ou recursão.

**Complexidade:** `O(V + E)` · Espaço `O(V)`.
**Usos:** deteção de ciclos, ordenação topológica, componentes conexos.

### 3.3 Dijkstra
**Ideia:** caminho mais curto em grafos **ponderados** com pesos **não negativos**.
Expande sempre o nó não visitado mais próximo e **relaxa** as suas arestas.

**Como funciona:**
1. `dist[origem] = 0`, restantes `= ∞`.
2. Escolhe o nó não finalizado com menor `dist` (idealmente com um min-heap).
3. Relaxa as arestas: se `dist[u] + peso < dist[v]`, atualiza `dist[v]`.
4. Marca `u` como finalizado e repete.

**Complexidade:** `O((V + E) log V)` com heap binário · Espaço `O(V)`.
**Limitação:** não funciona com pesos negativos (usar Bellman-Ford nesse caso).

---

## 4. Estruturas de Dados Lineares

### 4.1 Array
Elementos em memória **contígua**, endereçados por índice.
- **Acesso** `O(1)` (cálculo `base + i`).
- **Busca** `O(n)`; **inserir/remover** no meio `O(n)` (desloca os elementos seguintes).
- **Espaço** `O(n)`. Muito *cache-friendly*. Base de quase todas as outras estruturas e
  do armazenamento colunar em motores analíticos.

### 4.2 Lista Ligada
Nós, cada um com um valor e um ponteiro para o próximo.
- **Acesso/Busca** `O(n)` (sem acesso aleatório).
- **Inserir/Remover no início** `O(1)` (basta religar ponteiros — sem deslocamentos).
- **Espaço** `O(n)` + um ponteiro por nó. Tamanho dinâmico.

### 4.3 Pilha (Stack) — LIFO
Adiciona e remove apenas no **topo**.
- `push`, `pop`, `peek` — todos `O(1)`.
- **Usos:** pilha de chamadas/recursão, desfazer/refazer, histórico, parsing de expressões.

### 4.4 Fila (Queue) — FIFO
Adiciona no **fim**, remove no **início**.
- `enqueue`, `dequeue`, `peek` — todos `O(1)`.
- **Usos:** filas de mensagens (Kafka, RabbitMQ), escalonamento de tarefas, BFS.

---

## 5. Estruturas de Dados Não-Lineares

### 5.1 Árvore Binária de Busca (BST)
Árvore binária em que, para cada nó, **toda a subárvore esquerda é menor** e a **direita
maior**.
- Equilibrada: **busca/inserir/remover** `O(log n)`.
- Degenerada (entrada ordenada sem balanceamento): `O(n)`.
- O **percurso in-order** devolve os elementos **ordenados**.
- Variantes auto-balanceadas: AVL, Red-Black.

### 5.2 Heap Binário
Árvore binária **completa** em que cada pai é ≥ (max-heap) ou ≤ (min-heap) que os filhos.
- **Consultar min/máx** `O(1)` (é a raiz); **inserir/extrair** `O(log n)`.
- Implementado sobre um array: filhos de `i` em `2i+1` e `2i+2`.
- **Usos:** filas de prioridade, Dijkstra, top-K, heap sort.

### 5.3 Grafo (estrutura)
Conjunto de vértices e arestas. Lista de adjacência: espaço `O(V + E)`; matriz de
adjacência: `O(V²)`. Modela linhagem de dados, DAGs de orquestração (Airflow), redes
sociais e sistemas de recomendação.

### 5.4 Tabela Hash
Mapeia chaves para baldes de um array através de uma **função de hash**.
- **Busca/inserir (média)** `O(1)`; **pior caso** `O(n)` (tudo colide).
- **Colisões:** encadeamento (lista por balde) ou endereçamento aberto.
- Redimensiona quando o **fator de carga** cresce demasiado.
- **Usos:** dicionários, caches, deduplicação, índices e joins de bases de dados.

---

## 6. Engenharia de Dados — ETL & Processamento

### 6.1 MapReduce
Paradigma para processar **grandes volumes** num cluster, em 4 fases:
1. **Split** — a entrada é dividida em chunks.
2. **Map** — cada chunk emite pares chave-valor, **em paralelo**.
3. **Shuffle** — o framework agrupa os pares por chave.
4. **Reduce** — agrega os valores de cada chave.

Exemplo clássico: *word count*. **Tolerante a falhas**, **escala horizontalmente**.
Base do Apache Hadoop e do modelo de execução do Spark. `Map = O(n)`, `Reduce = O(k log k)`.

### 6.2 Window Functions (SQL)
Calculam um valor sobre uma **janela** de linhas relacionadas (totais acumulados,
rankings, médias móveis) **sem colapsar** as linhas — todas as linhas de entrada
permanecem na saída.
- `PARTITION BY` agrupa; `ORDER BY` ordena dentro da partição; a *frame* define que
  linhas entram no cálculo.
- Exemplos: `SUM() OVER (...)`, `RANK()`, `ROW_NUMBER()`, `LAG()/LEAD()`.
- Custo dominado pela ordenação: `O(n log n)`.

### 6.3 Particionamento
Divide um dataset em partições independentes para **paralelizar** e permitir
*partition pruning* (saltar dados irrelevantes).
- **Range** — divide por intervalos de valor (bom para range scans, propenso a
  desequilíbrio/skew).
- **Hash** — `hash(chave) % p` (distribuição uniforme, sem localidade de intervalo).
- **Round-robin** — distribui à vez, ignorando a chave (uniforme, sem agrupamento).
- Risco principal: **skew** (partições "quentes"). Usado em Spark/Hive, sharding e tópicos Kafka.

---

## 7. Engenharia de Dados — Sistemas Distribuídos

### 7.1 Consistent Hashing
Coloca **nós e chaves** num anel de hash; cada chave pertence ao **próximo nó no sentido
horário**. Adicionar ou remover um nó **só move as chaves vizinhas** desse nó — não o
mapa inteiro (apenas `O(k/n)` chaves mudam).
- **Lookup** `O(log n)`.
- **Nós virtuais** (várias posições por nó físico) equilibram a carga.
- **Usos:** caches distribuídas (Memcached, Redis), particionamento do Cassandra/DynamoDB.

### 7.2 Bloom Filter
Estrutura **probabilística** de pertencimento: um array de `m` bits + `k` funções de hash.
- **Adicionar:** liga os `k` bits dados pelos `k` hashes do item.
- **Consultar:** se **algum** desses bits for 0 ⇒ **definitivamente ausente**; se todos
  forem 1 ⇒ **provavelmente presente**.
- **Nunca** há falsos negativos; pode haver **falsos positivos**. Não permite remoção
  (usar *counting Bloom filter* para isso).
- `O(k)` para inserir/consultar, espaço `O(m)` bits (muito menor que o conjunto real).
- **Usos:** evitar leituras de disco em bases LSM (ex.: Cassandra, RocksDB), filtragem
  de cache, conjuntos de URLs de crawlers.

### 7.3 Compressão
Codifica os dados de forma mais compacta, trocando **CPU por espaço/largura de banda**.
- **RLE (Run-Length Encoding):** `"AAAB" → "3A1B"`. Brilha em sequências longas (colunas
  ordenadas, dados esparsos); em dados alternados pode até **crescer**.
- **Dicionário (LZ77/LZ78):** substitui padrões repetidos por referências.
- **Entropia (Huffman):** códigos mais curtos para símbolos mais frequentes.
- Formatos colunares (**Parquet/ORC**) comprimem **por coluna**, escolhendo a melhor
  codificação para cada uma. Na rede usam-se Snappy, Gzip, Zstd.

---

## 8. Engenharia de Dados — Processamento de Streams

### 8.1 Janela Deslizante (Sliding Window)
Mantém uma janela móvel sobre um stream, atualizando uma agregação de forma
**incremental**: ao avançar, soma o elemento que entra e subtrai o que sai — `O(1)` por
elemento, memória `O(w)`.
- **Usos:** médias móveis, métricas contínuas, limitação de taxa (rate limiting),
  deteção de anomalias.

### 8.2 Processamento por Event-Time
Usa o **timestamp do próprio evento** (quando aconteceu) em vez do tempo de processamento
(quando chegou). Assim, eventos que chegam **fora de ordem** ou **atrasados** caem na
**janela correta**.
- Necessita de *buffering* das janelas abertas. Base do Flink e do Spark Structured
  Streaming, IoT e telemetria móvel.

### 8.3 Watermarks
Uma **watermark** é um limiar móvel que afirma "não chegarão eventos mais antigos que T".
- `watermark = maxEventTimeVisto − atraso_permitido`.
- Quando a watermark **passa o fim de uma janela**, o motor **dispara** o resultado dessa
  janela; eventos que chegam depois são considerados **atrasados** (podem ser descartados
  ou tratados à parte).
- Definem o compromisso fundamental entre **latência** (disparar cedo) e **completude**
  (esperar por atrasados).

---

## 9. Tabela Resumo de Complexidade

### Ordenação

| Algoritmo      | Melhor      | Médio       | Pior        | Espaço     | Estável |
|----------------|-------------|-------------|-------------|------------|:-------:|
| Bubble Sort    | O(n)        | O(n²)       | O(n²)       | O(1)       | ✅ |
| Selection Sort | O(n²)       | O(n²)       | O(n²)       | O(1)       | ❌ |
| Insertion Sort | O(n)        | O(n²)       | O(n²)       | O(1)       | ✅ |
| Merge Sort     | O(n log n)  | O(n log n)  | O(n log n)  | O(n)       | ✅ |
| Quick Sort     | O(n log n)  | O(n log n)  | O(n²)       | O(log n)   | ❌ |
| Heap Sort      | O(n log n)  | O(n log n)  | O(n log n)  | O(1)       | ❌ |

### Busca

| Algoritmo      | Médio     | Pior      | Pré-requisito    |
|----------------|-----------|-----------|------------------|
| Busca Linear   | O(n)      | O(n)      | nenhum           |
| Busca Binária  | O(log n)  | O(log n)  | dados ordenados  |

### Estruturas de Dados (caso médio)

| Estrutura      | Acesso | Busca   | Inserir | Remover | Espaço   |
|----------------|--------|---------|---------|---------|----------|
| Array          | O(1)   | O(n)    | O(n)    | O(n)    | O(n)     |
| Lista Ligada   | O(n)   | O(n)    | O(1)*   | O(1)*   | O(n)     |
| Pilha / Fila   | O(n)   | O(n)    | O(1)    | O(1)    | O(n)     |
| BST (equilib.) | O(log n)| O(log n)| O(log n)| O(log n)| O(n)    |
| Heap Binário   | —      | O(n)    | O(log n)| O(log n)| O(n)     |
| Tabela Hash    | —      | O(1)    | O(1)    | O(1)    | O(n)     |

\* `O(1)` no início/quando já se tem a referência ao nó.

### Grafos & Data Engineering

| Tópico              | Complexidade principal       |
|---------------------|------------------------------|
| BFS / DFS           | O(V + E)                     |
| Dijkstra (heap)     | O((V + E) log V)             |
| MapReduce           | Map O(n) · Reduce O(k log k) |
| Consistent Hashing  | lookup O(log n) · move O(k/n)|
| Bloom Filter        | add/query O(k), espaço O(m) bits |
| Sliding Window      | O(1) por elemento            |

---

*Cada tópico desta documentação tem uma página interativa correspondente em DataBox,
com controlos de reprodução, código e análise de complexidade.*
