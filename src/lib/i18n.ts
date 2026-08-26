export type Language = 'en' | 'pt';

export interface Translations {
  nav: {
    events: string;
    experience: string;
    lineup: string;
    gallery: string;
    locations: string;
    contact: string;
    getTickets: string;
    admin: string;
    close: string;
  };
  hero: {
    tagline: string;
    brandTag: string;
    nextEvent: string;
    date: string;
    city: string;
    getTickets: string;
    explore: string;
    scroll: string;
    soundOn: string;
    soundOff: string;
  };
  marquee: string[];
  nextEvent: {
    badge: string;
    sectionTitle: string;
    subtitle: string;
    venueArchitecture: string;
    time: string;
    restriction: string;
    sound: string;
    countdownTitle: string;
    countdownTz: string;
    lineupTitle: string;
    getTicketsFor: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  experience: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    atmosphere01: string;
    atmosphere01Title: string;
    curatedTitle: string;
    curatedDesc: string;
    pillar1Num: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Num: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Num: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  events: {
    badge: string;
    title: string;
    all: string;
    rooftop: string;
    underground: string;
    getTickets: string;
    moreLineup: string;
  };
  lineup: {
    badge: string;
    title: string;
    subtitle: string;
    previewAudio: string;
    audioStreaming: string;
    channels: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    archiveTitle: string;
    close: string;
  };
  instagram: {
    badge: string;
    title: string;
    handle: string;
  };
  locations: {
    badge: string;
    title: string;
    subtitle: string;
    capacity: string;
    soundSpecs: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    hqTitle: string;
    hqCity: string;
    generalDesk: string;
    vipDesk: string;
    pressDesk: string;
    notice: string;
    selectCat: string;
    yourName: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    sent: string;
    send: string;
    categories: {
      general: string;
      partnerships: string;
      artists: string;
      private: string;
    };
  };
  newsletter: {
    badge: string;
    title: string;
    subtitle: string;
    placeholder: string;
    join: string;
    joining: string;
    joined: string;
    privacy: string;
  };
  footer: {
    slogan: string;
    backToTop: string;
    originTitle: string;
    originDesc: string;
    location: string;
    navTitle: string;
    channelsTitle: string;
    adminTitle: string;
    adminDesc: string;
    adminBtn: string;
    copyright: string;
    privacyPolicy: string;
    terms: string;
    soundHealth: string;
  };
  ticketModal: {
    title: string;
    selectCategory: string;
    quantity: string;
    maxTickets: string;
    totalDue: string;
    security: string;
    confirmBtn: string;
    authenticating: string;
    accessGranted: string;
    successMessage: string;
    walletReady: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      events: 'EVENTS',
      experience: 'EXPERIENCE',
      lineup: 'LINEUP',
      gallery: 'GALLERY',
      locations: 'LOCATIONS',
      contact: 'CONTACT',
      getTickets: 'GET TICKETS',
      admin: 'ADMIN',
      close: 'CLOSE',
    },
    hero: {
      tagline: 'THE ATMOSPHERE IS EVERYTHING.',
      brandTag: 'LONDON NIGHTLIFE & SOUND ARCHITECTURE',
      nextEvent: 'NEXT EVENT:',
      date: '30 AUGUST 2026',
      city: 'LONDON',
      getTickets: 'GET TICKETS',
      explore: 'EXPLORE AZZURA',
      scroll: 'SCROLL TO EXPLORE',
      soundOn: 'SOUND ON',
      soundOff: 'SOUND OFF',
    },
    marquee: [
      'AZZURA EVENTS',
      'THE ATMOSPHERE IS EVERYTHING',
      'LONDON SKYLINE',
      'ROOFTOP OPEN AIR',
      'SUBTERRANEAN SESSIONS',
      'VOID ACOUSTICS SOUND',
      'MELODIC TECHNO & MINIMAL',
      '30 AUGUST 2026',
    ],
    nextEvent: {
      badge: 'FLAGSHIP EXPERIENCE',
      sectionTitle: 'NEXT EVENT',
      subtitle: '360° SKYLINE & UNDERGROUND SESSIONS',
      venueArchitecture: 'VENUE ARCHITECTURE',
      time: 'TIME',
      restriction: 'RESTRICTION',
      sound: 'SOUND',
      countdownTitle: 'COUNTDOWN TO OPENING',
      countdownTz: 'LONDON BST (UTC+1)',
      lineupTitle: 'FEATURED LINEUP',
      getTicketsFor: 'GET TICKETS FOR',
      days: 'DAYS',
      hours: 'HOURS',
      minutes: 'MINUTES',
      seconds: 'SECONDS',
    },
    experience: {
      badge: 'EDITORIAL MANIFESTO',
      title1: 'THE AZZURA',
      title2: 'EXPERIENCE',
      subtitle: 'Elevating electronic music culture into an intimate cinematic discipline across London’s most guarded architectural spaces.',
      atmosphere01: 'ATMOSPHERE 01',
      atmosphere01Title: 'LIGHT ARCHITECTURE & DEEP FREQUENCIES',
      curatedTitle: 'CURATED AUDIENCE',
      curatedDesc: 'Strict door policy prioritizing music aficionados, fashion visionaries, and electronic purists.',
      pillar1Num: '01',
      pillar1Title: 'THE ATMOSPHERE IS EVERYTHING',
      pillar1Desc: 'We do not sell standard club nights. Every Azzura production is a sensory sanctuary where sound design, architectural lighting, and curated crowds converge in rare London spaces.',
      pillar2Num: '02',
      pillar2Title: 'SKYLINE & SUBTERRANEAN',
      pillar2Desc: 'From golden hour panoramic rooftop terraces overlooking St. Paul’s Cathedral to historic subterranean vaulted warehouses with bone-conducting acoustic arrays.',
      pillar3Num: '03',
      pillar3Title: 'UNCOMPROMISING SONIC CURATION',
      pillar3Desc: 'Rooted in forward-thinking Melodic Techno, Minimal Tech, and Deep Afro House, inviting world-class underground selectors alongside our boundary-pushing residents.',
    },
    events: {
      badge: 'CALENDAR // 2026',
      title: 'UPCOMING EVENTS',
      all: 'ALL',
      rooftop: 'ROOFTOP',
      underground: 'UNDERGROUND',
      getTickets: 'GET TICKETS',
      moreLineup: 'MORE',
    },
    lineup: {
      badge: 'SONIC CURATORS & GUEST SELECTIONS',
      title: 'LINEUP ARCHIVE',
      subtitle: 'Resident innovators and internationally revered guest artists defining the soundscape of London.',
      previewAudio: 'Audio Preview',
      audioStreaming: 'AUDIO STREAMING',
      channels: 'CHANNELS',
    },
    gallery: {
      badge: 'VISUAL ARCHIVE & NOCTURNAL DOCUMENTATION',
      title: 'GALLERY',
      subtitle: 'Fragments of light, sound pressure, and transcendent collective energy captured across London.',
      archiveTitle: 'AZZURA ARCHIVE',
      close: 'CLOSE',
    },
    instagram: {
      badge: 'DIGITAL DISPATCH',
      title: 'FOLLOW THE ATMOSPHERE',
      handle: '@AZZR.LDN',
    },
    locations: {
      badge: 'SPATIAL CURATION',
      title: 'LONDON VENUES',
      subtitle: 'Securing architectural anomalies across the capital — from sky vaults to deep industrial vaults.',
      capacity: 'CAPACITY',
      soundSpecs: 'SOUND SPECS',
    },
    contact: {
      badge: 'DIRECT INQUIRIES & CURATION',
      title: 'GET IN TOUCH',
      subtitle: 'Connect with the Azzura team regarding brand partnerships, private rooftop bookings, or artist submissions.',
      hqTitle: 'AZZURA EVENTS LDN',
      hqCity: 'Central London, United Kingdom',
      generalDesk: 'GENERAL DESK',
      vipDesk: 'VIP & PRIVATE TABLES',
      pressDesk: 'PRESS & ARTIST RELATIONS',
      notice: '* For immediate ticket reservations and guest list allocations, please use the official ticket portal.',
      selectCat: 'SELECT INQUIRY CATEGORY',
      yourName: 'YOUR NAME *',
      email: 'EMAIL ADDRESS *',
      subject: 'SUBJECT',
      message: 'MESSAGE *',
      namePlaceholder: 'e.g. Julian Sterling',
      emailPlaceholder: 'e.g. julian@domain.com',
      subjectPlaceholder: 'Subject or project details',
      messagePlaceholder: 'Provide detailed information regarding your inquiry...',
      sending: 'TRANSMITTING MESSAGE...',
      sent: 'MESSAGE TRANSMITTED',
      send: 'SEND MESSAGE',
      categories: {
        general: 'GENERAL ENQUIRIES',
        partnerships: 'EVENT PARTNERSHIPS',
        artists: 'ARTISTS',
        private: 'PRIVATE EVENTS',
      },
    },
    newsletter: {
      badge: 'PRIVATE ACCESS LIST',
      title: 'JOIN THE AZZURA ATMOSPHERE',
      subtitle: 'Gain first access to unannounced secret rooftop sessions, private pre-sale ticket releases, and guest list allocations.',
      placeholder: 'ENTER YOUR EMAIL...',
      join: 'JOIN',
      joining: 'JOINING...',
      joined: 'JOINED',
      privacy: 'NO SPAM. ONLY CURATED EVENT RELEASES AND PRIVATE LINKS.',
    },
    footer: {
      slogan: 'THE ATMOSPHERE IS EVERYTHING.',
      backToTop: 'BACK TO TOP',
      originTitle: 'ORIGIN & LOCATION',
      originDesc: 'Azzura Events is London’s premier nightlife curator, dedicated to electronic music excellence and rare architectural productions.',
      location: 'LONDON, UNITED KINGDOM',
      navTitle: 'NAVIGATION',
      channelsTitle: 'CHANNELS',
      adminTitle: 'ADMINISTRATION',
      adminDesc: 'Curator management console for events, artists, and press releases.',
      adminBtn: 'ADMIN PORTAL',
      copyright: '© 2026 AZZURA EVENTS. ALL RIGHTS RESERVED.',
      privacyPolicy: 'PRIVACY POLICY',
      terms: 'TERMS OF ENTRY',
      soundHealth: 'SOUND HEALTH (21+)',
    },
    ticketModal: {
      title: 'OFFICIAL TICKET RESERVATION',
      selectCategory: 'SELECT TICKET CATEGORY',
      quantity: 'QUANTITY',
      maxTickets: 'Max 6 tickets per guest',
      totalDue: 'TOTAL DUE',
      security: 'Secure 256-Bit Encrypted Checkout // Instant Digital Pass Delivery',
      confirmBtn: 'CONFIRM & GET TICKETS',
      authenticating: 'AUTHENTICATING RESERVATION...',
      accessGranted: 'ACCESS GRANTED',
      successMessage: 'Your entry passes have been sent to your email. The atmosphere is everything.',
      walletReady: 'QR PASSES READY IN DIGITAL WALLET',
    },
  },
  pt: {
    nav: {
      events: 'EVENTOS',
      experience: 'EXPERIÊNCIA',
      lineup: 'LINEUP',
      gallery: 'GALERIA',
      locations: 'LOCAIS',
      contact: 'CONTATO',
      getTickets: 'INGRESSOS',
      admin: 'PAINEL',
      close: 'FECHAR',
    },
    hero: {
      tagline: 'THE ATMOSPHERE IS EVERYTHING.',
      brandTag: 'VIDA NOTURNA & ARQUITETURA SONORA EM LONDRES',
      nextEvent: 'PRÓXIMO EVENTO:',
      date: '30 DE AGOSTO DE 2026',
      city: 'LONDRES',
      getTickets: 'GARANTIR INGRESSOS',
      explore: 'EXPLORAR AZZURA',
      scroll: 'ROLE PARA EXPLORAR',
      soundOn: 'SOM ATIVADO',
      soundOff: 'SOM DESATIVADO',
    },
    marquee: [
      'AZZURA EVENTS',
      'THE ATMOSPHERE IS EVERYTHING',
      'SKYLINE DE LONDRES',
      'ROOFTOPS OPEN AIR',
      'SESSÕES UNDERGROUND',
      'SISTEMA DE SOM VOID ACOUSTICS',
      'MELODIC TECHNO & MINIMAL',
      '30 DE AGOSTO DE 2026',
    ],
    nextEvent: {
      badge: 'EXPERIÊNCIA PRINCIPAL',
      sectionTitle: 'PRÓXIMO EVENTO',
      subtitle: 'SESSÕES 360° NO SKYLINE E WAREHOUSE',
      venueArchitecture: 'ARQUITETURA DO LOCAL',
      time: 'HORÁRIO',
      restriction: 'CLASSIFICAÇÃO',
      sound: 'SISTEMA DE SOM',
      countdownTitle: 'CONTAGEM REGRESSIVA PARA ABERTURA',
      countdownTz: 'LONDRES BST (UTC+1)',
      lineupTitle: 'LINEUP CONFIRMADO',
      getTicketsFor: 'GARANTIR INGRESSOS PARA',
      days: 'DIAS',
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
    },
    experience: {
      badge: 'MANIFESTO EDITORIAL',
      title1: 'A EXPERIÊNCIA',
      title2: 'AZZURA',
      subtitle: 'Elevando a cultura da música eletrônica a uma disciplina cinematográfica intimista nos espaços arquitetônicos mais exclusivos de Londres.',
      atmosphere01: 'ATMOSFERA 01',
      atmosphere01Title: 'ARQUITETURA DE LUZ & FREQUÊNCIAS PROFUNDAS',
      curatedTitle: 'PÚBLICO CURADO',
      curatedDesc: 'Critério rigoroso de entrada priorizando apaixonados por música, visionários da moda e puristas da música eletrônica.',
      pillar1Num: '01',
      pillar1Title: 'THE ATMOSPHERE IS EVERYTHING',
      pillar1Desc: 'Não produzimos festas convencionais. Cada evento da Azzura é um santuário sensorial onde design acústico, iluminação cênica e público selecionado convergem em locais raros de Londres.',
      pillar2Num: '02',
      pillar2Title: 'ROOFTOPS & SUBTERRÂNEO',
      pillar2Desc: 'Do pôr do sol em terraços panorâmicos com vista para a Catedral de St. Paul aos galpões industriais históricos com acústica monumental.',
      pillar3Num: '03',
      pillar3Title: 'CURADORIA SONORA SEM CONCESSÕES',
      pillar3Desc: 'Focada em Melodic Techno de vanguarda, Minimal Tech e Deep Afro House, reunindo selectors internacionais consagrados ao lado de nossos residentes.',
    },
    events: {
      badge: 'CALENDÁRIO // 2026',
      title: 'PRÓXIMOS EVENTOS',
      all: 'TODOS',
      rooftop: 'ROOFTOP',
      underground: 'UNDERGROUND',
      getTickets: 'COMPRAR INGRESSOS',
      moreLineup: 'MAIS',
    },
    lineup: {
      badge: 'CURADORES SONOROS & CONVIDADOS',
      title: 'ARQUIVO DE LINEUP',
      subtitle: 'Residentes pioneiros e artistas internacionais reverenciados que moldam a identidade sonora de Londres.',
      previewAudio: 'Prévia de Áudio',
      audioStreaming: 'TRANSMITINDO ÁUDIO',
      channels: 'CANAIS',
    },
    gallery: {
      badge: 'ARQUIVO VISUAL & DOCUMENTAÇÃO NOTURNA',
      title: 'GALERIA',
      subtitle: 'Fragmentos de luz, vibração acústica e energia coletiva capturados na noite londrina.',
      archiveTitle: 'ARQUIVO AZZURA',
      close: 'FECHAR',
    },
    instagram: {
      badge: 'FEED DIGITAL',
      title: 'SIGA A ATMOSFERA',
      handle: '@AZZR.LDN',
    },
    locations: {
      badge: 'CURADORIA ESPACIAL',
      title: 'LOCAIS EM LONDRES',
      subtitle: 'Espaços arquitetônicos singulares pela capital britânica — de mirantes suspensos a abóbadas industriais.',
      capacity: 'CAPACIDADE',
      soundSpecs: 'ESPECIFICAÇÕES DE SOM',
    },
    contact: {
      badge: 'CONTATO DIRETO & CURADORIA',
      title: 'ENTRE EM CONTATO',
      subtitle: 'Fale com a equipe da Azzura sobre parcerias de marca, reservas privadas de rooftop ou envio de material artístico.',
      hqTitle: 'AZZURA EVENTS LDN',
      hqCity: 'Centro de Londres, Reino Unido',
      generalDesk: 'ATENDIMENTO GERAL',
      vipDesk: 'MESAS VIP & PRIVATIVAS',
      pressDesk: 'IMPRENSA & ARTISTAS',
      notice: '* Para reservas imediatas de ingressos e lista de convidados, utilize o portal oficial de ingressos.',
      selectCat: 'SELECIONE A CATEGORIA DO CONTATO',
      yourName: 'SEU NOME *',
      email: 'SEU E-MAIL *',
      subject: 'ASSUNTO',
      message: 'MENSAGEM *',
      namePlaceholder: 'ex: Julian Sterling',
      emailPlaceholder: 'ex: julian@dominio.com',
      subjectPlaceholder: 'Assunto ou detalhes do projeto',
      messagePlaceholder: 'Descreva detalhadamente a sua solicitação...',
      sending: 'TRANSMITINDO MENSAGEM...',
      sent: 'MENSAGEM TRANSMITIDA',
      send: 'ENVIAR MENSAGEM',
      categories: {
        general: 'DÚVIDAS GERAIS',
        partnerships: 'PARCERIAS DE EVENTOS',
        artists: 'ARTISTAS & DJs',
        private: 'EVENTOS PRIVADOS',
      },
    },
    newsletter: {
      badge: 'LISTA DE ACESSO EXCLUSIVO',
      title: 'FAÇA PARTE DA ATMOSFERA AZZURA',
      subtitle: 'Receba acesso prioritário a sessões secretas em rooftops, pré-vendas exclusivas e convites da lista VIP.',
      placeholder: 'DIGITE SEU E-MAIL...',
      join: 'PARTICIPAR',
      joining: 'ENTRANDO...',
      joined: 'CADASTRADO',
      privacy: 'SEM SPAM. APENAS LANÇAMENTOS SELECIONADOS E LINKS PRIVADOS.',
    },
    footer: {
      slogan: 'THE ATMOSPHERE IS EVERYTHING.',
      backToTop: 'VOLTAR AO TOPO',
      originTitle: 'ORIGEM & LOCALIZAÇÃO',
      originDesc: 'A Azzura Events é a principal curadora de nightlife de Londres, dedicada à excelência em música eletrônica e produções arquitetônicas raras.',
      location: 'LONDRES, REINO UNIDO',
      navTitle: 'NAVEGAÇÃO',
      channelsTitle: 'CANAIS OFICIAIS',
      adminTitle: 'ADMINISTRAÇÃO',
      adminDesc: 'Console de curadoria para gerenciamento de eventos, artistas e comunicados.',
      adminBtn: 'PAINEL DO CURADOR',
      copyright: '© 2026 AZZURA EVENTS. TODOS OS DIREITOS RESERVADOS.',
      privacyPolicy: 'POLÍTICA DE PRIVACIDADE',
      terms: 'TERMOS DE ENTRADA',
      soundHealth: 'SAÚDE ACÚSTICA (21+)',
    },
    ticketModal: {
      title: 'RESERVA OFICIAL DE INGRESSOS',
      selectCategory: 'SELECIONE A CATEGORIA DE INGRESSO',
      quantity: 'QUANTIDADE',
      maxTickets: 'Máximo de 6 ingressos por convidado',
      totalDue: 'TOTAL',
      security: 'Checkout Seguro com Criptografia 256-Bit // Envio Imediato de Pass Digital',
      confirmBtn: 'CONFIRMAR & GARANTIR INGRESSOS',
      authenticating: 'PROCESSANDO RESERVA...',
      accessGranted: 'ACESSO CONFIRMADO',
      successMessage: 'Seus ingressos foram emitidos e enviados para o seu e-mail. The atmosphere is everything.',
      walletReady: 'PASSES COM QR CODE DISPONÍVEIS NA CARTEIRA DIGITAL',
    },
  },
};
