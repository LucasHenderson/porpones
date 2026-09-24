/* ==========================================================================
   PORPONÊS: perguntas do quiz (quiz.html)
   --------------------------------------------------------------------------
   São 45 perguntas: 15 em cada nível ("facil", "medio", "dificil").
   A cada rodada o quiz sorteia 3 perguntas do nível escolhido.

   COMO EDITAR UMA PERGUNTA
   ------------------------
   Cada item tem este formato:

     {
       img: "",                       // caminho da ilustração (veja abaixo)
       alt: "",                       // texto alternativo da imagem (opcional)
       hint: "descrição da cena",     // a CENA do prompt (veja abaixo)
       correct: 1,                    // índice da resposta certa (0, 1, 2 ou 3)
       pt: { q: "pergunta", a: ["A", "B", "C", "D"], why: "explicação" },
       en: { ... },                   // mesmo conteúdo em inglês
       ja: { ... }                    // mesmo conteúdo em japonês
     }

   - `correct` conta a partir de ZERO: 0 = primeira alternativa, 3 = última.
   - As 4 alternativas precisam estar na MESMA ORDEM nos três idiomas
     (o quiz embaralha a ordem sozinho na hora de exibir).
   - Para acrescentar uma pergunta, copie um item inteiro e edite o conteúdo.
     Se um nível ficar com mais ou menos de 15 perguntas, tudo continua
     funcionando: o quiz sorteia 3 entre as que existirem.

   COMO COLOCAR AS ILUSTRAÇÕES
   ---------------------------
   Enquanto `img` estiver vazio (""), a pergunta mostra um molde tracejado
   com o texto de `hint`, que descreve a cena da ilustração.

   O `hint` é a CENA pronta para o prompt: copie o texto e cole no lugar
   de {{CENA}} no template de geração de imagens (está no README, seção
   "5. Quiz"). Não precisa reescrever nada.

   As cenas foram escritas de propósito SEM texto (nada de letras, kana ou
   kanji dentro da figura): modelos de imagem erram kana com frequência e,
   como o site troca de idioma, um texto embutido na figura ficaria errado
   em inglês e japonês. As cenas também evitam entregar a resposta da
   pergunta — por isso algumas são deliberadamente neutras.

   Para colocar a imagem:
     1. gere ou desenhe a ilustração a partir da cena do `hint`;
     2. salve em `assets/img/quiz/` (ex.: `assets/img/quiz/f01-ohayou.png`)
        em 600×450px (4:3), PNG de fundo transparente;
        o quadro na tela tem no máximo 300×225px, então 600×450 cobre
        telas retina. A imagem nunca é esticada: como o CSS usa
        `object-fit: contain`, uma figura de outra proporção só fica
        centralizada dentro do quadro 4:3, com sobra nas laterais;
     3. preencha `img: "assets/img/quiz/f01-ohayou.png"` e, se quiser,
        `alt` com uma descrição curta para leitores de tela.

   O fundo transparente importa: atrás da figura há um círculo que muda de
   cor no tema escuro, então uma imagem com fundo branco sólido apareceria
   como um retângulo por cima dele.
   ========================================================================== */
