// Layout compartilhado das páginas geradas. HTML estático, sem dependências.
const SITE = 'https://amordeberco.com.br/';
const VERSION = '20261012';
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replaceAll('<', '\\u003c')}</script>`;

const LOGO = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 28h32c-2 10-9 14-16 14S10 38 8 28Z" stroke="currentColor" stroke-width="1.6"/><path d="M24 28V8c-11 0-16 9-16 20M6 43c10 4 26 4 36 0M17 40l-2 5m16-5 2 5" stroke="currentColor" stroke-width="1.6"/><path d="M29 12c-3-4 2-8 5-4 4-4 8 1 5 4l-5 5Z" fill="#b89378"/></svg>';

function pexels(id, w) { return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`; }
function imgSrc(img, p, w) { return img.local ? `${p}assets/${img.local}` : pexels(img.pexels, w); }
function imgAbs(img) { return img.local ? `${SITE}assets/${img.local}` : pexels(img.pexels, 1200); }
function imgPage(img) { return img.page || `https://www.pexels.com/photo/${img.pexels}/`; }
function imgTag(img, p, { cls = '', w = 800, h = 533, eager = false } = {}) {
  const srcset = img.local ? '' : ` srcset="${pexels(img.pexels, 600)} 600w, ${pexels(img.pexels, 1200)} 1200w" sizes="(max-width: 700px) 100vw, 760px"`;
  return `<img${cls ? ` class="${cls}"` : ''} src="${imgSrc(img, p, w)}"${srcset} width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" alt="${esc(img.alt)}" data-fallback>`;
}

function head({ title, description, p, type = 'website', image, schema = [], scripts = [] }) {
  const og = image ? `<meta property="og:image" content="${esc(image)}"><meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">';
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#465d45"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:site_name" content="Amor de Berço"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${type}"><meta property="og:locale" content="pt_BR">${og}<!-- PUBLICATION_META --><link rel="icon" href="${p}assets/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://images.pexels.com"><link rel="stylesheet" href="${p}assets/style.css?v=${VERSION}">${schema.map(ld).join('')}<script src="${p}assets/app.js?v=${VERSION}" defer></script>${scripts.map(s => `<script src="${p}assets/${s}?v=${VERSION}" defer></script>`).join('')}</head>`;
}

function header(p) {
  return `<body><a class="skip" href="#conteudo">Pular para o conteúdo</a><div class="topline">PARA CADA DESCOBERTA, UM POUCO DE ACOLHIMENTO.</div><header class="header"><div class="wrap nav"><a class="brand" href="${p}index.html" aria-label="Amor de Berço, início">${LOGO}<span><strong>amor de berço</strong><small>MATERNIDADE & PARENTALIDADE</small></span></a><button class="menu" aria-controls="navigation" aria-expanded="false">Menu</button><nav class="navlinks" id="navigation" aria-label="Principal"><a href="${p}ferramentas/gravidez-semana-a-semana.html">Semana a semana</a><a href="${p}artigos.html?tema=Gravidez">Gravidez</a><a href="${p}artigos.html?tema=Bebê">Bebê</a><a href="${p}artigos.html?tema=Parentalidade">Parentalidade</a><a href="${p}ferramentas/bebe-mes-a-mes.html">Mês a mês</a><a href="${p}artigos.html">Artigos</a><a class="pill" href="${p}ferramentas.html">Ferramentas ↗</a></nav></div></header>`;
}

