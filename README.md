# PTD-IFPE-GUS
Sistema de Plano de Trabalho Docente

PTD - Planejamento de Trabalho Docente
======================================

Este projeto tem como objetivo auxiliar o planejamento docente do IFPE campus Garanhuns.  
O aplicativo chama-se **PTD**. Foi desenvolvido com IA usando o editor [**Cursor**] (https://cursor.com/) via prompts (sem codificação direta deste usuário).  

Nesta primeira versão, o PTD será um aplicativo web que:

- Solicita o **ano** e o **semestre letivo**.
- Usa essas informações para definir o **arquivo de dados** após finalização do preenchimento das informações (`ptd_<ano>_<semestre>.json`).
- Coleta os dados básicos do docente:
  - Nome
  - SIAPE
  - E-mail
  - Campus
- Permite escolher o **regime de trabalho**: `20h`, `40h` ou `DE`.
- Permite escolher o **grupo de trabalho**: `Grupo I`, `Grupo II`, `Grupo III`, `Grupo IV`, `Grupo V`, `Grupo VI`.

Os dados são salvos em um arquivo JSON e TXT, permitindo reaproveitamento e edição em versões futuras.

## Requisitos

- Python 3.9 ou superior instalado.

Para dependências de terceiros, consulte `requirements.txt` (por enquanto, não há bibliotecas externas).

## Como executar

1. Baixe a pasta completa do projeto;
2. Salve-a em algum local no computador;
3. Acesse a pasta e clique em **index.html**

A página principal do projeto será carregada no navegador padrão.

Você será guiado passo a passo para preencher as informações do PTD.

4. Siga as 10 etapas no topo da página (Ano/Sem., Docente, Disciplinas, Componentes, Atividades, Pesquisa, Extensão, Admin., Distribuição, Observações).

5. Ao final, use **Finalizar e baixar JSON** para obter o arquivo `ptd_<ano>_<semestre>.json`, ou **Salvar no navegador** para guardar no localStorage ou ainda **Finalizar e baixar TXT**.
   
6. Escolha o local onde deseja salvar o arquivo.

7. Na etapa 1 é possível **Carregar** um PTD existente (arquivo JSON) para editar ou reaproveitar.

### Tecnologias

- HTML5, CSS3, Bootstrap 5 (via CDN)
- JavaScript (vanilla), sem dependências extras

# A FAZER

1. Ano/Sem:
Não importa arquivo .txt. A importação só recohce o JSON.

5. Atividades de Apoio ao Ensino
Ao clicar em "Adicionar selecionadas", o horário só permite a inserção do horário inicial. A normativa pede hor. inicial e final.

10. Observações
Em "Baixar JSON" e "Baixar TXT", o local é especificado pelo usuário. TALVEZ... fosse melhor um local padrão dentro da pasta do projeto, por exemplos, "PTDs Salvos"

**GERAL**
1. Gerar pdf, html ou docx/odt com as informações para publilcação no site institucional
2. Se pdf ou docx/odt, criar campos para assinatura digital do gov.br após geração do arquivo
3. Publicar automaticamente no site institucional?