window.PORPONES_QUIZ = {

  /* ------------------------------------------------------------------------
     NÍVEL FÁCIL: primeiras palavras, escrita e cultura geral
     ------------------------------------------------------------------------ */
  facil: [
    {
      img: "assets/img/quiz/img-quiz-facil-1.webp",
      alt: "",
      hint: "Pessoa adulta em pé, acenando com uma das mãos erguida em gesto de cumprimento, com um pequeno sol nascente estilizado ao lado",
      correct: 1,
      pt: {
        q: "Como se diz \"bom dia\" em japonês, pela manhã?",
        a: ["こんにちは (konnichiwa)", "おはようございます (ohayou gozaimasu)", "こんばんは (konbanwa)", "おやすみなさい (oyasumi nasai)"],
        why: "おはようございます é a saudação da manhã. こんにちは é usado durante o dia, こんばんは à noite e おやすみなさい ao ir dormir."
      },
      en: {
        q: "How do you say \"good morning\" in Japanese?",
        a: ["こんにちは (konnichiwa)", "おはようございます (ohayou gozaimasu)", "こんばんは (konbanwa)", "おやすみなさい (oyasumi nasai)"],
        why: "おはようございます is the morning greeting. こんにちは is used during the day, こんばんは in the evening and おやすみなさい when going to bed."
      },
      ja: {
        q: "朝のあいさつはどれでしょう？",
        a: ["こんにちは", "おはようございます", "こんばんは", "おやすみなさい"],
        why: "朝は「おはようございます」。「こんにちは」は昼、「こんばんは」は夜、「おやすみなさい」は寝る前のあいさつです。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-2.webp",
      alt: "",
      hint: "Criança sentada à mesa, escrevendo em um caderno aberto, segurando um lápis",
      correct: 0,
      pt: {
        q: "Qual destes caracteres é hiragana?",
        a: ["あ", "ア", "山", "A"],
        why: "あ é hiragana. ア é o mesmo som escrito em katakana, 山 é um kanji (montanha) e A é uma letra do alfabeto romano."
      },
      en: {
        q: "Which of these characters is hiragana?",
        a: ["あ", "ア", "山", "A"],
        why: "あ is hiragana. ア is the same sound written in katakana, 山 is a kanji (mountain) and A is a Roman letter."
      },
      ja: {
        q: "ひらがなはどれでしょう？",
        a: ["あ", "ア", "山", "A"],
        why: "「あ」がひらがなです。「ア」は同じ音のカタカナ、「山」は漢字、「A」はローマ字です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-3.webp",
      alt: "",
      hint: "Pessoa adulta fazendo uma reverência, tronco inclinado para a frente e mãos ao longo do corpo",
      correct: 2,
      pt: {
        q: "O que significa ありがとう (arigatou)?",
        a: ["Por favor", "Desculpe", "Obrigado", "Até logo"],
        why: "ありがとう é \"obrigado\". Para soar mais formal, acrescenta-se ございます: ありがとうございます."
      },
      en: {
        q: "What does ありがとう (arigatou) mean?",
        a: ["Please", "Sorry", "Thank you", "See you"],
        why: "ありがとう means \"thank you\". To sound more polite, add ございます: ありがとうございます."
      },
      ja: {
        q: "「ありがとう」の意味はどれでしょう？",
        a: ["お願いします", "ごめんなさい", "感謝の言葉", "またね"],
        why: "「ありがとう」は感謝を表す言葉です。より丁寧にすると「ありがとうございます」になります。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-4.webp",
      alt: "",
      hint: "Mapa simplificado do arquipélago japonês, visto de frente, com um marcador de localização em destaque",
      correct: 2,
      pt: {
        q: "Qual é a capital do Japão?",
        a: ["Quioto", "Osaka", "Tóquio", "Nagoia"],
        why: "Tóquio é a capital desde 1868, quando o imperador se mudou de Quioto. O nome 東京 quer dizer, literalmente, \"capital do leste\"."
      },
      en: {
        q: "What is the capital of Japan?",
        a: ["Kyoto", "Osaka", "Tokyo", "Nagoya"],
        why: "Tokyo has been the capital since 1868, when the emperor moved from Kyoto. The name 東京 literally means \"eastern capital\"."
      },
      ja: {
        q: "日本の首都はどこでしょう？",
        a: ["京都", "大阪", "東京", "名古屋"],
        why: "1868年に天皇が京都から移って以来、東京が首都です。「東京」は文字どおり「東の都」という意味です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-5.webp",
      alt: "",
      hint: "Algumas moedas empilhadas ao lado de duas cédulas dobradas",
      correct: 2,
      pt: {
        q: "Qual é a moeda usada no Japão?",
        a: ["Won", "Yuan", "Iene", "Baht"],
        why: "A moeda japonesa é o iene (円, \"en\"). Won é da Coreia do Sul, yuan da China e baht da Tailândia."
      },
      en: {
        q: "Which currency is used in Japan?",
        a: ["Won", "Yuan", "Yen", "Baht"],
        why: "Japan's currency is the yen (円, \"en\"). The won is South Korean, the yuan Chinese and the baht Thai."
      },
      ja: {
        q: "日本で使われている通貨はどれでしょう？",
        a: ["ウォン", "元（ユアン）", "円", "バーツ"],
        why: "日本の通貨は「円」です。ウォンは韓国、元は中国、バーツはタイの通貨です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-6.webp",
      alt: "",
      hint: "Pessoa turista com uma câmera fotográfica pendurada no pescoço, em pé, olhando para cima com expressão curiosa",
      correct: 1,
      pt: {
        q: "O que é um torii (鳥居)?",
        a: ["Um tipo de macarrão", "O portal na entrada de um santuário xintoísta", "Uma espada tradicional", "Um festival de verão"],
        why: "O torii marca a entrada do santuário: da porta para dentro começa o espaço sagrado. Em geral é vermelho-alaranjado e fica na entrada de um jinja."
      },
      en: {
        q: "What is a torii (鳥居)?",
        a: ["A kind of noodle", "The gate at the entrance of a Shinto shrine", "A traditional sword", "A summer festival"],
        why: "A torii marks the shrine entrance: beyond it begins sacred ground. It is usually vermilion and stands at the entrance of a jinja."
      },
      ja: {
        q: "「鳥居」とは何でしょう？",
        a: ["麺の一種", "神社の入り口にある門", "伝統的な刀", "夏のお祭り"],
        why: "鳥居は神社の入り口を示すもので、そこから先が神聖な場所になります。多くは朱色に塗られています。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-7.webp",
      alt: "",
      hint: "Pessoa com mochila e bastão de caminhada, em pé, olhando para cima com a mão sobre os olhos",
      correct: 0,
      pt: {
        q: "Qual é a montanha mais alta do Japão?",
        a: ["Monte Fuji", "Monte Aso", "Monte Asama", "Monte Hakone"],
        why: "O Monte Fuji (富士山) tem 3.776 metros e é um vulcão ativo. É visível de Tóquio em dias claros de inverno."
      },
      en: {
        q: "Which is the highest mountain in Japan?",
        a: ["Mount Fuji", "Mount Aso", "Mount Asama", "Mount Hakone"],
        why: "Mount Fuji (富士山) is 3,776 metres high and is an active volcano. On clear winter days it can be seen from Tokyo."
      },
      ja: {
        q: "日本で一番高い山はどれでしょう？",
        a: ["富士山", "阿蘇山", "浅間山", "箱根山"],
        why: "富士山は標高3,776メートルの活火山です。冬の晴れた日には東京からも見えます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-8.webp",
      alt: "",
      hint: "Pessoa adulta assentindo com a cabeça, olhos fechados, em gesto de concordância",
      correct: 0,
      pt: {
        q: "Como se diz \"sim\" em japonês?",
        a: ["はい (hai)", "いいえ (iie)", "すみません (sumimasen)", "どうぞ (douzo)"],
        why: "はい é \"sim\" e いいえ é \"não\". すみません serve para pedir desculpa ou licença, e どうぞ é \"por favor, fique à vontade\"."
      },
      en: {
        q: "How do you say \"yes\" in Japanese?",
        a: ["はい (hai)", "いいえ (iie)", "すみません (sumimasen)", "どうぞ (douzo)"],
        why: "はい is \"yes\" and いいえ is \"no\". すみません means \"excuse me / sorry\" and どうぞ is \"go ahead, please\"."
      },
      ja: {
        q: "「はい」と同じ意味で使うのはどれでしょう？",
        a: ["はい", "いいえ", "すみません", "どうぞ"],
        why: "「はい」が肯定、「いいえ」が否定です。「すみません」は謝るときや呼びかけ、「どうぞ」は相手に勧めるときに使います。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-9.webp",
      alt: "",
      hint: "Pequeno buquê de flores simples amarrado com uma fita",
      correct: 1,
      pt: {
        q: "Qual flor é o símbolo da primavera japonesa?",
        a: ["Crisântemo", "Flor de cerejeira (sakura)", "Lótus", "Glicínia"],
        why: "A sakura floresce por cerca de uma semana entre março e abril, e as famílias se reúnem sob as árvores no hanami. O crisântemo é o símbolo da família imperial."
      },
      en: {
        q: "Which flower is the symbol of spring in Japan?",
        a: ["Chrysanthemum", "Cherry blossom (sakura)", "Lotus", "Wisteria"],
        why: "Sakura blooms for about a week between March and April, and families gather under the trees for hanami. The chrysanthemum is the symbol of the imperial family."
      },
      ja: {
        q: "日本の春を象徴する花はどれでしょう？",
        a: ["菊", "桜", "蓮", "藤"],
        why: "桜は3月から4月にかけて1週間ほど咲き、木の下でお花見をします。菊は皇室の象徴です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-10.webp",
      alt: "",
      hint: "Mesa de estudo vista de cima, com cadernos abertos, lápis e uma borracha",
      correct: 2,
      pt: {
        q: "Quantos sistemas de escrita o japonês usa no dia a dia?",
        a: ["Um", "Dois", "Três", "Quatro"],
        why: "São três, usados juntos na mesma frase: hiragana, katakana e kanji. O alfabeto romano (rōmaji) aparece em siglas e marcas."
      },
      en: {
        q: "How many writing systems does Japanese use every day?",
        a: ["One", "Two", "Three", "Four"],
        why: "Three, used together in the same sentence: hiragana, katakana and kanji. The Roman alphabet (rōmaji) shows up in acronyms and brand names."
      },
      ja: {
        q: "日本語で日常的に使われる文字の種類はいくつでしょう？",
        a: ["1つ", "2つ", "3つ", "4つ"],
        why: "ひらがな・カタカナ・漢字の3種類を1つの文の中で使い分けます。ローマ字は略語や商品名などに使われます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-11.webp",
      alt: "",
      hint: "Duas pessoas adultas em pé, frente a frente, no vão de uma porta aberta",
      correct: 1,
      pt: {
        q: "O que significa さようなら (sayounara)?",
        a: ["Bom apetite", "Adeus", "Bem-vindo", "Com licença"],
        why: "さようなら é uma despedida mais definitiva. No dia a dia, entre amigos, usa-se mais じゃあね ou またね (\"até mais\")."
      },
      en: {
        q: "What does さようなら (sayounara) mean?",
        a: ["Enjoy your meal", "Goodbye", "Welcome", "Excuse me"],
        why: "さようなら is a fairly final goodbye. Day to day, friends say じゃあね or またね (\"see you\") instead."
      },
      ja: {
        q: "「さようなら」はどんな場面で使う言葉でしょう？",
        a: ["食事の前", "別れるとき", "人を迎えるとき", "声をかけるとき"],
        why: "「さようなら」は別れのあいさつで、しばらく会わないときに使います。親しい人には「じゃあね」「またね」が自然です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-12.webp",
      alt: "",
      hint: "Bandeja com uma pequena garrafa e um copinho de um lado, e um bule com uma xícara do outro",
      correct: 1,
      pt: {
        q: "Qual bebida tradicional japonesa é feita de arroz fermentado?",
        a: ["Matchá", "Saquê (nihonshu)", "Ramune", "Mugichá"],
        why: "O saquê, chamado 日本酒 (nihonshu) no Japão, é feito de arroz fermentado. Matchá e mugichá são chás, e ramune é um refrigerante."
      },
      en: {
        q: "Which traditional Japanese drink is made from fermented rice?",
        a: ["Matcha", "Sake (nihonshu)", "Ramune", "Mugicha"],
        why: "Sake, called 日本酒 (nihonshu) in Japan, is made from fermented rice. Matcha and mugicha are teas, and ramune is a soft drink."
      },
      ja: {
        q: "米を発酵させて造る日本の伝統的なお酒はどれでしょう？",
        a: ["抹茶", "日本酒", "ラムネ", "麦茶"],
        why: "日本酒は米を発酵させて造ります。抹茶と麦茶はお茶、ラムネは炭酸飲料です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-13.webp",
      alt: "",
      hint: "Par de hashi apoiado sobre um descanso de hashi, ao lado de um prato redondo vazio",
      correct: 1,
      pt: {
        q: "Como se chama o prato de fatias de peixe cru servido sem arroz?",
        a: ["Sushi", "Sashimi", "Tempurá", "Yakitori"],
        why: "Sashimi é o peixe cru fatiado, servido sozinho. Sushi leva arroz temperado com vinagre; tempurá é empanado e frito; yakitori é espetinho de frango."
      },
      en: {
        q: "What is the dish of sliced raw fish served without rice called?",
        a: ["Sushi", "Sashimi", "Tempura", "Yakitori"],
        why: "Sashimi is sliced raw fish served on its own. Sushi includes vinegared rice; tempura is battered and fried; yakitori is grilled chicken skewers."
      },
      ja: {
        q: "ご飯をつけず、生の魚を切って出す料理はどれでしょう？",
        a: ["寿司", "刺身", "天ぷら", "焼き鳥"],
        why: "刺身は生の魚を切ってそのまま出す料理です。寿司は酢飯を使い、天ぷらは衣をつけて揚げ、焼き鳥は鶏肉の串焼きです。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-14.webp",
      alt: "",
      hint: "Trem de alta velocidade de nariz alongado, visto de perfil",
      correct: 0,
      pt: {
        q: "Qual é o nome do trem-bala japonês?",
        a: ["Shinkansen", "Shinjuku", "Shamisen", "Shintō"],
        why: "Shinkansen (新幹線) é o trem-bala. Shinjuku é um bairro de Tóquio, shamisen é um instrumento de três cordas e xintoísmo é a religião tradicional japonesa."
      },
      en: {
        q: "What is the Japanese bullet train called?",
        a: ["Shinkansen", "Shinjuku", "Shamisen", "Shinto"],
        why: "Shinkansen (新幹線) is the bullet train. Shinjuku is a Tokyo district, the shamisen is a three-stringed instrument and Shinto is Japan's traditional religion."
      },
      ja: {
        q: "日本の高速鉄道の名前はどれでしょう？",
        a: ["新幹線", "新宿", "三味線", "神道"],
        why: "新幹線が高速鉄道です。新宿は東京の街、三味線は弦楽器、神道は日本の伝統的な宗教です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-facil-15.webp",
      alt: "",
      hint: "Manchas de pegada de um animal",
      correct: 1,
      pt: {
        q: "O que significa 猫 (neko)?",
        a: ["Cachorro", "Gato", "Pássaro", "Peixe"],
        why: "猫 (neko) é \"gato\". Cachorro é 犬 (inu), pássaro é 鳥 (tori) e peixe é 魚 (sakana)."
      },
      en: {
        q: "What does 猫 (neko) mean?",
        a: ["Dog", "Cat", "Bird", "Fish"],
        why: "猫 (neko) is \"cat\". Dog is 犬 (inu), bird is 鳥 (tori) and fish is 魚 (sakana)."
      },
      ja: {
        q: "「猫」の読み方はどれでしょう？",
        a: ["いぬ", "ねこ", "とり", "さかな"],
        why: "「猫」は「ねこ」と読みます。「いぬ」は犬、「とり」は鳥、「さかな」は魚です。"
      }
    }
  ],

  /* ------------------------------------------------------------------------
     NÍVEL MÉDIO: gramática básica, costumes e vida cotidiana
     ------------------------------------------------------------------------ */
  medio: [
    {
      img: "assets/img/quiz/img-quiz-medio-1.webp",
      alt: "",
      hint: "Xícara de café sobre um pires, com vapor subindo",
      correct: 1,
      pt: {
        q: "O katakana é usado principalmente para escrever o quê?",
        a: ["Verbos e adjetivos", "Palavras de origem estrangeira e onomatopeias", "Nomes de cidades japonesas", "Números"],
        why: "O katakana é usado em palavras vindas de outras línguas (コーヒー, kōhī, café), onomatopeias e nomes científicos. A base das palavras japonesas é escrita em kanji e hiragana."
      },
      en: {
        q: "What is katakana mainly used to write?",
        a: ["Verbs and adjectives", "Foreign loanwords and onomatopoeia", "Names of Japanese cities", "Numbers"],
        why: "Katakana is used for words borrowed from other languages (コーヒー, kōhī, coffee), onomatopoeia and scientific names. Native Japanese words use kanji and hiragana."
      },
      ja: {
        q: "カタカナは主に何を書くときに使うでしょう？",
        a: ["動詞や形容詞", "外来語や擬音語", "日本の都市名", "数字"],
        why: "カタカナは外来語（コーヒーなど）、擬音語、学術用語などに使います。和語は漢字とひらがなで書きます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-2.webp",
      alt: "",
      hint: "Pessoa adulta sentada à mesa diante de um caderno aberto, caneta na mão e a outra mão no queixo, pensativa",
      correct: 1,
      pt: {
        q: "Qual partícula marca o objeto direto da frase?",
        a: ["は (wa)", "を (wo)", "に (ni)", "と (to)"],
        why: "を marca o objeto direto: パンを食べます (\"como pão\"). は marca o tópico, に indica destino ou hora e と significa \"e / com\"."
      },
      en: {
        q: "Which particle marks the direct object of a sentence?",
        a: ["は (wa)", "を (wo)", "に (ni)", "と (to)"],
        why: "を marks the direct object: パンを食べます (\"I eat bread\"). は marks the topic, に indicates destination or time, and と means \"and / with\"."
      },
      ja: {
        q: "目的語を示す助詞はどれでしょう？",
        a: ["は", "を", "に", "と"],
        why: "「を」が目的語を示します（パンを食べます）。「は」は主題、「に」は場所や時間、「と」は「〜と」という並列や同伴を表します。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-3.webp",
      alt: "",
      hint: "Pessoa sentada à mesa com as palmas das mãos unidas à frente do peito, diante de uma tigela de arroz e um par de hashi",
      correct: 1,
      pt: {
        q: "O que se diz em japonês ANTES de começar a comer?",
        a: ["ごちそうさまでした", "いただきます", "おつかれさま", "いらっしゃいませ"],
        why: "いただきます é dito antes de comer, como agradecimento pela comida. ごちそうさまでした é dito ao terminar."
      },
      en: {
        q: "What do you say in Japanese BEFORE starting to eat?",
        a: ["ごちそうさまでした", "いただきます", "おつかれさま", "いらっしゃいませ"],
        why: "いただきます is said before eating, as thanks for the food. ごちそうさまでした is said when you finish."
      },
      ja: {
        q: "食事を始める前に言うのはどれでしょう？",
        a: ["ごちそうさまでした", "いただきます", "おつかれさま", "いらっしゃいませ"],
        why: "食べる前は「いただきます」、食べ終わったら「ごちそうさまでした」と言います。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-4.webp",
      alt: "",
      hint: "Pessoa sentada em uma carteira escolar, preenchendo uma folha de prova com um lápis",
      correct: 2,
      pt: {
        q: "Quantos níveis tem o JLPT, o exame de proficiência em japonês?",
        a: ["Três", "Quatro", "Cinco", "Seis"],
        why: "São cinco níveis, de N5 (o mais fácil) a N1 (o mais difícil). A prova acontece duas vezes por ano, em julho e dezembro."
      },
      en: {
        q: "How many levels does the JLPT, the Japanese proficiency exam, have?",
        a: ["Three", "Four", "Five", "Six"],
        why: "Five levels, from N5 (easiest) to N1 (hardest). The test is held twice a year, in July and December."
      },
      ja: {
        q: "日本語能力試験（JLPT）のレベルはいくつあるでしょう？",
        a: ["3つ", "4つ", "5つ", "6つ"],
        why: "N5（やさしい）からN1（難しい）まで5段階あります。試験は7月と12月の年2回です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-5.webp",
      alt: "",
      hint: "Cesta de vime com uma toalha dobrada dentro e um pequeno balde de madeira ao lado",
      correct: 1,
      pt: {
        q: "O que é um onsen (温泉)?",
        a: ["Uma pousada tradicional", "Uma fonte de águas termais", "Um banho público de água comum", "Um templo budista"],
        why: "Onsen é a fonte termal, de água aquecida naturalmente pela atividade vulcânica. A pousada tradicional é o ryokan e o banho público de água comum é o sentō."
      },
      en: {
        q: "What is an onsen (温泉)?",
        a: ["A traditional inn", "A hot spring", "A public bath with ordinary water", "A Buddhist temple"],
        why: "An onsen is a hot spring, naturally heated by volcanic activity. The traditional inn is a ryokan and a public bath with ordinary water is a sentō."
      },
      ja: {
        q: "「温泉」とは何でしょう？",
        a: ["伝統的な宿", "地熱で温まった湧き水の風呂", "水道水を沸かした公衆浴場", "仏教の寺"],
        why: "温泉は火山活動で自然に温まった湧き水です。伝統的な宿は旅館、水道水を沸かす公衆浴場は銭湯といいます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-6.webp",
      alt: "",
      hint: "Três blocos retangulares de cores diferentes, alinhados lado a lado sobre uma superfície",
      correct: 1,
      pt: {
        q: "Qual é a ordem básica das palavras em uma frase japonesa?",
        a: ["Sujeito – Verbo – Objeto", "Sujeito – Objeto – Verbo", "Verbo – Sujeito – Objeto", "Objeto – Sujeito – Verbo"],
        why: "O verbo fica sempre no fim: 私はりんごを食べます é, literalmente, \"eu maçã como\". Em português a ordem é sujeito – verbo – objeto."
      },
      en: {
        q: "What is the basic word order of a Japanese sentence?",
        a: ["Subject – Verb – Object", "Subject – Object – Verb", "Verb – Subject – Object", "Object – Subject – Verb"],
        why: "The verb always comes last: 私はりんごを食べます is literally \"I apple eat\". English uses subject – verb – object."
      },
      ja: {
        q: "日本語の基本的な語順はどれでしょう？",
        a: ["主語 – 動詞 – 目的語", "主語 – 目的語 – 動詞", "動詞 – 主語 – 目的語", "目的語 – 主語 – 動詞"],
        why: "日本語は動詞が最後に来ます（私はりんごを食べます）。英語やポルトガル語は「主語 – 動詞 – 目的語」の順です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-7.webp",
      alt: "",
      hint: "Grupo de pessoas sentadas em círculo sobre uma toalha estendida no chão, conversando",
      correct: 1,
      pt: {
        q: "O que é o hanami (花見)?",
        a: ["Um festival de fogos de artifício", "Contemplar as flores de cerejeira", "A cerimônia do chá", "Uma dança de verão"],
        why: "Hanami quer dizer \"ver flores\": entre março e abril, famílias e colegas de trabalho fazem piquenique sob as cerejeiras. O festival de fogos é o hanabi taikai."
      },
      en: {
        q: "What is hanami (花見)?",
        a: ["A fireworks festival", "Viewing the cherry blossoms", "The tea ceremony", "A summer dance"],
        why: "Hanami means \"flower viewing\": between March and April, families and co-workers picnic under the cherry trees. The fireworks festival is hanabi taikai."
      },
      ja: {
        q: "「花見」とはどんな行事でしょう？",
        a: ["花火大会", "桜の花を見ながら楽しむこと", "茶道の儀式", "夏の踊り"],
        why: "花見は桜を見ながら楽しむ行事で、3月から4月にかけて家族や同僚と桜の下で過ごします。花火の行事は花火大会です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-8.webp",
      alt: "",
      hint: "Duas pessoas de terno, frente a frente, cada uma entregando um pequeno cartão à outra com as duas mãos",
      correct: 1,
      pt: {
        q: "O que indica o sufixo -san, como em \"Tanaka-san\"?",
        a: ["Que a pessoa é criança", "Tratamento respeitoso, como sr. ou sra.", "Que a pessoa é professora", "Que é um amigo próximo"],
        why: "-san é o tratamento neutro e respeitoso, usado com quase todo mundo. -chan é carinhoso, -kun é usado com jovens e -sensei com professores e médicos."
      },
      en: {
        q: "What does the suffix -san indicate, as in \"Tanaka-san\"?",
        a: ["That the person is a child", "A respectful title, like Mr. or Ms.", "That the person is a teacher", "That they are a close friend"],
        why: "-san is the neutral, respectful title used with almost everyone. -chan is affectionate, -kun is used with younger people and -sensei with teachers and doctors."
      },
      ja: {
        q: "「田中さん」の「さん」は何を表すでしょう？",
        a: ["子どもであること", "敬意を表す一般的な呼び方", "先生であること", "親しい友人であること"],
        why: "「さん」は誰にでも使える敬称です。「ちゃん」は親しみ、「くん」は年下や同輩、「先生」は教師や医師に使います。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-9.webp",
      alt: "",
      hint: "Barraca de comida de rua com toldo, vista de frente, com uma chapa quente e utensílios sobre o balcão",
      correct: 1,
      pt: {
        q: "Qual cidade é conhecida como \"a cozinha do Japão\" (天下の台所)?",
        a: ["Quioto", "Osaka", "Sapporo", "Fukuoka"],
        why: "Osaka ganhou o apelido no período Edo, quando era o centro do comércio de arroz. É a terra do takoyaki e do okonomiyaki."
      },
      en: {
        q: "Which city is known as \"the nation's kitchen\" (天下の台所)?",
        a: ["Kyoto", "Osaka", "Sapporo", "Fukuoka"],
        why: "Osaka earned the nickname in the Edo period, when it was the centre of the rice trade. It is the home of takoyaki and okonomiyaki."
      },
      ja: {
        q: "「天下の台所」と呼ばれる街はどこでしょう？",
        a: ["京都", "大阪", "札幌", "福岡"],
        why: "江戸時代に米の流通の中心だった大阪の呼び名です。たこ焼きやお好み焼きで知られています。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-10.webp",
      alt: "",
      hint: "Pessoa adulta em pé, falando ao telefone celular, com a mão livre gesticulando",
      correct: 1,
      pt: {
        q: "O que quer dizer お元気ですか (o-genki desu ka)?",
        a: ["Quantos anos você tem?", "Como você está?", "De onde você é?", "Qual é o seu nome?"],
        why: "É a pergunta sobre como a pessoa está. Uma resposta comum é はい、元気です (\"sim, estou bem\"). Entre quem se vê todo dia, ela soa estranha: usa-se só com quem não se encontra há um tempo."
      },
      en: {
        q: "What does お元気ですか (o-genki desu ka) mean?",
        a: ["How old are you?", "How are you?", "Where are you from?", "What is your name?"],
        why: "It asks how someone is doing. A common answer is はい、元気です (\"yes, I'm well\"). It sounds odd with people you see daily: it is for someone you haven't met in a while."
      },
      ja: {
        q: "「お元気ですか」はどんな意味でしょう？",
        a: ["何歳ですか", "調子はどうですか", "どこの出身ですか", "お名前は何ですか"],
        why: "相手の様子をたずねる表現で、「はい、元気です」と答えます。毎日会う相手には使わず、しばらく会っていない人に使います。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-11.webp",
      alt: "",
      hint: "Leque redondo de cabo curto e um sino de vento pendurado, lado a lado",
      correct: 1,
      pt: {
        q: "O que é um yukata (浴衣)?",
        a: ["A faixa que prende o quimono", "Um quimono leve de algodão, usado no verão", "Uma sandália de madeira", "Um casaco de inverno"],
        why: "O yukata é o quimono leve de algodão, sem forro, usado em festivais de verão e em pousadas. A faixa é o obi e a sandália de madeira é o geta."
      },
      en: {
        q: "What is a yukata (浴衣)?",
        a: ["The sash that holds the kimono", "A light cotton kimono worn in summer", "A wooden sandal", "A winter coat"],
        why: "A yukata is the light, unlined cotton kimono worn at summer festivals and in inns. The sash is the obi and the wooden sandal is the geta."
      },
      ja: {
        q: "「浴衣」とはどんなものでしょう？",
        a: ["着物を留める帯", "夏に着る木綿の薄い着物", "木でできた履物", "冬用の上着"],
        why: "浴衣は裏地のない木綿の着物で、夏祭りや旅館で着ます。帯は着物を留めるもの、下駄は木の履物です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-12.webp",
      alt: "",
      hint: "Mesa de restaurante vista de cima, com vários pratos pequenos e copos dispostos ao redor",
      correct: 1,
      pt: {
        q: "Em que momento se diz 乾杯 (kanpai)?",
        a: ["Ao começar a comer", "Ao erguer o copo em um brinde", "Ao entrar na casa de alguém", "Ao se despedir"],
        why: "乾杯 significa, literalmente, \"copo seco\", e é dito ao brindar. No Japão, espera-se o brinde para começar a beber."
      },
      en: {
        q: "When do you say 乾杯 (kanpai)?",
        a: ["When you start eating", "When raising your glass for a toast", "When entering someone's home", "When saying goodbye"],
        why: "乾杯 literally means \"dry cup\" and is said when toasting. In Japan everyone waits for the toast before drinking."
      },
      ja: {
        q: "「乾杯」と言うのはどんなときでしょう？",
        a: ["食べ始めるとき", "グラスを上げて祝うとき", "人の家に入るとき", "別れるとき"],
        why: "「乾杯」は文字どおり「杯を乾す」という意味で、飲み始める合図です。日本では乾杯を待ってから飲みます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-13.webp",
      alt: "",
      hint: "Pilha de folhas de papel soltas, levemente desalinhadas",
      correct: 1,
      pt: {
        q: "Qual contador se usa para objetos finos e planos, como folhas de papel?",
        a: ["本 (hon)", "枚 (mai)", "匹 (hiki)", "冊 (satsu)"],
        why: "枚 conta coisas finas e planas: papéis, camisetas, pratos. 本 conta objetos longos e cilíndricos, 匹 conta animais pequenos e 冊 conta livros."
      },
      en: {
        q: "Which counter is used for thin, flat objects such as sheets of paper?",
        a: ["本 (hon)", "枚 (mai)", "匹 (hiki)", "冊 (satsu)"],
        why: "枚 counts thin flat things: paper, T-shirts, plates. 本 counts long cylindrical objects, 匹 counts small animals and 冊 counts books."
      },
      ja: {
        q: "紙のように薄くて平たいものを数える助数詞はどれでしょう？",
        a: ["本", "枚", "匹", "冊"],
        why: "「枚」は紙・シャツ・皿など薄くて平たいものに使います。「本」は細長いもの、「匹」は小さな動物、「冊」は本を数えます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-14.webp",
      alt: "",
      hint: "Família com malas de viagem, em pé lado a lado, vista de frente",
      correct: 0,
      pt: {
        q: "O que é a Golden Week?",
        a: ["Uma sequência de feriados no fim de abril e começo de maio", "Um festival de inverno em Sapporo", "As férias escolares de verão", "Uma semana de promoções nas lojas"],
        why: "Quatro feriados caem em poucos dias, entre 29 de abril e 5 de maio, e muita gente tira a semana inteira. É o período mais movimentado para viajar no Japão."
      },
      en: {
        q: "What is Golden Week?",
        a: ["A run of public holidays in late April and early May", "A winter festival in Sapporo", "The summer school holidays", "A week of sales in the shops"],
        why: "Four public holidays fall within a few days, between 29 April and 5 May, and many people take the whole week off. It is the busiest travel period in Japan."
      },
      ja: {
        q: "「ゴールデンウィーク」とは何でしょう？",
        a: ["4月末から5月初めに祝日が続く期間", "札幌の冬の祭り", "夏休み", "お店のセール週間"],
        why: "4月29日から5月5日にかけて祝日が続き、多くの人が長い休みを取ります。日本で最も旅行が混み合う時期です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-medio-15.webp",
      alt: "",
      hint: "Atendente de avental atrás do balcão de uma loja, com a mão erguida em cumprimento, e um cliente entrando",
      correct: 1,
      pt: {
        q: "O que o atendente diz quando alguém entra em uma loja no Japão?",
        a: ["ごめんください", "いらっしゃいませ", "おかえりなさい", "いってらっしゃい"],
        why: "いらっしゃいませ é a saudação de boas-vindas em lojas e restaurantes, e não espera resposta. おかえりなさい é dito a quem chega em casa e いってらっしゃい a quem sai."
      },
      en: {
        q: "What do shop staff in Japan say when a customer walks in?",
        a: ["ごめんください", "いらっしゃいませ", "おかえりなさい", "いってらっしゃい"],
        why: "いらっしゃいませ is the welcome greeting in shops and restaurants, and no reply is expected. おかえりなさい greets someone coming home and いってらっしゃい sees them off."
      },
      ja: {
        q: "お店に客が入ってきたとき、店員が言うのはどれでしょう？",
        a: ["ごめんください", "いらっしゃいませ", "おかえりなさい", "いってらっしゃい"],
        why: "「いらっしゃいませ」は店や飲食店での歓迎のあいさつで、返事は必要ありません。「おかえりなさい」は帰宅した人に、「いってらっしゃい」は出かける人にかける言葉です。"
      }
    }
  ],

  /* ------------------------------------------------------------------------
     NÍVEL DIFÍCIL: kanji, keigo, história e detalhes da cultura
     ------------------------------------------------------------------------ */
  dificil: [
    {
      img: "assets/img/quiz/img-quiz-dificil-1.webp",
      alt: "",
      hint: "Pincel de caligrafia apoiado sobre um descanso, ao lado de uma pedra de tinta retangular",
      correct: 1,
      pt: {
        q: "Qual é a leitura kun'yomi (japonesa) do kanji 山?",
        a: ["さん (san)", "やま (yama)", "せん (sen)", "かわ (kawa)"],
        why: "やま é a leitura kun'yomi, de origem japonesa, usada quando o kanji aparece sozinho. さん é a leitura on'yomi, vinda do chinês, como em 富士山 (Fuji-san). かわ é a leitura de 川 (rio)."
      },
      en: {
        q: "What is the kun'yomi (native Japanese) reading of the kanji 山?",
        a: ["さん (san)", "やま (yama)", "せん (sen)", "かわ (kawa)"],
        why: "やま is the kun'yomi, the native reading used when the kanji stands alone. さん is the on'yomi, borrowed from Chinese, as in 富士山 (Fuji-san). かわ is the reading of 川 (river)."
      },
      ja: {
        q: "漢字「山」の訓読みはどれでしょう？",
        a: ["さん", "やま", "せん", "かわ"],
        why: "訓読みは「やま」で、漢字を単独で使うときの読み方です。「さん」は音読みで、富士山のように使います。「かわ」は「川」の読み方です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-2.webp",
      alt: "",
      hint: "Dicionário grosso aberto sobre uma mesa, visto de frente",
      correct: 1,
      pt: {
        q: "Quantos kanji fazem parte da lista jōyō, os de uso corrente definidos pelo governo japonês?",
        a: ["1.026", "2.136", "3.500", "5.000"],
        why: "São 2.136 kanji na lista jōyō desde a revisão de 2010. Os 1.026 kanji kyōiku, ensinados no ensino fundamental, são um subconjunto dela."
      },
      en: {
        q: "How many kanji are in the jōyō list, the everyday-use set defined by the Japanese government?",
        a: ["1,026", "2,136", "3,500", "5,000"],
        why: "There are 2,136 jōyō kanji since the 2010 revision. The 1,026 kyōiku kanji taught in primary school are a subset of that list."
      },
      ja: {
        q: "常用漢字は何字あるでしょう？",
        a: ["1,026字", "2,136字", "3,500字", "5,000字"],
        why: "2010年の改定以降、常用漢字は2,136字です。小学校で習う教育漢字1,026字はその一部です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-3.webp",
      alt: "",
      hint: "Pessoa de terno em pé, segurando com as duas mãos uma placa retangular lisa erguida à altura do peito",
      correct: 1,
      pt: {
        q: "Qual é o nome da era japonesa iniciada em 1º de maio de 2019?",
        a: ["Heisei (平成)", "Reiwa (令和)", "Shōwa (昭和)", "Taishō (大正)"],
        why: "Reiwa começou com a ascensão do imperador Naruhito. Heisei foi de 1989 a 2019, Shōwa de 1926 a 1989 e Taishō de 1912 a 1926."
      },
      en: {
        q: "What is the name of the Japanese era that began on 1 May 2019?",
        a: ["Heisei (平成)", "Reiwa (令和)", "Shōwa (昭和)", "Taishō (大正)"],
        why: "Reiwa began with the accession of Emperor Naruhito. Heisei ran from 1989 to 2019, Shōwa from 1926 to 1989 and Taishō from 1912 to 1926."
      },
      ja: {
        q: "2019年5月1日に始まった元号はどれでしょう？",
        a: ["平成", "令和", "昭和", "大正"],
        why: "令和は徳仁天皇の即位とともに始まりました。平成は1989年から2019年、昭和は1926年から1989年、大正は1912年から1926年です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-4.webp",
      alt: "",
      hint: "Pessoa sentada à mesa diante de um prato, com o hashi erguido, em pose de quem vai começar a comer",
      correct: 1,
      pt: {
        q: "Qual é a forma potencial (\"poder fazer\") do verbo 食べる (taberu, comer)?",
        a: ["食べたい (tabetai)", "食べられる (taberareru)", "食べさせる (tabesaseru)", "食べている (tabeteiru)"],
        why: "食べられる é a forma potencial, \"conseguir comer\". 食べたい é \"querer comer\", 食べさせる é a causativa (\"fazer comer\") e 食べている indica ação em curso."
      },
      en: {
        q: "What is the potential form (\"can do\") of the verb 食べる (taberu, to eat)?",
        a: ["食べたい (tabetai)", "食べられる (taberareru)", "食べさせる (tabesaseru)", "食べている (tabeteiru)"],
        why: "食べられる is the potential form, \"can eat\". 食べたい is \"want to eat\", 食べさせる is the causative (\"make someone eat\") and 食べている marks an ongoing action."
      },
      ja: {
        q: "動詞「食べる」の可能形はどれでしょう？",
        a: ["食べたい", "食べられる", "食べさせる", "食べている"],
        why: "可能形は「食べられる」です。「食べたい」は希望、「食べさせる」は使役、「食べている」は進行を表します。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-5.webp",
      alt: "",
      hint: "Trem de alta velocidade antigo, de nariz arredondado, visto de três quartos",
      correct: 1,
      pt: {
        q: "Em que ano o Shinkansen começou a operar?",
        a: ["1954", "1964", "1972", "1988"],
        why: "A linha Tōkaidō Shinkansen, entre Tóquio e Osaka, foi inaugurada em outubro de 1964, poucos dias antes das Olimpíadas de Tóquio."
      },
      en: {
        q: "In which year did the Shinkansen start running?",
        a: ["1954", "1964", "1972", "1988"],
        why: "The Tōkaidō Shinkansen, between Tokyo and Osaka, opened in October 1964, days before the Tokyo Olympics."
      },
      ja: {
        q: "新幹線が開業したのは何年でしょう？",
        a: ["1954年", "1964年", "1972年", "1988年"],
        why: "東京と大阪を結ぶ東海道新幹線は、東京オリンピック直前の1964年10月に開業しました。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-6.webp",
      alt: "",
      hint: "Duas pessoas de terno se despedindo na porta de um escritório, uma delas de casaco e com uma pasta na mão",
      correct: 0,
      pt: {
        q: "O que quer dizer お疲れ様です (otsukaresama desu)?",
        a: ["\"Obrigado pelo seu esforço\", usado entre colegas de trabalho", "\"Estou cansado, vou embora\"", "\"Desculpe o incômodo\"", "\"Muito prazer\""],
        why: "É o reconhecimento do esforço do outro, usado o tempo todo no ambiente de trabalho: ao cruzar com alguém, ao terminar uma reunião e ao sair do escritório."
      },
      en: {
        q: "What does お疲れ様です (otsukaresama desu) mean?",
        a: ["\"Thank you for your hard work\", said between colleagues", "\"I'm tired, I'm leaving\"", "\"Sorry to bother you\"", "\"Nice to meet you\""],
        why: "It acknowledges the other person's effort and is used constantly at work: passing someone in the corridor, ending a meeting, leaving the office."
      },
      ja: {
        q: "「お疲れ様です」はどんな意味でしょう？",
        a: ["相手の働きをねぎらう言葉", "「疲れたので帰ります」という意味", "「ご迷惑をおかけします」という意味", "初対面のあいさつ"],
        why: "相手の労をねぎらう言葉で、職場ですれ違うとき、会議の終わり、退社のときなど幅広く使います。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-7.webp",
      alt: "",
      hint: "Pessoa adulta caminhando de perfil, com uma das mãos segurando a alça de uma bolsa a tiracolo",
      correct: 1,
      pt: {
        q: "Qual é a forma て do verbo 行く (iku, ir)?",
        a: ["行いて (oite)", "行って (itte)", "行きて (ikite)", "行んで (inde)"],
        why: "行く é a exceção da regra: verbos terminados em く costumam fazer いて (書く → 書いて), mas 行く vira 行って."
      },
      en: {
        q: "What is the te-form of the verb 行く (iku, to go)?",
        a: ["行いて (oite)", "行って (itte)", "行きて (ikite)", "行んで (inde)"],
        why: "行く is the exception to the rule: verbs ending in く normally take いて (書く → 書いて), but 行く becomes 行って."
      },
      ja: {
        q: "動詞「行く」のて形はどれでしょう？",
        a: ["行いて", "行って", "行きて", "行んで"],
        why: "「行く」は例外です。「く」で終わる動詞は普通「いて」になりますが（書く→書いて）、「行く」は「行って」になります。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-8.webp",
      alt: "",
      hint: "Pessoa de terno em pé, falando ao telefone com o tronco levemente inclinado para a frente",
      correct: 1,
      pt: {
        q: "No keigo, qual é a forma humilde (kenjōgo) do verbo する (fazer)?",
        a: ["なさいます (nasaimasu)", "いたします (itashimasu)", "されます (saremasu)", "します (shimasu)"],
        why: "いたします rebaixa a própria ação, em respeito ao interlocutor. なさいます e されます são formas honoríficas, usadas para a ação da outra pessoa, e します é apenas a forma polida neutra."
      },
      en: {
        q: "In keigo, what is the humble (kenjōgo) form of the verb する (to do)?",
        a: ["なさいます (nasaimasu)", "いたします (itashimasu)", "されます (saremasu)", "します (shimasu)"],
        why: "いたします lowers your own action out of respect for the listener. なさいます and されます are honorific forms, used for the other person's action, and します is simply the neutral polite form."
      },
      ja: {
        q: "敬語で、「する」の謙譲語はどれでしょう？",
        a: ["なさいます", "いたします", "されます", "します"],
        why: "「いたします」は自分の行為をへりくだる謙譲語です。「なさいます」「されます」は相手の行為に使う尊敬語、「します」は丁寧語です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-9.webp",
      alt: "",
      hint: "Mapa simplificado do arquipélago japonês dividido em regiões por linhas finas",
      correct: 1,
      pt: {
        q: "Quantas prefeituras (都道府県) tem o Japão?",
        a: ["43", "47", "51", "60"],
        why: "São 47: 1 to (Tóquio), 1 dō (Hokkaidō), 2 fu (Osaka e Quioto) e 43 ken. Por isso a sigla 都道府県."
      },
      en: {
        q: "How many prefectures (都道府県) does Japan have?",
        a: ["43", "47", "51", "60"],
        why: "Forty-seven: 1 to (Tokyo), 1 dō (Hokkaidō), 2 fu (Osaka and Kyoto) and 43 ken. Hence the compound 都道府県."
      },
      ja: {
        q: "日本の都道府県はいくつあるでしょう？",
        a: ["43", "47", "51", "60"],
        why: "1都（東京都）、1道（北海道）、2府（大阪府・京都府）、43県の合計47です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-10.webp",
      alt: "",
      hint: "Pessoa idosa sentada diante de uma escrivaninha baixa, escrevendo com um pincel em uma tira de papel estreita",
      correct: 0,
      pt: {
        q: "Quantas moras tem cada verso de um haiku tradicional?",
        a: ["5 – 7 – 5", "7 – 5 – 7", "5 – 5 – 7", "7 – 7 – 7"],
        why: "O haiku tem três versos de 5, 7 e 5 moras e costuma trazer uma palavra de estação (kigo). O tanka, mais antigo, segue 5-7-5-7-7."
      },
      en: {
        q: "How many morae does each line of a traditional haiku have?",
        a: ["5 – 7 – 5", "7 – 5 – 7", "5 – 5 – 7", "7 – 7 – 7"],
        why: "A haiku has three lines of 5, 7 and 5 morae and usually includes a season word (kigo). The older tanka follows 5-7-5-7-7."
      },
      ja: {
        q: "伝統的な俳句の音数はどれでしょう？",
        a: ["5・7・5", "7・5・7", "5・5・7", "7・7・7"],
        why: "俳句は5・7・5の三句で、季語を入れるのが基本です。より古い短歌は5・7・5・7・7です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-11.webp",
      alt: "",
      hint: "Pessoa adulta em pé, segurando diante do rosto uma máscara oval lisa, deixando metade do rosto à mostra",
      correct: 0,
      pt: {
        q: "Qual é a diferença entre 本音 (honne) e 建前 (tatemae)?",
        a: ["Honne é o que se pensa de verdade; tatemae é o que se diz em público", "Honne é a linguagem formal; tatemae, a informal", "Honne é escrito; tatemae é falado", "São palavras sinônimas"],
        why: "Honne é o sentimento real e tatemae é a posição socialmente aceitável. Separar os dois é visto como consideração pelo grupo, não como falsidade."
      },
      en: {
        q: "What is the difference between 本音 (honne) and 建前 (tatemae)?",
        a: ["Honne is what you really think; tatemae is what you say in public", "Honne is formal language; tatemae is informal", "Honne is written; tatemae is spoken", "They are synonyms"],
        why: "Honne is your true feeling and tatemae the socially acceptable stance. Keeping them apart is seen as consideration for the group, not dishonesty."
      },
      ja: {
        q: "「本音」と「建前」の違いはどれでしょう？",
        a: ["本音は本当の気持ち、建前は表向きの立場", "本音は敬語、建前はくだけた言葉", "本音は書き言葉、建前は話し言葉", "同じ意味の言葉"],
        why: "本音は本当の気持ち、建前は社会的に受け入れられる立場です。使い分けは、うそではなく周囲への配慮と考えられています。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-12.webp",
      alt: "",
      hint: "Um cachorro pequeno e um gato sentados lado a lado, vistos de frente",
      correct: 1,
      pt: {
        q: "Qual contador se usa para animais pequenos, como gatos e cachorros?",
        a: ["頭 (tō)", "匹 (hiki)", "羽 (wa)", "台 (dai)"],
        why: "匹 conta animais pequenos. 頭 conta animais grandes (vacas, cavalos, elefantes), 羽 conta aves e coelhos, e 台 conta máquinas e veículos."
      },
      en: {
        q: "Which counter is used for small animals such as cats and dogs?",
        a: ["頭 (tō)", "匹 (hiki)", "羽 (wa)", "台 (dai)"],
        why: "匹 counts small animals. 頭 counts large animals (cows, horses, elephants), 羽 counts birds and rabbits, and 台 counts machines and vehicles."
      },
      ja: {
        q: "犬や猫など小さな動物を数える助数詞はどれでしょう？",
        a: ["頭", "匹", "羽", "台"],
        why: "小さな動物は「匹」で数えます。「頭」は牛や馬など大きな動物、「羽」は鳥やうさぎ、「台」は機械や車に使います。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-13.webp",
      alt: "",
      hint: "Calendário de parede com um único dia marcado por um círculo vermelho",
      correct: 1,
      pt: {
        q: "O que se comemora no Setsubun (節分), em 3 de fevereiro?",
        a: ["O ano-novo lunar", "A véspera da primavera, com o lançamento de grãos de soja", "O dia das crianças", "O festival das estrelas"],
        why: "No Setsubun, joga-se soja para fora de casa gritando 鬼は外、福は内 (\"demônios para fora, sorte para dentro\"). O dia das crianças é 5 de maio e o festival das estrelas (Tanabata) é 7 de julho."
      },
      en: {
        q: "What is celebrated at Setsubun (節分), on 3 February?",
        a: ["Lunar New Year", "The eve of spring, with bean throwing", "Children's Day", "The star festival"],
        why: "At Setsubun people throw soybeans out of the house shouting 鬼は外、福は内 (\"demons out, fortune in\"). Children's Day is 5 May and the star festival (Tanabata) is 7 July."
      },
      ja: {
        q: "2月3日の「節分」はどんな行事でしょう？",
        a: ["旧正月", "立春の前日に豆をまく行事", "こどもの日", "星の祭り"],
        why: "節分は立春の前日で、「鬼は外、福は内」と言いながら豆をまきます。こどもの日は5月5日、七夕は7月7日です。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-14.webp",
      alt: "",
      hint: "Pessoa adulta em pé, apontando com uma régua para uma lousa em branco",
      correct: 1,
      pt: {
        q: "Em 私は学生です, por que は é lido \"wa\" e não \"ha\"?",
        a: ["É um erro de leitura comum", "Como partícula de tópico, は conserva a grafia histórica e se lê \"wa\"", "Porque vem depois de 私", "Porque nesse caso é katakana"],
        why: "É uma herança da ortografia antiga, mantida só nas partículas: は se lê \"wa\", へ se lê \"e\" e を se lê \"o\". Fora delas, は é lido \"ha\" normalmente."
      },
      en: {
        q: "In 私は学生です, why is は read \"wa\" and not \"ha\"?",
        a: ["It is a common misreading", "As the topic particle, は keeps its historical spelling and is read \"wa\"", "Because it follows 私", "Because here it is katakana"],
        why: "It is a leftover of the old orthography, kept only in particles: は reads \"wa\", へ reads \"e\" and を reads \"o\". Anywhere else, は is read \"ha\" as usual."
      },
      ja: {
        q: "「私は学生です」の「は」を「わ」と読むのはなぜでしょう？",
        a: ["よくある読み間違い", "助詞の「は」は歴史的仮名遣いが残り「わ」と読むため", "「私」の後に来るため", "この場合はカタカナだから"],
        why: "歴史的仮名遣いの名残で、助詞のときだけ「は」は「わ」、「へ」は「え」、「を」は「お」と読みます。助詞以外では「は」と読みます。"
      }
    },
    {
      img: "assets/img/quiz/img-quiz-dificil-15.webp",
      alt: "",
      hint: "Xícara de café sobre um pires, ao lado de um pequeno dicionário fechado",
      correct: 0,
      pt: {
        q: "O que são os ateji (当て字)?",
        a: ["Kanji escolhidos pelo som, sem relação com o significado", "Kanji criados no Japão", "A caligrafia feita com pincel", "A leitura chinesa dos kanji"],
        why: "Em 珈琲 (kōhī, café), os kanji valem pelo som. Os kanji criados no Japão são os kokuji (como 峠), a caligrafia é o shodō e a leitura chinesa é o on'yomi."
      },
      en: {
        q: "What are ateji (当て字)?",
        a: ["Kanji chosen for their sound, regardless of meaning", "Kanji created in Japan", "Brush calligraphy", "The Chinese reading of kanji"],
        why: "In 珈琲 (kōhī, coffee) the kanji stand for the sound only. Kanji created in Japan are kokuji (such as 峠), calligraphy is shodō and the Chinese reading is on'yomi."
      },
      ja: {
        q: "「当て字」とは何でしょう？",
        a: ["意味と関係なく音に合わせて使う漢字", "日本で作られた漢字", "筆で書く書道", "漢字の中国語由来の読み"],
        why: "「珈琲」のように、音に合わせて漢字を当てたものが当て字です。日本で作られた漢字は国字（峠など）、筆で書くのは書道、中国由来の読みは音読みです。"
      }
    }
  ]
};
