angular.module('conservar.translation', ['pascalprecht.translate'])

.config(function ($translateProvider) {

  $translateProvider.translations('pt', {
    LANG: 'Português',
    SPANISH : 'Espanhol',
    BRAZIL: 'Português',
    BUTTON_SUBMIT: 'Salvar',
    BUTTON_CANCEL: 'Fechar',
    BUTTON_UPDATE: 'Atualizar',
    BUTTON_DELETE: 'Apagar',
    BUTTON_EDIT: 'Editar',
    BUTTON_SHOW: 'Abrir',
    BUTTON_CLOSE: 'Encerrar',
    BUTTON_OPEN: 'Reabrir',
    BUTTON_RESET: 'Limpar',
    EMPTY_MESSAGE: 'No há peças',
    ADD_MESSAGE: 'Adicionar',
    CONFIRM:{
      ACCOUNT: 'Confira sua conta',
      NOW: 'Confirme!'
    },
    FIELD: {
      NAME:   'Nome',
      DESCRIPTION:   'Descrição',
      ORIGIN: 'Procedência',
      OWNER:  'Proprietário',
      DATE:   'Data Ingreso',
      RESULT: 'Resultado',
      OBSERVATION: 'Observações',
      ADDRESS: 'Endereço',
      PHONE: 'Telefone',
      EMAIL: 'Email',
      SURNAME: 'Sobrenome',
      LANGUAGE: 'Idioma',
      PASSWORD: 'Senha',
      PASSWORD_CONF: 'Confirmação da senha'
    },
    OBJECT: {
      SING: 'Objeto',
      PLUR: 'Objetos',
      ADD:  'Adicionar objeto',
      ADD_PIECE:'Adicionar Peça',
      CREATE_REPORT: 'Gerar Relatório',
      NEW:  'Novo objeto',
      EDIT: 'Editar objeto',
      EMPTY: 'Não há objetos'    
    },
    IMAGE: {
      SING: 'Imagem',
      PLUR: 'Imagens',
      CHANGE: 'Alterar imagem',
      DETAILS: 'Detalhes',
      INCLUDE: 'Incluir no Relatório',
      NOT_INCLUDE: 'Não incluir no Relatório',
      EMPTY: 'Atualmente não há imagens',
      PLACEHOLDER_DESC: 'Insira um nome ou descrição'
    },
    INTERVENTION:{
      SING: 'Intervenção',
      PLUR: 'Intervenções',
      PLACEHOLDER_DESC: 'Como foi a intervenção',
      PLACEHOLDER_MAT: 'Mareriais utilizados',
      PLACEHOLDER_DATE: 'Seleciona a data',
      EMPTY: 'Atualmente não há intervenções'
    },    
    TREATMENT: {
      SING: 'Tratamento',
      PLUR: 'Tratamentos',
      CREATED_DATE: 'Criado no dia ',
      UPDATED_DATE: 'Atualizado no dia ',
      OPEN: 'Aberto',
      CLOSED: 'Fechado',
      NEW: 'Nova Proposta de Tratamento',
      EDIT: 'Editar Proposta de Tratamento',
      SHOW: 'Ver Tratamento',
      PROPOSAL: 'Proposta',
      DIAGNOSIS: 'Diagnóstico',
      TITLE_1: 'Proposta e Diagnóstico',
      TITLE_2: 'Detalhes do tratamento',
    },
    MEASUREMENT:{
      SING: 'Medida',
      PLUR: 'MEdidas',
      MESSAGE: 'em centímetros',
      NEW: 'Nova Medida',
      EDIT: 'Editar Medida',
      PLACEHOLDER: 'Insira so números'
    },
    MATERIAL: {
      SING: 'Material',
      PLUR: 'Materiais',
      NEW: 'Novo Material',
      EDIT: 'Editar Material'
    },
    DETAIL:{
      NAME: 'Nombre',
      VALUE: 'Valor'
    },
    REPORT: {
      SING: 'Relatório',
      PLUR: 'Relatórios',
      DOWNLOAD: 'Relatório criado no',
      DATE: 'Data',
      ACTION: 'Baixar',
      OPEN: 'Abrir relatório',
      CREATING: 'Gerando relatório'
    },
    EXAM: {
      SING: 'Exame',
      PLUR: 'Exames',
      PLACEHOLDER_NAME: 'Insira o nome',
      PLACEHOLDER_RES: 'Como foi o resultado?',
      PLACEHOLDER_OBS: 'Insira as observações',
      EMPTY: 'Atualmente não há exames'
    },
    NOTE: {
      SING: 'Nota',
      PLUR: 'Notas',
      PLACEHOLDER_BODY: 'Adicione uma nota ou comentário',
      EMPTY: 'Atualmente não há notas'
    },
    ORGANIZATION: {
      SING: 'Organização',
      PLUR: 'Organizações'
    },
    ITEM: {
      PLUR: 'Peças',
      SING: 'Peça',
      NEW: 'Nova Peça',
      EDIT: 'Editar Peça'
    },
    USER: {
      PLUR: 'Usuários',
      PROFILE: 'Perfil',
      NEW: 'Agregar Usuários'
    },
    SEARCH:{
      MESSAGE: 'Procurar...'
    },
    LOGIN: {
      KEEP: 'Mantenha-me conectado',
      SCREEN: 'Fazer Login',
      BUTTON: 'Entrar',
      RESET: 'Esqueceu a senha?',
      PLACEHOLDER_PASS: 'Senha',
      PLACEHOLDER_EMAIL: 'Email',
      PLACEHOLDER_PASS_CONF: 'Confira sua senha'
    },
    ERROR:{
      PASS_CONF: 'A confirmação não coincide com a senha'
    },
    INTERVENTIONS: 'Intervenções',
    NOTES: 'Notas',
    EXAMS: 'Exames',
    ACTIONS: 'Ações'
  });

  $translateProvider.translations('es', {
    LANG: 'Español',
    SPANISH: 'Español',
    BRAZIL: 'Portugués',
    BUTTON_SUBMIT: 'Guardar',
    BUTTON_CANCEL: 'Cerrar',
    BUTTON_UPDATE: 'Actualizar',
    BUTTON_DELETE: 'Eliminar',
    BUTTON_EDIT: 'Editar',
    BUTTON_SHOW: 'Abrir',
    BUTTON_CLOSE: 'Cerrar',
    BUTTON_OPEN: 'Abrir',
    BUTTON_RESET: 'Limpiar',
    EMPTY_MESSAGE: 'No hay piezas',
    ADD_MESSAGE: 'Agregar',
    CONFIRM:{
      ACCOUNT: 'Confirma tu cuenta',
      NOW: 'Confirma!'
    },
    FIELD: {
      NAME:   'Nombre',
      DESCRIPTION:   'Descripción',
      ORIGIN: 'Procedencia',
      OWNER: 'Propietario',
      DATE: 'Fecha ingreso',
      RESULT: 'Resultado',
      OBSERVATION: 'Observaciones',
      ADDRESS: 'Dirección',
      PHONE: 'Teléfono',
      EMAIL: 'Email',
      SURNAME: 'Apellido',
      LANGUAGE: 'Idioma'
    },
    OBJECT: {
      SING: 'Objeto',
      PLUR: 'Objetos',
      ADD:  'Agregar objeto',
      ADD_PIECE:'Agregar Pieza',
      CREATE_REPORT: 'Crear Reporte',
      NEW: 'Nuevo objeto',
      EDIT: 'Editar objeto',
      EMPTY: 'No hay objetos'
    },
    IMAGE: {
      SING: 'Imagen',
      PLUR: 'Imágenes',
      CHANGE: 'Cambiar imagen',
      DETAILS: 'Detalles',
      INCLUDE: 'Incluir en el Reporte',
      NOT_INCLUDE: 'No incluir en el Reporte',
      PLACEHOLDER_DESC: 'Agregar un nombre o descripción'
    },
    INTERVENTION:{
      SING: 'Intervención',
      PLUR: 'Intervenciones',
      PLACEHOLDER_DESC: 'Como fue la intervencion',
      PLACEHOLDER_MAT: 'Mareriales utilizados',
      PLACEHOLDER_DATE: 'Selecciona la fecha',
      EMPTY: 'Actualmente no hay intervenciones'
    },
    TREATMENT: {
      SING: 'Tratamiento',
      PLUR: 'Tratamientos',
      CREATED_DATE: 'Creado el día ',
      UPDATED_DATE: 'Actualizado el día ',
      OPEN: 'Abierto',
      CLOSED: 'Cerrado',
      NEW: 'Nueva Propuesta de Tratamiento',
      EDIT: 'Editar Propuesta de Tratamiento',
      SHOW: 'Ver Tratamiento',
      PROPOSAL: 'Propuesta',
      DIAGNOSIS: 'Diagnóstico',
      TITLE_1: 'Propuesta y Diagnóstico',
      TITLE_2: 'Detalles del Tratamiento',
    },
    MEASUREMENT:{
      SING: 'Medida',
      PLUR: 'Medidas',
      MESSAGE: 'en centímetros',
      NEW: 'Nueva Medida',
      EDIT: 'Editar Medida',
      PLACEHOLDER: 'Solo números'
    },
    MATERIAL: {
      SING: 'Material',
      PLUR: 'Materiales',
      NEW: 'Nuevo Material',
      EDIT: 'Editar Material'
    },
    DETAIL:{
      NAME: 'Nombre',
      VALUE: 'Valor'
    },
    REPORT: {
      SING: 'Reporte',
      PLUR: 'Reportes',
      DOWNLOAD: 'Reporte creado el',
      DATE: 'Fecha',
      ACTION: 'Bajar',
      OPEN: 'Abrir reporte',
      CREATING: 'Generando reporte'
    },
    EXAM: {
      SING: 'Examen',
      PLUR: 'Exámenes',
      PLACEHOLDER_NAME: 'Agregue el nombre',
      PLACEHOLDER_RES: 'Cómo fue el resultado?',
      PLACEHOLDER_OBS: 'Agregue si hay alguna observación',
      EMPTY: 'Actualmente no hay exámenes'
    },
    NOTE: {
      SING: 'Nota',
      PLUR: 'Notas',
      PLACEHOLDER_BODY: 'Agregue uma nota o comentario',
      EMPTY: 'Actualmente no hay notas'
    },
    ORGANIZATION: {
      SING: 'Organización',
      PLUR: 'Organizaciones'
    },
    ITEM: {
      PLUR: 'Piezas',
      SING: 'Pieza',
      NEW: 'Nueva Pieza',
      EDIT: 'Editar Pieza'
    },
    USER: {
      PLUR: 'Usuarios',
      PROFILE: 'Perfil',
      NEW: 'Agregar Usuario'
    },
    SEARCH:{
      MESSAGE: 'Buscar...'
    },
    LOGIN: {
      KEEP: 'Mantenerme conectado',
      SCREEN: 'Loguearse',
      BUTTON: 'Entrar',
      RESET: 'Olvidó la contraseña?',
      PLACEHOLDER_PASS: 'Contraseña',
      PLACEHOLDER_EMAIL: 'Email',
      PLACEHOLDER_PASS_CONF: 'Confirma tu contraseña'
    },
    ERROR:{
      PASS_CONF: 'La confirmación de la contraseña no conincide'
    },
    INTERVENTIONS: 'Intervenciones',
    NOTES: 'Notas',
    EXAMS: 'Exámenes',
    ACTIONS: 'Acciones'
  });
});
