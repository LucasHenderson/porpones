# PORPONÊS: site estático

Site institucional do PORPONÊS (curso de língua japonesa online), em **HTML + CSS + JavaScript puro**, sem build step.
Abra `index.html` direto no navegador (duplo clique) ou publique a pasta inteira em qualquer hosting estático. Hoje ele é publicado pelo Cloudflare (ver "Publicação").

## Estrutura

```
index.html                    Home
cursos.html                   Cursos
viagem.html                   Viagem (página-mãe)
viagem-tokyo.html             Arredores de Tóquio
viagem-osaka.html             Arredores de Osaka
viagem-outras-cidades.html    Outras cidades
viagem-experiencias.html      Experiências culturais
intercambio.html              Intercâmbio
escola-de-idioma.html         Escolas de idioma recomendadas
jlpt.html                     JLPT
working-holiday.html          Working Holiday (em breve)
quiz.html                     Quiz de língua e cultura japonesa
assets/css/style.css          Folha de estilos única (variáveis em :root, tema escuro, animações)
assets/js/main.js             WhatsApp, painel de configurações (idioma, tema, sons), menu lateral, transições, carrossel
assets/js/translations.js     Traduções (inglês e japonês)
assets/js/quiz-perguntas.js   As 45 perguntas do quiz (conteúdo: é aqui que se edita)
assets/js/quiz.js             O jogo do quiz (sorteio, acerto/erro, resultado)
assets/img/                   Logo, favicon e imagens
assets/img/illus/             Ilustrações (irasutoya.com), uma por bloco do site
assets/img/<pasta>/           Fotos de cada página (tokyo, osaka, outras-cidades, experiencias-culturais, intercambio)
wrangler.jsonc                Configuração do Cloudflare (site estático, sem build)
.assetsignore                 Arquivos do repositório que não são publicados no site
```

## Publicação (Cloudflare)

O site é publicado pelo Cloudflare a partir deste repositório do GitHub: cada `git push` na branch `main` gera um deploy novo automaticamente.

- `wrangler.jsonc` diz ao Cloudflare que o projeto é só de arquivos estáticos (sem build e sem servidor). O campo `name` precisa ser igual ao nome do projeto criado no painel (`porpones`).
- `.assetsignore` lista o que fica fora do site publicado (README, arquivos de configuração, fotos originais).
- `.gitignore` deixa as **fotos originais** em alta resolução (`.jpg`/`.png` das pastas de fotos, até 14 MB cada) só no computador. O site usa as versões `.webp` otimizadas da mesma pasta. Ao adicionar uma foto nova, gere também o `.webp` (cerca de 1200×900 px) e use ele no HTML.

Configuração no painel do Cloudflare (**Workers & Pages → Create → Import a repository**): nome do projeto `porpones`, *build command* vazio, *deploy command* `npx wrangler deploy` (o padrão). O endereço fica `https://porpones.<sua-conta>.workers.dev`.

Pelo **Cloudflare Pages** também funciona: *framework preset* `None`, *build command* vazio, *build output directory* `/`. Nesse caso o `wrangler.jsonc` é ignorado.

Nos dois casos, os endereços ficam sem `.html` (`/cursos.html` redireciona para `/cursos`), e os links do site continuam funcionando.

## Antes de publicar: checklist

### 1. Número do WhatsApp (obrigatório)

Abra `assets/js/main.js` e edite as constantes do início do arquivo:

```js
const WHATSAPP_NUMBER = "5563900000000"; // TODO: substituir pelo número real
const WHATSAPP_MESSAGES = {
  pt: "Olá! Vim pelo site do PORPONÊS e gostaria de saber mais sobre os cursos.",
  en: "Hello! I found the PORPONÊS website and would like to know more about the courses.",
  ja: "こんにちは。PORPONÊSのサイトを見て、コースについて詳しく知りたいです。"
};
```

Formato do número: internacional, **só dígitos** (55 + DDD + número). Ex.: `5511987654321`.

