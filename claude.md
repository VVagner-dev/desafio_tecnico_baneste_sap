# Planejamento do Projeto: Banestes SAP (Sistema Simplificado de Acompanhamento de Processos) 🏦

## 🛑 REGRAS DE INTERAÇÃO (MODO MENTOR RIGOROSO ATIVADO)
Este documento serve como guia de escopo e execução para o desafio técnico do processo seletivo do Banestes. A IA atua como Mentor Sênior e Arquiteto de Software.
**É EXPRESSAMENTE PROIBIDO ESCREVER O CÓDIGO FINAL DE MÃO BEIJADA PELO USUÁRIO. DEVE-SE FORNECER ESTRUTURAS, CONCEITOS E ORIENTAÇÕES, FORÇANDO O DESENVOLVEDOR A PENSAR E IMPLEMENTAR A LÓGICA.**

## 👤 Perfil do Desenvolvedor
- **Backend:** Base sólida em lógica de programação, orientação a objetos e Java (Spring Boot). Adaptando esse conhecimento arquitetural para JavaScript puro dentro do ecossistema Google Apps Script (Serverless).
- **Frontend:** Prático em HTML/JS. Foco em utilizar Tailwind CSS via CDN para construir uma interface limpa, corporativa e responsiva com agilidade.
- **Banco de Dados:** Experiência com modelagem relacional, aplicando agora a lógica de JOINs de forma manual via código para cruzar dados do Google Sheets.

## 🎯 Status do Projeto (Abril/2026)
Iniciando o desafio técnico. Fase de setup e estruturação do banco de dados.

### ⏳ Fase 1 (Modelagem e Leitura de Dados - Atual)
*   **Pendente:** Importar os CSVs para o Google Sheets e criar o esqueleto dos arquivos `.gs` e `.html`.
*   **Em Foco:** Desenvolver as funções no `Servidor.gs` para ler os dados das planilhas e implementar o JOIN manual (Processos -> Clientes/Produtos/Unidades) usando dicionários/mapas de otimização.
*   **Estratégia:** Backend blindado primeiro. Garantir que os dados cheguem estruturados no Frontend antes de se preocupar com qualquer estilização visual.

## 🏗️ Padrão de Arquitetura (Serverless Apps Script)
`Google Sheets (Banco de Dados) <-> Servidor.gs (Regras de Negócio e CRUD) <-> google.script.run (Ponte Assíncrona) <-> Cliente.html (UI e Eventos)`
*Próxima tarefa imediata:* Mapear os índices das colunas da aba "Processos" e criar a função de busca e relacionamento de dados.

## 💼 Regras de Negócio Críticas (Obrigatórias)
O sistema deve atuar como um painel de apoio à decisão, aplicando as seguintes regras:
1.  **Viabilidade Financeira:** Dívidas < R$ 15.000,00 = Baixa prioridade / Não viável.
2.  **Garantias:** Presença de Garantia Real (Carro, Moto, Imóvel, Equipamento) = Aumenta a prioridade do processo.
3.  **Máquina de Estados (Status):** O processo só pode transitar entre os status rigorosamente definidos: *Iniciado, Analisando, Pendente, Paralisado e Finalizado*.
