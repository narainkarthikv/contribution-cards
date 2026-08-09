export type Language = 'en' | 'es';

export interface TranslationParams {
  [key: string]: string | number;
}

export const translations = {
  en: {
    app: {
      tokenWarningTitle: 'GitHub Token Not Found:',
      tokenWarningMessage:
        'Set VITE_GITHUB_TOKEN in .env.local for higher API limits (60 → 5,000 requests/hour)',
      dismissWarning: 'Dismiss warning',
      goToHome: 'Go to home',
      toggleTheme: 'Toggle theme',
      viewOnGitHub: 'View on GitHub',
      switchLanguage: 'Switch language',
      openApp: 'Open app',
      githubRepo: 'GitHub repo',
      issuesRoadmap: 'Issues & roadmap',
      contributing: 'Contributing',
      codeOfConduct: 'Code of conduct',
      securityPolicy: 'Security policy',
      mitLicense: 'MIT License',
      documentation: 'Documentation',
      releaseNotes: 'Release notes',
    },
    home: {
      eyebrow: 'Wisdom Fox community',
      heroTitle: 'Spotlight the builders shaping',
      heroTitleAccent: 'Wisdom Fox Community',
      heroSubtitle:
        "See who's building what. Contribution Cards highlights active contributors across repositories with simple, elegant profiles.",
      primaryCta: 'Explore contributors',
      secondaryCta: 'View the repo',
      chips: ['Impact insights', 'Share-ready cards', 'Smart filters'],
      communityPulse: 'Community pulse',
      live: 'Live',
      statUniqueBuilders: 'Unique builders',
      statTotalContributions: 'Total contributions',
      statActiveRepositories: 'Active repositories',
      nextStepsTitle: 'Next steps, simplified',
      nextStepsBody:
        'Filter by repo, sort by impact, and open a profile in seconds. Everything stays fast and respectful of rate limits.',
      nextStepsChips: ['Smart filters', 'Quick share', 'Rank by impact'],
      designedForClarity: 'Designed for clarity',
      sectionTitle: 'A quiet, elegant way to honor contributors',
      sectionBody:
        'Fewer surfaces. Better focus. The experience stays calm while still highlighting the people who move the project forward.',
      cardsTitle: 'Elegant cards',
      cardsBody: 'Shareable profiles that feel curated, not cluttered.',
      insightsTitle: 'Insightful summaries',
      insightsBody: 'Understand momentum at a glance with concise, meaningful contributor stats.',
      accessibleTitle: 'Accessible by design',
      accessibleBody:
        'Keyboard-friendly flows, thoughtful contrast, and clear structure keep the experience welcoming.',
      footerEyebrow: 'Transparent tech',
      footerTitle: 'The honest breakdown, without the noise',
      footerBody:
        'Whether you are sharing a project update or introducing a new team, these cards make recognition feel effortless.',
      footerCta: 'Open the contributor gallery',
      footerProjectTitle: 'Project',
      footerCommunityTitle: 'Community',
      footerLegalTitle: 'Legal',
      footerHighlightsTitle: 'Project highlights',
      footerFocusTitle: 'What keeps it focused',
      footerHighlightOne: 'GitHub contributors API with smart caching.',
      footerHighlightTwo: 'Client-side filtering and sorting only.',
      footerHighlightThree: 'No databases to leak because we do not run one.',
      footerFocusOne: 'Heavy dashboards that slow teams down.',
      footerFocusTwo: 'Manual exports or spreadsheet wrangling.',
      footerFocusThree: 'Fragmented views of contributor impact.',
      ctaHeading: 'Ready to spotlight the builders?',
      ctaSubtitle: 'Honor contributions, onboard new teammates, and keep the Wisdom Fox culture glowing. Start with the contributor cards now.',
      openContributors: 'Open contributors',
      starOnGitHub: 'Star on GitHub',
      supportTitle: 'Support open source craft',
      supportBody: 'Contribution Cards is maintained by the Wisdom Fox community. If the project saves you time, consider fueling the next release with a coffee or a small pledge.',
      buyACoffee: '☕ Buy us a coffee',
      supportOnBuyMeACoffee: '💚 Support on Buy Me a Coffee',
      donationNote: 'Donations are optional. Contribution Cards will always be free and open source.',
      communityTagline: 'A fast, contributor showcase built by the Wisdom Fox community.',
      copyright: '© 2026 Contribution Cards. Crafted with care for an open web.',
    },
    contributors: {
      errorTitle: 'Failed to Load Contributors',
      errorMessage:
        'There was an error fetching the contributors data. Please check your GitHub token or try again later.',
      retry: 'Try Again',
      acrossAllRepos: 'Across All Repos',
      uniqueContributors: 'Unique Contributors',
      total: 'Total',
      contributions: 'Contributions',
      active: 'Active',
      repositories: 'Repositories',
      noContributorsTitle: 'No Contributors Found',
      noContributorsMessage:
        'Try adjusting your filters or search terms to find contributors.',
    },
    filters: {
      contributorExplorer: 'Contributor Explorer',
      profilesLive: '{count} profiles live',
      repoFilter: 'Repository filter',
      selectRepository: 'Select repository',
      searchPlaceholder: 'Search by name...',
      searchAria: 'Search contributors',
      sortBy: 'Sort by',
      sortContributorsBy: 'Sort contributors by',
      sortDirection: 'Sort direction',
      sortAscending: 'Sort ascending',
      sortDescending: 'Sort descending',
      repoPrefix: 'Repo:',
      filterPrefix: 'Filter by:',
      exportAria: 'Export as Markdown',
      exportTitle: 'Export contributors as Markdown',
      tableFormat: 'Table Format',
      cardFormat: 'Card Format',
      listFormat: 'List Format',
      badges: 'Badges',
      download: 'Download',
      copy: 'Copy',
      copied: 'Copied!',
    },
    modal: {
      closeDialog: 'Close dialog',
      contributorSnapshot: 'Contributor snapshot',
      repositoriesCount: '{count} repositories',
      totalCommits: 'Total commits',
      repositories: 'Repositories',
      contributions: 'Contributions',
      activityTitle: 'Activity across the ecosystem',
      activitySubtitle: 'Sorted by commit volume',
      repositoryFootprint: 'Repository contribution footprint',
      commits: 'Commits',
      highlights: 'Highlights',
      topRepository: 'Top repository',
      averagePerRepo: 'Average per repo',
      openSourceReach: 'Open source reach',
      quickAction: 'Quick action',
      quickActionBody:
        'Continue exploring this contributor’s public work on GitHub for deeper context and recent activity.',
      viewGitHubProfile: 'View GitHub Profile',
      commitsHelper: '{count} commits',
      averageHelper: 'commits on average',
      reachHelper: 'tracked in this project ecosystem',
      repositoryCountHelper: '{count} repositories',
    },
    card: {
      copyProfileLink: 'Copy profile link for {login}',
      openProfile: 'Open GitHub profile',
      viewDetails: 'View details',
      contributionsAria: '{count} contributions',
    },
    common: {
      loading: 'Loading',
    },
  },
  es: {
    app: {
      tokenWarningTitle: 'No se encontró el token de GitHub:',
      tokenWarningMessage:
        'Configura VITE_GITHUB_TOKEN en .env.local para límites de API más altos (60 → 5,000 solicitudes/hora)',
      dismissWarning: 'Descartar aviso',
      goToHome: 'Ir al inicio',
      toggleTheme: 'Cambiar tema',
      viewOnGitHub: 'Ver en GitHub',
      switchLanguage: 'Cambiar idioma',
      openApp: 'Abrir aplicación',
      githubRepo: 'Repositorio de GitHub',
      issuesRoadmap: 'Problemas y hoja de ruta',
      contributing: 'Contribuir',
      codeOfConduct: 'Código de conducta',
      securityPolicy: 'Política de seguridad',
      mitLicense: 'Licencia MIT',
      documentation: 'Documentación',
      releaseNotes: 'Notas de lanzamiento',
    },
    home: {
      eyebrow: 'Comunidad Wisdom Fox',
      heroTitle: 'Destaca a quienes construyen',
      heroTitleAccent: 'Comunidad Wisdom Fox',
      heroSubtitle:
        'Mira quién está construyendo qué. Contribution Cards resalta a los contribuyentes activos en varios repositorios con perfiles simples y elegantes.',
      primaryCta: 'Explorar contribuyentes',
      secondaryCta: 'Ver el repositorio',
      chips: ['Ideas de impacto', 'Tarjetas listas para compartir', 'Filtros inteligentes'],
      communityPulse: 'Pulso de la comunidad',
      live: 'En vivo',
      statUniqueBuilders: 'Creadores únicos',
      statTotalContributions: 'Contribuciones totales',
      statActiveRepositories: 'Repositorios activos',
      nextStepsTitle: 'Siguientes pasos, simplificados',
      nextStepsBody:
        'Filtra por repositorio, ordena por impacto y abre un perfil en segundos. Todo sigue siendo rápido y respetuoso con los límites de la API.',
      nextStepsChips: ['Filtros inteligentes', 'Compartir rápido', 'Ordenar por impacto'],
      designedForClarity: 'Diseñado para la claridad',
      sectionTitle: 'Una manera tranquila y elegante de honrar a los contribuyentes',
      sectionBody:
        'Menos distracciones. Mejor enfoque. La experiencia sigue siendo serena y al mismo tiempo destaca a las personas que hacen avanzar el proyecto.',
      cardsTitle: 'Tarjetas elegantes',
      cardsBody: 'Perfiles compartibles que se sienten curados, no abarrotados.',
      insightsTitle: 'Resúmenes reveladores',
      insightsBody: 'Comprende el impulso del proyecto de un vistazo con estadísticas concisas y útiles.',
      accessibleTitle: 'Accesible por diseño',
      accessibleBody:
        'Flujos amigables con el teclado, contraste cuidadoso y una estructura clara hacen la experiencia más acogedora.',
      footerEyebrow: 'Tecnología transparente',
      footerTitle: 'El desglose honesto, sin ruido',
      footerBody:
        'Ya sea que compartas una actualización de proyecto o presentes a un nuevo equipo, estas tarjetas hacen que el reconocimiento se sienta sencillo.',
      footerCta: 'Abrir la galería de contribuyentes',
      footerProjectTitle: 'Proyecto',
      footerCommunityTitle: 'Comunidad',
      footerLegalTitle: 'Legal',
      footerHighlightsTitle: 'Aspectos del proyecto',
      footerFocusTitle: 'Lo que lo mantiene enfocado',
      footerHighlightOne: 'API de contribuyentes de GitHub con caché inteligente.',
      footerHighlightTwo: 'Solo filtrado y ordenación del lado del cliente.',
      footerHighlightThree: 'No hay bases de datos que filtrar porque no usamos una.',
      footerFocusOne: 'Paneles pesados que ralentizan a los equipos.',
      footerFocusTwo: 'Exportaciones manuales o manejo de hojas de cálculo.',
      footerFocusThree: 'Vistas fragmentadas del impacto de los contribuyentes.',
      ctaHeading: '¿Listo para destacar a los creadores?',
      ctaSubtitle: 'Honra las contribuciones, incorpora nuevos compañeros de equipo y mantén viva la cultura de Wisdom Fox. Comienza con las tarjetas de contribuyentes ahora.',
      openContributors: 'Abrir contribuyentes',
      starOnGitHub: 'Marcar en GitHub',
      supportTitle: 'Apoya el trabajo de código abierto',
      supportBody: 'Contribution Cards es mantenido por la comunidad de Wisdom Fox. Si el proyecto te ahorra tiempo, considera impulsar el próximo lanzamiento con un café o una pequeña contribución.',
      buyACoffee: '☕ Cómpranos un café',
      supportOnBuyMeACoffee: '💚 Apoya en Buy Me a Coffee',
      donationNote: 'Las donaciones son opcionales. Contribution Cards siempre será gratuito y de código abierto.',
      communityTagline: 'Una galería rápida de contribuyentes construida por la comunidad de Wisdom Fox.',
      copyright: '© 2026 Contribution Cards. Hecho con cuidado para una web abierta.',
    },
    contributors: {
      errorTitle: 'No se pudieron cargar los contribuyentes',
      errorMessage:
        'Hubo un error al obtener los datos. Revisa tu token de GitHub o inténtalo más tarde.',
      retry: 'Intentar de nuevo',
      acrossAllRepos: 'En todos los repositorios',
      uniqueContributors: 'Contribuyentes únicos',
      total: 'Total',
      contributions: 'Contribuciones',
      active: 'Activo',
      repositories: 'Repositorios',
      noContributorsTitle: 'No se encontraron contribuyentes',
      noContributorsMessage:
        'Prueba ajustando los filtros o términos de búsqueda para encontrar contribuyentes.',
    },
    filters: {
      contributorExplorer: 'Explorador de contribuyentes',
      profilesLive: '{count} perfiles activos',
      repoFilter: 'Filtro de repositorio',
      selectRepository: 'Seleccionar repositorio',
      searchPlaceholder: 'Buscar por nombre...',
      searchAria: 'Buscar contribuyentes',
      sortBy: 'Ordenar por',
      sortContributorsBy: 'Ordenar contribuyentes por',
      sortDirection: 'Dirección del orden',
      sortAscending: 'Orden ascendente',
      sortDescending: 'Orden descendente',
      repoPrefix: 'Repo:',
      filterPrefix: 'Filtrar por:',
      exportAria: 'Exportar como Markdown',
      exportTitle: 'Exportar contribuyentes como Markdown',
      tableFormat: 'Formato de tabla',
      cardFormat: 'Formato de tarjeta',
      listFormat: 'Formato de lista',
      badges: 'Insignias',
      download: 'Descargar',
      copy: 'Copiar',
      copied: '¡Copiado!',
    },
    modal: {
      closeDialog: 'Cerrar diálogo',
      contributorSnapshot: 'Resumen del contribuyente',
      repositoriesCount: '{count} repositorios',
      totalCommits: 'Total de commits',
      repositories: 'Repositorios',
      contributions: 'Contribuciones',
      activityTitle: 'Actividad en todo el ecosistema',
      activitySubtitle: 'Ordenado por volumen de commits',
      repositoryFootprint: 'Huella de contribución del repositorio',
      commits: 'Commits',
      highlights: 'Destacados',
      topRepository: 'Repositorio principal',
      averagePerRepo: 'Promedio por repositorio',
      openSourceReach: 'Alcance de código abierto',
      quickAction: 'Acción rápida',
      quickActionBody:
        'Sigue explorando el trabajo público de este contribuyente en GitHub para obtener más contexto y actividad reciente.',
      viewGitHubProfile: 'Ver perfil de GitHub',
      commitsHelper: '{count} commits',
      averageHelper: 'commits en promedio',
      reachHelper: 'seguido en este ecosistema de proyectos',
      repositoryCountHelper: '{count} repositorios',
    },
    card: {
      copyProfileLink: 'Copiar enlace del perfil de {login}',
      openProfile: 'Abrir perfil de GitHub',
      viewDetails: 'Ver detalles',
      contributionsAria: '{count} contribuciones',
    },
    common: {
      name: 'Nombre',
      loading: 'Cargando',
    },
  },
} as const;

export const defaultLanguage: Language = 'en';

export function normalizeLanguage(value?: string | null): Language {
  if (value === 'es') return 'es';
  return 'en';
}

export function translate(
  language: Language,
  key: string,
  params?: TranslationParams
): string {
  const parts = key.split('.');
  let value: unknown = translations[language];

  for (const part of parts) {
    if (typeof value !== 'object' || value === null || !(part in value)) {
      return key;
    }
    value = (value as Record<string, unknown>)[part];
  }

  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (_, placeholder: string) => {
      const replacement = params?.[placeholder];
      return replacement === undefined ? `{${placeholder}}` : String(replacement);
    });
  }

  if (Array.isArray(value)) {
    return value.join('|');
  }

  return key;
}
