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
    sectionTitle: string;
    badge: string;
    headline: string;
    dateFormatted: string;
    time: string;
    venue: string;
    venueArchitecture: string;
    restriction: string;
    countdownTitle: string;
    countdownTz: string;
    lineupTitle: string;
    getTicketsFor: string;
    locationShort: string;
    synopsis: string;
    tier1: string;
    tier1Price: string;
    tier2: string;
    tier2Price: string;
    tier3: string;
    tier3Price: string;
    reserveCta: string;
    detailsCta: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  events: {
    title: string;
    subtitle: string;
    all: string;
    rooftop: string;
    underground: string;
    getTickets: string;
    moreLineup: string;
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
  upcoming: {
    badge: string;
    title: string;
    subtitle: string;
    allFilter: string;
    rooftopFilter: string;
    undergroundFilter: string;
    warehouseFilter: string;
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
  lgpd: {
    badge: string;
    title: string;
    desc: string;
    acceptAll: string;
    essentialOnly: string;
    privacyPolicy: string;
    close: string;
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
      'ELECTRONIC EXCELLENCE',
      'VIP CURATION',
      'IMMERSIVE SOUND',
    ],
    nextEvent: {
      sectionTitle: 'NEXT SESSION',
      badge: 'FEATURED PRODUCTION',
      headline: 'ST. PAUL’S PANORAMA & DEEP SESSIONS',
      dateFormatted: 'SATURDAY, 30 AUGUST 2026',
      time: '18:00 — 04:00 BST',
      venue: 'ONE NEW CHANGE ROOFTOP & VAULT',
      venueArchitecture: 'VENUE & ARCHITECTURE',
      restriction: 'ENTRY RESTRICTION',
      countdownTitle: 'COMMENCING IN',
      countdownTz: 'LONDON TIME (BST)',
      lineupTitle: 'CURATED SELECTORS',
      getTicketsFor: 'SECURE TICKETS FOR',
      locationShort: 'LONDON EC4M',
      synopsis: 'A seamless transition from golden hour skyline views over St. Paul’s Cathedral into deep subterranean sonic architecture. Curated selectors, bespoke Void Acoustics sound, and London’s most discerning electronic music community.',
      tier1: 'EARLY SUNSET ENTRY (PRE-20:00)',
      tier1Price: '£35.00',
      tier2: 'FIRST RELEASE (ALL NIGHT ACCESS)',
      tier2Price: '£40.00',
      tier3: 'FINAL RELEASE / VIP FAST TRACK',
      tier3Price: '£45.00',
      reserveCta: 'SECURE RESERVATION (£35 — £45)',
      detailsCta: 'EXPLORE PRODUCTION',
      days: 'DAYS',
      hours: 'HOURS',
      minutes: 'MINUTES',
      seconds: 'SECONDS',
    },
    events: {
      title: 'SEASON SCHEDULE',
      subtitle: 'Limited capacity reservations across central and east London architectural landmarks.',
      all: 'ALL GATHERINGS',
      rooftop: 'ROOFTOPS',
      underground: 'SUBTERRANEAN',
      getTickets: 'GET TICKETS',
      moreLineup: 'SELECTORS',
    },
    experience: {
      badge: 'EDITORIAL MANIFESTO',
      title1: 'THE AZZURA',
      title2: 'EXPERIENCE',
      subtitle: 'Elevating electronic music culture into an intimate, cinematic discipline across London’s most anomalous architectural spaces.',
      atmosphere01: 'ATMOSPHERE 01',
      atmosphere01Title: 'LIGHT ARCHITECTURE & DEEP FREQUENCIES',
      curatedTitle: 'CURATED COMMUNITY',
      curatedDesc: 'Strict entry criteria prioritizing true music enthusiasts, fashion visionaries, and electronic purists.',
      pillar1Num: '01',
      pillar1Title: 'THE ATMOSPHERE IS EVERYTHING',
      pillar1Desc: 'We do not produce standard parties. Each Azzura gathering is a sensory sanctuary where sound design, architectural lighting, and a discerning crowd converge in London’s rarest spaces.',
      pillar2Num: '02',
      pillar2Title: 'ROOFTOPS & SUBTERRANEAN',
      pillar2Desc: 'From golden hour panoramic terraces overlooking St. Paul’s to historical subterranean chambers with uncompromised acoustic clarity.',
      pillar3Num: '03',
      pillar3Title: 'UNCOMPROMISING SONIC CURATION',
      pillar3Desc: 'Rooted in forward-thinking Melodic Techno, Minimal Tech, and Deep Afro House, featuring international selectors alongside our resident collective.',
    },
    upcoming: {
      badge: 'SEASON SCHEDULE // 2026',
      title: 'UPCOMING GATHERINGS',
      subtitle: 'Limited capacity reservations across central and east London architectural landmarks.',
      allFilter: 'ALL SESSIONS',
      rooftopFilter: 'ROOFTOP',
      undergroundFilter: 'SUBTERRANEAN',
      warehouseFilter: 'INDUSTRIAL',
      getTickets: 'RESERVE ENTRY',
      moreLineup: 'FULL ARTIST DETAILS',
    },
    lineup: {
      badge: 'SONIC SELECTORS',
      title: 'ARTIST ROSTER',
      subtitle: 'World-class selectors shaping London’s most immersive electronic music soundtrack.',
      previewAudio: 'PREVIEW AUDIO',
      audioStreaming: 'PREVIEW PLAYING',
      channels: 'CHANNELS',
    },
    gallery: {
      badge: 'VISUAL ARCHIVE',
      title: 'MOMENTS CAPTURED',
      subtitle: 'Glimpses into past atmospheres, architectural spaces, and collective euphoria in London.',
      archiveTitle: 'PREVIOUS SESSIONS ARCHIVE',
      close: 'CLOSE ARCHIVE',
    },
    instagram: {
      badge: 'COMMUNITY DISPATCH',
      title: 'LIVE FROM THE FLOOR',
      handle: '@AZZURA.LDN',
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
        partnerships: 'BRAND PARTNERSHIPS & PRESS',
        artists: 'ARTIST & SELECTOR BOOKINGS',
        private: 'PRIVATE HIRE & VIP TABLES',
      },
    },
    newsletter: {
      badge: 'EXCLUSIVE ACCESS DISPATCH',
      title: 'ENTER THE AZZURA ATMOSPHERE',
      subtitle: 'Gain priority access to secret rooftop coordinates, private pre-sales, and curated guest list allocations.',
      placeholder: 'ENTER EMAIL ADDRESS...',
      join: 'JOIN ATMOSPHERE',
      joining: 'TRANSMITTING...',
      joined: 'REGISTERED',
      privacy: 'NO SPAM. ONLY CURATED GATHERINGS AND PRIVATE LINKS.',
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
    lgpd: {
      badge: 'PRIVACY & COOKIES (LGPD / GDPR)',
      title: 'DATA PRIVACY & COOKIE CONSENT',
      desc: 'We use cookies and telemetry to optimize your experience, process secure ticket orders, and measure audio atmospheric performance in full compliance with LGPD and GDPR regulations.',
      acceptAll: 'ACCEPT ALL',
      essentialOnly: 'ESSENTIAL ONLY',
      privacyPolicy: 'PRIVACY POLICY',
      close: 'CLOSE',
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
      soundOn: 'SOM LIGADO',
      soundOff: 'SOM DESLIGADO',
    },
    marquee: [
      'AZZURA EVENTS',
      'THE ATMOSPHERE IS EVERYTHING',
      'SKYLINE DE LONDRES',
      'ROOFTOP OPEN AIR',
      'SESSÕES SUBTERRÂNEAS',
      'EXCELÊNCIA ELETRÔNICA',
      'CURADORIA VIP',
      'SOM IMERSIVO',
    ],
    nextEvent: {
      sectionTitle: 'PRÓXIMA SESSÃO',
      badge: 'PRODUÇÃO EM DESTAQUE',
      headline: 'PANORAMA DE ST. PAUL’S & SESSÕES DEEP',
      dateFormatted: 'SÁBADO, 30 DE AGOSTO DE 2026',
      time: '18:00 — 04:00 BST',
      venue: 'ROOFTOP & VAULT ONE NEW CHANGE',
      venueArchitecture: 'LOCAL & ARQUITETURA',
      restriction: 'RESTRIÇÃO DE IDADE',
      countdownTitle: 'INÍCIO DA SESSÃO EM',
      countdownTz: 'HORÁRIO DE LONDRES (BST)',
      lineupTitle: 'LINEUP CURADO',
      getTicketsFor: 'GARANTIR INGRESSO PARA',
      locationShort: 'LONDRES EC4M',
      synopsis: 'Uma transição perfeita da luz dourada sobre a Catedral de St. Paul para a arquitetura sonora subterrânea. Artistas renomados, sistema de som Void Acoustics sob medida e o público mais refinado de Londres.',
      tier1: 'ENTRADA ANTECIPADA (ATÉ 20:00)',
      tier1Price: '£35.00',
      tier2: 'PRIMEIRO LOTE (ACESSO A NOITE TODA)',
      tier2Price: '£40.00',
      tier3: 'LOTE FINAL / VIP FAST TRACK',
      tier3Price: '£45.00',
      reserveCta: 'GARANTIR INGRESSO (£35 — £45)',
      detailsCta: 'VER DETALHES',
      days: 'DIAS',
      hours: 'HORAS',
      minutes: 'MINUTOS',
      seconds: 'SEGUNDOS',
    },
    events: {
      title: 'CALENDÁRIO DA TEMPORADA',
      subtitle: 'Reservas limitadas em marcos arquitetônicos nas áreas central e leste de Londres.',
      all: 'TODAS AS SESSÕES',
      rooftop: 'ROOFTOPS',
      underground: 'SUBTERRÂNEO',
      getTickets: 'INGRESSOS',
      moreLineup: 'SELECTORS',
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
    upcoming: {
      badge: 'CALENDÁRIO DA TEMPORADA // 2026',
      title: 'PRÓXIMAS SESSÕES',
      subtitle: 'Reservas limitadas em marcos arquitetônicos nas áreas central e leste de Londres.',
      allFilter: 'TODAS AS SESSÕES',
      rooftopFilter: 'ROOFTOPS',
      undergroundFilter: 'SUBTERRÂNEO',
      warehouseFilter: 'INDUSTRIAL',
      getTickets: 'RESERVAR ENTRADA',
      moreLineup: 'DETALHES DO LINEUP',
    },
    lineup: {
      badge: 'SELECTORS DA NOITE',
      title: 'LINEUP OFICIAL',
      subtitle: 'Artistas internacionais e residentes definindo a trilha sonora mais imersiva de Londres.',
      previewAudio: 'OUVIR PRÉVIA',
      audioStreaming: 'TOCANDO PRÉVIA',
      channels: 'CANAIS',
    },
    gallery: {
      badge: 'ARQUIVO VISUAL',
      title: 'MOMENTOS REGISTRADOS',
      subtitle: 'Registros de atmosferas passadas, espaços arquitetônicos e euforia coletiva em Londres.',
      archiveTitle: 'ARQUIVO DE EDIÇÕES ANTERIORES',
      close: 'FECHAR ARQUIVO',
    },
    instagram: {
      badge: 'DISPATCH DA COMUNIDADE',
      title: 'DIRETO DA PISTA',
      handle: '@AZZURA.LDN',
    },
    locations: {
      badge: 'CURADORIA ESPACIAL',
      title: 'LOCAIS EM LONDRES',
      subtitle: 'Ocupando anomalias arquitetônicas pela capital — de terraços panorâmicos a galerias subterrâneas.',
      capacity: 'CAPACIDADE',
      soundSpecs: 'ESPECIFICAÇÕES DE SOM',
    },
    contact: {
      badge: 'CANAL DIRETO & CURADORIA',
      title: 'FALE CONOSCO',
      subtitle: 'Entre em contato com a equipe Azzura para parcerias, reservas de mesas VIP ou envio de materiais artísticos.',
      hqTitle: 'AZZURA EVENTS LDN',
      hqCity: 'Centro de Londres, Reino Unido',
      generalDesk: 'ATENDIMENTO GERAL',
      vipDesk: 'MESAS VIP & PRIVATIVAS',
      pressDesk: 'IMPRENSA & RELAÇÕES ARTÍSTICAS',
      notice: '* Para reserva imediata de ingressos e nomes na lista, utilize o portal oficial de ingressos.',
      selectCat: 'SELECIONE A CATEGORIA',
      yourName: 'SEU NOME *',
      email: 'SEU E-MAIL *',
      subject: 'ASSUNTO',
      message: 'MENSAGEM *',
      namePlaceholder: 'ex: Julian Sterling',
      emailPlaceholder: 'ex: julian@dominio.com',
      subjectPlaceholder: 'Assunto ou detalhes do projeto',
      messagePlaceholder: 'Descreva detalhadamente sua solicitação...',
      sending: 'ENVIANDO MENSAGEM...',
      sent: 'MENSAGEM TRANSMITIDA',
      send: 'ENVIAR MENSAGEM',
      categories: {
        general: 'INFORMAÇÕES GERAIS',
        partnerships: 'PARCERIAS & IMPRENSA',
        artists: 'CURADORIA ARTÍSTICA & BOOKING',
        private: 'EVENTOS PRIVADOS & MESAS VIP',
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
    lgpd: {
      badge: 'PRIVACIDADE & COOKIES (LGPD)',
      title: 'CONFORMIDADE COM A LGPD & COOKIES',
      desc: 'Utilizamos cookies e tecnologias essenciais para otimizar sua navegação, processar compras seguras de ingressos e garantir a melhor experiência sonora e visual em total conformidade com a LGPD e GDPR.',
      acceptAll: 'ACEITAR TODOS',
      essentialOnly: 'APENAS ESSENCIAIS',
      privacyPolicy: 'POLÍTICA DE PRIVACIDADE',
      close: 'FECHAR',
    },
  },
};
