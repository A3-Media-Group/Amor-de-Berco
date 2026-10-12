# Amor de Berço

Site estático em português: HTML, CSS e JavaScript puro. Sem banco de dados, mensalidade, APIs pagas, cadastro de visitantes ou instalação de dependências.

## Publicar no GitHub Pages

1. Extraia o ZIP. Coloque **o conteúdo da pasta `amor-de-berco` na raiz do seu repositório**, incluindo `.github`, `.nojekyll`, `assets`, `artigos`, `ferramentas` e `scripts`. Não coloque só o ZIP ou só o index.html no GitHub. Pastas iniciadas por ponto podem ficar ocultas; confira que `.github/workflows/pages.yml` está presente no repositório.
2. No repositório, entre em **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Abra **Actions → Publicar Amor de Berço → Run workflow**. Nas próximas alterações em `main` ou `master`, a publicação será automática. Se sua branch tiver outro nome, ajuste `branches` no workflow.
4. Aguarde a conclusão. O endereço público aparece em Settings → Pages e no resultado da execução.

O fluxo detecta a URL do GitHub Pages, inclusive a pasta do repositório, e gera canonical, breadcrumbs, sitemap.xml e robots.txt. Você não precisa inventar um domínio nem instalar Node no computador para esse fluxo. A pasta `_site` é apenas a cópia publicada. O site final continua sendo HTML estático.

A sua conta GitHub já existente é suficiente. GitHub Pages permite hospedagem gratuita em repositórios públicos no plano Free, sujeita aos limites do serviço. Não criei conta nem publiquei na sua conta.

Fonte: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Abrir sem publicar

Abra `index.html` no navegador. Artigos, navegação e ferramentas funcionam localmente. O salvamento da mala em endereços `file://` depende do navegador; o comportamento foi validado por HTTP local. Para uma publicação fora do fluxo acima, execute com Node instalado:

```sh
node scripts/prepare-publication.cjs https://seu-endereco-publico/
```

Envie o conteúdo de `_site` para a hospedagem. Não use esse endereço de exemplo como sua URL real. Se mudar o domínio, execute novamente com o endereço novo.

## O que está incluído

- **Gravidez semana a semana** (estilo BabyCenter): calculadora por DUM ou DPP e 42 páginas, uma por semana, com tamanho do bebê, mudanças no corpo, dicas, exames da fase, FAQ e navegação entre semanas.
- **12 ferramentas**: gravidez semana a semana, data provável do parto (DUM, concepção, ultrassom, FIV, cronograma de exames e exportação .ics), semanas de gravidez (com meses e trimestre), período fértil (4 ciclos), ganho de peso na gestação (IOM, inclusive gêmeos), contador de contrações (médias da última hora, salvo no aparelho), mala da maternidade, lista de enxoval, calendário de vacinas do SUS com datas, idade do bebê/idade corrigida com marcos, diário de mamadas/fraldas/sono e 227 nomes com significado e favoritos.
- **17 artigos**, cada um com foto exclusiva (sem repetição: o gerador falha se houver imagem repetida), FAQ, fontes e "Leia também".
- SEO: títulos e descrições únicos, Open Graph com imagem, JSON-LD (Article, FAQPage, WebApplication, BreadcrumbList, WebSite, Organization), canonical, `sitemap.xml` e `robots.txt` na raiz com o domínio https://amordeberco.com.br/.

## Atualizar conteúdo

Artigos, semanas, ferramentas, índices e páginas institucionais são gerados a partir de `scripts/data/` e `scripts/site-lib.cjs`. Depois de editar, rode (Node 18+):

```sh
node scripts/build-pages.cjs
node scripts/prepare-publication.cjs https://amordeberco.com.br/
```

O primeiro comando gera o HTML; o segundo acrescenta canonical, breadcrumbs, `sitemap.xml` e `robots.txt` na raiz e copia tudo para `_site`. `assets/tools.js` contém as ferramentas e `assets/style.css`, o visual.

As fotos dos artigos novos são carregadas do Pexels (licença gratuita, sem cadastro). Se uma foto não carregar, `assets/app.js` troca por uma ilustração local.

## Google e monetização

Leia `GUIA-SEO-E-MONETIZACAO.md`. O pacote não usa um ID AdSense fictício. Nenhum anúncio, pixel ou Analytics está ativo. Monetizar requer sua conta, sua identificação de publicador e aprovação do Google; o código sozinho não garante aprovação, indexação ou renda.

Ferramentas e temas foram escolhidos por recorrência nos principais portais de maternidade e nas orientações de saúde. **Não há dados oficiais de volume de busca que comprovem um ranking.** A metodologia e os links estão em `fontes.html`.

## Direitos

Você pode usar e adaptar o código e os textos criados para este projeto. Fotografias continuam sujeitas à [licença Pexels](https://www.pexels.com/license/), com os créditos em `fontes.html`. As pessoas retratadas e instituições citadas não endossam o site.
