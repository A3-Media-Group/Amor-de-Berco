// Definições das páginas de ferramentas. Os IDs dos elementos são usados por assets/tools.js.
const privacy = '<div class="notice">Seus dados não são enviados ao Amor de Berço. Cálculos e registros acontecem no seu navegador.</div>';
const noscript = '<noscript><p>Ative o JavaScript para usar esta ferramenta. Os artigos continuam disponíveis sem JavaScript.</p></noscript>';
const result = '<div class="result" id="result" role="status" aria-live="polite"></div>';

module.exports = [
{
  slug:'gravidez-semana-a-semana',icon:'✦',verb:'ACOMPANHAR',cat:'Gravidez',
  name:'Gravidez semana a semana',short:'Tamanho do bebê, sintomas e exames de cada semana da gestação.',
  title:'Gravidez semana a semana: desenvolvimento do bebê e calculadora',
  desc:'Acompanhe a gravidez semana a semana: tamanho do bebê, mudanças no corpo, exames e dicas da 1ª à 42ª semana. Calculadora gratuita, sem cadastro.',
  intro:'Descubra em que semana você está e veja o que acontece com o bebê e com o seu corpo, da concepção ao parto.',
  panel:`<form id="tool-form"><fieldset class="segmented"><legend>Calcular a partir de</legend><label><input type="radio" name="base" value="dum" checked> Última menstruação</label><label><input type="radio" name="base" value="dpp"> Data provável do parto</label></fieldset><label class="field" id="date-label">Primeiro dia da última menstruação<input type="date" id="date" required></label><button class="button" type="submit">Ver minha semana ↗</button></form>${result}<div id="week-card"></div>${noscript}`,
  help:`<h2>Como usar</h2><p>Informe o primeiro dia da última menstruação ou a data provável do parto (DPP) que consta no ultrassom ou na caderneta. A ferramenta mostra a semana atual, o trimestre, quanto falta para a DPP e um resumo da semana.</p><p>Se você já tem a DPP do ultrassom, prefira essa opção: ela costuma ser mais precisa do que a data da menstruação.</p>${privacy}`,
  content:'WEEK_HUB',
  faq:[['Como saber de quantas semanas estou?','Conte as semanas a partir do primeiro dia da última menstruação ou use a data provável do parto do ultrassom. A calculadora desta página faz a conta automaticamente.'],['Quantas semanas tem uma gravidez?','Uma gestação a termo vai de 37 a 42 semanas. A data provável do parto corresponde a 40 semanas contadas da última menstruação.'],['Quais são os trimestres da gravidez?','Primeiro trimestre: até 13 semanas e 6 dias. Segundo: de 14 a 27 semanas e 6 dias. Terceiro: de 28 semanas até o parto.']],
  sources:[['NHS — Your pregnancy week by week','https://www.nhs.uk/pregnancy/week-by-week/'],['Ministério da Saúde — Saúde materna','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna']],
  scripts:['weeks-data.js','tools.js']
},
{
  slug:'calculadora-parto',icon:'♧',verb:'CALCULAR',cat:'Gravidez',
  name:'Data provável do parto',short:'Estime a DPP pela menstruação, concepção, ultrassom ou FIV.',
  title:'Calculadora de data provável do parto (DPP) e idade gestacional',
  desc:'Calcule a data provável do parto pela última menstruação, data da concepção, ultrassom ou fertilização in vitro. Veja também as datas dos principais exames.',
  intro:'Estime quando seu bebê pode chegar e receba um cronograma com os principais marcos do pré-natal.',
  panel:`<form id="tool-form"><label class="field">Calcular por<select id="method"><option value="dum">Primeiro dia da última menstruação</option><option value="conception">Data da concepção</option><option value="us">Ultrassom (data do exame e idade gestacional)</option><option value="ivf3">FIV — transferência de embrião de 3 dias</option><option value="ivf5">FIV — transferência de embrião de 5 dias</option></select></label><label class="field"><span id="date-text">Primeiro dia da última menstruação</span><input type="date" id="date" required></label><div class="field-row" id="cycle-row"><label class="field">Duração média do ciclo (dias)<input type="number" id="cycle" min="21" max="35" value="28" inputmode="numeric" required></label></div><div class="field-row" id="us-row" hidden><label class="field">Semanas no ultrassom<input type="number" id="us-weeks" min="4" max="40" value="8" inputmode="numeric"></label><label class="field">Dias<input type="number" id="us-days" min="0" max="6" value="0" inputmode="numeric"></label></div><button class="button" type="submit">Calcular data provável ↗</button></form>${result}<div id="timeline"></div>${noscript}`,
  help:`<h2>Como a conta funciona?</h2><p>Pela regra de Naegele, a data provável do parto (DPP) fica 280 dias (40 semanas) após o primeiro dia da última menstruação, em ciclos de 28 dias. Ajustamos a diferença quando o ciclo é mais curto ou mais longo.</p><p>Pela concepção, somamos 266 dias. Pelo ultrassom, recuamos a idade gestacional medida no exame. Na FIV, consideramos a idade do embrião no dia da transferência.</p><p>Somente cerca de 4% a 5% dos bebês nascem exatamente na DPP. A datação pela ultrassonografia do primeiro trimestre, quando disponível, costuma prevalecer.</p>${privacy}`,
  content:`<section class="content-block"><h2>Gestação a termo: entenda as faixas</h2><div class="table-scroll"><table><thead><tr><th>Idade gestacional</th><th>Classificação</th></tr></thead><tbody><tr><td>Até 36 semanas e 6 dias</td><td>Pré-termo (prematuro)</td></tr><tr><td>37 a 38 semanas e 6 dias</td><td>Termo precoce</td></tr><tr><td>39 a 40 semanas e 6 dias</td><td>Termo completo</td></tr><tr><td>41 a 41 semanas e 6 dias</td><td>Termo tardio</td></tr><tr><td>42 semanas ou mais</td><td>Pós-termo</td></tr></tbody></table></div><p>Depois de calcular, acompanhe cada fase em <a href="gravidez-semana-a-semana.html">gravidez semana a semana</a>.</p></section>`,
  faq:[['A data provável do parto é exata?','Não. É uma estimativa. A maioria dos bebês nasce entre 37 e 42 semanas, e só uma pequena parte nasce exatamente na DPP.'],['Qual é mais confiável: DUM ou ultrassom?','O ultrassom do primeiro trimestre costuma ser mais preciso, principalmente em ciclos irregulares ou quando a data da menstruação é incerta.'],['Como calcular a DPP com ciclo irregular?','Prefira a datação por ultrassom. A calculadora aceita ciclos de 21 a 35 dias para ajustar a estimativa pela menstruação.']],
  sources:[['NHS — Due date calculator','https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/'],['ACOG — Methods for Estimating the Due Date','https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date']],
  scripts:['weeks-data.js','tools.js']
},
{
  slug:'semanas-gravidez',icon:'◷',verb:'CONTAR',cat:'Gravidez',
  name:'Semanas de gravidez',short:'Idade gestacional em semanas, dias e meses aproximados.',
  title:'Calculadora de semanas de gravidez: quantas semanas e meses estou?',
  desc:'Descubra de quantas semanas e quantos meses você está, em qualquer data. Veja o trimestre, o tamanho do bebê e o que acontece nesta fase.',
  intro:'Veja sua idade gestacional em semanas e dias, o mês aproximado e o tamanho estimado do bebê.',
  panel:`<form id="tool-form"><label class="field">Primeiro dia da última menstruação<input type="date" id="date" required></label><label class="field">Data de referência<input type="date" id="reference" required></label><button class="button" type="submit">Ver semanas e dias ↗</button></form>${result}<div id="week-card"></div><div class="notice">A data de referência permite consultar outra data, inclusive futura. Aceitamos até 42 semanas e 6 dias; fora disso, confira as datas com a equipe.</div>${noscript}`,
  help:`<h2>Como a conta funciona?</h2><p>Contamos os dias desde o primeiro dia da última menstruação e dividimos por sete. O restante corresponde aos dias além das semanas completas.</p><p>É a idade gestacional obstétrica, usada pelos profissionais de saúde, e não a idade desde a fecundação. A datação da equipe de pré-natal prevalece, especialmente em ciclos irregulares.</p>${privacy}`,
  content:`<section class="content-block"><h2>Semanas de gravidez em meses</h2><p>Como os meses têm durações diferentes, a conversão é aproximada. A tabela abaixo é a referência mais usada:</p><div class="table-scroll"><table><thead><tr><th>Mês</th><th>Semanas</th><th>Trimestre</th></tr></thead><tbody><tr><td>1º mês</td><td>1 a 4</td><td rowspan="3">1º trimestre</td></tr><tr><td>2º mês</td><td>5 a 8</td></tr><tr><td>3º mês</td><td>9 a 13</td></tr><tr><td>4º mês</td><td>14 a 17</td><td rowspan="3">2º trimestre</td></tr><tr><td>5º mês</td><td>18 a 22</td></tr><tr><td>6º mês</td><td>23 a 27</td></tr><tr><td>7º mês</td><td>28 a 31</td><td rowspan="3">3º trimestre</td></tr><tr><td>8º mês</td><td>32 a 35</td></tr><tr><td>9º mês</td><td>36 a 40+</td></tr></tbody></table></div></section>`,
  faq:[['20 semanas são quantos meses?','Com 20 semanas, a gestação está no 5º mês, aproximadamente na metade da gravidez.'],['A partir de quando conta a gravidez?','A contagem obstétrica começa no primeiro dia da última menstruação, cerca de duas semanas antes da concepção.'],['Quantas semanas tem cada trimestre?','O 1º trimestre vai até 13 semanas e 6 dias; o 2º, de 14 a 27 semanas e 6 dias; o 3º, de 28 semanas até o parto.']],
  sources:[['NHS — Due date calculator','https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/']],
  scripts:['weeks-data.js','tools.js']
},
{
  slug:'periodo-fertil',icon:'✿',verb:'PLANEJAR',cat:'Planejamento',
  name:'Período fértil',short:'Janela fértil e ovulação estimadas para os próximos ciclos.',
  title:'Calculadora de período fértil e ovulação: próximos 3 ciclos',
  desc:'Calcule o período fértil, o dia provável da ovulação e a próxima menstruação para os próximos três ciclos. Gratuito e sem cadastro.',
  intro:'Entenda as datas estimadas da janela fértil, da ovulação e da próxima menstruação nos próximos ciclos.',
  panel:`<form id="tool-form"><label class="field">Primeiro dia da última menstruação<input type="date" id="date" required></label><label class="field">Duração média do ciclo (dias)<input type="number" id="cycle" min="21" max="35" value="28" inputmode="numeric" required></label><button class="button" type="submit">Calcular período fértil ↗</button></form>${result}<div id="cycles"></div><div class="notice">Estimativa para quem deseja engravidar. Não use este cálculo como método para evitar gravidez.</div>${noscript}`,
  help:`<h2>Como a conta funciona?</h2><p>A ovulação costuma ocorrer cerca de 14 dias antes da menstruação seguinte. A janela fértil reúne os 5 dias anteriores à ovulação e o próprio dia, porque os espermatozoides podem sobreviver alguns dias no corpo.</p><p>Ciclos variam de mês a mês. Sinais como muco cervical transparente e elástico ajudam a perceber a ovulação. Se você tenta engravidar há 12 meses (ou 6 meses, a partir dos 35 anos) sem sucesso, procure orientação.</p>${privacy}`,
  content:`<section class="content-block"><h2>Dicas para quem planeja engravidar</h2><ul><li>Converse com a equipe de saúde sobre ácido fólico antes da concepção.</li><li>Atualize vacinas e faça exames de rotina.</li><li>Relações a cada dois ou três dias ao longo do ciclo aumentam as chances, sem depender de uma data exata.</li><li>Evite álcool e cigarro e mantenha atividade física.</li></ul><p>Depois do positivo, use a <a href="calculadora-parto.html">calculadora de data provável do parto</a>.</p></section>`,
  faq:[['Quantos dias dura o período fértil?','Cerca de seis dias: os cinco dias antes da ovulação e o dia da ovulação.'],['Dá para engravidar fora do período fértil?','A chance é bem menor, mas ciclos podem variar. Por isso, o cálculo não serve como método contraceptivo.'],['Ciclo irregular: a calculadora funciona?','Em ciclos irregulares a estimativa é menos confiável. Testes de ovulação e acompanhamento profissional podem ajudar.']],
  sources:[['NHS — Periods and fertility in the menstrual cycle','https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/']],
  scripts:['tools.js']
},
{
  slug:'ganho-peso-gravidez',icon:'⚖',verb:'ACOMPANHAR',cat:'Gravidez',
  name:'Ganho de peso na gestação',short:'Faixa de ganho de peso recomendada pelo seu IMC e semana.',
  title:'Calculadora de ganho de peso na gravidez por IMC e semana',
  desc:'Calcule o IMC pré-gestacional e veja a faixa de ganho de peso recomendada até o parto e para a sua semana atual, inclusive em gestação de gêmeos.',
  intro:'Informe peso e altura de antes da gravidez para ver a faixa de ganho de peso de referência para a sua semana.',
  panel:`<form id="tool-form"><div class="field-row"><label class="field">Peso antes da gravidez (kg)<input type="number" id="pre-weight" min="30" max="250" step="0.1" inputmode="decimal" required></label><label class="field">Altura (cm)<input type="number" id="height" min="120" max="220" step="1" inputmode="numeric" required></label></div><div class="field-row"><label class="field">Semana atual<input type="number" id="week" min="1" max="42" inputmode="numeric" required></label><label class="field">Peso atual (kg, opcional)<input type="number" id="cur-weight" min="30" max="300" step="0.1" inputmode="decimal"></label></div><label class="check-inline"><input type="checkbox" id="twins"> Gestação de gêmeos</label><button class="button" type="submit">Calcular ganho de peso ↗</button></form>${result}<div id="weight-detail"></div>${noscript}`,
  help:`<h2>De onde vêm as faixas?</h2><p>Usamos as recomendações do Institute of Medicine (IOM, 2009), amplamente adotadas, baseadas no índice de massa corporal (IMC) de antes da gravidez. No primeiro trimestre, considera-se um ganho de 0,5 a 2 kg; depois, um ganho semanal médio que varia conforme o IMC.</p><p>A Caderneta da Gestante do Ministério da Saúde traz curvas brasileiras próprias. A avaliação da sua equipe prevalece sempre.</p>${privacy}`,
  content:`<section class="content-block"><h2>Faixas de ganho de peso total (gestação única)</h2><div class="table-scroll"><table><thead><tr><th>IMC antes da gravidez</th><th>Classificação</th><th>Ganho total</th><th>Por semana (2º e 3º tri)</th></tr></thead><tbody><tr><td>Menor que 18,5</td><td>Baixo peso</td><td>12,5 a 18 kg</td><td>0,44 a 0,58 kg</td></tr><tr><td>18,5 a 24,9</td><td>Adequado</td><td>11,5 a 16 kg</td><td>0,35 a 0,50 kg</td></tr><tr><td>25 a 29,9</td><td>Sobrepeso</td><td>7 a 11,5 kg</td><td>0,23 a 0,33 kg</td></tr><tr><td>30 ou mais</td><td>Obesidade</td><td>5 a 9 kg</td><td>0,17 a 0,27 kg</td></tr></tbody></table></div><p>Para gêmeos, as faixas provisórias do IOM são: IMC adequado, 17 a 25 kg; sobrepeso, 14 a 23 kg; obesidade, 11 a 19 kg.</p><p>Ganho muito rápido de peso, especialmente com inchaço no rosto e nas mãos, deve ser comunicado à equipe. Leia também sobre <a href="../artigos/alimentacao-na-gravidez.html">alimentação na gravidez</a>.</p></section>`,
  faq:[['Quantos quilos posso engordar na gravidez?','Depende do IMC de antes da gestação. Para IMC adequado, a referência é de 11,5 a 16 kg ao longo da gravidez.'],['É normal perder peso no começo da gravidez?','Com enjoos, pode haver pequena perda de peso no primeiro trimestre. Perda importante ou vômitos persistentes devem ser avaliados.'],['Posso fazer dieta na gravidez?','Dietas restritivas não são recomendadas sem acompanhamento. O foco é uma alimentação de qualidade e atividade física orientada.']],
  sources:[['Institute of Medicine — Weight Gain During Pregnancy (2009)','https://nap.nationalacademies.org/catalog/12584/weight-gain-during-pregnancy-reexamining-the-guidelines'],['CDC — Weight Gain During Pregnancy','https://www.cdc.gov/maternal-infant-health/pregnancy-weight/index.html']],
  scripts:['tools.js']
},
{
  slug:'contador-contracoes',icon:'◴',verb:'REGISTRAR',cat:'Gravidez',
  name:'Contador de contrações',short:'Registre duração e intervalo, veja médias e exporte o histórico.',
  title:'Contador de contrações online: duração, intervalo e médias',
  desc:'Cronometre contrações com um toque, veja duração e intervalo médios da última hora e exporte o registro para mostrar à equipe da maternidade.',
  intro:'Toque para iniciar e terminar cada contração. O registro fica salvo neste aparelho até você apagar.',
  panel:`<div class="timer" id="timer" aria-live="off">00:00</div><p id="timer-state" role="status">Toque no botão quando uma contração começar.</p><button class="button big-button" id="contraction-toggle" type="button">Iniciar contração</button><div class="stats" id="contraction-stats"></div><div class="table-scroll"><table><thead><tr><th>Início</th><th>Duração</th><th>Intervalo</th></tr></thead><tbody id="contraction-log"></tbody></table></div><div class="actions"><button class="button secondary" id="download-log" type="button" disabled>Exportar CSV</button><button class="button secondary" id="clear-log" type="button">Apagar registro</button></div>${noscript}`,
  help:`<h2>Como registrar</h2><p>A duração vai do início ao fim de cada contração. O intervalo é contado do início de uma contração até o início da seguinte.</p><p>Muitas maternidades usam como referência, em primeira gestação, contrações regulares a cada cerca de 5 minutos, durando cerca de 1 minuto, por pelo menos 1 hora. <strong>Siga a orientação da sua equipe</strong>, que pode ser diferente para o seu caso.</p><div class="notice">Procure a maternidade imediatamente se a bolsa romper, houver sangramento, redução dos movimentos do bebê ou contrações antes de 37 semanas.</div>${privacy}`,
  content:`<section class="content-block"><h2>Contrações de treinamento x trabalho de parto</h2><p>Contrações de Braxton Hicks são irregulares e não aumentam de intensidade. No trabalho de parto, as contrações ficam mais longas, mais fortes e mais próximas, mesmo com repouso. Saiba mais no artigo <a href="../artigos/sinais-trabalho-parto.html">sinais de trabalho de parto</a>.</p></section>`,
  faq:[['De quanto em quanto tempo ir para a maternidade?','Siga a orientação da sua equipe. Uma referência comum é contrações a cada 5 minutos, durando 1 minuto, por 1 hora, em primeira gestação.'],['O registro fica salvo?','Sim, neste navegador e neste aparelho, até você apagar. Nada é enviado ao Amor de Berço.']],
  sources:[['NHS — Signs that labour has begun','https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/']],
  scripts:['tools.js']
},
{
  slug:'mala-maternidade',icon:'▤',verb:'ORGANIZAR',cat:'Gravidez',
  name:'Mala da maternidade',short:'Lista completa por categoria para marcar, personalizar e imprimir.',
  title:'Mala da maternidade: lista completa para mãe, bebê e acompanhante',
  desc:'Checklist da mala da maternidade com documentos, itens da mãe, do bebê e do acompanhante. Marque, acrescente itens e imprima. Salvo no seu aparelho.',
  intro:'Marque o que já está pronto, acrescente seus próprios itens e imprima. A lista fica salva neste aparelho.',
  panel:`<p id="check-status" role="status"></p><progress class="progress" id="check-progress" max="1" value="0"></progress><div id="checklist"></div><form class="add-item" id="add-item"><label class="field">Acrescentar item<input type="text" id="new-item" maxlength="80" placeholder="Ex.: travesseiro de amamentação"></label><button class="button secondary" type="submit">Adicionar</button></form><div class="actions"><button class="button secondary" data-print type="button">Imprimir lista</button><button class="button secondary" id="reset-check" type="button">Desmarcar tudo</button></div><p id="storage-status" role="status"></p>${noscript}`,
  help:`<h2>Quando arrumar a mala?</h2><p>A sugestão é deixar tudo pronto entre 34 e 36 semanas. Pergunte à maternidade o que ela fornece: algumas oferecem fraldas e roupas hospitalares, outras pedem itens específicos.</p><p>Separe documentos e a caderneta da gestante em uma pasta fácil de pegar.</p>${privacy}`,
  content:'',
  faq:[['Quantas roupinhas levar para a maternidade?','Em geral, de 4 a 6 conjuntos para o bebê, adequados ao clima. Confirme com a maternidade quantos dias costuma durar a internação.'],['O que o acompanhante precisa levar?','Documento, roupas e itens de higiene, carregador e lanches, além do que a maternidade pedir.']],
  sources:[['NHS — Hospital bag checklist','https://www.nhs.uk/start-for-life/pregnancy/preparing-for-labour-and-birth/hospital-bag-checklist/']],
  scripts:['tools.js']
},
{
  slug:'enxoval-bebe',icon:'♢',verb:'PLANEJAR',cat:'Bebê',
  name:'Lista de enxoval do bebê',short:'Checklist do enxoval essencial com quantidades sugeridas.',
  title:'Lista de enxoval do bebê: checklist essencial com quantidades',
  desc:'Checklist de enxoval do bebê com quantidades sugeridas: roupas, higiene, quarto, passeio e alimentação. Marque, personalize e imprima.',
  intro:'Um enxoval enxuto e seguro, com quantidades de referência. Marque o que já tem e ajuste à sua realidade.',
  panel:`<p id="check-status" role="status"></p><progress class="progress" id="check-progress" max="1" value="0"></progress><div id="checklist"></div><form class="add-item" id="add-item"><label class="field">Acrescentar item<input type="text" id="new-item" maxlength="80" placeholder="Ex.: sling"></label><button class="button secondary" type="submit">Adicionar</button></form><div class="actions"><button class="button secondary" data-print type="button">Imprimir lista</button><button class="button secondary" id="reset-check" type="button">Desmarcar tudo</button></div><p id="storage-status" role="status"></p>${noscript}`,
  help:`<h2>Menos é mais</h2><p>Bebês crescem rápido. Compre poucas peças em tamanho RN e mais em P e M. Prefira algodão, roupas fáceis de vestir e itens certificados pelo Inmetro, como berço, bebê-conforto e carrinho.</p><p>Itens de decoração do berço, como protetores, travesseiros e bichinhos, <strong>não</strong> são recomendados para o sono seguro.</p>${privacy}`,
  content:`<section class="content-block"><h2>Dicas para economizar</h2><ul><li>Aceite roupas de família e amigos e faça um chá de fraldas com tamanhos variados.</li><li>Compre o bebê-conforto novo ou de procedência conhecida, sem histórico de acidentes.</li><li>Deixe para depois o que só será usado aos 6 meses, como cadeira de alimentação.</li></ul><p>Leia também: <a href="../artigos/sono-seguro-bebe.html">sono seguro do bebê</a>.</p></section>`,
  faq:[['Quantas fraldas o recém-nascido usa por dia?','Em média, de 8 a 12 trocas por dia nas primeiras semanas.'],['Precisa comprar roupas RN?','Poucas. Muitos bebês usam o tamanho RN por poucas semanas; tamanhos P e M duram mais.']],
  sources:[['Inmetro — Produtos infantis certificados','https://www.gov.br/inmetro/pt-br']],
  scripts:['tools.js']
},
{
  slug:'calendario-vacinas',icon:'✚',verb:'PROTEGER',cat:'Bebê',
  name:'Calendário de vacinas',short:'Datas das vacinas do SUS a partir do nascimento do bebê.',
  title:'Calendário de vacinação do bebê com datas personalizadas (SUS)',
  desc:'Informe a data de nascimento e veja as datas previstas de cada vacina do Calendário Nacional de Vacinação, do nascimento aos 4 anos. Imprima.',
  intro:'Informe a data de nascimento para gerar o calendário com as datas previstas de cada vacina, do nascimento aos 4 anos.',
  panel:`<form id="tool-form"><label class="field">Data de nascimento do bebê<input type="date" id="date" required></label><button class="button" type="submit">Gerar calendário ↗</button></form>${result}<div id="vaccine-table"></div><div class="actions"><button class="button secondary" data-print type="button">Imprimir calendário</button></div>${noscript}`,
  help:`<h2>Como usar</h2><p>As datas mostram quando cada dose fica indicada pela idade. Leve a caderneta da criança à UBS: a equipe confere as doses e pode ajustar o esquema, por exemplo após atrasos.</p><p>O calendário segue o Calendário Nacional de Vacinação da criança. Ele pode mudar; confirme sempre na sua Unidade Básica de Saúde.</p>${privacy}`,
  content:`<section class="content-block"><h2>Saiba mais</h2><p>Leia o guia <a href="../artigos/calendario-vacinacao-bebe.html">calendário de vacinação do bebê</a>, com cuidados no dia da vacina e o que fazer se uma dose atrasar.</p></section>`,
  faq:[['Posso vacinar o bebê com resfriado?','Resfriados leves sem febre alta geralmente não impedem a vacinação. A equipe da sala de vacinas avalia.'],['Perdi a data da vacina, e agora?','Procure a UBS. Em geral o esquema não precisa ser reiniciado.']],
  sources:[['Ministério da Saúde — Calendário de Vacinação','https://www.gov.br/saude/pt-br/vacinacao/calendario']],
  scripts:['tools.js']
},
{
  slug:'idade-bebe',icon:'☺',verb:'DESENVOLVER',cat:'Bebê',
  name:'Idade e marcos do bebê',short:'Idade em meses, idade corrigida e marcos esperados.',
  title:'Calculadora de idade do bebê e idade corrigida, com marcos do desenvolvimento',
  desc:'Calcule a idade do bebê em meses, semanas e dias, a idade corrigida de prematuros e veja os marcos do desenvolvimento esperados para a idade.',
  intro:'Descubra a idade exata do bebê, a idade corrigida em caso de prematuridade e os marcos do desenvolvimento para esta fase.',
  panel:`<form id="tool-form"><label class="field">Data de nascimento<input type="date" id="date" required></label><label class="field">Idade gestacional ao nascer (semanas)<input type="number" id="ga-birth" min="22" max="42" value="40" inputmode="numeric"></label><button class="button" type="submit">Calcular idade ↗</button></form>${result}<div id="milestones"></div>${noscript}`,
  help:`<h2>O que é idade corrigida?</h2><p>Para bebês nascidos antes de 37 semanas, a idade corrigida desconta as semanas que faltaram para 40. Ela é usada para avaliar crescimento e desenvolvimento até cerca de 2 anos. As vacinas seguem a idade cronológica.</p><p>Os marcos indicam o que a maioria das crianças faz em cada idade. Cada bebê tem seu ritmo; dúvidas devem ser levadas ao pediatra.</p>${privacy}`,
  content:`<section class="content-block"><h2>Leia também</h2><p><a href="../artigos/desenvolvimento-bebe-mes-a-mes.html">Desenvolvimento do bebê mês a mês</a> traz os marcos de 0 a 2 anos e dicas de estímulo.</p></section>`,
  faq:[['Até quando usar a idade corrigida?','Em geral, até 2 anos de idade, para avaliar desenvolvimento e crescimento.'],['As vacinas do prematuro seguem a idade corrigida?','Não. Em regra, as vacinas seguem a idade cronológica, salvo orientação específica.']],
  sources:[['CDC — Developmental milestones','https://www.cdc.gov/ncbddd/actearly/milestones/index.html'],['Ministério da Saúde — Saúde da criança','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca']],
  scripts:['tools.js']
},
{
  slug:'diario-bebe',icon:'☾',verb:'REGISTRAR',cat:'Bebê',
  name:'Diário de mamadas e fraldas',short:'Registre mamadas, fraldas e sono e veja o resumo do dia.',
  title:'Diário do bebê: registro de mamadas, fraldas e sono',
  desc:'Anote mamadas (peito esquerdo, direito ou mamadeira), trocas de fralda e sono com um toque. Veja o resumo das últimas 24 horas e exporte em CSV.',
  intro:'Um toque para anotar mamadas, fraldas e sono. Útil nas primeiras semanas e para levar às consultas.',
  panel:`<div class="log-buttons"><button class="button" type="button" data-log="mamada-esquerdo">Peito esquerdo</button><button class="button" type="button" data-log="mamada-direito">Peito direito</button><button class="button" type="button" data-log="mamadeira">Mamadeira</button><button class="button secondary" type="button" data-log="xixi">Fralda xixi</button><button class="button secondary" type="button" data-log="coco">Fralda cocô</button><button class="button secondary" type="button" data-log="sono">Dormiu</button><button class="button secondary" type="button" data-log="acordou">Acordou</button></div><div class="stats" id="diary-stats"></div><div class="table-scroll"><table><thead><tr><th>Horário</th><th>Registro</th><th></th></tr></thead><tbody id="diary-log"></tbody></table></div><div class="actions"><button class="button secondary" id="diary-export" type="button">Exportar CSV</button><button class="button secondary" id="diary-clear" type="button">Apagar tudo</button></div><p id="storage-status" role="status"></p>${noscript}`,
  help:`<h2>O que observar</h2><p>Nas primeiras semanas, é comum o bebê mamar de 8 a 12 vezes em 24 horas. Depois dos primeiros dias, espera-se cerca de 6 ou mais fraldas bem molhadas por dia.</p><p>Poucas fraldas molhadas, bebê muito sonolento que não acorda para mamar ou pele amarelada que aumenta devem ser avaliados rapidamente.</p>${privacy}`,
  content:`<section class="content-block"><h2>Leia também</h2><p><a href="../artigos/amamentacao-primeiros-dias.html">Amamentação nos primeiros dias</a> e <a href="../artigos/colica-do-bebe.html">cólica do bebê</a>.</p></section>`,
  faq:[['Quantas vezes o recém-nascido mama por dia?','Geralmente de 8 a 12 vezes em 24 horas, em livre demanda.'],['Os registros ficam salvos?','Sim, apenas neste navegador e aparelho. Nada é enviado ao Amor de Berço.']],
  sources:[['Ministério da Saúde — Aleitamento materno','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aleitamento-materno']],
  scripts:['tools.js']
},
{
  slug:'nomes-bebe',icon:'♡',verb:'DESCOBRIR',cat:'Bebê',
  name:'Nomes de bebê',short:'Mais de 220 nomes com significado, origem e favoritos.',
  title:'Nomes de bebê com significado: meninas, meninos e unissex',
  desc:'Explore mais de 220 nomes de bebê com significado e origem. Filtre por gênero, origem e inicial, salve favoritos e sorteie inspirações.',
  intro:'Busque por inicial ou trecho, filtre por gênero e origem e salve seus favoritos para conversar em família.',
  panel:`<form id="tool-form"><label class="field">Buscar nome ou significado<input type="search" id="name-search" placeholder="Ex.: Ma, luz, estrela"></label><div class="field-row"><label class="field">Gênero<select id="name-gender"><option value="all">Todos</option><option value="f">Meninas</option><option value="m">Meninos</option><option value="u">Unissex</option></select></label><label class="field">Origem<select id="name-origin"><option value="all">Todas</option></select></label></div><div class="field-row"><label class="field">Tamanho<select id="name-size"><option value="all">Todos</option><option value="short">Curtos (até 4 letras)</option><option value="long">5 letras ou mais</option></select></label><label class="field">Mostrar<select id="name-view"><option value="all">Todos os nomes</option><option value="fav">Só favoritos</option></select></label></div><div class="actions"><button class="button" type="submit">Buscar ↗</button><button class="button secondary" type="button" id="name-random">Sortear um nome</button></div></form>${result}<div class="names" id="names"></div>${noscript}`,
  help:`<h2>Antes de decidir</h2><p>Diga o nome completo em voz alta, com o sobrenome. Pense em apelidos, iniciais e na grafia. Converse sobre o significado e a história de cada nome na família.</p><p>Significados seguem a etimologia tradicional e têm caráter informativo.</p>${privacy}`,
  content:'',
  faq:[['Qual o nome de bebê mais registrado no Brasil?','Rankings de cartórios variam a cada ano. Nomes como Helena, Alice, Miguel e Arthur aparecem com frequência entre os mais registrados nos últimos anos.'],['Os favoritos ficam salvos?','Sim, neste navegador e aparelho.']],
  sources:[['Portal da Transparência do Registro Civil (Arpen Brasil)','https://transparencia.registrocivil.org.br/']],
  scripts:['nomes-data.js','tools.js']
}
];
