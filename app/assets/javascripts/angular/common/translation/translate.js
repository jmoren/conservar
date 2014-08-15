angular.module('conservar.translation', ['pascalprecht.translate'])

.config(['$translateProvider', function ($translateProvider) {

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
    LOADING: 'Carregando data',
    CONFIRM:{
      ACCOUNT: 'Confira sua conta',
      NOW: 'Confirme!'
    },
    RESET: {
      ACCOUNT: 'Ingrese sua nova senha',
      NOW: 'Confirmar'
    },
    RECOVER:{
      ACCOUNT: 'Recuperar sua senha',
      NOW: 'Enviar instruções por email',
      SUCCESS: 'Um email foi enviado para recuperar sua senha. Pode demorar uns minutos'
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
      EMPTY: 'Atualmente não há objetos'    
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
      EMPTY: 'Atualmente não há tratamentos'
    },
    MEASUREMENT:{
      SING: 'Medida',
      PLUR: 'Medidas',
      ADD_PLUR: 'Adicionar medidas',
      MESSAGE: 'em centímetros',
      NEW: 'Nova Medida',
      EDIT: 'Editar Medida',
      PLACEHOLDER: 'Insira so números'
    },
    MATERIAL: {
      SING: 'Material',
      PLUR: 'Materiais',
      NEW: 'Novo Material',
      EDIT: 'Editar Material',
      ADD_PLUR: 'Adicionar material'
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
      CREATING: 'Gerando relatório',
      EMPTY: 'Atualmente não há relatórios'
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
      PLUR: 'Organizações',
      PLACEHOLDER_NAME: 'Insira o nome ',
      PLACEHOLDER_PHONE: 'Insira o telefone ',
      PLACEHOLDER_CONTACT: 'Insira o email de contato',
      PLACEHOLDER_ADDRESS: 'Insira o endereço ',
      NOTE: 'Essas informações estarão disponíveis no relatório quando seja gerado',
      LOADING:{
        ERROR: 'Temos um erro carregando os dados. Tente mais tarde!'
      },
      UPDATE: {
        ERROR: 'Error atualizando sua Organização',
        SUCCESS: 'Sua Organização foi atualizada com sucesso'
      }
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
      NEW: 'Agregar Usuários',
      PLACEHOLDER_NAME: 'Seu nome',
      PLACEHOLDER_LAST: 'Seu sobrenome',
      LOADING:{
        ERROR: 'Temos um erro carregando os dados. Tente mais tarde!',
        ALL_ERROR: 'Não foi possível carregar os usuarios. Tente novamente mais tarde'
      },
      CREATE: {
        SUCCESS: 'O usuário foi criado com sucesso',
        ERROR: 'Não foi possível adicionar o usuário'
      },
      UPDATE: {
        ERROR: 'Error atualizando sua conta',
        SUCCESS: 'Sua conta foi atualizada com sucesso'
      },
      DELETE:{
        TITLE: 'Gerenciamento de usuários',
        CONFIRM: 'Apagar usuário',
        SUCCESS: 'O usuário foi apagado com sucesso',
        ERROR: 'O usuário não foi apagado. Tente novamente mais tarde',
        MESSAGE: 'Você tem certeza de excluir o usuário '
      },
      CONFIRM: {
        SUCCESS: 'Um email foi enviado novamente para confirmar a conta',
        ERROR: 'Não foi possível enviar a confirmação'
      }
    },
    SEARCH:{
      MESSAGE: 'Procurar...'
    },
    LOGIN: {
      KEEP: 'Mantenha-me conectado',
      SCREEN: 'Iniciar sessão',
      BUTTON: 'Entrar',
      RESET: 'Esqueceu a senha?',
      PLACEHOLDER_PASS: 'Senha',
      PLACEHOLDER_EMAIL: 'Email',
      PLACEHOLDER_PASS_CONF: 'Confira sua senha',
      GO_BACK: 'Voltar para o login'
    },
    ERROR:{
      PASS_CONF: 'A confirmação não coincide com a senha'
    },
    INTERVENTIONS: 'Intervenções',
    NOTES: 'Notas',
    EXAMS: 'Exames',
    ACTIONS: 'Ações',
    LOGOUT: 'Sair do sistema',
    PROFILE: 'Ver / Editar seu perfil'
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
    LOADING: 'Cargando datos',
    CONFIRM:{
      ACCOUNT: 'Confirma tu cuenta',
      NOW: 'Confirma!'
    },
    RESET: {
      ACCOUNT: 'Ingrese su nueva contraseña',
      NOW: 'Confirmar'
    },

    RECOVER:{
      ACCOUNT: 'Recuperar contraseña',
      NOW: 'Enviar instrucciones por email',
      SUCCESS: 'Un email será enviado para la recuperación de su contraseña. Puede demorar unos minutos'
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
      EMPTY: 'Actualmente no hay objetos'
    },
    IMAGE: {
      SING: 'Imagen',
      PLUR: 'Imágenes',
      CHANGE: 'Cambiar imagen',
      DETAILS: 'Detalles',
      INCLUDE: 'Incluir en el Reporte',
      NOT_INCLUDE: 'No incluir en el Reporte',
      PLACEHOLDER_DESC: 'Agregar un nombre o descripción',
      EMPTY: 'No hay Imágenes'
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
      EMPTY: 'Actualmente no hay tratamientos'
    },
    MEASUREMENT:{
      SING: 'Medida',
      PLUR: 'Medidas',
      ADD_PLUR: 'Agregar medidas',
      MESSAGE: 'en centímetros',
      NEW: 'Nueva Medida',
      EDIT: 'Editar Medida',
      PLACEHOLDER: 'Solo números'
    },
    MATERIAL: {
      SING: 'Material',
      PLUR: 'Materiales',
      NEW: 'Nuevo Material',
      EDIT: 'Editar Material',
      ADD_PLUR: 'Agregar material'
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
      CREATING: 'Generando reporte',
      EMPTY: 'Actualmente no hay reportes'
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
      PLUR: 'Organizaciones',
      PLACEHOLDER_NAME: 'Agregue el nombre',
      PLACEHOLDER_PHONE: 'Agregue el teléfono',
      PLACEHOLDER_CONTACT: 'Agregue el email de contacto',
      PLACEHOLDER_ADDRESS: 'Agregue la dirección',
      NOTE: 'Esta información estará disponible en el reporte que se genere'
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
      NEW: 'Agregar Usuario',
      PLACEHOLDER_NAME: 'Nombre completo',
      PLACEHOLDER_LAST: 'Apellido completo',
      LOADING:{
        ERROR: 'Hubo un error cargando sus datos',
        ALL_ERROR: 'Hubo un error al cargar los usuario. Intente nuevamente mas tarde'
      },
      CREATE: {
        SUCCESS: 'El usuario fue creado con exito',
        ERROR: 'Hubo un error al crear el usuario. Intente nuevamente mas tarde'
      },
      UPDATE: {
        ERROR: 'Su cuenta no pudo ser actucalizada.',
        SUCCESS: 'Su cuenta fue actualizada con exito'
      },
      DELETE:{
        TITLE: 'Administracion de usuarios',
        CONFIRM: 'Borrar usuario',
        SUCCESS: 'El usuario fue borrado con exito',
        ERROR: 'Hubo un error al borrar el usuario. Intente nuevamente mas tarde',
        MESSAGE: 'Estas seguro de eliminar al usuario '
      },
      CONFIRM: {
        SUCCESS: 'Se envio el email con exito',
        ERROR: 'Hubo un error al enviar el email.'
      }
    },
    SEARCH:{
      MESSAGE: 'Buscar...'
    },
    LOGIN: {
      KEEP: 'Mantenerme conectado',
      SCREEN: 'Iniciar sesión',
      BUTTON: 'Entrar',
      RESET: 'Olvidó la contraseña?',
      PLACEHOLDER_PASS: 'Contraseña',
      PLACEHOLDER_EMAIL: 'Email',
      PLACEHOLDER_PASS_CONF: 'Confirma tu contraseña',
      GO_BACK: 'Volver al login'
    },
    ERROR:{
      PASS_CONF: 'La confirmación de la contraseña no conincide'
    },
    INTERVENTIONS: 'Intervenciones',
    NOTES: 'Notas',
    EXAMS: 'Exámenes',
    ACTIONS: 'Acciones',
    LOGOUT: 'Salir del sistema',
    PROFILE: 'Ver / Editar su perfil'
  });
}]);
