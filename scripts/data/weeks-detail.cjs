// Conteúdo específico de cada semana, complementar a weeks.cjs. Nada aqui deve ser copiado entre semanas:
// o build falha se uma frase se repetir (ver checagem em build-pages.cjs).
// dev: desenvolvimento do bebê · sym: sintomas típicos · exam: o que costuma acontecer no pré-natal nesta semana
// ask: perguntas para levar à consulta. Informação educativa, baseada nas fontes listadas na página.
module.exports = {
  1: {
    dev: 'Sob ação do hormônio folículo-estimulante (FSH), alguns folículos dos ovários começam a amadurecer. Normalmente só um deles vai liberar o óvulo daqui a cerca de duas semanas.',
    sym: ['Sangramento menstrual e cólicas do período.', 'Inchaço abdominal e sensibilidade nas mamas ligados ao ciclo, não à gravidez.'],
    exam: 'Ainda não há o que testar. Se você está tentando engravidar, uma consulta pré-concepcional permite revisar sorologias, o preventivo em atraso, a carteira de vacinas e doenças crônicas como diabetes, hipertensão e problemas de tireoide.',
    ask: ['Qual dose de ácido fólico devo tomar e desde quando?', 'Algum remédio que uso todos os dias precisa ser trocado antes de engravidar?', 'Preciso atualizar alguma vacina, como rubéola ou hepatite B, antes de tentar?']
  },
  2: {
    dev: 'Um folículo dominante rompe e libera o óvulo, que vive cerca de 12 a 24 horas. Os espermatozoides podem sobreviver até cerca de cinco dias no corpo, por isso a janela fértil inclui os dias anteriores à ovulação.',
    sym: ['Muco cervical transparente e elástico, parecido com clara de ovo.', 'Dor leve em um dos lados do baixo ventre durante a ovulação, em algumas pessoas.', 'Aumento da libido perto da ovulação.'],
    exam: 'Não existe exame de rotina nesta semana. Testes de ovulação de farmácia, que detectam o pico do hormônio LH na urina, podem ajudar a identificar os dias férteis.',
    ask: ['Meus ciclos são irregulares: como posso estimar a ovulação?', 'Depois de quanto tempo tentando sem sucesso devo investigar fertilidade?', 'Minha idade ou alguma condição de saúde muda essa orientação?']
  },
  3: {
    dev: 'Depois da fecundação na tuba uterina, o zigoto se divide em mórula e depois em blastocisto, que chega ao útero cerca de cinco a seis dias depois. O sexo genético do bebê já é definido no momento da fecundação.',
    sym: ['Na maioria das vezes, nenhum sinal perceptível.', 'Cólica leve ou pequenas manchas de sangue rosado ou marrom na implantação.'],
    exam: 'O beta hCG no sangue pode começar a detectar a gravidez alguns dias antes do atraso, mas um resultado negativo agora não descarta a gestação. Se a menstruação não vier, repita o teste.',
    ask: ['Posso continuar usando os medicamentos que tomo enquanto não sei se estou grávida?', 'Se o teste der negativo e a menstruação não vier, em quantos dias devo repetir?', 'Que tipo de sangramento nesta fase merece avaliação?']
  },
  4: {
    dev: 'O embrião passa por uma etapa chamada gastrulação, em que se organiza em três camadas: ectoderma (pele e sistema nervoso), mesoderma (músculos, ossos, coração) e endoderma (intestino, pulmões, fígado). O saco gestacional começa a se formar.',
    sym: ['Atraso menstrual, geralmente o primeiro sinal percebido.', 'Mamas inchadas e doloridas ao toque.', 'Cansaço maior que o habitual e vontade de urinar com mais frequência.'],
    exam: 'Teste de farmácia ou beta hCG costumam ficar positivos. No ultrassom, ainda é cedo para ver o embrião: muitas vezes nada aparece ou só um pequeno saco gestacional, o que é esperado nesta idade gestacional.',
    ask: ['Quando devo fazer o primeiro ultrassom?', 'Preciso repetir o beta hCG para acompanhar a evolução?', 'Quais sinais indicariam uma gravidez fora do útero?']
  },
  5: {
    dev: 'O tubo neural começa a se fechar: é por isso que o ácido fólico faz tanta diferença neste período. O coração, ainda um tubo, inicia contrações, e no ultrassom transvaginal já pode aparecer a vesícula vitelina, que nutre o embrião no começo.',
    sym: ['Primeiras náuseas, muitas vezes piores pela manhã ou com o estômago vazio.', 'Sensibilidade a cheiros fortes, como perfume, cigarro e comida.', 'Sonolência durante o dia.'],
    exam: 'Um ultrassom transvaginal nesta semana costuma mostrar o saco gestacional e a vesícula vitelina; o embrião e os batimentos podem ainda não estar visíveis. É hora de marcar a primeira consulta de pré-natal.',
    ask: ['Até quando devo tomar ácido fólico?', 'Posso continuar meus exercícios no mesmo ritmo?', 'Dor forte de um lado da barriga com sangramento é motivo para ir ao pronto atendimento?']
  },
  6: {
    dev: 'Os batimentos cardíacos, geralmente entre 100 e 120 por minuto nesta fase, podem ser vistos no ultrassom transvaginal. O cérebro se divide em vesículas que darão origem às suas principais regiões, e surgem pequenas depressões onde ficarão olhos e orelhas.',
    sym: ['Náuseas e vômitos que costumam aumentar a partir desta semana.', 'Excesso de saliva e gosto metálico na boca.', 'Variações de humor e choro mais fácil, efeito também dos hormônios.'],
    exam: 'Se feito agora, o ultrassom transvaginal confirma se a gestação está dentro do útero, quantos embriões há e se o coração já bate. A primeira consulta inclui pressão, peso, cálculo da data provável do parto e o pedido dos exames iniciais.',
    ask: ['Qual é a minha data provável do parto pela última menstruação?', 'Existe remédio seguro para o enjoo se ele piorar?', 'Preciso de suplemento de ferro desde já?']
  },
  7: {
    dev: 'As mãos e os pés aparecem como pequenas placas em forma de remo. Os rins definitivos começam a se formar, o cordão umbilical fica bem definido e o cristalino dos olhos começa a se desenvolver.',
    sym: ['Aversão a alimentos que antes eram favoritos.', 'Intestino mais preso, efeito da progesterona.', 'Sensação de inchaço na barriga, antes mesmo de ela crescer.'],
    exam: 'Quando o ultrassom anterior foi muito precoce e não mostrou batimentos, a equipe costuma repeti-lo em uma a duas semanas para confirmar a evolução, antes de tirar conclusões.',
    ask: ['Como manter uma alimentação adequada se quase tudo me enjoa?', 'Quanto café posso tomar por dia?', 'Posso viajar ou pegar estrada nesta fase?']
  },
  8: {
    dev: 'É o auge da organogênese, quando os órgãos principais se formam. As pálpebras e as orelhas externas aparecem, o coração se divide em quatro cavidades e o nariz e o lábio superior começam a tomar forma.',
    sym: ['Peso no baixo ventre e leves pontadas, do útero em crescimento.', 'Gengivas mais sensíveis ao escovar.', 'Olfato mais apurado que o normal.'],
    exam: 'Entre 8 e 13 semanas, a medida do comprimento cabeça-nádegas no ultrassom é o método mais preciso para datar a gravidez. Se a data pelo ultrassom for muito diferente da data pela menstruação, a equipe pode corrigir a data provável do parto.',
    ask: ['Minha data provável do parto mudou com o ultrassom?', 'Meu exame de toxoplasmose mostra que já tive a infecção ou preciso de cuidados extras?', 'Quais vacinas posso tomar agora, como a da gripe?']
  },
  9: {
    dev: 'Os dedos começam a se separar e os mamilos aparecem. Os órgãos genitais externos iniciam a diferenciação, mas ainda não dá para ver o sexo no ultrassom. A placenta assume cada vez mais funções.',
    sym: ['Azia e queimação depois das refeições.', 'Dor de cabeça leve, comum no início da gestação.', 'Tontura ao ficar de pé por muito tempo.'],
    exam: 'Os resultados dos primeiros exames costumam chegar por volta desta fase. É o momento de revisar com a equipe o tipo sanguíneo e o fator Rh, se há anemia, as sorologias e a urocultura, já que infecção urinária sem sintomas também é tratada na gravidez.',
    ask: ['O que mostram meus exames de sangue e de urina?', 'Sou Rh negativo? O que isso muda no meu acompanhamento?', 'Que remédio posso tomar para dor de cabeça?']
  },
  10: {
    dev: 'Os brotos dos dentes de leite se formam sob a gengiva, as unhas começam a surgir e os ossos dos braços e das pernas se alongam. O coração já tem sua estrutura completa.',
    sym: ['Calças e saias apertando na cintura.', 'Corrimento vaginal branco e leve, sem cheiro, mais abundante.', 'Em algumas pessoas, os primeiros dias com menos enjoo.'],
    exam: 'A partir de 10 semanas, o teste de DNA fetal livre no sangue materno (NIPT) pode ser feito na rede privada como rastreamento de algumas alterações cromossômicas. Não é diagnóstico e não faz parte da rotina do SUS.',
    ask: ['Que exames de rastreamento de alterações cromossômicas estão disponíveis para mim?', 'Relação sexual está liberada no meu caso?', 'Posso pintar o cabelo ou fazer procedimentos estéticos?']
  },
  11: {
    dev: 'O diafragma está formado e o feto se mexe bastante, ainda sem que a gestante perceba. Parte do intestino ainda fica na base do cordão umbilical, uma hérnia fisiológica que se desfaz nas próximas semanas.',
    sym: ['Mais disposição para algumas gestantes, à medida que o enjoo cede.', 'Sangramento gengival ao escovar ou passar fio dental.', 'Leve aumento de peso, que ainda costuma ser pequeno.'],
    exam: 'Começa a janela do ultrassom de 11 a 13 semanas e 6 dias, que mede a translucência nucal, avalia o osso nasal e revisa a anatomia inicial. Em gestantes com risco aumentado de pré-eclâmpsia, a equipe pode indicar ácido acetilsalicílico em baixa dose a partir de 12 semanas.',
    ask: ['O que significa a medida da translucência nucal no meu exame?', 'Tenho risco aumentado de pré-eclâmpsia? Preciso de AAS ou cálcio?', 'Quando faço minha consulta odontológica do pré-natal?']
  },
  12: {
    dev: 'A tireoide e a hipófise do bebê começam a produzir hormônios. O rosto ganha um perfil mais definido, com queixo e nariz visíveis, e o feto se mexe ativamente, dá pequenos saltos e se espreguiça.',
    sym: ['Menos vontade de urinar, porque o útero sai da pelve.', 'Diminuição gradual das náuseas para a maioria.', 'Tontura ou fraqueza se passar muito tempo sem comer.'],
    exam: 'Ainda dá tempo de fazer o ultrassom com translucência nucal. Pelo Ministério da Saúde, o ideal é que a primeira consulta de pré-natal aconteça até esta semana; se ainda não aconteceu, procure a UBS agora.',
    ask: ['Meu ultrassom de 1º trimestre está dentro do esperado?', 'Que tipo de atividade física é segura para mim?', 'Quando é recomendado comunicar a gravidez no trabalho para garantir meus direitos?']
  },
  13: {
    dev: 'As impressões digitais começam a se formar nas pontas dos dedos e o esqueleto, antes de cartilagem, passa a ossificar. Nos fetos do sexo feminino, os ovários já guardam as células que darão origem aos óvulos.',
    sym: ['A barriga começa a aparecer, sobretudo em quem já teve filhos.', 'Mudança na libido, para mais ou para menos.', 'Corrimento um pouco mais intenso que o habitual.'],
    exam: 'É a última semana da janela da translucência nucal (até 13 semanas e 6 dias). Tratamentos odontológicos necessários costumam ser programados para o segundo trimestre, considerado o período mais confortável.',
    ask: ['Qual foi o resultado do meu rastreamento de 1º trimestre?', 'Posso fazer tratamento dentário, anestesia local e radiografia com proteção?', 'Qual o melhor período para viajar, se eu precisar?']
  },
  14: {
    dev: 'O pescoço se alonga, o fígado começa a produzir bile e o baço participa da produção de glóbulos vermelhos. Os órgãos genitais estão formados, mas ver o sexo no ultrassom ainda depende da posição do bebê e da experiência de quem examina.',
    sym: ['Retorno do apetite, às vezes com fome maior.', 'Manchas escuras no rosto (melasma) e uma linha escura na barriga.', 'Gengivite e mais sensibilidade dental.'],
    exam: 'As consultas mensais seguem com pressão arterial, peso e avaliação geral. A sexagem fetal pelo sangue materno, feita na rede privada, já é possível desde o primeiro trimestre para quem deseja saber o sexo antes do ultrassom.',
    ask: ['Quanto peso é adequado eu ganhar até o fim da gestação, considerando meu IMC?', 'Posso fazer musculação ou outro exercício de força?', 'Que protetor solar e cuidados com a pele são seguros?']
  },
  15: {
    dev: 'Os ossinhos do ouvido médio começam a se firmar, o que prepara a audição. O feto pratica movimentos respiratórios com o líquido amniótico e o padrão do cabelo no couro cabeludo começa a se definir.',
    sym: ['Nariz entupido e pequenos sangramentos nasais.', 'Pontadas na virilha ao mudar de posição, pelo estiramento dos ligamentos do útero.', 'Corrimento claro mais abundante.'],
    exam: 'Quando há indicação de diagnóstico de alterações cromossômicas, a amniocentese costuma ser feita a partir de 15 semanas. É um exame invasivo, decidido com a equipe a partir do risco de cada gestante.',
    ask: ['Tenho indicação de algum exame diagnóstico, como a amniocentese?', 'Sangramento nasal frequente é normal ou devo investigar?', 'Posso usar soro nasal e qual descongestionante evitar?']
  },
  16: {
    dev: 'A pele ainda é fina e deixa ver os vasos sanguíneos. O sistema urinário trabalha de forma contínua e o bebê urina no líquido amniótico várias vezes ao dia. As unhas dos pés começam a crescer.',
    sym: ['Movimentos sutis, como bolhas, principalmente em quem já engravidou antes.', 'Dores leves nas costas no fim do dia.', 'Prisão de ventre que continua ou se intensifica.'],
    exam: 'Nas consultas, os batimentos do bebê costumam ser ouvidos com o sonar Doppler. A equipe também passa a acompanhar o crescimento da barriga pela altura uterina.',
    ask: ['Até quando é normal ainda não sentir o bebê mexer?', 'Essa dor no pé da barriga é dos ligamentos ou preciso avaliar?', 'Como aliviar a prisão de ventre sem laxante?']
  },
  17: {
    dev: 'O esqueleto continua trocando cartilagem por osso, e as glândulas sudoríparas aparecem. O bebê já tem padrões próprios de movimento e passa boa parte do tempo dormindo.',
    sym: ['Ronco ou nariz congestionado à noite.', 'Sonhos mais vívidos e sono mais leve.', 'Dor lombar por causa da mudança de postura.'],
    exam: 'A medida da altura uterina, feita com fita métrica, ajuda a acompanhar o crescimento do bebê de consulta em consulta. Valores fora do esperado levam a equipe a pedir ultrassom.',
    ask: ['Minha altura uterina está compatível com as semanas?', 'Posso viajar de avião e até quando?', 'Fisioterapia pélvica ou para as costas pode me ajudar agora?']
  },
  18: {
    dev: 'A mielina, camada que protege os nervos e acelera os impulsos, começa a se formar. As impressões digitais estão definidas e, em muitos casos, os genitais externos já são visíveis no ultrassom.',
    sym: ['Tontura ao levantar rápido, pela queda passageira da pressão.', 'Inchaço leve nos tornozelos no fim do dia.', 'Dificuldade para encontrar posição para dormir.'],
    exam: 'Começam a ser marcados os exames de anatomia do segundo trimestre. Quando há fatores de risco, como diabetes prévio ou cardiopatia na família, a equipe pode indicar também ecocardiograma fetal.',
    ask: ['Tenho indicação de ecocardiograma fetal?', 'Quando devo agendar o ultrassom morfológico?', 'Quais sinais de pressão alta devo observar em casa?']
  },
  19: {
    dev: 'As áreas do cérebro ligadas ao olfato, ao paladar, à audição, à visão e ao tato se especializam. O vérnix, uma camada branca e gordurosa, protege a pele do contato prolongado com o líquido amniótico.',
    sym: ['Cãibras nas panturrilhas, principalmente de madrugada.', 'Pontadas nas laterais da barriga ao tossir ou espirrar.', 'Pele mais seca ou com coceira leve.'],
    exam: 'No ultrassom morfológico do segundo trimestre, a equipe pode medir o colo do útero por via transvaginal para avaliar o risco de parto prematuro, conforme o protocolo do serviço.',
    ask: ['Vou fazer a medida do colo do útero no morfológico?', 'O que posso fazer para evitar cãibras?', 'Qual a posição mais indicada para dormir a partir de agora?']
  },
  20: {
    dev: 'Os rins produzem urina que passa a formar grande parte do líquido amniótico. No intestino, começa a se acumular o mecônio, a primeira evacuação do bebê depois do nascimento.',
    sym: ['Movimentos mais nítidos e regulares.', 'Linha escura no meio da barriga (linha nigra) mais visível.', 'Leve falta de fôlego ao subir escadas.'],
    exam: 'Entre 20 e 24 semanas acontece o ultrassom morfológico, que examina órgão por órgão, a posição da placenta e a quantidade de líquido. A vacina dTpa, contra difteria, tétano e coqueluche, passa a ser indicada a partir de agora.',
    ask: ['Onde está a minha placenta? Ela está baixa?', 'O morfológico mostrou alguma alteração que precise de acompanhamento?', 'Posso tomar a dTpa hoje na UBS?']
  },
  21: {
    dev: 'A medula óssea começa a participar da produção de células do sangue. As papilas gustativas estão formadas e o bebê sente o sabor do líquido amniótico, que muda conforme a alimentação da gestante.',
    sym: ['Estrias e coceira na pele da barriga.', 'Primeiras varizes nas pernas ou na região íntima.', 'Endurecimentos leves e indolores da barriga.'],
    exam: 'Se o morfológico ainda não foi feito, ainda está dentro da janela. Nas consultas, a equipe confere se o crescimento da barriga e os movimentos estão de acordo com a idade gestacional.',
    ask: ['Esta coceira é só da pele esticando ou pode ser colestase?', 'Como posso aliviar as varizes?', 'Quando começa minha licença-maternidade e o que preciso entregar no trabalho?']
  },
  22: {
    dev: 'O tato se desenvolve rapidamente: o bebê toca o rosto, segura o cordão e explora o útero com as mãos. Os olhos estão formados, mas a íris ainda não tem pigmento definitivo.',
    sym: ['Umbigo saliente.', 'Pés inchados depois de muitas horas sentada ou de pé.', 'Dor na parte baixa das costas.'],
    exam: 'A janela do morfológico vai até 24 semanas. Esta também é uma boa fase para conhecer os sinais de trabalho de parto prematuro, que exigem atendimento imediato.',
    ask: ['Quais sinais de parto prematuro devo conhecer?', 'Como deve ser o padrão de movimentos do bebê nesta fase?', 'Posso começar exercícios para o assoalho pélvico?']
  },
  23: {
    dev: 'O bebê já reage a sons altos de fora do útero, como música e buzinas. Ele começa a ganhar peso com mais rapidez e as linhas das mãos e dos pés ficam mais marcadas.',
    sym: ['Barriga que endurece e relaxa algumas vezes ao dia, sem ritmo.', 'Tornozelos e pés mais inchados com o calor.', 'Sangramento gengival que persiste.'],
    exam: 'É hora de agendar o teste de tolerância à glicose, feito entre 24 e 28 semanas. A equipe também revisa o ganho de peso desde o início da gestação.',
    ask: ['Como diferenciar contração de treinamento de contração de verdade?', 'Quando e como faço o TOTG?', 'Meu ganho de peso até aqui está adequado?']
  },
  24: {
    dev: 'Os pulmões ramificam suas vias aéreas e as células que produzem surfactante amadurecem. O cérebro cresce rapidamente, e o rosto já tem cílios e sobrancelhas.',
    sym: ['Dor que desce pela nádega e pela perna (ciática).', 'Azia mais intensa depois de refeições grandes.', 'Coceira na pele da barriga.'],
    exam: 'O TOTG 75 g mede a glicose em jejum, uma hora e duas horas depois de beber a solução de glicose. Um único valor alterado já pode indicar diabetes gestacional, que tem tratamento.',
    ask: ['Preciso de jejum de quantas horas para o TOTG?', 'O que acontece se eu tiver diabetes gestacional?', 'Quais sintomas de pré-eclâmpsia devo conhecer?']
  },
  25: {
    dev: 'As narinas, antes fechadas, começam a se abrir. Capilares se formam sob a pele, que ganha cor, e o reflexo de preensão das mãos fica mais forte.',
    sym: ['Formigamento ou dormência nas mãos, típico da síndrome do túnel do carpo na gravidez.', 'Hemorroidas.', 'Dificuldade para pegar no sono.'],
    exam: 'Ainda dentro da janela do TOTG. O hemograma do segundo trimestre ajuda a identificar anemia, comum nesta fase pelo aumento do volume de sangue.',
    ask: ['Esse formigamento nas mãos tem tratamento?', 'Estou com anemia? Preciso ajustar o ferro?', 'Como começo meu plano de parto?']
  },
  26: {
    dev: 'A coluna se fortalece, com dezenas de vértebras e articulações, e os pulmões continuam a ramificar. O bebê inspira e expira líquido amniótico como treino para respirar.',
    sym: ['Sensação de pressão sob as costelas.', 'Dor de cabeça ocasional.', 'Noites mais agitadas pelo desconforto e pela vontade de urinar.'],
    exam: 'Última janela do TOTG (até 28 semanas). Para gestantes Rh negativo, a equipe solicita o Coombs indireto antes de decidir sobre a imunoglobulina anti-D.',
    ask: ['Qual foi o resultado do meu TOTG?', 'Preciso repetir o Coombs indireto?', 'Como formalizo quem será meu acompanhante no parto?']
  },
  27: {
    dev: 'As camadas da retina se organizam e a superfície do cérebro começa a formar sulcos e dobras. O bebê tem ciclos claros de sono e vigília, e os soluços ficam mais frequentes.',
    sym: ['Vontade de mexer as pernas ao deitar, que piora à noite.', 'Cãibras e varizes.', 'Perda de urina ao tossir, espirrar ou rir.'],
    exam: 'Termina o segundo trimestre. Gestantes Rh negativo com Coombs indireto negativo costumam receber a imunoglobulina anti-D por volta de 28 semanas, conforme protocolo.',
    ask: ['Vou receber a imunoglobulina anti-D?', 'Perder urina nesta fase é normal? Fisioterapia pélvica ajuda?', 'Até quando posso viajar com segurança?']
  },
  28: {
    dev: 'Os olhos se abrem e fecham e os cílios estão formados. Com cerca de 1 kg, o bebê nascido agora teria boas chances com cuidados de UTI neonatal, mas cada semana a mais no útero faz diferença.',
    sym: ['Cansaço que volta com força no terceiro trimestre.', 'Falta de ar ao falar ou caminhar mais rápido.', 'Dor na região pélvica ao andar.'],
    exam: 'Os exames do terceiro trimestre costumam ser pedidos agora: hemograma, glicemia e testes para HIV, sífilis e hepatite B, além de toxoplasmose para quem não tem imunidade. As consultas passam a ser a cada duas semanas.',
    ask: ['Quais exames do 3º trimestre preciso fazer e onde?', 'Como faço a contagem de movimentos do bebê em casa?', 'Que vacinas do 3º trimestre estão disponíveis para mim?']
  },
  29: {
    dev: 'Os chutes e as espreguiçadas ficam mais fortes. Os ossos absorvem muito cálcio, e a cabeça cresce para acompanhar o desenvolvimento do cérebro.',
    sym: ['Chutes fortes nas costelas ou na bexiga.', 'Hemorroidas e intestino preso.', 'Varizes na vulva, em algumas gestantes.'],
    exam: 'Com consultas quinzenais, a equipe acompanha pressão, altura uterina e movimentos. Se o crescimento parecer abaixo ou acima do esperado, pode pedir ultrassom de crescimento.',
    ask: ['Preciso de ultrassom no 3º trimestre?', 'Que pomada ou cuidado é seguro para hemorroidas?', 'A licença pode começar antes do parto? A CLT permite a partir de 28 dias antes.']
  },
  30: {
    dev: 'O cérebro ganha sulcos mais profundos e mais área de superfície. O bebê consegue regular melhor a própria temperatura graças à gordura acumulada sob a pele.',
    sym: ['Insônia e acordar várias vezes para urinar.', 'Mudanças de humor e ansiedade com a chegada do bebê.', 'Mãos e pés inchados ao fim do dia.'],
    exam: 'A equipe pode pedir exame de urina para pesquisar proteína quando a pressão sobe. Esta é uma boa fase para fazer um curso de gestantes, oferecido por muitas UBS e maternidades.',
    ask: ['Como me preparar para a amamentação ainda na gravidez?', 'A minha pressão está normal?', 'Existe curso de gestantes perto de mim?']
  },
  31: {
    dev: 'A transferência de anticorpos da gestante para o bebê pela placenta aumenta muito no terceiro trimestre. É por isso que vacinar na gravidez também protege o recém-nascido nos primeiros meses.',
    sym: ['Saída de gotinhas de colostro pelos mamilos.', 'Contrações de treinamento mais frequentes.', 'Dor lombar e cansaço ao ficar de pé.'],
    exam: 'Nas consultas, a equipe palpa a barriga para identificar a posição do bebê. Ainda há tempo e espaço para ele virar sozinho.',
    ask: ['Minhas vacinas da gestação estão completas?', 'O que fazer se tiver contrações regulares antes de 37 semanas?', 'O bebê está de cabeça para baixo?']
  },
  32: {
    dev: 'O bebê treina movimentos de respiração, deglutição e sucção. A pele fica mais opaca, menos transparente, e os ossos estão quase todos formados, embora ainda macios.',
    sym: ['Falta de ar à noite, quando deitada de barriga para cima.', 'Pés e tornozelos inchados.', 'Contrações indolores depois de esforço.'],
    exam: 'Um ultrassom de terceiro trimestre pode ser pedido entre 32 e 36 semanas para avaliar crescimento, líquido amniótico e placenta. A lei garante à gestante do SUS saber e ser vinculada à maternidade onde será atendida no parto.',
    ask: ['Em qual maternidade estou vinculada para o parto?', 'Se o bebê estiver sentado, quais são as opções?', 'O crescimento do bebê está adequado?']
  },
  33: {
    dev: 'As pupilas já se contraem e se dilatam em resposta à luz. O sistema imunológico amadurece, e os ossos do crânio continuam separados para se acomodarem no parto.',
    sym: ['Dor no osso do púbis ao andar, subir escada ou virar na cama.', 'Dores nas articulações do quadril.', 'Azia que volta com o útero alto.'],
    exam: 'A equipe confere inchaço, pressão e a posição do bebê. Inchaço súbito no rosto ou nas mãos merece avaliação no mesmo dia.',
    ask: ['Essa dor no púbis melhora com fisioterapia ou cinta?', 'Quais opções de alívio da dor no parto tenho na minha maternidade?', 'Como incluo meus desejos no plano de parto?']
  },
  34: {
    dev: 'O vérnix fica mais espesso e as unhas chegam à ponta dos dedos. Os pulmões ainda estão amadurecendo, assim como o controle da sucção e da respiração.',
    sym: ['Sensação de peso na pelve.', 'Cansaço com pequenas tarefas.', 'Contrações de treinamento ao fim do dia.'],
    exam: 'Muitas equipes revisam o plano de parto e as orientações de quando ir à maternidade. A pesquisa de estreptococo do grupo B se aproxima.',
    ask: ['Quando devo ir para a maternidade?', 'O bebê já está na posição certa?', 'Em que situação a indução seria indicada para mim?']
  },
  35: {
    dev: 'Os rins estão totalmente desenvolvidos e o fígado já processa alguns resíduos. O bebê ganha peso rapidamente, principalmente gordura.',
    sym: ['Urgência para urinar com mais frequência.', 'Pressão e pontadas na vagina.', 'Dificuldade para respirar fundo.'],
    exam: 'A coleta com cotonete da vagina e do ânus para estreptococo do grupo B é feita entre 35 e 37 semanas onde o protocolo prevê. Se positiva, indica antibiótico durante o trabalho de parto, não antes.',
    ask: ['Vou fazer a pesquisa de estreptococo do grupo B?', 'Se der positivo, como será o antibiótico no parto?', 'A maternidade apoia contato pele a pele e amamentação na primeira hora?']
  },
  36: {
    dev: 'As gengivas ficam firmes e o reflexo de sucção está forte. A maior parte da lanugem cai e o bebê ocupa quase todo o espaço do útero.',
    sym: ['Respiração mais leve após o encaixe.', 'Mais idas ao banheiro com a cabeça do bebê na pelve.', 'Dor ou desconforto pélvico ao caminhar.'],
    exam: 'As consultas passam a ser semanais. Se o bebê estiver pélvico, a equipe pode discutir a versão cefálica externa, uma manobra para virá-lo, normalmente oferecida por volta de 36 a 37 semanas.',
    ask: ['O bebê está encaixado?', 'A versão cefálica externa é uma opção para mim?', 'O que devo levar para a maternidade além da mala?']
  },
  37: {
    dev: 'Os pulmões continuam amadurecendo até cerca de 39 semanas. Por isso, o Conselho Federal de Medicina só permite cesárea a pedido da gestante, sem indicação clínica, a partir de 39 semanas.',
    sym: ['Saída do tampão mucoso, uma secreção gelatinosa às vezes com raias de sangue.', 'Contrações irregulares que vêm e vão.', 'Sensação de bebê muito baixo.'],
    exam: 'Consultas semanais. Quando há dúvida sobre o bem-estar do bebê, a equipe pode pedir cardiotocografia, que registra os batimentos dele e as contrações.',
    ask: ['Perdi o tampão: preciso ir à maternidade?', 'Se eu quiser cesárea, quais são as regras?', 'Que intervalo de contrações indica ir para a maternidade no meu caso?']
  },
  38: {
    dev: 'O mecônio se acumula no intestino e o cérebro e os pulmões seguem amadurecendo. A circunferência da cabeça e a do abdome ficam parecidas.',
    sym: ['Ansiedade e vontade de deixar tudo pronto.', 'Inchaço maior nos pés.', 'Noites curtas e cochilos durante o dia.'],
    exam: 'A equipe pode avaliar o colo do útero pelo toque quando necessário. A OMS recomenda aguardar pelo menos um minuto antes de clampear o cordão em bebês que nascem bem.',
    ask: ['O clampeamento tardio do cordão é feito na minha maternidade?', 'Que métodos de alívio da dor posso usar, com e sem remédio?', 'Como meu acompanhante pode ajudar no trabalho de parto?']
  },
  39: {
    dev: 'Todos os órgãos estão prontos para a vida fora do útero. A camada de gordura dá ao bebê um aspecto mais arredondado e ajuda a manter a temperatura após o nascimento.',
    sym: ['Desconforto para sentar, deitar e caminhar.', 'Cólicas leves no baixo ventre, como as de menstruação.', 'Mais secreção vaginal.'],
    exam: 'Consultas semanais e, se necessário, avaliação do bem-estar fetal. Um parto que começa espontaneamente entre 39 e 40 semanas é considerado no tempo ideal.',
    ask: ['O que acontece se eu passar da data provável do parto?', 'Meu bebê vai para o alojamento conjunto comigo?', 'Quando posso ir para casa depois do parto?']
  },
  40: {
    dev: 'O bebê está pronto e segue ganhando um pouco de peso. Unhas compridas e ossos do crânio ainda moldáveis são comuns ao nascer.',
    sym: ['Expectativa, ansiedade e impaciência.', 'Contrações que podem começar e parar.', 'Desconforto geral para dormir.'],
    exam: 'Se o trabalho de parto não começou, a equipe avalia o bem-estar do bebê, que pode incluir cardiotocografia e medida do líquido amniótico, e pode oferecer o descolamento de membranas.',
    ask: ['Quando a indução seria indicada e como seria feita?', 'O que é descolamento de membranas e quais os riscos?', 'Como devem estar os movimentos do bebê nesta fase?']
  },
  41: {
    dev: 'A placenta continua funcionando na maioria das gestações, mas sua reserva diminui com o tempo. O bebê pode nascer com pele mais seca e descamando, porque o vérnix já foi absorvido.',
    sym: ['Cansaço acumulado e dificuldade para se movimentar.', 'Frustração com a espera.', 'Contrações irregulares que não evoluem.'],
    exam: 'A OMS recomenda oferecer indução do parto a partir de 41 semanas. Até lá, o bem-estar do bebê costuma ser vigiado com mais frequência.',
    ask: ['Quais métodos de indução são usados aqui?', 'Posso ter parto normal mesmo com indução?', 'O que acontece se a indução não avançar?']
  },
  42: {
    dev: 'Nesta fase o líquido amniótico pode diminuir e o bebê pode eliminar mecônio no útero, por isso a vigilância é mais próxima. Muitos bebês pós-termo nascem com pele descamando e unhas longas.',
    sym: ['Desconforto intenso e cansaço.', 'Ansiedade pela espera.', 'Atenção redobrada a qualquer mudança nos movimentos.'],
    exam: 'A equipe define a via e o momento do parto de forma individual, com monitorização intensiva do bem-estar fetal. Procure a maternidade imediatamente se os movimentos diminuírem.',
    ask: ['Quais os riscos de continuar aguardando?', 'Qual é o plano para o parto nos próximos dias?', 'Que cuidados o bebê pós-termo precisa ao nascer?']
  }
};
