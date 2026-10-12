'use strict';
const DAY=86400000;
// Toda a matemática de calendário usa UTC para evitar horário de verão e fusos.
function parseDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))throw Error('Preencha uma data válida.');const [y,m,d]=value.split('-').map(Number);const t=Date.UTC(y,m-1,d);const a=new Date(t);if(y<1900||y>2200||a.getUTCFullYear()!==y||a.getUTCMonth()!==m-1||a.getUTCDate()!==d)throw Error('Confira a data informada.');return t;}
function todayValue(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function isoOf(ms){return new Date(ms).toISOString().slice(0,10);}
function dateText(ms){return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'}).format(ms);}
function shortDate(ms){return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'UTC'}).format(ms);}
function el(tag,attrs={},...kids){const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else e.setAttribute(k,v);}for(const k of kids)if(k!=null)e.append(k);return e;}
function plural(n,s,p){return `${n} ${n===1?s:p}`;}
function store(key,value){try{if(value===undefined)return JSON.parse(localStorage.getItem(key)||'null');if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){const s=document.querySelector('#storage-status');if(s)s.textContent='O navegador bloqueou o salvamento. A ferramenta funciona nesta sessão; imprima ou exporte para guardar.';return null;}}
function downloadFile(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=el('a',{href:url,download:name});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const tool=document.querySelector('[data-tool]')?.dataset.tool;
const resultBox=document.querySelector('#result');
function showResult(title,detail){if(!resultBox)return;resultBox.replaceChildren(el('strong',{text:title}));(Array.isArray(detail)?detail:[detail]).filter(Boolean).forEach(t=>resultBox.append(el('p',{text:t})));}
const form=document.querySelector('#tool-form');
const inputDate=document.querySelector('#date');
function onSubmit(fn){form?.addEventListener('submit',e=>{e.preventDefault();try{fn();}catch(err){showResult('Confira os dados',err.message);const c=document.querySelector('#week-card');if(c)c.replaceChildren();}});}
const today=()=>parseDate(todayValue());

// ---------- Semanas ----------
const tri=w=>w<=13?1:w<=27?2:3;
const monthOf=w=>w<=4?1:w<=8?2:w<=13?3:w<=17?4:w<=22?5:w<=27?6:w<=31?7:w<=35?8:9;
// Semana em curso: com 12 semanas e 3 dias, a gestante está na 13ª semana; mostramos o conteúdo das semanas completas.
function weekCard(weeks){const card=document.querySelector('#week-card');if(!card||!window.WEEKS)return;const w=Math.min(42,Math.max(1,weeks));const d=window.WEEKS[w-1];
  card.replaceChildren(el('div',{class:'size-card'},el('span',{class:'size-emoji','aria-hidden':'true',text:d.e}),el('div',{},el('span',{class:'label',text:`${w} semana${w>1?'s':''} · tamanho aproximado`}),el('strong',{text:d.f}),el('p',{text:d.l!=='—'?`Comprimento: ${d.l} · Peso: ${d.p}`:'Ainda sem medidas'}))),
  el('div',{class:'week-progress'},el('progress',{max:'40',value:String(Math.min(w,40))}),el('span',{text:`${Math.round(Math.min(w,40)/40*100)}% da gestação`})),
  el('h3',{text:'O bebê nesta semana'}),el('p',{text:d.b}),el('h3',{text:'No seu corpo'}),el('p',{text:d.m}),
  el('a',{class:'button',href:`../gravidez/${d.s}.html`,text:`Ler tudo sobre ${w} semana${w>1?'s':''} ↗`}));}
function gaText(days){const w=Math.floor(days/7),d=days%7;return `${plural(w,'semana','semanas')} e ${plural(d,'dia','dias')}`;}

if(tool==='gravidez-semana-a-semana'){
  const label=document.querySelector('#date-label');const setBase=()=>{const b=form.base.value;label.firstChild.textContent=b==='dpp'?'Data provável do parto (DPP)':'Primeiro dia da última menstruação';if(b==='dpp')inputDate.removeAttribute('max');else inputDate.max=todayValue();};
  form.querySelectorAll('[name=base]').forEach(r=>r.addEventListener('change',setBase));setBase();
  onSubmit(()=>{const date=parseDate(inputDate.value);const t=today();let dum=date;if(form.base.value==='dpp')dum=date-280*DAY;else if(date>t)throw Error('A última menstruação não pode estar no futuro.');const days=Math.round((t-dum)/DAY);if(days<0)throw Error('Pela data informada, a gestação ainda não começou. Confira a data.');if(days>300)throw Error('O intervalo ultrapassa 42 semanas e 6 dias. Confira as datas com sua equipe de saúde.');const w=Math.floor(days/7);const dpp=dum+280*DAY;const left=Math.round((dpp-t)/DAY);
    showResult(gaText(days),[`${tri(Math.max(1,w))}º trimestre · aproximadamente ${monthOf(Math.max(1,w))}º mês`,`Data provável do parto: ${dateText(dpp)} (${left>0?`faltam ${plural(left,'dia','dias')}`:left===0?'é hoje':`passou há ${plural(-left,'dia','dias')}`}).`,'Estimativa. A datação do pré-natal prevalece.']);weekCard(w);});
  const q=new URLSearchParams(location.search).get('dum');if(q&&/^\d{4}-\d{2}-\d{2}$/.test(q)){inputDate.value=q;form.requestSubmit();}
}

if(tool==='semanas-gravidez'){
  const ref=document.querySelector('#reference');ref.value=todayValue();inputDate.max=todayValue();
  onSubmit(()=>{const date=parseDate(inputDate.value);if(date>today())throw Error('A última menstruação não pode estar no futuro.');const days=Math.round((parseDate(ref.value)-date)/DAY);if(days<0)throw Error('A data de referência deve ser igual ou posterior à última menstruação.');if(days>300)throw Error('O intervalo ultrapassa 42 semanas e 6 dias. Confira as datas com sua equipe de saúde.');const w=Math.floor(days/7);
    showResult(gaText(days),[`${tri(Math.max(1,w))}º trimestre · aproximadamente ${monthOf(Math.max(1,w))}º mês de gestação.`,`Data provável do parto: ${dateText(date+280*DAY)}.`,'Idade gestacional estimada pela última menstruação na data de referência escolhida.']);weekCard(w);});
}

if(tool==='calculadora-parto'){
  const method=document.querySelector('#method'),text=document.querySelector('#date-text'),cycleRow=document.querySelector('#cycle-row'),usRow=document.querySelector('#us-row');
  const labels={dum:'Primeiro dia da última menstruação',conception:'Data da concepção',us:'Data do ultrassom',ivf3:'Data da transferência do embrião',ivf5:'Data da transferência do embrião'};
  const sync=()=>{text.textContent=labels[method.value];cycleRow.hidden=method.value!=='dum';usRow.hidden=method.value!=='us';document.querySelector('#cycle').required=method.value==='dum';inputDate.max=todayValue();};method.addEventListener('change',sync);sync();
  let events=[];
  onSubmit(()=>{const date=parseDate(inputDate.value);const t=today();if(date>t)throw Error('A data informada não pode estar no futuro.');let dpp;
    if(method.value==='dum'){const cycle=Number(document.querySelector('#cycle').value);if(!Number.isInteger(cycle)||cycle<21||cycle>35)throw Error('Use um ciclo inteiro entre 21 e 35 dias. Para outros ciclos, prefira a datação por ultrassom.');dpp=date+(280+cycle-28)*DAY;}
    else if(method.value==='conception')dpp=date+266*DAY;
    else if(method.value==='us'){const w=Number(document.querySelector('#us-weeks').value),d=Number(document.querySelector('#us-days').value);if(!Number.isInteger(w)||w<4||w>40||!Number.isInteger(d)||d<0||d>6)throw Error('Informe semanas entre 4 e 40 e dias entre 0 e 6.');dpp=date-(w*7+d)*DAY+280*DAY;}
    else dpp=date+(method.value==='ivf3'?263:261)*DAY;
    const dum=dpp-280*DAY;const days=Math.round((t-dum)/DAY);if(days>300)throw Error('Pela data informada, a gestação já passou de 42 semanas e 6 dias. Confira os dados.');
    showResult(dateText(dpp),['Data provável do parto. É uma estimativa: a maioria dos bebês nasce entre 37 e 42 semanas.',days>=0?`Hoje: ${gaText(days)} de gestação (${tri(Math.max(1,Math.floor(days/7)))}º trimestre).`:'']);
    const marks=[[11*7,13*7+6,'Ultrassom com translucência nucal (se indicado)'],[13*7+6,null,'Fim do 1º trimestre'],[20*7,null,'Vacina dTpa a partir de hoje'],[20*7,24*7,'Ultrassom morfológico do 2º trimestre'],[24*7,28*7,'Teste de tolerância à glicose (TOTG)'],[28*7,null,'Início do 3º trimestre'],[35*7,37*7,'Pesquisa de estreptococo do grupo B (conforme protocolo)'],[37*7,null,'Gestação a termo'],[280,null,'Data provável do parto'],[41*7,null,'41 semanas: avaliação com a equipe'],[42*7,null,'42 semanas: pós-termo']];
    events=marks.map(([a,b,l])=>({start:dum+a*DAY,end:b?dum+b*DAY:null,label:l}));
    const list=el('ol',{class:'timeline'});for(const e of events){const past=(e.end||e.start)<t;list.append(el('li',{class:past?'past':''},el('strong',{text:e.end?`${shortDate(e.start)} a ${shortDate(e.end)}`:shortDate(e.start)}),el('span',{text:` ${e.label}${past?' (já passou)':''}`})));}
    const ics=el('button',{class:'button secondary',type:'button',text:'Adicionar ao meu calendário (.ics)'});ics.addEventListener('click',()=>{const f=ms=>isoOf(ms).replaceAll('-','');const stamp=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';const body=events.map((e,i)=>`BEGIN:VEVENT\r\nUID:amordeberco-${f(dpp)}-${i}@amordeberco.com.br\r\nDTSTAMP:${stamp}\r\nDTSTART;VALUE=DATE:${f(e.start)}\r\nDTEND;VALUE=DATE:${f((e.end||e.start)+DAY)}\r\nSUMMARY:${e.label}\r\nEND:VEVENT`).join('\r\n');downloadFile('amor-de-berco-gestacao.ics',`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Amor de Berco//PT-BR\r\n${body}\r\nEND:VCALENDAR\r\n`,'text/calendar;charset=utf-8');});
    const wk=Math.max(1,Math.min(42,Math.floor(Math.max(days,0)/7)));const link=window.WEEKS?el('a',{class:'button',href:`../gravidez/${window.WEEKS[wk-1].s}.html`,text:`Ver a semana ${wk} ↗`}):null;
    document.querySelector('#timeline').replaceChildren(el('h3',{text:'Seu cronograma de pré-natal'}),list,el('div',{class:'actions'},link,ics),el('p',{class:'small',text:'Datas de referência. Sua equipe pode indicar outros exames e prazos.'}));});
}

if(tool==='periodo-fertil'){
  inputDate.max=todayValue();
  onSubmit(()=>{const date=parseDate(inputDate.value);if(date>today())throw Error('A última menstruação não pode estar no futuro.');const cycle=Number(document.querySelector('#cycle').value);if(!Number.isInteger(cycle)||cycle<21||cycle>35)throw Error('Use um ciclo inteiro entre 21 e 35 dias. Para outros ciclos, procure orientação individual.');
    const ov=date+(cycle-14)*DAY;showResult(`${dateText(ov-5*DAY)} a ${dateText(ov+DAY)}`,[`Janela fértil aproximada do ciclo atual. Ovulação estimada: ${dateText(ov)}.`,`Próxima menstruação estimada: ${dateText(date+cycle*DAY)}.`,'Não use para evitar gravidez.']);
    const tb=el('tbody');for(let i=0;i<4;i++){const start=date+i*cycle*DAY,o=start+(cycle-14)*DAY;tb.append(el('tr',{},el('td',{text:shortDate(start)}),el('td',{text:`${shortDate(o-5*DAY)} a ${shortDate(o+DAY)}`}),el('td',{text:shortDate(o)}),el('td',{text:shortDate(o-14*DAY+280*DAY)})));}
    document.querySelector('#cycles').replaceChildren(el('h3',{text:'Próximos ciclos'}),el('div',{class:'table-scroll'},el('table',{},el('thead',{},el('tr',{},el('th',{text:'Menstruação'}),el('th',{text:'Janela fértil'}),el('th',{text:'Ovulação'}),el('th',{text:'DPP se engravidar'}))),tb)));});
}

if(tool==='ganho-peso-gravidez'){
  const single=[[12.5,18,.44,.58,'baixo peso'],[11.5,16,.35,.50,'peso adequado'],[7,11.5,.23,.33,'sobrepeso'],[5,9,.17,.27,'obesidade']];const twins=[null,[17,25],[14,23],[11,19]];
  onSubmit(()=>{const pre=Number(document.querySelector('#pre-weight').value),h=Number(document.querySelector('#height').value)/100,w=Number(document.querySelector('#week').value),cur=document.querySelector('#cur-weight').value?Number(document.querySelector('#cur-weight').value):null,tw=document.querySelector('#twins').checked;
    if(!(pre>=30&&pre<=250))throw Error('Informe o peso de antes da gravidez entre 30 e 250 kg.');if(!(h>=1.2&&h<=2.2))throw Error('Informe a altura em centímetros, entre 120 e 220.');if(!Number.isInteger(w)||w<1||w>42)throw Error('Informe a semana atual entre 1 e 42.');
    const bmi=pre/(h*h);const c=bmi<18.5?0:bmi<25?1:bmi<30?2:3;const r=single[c];
    if(tw&&!twins[c])throw Error('Não há faixa de referência do IOM para gestação de gêmeos com IMC abaixo de 18,5. Converse com sua equipe.');
    const total=tw?twins[c]:[r[0],r[1]];
    // 1º trimestre: 0,5 a 2 kg até a 13ª semana; depois, ritmo semanal (único) ou interpolação até o total (gêmeos).
    const range=wk=>{let lo,hi;if(wk<=13){lo=.5*wk/13;hi=2*wk/13;}else if(tw){const f=(wk-13)/27;lo=.5+(total[0]-.5)*f;hi=2+(total[1]-2)*f;}else{lo=.5+r[2]*(wk-13);hi=2+r[3]*(wk-13);}if(wk>=40){lo=total[0];hi=total[1];}return [Math.min(lo,total[0]),Math.min(hi,total[1])];};
    const [lo,hi]=range(w);const n=x=>x.toLocaleString('pt-BR',{maximumFractionDigits:1});
    const lines=[`IMC pré-gestacional: ${n(bmi)} (${r[4]}).`,`Ganho total de referência até o parto: ${n(total[0])} a ${n(total[1])} kg${tw?' (gêmeos)':''}.`];
    if(cur){const g=cur-pre;lines.push(`Seu ganho até agora: ${g>=0?'+':''}${n(g)} kg. ${g<lo-.5?'Abaixo da faixa de referência para a semana.':g>hi+.5?'Acima da faixa de referência para a semana.':'Dentro ou próximo da faixa de referência para a semana.'} Converse com a equipe sobre o resultado.`);}
    showResult(`${n(lo)} a ${n(hi)} kg na semana ${w}`,lines);
    const tb=el('tbody');for(const wk of [8,13,20,24,28,32,36,40]){const [a,b]=range(wk);tb.append(el('tr',{class:wk===w?'current':''},el('td',{text:`${wk} semanas`}),el('td',{text:`${n(a)} a ${n(b)} kg`}),el('td',{text:`${n(pre+a)} a ${n(pre+b)} kg`})));}
    document.querySelector('#weight-detail').replaceChildren(el('h3',{text:'Referência ao longo da gestação'}),el('div',{class:'table-scroll'},el('table',{},el('thead',{},el('tr',{},el('th',{text:'Semana'}),el('th',{text:'Ganho acumulado'}),el('th',{text:'Peso estimado'}))),tb)));});
}

// ---------- Checklists ----------
function checklist(key,groups){
  const list=document.querySelector('#checklist');const saved=store(key)||{};const state={checked:Array.isArray(saved.checked)?saved.checked.filter(x=>typeof x==='string'):[],custom:Array.isArray(saved.custom)?saved.custom.filter(x=>typeof x==='string').slice(0,60):[]};
  function save(){store(key,state.checked.length||state.custom.length?state:null);}
  function update(persist){const boxes=[...list.querySelectorAll('input')];state.checked=boxes.filter(b=>b.checked).map(b=>b.value);document.querySelector('#check-status').textContent=`${state.checked.length} de ${boxes.length} itens prontos`;const p=document.querySelector('#check-progress');p.max=boxes.length||1;p.value=state.checked.length;if(persist)save();}
  function render(){list.replaceChildren();const all=[...groups,['Meus itens',state.custom.map((t,i)=>[t,'c'+i])]];all.forEach(([title,items],gi)=>{if(!items.length)return;const fs=el('fieldset',{class:'check-group'},el('legend',{text:title}));items.forEach((it,ii)=>{const [text,id]=Array.isArray(it)?it:[it,`${gi}-${ii}`];const input=el('input',{type:'checkbox',value:id});input.checked=state.checked.includes(id);input.addEventListener('change',()=>update(true));const row=el('label',{class:'check-row'},input,el('span',{text}));if(id.startsWith('c')){const del=el('button',{type:'button',class:'link-button','aria-label':`Remover ${text}`,text:'remover'});del.addEventListener('click',e=>{e.preventDefault();state.custom.splice(Number(id.slice(1)),1);state.checked=state.checked.filter(x=>!x.startsWith('c'));save();render();});row.append(del);}fs.append(row);});list.append(fs);});update(false);}
  document.querySelector('#add-item').addEventListener('submit',e=>{e.preventDefault();const i=document.querySelector('#new-item');const v=i.value.trim();if(!v)return;state.custom.push(v.slice(0,80));i.value='';save();render();});
  document.querySelector('#reset-check').addEventListener('click',()=>{state.checked=[];save();render();});render();
}
if(tool==='mala-maternidade')checklist('amor-berco-mala-v2',[
  ['Documentos',['Documento com foto','Cartão SUS ou carteirinha do convênio','Caderneta da gestante e exames','Plano de parto, se houver','Documento do acompanhante']],
  ['Para a gestante',['2 ou 3 camisolas ou pijamas com abertura para amamentar','Calcinhas confortáveis de cintura alta','Sutiãs de amamentação','Absorventes pós-parto','Chinelo e meias','Itens de higiene pessoal (escova, pasta, xampu, desodorante)','Medicamentos em uso, conforme orientação da equipe','Roupa confortável para a saída','Celular e carregador com cabo longo','Garrafa de água e lanches permitidos']],
  ['Para o bebê',['4 a 6 conjuntos de body e calça (RN e P)','Macacões','Meias e luvas','Gorro, se fizer frio','Manta ou cueiro','Fraldas RN, se a maternidade pedir','Algodão ou lenços sem perfume','Roupa de saída da maternidade','Bebê-conforto instalado no carro']],
  ['Para o acompanhante',['Muda de roupa','Itens de higiene','Agasalho','Lanches','Carregador']]]);
if(tool==='enxoval-bebe')checklist('amor-berco-enxoval-v1',[
  ['Roupas',['Bodies de manga curta (6 a 8, tamanhos P e M)','Bodies de manga longa (6 a 8)','Calças ou mijões (6 a 8)','Macacões (4 a 6)','Meias (6 pares)','Casaquinhos (2 a 3)','Gorros (2, para dias frios)','Luvas (2 pares)','Saco de dormir ou mantas leves (2 a 3)']],
  ['Higiene e saúde',['Fraldas descartáveis RN, P e M (ou 15 a 20 fraldas de pano)','Algodão ou lenços sem perfume','Pomada para assaduras, conforme orientação','Banheira','Toalhas com capuz (3)','Sabonete líquido neutro infantil','Termômetro digital','Cortador ou tesourinha de unhas infantil','Escova de cabelo macia','Álcool 70% ou o que a maternidade orientar para o coto umbilical']],
  ['Quarto e sono seguro',['Berço com certificação do Inmetro','Colchão firme do tamanho exato do berço','Lençóis com elástico (3 a 4)','Trocador ou superfície segura para trocas','Cômoda ou organizador de roupas','Luz noturna suave']],
  ['Passeio',['Bebê-conforto (cadeirinha do grupo 0+)','Carrinho','Bolsa de maternidade','Sling ou canguru ergonômico (opcional)']],
  ['Alimentação',['Paninhos de boca (6 a 10)','Almofada de amamentação (opcional)','Bomba tira-leite, se houver necessidade','Mamadeiras, somente se houver indicação']]]);

// ---------- Contrações ----------
const mmss=ms=>{const n=Math.floor(ms/1000);return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;};
if(tool==='contador-contracoes'){
  const KEY='amor-berco-contracoes-v1';let rows=(store(KEY)||[]).filter(r=>r&&Number.isFinite(r.start)&&Number.isFinite(r.duration));let start=null,tick=null;
  const button=document.querySelector('#contraction-toggle'),timer=document.querySelector('#timer'),state=document.querySelector('#timer-state');
  function stats(){const box=document.querySelector('#contraction-stats');const hour=Date.now()-3600000;const recent=rows.filter(r=>r.start>=hour);if(!recent.length){box.replaceChildren();return;}const avgD=recent.reduce((s,r)=>s+r.duration,0)/recent.length;const ints=recent.map(r=>r.interval).filter(x=>x!==null);const avgI=ints.length?ints.reduce((s,x)=>s+x,0)/ints.length:null;
    box.replaceChildren(el('div',{},el('span',{class:'label',text:'Última hora'}),el('strong',{text:String(recent.length)}),el('small',{text:'contrações'})),el('div',{},el('span',{class:'label',text:'Duração média'}),el('strong',{text:mmss(avgD)}),el('small',{text:'min:seg'})),el('div',{},el('span',{class:'label',text:'Intervalo médio'}),el('strong',{text:avgI?mmss(avgI):'—'}),el('small',{text:'min:seg'})));}
  function render(){const log=document.querySelector('#contraction-log');log.replaceChildren();if(!rows.length)log.append(el('tr',{},el('td',{colspan:'3',text:'Seu registro aparecerá aqui.'})));for(const r of [...rows].reverse())log.append(el('tr',{},el('td',{text:new Date(r.start).toLocaleTimeString('pt-BR')}),el('td',{text:mmss(r.duration)}),el('td',{text:r.interval===null?'—':mmss(r.interval)})));document.querySelector('#download-log').disabled=!rows.length;stats();}
  button.addEventListener('click',()=>{if(start===null){start=Date.now();button.textContent='Terminar contração';button.classList.add('active');state.textContent='Contração em andamento. Toque ao terminar.';tick=setInterval(()=>timer.textContent=mmss(Date.now()-start),250);}else{const end=Date.now();rows.push({start,duration:Math.max(0,end-start),interval:rows.length?start-rows[rows.length-1].start:null});clearInterval(tick);timer.textContent=mmss(end-start);start=null;button.textContent='Iniciar contração';button.classList.remove('active');state.textContent='Contração registrada. Toque novamente quando a próxima começar.';store(KEY,rows.slice(-200));render();}});
  document.querySelector('#clear-log').addEventListener('click',()=>{if((rows.length||start!==null)&&!confirm('Apagar o histórico e cancelar a contração em andamento?'))return;clearInterval(tick);start=null;rows=[];store(KEY,null);timer.textContent='00:00';state.textContent='Registro apagado.';button.textContent='Iniciar contração';button.classList.remove('active');render();});
  document.querySelector('#download-log').addEventListener('click',()=>downloadFile('amor-de-berco-contracoes.csv','﻿Início;Duração (segundos);Intervalo entre inícios (segundos)\r\n'+rows.map(r=>`${new Date(r.start).toLocaleString('pt-BR')};${Math.round(r.duration/1000)};${r.interval===null?'':Math.round(r.interval/1000)}`).join('\r\n'),'text/csv;charset=utf-8'));
  window.addEventListener('beforeunload',e=>{if(start!==null){e.preventDefault();e.returnValue='';}});
  setInterval(stats,30000);render();
}

// ---------- Vacinas ----------
function addMonths(ms,m){const d=new Date(ms);const y=d.getUTCFullYear(),mo=d.getUTCMonth()+m,day=d.getUTCDate();const last=new Date(Date.UTC(y,mo+1,0)).getUTCDate();return Date.UTC(y,mo,Math.min(day,last));}
const VACCINES=[[0,'Ao nascer','BCG; Hepatite B'],[2,'2 meses','Penta (DTP/Hib/Hepatite B) 1ª dose; VIP (poliomielite) 1ª dose; Pneumocócica 10-valente 1ª dose; Rotavírus 1ª dose'],[3,'3 meses','Meningocócica C 1ª dose'],[4,'4 meses','Penta 2ª dose; VIP 2ª dose; Pneumocócica 10-valente 2ª dose; Rotavírus 2ª dose'],[5,'5 meses','Meningocócica C 2ª dose'],[6,'6 meses','Penta 3ª dose; VIP 3ª dose; Influenza (anual, na campanha); Covid-19, conforme esquema vigente'],[9,'9 meses','Febre amarela'],[12,'12 meses','Tríplice viral 1ª dose; Pneumocócica 10-valente reforço; Meningocócica reforço'],[15,'15 meses','DTP 1º reforço; VIP reforço; Hepatite A; Tetraviral (ou tríplice viral + varicela)'],[48,'4 anos','DTP 2º reforço; Febre amarela reforço; Varicela 2ª dose']];
if(tool==='calendario-vacinas'){
  inputDate.max=todayValue();
  onSubmit(()=>{const birth=parseDate(inputDate.value);const t=today();if(birth>t)throw Error('A data de nascimento não pode estar no futuro.');if(t-birth>8*365*DAY)throw Error('Este calendário cobre do nascimento aos 4 anos. Para crianças maiores, consulte a UBS.');
    let next=null;const tb=el('tbody');for(const [m,label,vac] of VACCINES){const d=addMonths(birth,m);const past=d<=t;let cls=past?'past':'';if(!past&&!next){next={d,label};cls='current';}tb.append(el('tr',{class:cls},el('td',{text:label}),el('td',{text:shortDate(d)}),el('td',{text:vac}),el('td',{text:past?'Já indicada: confira a caderneta':'Prevista'})));}
    showResult(next?`Próximas vacinas: ${next.label}`:'Calendário até 4 anos já alcançado',[next?`A partir de ${dateText(next.d)}.`:'Confira na caderneta se todas as doses foram aplicadas.','Datas por idade. A UBS confirma e ajusta o esquema.']);
    document.querySelector('#vaccine-table').replaceChildren(el('div',{class:'table-scroll'},el('table',{},el('thead',{},el('tr',{},el('th',{text:'Idade'}),el('th',{text:'Data prevista'}),el('th',{text:'Vacinas'}),el('th',{text:'Situação'}))),tb)));});
}

// ---------- Idade do bebê ----------
const MILESTONES=[[0,'o primeiro mês',['Reage a sons altos','Olha para rostos próximos','Mama e dorme em ciclos curtos']],[2,'2 meses',['Sorri quando alguém fala com ele','Acalma-se com a voz de quem cuida','Levanta a cabeça de bruços']],[4,'4 meses',['Sustenta a cabeça firme no colo','Leva as mãos à boca','Faz sons como “aaa” e ri']],[6,'6 meses',['Rola de barriga para cima e para baixo','Leva objetos à boca','Reconhece pessoas próximas','Pronto para iniciar a introdução alimentar']],[9,'9 meses',['Senta sem apoio','Balbucia “mamama”, “bababa”','Reage ao próprio nome','Passa objetos de uma mão para a outra']],[12,'12 meses',['Puxa-se para ficar de pé','Anda segurando nos móveis','Dá tchau','Faz pinça com polegar e indicador']],[15,'15 meses',['Dá alguns passos sozinho','Usa algumas palavras','Aponta para pedir algo']],[18,'18 meses',['Anda sem apoio','Usa várias palavras','Imita tarefas da casa','Come com colher, com ajuda']],[24,'2 anos',['Corre e chuta bola','Junta duas palavras','Aponta partes do corpo','Brinca com mais de um brinquedo']]];
function ageParts(from,to){const a=new Date(from),b=new Date(to);let months=(b.getUTCFullYear()-a.getUTCFullYear())*12+b.getUTCMonth()-a.getUTCMonth();if(b.getUTCDate()<a.getUTCDate())months--;return {months,days:Math.round((to-addMonths(from,months))/DAY)};}
function ageText(p){const y=Math.floor(p.months/12),m=p.months%12;return [y?plural(y,'ano','anos'):'',m?plural(m,'mês','meses'):'',plural(p.days,'dia','dias')].filter(Boolean).join(', ');}
if(tool==='idade-bebe'){
  inputDate.max=todayValue();
  onSubmit(()=>{const birth=parseDate(inputDate.value);const t=today();if(birth>t)throw Error('A data de nascimento não pode estar no futuro.');const ga=Number(document.querySelector('#ga-birth').value);if(!Number.isInteger(ga)||ga<22||ga>42)throw Error('Informe a idade gestacional ao nascer entre 22 e 42 semanas.');
    const chrono=ageParts(birth,t);const total=Math.round((t-birth)/DAY);const lines=[`${plural(Math.floor(total/7),'semana','semanas')} e ${plural(total%7,'dia','dias')} de vida (${total} dias).`];let ref=chrono.months;
    if(ga<37){const cb=birth+(40-ga)*7*DAY;if(cb>t){ref=0;lines.push(`Idade corrigida: o bebê ainda não completou 40 semanas corrigidas (faltam ${plural(Math.round((cb-t)/DAY),'dia','dias')}).`);}else{const c=ageParts(cb,t);ref=c.months;lines.push(`Idade corrigida (prematuro de ${ga} semanas): ${ageText(c)}. Use-a para avaliar o desenvolvimento até cerca de 2 anos.`);}}
    showResult(ageText(chrono),lines);
    let idx=0;MILESTONES.forEach((m,i)=>{if(ref>=m[0])idx=i;});const cur=MILESTONES[idx],nxt=MILESTONES[idx+1];
    const box=document.querySelector('#milestones');box.replaceChildren(el('h3',{text:`Marcos esperados até ${cur[1]}`}),el('ul',{},...cur[2].map(x=>el('li',{text:x}))));
    if(nxt)box.append(el('h3',{text:`Próxima fase: ${nxt[1]}`}),el('ul',{},...nxt[2].map(x=>el('li',{text:x}))));
    const nv=VACCINES.find(v=>addMonths(birth,v[0])>t);if(nv)box.append(el('p',{class:'small',text:`Próximas vacinas (${nv[1]}): ${nv[2]}. Previsão: ${shortDate(addMonths(birth,nv[0]))}.`}));
    box.append(el('p',{class:'small',text:'Cada bebê tem seu ritmo. Leve dúvidas e a Caderneta da Criança às consultas.'}));});
}

// ---------- Diário do bebê ----------
const LOGS={'mamada-esquerdo':'Mamada · peito esquerdo','mamada-direito':'Mamada · peito direito','mamadeira':'Mamadeira','xixi':'Fralda · xixi','coco':'Fralda · cocô','sono':'Dormiu','acordou':'Acordou'};
if(tool==='diario-bebe'){
  const KEY='amor-berco-diario-v1';let rows=(store(KEY)||[]).filter(r=>r&&Number.isFinite(r.t)&&LOGS[r.k]);
  const hm=t=>new Date(t).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  function render(){const since=Date.now()-86400000;const day=rows.filter(r=>r.t>=since);const feeds=day.filter(r=>r.k.startsWith('mama'));const last=[...rows].reverse().find(r=>r.k.startsWith('mama'));let sleep=0,open=null;for(const r of day){if(r.k==='sono')open=r.t;if(r.k==='acordou'&&open!==null){sleep+=r.t-open;open=null;}}
    document.querySelector('#diary-stats').replaceChildren(el('div',{},el('span',{class:'label',text:'Mamadas 24 h'}),el('strong',{text:String(feeds.length)}),el('small',{text:last?`última ${hm(last.t)}${last.k.includes('esquerdo')?' · esquerdo':last.k.includes('direito')?' · direito':''}`:'sem registro'})),el('div',{},el('span',{class:'label',text:'Fraldas 24 h'}),el('strong',{text:String(day.filter(r=>r.k==='xixi'||r.k==='coco').length)}),el('small',{text:`${day.filter(r=>r.k==='coco').length} com cocô`})),el('div',{},el('span',{class:'label',text:'Sono 24 h'}),el('strong',{text:`${Math.floor(sleep/3600000)}h${String(Math.floor(sleep%3600000/60000)).padStart(2,'0')}`}),el('small',{text:open!==null?'dormindo agora':'registrado'})));
    const log=document.querySelector('#diary-log');log.replaceChildren();if(!rows.length)log.append(el('tr',{},el('td',{colspan:'3',text:'Toque em um botão para registrar.'})));
    rows.slice(-60).reverse().forEach(r=>{const del=el('button',{type:'button',class:'link-button','aria-label':'Apagar registro',text:'apagar'});del.addEventListener('click',()=>{rows=rows.filter(x=>x!==r);store(KEY,rows.length?rows:null);render();});log.append(el('tr',{},el('td',{text:new Date(r.t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}),el('td',{text:LOGS[r.k]}),el('td',{},del)));});}
  document.querySelectorAll('[data-log]').forEach(b=>b.addEventListener('click',()=>{rows.push({t:Date.now(),k:b.dataset.log});rows=rows.slice(-1000);store(KEY,rows);render();b.classList.add('pulse');setTimeout(()=>b.classList.remove('pulse'),400);}));
  document.querySelector('#diary-export').addEventListener('click',()=>downloadFile('amor-de-berco-diario.csv','﻿Data e hora;Registro\r\n'+rows.map(r=>`${new Date(r.t).toLocaleString('pt-BR')};${LOGS[r.k]}`).join('\r\n'),'text/csv;charset=utf-8'));
  document.querySelector('#diary-clear').addEventListener('click',()=>{if(rows.length&&!confirm('Apagar todos os registros deste aparelho?'))return;rows=[];store(KEY,null);render();});
  render();setInterval(render,60000);
}

// ---------- Nomes ----------
if(tool==='nomes-bebe'&&window.NOMES){
  const normalize=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();const FKEY='amor-berco-nomes-fav';const favs=new Set((store(FKEY)||[]).filter(x=>typeof x==='string'));
  const origin=document.querySelector('#name-origin');[...new Set(window.NOMES.map(n=>n.o))].sort((a,b)=>a.localeCompare(b,'pt')).forEach(o=>origin.append(el('option',{value:o,text:o[0].toUpperCase()+o.slice(1)})));
  const G={f:'menina',m:'menino',u:'unissex'};
  function filter(){const q=normalize(document.querySelector('#name-search').value.trim()),g=document.querySelector('#name-gender').value,o=origin.value,size=document.querySelector('#name-size').value,view=document.querySelector('#name-view').value;
    return window.NOMES.filter(n=>(!q||normalize(n.n).startsWith(q)||(q.length>2&&normalize(n.s).includes(q)))&&(g==='all'||n.g===g)&&(o==='all'||n.o===o)&&(size==='all'||(size==='short'?n.n.length<=4:n.n.length>=5))&&(view==='all'||favs.has(n.n))).sort((a,b)=>a.n.localeCompare(b.n,'pt'));}
  function render(highlight){const list=filter();const holder=document.querySelector('#names');holder.replaceChildren(...list.map(n=>{const on=favs.has(n.n);const fav=el('button',{type:'button',class:'fav'+(on?' on':''),'aria-pressed':String(on),'aria-label':`Favoritar ${n.n}`,text:on?'♥':'♡'});fav.addEventListener('click',()=>{on?favs.delete(n.n):favs.add(n.n);store(FKEY,[...favs]);render();});return el('div',{class:'name'+(highlight===n.n?' highlight':'')},el('div',{class:'name-top'},el('span',{text:n.n}),fav),el('small',{text:`${G[n.g]} · origem ${n.o}`}),el('p',{text:n.s}));}));
    showResult(plural(list.length,'nome encontrado','nomes encontrados'),list.length?`${favs.size} ${favs.size===1?'favorito salvo':'favoritos salvos'} neste aparelho.`:'Tente outra inicial ou remova filtros.');if(highlight)holder.querySelector('.highlight')?.scrollIntoView({behavior:'smooth',block:'center'});}
  form.addEventListener('submit',e=>{e.preventDefault();render();});['#name-search','#name-gender','#name-origin','#name-size','#name-view'].forEach(s=>document.querySelector(s).addEventListener(s==='#name-search'?'input':'change',()=>render()));
  document.querySelector('#name-random').addEventListener('click',()=>{const list=filter();if(!list.length)return render();render(list[Math.floor(Math.random()*list.length)].n);});
  render();
}
