# Publicação, conteúdo e monetização

## SEO já implementado

O conteúdo dos artigos está no HTML, sem depender de execução de JavaScript para ser lido. Cada página tem título e descrição, H1 único, links internos e imagens com descrição. A publicação pelo workflow acrescenta canonical, breadcrumbs, sitemap e robots com o endereço verdadeiro. Não há repetição artificial de palavras-chave ou promessas de resultados.

Depois de publicar, você pode cadastrar a propriedade da URL no Search Console, verificar a titularidade pelo método oferecido e enviar `sitemap.xml`. Isso exige uma conta Google. A indexação não é garantida nem imediata. [Guia oficial de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Mapa editorial e de aquisição

| Intenção | Página principal | Próximo conteúdo |
| --- | --- | --- |
| Calcular data provável do parto | ferramentas/calculadora-parto.html | Pré-natal |
| Saber semanas de gravidez | ferramentas/semanas-gravidez.html | Pré-natal |
| Calcular período fértil | ferramentas/periodo-fertil.html | Explicação do método na própria página |
| Encontrar nomes de bebê | ferramentas/nomes-bebe.html | Parentalidade positiva |
| Lista da mala da maternidade | ferramentas/mala-maternidade.html | Apoio nos primeiros dias |
| Contar contrações | ferramentas/contador-contracoes.html | Sinais de trabalho de parto |
| Sono seguro e amamentação | Artigos específicos | Outros cuidados do bebê |

São hipóteses editoriais de intenção, não volumes comprovados. A seleção partiu das ferramentas publicadas pelo BabyCenter e The Bump e das tarefas em destaque no NHS. Não foi obtida uma base comparável de volume, período e país que justificasse “top 6 da internet”.

## Plano de divulgação de quatro semanas

1. Apresente o portal e as três calculadoras com links diretos. Use uma pergunta por publicação social, por exemplo “Como contar semanas de gravidez?”.
2. Destaque sono seguro e amamentação. Identifique a fonte e direcione para o artigo, sem publicar aconselhamento individual nos comentários.
3. Divulgue a lista imprimível da maternidade e o explorador de nomes. Evite captar datas de gestação em formulários ou parâmetros de campanha.
4. Compartilhe o conteúdo de rede de apoio. Se usar Search Console, observe quais consultas trazem impressões antes de decidir os próximos textos.

Sugestão de legenda própria: “Entre a espera e os primeiros colos, uma dúvida de cada vez. Conheça o Amor de Berço: artigos com fontes oficiais e ferramentas gratuitas, sem cadastro.” Acrescente o endereço real depois de publicar.

Reaproveite os artigos em pequenos conteúdos sociais, sempre com link para a leitura completa. O pacote não cria contas, agenda publicações nem dispara mensagens. Para campanhas, parâmetros UTM não medem visitas sozinhos: seria necessário configurar uma ferramenta de análise com a privacidade correspondente. Não use dados de saúde ou segmentação sensível para anúncios.

## Preparação para AdSense

Esta versão **não tem publicidade ativa**. Há páginas de transparência, leitura desobstruída e conteúdo próprio, mas sete guias breves não asseguram aceitação. O Google analisa o conjunto do site. [Requisitos de qualidade das páginas](https://support.google.com/adsense/answer/7299563?hl=pt-BR).

Para ativar de verdade:

1. Preencha sua identidade e um canal real de contato em Sobre/Privacidade; não foi inventado um endereço de e-mail para você. Considere revisão por profissional habilitado antes de expandir recomendações de saúde.
2. Use sua conta AdSense, adicione o endereço publicado e copie o método de verificação mostrado pelo Google. O pacote `integracao-adsense-exemplo.txt` contém um modelo comentado; nada nele é executado.
3. Solicite revisão. Não é possível exibir anúncios sem a aprovação do site. [Conectar ao AdSense](https://support.google.com/adsense/answer/7584263?hl=pt-BR).
4. Quando configurar anúncios, atualize a política de privacidade e implemente os mecanismos exigidos para os públicos atendidos. Consulte a [política de consentimento para usuários da União Europeia](https://www.google.com/about/company/user-consent-policy/). Não basta desenhar um banner; a integração precisa controlar os serviços envolvidos.
5. Use os IDs reais de publicador e unidade de anúncio fornecidos na sua conta. Comece com um espaço identificado como “Publicidade” depois do conteúdo, longe dos botões das ferramentas. Não incentive cliques nem clique nos próprios anúncios. [Políticas AdSense](https://support.google.com/adsense/answer/23921?hl=pt-BR).

Se houver orientação para ads.txt, copie a linha da sua conta para `ads.txt`. O preparador já copia esse arquivo quando ele existe. O arquivo deve estar acessível **na raiz do host**: em `usuario.github.io/repositorio/`, um ads.txt dentro do repositório não fica em `usuario.github.io/ads.txt`. Configure-o no repositório raiz do host ou em um domínio próprio antes de tratar isso como resolvido. [Guia oficial ads.txt](https://support.google.com/adsense/answer/12171612?hl=pt-BR).

Em GitHub Pages de projeto, o robots.txt também só é consultado pelos mecanismos na raiz do host. O sitemap do projeto pode ser enviado diretamente no Search Console. Não existe regra de bloqueio dependente desse robots.txt.

## Manutenção

Reavalie fontes e links periodicamente. Publique datas de revisão verdadeiras. Priorize dúvidas observadas e conteúdo útil, sem criar páginas quase iguais para variações de palavras. Não atribua credenciais médicas a quem não revisou o texto. Preserve os créditos das fotografias e teste os cálculos quando alterar fórmulas.
