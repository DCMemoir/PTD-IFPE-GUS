# PTD-IFPE-GUS
Sistema de Plano de Trabalho Docente

PTD - Planejamento de Trabalho Docente
======================================

Este projeto tem como objetivo auxiliar o planejamento docente do IFPE campus Garanhuns.  
O aplicativo chama-se **PTD**. Foi desenvolvido com IA pelo editor **Curso** via prompts (sem codificação direta deste usuário).  

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

1. Alguns pop-ups surgem no navegador para serem preenchidos. Está "feio" e precisa ser alterado.
2. Aguns campos de preenchimento não estão bem definidos em relação aos seus valores (por exemplo, no campo e-mail, pode-se digitar qualquer coisa).
3. O arquivo JSON e o TXT, que são texto puro, não estão no modelo fornecido pelo IFPE. Será necessário outra etapa para formatação dos informações constantes no documento. Talvez em LaTeX, posteriormente.
4. (...)
