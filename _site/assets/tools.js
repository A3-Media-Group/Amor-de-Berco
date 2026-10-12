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

// ---------- Bebê mês a mês ----------
if(tool==='bebe-mes-a-mes'&&window.MONTHS){
  inputDate.max=todayValue();
  onSubmit(()=>{const birth=parseDate(inputDate.value);const t=today();if(birth>t)throw Error('A data de nascimento não pode estar no futuro.');const a=ageParts(birth,t);if(a.months>=25)throw Error('O conteúdo mês a mês vai até 24 meses. Veja os artigos sobre parentalidade para as próximas fases.');
    const m=Math.min(24,Math.max(1,a.months+1));const d=window.MONTHS[m-1];
    showResult(ageText(a),[a.months<1?'O bebê está no primeiro mês de vida.':`O bebê está vivendo o ${m}º mês.`,'Para prematuros, considere a idade corrigida ao avaliar o desenvolvimento.']);
    document.querySelector('#month-card').replaceChildren(el('div',{class:'size-card'},el('span',{class:'size-emoji','aria-hidden':'true',text:d.e}),el('div',{},el('span',{class:'label',text:'Bebê mês a mês'}),el('strong',{text:`${m} ${m>1?'meses':'mês'}`}))),el('p',{text:d.d}),el('a',{class:'button',href:`../bebe/${d.s}.html`,text:`Ler tudo sobre ${m} ${m>1?'meses':'mês'} ↗`}));});
}

