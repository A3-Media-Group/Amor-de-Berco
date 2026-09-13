/* No dependencies. Called automatically by GitHub Actions; optional for other hosts. */
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const raw=process.env.SITE_URL||process.argv[2];
if(!raw){console.error('Informe a URL pública: node scripts/prepare-publication.cjs https://usuario.github.io/repositorio/');process.exit(1);}
let base;try{base=new URL(raw);if(!['https:','http:'].includes(base.protocol)||base.username||base.password||base.search||base.hash)throw Error();base.pathname=base.pathname.replace(/\/$/,'')+'/';}catch(e){console.error('Use uma URL pública válida, sem senha, parâmetros ou fragmentos.');process.exit(1);}
const out=path.join(root,'_site');fs.mkdirSync(out,{recursive:true});
const files=[];for(const name of fs.readdirSync(root)){if(name.endsWith('.html')||['assets','artigos','ferramentas','CNAME','.nojekyll','ads.txt'].includes(name)){fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});}}
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const xml=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const file of walk(out).filter(p=>p.endsWith('.html'))){const rel=path.relative(out,file).split(path.sep).join('/');const url=new URL(rel==='index.html'?'':rel,base).href;let html=fs.readFileSync(file,'utf8');html=html.replace(/<!-- PUBLICATION_META -->|<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/,`<!-- SEO_START --><link rel="canonical" href="${xml(url)}"><meta property="og:url" content="${xml(url)}">${rel==='404.html'?'<meta name="robots" content="noindex">':''}<!-- SEO_END -->`);
const title=(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]?.replace(/<[^>]+>/g,'')||'Amor de Berço';
const items=[{'@type':'ListItem',position:1,name:'Início',item:base.href}];if(rel.includes('/')){const group=rel.split('/')[0];items.push({'@type':'ListItem',position:2,name:group==='artigos'?'Artigos':'Ferramentas',item:new URL(group+'.html',base).href});}if(rel!=='index.html')items.push({'@type':'ListItem',position:items.length+1,name:title,item:url});
const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items};html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script></head>`);
if(rel==='404.html')html=html.replace(/(href|src)="(?!https?:|data:|#)([^\"]+)"/g,(_,attr,v)=>`${attr}="${xml(new URL(v,base).href)}"`);
fs.writeFileSync(file,html);if(rel!=='404.html')files.push(url);}
fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+files.map(u=>`  <url><loc>${xml(u)}</loc></url>`).join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+new URL('sitemap.xml',base).href+'\n');
console.log(`Publicação preparada em _site: ${files.length} URLs, canonical, breadcrumbs, sitemap e robots para ${base.href}`);