Todos os botões do site com o atributo `data-whatsapp-link` ("Fale conosco" no header e no menu lateral, CTAs de cada página, rodapé) são preenchidos automaticamente, na mensagem do idioma que o visitante escolheu. Não precisa editar nenhum HTML.
Alguns botões usam uma mensagem específica via `data-whatsapp-message="..."` (ex.: aviso de lançamento do Working Holiday, envio de depoimento). Para alterar, edite o atributo no HTML e a tradução correspondente em `assets/js/translations.js`.

Enquanto o número for o placeholder, o console do navegador exibe um aviso.

### 2. Logo

A logo está em `assets/img/logo.png` (fundo transparente, traço escuro), usada no header e no hero da home.
Variantes geradas a partir do arquivo original:

- `assets/img/logo.png`: versão principal (fundo transparente, traço escuro)
- `assets/img/logo-white.png`: versão branca, usada no rodapé e no tema escuro (header e hero)
- `assets/img/logo-original.jpg`: cópia do arquivo original recebido (referência)

**Favicon**: para ter contraste em qualquer aba (clara ou escura), o ícone mantém o disco branco da logo original, com o lado de fora transparente. Os arquivos, gerados a partir de `logo-original.jpg`, são referenciados no `<head>` de todas as páginas:

- `assets/img/favicon.ico` (16/32/48 px, navegadores antigos)
- `assets/img/favicon-32.png` (aba do navegador)
- `assets/img/icon-192.png` (Android / atalho na tela inicial)
- `assets/img/apple-touch-icon.png` (180 px, fundo branco sólido, iOS)
- `assets/img/favicon.png` (256 px, versão genérica)

Para trocar a logo, substitua os arquivos mantendo os nomes. O atributo `data-logo-dark="assets/img/logo-white.png"` nas imagens do header e do hero indica qual versão usar no tema escuro; se a nova logo funcionar bem nos dois temas, basta remover esse atributo. Se usar `.svg` ou `.webp`, troque a extensão no `src` dos `<img data-logo>`; o script também tenta `.svg`/`.webp` automaticamente se o `.png` não existir.

### 3. Imagens reais (placeholders)

Todo lugar que precisa de foto tem um bloco com borda tracejada e um texto descrevendo **o que** deve entrar ali e a **proporção/dimensão** sugerida. Procure nos arquivos HTML pela classe `img-placeholder`:

```html
<div class="img-placeholder" style="aspect-ratio: 4/3;" role="img" aria-label="..." data-i18n-attr="aria-label">
  <span class="img-placeholder__label" data-i18n>Foto: Tokyo Skytree (paisagem, 4:3, mín. 800×600px)</span>
</div>
```

Substitua o bloco inteiro por uma imagem real com a mesma proporção:

```html
<!-- hero, destinos (viagem.html), escolas, working holiday: -->
<img class="img-real" src="assets/img/fuji.jpg" alt="Monte Fuji ao entardecer" style="aspect-ratio: 16/9;">

<!-- cards de pontos turísticos e experiências (.card--place): -->
<img class="card__img" src="assets/img/tokyo-skytree.jpg" alt="Tokyo Skytree">

<!-- avatares de depoimento: -->
<img src="assets/img/aluno-nicole.jpg" alt="" width="64" height="64" style="border-radius: 50%; object-fit: cover; flex: none;">
```

Coloque as fotos em `assets/img/`. Nomes de arquivo sem espaços ou acentos. Ao remover um placeholder, a entrada dele em `translations.js` pode ser apagada (ou deixada; entradas não usadas não atrapalham).

Placeholders que ainda restam: os **6 avatares** do carrossel de depoimentos em `index.html` (1:1).

Já têm fotos reais (`.webp` em `assets/img/<pasta>/`): os cards de `viagem-tokyo.html`, `viagem-osaka.html`, `viagem-outras-cidades.html` e `viagem-experiencias.html` (4:3, 1200×900 px), as 2 escolas de `escola-de-idioma.html` (3:4, 600×800 px) e as 45 ilustrações do quiz.

