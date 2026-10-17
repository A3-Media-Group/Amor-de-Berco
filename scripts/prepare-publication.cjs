/* Sem dependências. Acrescenta canonical, breadcrumbs, sitemap e robots com a URL pública.
   Uso: node scripts/prepare-publication.cjs [https://amordeberco.com.br/]
   Atualiza os HTML da raiz (para hospedagens que publicam a raiz do repositório) e gera a cópia em _site. */
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const raw=process.env.SITE_URL||process.argv[2]||'https://amordeberco.com.br/';
let base;try{base=new URL(raw);if(!['https:','http:'].includes(base.protocol)||base.username||base.password||base.search||base.hash)throw Error();base.pathname=base.pathname.replace(/\/$/,'')+'/';}catch(e){console.error('Use uma URL pública válida, sem senha, parâmetros ou fragmentos.');process.exit(1);}
const xml=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const GROUPS={artigos:['Artigos','artigos.html'],ferramentas:['Ferramentas','ferramentas.html'],gravidez:['Gravidez semana a semana','ferramentas/gravidez-semana-a-semana.html'],bebe:['Bebê mês a mês','ferramentas/bebe-mes-a-mes.html']};
const PRIORITY=rel=>rel==='index.html'?'1.0':rel.startsWith('ferramentas/')||rel.startsWith('gravidez/')||rel.startsWith('bebe/')?'0.9':rel.startsWith('artigos/')||rel==='artigos.html'||rel==='ferramentas.html'?'0.8':'0.4';
const today=new Date().toISOString().slice(0,10);
// <lastmod> real: muda só quando o conteúdo da página muda (hash sem o bloco SEO), não a cada build.
// Página sem registro: usa a data do último commit do arquivo se ele não mudou desde então; senão, hoje.
const crypto=require('crypto'),{execFileSync}=require('child_process');
const lastmodFile=path.join(__dirname,'data','lastmod.json');
const lastmod=fs.existsSync(lastmodFile)?JSON.parse(fs.readFileSync(lastmodFile,'utf8')):{};
const contentHash=html=>crypto.createHash('sha256').update(html.replace(/<!-- PUBLICATION_META -->|<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/,'')).digest('hex').slice(0,16);
const git=(...a)=>{try{return execFileSync('git',a,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch(e){return '';}};
function modDate(rel,html){
  const h=contentHash(html),prev=lastmod[rel];
  if(prev&&prev.hash===h)return prev.date;
  let date=today;
  if(!prev){const committed=git('show',`HEAD:${rel}`);if(committed&&contentHash(committed)===h)date=git('log','-1','--format=%cs','--',rel)||today;}
  lastmod[rel]={hash:h,date};return date;
}
const sources=fs.readdirSync(root).filter(n=>n.endsWith('.html')).concat(['artigos','ferramentas','gravidez','bebe'].flatMap(d=>fs.existsSync(path.join(root,d))?fs.readdirSync(path.join(root,d)).filter(n=>n.endsWith('.html')).map(n=>`${d}/${n}`):[]));
const urls=[];
for(const rel of sources.sort()){
  const file=path.join(root,rel);const url=new URL(rel==='index.html'?'':rel,base).href;let html=fs.readFileSync(file,'utf8');
  const title=(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]?.replace(/<[^>]+>/g,'').trim()||'Amor de Berço';
  const items=[{'@type':'ListItem',position:1,name:'Início',item:base.href}];const group=rel.includes('/')?rel.split('/')[0]:null;
  if(group&&GROUPS[group]&&rel!==GROUPS[group][1])items.push({'@type':'ListItem',position:2,name:GROUPS[group][0],item:new URL(GROUPS[group][1],base).href});
  if(rel!=='index.html')items.push({'@type':'ListItem',position:items.length+1,name:title,item:url});
  const crumbs=`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items}).replaceAll('<','\\u003c')}</script>`;
  const seo=`<!-- SEO_START --><link rel="canonical" href="${xml(url)}"><meta property="og:url" content="${xml(url)}">${rel==='404.html'?'<meta name="robots" content="noindex">':''}${crumbs}<!-- SEO_END -->`;
  html=html.replace(/<!-- PUBLICATION_META -->|<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/,()=>seo);
  // A 404 pode ser servida em qualquer caminho: seus links precisam ser absolutos.
  if(rel==='404.html')html=html.replace(/(href|src)="(?!https?:|data:|#|mailto:)([^"]+)"/g,(_,attr,v)=>`${attr}="${xml(new URL(v,base).href)}"`);
  fs.writeFileSync(file,html);if(rel!=='404.html')urls.push([url,PRIORITY(rel),modDate(rel,html)]);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(([u,p,d])=>`  <url><loc>${xml(u)}</loc><lastmod>${d}</lastmod><priority>${p}</priority></url>`).join('\n')+'\n</urlset>\n');
fs.writeFileSync(lastmodFile,JSON.stringify(Object.fromEntries(Object.entries(lastmod).sort()),null,1)+'\n');
fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\n\nSitemap: '+new URL('sitemap.xml',base).href+'\n');
const out=path.join(root,'_site');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);
for(const name of fs.readdirSync(root))if(name.endsWith('.html')||['assets','artigos','ferramentas','gravidez','bebe','CNAME','.nojekyll','.htaccess','ads.txt','sitemap.xml','robots.txt'].includes(name))fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
console.log(`Publicação preparada: ${urls.length} URLs com canonical, breadcrumbs, sitemap.xml e robots.txt para ${base.href} (raiz e _site).`);