// ---------- Curva de crescimento (OMS) ----------
function normCdf(z){const t=1/(1+.2316419*Math.abs(z));const d=.3989423*Math.exp(-z*z/2);const p=d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return z>0?1-p:p;}
function lmsAt(key,day){const t=window.OMS[key];let i=t.findIndex(r=>r[0]>=day);if(i<0)i=t.length-1;if(i===0||t[i][0]===day)return t[i].slice(1);const a=t[i-1],b=t[i],f=(day-a[0])/(b[0]-a[0]);return [1,2,3].map(k=>a[k]+(b[k]-a[k])*f);}
function zScore(x,[L,M,S]){return L===0?Math.log(x/M)/S:(Math.pow(x/M,L)-1)/(L*S);}
function fromZ(z,[L,M,S]){return L===0?M*Math.exp(S*z):M*Math.pow(1+L*S*z,1/L);}
if(tool==='curva-crescimento'&&window.OMS){
  const KEY='amor-berco-crescimento-v1';const IND={peso:['Peso','kg','#weight'],comprimento:['Comprimento/altura','cm','#length'],cabeca:['Perímetro cefálico','cm','#head']};
  let saved=store(KEY)||null;let current='peso';
  const md=document.querySelector('#measure-date');md.value=todayValue();md.max=todayValue();inputDate.max=todayValue();
  if(saved&&saved.birth){inputDate.value=saved.birth;document.querySelector('#sex').value=saved.sex;}
  const n=(x,d=1)=>x.toLocaleString('pt-BR',{maximumFractionDigits:d,minimumFractionDigits:d});
  function read(){const birth=parseDate(inputDate.value),when=parseDate(md.value);if(when<birth)throw Error('A data da medida deve ser posterior ao nascimento.');if(when>today())throw Error('A data da medida não pode estar no futuro.');const day=Math.round((when-birth)/DAY);if(day>1856)throw Error('As curvas da OMS desta ferramenta vão de 0 a 5 anos.');const vals={};for(const[k,[, ,sel]]of Object.entries(IND)){const v=document.querySelector(sel).value;if(v)vals[k]=Number(v);}if(!Object.keys(vals).length)throw Error('Informe ao menos uma medida.');return {birth,day,date:md.value,sex:document.querySelector('#sex').value,vals};}
  function describe(p){return p<3?'abaixo do percentil 3: converse com o pediatra':p>97?'acima do percentil 97: converse com o pediatra':p<15?'entre os percentis 3 e 15':p>85?'entre os percentis 85 e 97':'faixa central, entre os percentis 15 e 85';}
  function chart(){const box=document.querySelector('#growth-chart');if(!inputDate.value){box.replaceChildren();return;}const sex=document.querySelector('#sex').value,key=`${current}-${sex}`;const rows=(saved&&saved.rows||[]).filter(r=>r.vals[current]!=null);const birth=parseDate(inputDate.value);
    const maxDay=Math.min(1856,Math.max(365,...rows.map(r=>Math.round((parseDate(r.date)-birth)/DAY)+90)));const W=640,H=320,pad=40;const days=[];for(let d=0;d<=maxDay;d+=7)days.push(d);
    const curves=[-1.881,-1.036,0,1.036,1.881].map(z=>days.map(d=>[d,fromZ(z,lmsAt(key,d))]));const ys=curves.flat().map(p=>p[1]).concat(rows.map(r=>r.vals[current]));const ymin=Math.floor(Math.min(...ys)),ymax=Math.ceil(Math.max(...ys));
    const X=d=>pad+(W-pad*1.5)*d/maxDay,Y=v=>H-pad-(H-pad*1.6)*(v-ymin)/(ymax-ymin||1);const NS='http://www.w3.org/2000/svg';const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('class','growth-svg');svg.setAttribute('role','img');svg.setAttribute('aria-label',`Gráfico de ${IND[current][0]} com as curvas de percentil 3, 15, 50, 85 e 97 da OMS`);
    const add=(tag,attrs,text)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text)e.textContent=text;svg.append(e);return e;};
    for(let i=0;i<=4;i++){const v=ymin+(ymax-ymin)*i/4;add('line',{x1:pad,x2:W-pad/2,y1:Y(v),y2:Y(v),class:'grid'});add('text',{x:4,y:Y(v)+4,class:'axis'},n(v,0));}
    const step=maxDay>730?365:maxDay>365?182:61;for(let d=0;d<=maxDay;d+=step){add('text',{x:X(d),y:H-pad+18,class:'axis','text-anchor':'middle'},d===0?'0':d%365===0?`${d/365}a`:`${Math.round(d/30.4375)}m`);}
    ['P3','P15','P50','P85','P97'].forEach((l,i)=>{add('path',{d:curves[i].map((p,j)=>`${j?'L':'M'}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(''),class:i===2?'p50':'pline'});const last=curves[i][curves[i].length-1];add('text',{x:X(last[0])-2,y:Y(last[1])-4,class:'axis','text-anchor':'end'},l);});
    rows.forEach(r=>{const d=Math.round((parseDate(r.date)-birth)/DAY);add('circle',{cx:X(d),cy:Y(r.vals[current]),r:5,class:'pt'});});
    const tabs=el('div',{class:'segmented chart-tabs'});for(const[k,[label]]of Object.entries(IND)){const b=el('button',{type:'button',class:k===current?'on':'',text:label});b.addEventListener('click',()=>{current=k;chart();});tabs.append(b);}
    box.replaceChildren(el('h3',{text:`${IND[current][0]} (${IND[current][1]}) — curvas da OMS`}),tabs,svg,el('p',{class:'small',text:rows.length?'Pontos: medidas salvas neste aparelho.':'Salve medidas para vê-las no gráfico.'}));}
  function history(){const box=document.querySelector('#growth-history');const rows=saved&&saved.rows||[];if(!rows.length){box.replaceChildren();return;}const tb=el('tbody');rows.forEach((r,i)=>{const del=el('button',{type:'button',class:'link-button',text:'apagar'});del.addEventListener('click',()=>{saved.rows.splice(i,1);store(KEY,saved.rows.length?saved:null);if(!saved.rows.length)saved=null;history();chart();});tb.append(el('tr',{},el('td',{text:shortDate(parseDate(r.date))}),el('td',{text:r.vals.peso!=null?`${n(r.vals.peso,2)} kg`:'—'}),el('td',{text:r.vals.comprimento!=null?`${n(r.vals.comprimento)} cm`:'—'}),el('td',{text:r.vals.cabeca!=null?`${n(r.vals.cabeca)} cm`:'—'}),el('td',{},del)));});box.replaceChildren(el('h3',{text:'Medidas salvas'}),el('div',{class:'table-scroll'},el('table',{},el('thead',{},el('tr',{},el('th',{text:'Data'}),el('th',{text:'Peso'}),el('th',{text:'Comprimento'}),el('th',{text:'Perímetro cefálico'}),el('th',{text:''}))),tb)));}
  onSubmit(()=>{const r=read();const lines=[];let first=null;for(const[k,v]of Object.entries(r.vals)){const z=zScore(v,lmsAt(`${k}-${r.sex}`,r.day));if(!Number.isFinite(z)||Math.abs(z)>6)throw Error(`Confira o valor de ${IND[k][0].toLowerCase()}: ele está muito fora das curvas.`);const p=normCdf(z)*100;const txt=`${IND[k][0]}: percentil ${p<1?'< 1':p>99?'> 99':n(p,0)} (escore-z ${z>=0?'+':''}${n(z,2)}) — ${describe(p)}.`;lines.push(txt);if(!first)first=`Percentil ${p<1?'< 1':p>99?'> 99':n(p,0)} de ${IND[k][0].toLowerCase()}`;}
    lines.push(`Idade na medida: ${ageText(ageParts(r.birth,parseDate(r.date)))}. Curvas da OMS para ${r.sex==='f'?'meninas':'meninos'}.`);showResult(first,lines);chart();});
  document.querySelector('#save-measure').addEventListener('click',()=>{try{const r=read();if(saved&&(saved.birth!==inputDate.value||saved.sex!==r.sex)){if(!confirm('A data de nascimento ou o sexo mudaram. Apagar as medidas anteriores e começar um novo histórico?'))return;saved=null;}saved=saved||{birth:inputDate.value,sex:r.sex,rows:[]};saved.rows=saved.rows.filter(x=>x.date!==r.date).concat([{date:r.date,vals:r.vals}]).sort((a,b)=>a.date.localeCompare(b.date));store(KEY,saved);form.requestSubmit();history();}catch(err){showResult('Confira os dados',err.message);}});
  document.querySelector('#sex').addEventListener('change',chart);inputDate.addEventListener('change',chart);history();chart();
}

// ---------- Beta hCG ----------
if(tool==='calculadora-beta-hcg'){
  const RANGES=[['3 semanas',5,50],['4 semanas',5,426],['5 semanas',18,7340],['6 semanas',1080,56500],['7 a 8 semanas',7650,229000],['9 a 12 semanas',25700,288000],['13 a 16 semanas',13300,254000],['17 a 24 semanas',4060,165400],['25 a 40 semanas',3640,117000]];
  const n=x=>x.toLocaleString('pt-BR',{maximumFractionDigits:1});
  onSubmit(()=>{const v1=Number(document.querySelector('#hcg1').value);if(!(v1>=0))throw Error('Informe o valor do beta hCG em mUI/mL.');const v2raw=document.querySelector('#hcg2').value,hours=Number(document.querySelector('#hours').value);
    const status=v1<5?'Resultado geralmente considerado negativo':v1<=25?'Resultado indeterminado':'Resultado geralmente considerado positivo';const lines=[v1<5?'Valores abaixo de 5 mUI/mL costumam indicar ausência de gravidez. Se a menstruação não vier, repita o exame.':v1<=25?'Entre 5 e 25 mUI/mL, os laboratórios costumam orientar repetir o exame em 48 a 72 horas.':'Confirme com a sua equipe e inicie o pré-natal.'];
    const weeks=RANGES.filter(r=>v1>=r[1]&&v1<=r[2]).map(r=>r[0]);if(v1>=5)lines.push(weeks.length?`Faixas de referência compatíveis: ${weeks.join(', ')}. As faixas se sobrepõem; só o ultrassom define a idade gestacional.`:'O valor está fora das faixas de referência mais citadas. Converse com a equipe.');
    if(v2raw){const v2=Number(v2raw);if(!(v2>0)||!(v1>0))throw Error('Para comparar, os dois valores precisam ser maiores que zero.');if(!(hours>=12&&hours<=168))throw Error('Informe as horas entre os exames, entre 12 e 168.');
      if(v2>v1){const dbl=hours*Math.LN2/Math.log(v2/v1);const rise=(Math.pow(v2/v1,48/hours)-1)*100;const min=v1<1500?49:v1<3000?40:33;lines.push(`Tempo de duplicação: cerca de ${n(dbl)} horas. Aumento equivalente em 48 horas: ${n(rise)}%.`);lines.push(rise>=min?`O aumento está acima do mínimo descrito em estudos para gestações iniciais com esse valor de partida (${min}% em 48 h).`:`O aumento está abaixo do mínimo descrito em estudos (${min}% em 48 h). Isso precisa de avaliação médica, mas não é diagnóstico isoladamente.`);}
      else lines.push(v2===v1?'O valor ficou estável. Converse com a equipe de saúde.':'O valor diminuiu entre os exames. Procure avaliação médica.');}
    showResult(status,lines);
    const tb=el('tbody');RANGES.forEach(r=>tb.append(el('tr',{class:v1>=r[1]&&v1<=r[2]?'current':''},el('td',{text:r[0]}),el('td',{text:`${r[1].toLocaleString('pt-BR')} a ${r[2].toLocaleString('pt-BR')}`}))));
    document.querySelector('#hcg-detail').replaceChildren(el('h3',{text:'Faixas de referência (mUI/mL)'}),el('div',{class:'table-scroll'},el('table',{},el('thead',{},el('tr',{},el('th',{text:'Semanas desde a última menstruação'}),el('th',{text:'Faixa aproximada'}))),tb)),el('p',{class:'small',text:'Fonte das faixas: American Pregnancy Association. Seu laboratório pode usar referências diferentes.'}));});
}

// ---------- Sexo do bebê ----------
if(tool==='sexo-do-bebe'){
  const label=document.querySelector('#date-label');const setBase=()=>{const b=form.base.value;label.firstChild.textContent=b==='dpp'?'Data provável do parto (DPP)':'Primeiro dia da última menstruação';if(b==='dpp')inputDate.removeAttribute('max');else inputDate.max=todayValue();};form.querySelectorAll('[name=base]').forEach(r=>r.addEventListener('change',setBase));setBase();
  onSubmit(()=>{const date=parseDate(inputDate.value);const t=today();const dum=form.base.value==='dpp'?date-280*DAY:date;if(form.base.value==='dum'&&date>t)throw Error('A última menstruação não pode estar no futuro.');const days=Math.round((t-dum)/DAY);if(days>300)throw Error('As datas indicam mais de 42 semanas. Confira as informações.');
    const items=[[8*7,null,'Sexagem fetal (exame de sangue da gestante)'],[12*7,13*7+6,'Ultrassom do fim do 1º trimestre: pode sugerir, com margem de erro'],[16*7,null,'Ultrassom: visualização mais segura a partir daqui'],[20*7,24*7,'Ultrassom morfológico do 2º trimestre: geralmente confirma']];
    const sexagem=dum+56*DAY;showResult(sexagem<=t?'Você já pode fazer a sexagem fetal':`Sexagem fetal a partir de ${dateText(sexagem)}`,[days>=0?`Hoje: ${gaText(Math.max(0,days))} de gestação.`:'','Confirme com o laboratório o prazo exato e o preparo do exame.']);
    const list=el('ol',{class:'timeline'});items.forEach(([a,b,l])=>{const s=dum+a*DAY,e=b?dum+b*DAY:null;const past=(e||s)<t;list.append(el('li',{class:past?'past':''},el('strong',{text:e?`${shortDate(s)} a ${shortDate(e)}`:`A partir de ${shortDate(s)}`}),el('span',{text:` ${l}${past?' (já é possível)':''}`})));});
    document.querySelector('#sex-timeline').replaceChildren(el('h3',{text:'Quando cada exame pode mostrar o sexo'}),list,el('p',{class:'small',text:'Tabela chinesa e simpatias não têm comprovação científica.'}));});
}

// ---------- Contador de movimentos ----------
if(tool==='contador-chutes'){
  const KEY='amor-berco-chutes-v1';let rows=(store(KEY)||[]).filter(r=>r&&Number.isFinite(r.start)&&Number.isFinite(r.end));let session=null,tick=null;
  const btn=document.querySelector('#kick-button'),stop=document.querySelector('#kick-stop'),count=document.querySelector('#kick-count'),state=document.querySelector('#kick-state');
  function finish(){if(!session)return;rows.push({start:session.start,end:Date.now(),count:session.count});rows=rows.slice(-100);store(KEY,rows);clearInterval(tick);const r=rows[rows.length-1];state.textContent=r.count>=10?`10 movimentos em ${mmss(r.end-r.start)}. Sessão salva.`:`Sessão encerrada com ${r.count} movimentos em ${mmss(r.end-r.start)}.`;session=null;btn.textContent='Começar contagem';stop.hidden=true;render();}
  function render(){const tb=document.querySelector('#kick-log');tb.replaceChildren();if(!rows.length)tb.append(el('tr',{},el('td',{colspan:'3',text:'Suas sessões aparecerão aqui.'})));[...rows].reverse().slice(0,30).forEach(r=>tb.append(el('tr',{},el('td',{text:new Date(r.start).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}),el('td',{text:String(r.count)}),el('td',{text:mmss(r.end-r.start)}))));
    const full=rows.filter(r=>r.count>=10).slice(-7);const box=document.querySelector('#kick-stats');if(!full.length){box.replaceChildren();return;}const avg=full.reduce((s,r)=>s+(r.end-r.start),0)/full.length;const last=full[full.length-1];box.replaceChildren(el('div',{},el('span',{class:'label',text:'Última sessão'}),el('strong',{text:mmss(last.end-last.start)}),el('small',{text:'até 10 movimentos'})),el('div',{},el('span',{class:'label',text:'Média recente'}),el('strong',{text:mmss(avg)}),el('small',{text:`${full.length} sessões completas`})),el('div',{},el('span',{class:'label',text:'Comparação'}),el('strong',{text:(last.end-last.start)>avg*1.5&&full.length>2?'Mais lenta':'Dentro do padrão'}),el('small',{text:'em relação à média'})));}
  btn.addEventListener('click',()=>{if(!session){session={start:Date.now(),count:0};count.textContent='0';btn.textContent='Senti um movimento';stop.hidden=false;state.textContent='Contando. Toque a cada movimento.';tick=setInterval(()=>{state.textContent=`Contando há ${mmss(Date.now()-session.start)}. Toque a cada movimento.`;},1000);return;}session.count++;count.textContent=String(session.count);if(session.count>=10)finish();});
  stop.addEventListener('click',finish);
  document.querySelector('#kick-clear').addEventListener('click',()=>{if(rows.length&&!confirm('Apagar todo o histórico de movimentos?'))return;rows=[];store(KEY,null);render();});
  render();
}

// ---------- Licença-maternidade ----------
if(tool==='licenca-maternidade'){
  const MIN=1621,TETO=8475.55;const money=x=>x.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const worker=document.querySelector('#worker'),salaryLabel=document.querySelector('#salary-label');const sync=()=>{salaryLabel.firstChild.textContent=worker.value==='mei'?'Valor sobre o qual você contribui por mês (R$; em geral, o salário mínimo)':worker.value==='individual'?'Média das contribuições dos últimos 12 meses (R$)':'Salário mensal bruto (R$; se variável, média dos últimos 6 meses)';if(worker.value==='mei'&&!document.querySelector('#salary').value)document.querySelector('#salary').value=MIN;};worker.addEventListener('change',sync);sync();
  onSubmit(()=>{const start=parseDate(inputDate.value);const days=Number(document.querySelector('#leave-days').value);const end=start+(days-1)*DAY;const vac=document.querySelector('#vacation').checked;const back=end+DAY+(vac?30*DAY:0);const stability=addMonths(start,5);
    const lines=[`Licença de ${days} dias: de ${dateText(start)} a ${dateText(end)}.`,vac?`Com 30 dias de férias emendados, retorno em ${dateText(back)}.`:'',`Estabilidade no emprego (CLT e doméstica): até ${dateText(stability)}, considerando que a licença começou no parto.`];
    const sal=Number(document.querySelector('#salary').value);if(sal>0){let monthly;if(worker.value==='clt')monthly=sal;else if(worker.value==='mei')monthly=Math.max(MIN,Math.min(sal,TETO));else monthly=Math.max(MIN,Math.min(sal,TETO));const total=monthly*days/30;
      lines.push(`Salário-maternidade estimado: ${money(monthly)} por mês, cerca de ${money(total)} no total.`,worker.value==='clt'?'Pago pela empresa junto com a folha (a empresa compensa com o INSS).':`Pago pelo INSS. Valor limitado ao teto de ${money(TETO)} e não inferior ao salário mínimo. Exige carência, em regra de 10 contribuições para MEI, autônomas e facultativas.`);}
    showResult(`Volta ao trabalho: ${dateText(back)}`,lines);
    const list=el('ol',{class:'timeline'});[[start,'Início da licença'],[end,'Último dia de licença'],[vac?end+30*DAY:null,'Último dia de férias'],[back,'Retorno ao trabalho'],[addMonths(start,6),'Bebê completa 6 meses: fim do direito às pausas para amamentar'],[stability,'Fim da estabilidade (5 meses após o parto)']].filter(x=>x[0]).sort((a,b)=>a[0]-b[0]).forEach(([d,l])=>list.append(el('li',{},el('strong',{text:shortDate(d)}),el('span',{text:` ${l}`}))));
    document.querySelector('#leave-detail').replaceChildren(el('h3',{text:'Datas importantes'}),list,el('p',{class:'small',text:'Estimativa sem valor oficial. Confirme com o RH, o sindicato ou no Meu INSS (telefone 135).'}));});
}

// ---------- Plano de parto ----------
if(tool==='plano-de-parto'){
  const KEY='amor-berco-plano-parto-v1';const SECTIONS=[['Ambiente',['Luz baixa e ambiente tranquilo','Usar minha própria música','Liberdade para caminhar e mudar de posição','Beber líquidos e comer algo leve, se liberado']],['Alívio da dor',['Métodos sem remédios: banho morno, bola, massagem','Analgesia (peridural/raqui) se eu solicitar','Prefiro evitar analgesia, se possível','Decidir sobre analgesia no momento']],['Intervenções',['Ser consultada e informada antes de qualquer procedimento','Evitar ocitocina de rotina','Evitar episiotomia de rotina','Evitar ruptura artificial da bolsa de rotina','Exames de toque apenas quando necessários']],['Parto',['Escolher a posição para o parto','Acompanhante cortar o cordão umbilical','Fotos ou vídeo do nascimento, se permitido']],['Cuidados com o bebê',['Contato pele a pele imediato','Clampeamento oportuno do cordão','Amamentar na primeira hora','Exames e procedimentos do bebê na minha presença','Alojamento conjunto']],['Se for necessária uma cesárea',['Acompanhante presente na sala','Pele a pele na sala, se possível','Abaixar o campo para ver o nascimento','Amamentar ainda na sala de recuperação']],['Amamentação',['Não oferecer bico, chupeta ou fórmula sem indicação e sem me consultar','Apoio para a pega nas primeiras mamadas']]];
  const holder=document.querySelector('#bp-sections');const saved=store(KEY)||{};const checked=new Set(Array.isArray(saved.checked)?saved.checked:[]);
  SECTIONS.forEach(([title,items],si)=>{const fs=el('fieldset',{class:'check-group'},el('legend',{text:title}));items.forEach((t,ii)=>{const id=`${si}-${ii}`;const i=el('input',{type:'checkbox',value:id});i.checked=checked.has(id);fs.append(el('label',{class:'check-row'},i,el('span',{text:t})));});holder.append(fs);});
  const fields=['#bp-name','#bp-companion','#bp-hospital','#bp-notes'];fields.forEach(f=>{const e=document.querySelector(f);if(typeof saved[f]==='string')e.value=saved[f];});
  const save=()=>{const data={checked:[...holder.querySelectorAll('input:checked')].map(i=>i.value)};fields.forEach(f=>data[f]=document.querySelector(f).value);store(KEY,data);};
  document.querySelector('#birth-plan').addEventListener('input',save);document.querySelector('#birth-plan').addEventListener('change',save);
  document.querySelector('#bp-preview').addEventListener('click',()=>{const out=document.querySelector('#bp-output');const v=f=>document.querySelector(f).value.trim();out.replaceChildren(el('h2',{text:`Plano de parto${v('#bp-name')?` de ${v('#bp-name')}`:''}`}),el('p',{text:[v('#bp-companion')?`Acompanhante: ${v('#bp-companion')}`:'',v('#bp-hospital')?`Maternidade: ${v('#bp-hospital')}`:''].filter(Boolean).join(' · ')}),el('p',{class:'small',text:'Estas são minhas preferências. Sei que situações clínicas podem exigir mudanças e peço que elas sejam explicadas e discutidas comigo.'}));
    SECTIONS.forEach(([title,items],si)=>{const sel=items.filter((t,ii)=>holder.querySelector(`input[value="${si}-${ii}"]`).checked);if(sel.length)out.append(el('h3',{text:title}),el('ul',{},...sel.map(t=>el('li',{text:t}))));});
    if(v('#bp-notes'))out.append(el('h3',{text:'Observações'}),el('p',{text:v('#bp-notes')}));const pr=el('button',{type:'button',class:'button',text:'Imprimir plano'});pr.addEventListener('click',()=>window.print());out.append(el('div',{class:'actions'},pr));out.scrollIntoView({behavior:'smooth'});});
  document.querySelector('#bp-clear').addEventListener('click',()=>{if(!confirm('Limpar todas as respostas do plano de parto?'))return;holder.querySelectorAll('input').forEach(i=>i.checked=false);fields.forEach(f=>document.querySelector(f).value='');store(KEY,null);document.querySelector('#bp-output').replaceChildren();});
}

// ---------- Rotina de sono ----------
if(tool==='rotina-sono-bebe'){
  const PLANS=[[3,4,[75,90,105,105,120],[60,60,45,30]],[5,6,[120,135,150,165],[75,75,40]],[7,8,[150,180,210],[90,75]],[9,12,[180,210,240],[75,75]],[13,17,[300,300],[120]],[18,36,[330,330],[120]]];
  const hm=min=>{const m=((min%1440)+1440)%1440;return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;};
  onSubmit(()=>{const age=Number(document.querySelector('#age-months').value);const [h,mi]=document.querySelector('#wake').value.split(':').map(Number);if(!Number.isInteger(age)||age<0||age>36)throw Error('Informe a idade em meses, de 0 a 36.');if(!Number.isFinite(h))throw Error('Informe o horário de acordar.');
    const total=age<=3?'14 a 17 horas':age<=12?'12 a 16 horas':age<=24?'11 a 14 horas':'10 a 13 horas';const box=document.querySelector('#sleep-plan');
    if(age<3){showResult(`Sono total recomendado: ${total}`,['Até cerca de 3 meses, o bebê não tem rotina: dorme e mama em livre demanda.','Janelas acordado costumam ser curtas, de 45 a 90 minutos. Observe sinais de sono.']);box.replaceChildren();return;}
    const plan=PLANS.find(p=>age>=p[0]&&age<=p[1]);let t=h*60+mi;const rows=[[t,'Acorda']];let day=0;plan[3].forEach((len,i)=>{t+=plan[2][i];rows.push([t,`Soneca ${i+1} (cerca de ${len} min)`]);t+=len;day+=len;rows.push([t,'Acorda da soneca']);});t+=plan[2][plan[3].length];rows.push([t,'Hora de dormir (iniciar o ritual de sono um pouco antes)']);
    const night=(h*60+mi+1440-t)%1440;showResult(`Sono total recomendado: ${total}`,[`${plan[3].length} soneca${plan[3].length>1?'s':''} somando cerca de ${(day/60).toLocaleString('pt-BR',{maximumFractionDigits:1})} h e noite de aproximadamente ${(night/60).toLocaleString('pt-BR',{maximumFractionDigits:1})} h até ${hm(h*60+mi)}.`,'Rotina de referência: ajuste aos sinais de sono e à rotina da família.']);
    const list=el('ol',{class:'timeline'});rows.forEach(([m,l])=>list.append(el('li',{},el('strong',{text:hm(m)}),el('span',{text:` ${l}`}))));box.replaceChildren(el('h3',{text:'Rotina sugerida'}),list);});
}

// ---------- Custo do bebê ----------
if(tool==='custo-bebe'){
  const FIELDS=[['enxoval','Enxoval inicial (berço, carrinho, bebê-conforto, roupas)',3500,'once'],['fraldas','Fraldas por mês',250,'m'],['higiene','Higiene e farmácia por mês',80,'m'],['formula','Fórmula infantil por mês (0 se amamenta)',0,'m'],['comida','Alimentação a partir dos 6 meses, por mês',200,'m6'],['roupas','Roupas e calçados por mês',100,'m'],['saude','Plano de saúde e consultas por mês (0 se usa o SUS)',0,'m'],['creche','Creche ou cuidadora por mês',0,'m'],['outros','Outros (brinquedos, passeios, extras) por mês',100,'m']];
  const box=document.querySelector('#cost-fields');FIELDS.forEach(([id,label,def])=>box.append(el('label',{class:'field'},label,el('input',{type:'number',id:`c-${id}`,min:'0',step:'1',value:String(def),inputmode:'decimal'}))));
  const money=x=>x.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
  onSubmit(()=>{const parts=FIELDS.map(([id,label,,k])=>{const v=Number(document.querySelector(`#c-${id}`).value)||0;if(v<0)throw Error('Use apenas valores positivos.');return [label.replace(/ por mês.*| \(.*/,''),k==='once'?v:k==='m6'?v*6:v*12];});const total=parts.reduce((s,p)=>s+p[1],0);
    showResult(`${money(total)} no primeiro ano`,[`Média de ${money(total/12)} por mês, incluindo o enxoval inicial.`,'Estimativa com os valores informados.']);
    const max=Math.max(...parts.map(p=>p[1]),1);document.querySelector('#cost-detail').replaceChildren(el('h3',{text:'Por categoria (12 meses)'}),el('div',{class:'bars'},...parts.filter(p=>p[1]>0).sort((a,b)=>b[1]-a[1]).map(([l,v])=>el('div',{class:'bar-row'},el('span',{text:l}),el('div',{class:'bar'},el('i',{style:`width:${Math.max(2,v/max*100)}%`})),el('strong',{text:money(v)})))));});
  form.requestSubmit();
}

// ---------- Chá de fraldas ----------
if(tool==='cha-de-fraldas'){
  const SIZES=[['RN','até cerca de 4 kg',.10],['P','cerca de 3 a 6 kg',.25],['M','cerca de 6 a 10 kg',.35],['G','cerca de 9 a 13 kg',.30]];
  onSubmit(()=>{const g=Number(document.querySelector('#guests').value),p=Number(document.querySelector('#packs').value),per=Number(document.querySelector('#per-pack').value);if(!Number.isInteger(g)||g<1||!Number.isInteger(p)||p<1||!(per>=10))throw Error('Confira o número de convidados, pacotes e fraldas por pacote.');
    const total=g*p;let given=0;const split=SIZES.map(([s,w,f],i)=>{const n=i===SIZES.length-1?total-given:Math.round(total*f);given+=n;return [s,w,n];});const diapers=total*per;
    showResult(`${total} pacotes · cerca de ${diapers.toLocaleString('pt-BR')} fraldas`,[`Cobrem aproximadamente ${Math.round(diapers/7)} dias, considerando uma média de 7 trocas por dia.`,'Faixas de peso variam entre marcas: confira na embalagem.']);
    const tb=el('tbody');split.forEach(([s,w,n])=>tb.append(el('tr',{},el('td',{text:s}),el('td',{text:w}),el('td',{text:`${n} pacote${n===1?'':'s'}`}),el('td',{text:`${Math.ceil(n/p)} convidado${Math.ceil(n/p)===1?'':'s'}`}))));
    document.querySelector('#diaper-detail').replaceChildren(el('h3',{text:'Divisão sugerida'}),el('div',{class:'table-scroll'},el('table',{},el('thead',{},el('tr',{},el('th',{text:'Tamanho'}),el('th',{text:'Peso do bebê'}),el('th',{text:'Pacotes'}),el('th',{text:'Convidados'}))),tb)),el('p',{class:'small',text:'Dica: escreva o tamanho no convite de cada convidado para garantir a divisão.'}));});
}
