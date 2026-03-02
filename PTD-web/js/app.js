(function () {
  'use strict';

  // --- Dados pré-definidos (espelhando ptd_cli.py) ---
  const SECOES_TURMAS = [
    { secao: 'ENSINO MÉDIO INTEGRADO', turmas: ['1º Ano Informática', '2º Ano Informática', '3º Ano Informática', '4º Ano Informática', '1º Ano Eletroeletrônica', '2º Ano Eletroeletrônica', '3º Ano Eletroeletrônica', '4º Ano Eletroeletrônica', '1º Ano Meio Ambiente', '2º Ano Meio Ambiente', '3º Ano Meio Ambiente', '4º Ano Meio Ambiente'] },
    { secao: 'ENSINO SUBSEQUENTE', turmas: ['1º Sem. Meio Ambiente', '2º Sem. Meio Ambiente', '3º Sem. Meio Ambiente', '4º Sem. Meio Ambiente', '1º Sem. Eletroeletrônica', '2º Sem. Eletroeletrônica', '3º Sem. Eletroeletrônica', '4º Sem. Eletroeletrônica'] },
    { secao: 'ENSINO SUPERIOR', turmas: ['1º Sem. Engenharia Elétrica', '2º Sem. Engenharia Elétrica', '3º Sem. Engenharia Elétrica', '4º Sem. Engenharia Elétrica', '5º Sem. Engenharia Elétrica', '6º Sem. Engenharia Elétrica', '7º Sem. Engenharia Elétrica', '8º Sem. Engenharia Elétrica', '9º Sem. Engenharia Elétrica', '10º Sem. Engenharia Elétrica', '1º Sem. Análise e Desenvolvimento de Sistemas', '2º Sem. Análise e Desenvolvimento de Sistemas', '3º Sem. Análise e Desenvolvimento de Sistemas', '4º Sem. Análise e Desenvolvimento de Sistemas', '5º Sem. Análise e Desenvolvimento de Sistemas', '6º Sem. Análise e Desenvolvimento de Sistemas', '7º Sem. Análise e Desenvolvimento de Sistemas'] }
  ];
  const TURMAS_FLAT = SECOES_TURMAS.flatMap(s => s.turmas);
  const TURNOS = ['Manhã', 'Tarde', 'Noite'];

  const ATIVIDADES_APOIO = [
    'Atendimento ao discente (CH Máx p/ semana: 4h)',
    'Atendimento aos programas de nivelamento de estudos (50% da CH do CC Original)',
    'Atendimento a programa de treinamento para competições acadêmicas (CH Máx p/ semana: 4h)',
    'Orientação de monitoria (2h p/ estudante)',
    'Orientação e/ou supervisão de estágio de discentes do IFPE, quando não previstos no formato de componente curricular ou de disciplina no PPC do curso, ou quando for desenvolvido no âmbito do IFPE por instituições conveniadas. (2h p/ estudante)',
    'Participação em núcleo docente estruturante (NDE) (2h p/ NDE)',
    'Participação em colegiados de curso e conselho de classe (CH Máx p/ semana: 2h)',
    'Orientação ou coorientação de trabalhos de conclusão de curso (TCC), quando não previstas no formato de componente curricular ou disciplina no PPC do curso (2h p/ estudante)',
    'Preparação e/ou revisão de material didático impresso e/ou eletrônico para estudante com necessidades especiais (CH Máx p/ semana: 4h)',
    'Atividades extraclasse não contabilizadas na carga horária do componente curricular, em consonância com a Organização Acadêmica do IFPE (CH Máx p/ semana: 3h)',
    'Participação em comissão de orientação para elaboração, redação, revisão e avaliação de relatórios de estágio supervisionado (CH Máx p/ semana: 2h)',
    'Organização, em conjunto com estudantes do IFPE, de eventos científicos e artísticos, tais como congressos, seminários, colóquios e afins, direcionados ao corpo discente da Instituição (CH Máx p/ semana: 3h)',
    'Preparação e/ou revisão de material didático impresso e/ou eletrônico, no caso de professores da EaD, ou quando relacionados aos PPCs dos cursos presenciais (CH Máx p/ semana: 4h)',
    'Gravação de videoaulas e participação em webconferências para o atendimento aos discentes, no caso de docentes na modalidade EaD, ou quando contemplados nos PPCs dos cursos presenciais (CH Máx p/ semana: 4h)',
    'Participação em reuniões semanais do professor-formador com sua equipe de tutores nos componentes curriculares em EaD. (CH Máx p/ semana: 2h)',
    'Participação em reuniões semanais de planejamento pedagógico (CH Máx p/ semana: 2h)'
  ];

  const ATIVIDADES_PESQUISA = [
    'Coordenação de Projetos de Pesquisa e/ou Inovação Tecnológica (De acordo com a carga horária do projeto)',
    'Atuação como membro de Projeto de Pesquisa e Inovação Tecnológica (4h)',
    'Coordenação e/ou participação em projetos de pesquisa e/ou inovação tecnológica de caráter interinstitucional, tendendo a convênios ou acordo de cooperação técnico-científica com o IFPE (De acordo com a carga horária do convênio/projeto)',
    'Atuação em grupo de pesquisa certificado pelo IFPE junto ao CNPq, em efetiva produção, na condição de líder ou vice líder, com projeto de pesquisa cadastrado na Propesq (4h)',
    'Atuação como coordenador de programas institucionais do IFPE de bolsas de incentivo à pesquisa e inovação (PIBIC, PIBITI, BIA, etc.) (4h)',
    'Orientação de estudante(s) de programas institucionais de iniciação científica/inovação tecnológica [carga horária máxima em consoância com os editais e regulamentos de IC&T da Propesq] (2h por estudante)',
    'Orientação/coorientação de TCC/ Monografia na Pós-Graduação Lato Sensu do IFPE, sem remuneração adicional tributável, ou de caráter interinstitucional, em convênio ou acordo de cooperação técnica com o IFPE, quando não previsto no formato de componente curricular ou disciplina no PPC do curso [número máximo de estudantes de acordo com a normativa vigente] (2h por TCC/Monografia)',
    'Atuação como coordenador de TCC, quando não existir curricular ou disciplina equivalente no PPC do curso (4h)',
    'Orientação/coorientação de Dissertação de Mestrado (Carga horária máxima em consoância com os editais e regulamentos dos Programas de Pós Graduação)',
    'Orientação/coorientação de Tese de Doutorado [no máximo 1 estudante] (Carga horária máxima em consoância com os editais e regulamentos dos Programas de Pós Graduação)',
    'Coorientação de Minter / Dinter [não remunerada] (Carga horária máxima em consoância com os editais e regulamentos dos Programas de Pós Graduação)',
    'Avaliação ou emissão de parecer de projetos de pesquisa e/ou inovação (0,25 h [15 min]) por avaliação',
    'Atuação como avaliador ad hoc para emissão de pareceres de projetos, patentes, textos, artigos científicos, etc . (0,50 h [30 min]) por avaliação',
    'Elaboração de Patentes (4h) para cada patente depositada',
    'Registros de Programas de Computador realizados (1h) para cada registro realizado',
    'Elaboração de Desenhos Industriais ou Topografia de circuito integrado (1h) para cada desenho depositado',
    'Registro de Marcas (1h) para cada marca registrada',
    'Elaboração de Relatórios de Levantamento de Anterioridade (1h) para cada relatório elaborado',
    'Elaboração de Relatórios de Monitoramento Tecnológico (4h) para cada relatório elaborado',
    'Ministração de curso de capacitação nas áreas de inovação tecnológica e/ou propriedade industrial, não remunerável [carga horária mínima de 20 horas para um curso único ou para o somatório de cursos realizados no semestre] (2h para cada curso ministrado)',
    'Publicação de artigos científicos em revistas indexadas (4h) para cada artigo aceito',
    'Elaboração ou tradução de livros e manuais técnicos (3h) para cada produção elaborada',
    'Elaboração ou tradução de capítulos de livros, cartilhas e boletins (3h) para cada produção elaborada'
  ];

  const ATIVIDADES_EXTENSAO = [
    'Elaboração, coordenação ou ministração de aula em curso de extensão (4h)',
    'Coordenação de programas e/ou projetos de extensão (de acordo com a CH do programa/projeto)',
    'Atuação como membro/colaborador em projetos de extensão (2h)',
    'Orientação de estudante(s) em programas institucionais de extensão [CH Máx em consoância com os editais e regulamentos da Proext] (2h por estudante)',
    'Coordenação de núcleos de extensão [NAC, NAPNE, NEGED NEABL] (8h)',
    'Atuação como secretário do Núcleo de Extensão (4h)',
    'Atuação como membro do Núcleo de Extensão (2h)',
    'Coordenação, Organização ou Ministração de Programa de Atividade Física, Esporte e Lazer (4h)',
    'Orientação/Coorientação de atividades artístico - culturais (4h)',
    'Atendimento a programas de acesso, permanência e êxito (6h)',
    'Atuação na regência ou direção de ensaios, visando à performance artística dentro e fora da Instituição (6h)',
    'Execução de treinamentos esportivos bem como a participação e realização de eventos esportivo (6h)'
  ];

  const ATIVIDADES_ADMIN = [
    'Participação em comissões e conselhos institucionais (De acordo com a carga horária da portaria)',
    'Coordenação e supervisão de estágio (6h)',
    'Atuação como suporte técnico-pedagógico das coordenações de curso/área/setor de produção (8h)',
    'Atuação como suporte técnico-pedagógico de plantão nas Unidades de Produção (2h)',
    'Participação / Acompanhamento de processo licitatório (4h)',
    'Assessoramento à gestão Institucional (6h)',
    'Assistência à fiscalização de contratos de prestação de serviços técnicos específicos (6h)',
    'Atuação como Ouvidor/a (6h)',
    'Participação em sindicância ou Processo Administrativo (PAD) (10h)',
    'Chefia de departamento acadêmico (16h)',
    'Coordenação de curso/área/setor de produção (16h)',
    'Participação em projetos institucionais (De acordo com a carga horária da portaria)',
    'Coordenação de projetos institucionais (De acordo com a carga horária da portaria)',
    'Atuação em comissão de avaliação institucional (4h)',
    'Representação institucional em conselhos, câmaras, colegiados, comitês, fóruns, núcleos e comissões de outras instituições (2h)',
    'Atuação como membro da Comissão Permanente de Pessoal Docente - CPPD (10h)'
  ];

  // Fator por aula para cálculo da carga semanal (45min=0.75, 50min≈0.83, 60min=1)
  function cargaHorariaSemanal(duracaoMin, aulasPorSemana) {
    const fator = duracaoMin === 45 ? 0.75 : duracaoMin === 50 ? 5/6 : 1;
    return Math.round(aulasPorSemana * fator * 100) / 100;
  }

  // Estado global do PTD
  let state = {
    ano: null,
    semestre: null,
    docente: {},
    disciplinas: [],
    componentes_curriculares: [],
    atividades: [],
    atividades_pesquisa_pos: [],
    atividades_extensao: [],
    atividades_admin_pedagogicas: [],
    complemento_observacoes: ''
  };

  let currentStep = 1;
  const TOTAL_STEPS = 10;

  const DRAFT_KEY = 'ptd_rascunho';

  // Menu clicável: navegar para qualquer etapa
  document.getElementById('step-indicator').addEventListener('click', (e) => {
    const pill = e.target.closest('.step-pill');
    if (pill && pill.dataset.step) {
      goToStep(parseInt(pill.dataset.step, 10));
    }
  });

  // --- Navegação ---
  function goToStep(step) {
    if (step < 1 || step > TOTAL_STEPS) return;
    document.querySelectorAll('.step-card').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.step-pill').forEach(el => { el.classList.remove('active'); });
    const card = document.querySelector(`.step-card[data-step="${step}"]`);
    const pill = document.querySelector(`.step-pill[data-step="${step}"]`);
    if (card) card.classList.remove('d-none');
    if (pill) pill.classList.add('active');
    currentStep = step;
    document.getElementById('btn-anterior').disabled = step === 1;
    document.getElementById('btn-proximo').textContent = step === TOTAL_STEPS ? 'Próximo' : (step === TOTAL_STEPS - 1 ? 'Próximo' : 'Próximo');
    if (step === 4) renderComponentes();
    if (step === 5) renderAtividadesApoio();
    if (step === 6) renderPesquisa();
    if (step === 7) renderExtensao();
    if (step === 8) renderAdmin();
    if (step === 9) atualizarDistribuicao();
  }

  function showMsg(texto, tipo) {
    const el = document.getElementById('msg-global');
    if (!el) return;
    el.className = 'alert alert-' + (tipo || 'info') + ' mt-2';
    el.textContent = texto;
    el.classList.remove('d-none');
  }

  function readStep1() {
    const ano = parseInt(document.getElementById('input-ano').value, 10);
    const semestre = parseInt(document.getElementById('input-semestre').value, 10);
    if (!ano || ano < 2020 || ano > 2030) { showMsg('Informe um ano válido (2020-2030).', 'danger'); return false; }
    if (semestre !== 1 && semestre !== 2) { showMsg('Selecione o semestre 1 ou 2.', 'danger'); return false; }
    state.ano = ano;
    state.semestre = semestre;
    return true;
  }

  function readStep2() {
    state.docente = {
      nome: document.getElementById('input-nome').value.trim(),
      siape: document.getElementById('input-siape').value.trim().replace(/\D/g, ''),
      email: document.getElementById('input-email').value.trim(),
      campus: document.getElementById('input-campus').value.trim(),
      regime_trabalho: document.getElementById('input-regime').value,
      grupo_trabalho: document.getElementById('input-grupo').value
    };
    if (!state.docente.nome) { showMsg('Informe o nome do docente.', 'danger'); return false; }
    if (state.docente.siape && !/^\d+$/.test(state.docente.siape)) { showMsg('SIAPE deve conter apenas números.', 'danger'); return false; }
    document.getElementById('input-siape').value = state.docente.siape;
    return true;
  }

  // --- Etapa 3: Disciplinas ---
  const modalDisc = document.getElementById('modal-disciplina');
  const bsModal = modalDisc ? new bootstrap.Modal(modalDisc) : null;

  document.getElementById('btn-add-disciplina').addEventListener('click', () => {
    document.getElementById('mod-disc-nome').value = '';
    document.getElementById('mod-disc-carga-total').value = '';
    document.getElementById('mod-disc-aulas').value = '3';
    document.getElementById('mod-disc-duracao').value = '45';
    document.getElementById('mod-disc-preparacao').value = '2';
    bsModal.show();
  });

  document.getElementById('mod-disc-salvar').addEventListener('click', () => {
    const nome = document.getElementById('mod-disc-nome').value.trim();
    const cargaTotal = parseFloat(document.getElementById('mod-disc-carga-total').value) || 0;
    const aulas = parseInt(document.getElementById('mod-disc-aulas').value, 10) || 1;
    const duracao = parseInt(document.getElementById('mod-disc-duracao').value, 10) || 45;
    const preparacao = parseFloat(document.getElementById('mod-disc-preparacao').value) || 0;
    if (!nome) { showMsg('Informe o nome da disciplina.', 'danger'); return; }
    if (aulas < 1 || aulas > 9) { showMsg('Aulas por semana entre 1 e 9.', 'danger'); return; }
    const chSemanal = cargaHorariaSemanal(duracao, aulas);
    state.disciplinas.push({ nome, carga_horaria_total: cargaTotal, aulas_por_semana: aulas, duracao_minutos: duracao, carga_horaria_semanal: chSemanal, carga_horaria_preparacao: preparacao });
    bsModal.hide();
    renderListaDisciplinas();
  });

  function renderListaDisciplinas() {
    const div = document.getElementById('lista-disciplinas');
    if (state.disciplinas.length === 0) {
      div.innerHTML = '<p class="text-muted">Nenhuma disciplina cadastrada. Clique em "Adicionar disciplina".</p>';
      return;
    }
    div.innerHTML = state.disciplinas.map((d, i) => `
      <div class="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
        <span><strong>${escapeHtml(d.nome)}</strong> — ${d.carga_horaria_semanal}h/sem (${d.duracao_minutos} min), prep. ${d.carga_horaria_preparacao}h</span>
        <button type="button" class="btn btn-sm btn-outline-danger" data-remove-disc="${i}">Remover</button>
      </div>
    `).join('');
    div.querySelectorAll('[data-remove-disc]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.disciplinas.splice(parseInt(btn.dataset.removeDisc, 10), 1);
        renderListaDisciplinas();
      });
    });
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  // --- Etapa 4: Componentes (disciplina -> turma + turno, múltiplos por disciplina) ---
  let componentesUI = []; // { disciplina, turmas: [{ turma, turno }] }

  function renderComponentes() {
    const container = document.getElementById('container-componentes');
    const selecionadas = state.componentes_curriculares.length ? [...new Set(state.componentes_curriculares.map(c => c.disciplina))] : [];
    const opts = state.disciplinas.map((d, i) => `<option value="${i}">${escapeHtml(d.nome)}</option>`).join('');
    let html = '<p class="mb-2">Selecione as disciplinas que irá ministrar e, para cada uma, adicione turma(s) e turno(s).</p>';
    html += '<div class="mb-3"><label class="form-label">Disciplina a adicionar turma</label><select class="form-select form-select-sm d-inline-block w-auto me-2" id="comp-select-disc">' + opts + '</select>';
    html += '<button type="button" class="btn btn-sm btn-primary" id="comp-add-turma">Adicionar turma/turno</button></div>';
    html += '<div id="comp-lista"></div>';
    container.innerHTML = html;

    function refreshCompLista() {
      const lista = document.getElementById('comp-lista');
      const items = state.componentes_curriculares.map((c, i) => `
        <div class="small border rounded p-2 mb-1">${escapeHtml(c.disciplina)} → ${escapeHtml(c.turma)} (${c.turno}) <button type="button" class="btn btn-sm btn-outline-danger float-end comp-remove" data-i="${i}">Remover</button></div>
      `).join('');
      lista.innerHTML = items || '<p class="text-muted">Nenhuma associação disciplina-turma-turno ainda.</p>';
      lista.querySelectorAll('.comp-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          state.componentes_curriculares.splice(parseInt(btn.dataset.i, 10), 1);
          refreshCompLista();
        });
      });
    }
    refreshCompLista();

    document.getElementById('comp-add-turma').addEventListener('click', () => {
      const sel = document.getElementById('comp-select-disc');
      const idx = parseInt(sel.value, 10);
      if (state.disciplinas[idx] == null) return;
      const nomeDisc = state.disciplinas[idx].nome;
      let globalIdx = 0;
      const turmaOpts = SECOES_TURMAS.map(secao => {
        const opts = secao.turmas.map(t => {
          const i = globalIdx++;
          return `<option value="${i}">${escapeHtml(t)}</option>`;
        }).join('');
        return `<optgroup label="${escapeHtml(secao.secao)}">${opts}</optgroup>`;
      }).join('');
      const turnoOpts = TURNOS.map(t => `<option value="${t}">${t}</option>`).join('');
      const bloco = document.createElement('div');
      bloco.className = 'border rounded p-2 mb-2';
      bloco.innerHTML = `<strong>${escapeHtml(nomeDisc)}</strong><br>
        <select class="form-select form-select-sm d-inline-block w-auto me-2 mt-1 comp-turma">${turmaOpts}</select>
        <select class="form-select form-select-sm d-inline-block w-auto comp-turno">${turnoOpts}</select>
        <button type="button" class="btn btn-sm btn-success ms-2 comp-confirm">OK</button>`;
      const lista = document.getElementById('comp-lista');
      lista.appendChild(bloco);
      const turmaSel = bloco.querySelector('.comp-turma');
      const turnoSel = bloco.querySelector('.comp-turno');
      bloco.querySelector('.comp-confirm').addEventListener('click', () => {
        state.componentes_curriculares.push({
          disciplina: nomeDisc,
          turma: TURMAS_FLAT[parseInt(turmaSel.value, 10)],
          turno: turnoSel.value
        });
        bloco.remove();
        refreshCompLista();
      });
    });
  }

  // Helper: área com checkboxes e texto completo legível
  function renderCheckboxList(containerId, list, idPrefix) {
    let html = '<div class="form-label">Selecione as atividades (múltipla escolha):</div>';
    html += '<div class="atividades-checkbox-list border rounded p-2 bg-white">';
    list.forEach((texto, i) => {
      html += `<label class="d-block mb-2 atividade-item"><input type="checkbox" class="form-check-input me-2" name="${idPrefix}" value="${i}"> <span class="atividade-texto">${escapeHtml(texto)}</span></label>`;
    });
    html += '</div>';
    return html;
  }

  // --- Etapa 5: Atividades de Apoio ao ensino ---
  function renderAtividadesApoio() {
    const container = document.getElementById('container-atividades');
    let html = renderCheckboxList('container-atividades', ATIVIDADES_APOIO, 'apoio-cb');
    html += '<button type="button" class="btn btn-sm btn-primary my-3" id="ativ-apoio-add">Adicionar selecionadas</button>';
    html += '<div id="ativ-apoio-pendentes" class="mb-3"></div>';
    html += '<div id="ativ-apoio-lista"></div>';
    container.innerHTML = html;

    function refreshApoioLista() {
      const lista = document.getElementById('ativ-apoio-lista');
      lista.innerHTML = state.atividades.map((a, i) => `
        <div class="border rounded p-2 mb-2">
          <strong>${escapeHtml(a.atividade)}</strong><br>
          Local: ${escapeHtml(a.local)} | Horário: ${escapeHtml(a.horario)} | Portaria: ${escapeHtml(a.portaria)} | CH semanal: ${a.ch_semanal}h
          <button type="button" class="btn btn-sm btn-outline-danger float-end" data-remove-apoio="${i}">Remover</button>
        </div>
      `).join('');
      lista.querySelectorAll('[data-remove-apoio]').forEach(btn => {
        btn.addEventListener('click', () => { state.atividades.splice(parseInt(btn.dataset.removeApoio, 10), 1); refreshApoioLista(); });
      });
    }
    refreshApoioLista();

    document.getElementById('ativ-apoio-add').addEventListener('click', () => {
      const pendentes = document.getElementById('ativ-apoio-pendentes');
      document.querySelectorAll('input[name="apoio-cb"]:checked').forEach(cb => {
        const nome = ATIVIDADES_APOIO[parseInt(cb.value, 10)];
        if (state.atividades.some(a => a.atividade === nome)) { cb.checked = false; return; }
        const card = document.createElement('div');
        card.className = 'border rounded p-3 mb-2 bg-light';
        card.innerHTML = `
          <div class="fw-bold mb-2">${escapeHtml(nome)}</div>
          <div class="row g-2 mb-2">
            <div class="col-md-3"><label class="form-label small">Local</label><input type="text" class="form-control form-control-sm apoio-inp-local" placeholder="Ex: Lab. 11"></div>
            <div class="col-md-3"><label class="form-label small">Horário</label><input type="time" class="form-control form-control-sm apoio-inp-horario"></div>
            <div class="col-md-3"><label class="form-label small">Portaria</label><input type="text" class="form-control form-control-sm apoio-inp-portaria"></div>
            <div class="col-md-2"><label class="form-label small">CH semanal (h)</label><input type="number" class="form-control form-control-sm apoio-inp-ch" step="0.5" min="0" value="2"></div>
          </div>
          <button type="button" class="btn btn-sm btn-success apoio-confirm">Confirmar</button>
        `;
        const localInp = card.querySelector('.apoio-inp-local');
        const horarioInp = card.querySelector('.apoio-inp-horario');
        const portariaInp = card.querySelector('.apoio-inp-portaria');
        const chInp = card.querySelector('.apoio-inp-ch');
        card.querySelector('.apoio-confirm').addEventListener('click', () => {
          let ch = parseFloat(chInp.value, 10);
          if (isNaN(ch) || ch < 0) ch = 0;
          state.atividades.push({
            atividade: nome,
            local: localInp.value.trim(),
            horario: horarioInp.value || '', // type=time retorna HH:MM
            portaria: portariaInp.value.trim(),
            ch_semanal: Math.round(ch * 100) / 100
          });
          card.remove();
          refreshApoioLista();
        });
        pendentes.appendChild(card);
        cb.checked = false;
      });
    });
  }

  // --- Etapa 6: Pesquisa e Pós-graduação ---
  function renderPesquisa() {
    const container = document.getElementById('container-pesquisa');
    let html = renderCheckboxList('container-pesquisa', ATIVIDADES_PESQUISA, 'pesquisa-cb');
    html += '<button type="button" class="btn btn-sm btn-primary my-3" id="ativ-pesquisa-add">Adicionar selecionadas</button>';
    html += '<div id="ativ-pesquisa-pendentes" class="mb-3"></div>';
    html += '<div id="ativ-pesquisa-lista"></div>';
    container.innerHTML = html;

    function refreshPesquisaLista() {
      const lista = document.getElementById('ativ-pesquisa-lista');
      lista.innerHTML = state.atividades_pesquisa_pos.map((a, i) => `
        <div class="border rounded p-2 mb-2 d-flex justify-content-between align-items-start">
          <span class="atividade-texto">${escapeHtml(a.atividade)} — ${a.carga_horaria}h</span>
          <button type="button" class="btn btn-sm btn-outline-danger ms-2" data-remove-p="${i}">Remover</button>
        </div>
      `).join('');
      lista.querySelectorAll('[data-remove-p]').forEach(btn => {
        btn.addEventListener('click', () => { state.atividades_pesquisa_pos.splice(parseInt(btn.dataset.removeP, 10), 1); refreshPesquisaLista(); });
      });
    }
    refreshPesquisaLista();

    document.getElementById('ativ-pesquisa-add').addEventListener('click', () => {
      const pendentes = document.getElementById('ativ-pesquisa-pendentes');
      document.querySelectorAll('input[name="pesquisa-cb"]:checked').forEach(cb => {
        const nome = ATIVIDADES_PESQUISA[parseInt(cb.value, 10)];
        if (state.atividades_pesquisa_pos.some(a => a.atividade === nome)) { cb.checked = false; return; }
        const card = document.createElement('div');
        card.className = 'border rounded p-3 mb-2 bg-light d-flex align-items-center gap-3 flex-wrap';
        card.innerHTML = `
          <span class="atividade-texto fw-bold">${escapeHtml(nome)}</span>
          <label class="small mb-0">Carga horária (h):</label>
          <input type="number" class="form-control form-control-sm w-auto pesquisa-inp-ch" step="0.5" min="0" value="4" style="max-width:100px">
          <button type="button" class="btn btn-sm btn-success pesquisa-confirm">Confirmar</button>
        `;
        const chInp = card.querySelector('.pesquisa-inp-ch');
        card.querySelector('.pesquisa-confirm').addEventListener('click', () => {
          let ch = parseFloat(chInp.value, 10);
          if (isNaN(ch) || ch < 0) ch = 0;
          state.atividades_pesquisa_pos.push({ atividade: nome, carga_horaria: Math.round(ch * 100) / 100 });
          card.remove();
          refreshPesquisaLista();
        });
        pendentes.appendChild(card);
        cb.checked = false;
      });
    });
  }

  // --- Etapa 7: Extensão ---
  function renderExtensao() {
    const container = document.getElementById('container-extensao');
    let html = renderCheckboxList('container-extensao', ATIVIDADES_EXTENSAO, 'ext-cb');
    html += '<button type="button" class="btn btn-sm btn-primary my-3" id="ativ-ext-add">Adicionar selecionadas</button>';
    html += '<div id="ativ-ext-pendentes" class="mb-3"></div>';
    html += '<div id="ativ-ext-lista"></div>';
    container.innerHTML = html;

    function refreshExtLista() {
      const lista = document.getElementById('ativ-ext-lista');
      lista.innerHTML = state.atividades_extensao.map((a, i) => `
        <div class="border rounded p-2 mb-2">
          <div class="atividade-texto"><strong>${escapeHtml(a.atividade)}</strong></div>
          Projeto: ${escapeHtml(a.projeto)} | Tipo: ${escapeHtml(a.tipo_participacao)} | ${a.inicio_ma} a ${a.termino_ma} | CH: ${a.ch_semanal}h
          <button type="button" class="btn btn-sm btn-outline-danger float-end" data-remove-e="${i}">Remover</button>
        </div>
      `).join('');
      lista.querySelectorAll('[data-remove-e]').forEach(btn => {
        btn.addEventListener('click', () => { state.atividades_extensao.splice(parseInt(btn.dataset.removeE, 10), 1); refreshExtLista(); });
      });
    }
    refreshExtLista();

    document.getElementById('ativ-ext-add').addEventListener('click', () => {
      const pendentes = document.getElementById('ativ-ext-pendentes');
      const anoAtual = String(state.ano || new Date().getFullYear());
      document.querySelectorAll('input[name="ext-cb"]:checked').forEach(cb => {
        const nome = ATIVIDADES_EXTENSAO[parseInt(cb.value, 10)];
        if (state.atividades_extensao.some(a => a.atividade === nome)) { cb.checked = false; return; }
        const card = document.createElement('div');
        card.className = 'border rounded p-3 mb-2 bg-light';
        card.innerHTML = `
          <div class="fw-bold mb-2">${escapeHtml(nome)}</div>
          <div class="row g-2 mb-2">
            <div class="col-md-4"><label class="form-label small">Projeto</label><input type="text" class="form-control form-control-sm ext-inp-projeto"></div>
            <div class="col-md-4"><label class="form-label small">Tipo de participação</label><input type="text" class="form-control form-control-sm ext-inp-tipo"></div>
            <div class="col-md-2"><label class="form-label small">Início (M/A)</label><input type="text" class="form-control form-control-sm ext-inp-inicio" placeholder="MM/AAAA" value="03/${anoAtual}"></div>
            <div class="col-md-2"><label class="form-label small">Término (M/A)</label><input type="text" class="form-control form-control-sm ext-inp-termino" placeholder="MM/AAAA" value="07/${anoAtual}"></div>
            <div class="col-md-2"><label class="form-label small">CH semanal (h)</label><input type="number" class="form-control form-control-sm ext-inp-ch" step="0.5" min="0" value="2"></div>
          </div>
          <button type="button" class="btn btn-sm btn-success ext-confirm">Confirmar</button>
        `;
        const getInp = (cls) => card.querySelector(cls);
        card.querySelector('.ext-confirm').addEventListener('click', () => {
          let ch = parseFloat(getInp('.ext-inp-ch').value, 10);
          if (isNaN(ch) || ch < 0) ch = 0;
          state.atividades_extensao.push({
            atividade: nome,
            projeto: getInp('.ext-inp-projeto').value.trim(),
            tipo_participacao: getInp('.ext-inp-tipo').value.trim(),
            inicio_ma: getInp('.ext-inp-inicio').value.trim() || '01/' + anoAtual,
            termino_ma: getInp('.ext-inp-termino').value.trim() || '12/' + anoAtual,
            ch_semanal: Math.round(ch * 100) / 100
          });
          card.remove();
          refreshExtLista();
        });
        pendentes.appendChild(card);
        cb.checked = false;
      });
    });
  }

  // --- Etapa 8: Administrativo-pedagógicas ---
  function renderAdmin() {
    const container = document.getElementById('container-admin');
    let html = renderCheckboxList('container-admin', ATIVIDADES_ADMIN, 'admin-cb');
    html += '<button type="button" class="btn btn-sm btn-primary my-3" id="ativ-admin-add">Adicionar selecionadas</button>';
    html += '<div id="ativ-admin-pendentes" class="mb-3"></div>';
    html += '<div id="ativ-admin-lista"></div>';
    container.innerHTML = html;

    function refreshAdminLista() {
      const lista = document.getElementById('ativ-admin-lista');
      lista.innerHTML = state.atividades_admin_pedagogicas.map((a, i) => `
        <div class="border rounded p-2 mb-2">
          <div class="atividade-texto"><strong>${escapeHtml(a.atividade)}</strong></div>
          Portaria: ${escapeHtml(a.portaria)} | ${a.inicio_ma} a ${a.termino_ma} | CH: ${a.ch_semanal}h / Máx: ${a.ch_maxima_semanal}h
          <button type="button" class="btn btn-sm btn-outline-danger float-end" data-remove-a="${i}">Remover</button>
        </div>
      `).join('');
      lista.querySelectorAll('[data-remove-a]').forEach(btn => {
        btn.addEventListener('click', () => { state.atividades_admin_pedagogicas.splice(parseInt(btn.dataset.removeA, 10), 1); refreshAdminLista(); });
      });
    }
    refreshAdminLista();

    document.getElementById('ativ-admin-add').addEventListener('click', () => {
      const pendentes = document.getElementById('ativ-admin-pendentes');
      const anoAtual = String(state.ano || new Date().getFullYear());
      document.querySelectorAll('input[name="admin-cb"]:checked').forEach(cb => {
        const nome = ATIVIDADES_ADMIN[parseInt(cb.value, 10)];
        if (state.atividades_admin_pedagogicas.some(a => a.atividade === nome)) { cb.checked = false; return; }
        const card = document.createElement('div');
        card.className = 'border rounded p-3 mb-2 bg-light';
        card.innerHTML = `
          <div class="fw-bold mb-2">${escapeHtml(nome)}</div>
          <div class="row g-2 mb-2">
            <div class="col-md-3"><label class="form-label small">Portaria</label><input type="text" class="form-control form-control-sm admin-inp-portaria"></div>
            <div class="col-md-2"><label class="form-label small">Início (M/A)</label><input type="text" class="form-control form-control-sm admin-inp-inicio" placeholder="MM/AAAA" value="03/${anoAtual}"></div>
            <div class="col-md-2"><label class="form-label small">Término (M/A)</label><input type="text" class="form-control form-control-sm admin-inp-termino" placeholder="MM/AAAA" value="07/${anoAtual}"></div>
            <div class="col-md-2"><label class="form-label small">CH semanal (h)</label><input type="number" class="form-control form-control-sm admin-inp-ch" step="0.5" min="0" value="2"></div>
            <div class="col-md-2"><label class="form-label small">CH máx. semanal (h)</label><input type="number" class="form-control form-control-sm admin-inp-chmax" step="0.5" min="0" value="4"></div>
          </div>
          <button type="button" class="btn btn-sm btn-success admin-confirm">Confirmar</button>
        `;
        const getInp = (cls) => card.querySelector(cls);
        card.querySelector('.admin-confirm').addEventListener('click', () => {
          let ch = parseFloat(getInp('.admin-inp-ch').value, 10);
          if (isNaN(ch) || ch < 0) ch = 0;
          let chMax = parseFloat(getInp('.admin-inp-chmax').value, 10);
          if (isNaN(chMax) || chMax < 0) chMax = ch;
          state.atividades_admin_pedagogicas.push({
            atividade: nome,
            portaria: getInp('.admin-inp-portaria').value.trim(),
            inicio_ma: getInp('.admin-inp-inicio').value.trim() || '01/' + anoAtual,
            termino_ma: getInp('.admin-inp-termino').value.trim() || '12/' + anoAtual,
            ch_semanal: Math.round(ch * 100) / 100,
            ch_maxima_semanal: Math.round(chMax * 100) / 100
          });
          card.remove();
          refreshAdminLista();
        });
        pendentes.appendChild(card);
        cb.checked = false;
      });
    });
  }

  // --- Etapa 9: Distribuição (calculada) ---
  function calcularDistribuicao() {
    const aulas = state.disciplinas.reduce((s, d) => s + (d.carga_horaria_semanal || 0), 0);
    const preparacao = state.disciplinas.reduce((s, d) => s + (d.carga_horaria_preparacao || 0), 0);
    const apoio = state.atividades.reduce((s, a) => s + (a.ch_semanal || 0), 0);
    const pesquisa = state.atividades_pesquisa_pos.reduce((s, a) => s + (a.carga_horaria || 0), 0);
    const extensao = state.atividades_extensao.reduce((s, a) => s + (a.ch_semanal || 0), 0);
    const admin = state.atividades_admin_pedagogicas.reduce((s, a) => s + (a.ch_semanal || 0), 0);
    const total = aulas + preparacao + apoio + pesquisa + extensao + admin;
    return {
      aulas: Math.round(aulas * 100) / 100,
      preparacao_aulas: Math.round(preparacao * 100) / 100,
      apoio_ensino: Math.round(apoio * 100) / 100,
      pesquisa_pos: Math.round(pesquisa * 100) / 100,
      extensao: Math.round(extensao * 100) / 100,
      admin_pedagogico: Math.round(admin * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }

  function atualizarDistribuicao() {
    const d = calcularDistribuicao();
    document.getElementById('dist-aulas').textContent = d.aulas + ' h';
    document.getElementById('dist-preparacao').textContent = d.preparacao_aulas + ' h';
    document.getElementById('dist-apoio').textContent = d.apoio_ensino + ' h';
    document.getElementById('dist-pesquisa').textContent = d.pesquisa_pos + ' h';
    document.getElementById('dist-extensao').textContent = d.extensao + ' h';
    document.getElementById('dist-admin').textContent = d.admin_pedagogico + ' h';
    document.getElementById('dist-total').textContent = d.total + ' h';
  }

  // --- Exportar JSON (compatível com ptd_cli.py) ---
  function buildPTDData() {
    const dist = calcularDistribuicao();
    return {
      ano: state.ano,
      semestre: state.semestre,
      docente: state.docente,
      disciplinas: state.disciplinas,
      componentes_curriculares: state.componentes_curriculares,
      atividades: state.atividades,
      atividades_pesquisa_pos: state.atividades_pesquisa_pos,
      atividades_extensao: state.atividades_extensao,
      atividades_admin_pedagogicas: state.atividades_admin_pedagogicas,
      distribuicao_carga_horaria: dist,
      complemento_observacoes: document.getElementById('input-complemento').value.trim()
    };
  }

  function downloadJSON() {
    const data = buildPTDData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ptd_' + state.ano + '_' + state.semestre + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function buildPTDTexto() {
    const d = state.docente;
    const dist = calcularDistribuicao();
    let lines = [];
    lines.push('PTD - Planejamento de Trabalho Docente');
    lines.push('=====================================');
    lines.push('');
    lines.push('Ano letivo: ' + (state.ano || '—'));
    lines.push('Semestre: ' + (state.semestre || '—'));
    lines.push('');
    lines.push('--- DADOS DO DOCENTE ---');
    lines.push('Nome: ' + (d.nome || '—'));
    lines.push('SIAPE: ' + (d.siape || '—'));
    lines.push('E-mail: ' + (d.email || '—'));
    lines.push('Campus: ' + (d.campus || '—'));
    lines.push('Regime: ' + (d.regime_trabalho || '—'));
    lines.push('Grupo: ' + (d.grupo_trabalho || '—'));
    lines.push('');
    lines.push('--- DISCIPLINAS ---');
    state.disciplinas.forEach(disc => {
      lines.push('• ' + disc.nome + ' | Carga total: ' + disc.carga_horaria_total + 'h | Semanal: ' + disc.carga_horaria_semanal + 'h | Preparação: ' + disc.carga_horaria_preparacao + 'h');
    });
    lines.push('');
    lines.push('--- COMPONENTES CURRICULARES E TURMAS ---');
    state.componentes_curriculares.forEach(c => {
      lines.push('• ' + c.disciplina + ' → ' + c.turma + ' (' + c.turno + ')');
    });
    lines.push('');
    lines.push('--- ATIVIDADES DE APOIO AO ENSINO ---');
    state.atividades.forEach(a => {
      lines.push('• ' + a.atividade);
      lines.push('  Local: ' + a.local + ' | Horário: ' + a.horario + ' | Portaria: ' + a.portaria + ' | CH semanal: ' + a.ch_semanal + 'h');
    });
    lines.push('');
    lines.push('--- PESQUISA E PÓS-GRADUAÇÃO ---');
    state.atividades_pesquisa_pos.forEach(a => {
      lines.push('• ' + a.atividade + ' | ' + a.carga_horaria + 'h');
    });
    lines.push('');
    lines.push('--- EXTENSÃO ---');
    state.atividades_extensao.forEach(a => {
      lines.push('• ' + a.atividade);
      lines.push('  Projeto: ' + a.projeto + ' | ' + a.inicio_ma + ' a ' + a.termino_ma + ' | CH: ' + a.ch_semanal + 'h');
    });
    lines.push('');
    lines.push('--- ADMINISTRATIVO-PEDAGÓGICAS ---');
    state.atividades_admin_pedagogicas.forEach(a => {
      lines.push('• ' + a.atividade);
      lines.push('  Portaria: ' + a.portaria + ' | ' + a.inicio_ma + ' a ' + a.termino_ma + ' | CH: ' + a.ch_semanal + 'h / Máx: ' + a.ch_maxima_semanal + 'h');
    });
    lines.push('');
    lines.push('--- DISTRIBUIÇÃO DA CARGA HORÁRIA ---');
    lines.push('Aulas: ' + dist.aulas + ' h');
    lines.push('Preparação de aulas: ' + dist.preparacao_aulas + ' h');
    lines.push('Apoio ao ensino: ' + dist.apoio_ensino + ' h');
    lines.push('Pesquisa e pós-graduação: ' + dist.pesquisa_pos + ' h');
    lines.push('Extensão: ' + dist.extensao + ' h');
    lines.push('Administrativo-pedagógico: ' + dist.admin_pedagogico + ' h');
    lines.push('TOTAL: ' + dist.total + ' h');
    lines.push('');
    const comp = (document.getElementById('input-complemento') && document.getElementById('input-complemento').value) || state.complemento_observacoes || '';
    if (comp) {
      lines.push('--- COMPLEMENTO/OBSERVAÇÕES ---');
      lines.push(comp);
    }
    return lines.join('\r\n');
  }

  function downloadTXT() {
    state.complemento_observacoes = document.getElementById('input-complemento').value.trim();
    const texto = buildPTDTexto();
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ptd_' + (state.ano || 'rascunho') + '_' + (state.semestre || '') + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  document.getElementById('btn-finalizar').addEventListener('click', () => {
    state.complemento_observacoes = document.getElementById('input-complemento').value.trim();
    downloadJSON();
    showMsg('Arquivo JSON baixado. Nome: ptd_' + state.ano + '_' + state.semestre + '.json', 'success');
  });

  document.getElementById('btn-baixar-txt').addEventListener('click', () => {
    downloadTXT();
    showMsg('Arquivo TXT baixado.', 'success');
  });

  document.getElementById('btn-salvar-depois').addEventListener('click', () => {
    state.complemento_observacoes = document.getElementById('input-complemento').value.trim();
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(buildPTDData()));
      showMsg('PTD salvo para preencher depois. Ao reabrir o aplicativo, você poderá carregar este rascunho.', 'success');
    } catch (e) {
      showMsg('Erro ao salvar: ' + e.message, 'danger');
    }
  });

  document.getElementById('btn-salvar-local').addEventListener('click', () => {
    state.complemento_observacoes = document.getElementById('input-complemento').value.trim();
    const key = 'ptd_' + state.ano + '_' + state.semestre;
    try {
      localStorage.setItem(key, JSON.stringify(buildPTDData()));
      showMsg('PTD salvo no navegador (chave: ' + key + ').', 'success');
    } catch (e) {
      showMsg('Erro ao salvar: ' + e.message, 'danger');
    }
  });

  // --- Botões Próximo / Anterior ---
  document.getElementById('btn-proximo').addEventListener('click', () => {
    if (currentStep === 1 && !readStep1()) return;
    if (currentStep === 2 && !readStep2()) return;
    goToStep(currentStep + 1);
  });

  document.getElementById('btn-anterior').addEventListener('click', () => goToStep(currentStep - 1));

  // Carregar PTD de arquivo JSON ou TXT (conteúdo JSON)
  document.getElementById('btn-carregar-ptd').addEventListener('click', () => {
    const input = document.getElementById('input-file-ptd');
    const file = input.files && input.files[0];
    if (!file) { showMsg('Escolha um arquivo JSON ou TXT.', 'warning'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        let raw = reader.result;
        if (typeof raw !== 'string') raw = '';
        const data = JSON.parse(raw);
        state = {
          ano: data.ano,
          semestre: data.semestre,
          docente: data.docente || {},
          disciplinas: data.disciplinas || [],
          componentes_curriculares: data.componentes_curriculares || [],
          atividades: data.atividades || [],
          atividades_pesquisa_pos: data.atividades_pesquisa_pos || [],
          atividades_extensao: data.atividades_extensao || [],
          atividades_admin_pedagogicas: data.atividades_admin_pedagogicas || [],
          complemento_observacoes: data.complemento_observacoes || ''
        };
        document.getElementById('input-ano').value = state.ano || '';
        document.getElementById('input-semestre').value = state.semestre ? String(state.semestre) : '';
        document.getElementById('input-nome').value = state.docente.nome || '';
        document.getElementById('input-siape').value = state.docente.siape || '';
        document.getElementById('input-email').value = state.docente.email || '';
        document.getElementById('input-campus').value = state.docente.campus || '';
        document.getElementById('input-regime').value = state.docente.regime_trabalho || '20h';
        document.getElementById('input-grupo').value = state.docente.grupo_trabalho || 'Grupo I';
        document.getElementById('input-complemento').value = state.complemento_observacoes || '';
        renderListaDisciplinas();
        input.value = '';
        showMsg('PTD carregado. Revise as etapas e avance para editar ou baixar novamente.', 'success');
      } catch (e) {
        showMsg('Arquivo inválido (use JSON ou TXT com conteúdo JSON): ' + e.message, 'danger');
      }
    };
    reader.readAsText(file, 'UTF-8');
  });

  // Rascunho: carregar ou descartar
  function carregarRascunho() {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      state = {
        ano: data.ano,
        semestre: data.semestre,
        docente: data.docente || {},
        disciplinas: data.disciplinas || [],
        componentes_curriculares: data.componentes_curriculares || [],
        atividades: data.atividades || [],
        atividades_pesquisa_pos: data.atividades_pesquisa_pos || [],
        atividades_extensao: data.atividades_extensao || [],
        atividades_admin_pedagogicas: data.atividades_admin_pedagogicas || [],
        complemento_observacoes: data.complemento_observacoes || ''
      };
      document.getElementById('input-ano').value = state.ano || '';
      document.getElementById('input-semestre').value = state.semestre ? String(state.semestre) : '';
      document.getElementById('input-nome').value = state.docente.nome || '';
      document.getElementById('input-siape').value = state.docente.siape || '';
      document.getElementById('input-email').value = state.docente.email || '';
      document.getElementById('input-campus').value = state.docente.campus || '';
      document.getElementById('input-regime').value = state.docente.regime_trabalho || '20h';
      document.getElementById('input-grupo').value = state.docente.grupo_trabalho || 'Grupo I';
      document.getElementById('input-complemento').value = state.complemento_observacoes || '';
      renderListaDisciplinas();
    } catch (e) { /* ignore */ }
  }

  document.getElementById('btn-carregar-rascunho').addEventListener('click', () => {
    carregarRascunho();
    document.getElementById('alert-rascunho').classList.add('d-none');
  });

  document.getElementById('btn-descartar-rascunho').addEventListener('click', () => {
    localStorage.removeItem(DRAFT_KEY);
    document.getElementById('alert-rascunho').classList.add('d-none');
  });

  // SIAPE: aceitar apenas números na digitação
  document.getElementById('input-siape').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });

  // Inicialização
  renderListaDisciplinas();
  goToStep(1);

  if (localStorage.getItem(DRAFT_KEY)) {
    document.getElementById('alert-rascunho').classList.remove('d-none');
    document.getElementById('alert-rascunho').classList.add('show');
  }
})();