function footer(p) {
  return `<footer class="footer"><div class="wrap"><div class="footer-grid footer-grid-4"><div><a class="brand" href="${p}index.html">${LOGO}<span><strong>amor de berço</strong></span></a><p>Informação para cuidar. Espaço para sentir.<br>Da espera aos primeiros anos, ao seu lado.</p></div><div><h3>GRAVIDEZ</h3><a href="${p}ferramentas/gravidez-semana-a-semana.html">Gravidez semana a semana</a><a href="${p}ferramentas/calculadora-parto.html">Data provável do parto</a><a href="${p}ferramentas/calculadora-beta-hcg.html">Calculadora de beta hCG</a><a href="${p}ferramentas/contador-chutes.html">Movimentos do bebê</a><a href="${p}ferramentas/plano-de-parto.html">Plano de parto</a></div><div><h3>BEBÊ E FAMÍLIA</h3><a href="${p}ferramentas/bebe-mes-a-mes.html">Bebê mês a mês</a><a href="${p}ferramentas/curva-crescimento.html">Curva de crescimento</a><a href="${p}ferramentas/calendario-vacinas.html">Calendário de vacinas</a><a href="${p}ferramentas/rotina-sono-bebe.html">Rotina de sono</a><a href="${p}ferramentas/licenca-maternidade.html">Licença-maternidade</a></div><div><h3>TRANSPARÊNCIA</h3><a href="${p}sobre.html">Sobre e política editorial</a><a href="${p}fontes.html">Fontes e créditos das fotos</a><a href="${p}privacidade.html">Privacidade</a><a href="${p}termos.html">Termos de uso</a></div></div><div class="copyright">© 2026 Amor de Berço · Conteúdo educativo. Não substitui avaliação de um profissional de saúde. Em emergência, ligue 192 (SAMU).</div></div></footer></body></html>`;
}

function page(opts, main) { return head(opts) + header(opts.p) + `<main id="conteudo">${main}</main>` + footer(opts.p) + '\n'; }

function faqHtml(faq) {
  if (!faq || !faq.length) return '';
  return `<section class="faq"><h2>Perguntas frequentes</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>`;
}
function faqSchema(faq) {
  return faq && faq.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] : [];
}
function sourcesHtml(sources, consulted) {
  return `<section class="sources"><h2>Fontes para consultar</h2><ul>${sources.map(([l, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(l)} ↗</a></li>`).join('')}</ul><p>Fontes consultadas em ${consulted}. Síntese editorial em português. As instituições citadas não têm vínculo com o Amor de Berço.</p></section>`;
}
const dateBR = iso => iso.split('-').reverse().join('/');

// Autoria e revisão exibidas nas páginas de saúde. Preencha REVIEWER somente com uma revisão real,
// por profissional que autorizou o uso do nome e do registro (ex.: { name: 'Nome', credential: 'Médica obstetra', registry: 'CRM-UF 00000', url: 'https://...' }).
// Enquanto for null, as páginas informam com transparência que não houve revisão clínica independente.
const AUTHOR = 'Equipe editorial Amor de Berço';
const REVIEWER = null;
function byline(updated, p) {
  const rev = REVIEWER ? ` · Revisado por ${REVIEWER.url ? `<a href="${esc(REVIEWER.url)}" rel="noopener">${esc(REVIEWER.name)}</a>` : esc(REVIEWER.name)}, ${esc(REVIEWER.credential)} (${esc(REVIEWER.registry)})` : '';
  return `<p class="meta">Por <a href="${p}sobre.html">${AUTHOR}</a>${rev} · Atualizado em <time datetime="${updated}">${dateBR(updated)}</time></p>`;
}
function reviewNotice() {
  return REVIEWER ? `<div class="notice">Conteúdo educativo revisado por ${esc(REVIEWER.name)}, ${esc(REVIEWER.credential)}. Não substitui o atendimento de saúde. Em emergência, ligue 192.</div>` : '<div class="notice">Conteúdo educativo, elaborado com apoio de IA a partir das fontes indicadas. Não passou por revisão clínica independente e não substitui o atendimento de saúde. Em emergência, ligue 192.</div>';
}

module.exports = { SITE, VERSION, esc, ld, pexels, imgSrc, imgAbs, imgPage, imgTag, head, header, footer, page, faqHtml, faqSchema, sourcesHtml, dateBR, AUTHOR, REVIEWER, byline, reviewNotice };