Os ícones dos 9 blocos do Working Holiday são SVG inline e não precisam de imagem. O hero da home, os 4 destinos de `viagem.html` e o bloco 16:9 do Working Holiday deixaram de ser fotos: agora usam ilustrações (seção abaixo).

### 3b. Ilustrações (irasutoya)

As figuras do site vêm do [irasutoya](https://www.irasutoya.com/) (ilustrações gratuitas, uso comercial permitido) e ficam em `assets/img/illus/`, já redimensionadas (720 px) e otimizadas. Para trocar uma figura, baixe outra no site, salve com o **mesmo nome** e pronto.

> **Limite da licença**: o irasutoya libera até **20 ilustrações por obra** (o site inteiro conta como uma obra); a partir da 21ª o uso é pago. Hoje são **18**. Antes de adicionar mais, confira os termos em https://www.irasutoya.com/p/terms.html.

| Arquivo | Onde aparece | Nome no irasutoya (cole na busca do site) |
|---|---|---|
| `home-hero.png` | Home, hero | 日本語を勉強する外国人のイラスト |
| `home-teacher.png` | Home, "Sobre o PORPONÊS" | 先生のイラスト（女性） |
| `home-online.png` | Home, "Como funciona" | オンライン授業を受ける学生のイラスト（女性） |
| `home-siblings.png` | Home, "Descontos" | 三兄弟のイラスト |
| `cta-phone.png` | CTAs da home e de Cursos | 立ってスマホを使う人のイラスト（女性）, variante `_smile` |
| `cursos-hero.png` | Cursos, hero | 外国語を学ぶ人のイラスト（女性）, variante `japanese` |
| `cursos-viagem.png` | Cursos, card Para Viagem | 看板が読めて安心する外国人のイラスト |
| `cursos-criancas.png` | Cursos, card Crianças | 手を挙げる女の子のイラスト |
| `jlpt-pass.png` | Cursos (card JLPT) e JLPT (hero) | いろいろな合格した人のイラスト（女性） |
| `viagem-hero.png` | Viagem, hero | 旅行の荷物をまとめている人のイラスト |
| `viagem-tokyo.png` | Viagem, destino Tokyo | 東京スカイツリーのイラスト |
| `viagem-osaka.png` | Viagem, destino Osaka | 大阪城のイラスト |
| `viagem-outras.png` | Viagem, Outras cidades | 金閣寺のイラスト |
| `viagem-experiencias.png` | Viagem, Experiências | 日本文化が好きな外国人のイラスト |
| `intercambio-hero.png` | Intercâmbio, hero | いろいろな留学生のイラスト（女性） |
| `escola-hero.png` | Escola de idioma, hero | 日本語学校のイラスト |
| `wh-suitcase.png` | Working Holiday, "A partir de dezembro" | 沢山ステッカーが貼られたスーツケースのイラスト |
| `wh-zairyu.png` | Working Holiday, passo 9 | 在留カードのイラスト |

Como os blocos são montados (CSS na seção "11. Ilustrações" de `style.css`):

- `.figure` desenha um círculo suave atrás da figura (`.figure--paper` cinza, padrão rosado; `--sm`/`--xs` reduzem o tamanho).
- `.page-hero__grid` + `.page-hero__figure` colocam a figura à direita do título da página (≥ 768px; no celular ela vai abaixo).
- `.course__illus` é a figura pequena no canto do card de curso; `.cta-block--illus` põe a figura ao lado do texto do CTA; `.guide__item--illus` à direita de um passo do guia.
- Todas as `<img>` são decorativas (`alt=""`) e têm `width`/`height` para não "pular" o layout ao carregar.

### 4. Depoimentos reais

Os seis depoimentos do carrossel da home (`index.html`) são **exemplos fictícios**, marcados no código com um comentário:

```html
<!-- ATENÇÃO: os depoimentos abaixo são PLACEHOLDERS de exemplo ... -->
```

Para cada depoimento real, edite o card `.testimonial` (texto, nome, curso), **remova** o selo visual `<span class="badge badge--dev">exemplo</span>` e adicione a tradução do novo texto em `translations.js` (veja abaixo).

Os cards ficam em um **carrossel**: 1 por vez no celular, 2 no tablet e 3 no desktop, com setas e pontos. Para acrescentar ou remover um depoimento, basta adicionar ou apagar um `<li class="carousel__slide">` dentro de `.carousel__track` — as setas e os pontos se ajustam sozinhos (`initCarousel()` em `main.js`, estilos na seção "12. Carrossel" de `style.css`).

### 5. Quiz

`quiz.html` é um jogo: o visitante escolhe a dificuldade (**fácil**, **médio** ou **difícil**) na barra do topo e responde a **3 perguntas sorteadas** entre as 15 daquele nível. Cada resposta mostra na hora se foi certa ou errada (com animação e som) e, no fim da rodada, a tela de resultado traz a resposta correta e uma breve explicação das 3 perguntas, além do botão **Jogar novamente**, que mantém a dificuldade escolhida.

**As perguntas ficam em `assets/js/quiz-perguntas.js`** — é o único arquivo que precisa ser editado para mudar o conteúdo. São 45 perguntas (15 por nível), cada uma com as três versões de idioma já no próprio item:

```js
{
  img: "",                       // caminho da ilustração (vazio = molde tracejado)
  alt: "",                       // texto alternativo da imagem (opcional)
  hint: "descrição da cena",     // a CENA do prompt de geração de imagem
  correct: 1,                    // índice da resposta certa (0, 1, 2 ou 3)
  pt: { q: "pergunta", a: ["A", "B", "C", "D"], why: "explicação" },
  en: { ... },
  ja: { ... }
}
```

- `correct` conta **a partir de zero** (0 = primeira alternativa).
- As 4 alternativas têm que estar na **mesma ordem** nos três idiomas; o quiz embaralha a ordem sozinho a cada rodada.
- Dá para acrescentar ou remover perguntas à vontade: o quiz sempre sorteia 3 entre as que existirem no nível.
- Os textos do jogo (botões, contador, mensagens de resultado) **não** ficam em `translations.js`: estão no objeto `UI` no início de `assets/js/quiz.js`, também nos três idiomas.

**Ilustrações do quiz (pendente)**: enquanto `img` estiver vazio, a pergunta mostra um molde tracejado com o texto de `hint`. Para colocar a imagem, salve o arquivo em `assets/img/quiz/` e preencha `img: "assets/img/quiz/nome.png"`.

#### Gerando as 45 ilustrações

O campo `hint` de cada pergunta **já é a cena pronta para o prompt**: copie o texto e cole no lugar de `{{CENA}}` no template abaixo, sem precisar reescrever nada.

```
Ilustração vetorial plana (flat design) para um site educativo sobre o Japão.

CENA: {{CENA}}

IDENTIDADE — nunca muda de uma imagem para outra:
- Vetor plano: cores chapadas, sem gradiente, sem textura, sem sombreamento
  volumétrico, sem brilho.
- Contorno de tinta escura #1c1b1f, uniforme: a MESMA espessura em todos os
  elementos e em todas as imagens (cerca de 3px em uma imagem de 1024px de
  largura). Cantos levemente arredondados.
- Rosto sempre com a mesma gramática: olhos como pontos simples, boca como um
  traço curto, sem nariz detalhado, sem bochechas coradas. Sobrancelhas finas
  são permitidas. Expressão sutil, coerente com a cena, nunca exagerada.
- Proporção corporal realista para a idade, nunca estilo chibi ou cabeçudo.
- Aparência calma e sóbria, nada infantilizado.

PALETA:
- Contorno sempre #1c1b1f.
- Toda imagem precisa ter pelo menos um detalhe em vermelho vermilhão #b23a2e,
  nem que seja pequeno — é o fio que costura a coleção inteira.
- Fora isso, escolha de 3 a 5 cores desta família, as que fizerem mais sentido
  para o assunto da cena:
  #2e4057 índigo · #7a9bb5 azul acinzentado · #46614c verde-musgo ·
  #6b8f71 verde-chá · #c9a227 ocre · #e0bd6a mostarda clara ·
  #cf7a52 terracota · #5c4a63 berinjela · #d9c9ae areia ·
  #e8ded0 bege claro · #8c8880 cinza-pedra · #ffffff branco
- Clareie ou escureça esses tons quando precisar de um intermediário.
- Tudo terroso e dessaturado: nada de cor neon ou muito saturada.

O QUE DEVE VARIAR conforme a cena:
- A cor dominante nasce do assunto, não é sempre a mesma.
- Enquadramento: figura inteira, meio corpo ou só o objeto em destaque.
- Ângulo: frontal, três quartos, perfil ou visto de cima.
- Pessoas: idade, tipo físico, cabelo e roupa variados. Tons de pele variados,
  do bege claro ao castanho escuro, sempre chapados.
- A escala do assunto pode ocupar de 60% a 85% da altura do quadro.

COMPOSIÇÃO:
- Assunto isolado e centralizado, inteiro dentro do quadro, com pelo menos 8%
  de margem livre nas quatro bordas. Nada cortado nas bordas.
- No máximo dois objetos de apoio que a cena exija, junto ao assunto.
- Sem chão, sem paisagem, sem cenário ao fundo.
- Proporção 4:3, paisagem.
- Fundo 100% branco puro (#FFFFFF), liso: sem sombra no chão, sem moldura,
  sem gradiente.

NÃO INCLUIR:
- Nenhum texto, letra, número, kanji, kana ou placa escrita.
- Nada de fotorrealismo, 3D, aquarela, anime, mangá, pixel art ou traço de
  quadrinhos.
- Sem marca d'água, sem assinatura, sem logotipo.
```

O que mantém as 45 parecendo um conjunto é o **traço** — contorno de espessura fixa, mesmo nível de simplificação, mesma gramática de rosto — e o vermelho torii obrigatório em algum detalhe de cada imagem. Não é a paleta idêntica: travar as cores só deixa tudo monótono. Como cada geração é independente (o modelo não lembra das anteriores), a variação vem amarrada ao texto da cena: uma barraca de comida sai ocre e terracota, um escritório sai índigo e cinza, sem você escolher nada.

**Travando o traço**: gere **uma** imagem primeiro e ajuste até gostar do resultado. Depois, anexe *essa sua imagem aprovada* como referência e use este prompt curto nas outras 44:

```
Use a imagem de referência anexada apenas como guia de TRAÇO: mesma espessura
de contorno, mesmo nível de simplificação, mesmo tipo de rosto, mesma ausência
de gradiente e mesmo fundo branco liso.

NÃO copie a paleta da referência. Escolha cores novas para esta cena, dentro
da mesma família terrosa e dessaturada, mantendo só o contorno #1c1b1f e pelo
menos um detalhe em #b23a2e.

CENA: {{CENA}}

Mesmas regras: 4:3, assunto isolado e centralizado com margem, sem texto de
nenhum tipo, sem sombra no chão.
```

O aviso de não copiar a paleta é essencial: sem ele o modelo reproduz as cores exatas da referência e devolve justamente a monotonia que o template principal evita.

Duas decisões por trás das cenas escritas nos `hint`:

- **Nenhuma tem texto dentro da figura.** Modelos de imagem erram kana com frequência e, como o site troca de idioma, um texto embutido na ilustração ficaria errado em inglês e japonês. O enunciado da pergunta já carrega o texto.
- **Nenhuma entrega a resposta.** Onde a figura óbvia seria a própria resposta (a pergunta "o que é um torii?" com um torii desenhado, por exemplo), a cena é deliberadamente neutra — um turista olhando para cima, no caso.

O prompt pede fundo branco porque é o que se recorta de forma limpa; passe as imagens por um removedor de fundo antes de salvá-las, para não aparecer um retângulo branco sobre o círculo do quiz (ver abaixo).

**Tamanho e proporção das imagens do quiz**

| | |
|---|---|
| Proporção | **4:3** (paisagem) |
| Tamanho recomendado | **600 × 450 px** |
| Mínimo | 400 × 300 px |
| Formato | PNG com fundo transparente (ou WebP) |
| Peso | até ~80 KB por imagem |

O quadro da ilustração tem no máximo **300 px de largura** na tela (`.quiz__figure`, 300 × 225 px em 4:3), e encolhe junto com a tela no celular. Os 600 × 450 px recomendados são o dobro disso, para a figura não ficar borrada em telas retina.

Não é obrigatório recortar tudo em 4:3: o CSS usa `object-fit: contain`, então **a imagem nunca é esticada nem cortada** — uma figura quadrada ou vertical só aparece centralizada dentro do quadro 4:3, com sobra nas laterais. O 4:3 é só o formato que preenche melhor o espaço.

Fundo transparente é o ideal porque o quadro tem um círculo cinza-claro atrás da figura (`.quiz__figure::before`), que muda de cor no tema escuro. Uma imagem com fundo branco sólido apareceria como um retângulo por cima desse círculo.

O espaço já fica reservado pelo CSS (`aspect-ratio: 4 / 3`), então o layout não "pula" enquanto a imagem carrega.

> **Por que o quiz não usa o irasutoya**: a licença deles libera 20 ilustrações por obra e o site já usa 18 nos blocos das outras páginas (ver seção 3b). As 45 imagens do quiz precisam de outra origem — daí o estilo próprio descrito no template acima.

## Idiomas (português, inglês e japonês)

O site abre em **português**. O visitante troca o idioma no painel de configurações (engrenagem no header, linha "Idioma": PT / EN / 日本語); a escolha fica salva no navegador (`localStorage`). Também é possível abrir uma página já em um idioma pela URL, ex.: `index.html?lang=en` ou `cursos.html?lang=ja`.

Como funciona:

- O português é o texto escrito nos arquivos HTML. Cada elemento traduzível tem o atributo `data-i18n`; atributos traduzíveis (`aria-label`, `title`, `content` da meta description, `data-whatsapp-message`) são listados em `data-i18n-attr`.
- `assets/js/translations.js` é um dicionário em que a **chave é o próprio texto em português** e o valor traz `en` e `ja`:

```js
"Ver cursos": { en: "See courses", ja: "コースを見る" },
```

Para editar um texto:

1. altere o português no HTML;
2. atualize a chave correspondente em `translations.js` (tem que ser idêntica ao HTML, incluindo tags internas como `<strong>` ou `<span lang="ja">`; espaços repetidos são ignorados);
3. revise as versões `en` e `ja`.

Para um texto novo, adicione `data-i18n` ao elemento e crie a entrada. Textos sem tradução continuam em português e geram um aviso no console do navegador (o elemento recebe `data-i18n-missing`), o que facilita achar o que falta.

Em japonês, os rótulos decorativos em japonês que ficariam repetidos ao lado do título traduzido (ex.: `標準コース` acima de "PADRÃO") são ocultados por CSS (`html[lang="ja"]`).

## Painel de configurações (idioma, tema, sons)

A engrenagem no header (desktop e mobile) abre um painel que desce do cabeçalho com três linhas: **Idioma** (PT / EN / 日本語), **Tema** (interruptor com o ícone sol/lua animado) e **Sons da interface** (interruptor com o alto-falante). O painel fecha com clique fora, `Esc` ou ao abrir o menu lateral. Markup em cada página dentro de `<div class="settings">`; estilos em "5. Cabeçalho" de `style.css` (`.settings*`, `.seg*`, `.switch`); comportamento em `initSettings()` de `main.js`. Se alterar o painel, replique em todas as páginas.

## Tema claro e escuro

A linha "Tema" do painel de configurações alterna o tema, com animação no ícone e transição de cores. Sem escolha salva, o site segue a preferência do sistema do visitante; a escolha fica salva em `localStorage` (`porpones-theme`).

Todas as cores estão em variáveis no início de `assets/css/style.css`: o bloco `:root` define o tema claro e `:root[data-theme="dark"]` sobrescreve só o que muda. Para ajustar o tema escuro, edite apenas esse segundo bloco. Blocos que são escuros nos dois temas (rodapé, CTA escuro, avisos escuros) usam `--color-block` e `--color-footer-bg`; fundos de cards usam `--color-surface`.

Um script inline no `<head>` de cada página aplica o tema e o idioma salvos antes da primeira pintura, para não "piscar". Se editar esse script, replique em todas as páginas.

## Sons da interface

Sons curtos e discretos, sintetizados com a Web Audio API (não há arquivos de áudio): clique em botões e links, troca de página, abrir/fechar o menu lateral, troca de tema e de idioma, setas do carrossel e, no quiz, acerto (arpejo subindo), erro (duas notas graves) e fim da rodada (pequena fanfarra). O visitante pode desligar na linha "Sons da interface" do painel de configurações; a preferência fica salva (`porpones-sound`). Os sons só começam depois do primeiro clique, como os navegadores exigem. Volumes e frequências ficam na seção "SONS DA INTERFACE" de `main.js`.

## Animações

- Entrada suave do conteúdo a cada troca de página e saída ao clicar em um link interno (200 ms).
- Blocos (cards, cabeçalhos de seção, avisos, CTAs) aparecem ao entrar na tela, em cascata, via `IntersectionObserver`.
- Menu lateral deslizante com fundo escurecido e itens em cascata; submenus abrem com altura animada; dropdowns do desktop com fade.
- Só `opacity` e `transform` são animados (baratos para o navegador). Quem tem "reduzir movimento" ativado no sistema não vê animações nem o atraso na troca de página.
- Na troca de tema, navegadores com View Transitions API mostram o novo tema se expandindo a partir do interruptor; os demais fazem uma transição de cores simples.
- No quiz: a alternativa certa dá um "pulinho", a errada treme, e um carimbo ○ ou ✕ entra girando sobre a ilustração. O placar da tela final aparece crescendo.
- O carrossel de depoimentos usa rolagem com `scroll-snap`; com "reduzir movimento" ativado ele salta direto para o card, sem deslizar.

## Menu lateral (mobile e tablet)

Abaixo de 1100px o menu é um painel que desliza da direita, com botão de fechar, fundo escurecido (fecha ao tocar fora ou com Esc), foco preso dentro do painel enquanto aberto e o submenu da página atual já aberto. O painel é `position: fixed` dentro do header; por isso o desfoque do header fica em um pseudo-elemento (`.site-header::before`), pois `backdrop-filter` aplicado direto no header prenderia o painel dentro da barra.

## Personalização visual

Cores, fontes e espaçamentos estão em variáveis no início de `assets/css/style.css`:

```css
:root {
  --color-accent: #b23a2e;   /* vermelho torii. Alternativa índigo: #2e4057 */
  --font-heading: "Shippori Mincho", ...;
  --font-body: "Noto Sans JP", ...;
}
```

As fontes vêm do Google Fonts (única dependência externa). Sem internet, o site usa as fontes de fallback do sistema.

## Redes sociais

Os links de YouTube, Facebook e Instagram estão no rodapé de cada página (bloco `.social`). Para alterar, faça um buscar-e-substituir da URL em todos os `.html`.
