export type Eli5Category = "base" | "web" | "ferramentas";

export interface Eli5QuickCheckData {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export interface Eli5Topic {
  slug: string;
  titulo: string;
  subtitulo: string;
  categoria: Eli5Category;
  ordem: number;
  tempoLeitura: string;
  analogia: {
    titulo: string;
    texto: string;
  };
  explicacao: string;
  exemplo: {
    titulo: string;
    linguagem: string;
    codigo: string;
    oQueFaz: string;
  };
  porQueImporta: string;
  check: Eli5QuickCheckData;
}

export const eli5CategoryLabels: Record<Eli5Category, string> = {
  base: "A base de tudo",
  web: "Como a web funciona",
  ferramentas: "Ferramentas do dia a dia",
};

export const eli5Topics: Eli5Topic[] = [
  {
    slug: "linguagem-de-programacao",
    titulo: "O que é uma linguagem de programação?",
    subtitulo: "Como a gente conversa com o computador sem precisar falar em zeros e uns.",
    categoria: "base",
    ordem: 1,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "Pense em uma receita de bolo",
      texto:
        "Um computador é muito rápido, mas não adivinha nada. Se você der uma receita passo a passo bem clara — 'pegue 2 ovos, misture com farinha, asse por 30 minutos' — ele executa exatamente o que você pediu. Uma linguagem de programação é o idioma que usamos para escrever essas receitas.",
    },
    explicacao:
      "Por dentro, o computador só entende sinais elétricos (ligado e desligado, 1 e 0). Como escrever tudo em 0 e 1 seria impossível para humanos, criamos linguagens como JavaScript, Python e TypeScript. Elas usam palavras parecidas com inglês para que a gente escreva instruções, e um programa tradutor converte isso para a máquina.",
    exemplo: {
      titulo: "Dando uma ordem simples em JavaScript",
      linguagem: "javascript",
      codigo: `let nome = "Maria";\nconsole.log("Olá, " + nome + "!");`,
      oQueFaz: "Guarda o texto 'Maria' e pede para o computador mostrar 'Olá, Maria!' na tela.",
    },
    porQueImporta:
      "Você não precisa decorar todas as linguagens. Aprender a primeira é aprender a lógica de dar instruções claras — depois, as outras ficam muito mais fáceis.",
    check: {
      pergunta: "Para que serve uma linguagem de programação?",
      opcoes: [
        "Para traduzir instruções humanas claras em comandos que o computador executa.",
        "Para deixar o computador fisicamente mais rápido.",
        "Para substituir o teclado e o mouse.",
      ],
      correta: 0,
      explicacao: "Linguagens de programação são a ponte entre o nosso raciocínio e os 0s e 1s da máquina.",
    },
  },
  {
    slug: "o-que-e-variavel",
    titulo: "O que é uma variável?",
    subtitulo: "Como o programa lembra de informações enquanto está rodando.",
    categoria: "base",
    ordem: 2,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "Uma caixinha com etiqueta",
      texto:
        "Imagine uma caixa de papelão com uma etiqueta escrita 'idade' e o número 25 dentro. Sempre que você precisar saber a idade, não precisa lembrar o número de cabeça: basta olhar dentro da caixa 'idade'. Se fizer aniversário, você troca o 25 por 26 na mesma caixa.",
    },
    explicacao:
      "Na programação, variáveis guardam dados na memória do computador: um nome, um preço, se a pessoa está logada ou não. Você dá um nome claro para a caixinha e pode ler ou atualizar o que está lá dentro.",
    exemplo: {
      titulo: "Criando e atualizando uma variável",
      linguagem: "javascript",
      codigo: `let pontos = 10;\npontos = pontos + 5;\n// Agora pontos vale 15`,
      oQueFaz: "Cria uma caixinha chamada 'pontos' com 10 e soma mais 5.",
    },
    porQueImporta:
      "Sem variáveis, um site não conseguiria lembrar seu nome, os itens do seu carrinho de compras ou a sua pontuação em um jogo.",
    check: {
      pergunta: "No exemplo acima, quanto vale a variável `pontos` no final?",
      opcoes: ["10", "15", "5"],
      correta: 1,
      explicacao: "Começou com 10 e somamos 5, atualizando o valor guardado para 15.",
    },
  },
  {
    slug: "o-que-e-funcao",
    titulo: "O que é uma função?",
    subtitulo: "Blocos de código que você escreve uma vez e reutiliza sempre que precisar.",
    categoria: "base",
    ordem: 3,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "Uma máquina de fazer suco",
      texto:
        "Você coloca laranjas na entrada, aperta o botão e sai suco do outro lado. Não precisa montar a máquina toda vez que sentir sede — ela já está pronta. Uma função é exatamente isso: recebe ingredientes (parâmetros), faz um trabalho e devolve um resultado.",
    },
    explicacao:
      "Em vez de copiar e colar as mesmas 10 linhas de código em vários lugares, você coloca essas linhas dentro de uma função com um nome (por exemplo, calcularDesconto). Sempre que precisar, basta 'chamar' a função pelo nome.",
    exemplo: {
      titulo: "Uma função que soma dois números",
      linguagem: "javascript",
      codigo: `function somar(a, b) {\n  return a + b;\n}\n\nsomar(2, 3); // devolve 5`,
      oQueFaz: "Define a máquina 'somar' e a usa com os números 2 e 3 para obter 5.",
    },
    porQueImporta:
      "Funções mantêm o código organizado, evitam repetição e facilitam encontrar erros quando algo quebra.",
    check: {
      pergunta: "Qual é a principal vantagem de usar uma função?",
      opcoes: [
        "Escrever o código uma vez e reutilizar sempre que precisar.",
        "Fazer o site funcionar sem internet.",
        "Evitar o uso de variáveis.",
      ],
      correta: 0,
      explicacao: "Funções empacotam uma tarefa reutilizável, deixando o código limpo e fácil de manter.",
    },
  },
  {
    slug: "o-que-e-html",
    titulo: "O que é HTML?",
    subtitulo: "O esqueleto que dá estrutura a toda página da internet.",
    categoria: "web",
    ordem: 4,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "As paredes e cômodos de uma casa",
      texto:
        "Antes de pintar ou colocar móveis, uma casa precisa de estrutura: onde fica a porta, onde fica a janela, qual é a sala e qual é a cozinha. O HTML faz isso em um site: ele diz ao navegador 'isso aqui é um título', 'isso é um parágrafo', 'isso é um botão'.",
    },
    explicacao:
      "HTML significa HyperText Markup Language. Ele usa 'etiquetas' (chamadas de tags, como <h1> ou <p>) para marcar cada pedaço de conteúdo. Sem HTML, o navegador não saberia o que é texto, imagem ou link.",
    exemplo: {
      titulo: "Uma mini página em HTML",
      linguagem: "html",
      codigo: `<h1>Olá, mundo!</h1>\n<p>Essa é minha primeira página.</p>\n<button>Clique aqui</button>`,
      oQueFaz: "Cria um título grande, um parágrafo de texto e um botão clicável.",
    },
    porQueImporta:
      "Todo site que você já visitou na vida — do Google ao YouTube — usa HTML como base.",
    check: {
      pergunta: "Qual é o papel do HTML em uma página web?",
      opcoes: [
        "Definir as cores e animações da tela.",
        "Definir a estrutura e o significado de cada pedaço de conteúdo.",
        "Guardar senhas no banco de dados.",
      ],
      correta: 1,
      explicacao: "HTML é o esqueleto: ele diz o que é título, parágrafo, lista, imagem ou botão.",
    },
  },
  {
    slug: "o-que-e-css",
    titulo: "O que é CSS?",
    subtitulo: "A roupa, as cores e o layout que deixam o HTML bonito.",
    categoria: "web",
    ordem: 5,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "A pintura e a decoração da casa",
      texto:
        "Se o HTML é a casa no tijolo, o CSS é a tinta na parede, o piso, a iluminação e a posição dos móveis. Ele decide se um botão é azul ou verde, se a letra é grande ou pequena e se os cards ficam lado a lado.",
    },
    explicacao:
      "CSS significa Cascading Style Sheets (Folhas de Estilo em Cascata). Você escolhe um elemento do HTML (por exemplo, button) e diz quais estilos ele deve ter: cor de fundo, espaçamento, borda arredondada, fonte.",
    exemplo: {
      titulo: "Deixando o botão azul e arredondado",
      linguagem: "css",
      codigo: `button {\n  background-color: #2563eb;\n  color: white;\n  border-radius: 8px;\n}`,
      oQueFaz: "Pinta o botão de azul, deixa o texto branco e arredonda os cantos.",
    },
    porQueImporta:
      "Um site só com HTML funciona, mas parece um documento de texto dos anos 90. O CSS é o que transforma páginas em produtos agradáveis de usar.",
    check: {
      pergunta: "Se você quiser mudar a cor de fundo de um botão, qual tecnologia usa?",
      opcoes: ["CSS", "Git", "Terminal"],
      correta: 0,
      explicacao: "O CSS controla toda a aparência visual: cores, fontes, tamanhos e posicionamento.",
    },
  },
  {
    slug: "o-que-e-javascript",
    titulo: "O que é JavaScript?",
    subtitulo: "A linguagem que dá vida e interatividade às páginas web.",
    categoria: "web",
    ordem: 6,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "A eletricidade e os interruptores da casa",
      texto:
        "Com HTML (paredes) e CSS (pintura), a casa está linda, mas nada se mexe. O JavaScript é a parte elétrica: quando você aperta o interruptor, a luz acende. Na web, quando você clica em 'Curtir', o coração muda de cor sem recarregar a página.",
    },
    explicacao:
      "JavaScript é a única linguagem que roda nativamente dentro de todos os navegadores. Com ela, você reage a cliques, valida formulários, busca dados de servidores e atualiza a tela em tempo real.",
    exemplo: {
      titulo: "Mostrando um aviso ao clicar no botão",
      linguagem: "javascript",
      codigo: `const botao = document.querySelector("button");\nbotao.addEventListener("click", () => {\n  alert("Você clicou!");\n});`,
      oQueFaz: "Escuta o clique no botão e abre uma mensagem na tela.",
    },
    porQueImporta:
      "Junto com HTML e CSS, o JavaScript forma o trio fundamental da web moderna.",
    check: {
      pergunta: "O que o JavaScript adiciona a uma página que já tem HTML e CSS?",
      opcoes: [
        "Comportamento e interatividade (cliques, validações, atualizações na tela).",
        "Apenas fontes diferentes.",
        "Backup automático na nuvem.",
      ],
      correta: 0,
      explicacao: "JavaScript faz a página reagir às ações da pessoa usuária em tempo real.",
    },
  },
  {
    slug: "frontend-e-backend",
    titulo: "O que é Frontend e Backend?",
    subtitulo: "A diferença entre o que você vê na tela e o que acontece nos bastidores.",
    categoria: "web",
    ordem: 7,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "O salão e a cozinha de um restaurante",
      texto:
        "O Frontend é o salão: as mesas, o cardápio bonito e o garçom que conversa com você. O Backend é a cozinha: onde os ingredientes estão guardados (banco de dados), os pedidos são preparados e a comida sai pronta para o garçom entregar.",
    },
    explicacao:
      "Frontend é tudo o que roda no navegador do usuário (HTML, CSS, JavaScript). Backend é o servidor que fica guardado em outro computador: ele verifica sua senha, salva seus dados no banco e envia as informações certas para o Frontend mostrar.",
    exemplo: {
      titulo: "Como os dois conversam",
      linguagem: "text",
      codigo: `1. Você clica em "Entrar" (Frontend)\n2. O navegador envia email e senha para o servidor\n3. O servidor confere no banco de dados (Backend)\n4. O servidor responde: "Tudo certo, pode entrar!"`,
      oQueFaz: "Mostra o caminho de um login simples entre a tela e o servidor.",
    },
    porQueImporta:
      "Ajuda você a entender onde cada tecnologia se encaixa e qual área combina mais com o que você gosta de construir.",
    check: {
      pergunta: "Onde normalmente fica a verificação de senha e o acesso ao banco de dados?",
      opcoes: ["No Backend (servidor).", "No CSS.", "Apenas no título HTML."],
      correta: 0,
      explicacao: "Regras sensíveis e banco de dados ficam no Backend, longe do navegador do usuário.",
    },
  },
  {
    slug: "o-que-e-git",
    titulo: "O que é Git (e GitHub)?",
    subtitulo: "A máquina do tempo do seu código — e como usar no dia a dia.",
    categoria: "ferramentas",
    ordem: 8,
    tempoLeitura: "3 min",
    analogia: {
      titulo: "Um 'Ctrl+Z' com pontos de salvamento de videogame",
      texto:
        "Sabe quando você edita um trabalho e salva como 'trabalho_final_v2_agora_vai.docx' com medo de estragar? O Git resolve isso: você tira 'fotos' (commits) do seu código a cada avanço. Se algo der errado, volta para qualquer foto anterior. O GitHub é o site onde você guarda essas fotos na nuvem.",
    },
    explicacao:
      "Git é uma ferramenta de controle de versão que roda no seu computador. No dia a dia, você usa principalmente 3 comandos: preparar os arquivos (add), salvar a foto com uma mensagem (commit) e enviar para a nuvem (push).",
    exemplo: {
      titulo: "Os 3 comandos mais usados do Git",
      linguagem: "bash",
      codigo: `git add .\ngit commit -m "Adiciona página inicial"\ngit push`,
      oQueFaz: "Prepara as mudanças, salva um ponto no histórico e envia para o GitHub.",
    },
    porQueImporta:
      "Praticamente toda equipe de tecnologia usa Git. Aprender o básico cedo evita perder código e permite trabalhar em grupo sem sobrescrever o trabalho dos outros.",
    check: {
      pergunta: "Qual comando salva um 'ponto no histórico' (uma foto) das suas mudanças no Git?",
      opcoes: ["git commit", "git push", "mkdir"],
      correta: 0,
      explicacao: "`git commit` registra a foto no histórico local; `git push` envia essas fotos para o GitHub.",
    },
  },
  {
    slug: "o-que-e-terminal",
    titulo: "O que é o Terminal?",
    subtitulo: "Conversando com o computador por texto, de forma rápida e direta.",
    categoria: "ferramentas",
    ordem: 9,
    tempoLeitura: "2 min",
    analogia: {
      titulo: "Pedir no balcão em vez de procurar na prateleira",
      texto:
        "Usar o mouse e clicar em pastas é como andar pelo mercado procurando um produto. Usar o terminal é chegar no balcão e dizer exatamente o que você quer em uma frase curta — é muito mais rápido depois que você aprende as palavras básicas.",
    },
    explicacao:
      "O terminal (ou linha de comando) é uma janela onde você digita comandos para criar pastas, navegar entre arquivos, rodar programas e usar o Git. Não precisa ter medo da tela preta: com 4 ou 5 comandos você já resolve quase tudo no começo.",
    exemplo: {
      titulo: "4 comandos essenciais no terminal",
      linguagem: "bash",
      codigo: `pwd        # mostra em qual pasta você está\nls         # lista os arquivos da pasta\ncd pasta   # entra em uma pasta\nmkdir novo # cria uma pasta chamada "novo"`,
      oQueFaz: "Permite navegar e criar pastas sem tirar as mãos do teclado.",
    },
    porQueImporta:
      "Ferramentas modernas de programação — como Git, Node.js e instaladores de pacotes — são usadas principalmente pelo terminal.",
    check: {
      pergunta: "Qual comando do terminal lista os arquivos da pasta atual?",
      opcoes: ["ls", "mkdir", "pwd"],
      correta: 0,
      explicacao: "`ls` lista os arquivos, `pwd` mostra onde você está e `mkdir` cria uma pasta nova.",
    },
  },
];

export function getEli5Topics(): Eli5Topic[] {
  return [...eli5Topics].sort((a, b) => a.ordem - b.ordem);
}

export function getEli5TopicBySlug(slug: string): Eli5Topic | undefined {
  return eli5Topics.find((topic) => topic.slug === slug);
}
