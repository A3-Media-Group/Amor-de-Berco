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

- 21 páginas HTML: início, índice de artigos, índice de ferramentas, 7 artigos, 6 ferramentas, sobre, fontes, privacidade, termos e 404.
- Calculadoras de parto, idade gestacional e período fértil, 80 nomes, mala com salvamento local e impressão, contador de contrações com exportação CSV.
- 3 fotografias reais locais e créditos de licença Pexels.
- Navegação por fase, busca de artigos, menu móvel, estilos de impressão e acessibilidade básica.
- Títulos e descrições exclusivos, conteúdo já presente no HTML, metadados Open Graph e Article JSON-LD.
- Automação de sitemap, canonical e breadcrumbs na publicação.
- Política editorial e transparência sobre apoio de IA e ausência de revisão clínica independente.

## Atualizar conteúdo

Edite o arquivo HTML do artigo. Atualize fonte, data visível e JSON-LD quando houver revisão real. O índice `artigos.html` e os destaques de `index.html` são HTML: atualize seus cartões se mudar títulos ou endereços. `assets/style.css` controla o visual; `assets/tools.js`, as ferramentas.

Para acrescentar páginas, copie a estrutura de uma página existente, use título e descrição próprios e deixe o comentário `<!-- PUBLICATION_META -->` no head. O preparador descobre automaticamente páginas em `artigos` e `ferramentas` para o sitemap.

## Google e monetização

Leia `GUIA-SEO-E-MONETIZACAO.md`. O pacote não usa um ID AdSense fictício. Nenhum anúncio, pixel ou Analytics está ativo. Monetizar requer sua conta, sua identificação de publicador e aprovação do Google; o código sozinho não garante aprovação, indexação ou renda.

As seis ferramentas foram escolhidas por recorrência nos portais pesquisados. **Não há comprovação de que sejam as seis mais buscadas.** A metodologia e os links estão em `fontes.html`.

## Direitos

Você pode usar e adaptar o código e os textos criados para este projeto. Fotografias continuam sujeitas à [licença Pexels](https://www.pexels.com/license/), com os créditos em `fontes.html`. As pessoas retratadas e instituições citadas não endossam o site.
