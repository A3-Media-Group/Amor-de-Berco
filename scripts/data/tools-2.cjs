// Ferramentas adicionadas após a pesquisa de portais nacionais e internacionais (outubro de 2026).
const privacy = '<div class="notice">Seus dados não são enviados ao Amor de Berço. Cálculos e registros acontecem no seu navegador.</div>';
const noscript = '<noscript><p>Ative o JavaScript para usar esta ferramenta. Os artigos continuam disponíveis sem JavaScript.</p></noscript>';
const result = '<div class="result" id="result" role="status" aria-live="polite"></div>';

module.exports = [
{
  slug:'bebe-mes-a-mes',icon:'☀',verb:'ACOMPANHAR',cat:'Bebê',
  name:'Bebê mês a mês',short:'Desenvolvimento, peso, sono e vacinas de 1 a 24 meses.',
  title:'Bebê mês a mês: desenvolvimento de 1 a 24 meses',
  desc:'Acompanhe o bebê mês a mês: marcos do desenvolvimento, peso e comprimento medianos da OMS, sono, alimentação, vacinas e consultas de 1 a 24 meses.',
  intro:'Informe a data de nascimento para ver o mês atual do bebê, ou escolha um mês para ler sobre desenvolvimento, alimentação, sono e vacinas.',
  panel:`<form id="tool-form"><label class="field">Data de nascimento do bebê<input type="date" id="date" required></label><button class="button" type="submit">Ver o mês do bebê ↗</button></form>${result}<div id="month-card"></div>${noscript}`,
  help:`<h2>Como usar</h2><p>Mostramos o conteúdo do mês que o bebê está completando. Para prematuros, considere a idade corrigida ao avaliar o desenvolvimento; use a ferramenta <a href="idade-bebe.html">idade do bebê</a> para calculá-la.</p><p>Peso e comprimento são medianas dos Padrões de Crescimento da OMS: metade dos bebês saudáveis fica acima e metade abaixo desses valores.</p>${privacy}`,
  content:'MONTH_HUB',
  faq:[['O que o bebê deve fazer em cada mês?','Cada página do bebê mês a mês traz os marcos que a maioria das crianças alcança naquela idade. Variações são normais; perda de habilidades deve ser avaliada.'],['Quantas consultas de puericultura o bebê deve ter?','O Ministério da Saúde recomenda consultas na primeira semana, com 1, 2, 4, 6, 9, 12, 18 e 24 meses, além de outras conforme a necessidade.']],
  sources:[['CDC — Developmental milestones','https://www.cdc.gov/ncbddd/actearly/milestones/index.html'],['OMS — Child growth standards','https://www.who.int/tools/child-growth-standards'],['Ministério da Saúde — Saúde da criança','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca']],
  scripts:['months-data.js','tools.js']
},
{
  slug:'curva-crescimento',icon:'📈',verb:'MEDIR',cat:'Bebê',
  name:'Curva de crescimento (OMS)',short:'Percentil de peso, comprimento e perímetro cefálico de 0 a 5 anos.',
  title:'Calculadora de percentil do bebê: curva de crescimento da OMS',
  desc:'Calcule o percentil e o escore-z de peso, comprimento e perímetro cefálico do bebê de 0 a 5 anos pelas curvas da OMS. Salve medidas e veja o gráfico.',
  intro:'Informe as medidas da consulta para ver o percentil nas curvas da OMS e acompanhar a evolução em um gráfico. As medidas ficam salvas neste aparelho.',
  panel:`<form id="tool-form"><div class="field-row"><label class="field">Sexo<select id="sex"><option value="f">Menina</option><option value="m">Menino</option></select></label><label class="field">Data de nascimento<input type="date" id="date" required></label></div><div class="field-row"><label class="field">Data da medida<input type="date" id="measure-date" required></label><label class="field">Peso (kg)<input type="number" id="weight" min="0.5" max="40" step="0.01" inputmode="decimal"></label></div><div class="field-row"><label class="field">Comprimento ou altura (cm)<input type="number" id="length" min="30" max="130" step="0.1" inputmode="decimal"></label><label class="field">Perímetro cefálico (cm, opcional)<input type="number" id="head" min="25" max="60" step="0.1" inputmode="decimal"></label></div><div class="actions"><button class="button" type="submit">Calcular percentis ↗</button><button class="button secondary" type="button" id="save-measure">Salvar esta medida</button></div></form>${result}<div id="growth-chart"></div><div id="growth-history"></div><p id="storage-status" role="status"></p>${noscript}`,
  help:`<h2>Como interpretar</h2><p>O percentil indica a posição da criança entre 100 crianças saudáveis da mesma idade e sexo. Percentil 50 é a mediana. Entre os percentis 3 e 97 estão as medidas mais comuns.</p><p>Mais importante do que um valor isolado é a <strong>tendência</strong> ao longo das consultas: a criança costuma seguir próxima do mesmo canal. Quedas ou subidas bruscas de canal merecem avaliação. Quem interpreta é o pediatra.</p><p>Para prematuros, use a idade corrigida até cerca de 2 anos.</p>${privacy}`,
  content:`<section class="content-block"><h2>Sobre as curvas da OMS</h2><p>Os Padrões de Crescimento Infantil da OMS (2006) descrevem como crianças saudáveis, amamentadas e com boas condições de vida crescem em diferentes países. São as curvas adotadas pela Caderneta da Criança do Ministério da Saúde para crianças de 0 a 5 anos. A calculadora usa as tabelas LMS oficiais da OMS.</p></section>`,
  faq:[['O que significa percentil 50?','Que metade das crianças da mesma idade e sexo tem medida maior e metade, menor. É a mediana.'],['Percentil baixo é sinal de problema?','Não necessariamente. Muitas crianças saudáveis estão em percentis baixos ou altos. O pediatra avalia a tendência e o contexto.'],['Até que idade a calculadora funciona?','De 0 a 5 anos, faixa coberta pelos Padrões de Crescimento da OMS.']],
  sources:[['OMS — Child growth standards','https://www.who.int/tools/child-growth-standards'],['Ministério da Saúde — Caderneta da Criança','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca']],
  scripts:['oms-crescimento.js','tools.js']
},
{
  slug:'calculadora-beta-hcg',icon:'β',verb:'INTERPRETAR',cat:'Gravidez',
  name:'Calculadora de beta hCG',short:'Faixas de referência por semana e tempo de duplicação.',
  title:'Calculadora de beta hCG: resultado, semanas e duplicação em 48 h',
  desc:'Informe o valor do beta hCG para ver se é positivo, as semanas compatíveis e, com dois exames, o tempo de duplicação. Gratuito e sem cadastro.',
  intro:'Digite o valor do seu exame de beta hCG quantitativo. Com dois resultados, calculamos também o tempo de duplicação.',
  panel:`<form id="tool-form"><label class="field">Beta hCG (mUI/mL)<input type="number" id="hcg1" min="0" max="500000" step="0.1" inputmode="decimal" required></label><details class="inline-details"><summary>Tenho um segundo exame</summary><div class="field-row"><label class="field">Segundo beta hCG (mUI/mL)<input type="number" id="hcg2" min="0" max="500000" step="0.1" inputmode="decimal"></label><label class="field">Horas entre os exames<input type="number" id="hours" min="12" max="168" value="48" inputmode="numeric"></label></div></details><button class="button" type="submit">Interpretar resultado ↗</button></form>${result}<div id="hcg-detail"></div>${noscript}`,
  help:`<h2>Leia com cuidado</h2><p>As faixas por semana são muito amplas e se sobrepõem. O beta hCG <strong>não</strong> define com precisão a idade gestacional: quem faz isso é o ultrassom.</p><p>Um aumento abaixo do esperado, valores estáveis ou em queda precisam de avaliação médica, mas não são diagnóstico isoladamente. Pontos de corte podem variar entre laboratórios: confira o seu laudo.</p><div class="notice">Sangramento, dor forte de um lado da barriga ou desmaio: procure atendimento imediatamente.</div>${privacy}`,
  content:`<section class="content-block"><h2>Leia também</h2><p><a href="../artigos/beta-hcg-resultado.html">Beta hCG: como entender o resultado</a> e <a href="../artigos/primeiros-sintomas-gravidez.html">primeiros sintomas de gravidez</a>.</p></section>`,
  faq:[['Qual valor de beta hCG é positivo?','Em geral, acima de 25 mUI/mL. Entre 5 e 25 é indeterminado e o exame deve ser repetido.'],['O beta hCG deve dobrar em quanto tempo?','No início da gestação, costuma dobrar a cada 48 a 72 horas. O ritmo diminui com valores mais altos.']],
  sources:[['American Pregnancy Association — hCG levels','https://americanpregnancy.org/getting-pregnant/hcg-levels/'],['NHS — Doing a pregnancy test','https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/']],
  scripts:['tools.js']
},
{
  slug:'sexo-do-bebe',icon:'⚥',verb:'DESCOBRIR',cat:'Gravidez',
  name:'Quando saber o sexo do bebê',short:'Datas da sexagem fetal e dos ultrassons pela sua DUM.',
  title:'Quando posso saber o sexo do bebê? Calculadora de datas',
  desc:'Descubra a partir de que data você pode fazer a sexagem fetal e os ultrassons que mostram o sexo do bebê. Entenda também por que a tabela chinesa não funciona.',
  intro:'Informe o primeiro dia da última menstruação (ou a DPP) e veja as datas em que cada exame pode revelar o sexo do bebê.',
  panel:`<form id="tool-form"><fieldset class="segmented"><legend>Calcular a partir de</legend><label><input type="radio" name="base" value="dum" checked> Última menstruação</label><label><input type="radio" name="base" value="dpp"> Data provável do parto</label></fieldset><label class="field" id="date-label">Primeiro dia da última menstruação<input type="date" id="date" required></label><button class="button" type="submit">Ver as datas ↗</button></form>${result}<div id="sex-timeline"></div>${noscript}`,
  help:`<h2>Exames que revelam o sexo</h2><ul><li><strong>Sexagem fetal</strong> (sangue da gestante): a partir de 8 semanas.</li><li><strong>Ultrassom</strong>: sugestão possível no fim do 1º trimestre; mais segura a partir de cerca de 16 semanas.</li><li><strong>Morfológico</strong> (20 a 24 semanas): geralmente confirma, dependendo da posição do bebê.</li></ul><p><strong>Tabela chinesa, formato da barriga e simpatias</strong> não têm comprovação científica: estudos encontraram acertos próximos de 50%, como cara ou coroa.</p>${privacy}`,
  content:`<section class="content-block"><h2>Leia também</h2><p><a href="../artigos/como-saber-sexo-do-bebe.html">Como saber o sexo do bebê: sexagem fetal, ultrassom e mitos</a>.</p></section>`,
  faq:[['Com quantas semanas dá para fazer a sexagem fetal?','A partir de 8 semanas de gestação, contadas da última menstruação.'],['A tabela chinesa acerta o sexo do bebê?','Não há comprovação científica. Em estudos, os acertos foram próximos de 50%, o mesmo que o acaso.']],
  sources:[['Devaney SA et al. — Noninvasive fetal sex determination (JAMA, 2011)','https://pubmed.ncbi.nlm.nih.gov/21828326/'],['NHS — Ultrasound scans in pregnancy','https://www.nhs.uk/pregnancy/your-pregnancy-care/ultrasound-scans/']],
  scripts:['tools.js']
},
{
  slug:'contador-chutes',icon:'👣',verb:'OBSERVAR',cat:'Gravidez',
  name:'Contador de movimentos do bebê',short:'Registre o tempo até 10 movimentos e conheça o padrão do bebê.',
  title:'Contador de chutes e movimentos do bebê: tempo até 10 movimentos',
  desc:'Conte os movimentos do bebê com um toque, veja quanto tempo leva para sentir 10 e compare com os dias anteriores. Salvo no seu aparelho.',
  intro:'Escolha um momento em que o bebê costuma estar ativo, toque a cada movimento e veja quanto tempo levou para sentir 10.',
  panel:`<div class="kick-counter"><div class="timer" id="kick-count" aria-live="polite">0</div><p id="kick-state" role="status">Toque em “Começar” quando estiver pronta.</p><button class="button big-button" id="kick-button" type="button">Começar contagem</button><button class="button secondary" id="kick-stop" type="button" hidden>Encerrar sessão</button></div><div class="stats" id="kick-stats"></div><div class="table-scroll"><table><thead><tr><th>Data</th><th>Movimentos</th><th>Tempo</th></tr></thead><tbody id="kick-log"></tbody></table></div><div class="actions"><button class="button secondary" id="kick-clear" type="button">Apagar histórico</button></div><p id="storage-status" role="status"></p>${noscript}`,
  help:`<h2>Como usar</h2><p>Deite-se de lado ou sente-se confortavelmente. Conte qualquer movimento: chute, giro, empurrão. Ao chegar a 10, a sessão termina e o tempo é salvo.</p><p>Não existe um número “certo” para todos. O objetivo é conhecer o padrão do seu bebê.</p><div class="notice"><strong>Se o bebê estiver se mexendo menos que o habitual, ou o padrão mudar, procure a maternidade no mesmo dia.</strong> Não espere a contagem terminar nem o dia seguinte.</div>${privacy}`,
  content:`<section class="content-block"><h2>Leia também</h2><p><a href="../artigos/movimentos-do-bebe-na-barriga.html">Movimentos do bebê na barriga: quando começam e quando se preocupar</a>.</p></section>`,
  faq:[['A partir de quando contar os movimentos?','Muitas equipes sugerem observar o padrão a partir de cerca de 28 semanas. Siga a orientação do seu pré-natal.'],['O bebê se mexe menos perto do parto?','Não. O tipo de movimento muda, mas a frequência não deve diminuir.']],
  sources:[['NHS — Your baby\'s movements','https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/'],['Count the Kicks — tabela em português','https://countthekicks.org/content/uploads/2024/10/Portuguese-Kick-Chart.pdf']],
  scripts:['tools.js']
},
{
  slug:'licenca-maternidade',icon:'⚖',verb:'PLANEJAR',cat:'Família',
  name:'Licença e salário-maternidade',short:'Data de volta ao trabalho e estimativa do salário-maternidade.',
  title:'Calculadora de licença-maternidade e salário-maternidade 2026',
  desc:'Calcule a data de término da licença-maternidade de 120 ou 180 dias, a volta ao trabalho, a estabilidade e uma estimativa do salário-maternidade em 2026.',
  intro:'Informe o início da licença e a sua situação de trabalho para ver as datas importantes e uma estimativa do benefício.',
  panel:`<form id="tool-form"><label class="field">Início da licença (data do parto ou do afastamento)<input type="date" id="date" required></label><div class="field-row"><label class="field">Duração<select id="leave-days"><option value="120">120 dias (regra geral)</option><option value="180">180 dias (Empresa Cidadã ou serviço público)</option></select></label><label class="field">Situação<select id="worker"><option value="clt">Carteira assinada (CLT)</option><option value="domestica">Empregada doméstica</option><option value="mei">MEI</option><option value="individual">Autônoma / contribuinte individual ou facultativa</option></select></label></div><label class="field" id="salary-label">Salário mensal bruto (R$)<input type="number" id="salary" min="0" step="0.01" inputmode="decimal"></label><label class="check-inline"><input type="checkbox" id="vacation"> Emendar 30 dias de férias após a licença</label><button class="button" type="submit">Calcular datas e valor ↗</button></form>${result}<div id="leave-detail"></div>${noscript}`,
  help:`<h2>Regras usadas</h2><p>A licença conta dias corridos a partir do início. Para CLT, o salário-maternidade corresponde à remuneração integral (com salário variável, usa-se a média dos últimos 6 meses), pago pela empresa. Para MEI, autônomas e facultativas, o INSS paga com base na média das contribuições, limitada ao teto; MEI que contribui sobre o salário mínimo recebe um salário mínimo.</p><p>Valores de 2026: salário mínimo de R$ 1.621,00 e teto do INSS de R$ 8.475,55. Estimativa sem valor oficial: confirme com o RH ou no Meu INSS.</p>${privacy}`,
  content:`<section class="content-block"><h2>Leia também</h2><p><a href="../artigos/licenca-maternidade-direitos-gestante.html">Licença-maternidade e direitos da gestante: guia prático</a>.</p></section>`,
  faq:[['Como calcular a volta da licença-maternidade?','Conte 120 ou 180 dias corridos a partir do início da licença. O retorno é no dia seguinte ao último dia de licença.'],['Quem paga o salário-maternidade?','Para CLT, a empresa paga e compensa com o INSS. Para MEI, autônomas, facultativas e domésticas, o INSS paga diretamente.'],['Até quando vai a estabilidade?','Desde a confirmação da gravidez até cinco meses após o parto.']],
  sources:[['INSS — Salário-maternidade','https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade'],['Planalto — CLT (arts. 391 a 400)','https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm'],['Planalto — Lei 11.770/2008 (Empresa Cidadã)','https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11770.htm']],
  scripts:['tools.js']
},
{
  slug:'plano-de-parto',icon:'✎',verb:'PREPARAR',cat:'Gravidez',
  name:'Plano de parto',short:'Monte suas preferências e imprima para levar à maternidade.',
  title:'Plano de parto online: modelo para preencher e imprimir',
  desc:'Monte seu plano de parto: acompanhante, alívio da dor, ambiente, intervenções, cuidados com o bebê e amamentação. Preencha, salve e imprima.',
  intro:'Marque suas preferências, acrescente observações e imprima para conversar com a equipe do pré-natal e levar à maternidade.',
  panel:`<form id="birth-plan"><label class="field">Seu nome<input type="text" id="bp-name" maxlength="80"></label><div class="field-row"><label class="field">Acompanhante<input type="text" id="bp-companion" maxlength="80"></label><label class="field">Maternidade<input type="text" id="bp-hospital" maxlength="80"></label></div><div id="bp-sections"></div><label class="field">Outras observações<textarea id="bp-notes" rows="4" maxlength="1200"></textarea></label><div class="actions"><button class="button" type="button" id="bp-preview">Gerar plano para imprimir ↗</button><button class="button secondary" type="button" id="bp-clear">Limpar</button></div></form><div id="bp-output" class="bp-output"></div><p id="storage-status" role="status"></p>${noscript}`,
  help:`<h2>Para que serve</h2><p>O plano de parto organiza suas preferências e facilita a conversa com a equipe. Ele não é uma lista de ordens: situações clínicas podem exigir mudanças, sempre com informação e consentimento.</p><p>Discuta o plano no pré-natal e leve cópias para a maternidade. O preenchimento fica salvo neste aparelho.</p>${privacy}`,
  content:'',
  faq:[['O plano de parto é obrigatório?','Não, mas é recomendado pelo Ministério da Saúde como forma de comunicar preferências e participar das decisões.'],['A maternidade precisa seguir o plano?','A equipe deve considerar suas preferências e explicar quando uma situação clínica exigir outra conduta.']],
  sources:[['Ministério da Saúde — Diretrizes de atenção à gestante: operação cesariana e parto normal','https://www.gov.br/conitec/pt-br'],['Planalto — Lei 11.108/2005 (acompanhante)','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11108.htm']],
  scripts:['tools.js']
},
{
  slug:'rotina-sono-bebe',icon:'☾',verb:'ORGANIZAR',cat:'Bebê',
  name:'Rotina de sono do bebê',short:'Horas de sono, sonecas e uma rotina sugerida pela idade.',
  title:'Rotina de sono do bebê por idade: horas, sonecas e janelas de sono',
  desc:'Veja quantas horas o bebê deve dormir, quantas sonecas fazer e o tempo acordado por idade, com uma rotina sugerida a partir do horário em que ele acorda.',
  intro:'Informe a idade do bebê e o horário em que ele costuma acordar para ver uma rotina de referência com sonecas e hora de dormir.',
  panel:`<form id="tool-form"><div class="field-row"><label class="field">Idade do bebê (meses)<input type="number" id="age-months" min="0" max="36" value="4" inputmode="numeric" required></label><label class="field">Acorda pela manhã às<input type="time" id="wake" value="07:00" required></label></div><button class="button" type="submit">Montar rotina ↗</button></form>${result}<div id="sleep-plan"></div>${noscript}`,
  help:`<h2>É uma referência, não uma regra</h2><p>As horas totais seguem as recomendações da American Academy of Sleep Medicine, endossadas pela Academia Americana de Pediatria. Sonecas e janelas de sono são referências práticas: observe os sinais de sono do seu bebê, como bocejar, esfregar os olhos e ficar irritado.</p><p>Recém-nascidos não têm rotina: dormem e mamam em livre demanda.</p><div class="notice">Sono seguro: sempre de barriga para cima, no berço, sem objetos soltos.</div>${privacy}`,
  content:`<section class="content-block"><h2>Horas de sono recomendadas em 24 horas</h2><div class="table-scroll"><table><thead><tr><th>Idade</th><th>Sono total</th><th>Sonecas</th></tr></thead><tbody><tr><td>0 a 3 meses</td><td>14 a 17 horas</td><td>Várias, sem padrão</td></tr><tr><td>4 a 6 meses</td><td>12 a 16 horas</td><td>3</td></tr><tr><td>7 a 12 meses</td><td>12 a 16 horas</td><td>2 a 3</td></tr><tr><td>1 a 2 anos</td><td>11 a 14 horas</td><td>1 a 2</td></tr><tr><td>3 anos</td><td>10 a 13 horas</td><td>0 a 1</td></tr></tbody></table></div><p>Leia também: <a href="../artigos/sono-seguro-bebe.html">sono seguro do bebê</a>.</p></section>`,
  faq:[['Quantas horas um bebê de 6 meses dorme?','Entre 12 e 16 horas em 24 horas, somando noite e sonecas, segundo a American Academy of Sleep Medicine.'],['O que é janela de sono?','É o tempo que o bebê consegue ficar acordado confortavelmente entre um sono e outro. Aumenta com a idade.']],
  sources:[['AASM — Recommended amount of sleep for pediatric populations (2016)','https://jcsm.aasm.org/doi/10.5664/jcsm.5866'],['NHS — Helping your baby to sleep','https://www.nhs.uk/baby/caring-for-a-newborn/helping-your-baby-to-sleep/']],
  scripts:['tools.js']
},
{
  slug:'custo-bebe',icon:'R$',verb:'ORÇAR',cat:'Família',
  name:'Quanto custa um bebê',short:'Estime os gastos do primeiro ano com valores editáveis.',
  title:'Quanto custa um bebê no primeiro ano? Calculadora de gastos',
  desc:'Estime os custos do primeiro ano do bebê: enxoval, fraldas, alimentação, saúde, creche e outros. Valores editáveis para a sua realidade.',
  intro:'Ajuste os valores à sua realidade e veja o gasto estimado do primeiro ano, por mês e por categoria.',
  panel:`<form id="tool-form"><div id="cost-fields"></div><button class="button" type="submit">Calcular orçamento ↗</button></form>${result}<div id="cost-detail"></div>${noscript}`,
  help:`<h2>Sobre os valores</h2><p>Os valores iniciais são exemplos para ponto de partida, não médias oficiais. Preços variam muito por região e escolhas. Edite cada campo; coloque zero no que não se aplica, como fórmula para bebês amamentados ou creche.</p><p>Itens usados, doações e chá de fraldas reduzem bastante o custo.</p>${privacy}`,
  content:`<section class="content-block"><h2>Dicas para economizar</h2><ul><li>Organize um chá de fraldas com tamanhos variados: use a <a href="cha-de-fraldas.html">calculadora de chá de fraldas</a>.</li><li>Priorize o essencial com a <a href="enxoval-bebe.html">lista de enxoval</a>.</li><li>A amamentação reduz gastos com fórmula e mamadeiras.</li><li>Vacinas, consultas de puericultura e testes do recém-nascido são gratuitos no SUS.</li></ul></section>`,
  faq:[['Quanto custa um bebê por mês?','Depende muito da região e das escolhas. Fraldas, alimentação, saúde e creche são as maiores despesas. Use a calculadora com os preços da sua cidade.']],
  sources:[['Ministério da Saúde — Saúde da criança','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca']],
  scripts:['tools.js']
},
{
  slug:'cha-de-fraldas',icon:'♢',verb:'ORGANIZAR',cat:'Família',
  name:'Calculadora de chá de fraldas',short:'Quantos pacotes de cada tamanho pedir aos convidados.',
  title:'Calculadora de chá de fraldas: quantidade por tamanho e convidados',
  desc:'Descubra quantas fraldas de cada tamanho (RN, P, M, G) pedir no chá de fraldas e como dividir entre os convidados. Gratuito e sem cadastro.',
  intro:'Informe o número de convidados e quantos pacotes cada um vai levar. Sugerimos a divisão por tamanho para os primeiros meses.',
  panel:`<form id="tool-form"><div class="field-row"><label class="field">Número de convidados<input type="number" id="guests" min="1" max="500" value="30" inputmode="numeric" required></label><label class="field">Pacotes por convidado<input type="number" id="packs" min="1" max="5" value="1" inputmode="numeric" required></label></div><label class="field">Fraldas por pacote (média)<input type="number" id="per-pack" min="10" max="200" value="40" inputmode="numeric" required></label><button class="button" type="submit">Dividir por tamanho ↗</button></form>${result}<div id="diaper-detail"></div><div class="actions"><button class="button secondary" data-print type="button">Imprimir divisão</button></div>${noscript}`,
  help:`<h2>Como dividimos</h2><p>Recém-nascidos usam poucas fraldas RN, porque crescem rápido. A maior parte do primeiro ano é com os tamanhos M e G. Usamos a proporção de referência: RN 10%, P 25%, M 35% e G 30%.</p><p>Peça tamanhos variados e prefira marcas diferentes em pequenas quantidades até descobrir qual funciona melhor para o bebê.</p>${privacy}`,
  content:'',
  faq:[['Quantas fraldas RN pedir no chá?','Poucas: em geral 2 a 4 pacotes, porque o tamanho RN serve por pouco tempo.'],['Quantas fraldas um bebê usa no primeiro ano?','Em média de 2.000 a 3.000, com mais trocas nos primeiros meses.']],
  sources:[['Ministério da Saúde — Saúde da criança','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca']],
  scripts:['tools.js']
}
];
