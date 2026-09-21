# PORPONÊS: site estático

Site institucional do PORPONÊS (curso de língua japonesa online), em **HTML + CSS + JavaScript puro**, sem build step.
Abra `index.html` direto no navegador (duplo clique) ou publique a pasta inteira em qualquer hosting estático (Netlify, GitHub Pages, Vercel, hospedagem compartilhada etc.).

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
depoimentos.html              Depoimentos
assets/css/style.css          Folha de estilos única (variáveis em :root, tema escuro, animações)
assets/js/main.js             WhatsApp, painel de configurações (idioma, tema, sons), menu lateral, transições
assets/js/translations.js     Traduções (inglês e japonês)
assets/img/                   Logo, favicon e imagens
assets/img/illus/             Ilustrações (irasutoya.com), uma por bloco do site
```

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

Resumo de onde há placeholders:

| Página | Quantidade | Proporção |
|---|---|---|
| `index.html` | 3 avatares | 1:1 |
| `viagem-tokyo.html`, `viagem-osaka.html`, `viagem-outras-cidades.html` | 10 cada | 4:3 |
| `viagem-experiencias.html` | 11 | 4:3 |
| `escola-de-idioma.html` | 2 (campus / estudantes) | 3:4 |
| `depoimentos.html` | 6 avatares | 1:1 |

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

Os depoimentos em `depoimentos.html` (e os 3 primeiros repetidos em `index.html`) são **exemplos fictícios**, marcados no código com um comentário:

```html
<!-- ATENÇÃO: os depoimentos abaixo são PLACEHOLDERS de exemplo ... -->
```

Para cada depoimento real, edite o card `.testimonial` (texto, nome, curso), **remova** o selo visual `<span class="badge badge--dev">exemplo</span>` e adicione a tradução do novo texto em `translations.js` (veja abaixo).

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

Sons curtos e discretos, sintetizados com a Web Audio API (não há arquivos de áudio): clique em botões e links, troca de página, abrir/fechar o menu lateral, troca de tema e de idioma. O visitante pode desligar na linha "Sons da interface" do painel de configurações; a preferência fica salva (`porpones-sound`). Os sons só começam depois do primeiro clique, como os navegadores exigem. Volumes e frequências ficam na seção "SONS DA INTERFACE" de `main.js`.

## Animações

- Entrada suave do conteúdo a cada troca de página e saída ao clicar em um link interno (200 ms).
- Blocos (cards, cabeçalhos de seção, avisos, CTAs) aparecem ao entrar na tela, em cascata, via `IntersectionObserver`.
- Menu lateral deslizante com fundo escurecido e itens em cascata; submenus abrem com altura animada; dropdowns do desktop com fade.
- Só `opacity` e `transform` são animados (baratos para o navegador). Quem tem "reduzir movimento" ativado no sistema não vê animações nem o atraso na troca de página.
- Na troca de tema, navegadores com View Transitions API mostram o novo tema se expandindo a partir do interruptor; os demais fazem uma transição de cores simples.

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
