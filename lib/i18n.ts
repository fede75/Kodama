export const SUPPORTED_LOCALES = ["es", "en", "ja"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_COOKIE_NAME = "kodama-locale";

export const LOCALE_META: Record<
  Locale,
  { flag: string; shortLabel: string; label: string; intl: string }
> = {
  es: { flag: "🇪🇸", shortLabel: "ES", label: "Español", intl: "es-ES" },
  en: { flag: "🇬🇧", shortLabel: "EN", label: "English", intl: "en-GB" },
  ja: { flag: "🇯🇵", shortLabel: "日本語", label: "日本語", intl: "ja-JP" }
};

const dictionaries = {
  es: {
    metadata: {
      description: "Gestiona tu colección de bonsáis y su historial de cuidados."
    },
    nav: {
      home: "Inicio",
      species: "Especies",
      publicCollections: "Colecciones públicas",
      featuredBonsais: "Bonsáis destacados",
      myCollection: "Mi colección",
      registerBonsai: "Registra bonsái",
      settings: "Ajustes",
      admin: "Administración"
    },
    common: {
      access: "Acceder",
      createAccount: "Crear cuenta",
      back: "Volver",
      edit: "Editar",
      addCare: "Añadir cuidado",
      addImage: "Añadir imagen",
      gallery: "Galería",
      photos: "Fotos",
      care: "Cuidados",
      comments: "Comentarios",
      votes: "votos",
      messages: "mensajes",
      timeline: "Evolución",
      noPhoto: "Sin foto",
      noPhotosYet: "Aún no hay fotos registradas.",
      noCareYet: "Aún no hay cuidados registrados.",
      noCommentsYet: "Todavía no hay comentarios.",
      signInToInteract: "Inicia sesión para votar y comentar en los bonsáis públicos.",
      state: "Estado",
      collection: "Colección",
      location: "Ubicación",
      style: "Estilo",
      acquired: "Adquirido",
      estimatedAge: "Edad estimada",
      notIndicated: "No indicada",
      notDefined: "Sin definir",
      unavailable: "No disponible",
      noDate: "Sin fecha",
      previous: "Anterior",
      next: "Siguiente",
      view: "Ver",
      saveChanges: "Guardar cambios",
      saveBonsai: "Guardar bonsái",
      saveSettings: "Guardar ajustes",
      settings: "Ajustes",
      collectionSheet: "Ficha",
      visible: "visibles",
      active: "activos",
      years: "años",
      viewCollection: "Ver colección",
      voteThisBonsai: "Vota este bonsái o abre su ficha para comentar."
    },
    home: {
      kicker: "Cuaderno digital de bonsáis.",
      title: "Una colección viva",
      description:
        "Cada bonsái pide tiempo, observación y un cuidado sereno. Kodama te ayuda a acompañar ese proceso y a recordar lo importante en cada etapa del árbol.",
      myCollection: "Mi colección",
      publicCollections: "Colecciones públicas",
      collection: "Colección",
      treesRegistered: "árboles registrados",
      recentActivity: "Actividad reciente",
      noRecentCare: "Sin cuidados registrados todavía.",
      accessPanel:
        "Entra para registrar bonsáis, cuidados, fotos y el historial visual completo de tu colección.",
      featured: "Destacados",
      votedBonsais: "Bonsáis Top",
      votedDescription:
        "Explora los árboles mejor valorados y con más tracción dentro de la comunidad.",
      explore: "Explorar",
      otherCollections: "Otras colecciones",
      otherCollectionsDescription:
        "Descubre cómo otros usuarios documentan la evolución de sus árboles.",
      community: "Comunidad",
      species: "Especies",
      speciesInventory: "Inventario de especies",
      speciesDescription:
        "Consulta las especies dadas de alta y usa sus fichas como referencia de cultivo y mantenimiento.",
      viewSpecies: "Ver especies",
      speciesRegistered: "especies registradas",
      bonsaiOfMoment: "Bonsái del momento",
      fullRanking: "Ver ranking completo",
      noVotesThisMonth: "Todavía no hay votos suficientes para destacar un bonsái este mes.",
      last30Days: "Últimos 30 días"
    },
    collectionPage: {
      kicker: "Mi colección",
      trees: "árboles",
      description:
        "Vista editorial de la colección con foco en imagen, estado y evolución reciente.",
      registerBonsai: "Registra bonsái",
      empty: "Empieza registrando tu primer bonsái."
    },
    featuredPage: {
      kicker: "Comunidad",
      title: "Bonsáis destacados",
      description:
        "Descubre qué árboles están despertando más interés en la comunidad y entra en la colección de cada propietario.",
      last30Days: "Últimos 30 días",
      allTime: "Histórico",
      likedByMe: "Mis favoritos",
      empty: "Aún no hay votos suficientes para construir el ranking.",
      emptyLiked: "Todavía no has marcado ningún bonsái como favorito.",
      signInForLiked: "Inicia sesión para ver los bonsáis que te gustan.",
      range30d: "30 días",
      rangeAll: "Histórico",
      rangeLiked: "Favoritos"
    },
    publicCollectionsPage: {
      kicker: "Explorar",
      title: "Colecciones públicas",
      description:
        "Un inventario abierto de colecciones vivas, con foco en imagen, procedencia y acceso directo a cada cuaderno.",
      visibleCollections: "colecciones visibles",
      empty: "Todavía no hay colecciones públicas.",
      publicCollection: "Colección pública",
      featuredBonsai: "Bonsái destacado",
      noneFeatured: "Sin destacar",
      visibleTrees: "Visibles",
      trees: "árboles",
      unnamedUser: "Usuario",
      noLocation: "Ubicación no indicada"
    },
    publicCollectionDetail: {
      publicCollection: "Colección pública",
      noVisibleBonsais: "Esta colección no tiene bonsáis públicos visibles."
    },
    publicBonsaiDetail: {
      viewCollectionOf: "Ver colección de {name}",
      photo: "Foto",
      careSection: "Cuidados"
    },
    social: {
      saveVote: "Guardando...",
      voted: "Has votado",
      vote: "Votar",
      commentsTitle: "Comentarios",
      commentsDescription:
        "Comparte observaciones sobre el árbol o deja preguntas para su propietario.",
      ownerReply: "Responder como propietario",
      replyPlaceholder: "Añade una respuesta directa a este comentario",
      commentPlaceholder: "Comparte una observación o una pregunta sobre este bonsái",
      sending: "Enviando...",
      reply: "Responder",
      comment: "Comentar",
      deleting: "Borrando...",
      delete: "Eliminar",
      confirmDeleteComment: "¿Eliminar este comentario?",
      kodamaUser: "Usuario Kodama"
    },
    bonsai: {
      addTitle: "Añadir bonsái",
      name: "Nombre",
      species: "Especie",
      style: "Estilo",
      location: "Ubicación",
      acquiredAt: "Fecha de adquisición",
      ageAtAcquisition: "Edad al comprarlo",
      ageHint: "Edad estimada en años en el momento de adquisición",
      collectionStatus: "Estado en colección",
      notes: "Notas",
      publicVisibility: "Mostrar este bonsái en la colección pública",
      namePlaceholder: "Nombre del bonsái",
      stylePlaceholder: "Moyogi, Chokkan, Kengai...",
      locationPlaceholder: "Terraza norte, interior...",
      agePlaceholder: "Ej. 8",
      notesPlaceholder: "Observaciones iniciales, sustrato, procedencia..."
    },
    settingsPage: {
      title: "Ajustes",
      location: "Localización",
      publicCollection: "Hacer pública mi colección",
      publicCare: "Mostrar cuidados en la colección pública"
    },
    card: {
      latestCare: "Último cuidado",
      notYetRecorded: "Todavía no registrado"
    },
    notFound: {
      kicker: "No encontrado",
      title: "Este bonsái no existe en tu colección.",
      description:
        "Puede que aún no lo hayas creado o que la base de datos no esté inicializada.",
      cta: "Volver a Kodama"
    }
  },
  en: {
    metadata: {
      description: "Manage your bonsai collection and its care history."
    },
    nav: {
      home: "Home",
      species: "Species",
      publicCollections: "Public collections",
      featuredBonsais: "Featured bonsai",
      myCollection: "My collection",
      registerBonsai: "Register bonsai",
      settings: "Settings",
      admin: "Admin"
    },
    common: {
      access: "Sign in",
      createAccount: "Create account",
      back: "Back",
      edit: "Edit",
      addCare: "Add care",
      addImage: "Add image",
      gallery: "Gallery",
      photos: "Photos",
      care: "Care",
      comments: "Comments",
      votes: "votes",
      messages: "messages",
      timeline: "Evolution",
      noPhoto: "No photo",
      noPhotosYet: "No photos have been added yet.",
      noCareYet: "No care entries yet.",
      noCommentsYet: "There are no comments yet.",
      signInToInteract: "Sign in to vote and comment on public bonsai.",
      state: "Status",
      collection: "Collection",
      location: "Location",
      style: "Style",
      acquired: "Acquired",
      estimatedAge: "Estimated age",
      notIndicated: "Not specified",
      notDefined: "Not defined",
      unavailable: "Unavailable",
      noDate: "No date",
      previous: "Previous",
      next: "Next",
      view: "View",
      saveChanges: "Save changes",
      saveBonsai: "Save bonsai",
      saveSettings: "Save settings",
      settings: "Settings",
      collectionSheet: "Record",
      visible: "visible",
      active: "active",
      years: "years",
      viewCollection: "View collection",
      voteThisBonsai: "Vote for this bonsai or open its page to comment."
    },
    home: {
      kicker: "Digital bonsai journal",
      title: "A living collection",
      description:
        "Every bonsai asks for time, observation and calm care. Kodama helps you stay close to that process and remember what matters at each stage of the tree.",
      myCollection: "My collection",
      publicCollections: "Public collections",
      collection: "Collection",
      treesRegistered: "registered trees",
      recentActivity: "Recent activity",
      noRecentCare: "No care entries yet.",
      accessPanel:
        "Sign in to record bonsai, care, photos and the full visual history of your collection.",
      featured: "Featured",
      votedBonsais: "Top bonsai",
      votedDescription:
        "Explore the highest-rated trees and the ones gaining the most traction in the community.",
      explore: "Explore",
      otherCollections: "Other collections",
      otherCollectionsDescription:
        "Discover how other users document the evolution of their trees.",
      community: "Community",
      species: "Species",
      speciesInventory: "Species inventory",
      speciesDescription:
        "Browse the registered species and use their records as a reference for care and cultivation.",
      viewSpecies: "View species",
      speciesRegistered: "registered species",
      bonsaiOfMoment: "Bonsai of the moment",
      fullRanking: "View full ranking",
      noVotesThisMonth: "There are not enough votes yet to feature a bonsai this month.",
      last30Days: "Last 30 days"
    },
    collectionPage: {
      kicker: "My collection",
      trees: "trees",
      description:
        "An editorial view of your collection with focus on imagery, condition and recent evolution.",
      registerBonsai: "Register bonsai",
      empty: "Start by registering your first bonsai."
    },
    featuredPage: {
      kicker: "Community",
      title: "Featured bonsai",
      description:
        "Discover which trees are drawing the most interest in the community and jump into each owner's collection.",
      last30Days: "Last 30 days",
      allTime: "All time",
      likedByMe: "My favorites",
      empty: "There are not enough votes yet to build the ranking.",
      emptyLiked: "You have not marked any bonsai as favorite yet.",
      signInForLiked: "Sign in to view the bonsai you like.",
      range30d: "30 days",
      rangeAll: "All time",
      rangeLiked: "Favorites"
    },
    publicCollectionsPage: {
      kicker: "Explore",
      title: "Public collections",
      description:
        "An open inventory of living collections with a focus on imagery, provenance and direct access to each journal.",
      visibleCollections: "visible collections",
      empty: "There are no public collections yet.",
      publicCollection: "Public collection",
      featuredBonsai: "Featured bonsai",
      noneFeatured: "No highlight",
      visibleTrees: "Visible",
      trees: "trees",
      unnamedUser: "User",
      noLocation: "Location not specified"
    },
    publicCollectionDetail: {
      publicCollection: "Public collection",
      noVisibleBonsais: "This collection has no visible public bonsai."
    },
    publicBonsaiDetail: {
      viewCollectionOf: "View {name}'s collection",
      photo: "Photo",
      careSection: "Care"
    },
    social: {
      saveVote: "Saving...",
      voted: "Voted",
      vote: "Vote",
      commentsTitle: "Comments",
      commentsDescription:
        "Share observations about the tree or leave questions for its owner.",
      ownerReply: "Reply as owner",
      replyPlaceholder: "Add a direct reply to this comment",
      commentPlaceholder: "Share an observation or a question about this bonsai",
      sending: "Sending...",
      reply: "Reply",
      comment: "Comment",
      deleting: "Deleting...",
      delete: "Delete",
      confirmDeleteComment: "Delete this comment?",
      kodamaUser: "Kodama user"
    },
    bonsai: {
      addTitle: "Add bonsai",
      name: "Name",
      species: "Species",
      style: "Style",
      location: "Location",
      acquiredAt: "Acquisition date",
      ageAtAcquisition: "Age when acquired",
      ageHint: "Estimated age in years at the time of acquisition",
      collectionStatus: "Collection status",
      notes: "Notes",
      publicVisibility: "Show this bonsai in the public collection",
      namePlaceholder: "Bonsai name",
      stylePlaceholder: "Moyogi, Chokkan, Kengai...",
      locationPlaceholder: "North terrace, indoors...",
      agePlaceholder: "e.g. 8",
      notesPlaceholder: "Initial observations, substrate, origin..."
    },
    settingsPage: {
      title: "Settings",
      location: "Location",
      publicCollection: "Make my collection public",
      publicCare: "Show care history in the public collection"
    },
    card: {
      latestCare: "Latest care",
      notYetRecorded: "Not recorded yet"
    },
    notFound: {
      kicker: "Not found",
      title: "This bonsai does not exist in your collection.",
      description:
        "You may not have created it yet, or the database may not be initialized.",
      cta: "Back to Kodama"
    }
  },
  ja: {
    metadata: {
      description: "盆栽コレクションと手入れの記録を管理します。"
    },
    nav: {
      home: "ホーム",
      species: "樹種",
      publicCollections: "公開コレクション",
      featuredBonsais: "注目の盆栽",
      myCollection: "マイコレクション",
      registerBonsai: "盆栽を登録",
      settings: "設定",
      admin: "管理"
    },
    common: {
      access: "ログイン",
      createAccount: "アカウント作成",
      back: "戻る",
      edit: "編集",
      addCare: "手入れを追加",
      addImage: "画像を追加",
      gallery: "ギャラリー",
      photos: "写真",
      care: "手入れ",
      comments: "コメント",
      votes: "票",
      messages: "メッセージ",
      timeline: "変化の記録",
      noPhoto: "写真なし",
      noPhotosYet: "まだ写真が登録されていません。",
      noCareYet: "まだ手入れの記録がありません。",
      noCommentsYet: "まだコメントがありません。",
      signInToInteract: "公開盆栽に投票やコメントするにはログインしてください。",
      state: "状態",
      collection: "コレクション",
      location: "置き場所",
      style: "樹形",
      acquired: "取得日",
      estimatedAge: "推定樹齢",
      notIndicated: "未設定",
      notDefined: "未定義",
      unavailable: "情報なし",
      noDate: "日付なし",
      previous: "前へ",
      next: "次へ",
      view: "見る",
      saveChanges: "変更を保存",
      saveBonsai: "盆栽を保存",
      saveSettings: "設定を保存",
      settings: "設定",
      collectionSheet: "記録",
      visible: "公開中",
      active: "育成中",
      years: "年",
      viewCollection: "コレクションを見る",
      voteThisBonsai: "この盆栽に投票するか、詳細ページでコメントしてください。"
    },
    home: {
      kicker: "盆栽のデジタル手帳",
      title: "生きたコレクション",
      description:
        "盆栽には時間と観察、そして静かな手入れが必要です。Kodama は、その歩みに寄り添い、木の各段階で大切なことを記録する手助けをします。",
      myCollection: "マイコレクション",
      publicCollections: "公開コレクション",
      collection: "コレクション",
      treesRegistered: "登録された樹",
      recentActivity: "最近の動き",
      noRecentCare: "まだ手入れの記録がありません。",
      accessPanel:
        "ログインすると、盆栽、手入れ、写真、コレクションの視覚的な履歴を記録できます。",
      featured: "注目",
      votedBonsais: "トップ盆栽",
      votedDescription:
        "コミュニティで特に評価が高く、注目を集めている樹を見つけましょう。",
      explore: "見る",
      otherCollections: "ほかのコレクション",
      otherCollectionsDescription:
        "ほかのユーザーがどのように樹の変化を記録しているかを見てみましょう。",
      community: "コミュニティ",
      species: "樹種",
      speciesInventory: "樹種インベントリ",
      speciesDescription:
        "登録済みの樹種を一覧し、それぞれの育成メモを参考情報として確認できます。",
      viewSpecies: "樹種を見る",
      speciesRegistered: "登録済み樹種",
      bonsaiOfMoment: "今月の盆栽",
      fullRanking: "ランキングを見る",
      noVotesThisMonth: "今月の注目盆栽を決めるには、まだ投票数が足りません。",
      last30Days: "過去30日"
    },
    collectionPage: {
      kicker: "マイコレクション",
      trees: "本",
      description:
        "写真、状態、最近の変化に焦点を当てたコレクションの編集的な一覧です。",
      registerBonsai: "盆栽を登録",
      empty: "最初の盆栽を登録して始めましょう。"
    },
    featuredPage: {
      kicker: "コミュニティ",
      title: "注目の盆栽",
      description:
        "コミュニティで関心を集めている樹を見つけ、各オーナーのコレクションへ進みましょう。",
      last30Days: "過去30日",
      allTime: "通算",
      likedByMe: "お気に入り",
      empty: "ランキングを作るには、まだ十分な投票がありません。",
      emptyLiked: "まだお気に入りにした盆栽はありません。",
      signInForLiked: "お気に入りの盆栽を見るにはログインしてください。",
      range30d: "30日",
      rangeAll: "通算",
      rangeLiked: "お気に入り"
    },
    publicCollectionsPage: {
      kicker: "探索",
      title: "公開コレクション",
      description:
        "写真、来歴、各記録帳への導線に重きを置いた、生きたコレクションの公開一覧です。",
      visibleCollections: "公開コレクション",
      empty: "まだ公開コレクションはありません。",
      publicCollection: "公開コレクション",
      featuredBonsai: "注目の樹",
      noneFeatured: "未設定",
      visibleTrees: "公開本数",
      trees: "本",
      unnamedUser: "ユーザー",
      noLocation: "場所未設定"
    },
    publicCollectionDetail: {
      publicCollection: "公開コレクション",
      noVisibleBonsais: "このコレクションには公開中の盆栽がありません。"
    },
    publicBonsaiDetail: {
      viewCollectionOf: "{name} のコレクションを見る",
      photo: "写真",
      careSection: "手入れ"
    },
    social: {
      saveVote: "保存中...",
      voted: "投票済み",
      vote: "投票",
      commentsTitle: "コメント",
      commentsDescription:
        "この樹についての気づきや、オーナーへの質問を残せます。",
      ownerReply: "オーナーとして返信",
      replyPlaceholder: "このコメントに直接返信を追加",
      commentPlaceholder: "この盆栽についての感想や質問を書いてください",
      sending: "送信中...",
      reply: "返信",
      comment: "コメントする",
      deleting: "削除中...",
      delete: "削除",
      confirmDeleteComment: "このコメントを削除しますか？",
      kodamaUser: "Kodama ユーザー"
    },
    bonsai: {
      addTitle: "盆栽を追加",
      name: "名前",
      species: "樹種",
      style: "樹形",
      location: "置き場所",
      acquiredAt: "取得日",
      ageAtAcquisition: "取得時の樹齢",
      ageHint: "取得時点でのおおよその樹齢（年）",
      collectionStatus: "コレクション状態",
      notes: "メモ",
      publicVisibility: "この盆栽を公開コレクションに表示する",
      namePlaceholder: "盆栽の名前",
      stylePlaceholder: "模様木、直幹、懸崖...",
      locationPlaceholder: "北向きのテラス、室内...",
      agePlaceholder: "例: 8",
      notesPlaceholder: "初期メモ、用土、入手元..."
    },
    settingsPage: {
      title: "設定",
      location: "所在地",
      publicCollection: "自分のコレクションを公開する",
      publicCare: "公開コレクションで手入れ履歴を表示する"
    },
    card: {
      latestCare: "最新の手入れ",
      notYetRecorded: "まだ記録なし"
    },
    notFound: {
      kicker: "見つかりません",
      title: "この盆栽はコレクション内に存在しません。",
      description:
        "まだ作成していないか、データベースが初期化されていない可能性があります。",
      cta: "Kodama に戻る"
    }
  }
} as const;

type Dictionary = (typeof dictionaries)[Locale];

type CareEventKey =
  | "WATERING"
  | "FERTILIZING"
  | "PRUNING"
  | "PINCHING"
  | "REPOTTING"
  | "WIRING"
  | "DEFOLIATION"
  | "PEST_TREATMENT";

type CollectionStatusKey = "ACTIVE" | "DECEASED" | "SOLD" | "GIFTED" | "OTHER";

const careEventLabels: Record<Locale, Record<CareEventKey, string>> = {
  es: {
    WATERING: "Riego",
    FERTILIZING: "Abonado",
    PRUNING: "Poda",
    PINCHING: "Pinzado",
    REPOTTING: "Trasplante",
    WIRING: "Alambrado",
    DEFOLIATION: "Defoliado",
    PEST_TREATMENT: "Tratamiento"
  },
  en: {
    WATERING: "Watering",
    FERTILIZING: "Fertilizing",
    PRUNING: "Pruning",
    PINCHING: "Pinching",
    REPOTTING: "Repotting",
    WIRING: "Wiring",
    DEFOLIATION: "Defoliation",
    PEST_TREATMENT: "Treatment"
  },
  ja: {
    WATERING: "水やり",
    FERTILIZING: "施肥",
    PRUNING: "剪定",
    PINCHING: "芽摘み",
    REPOTTING: "植え替え",
    WIRING: "針金掛け",
    DEFOLIATION: "葉刈り",
    PEST_TREATMENT: "防除"
  }
};

const collectionStatusLabels: Record<Locale, Record<CollectionStatusKey, string>> = {
  es: {
    ACTIVE: "Activo",
    DECEASED: "Muerto",
    SOLD: "Vendido",
    GIFTED: "Regalado",
    OTHER: "Otro"
  },
  en: {
    ACTIVE: "Active",
    DECEASED: "Deceased",
    SOLD: "Sold",
    GIFTED: "Gifted",
    OTHER: "Other"
  },
  ja: {
    ACTIVE: "育成中",
    DECEASED: "枯死",
    SOLD: "譲渡済み",
    GIFTED: "贈与済み",
    OTHER: "その他"
  }
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getIntlLocale(locale: Locale) {
  return LOCALE_META[locale].intl;
}

export function getCareEventLabel(locale: Locale, type: CareEventKey) {
  return careEventLabels[locale][type];
}

export function getCollectionStatusLabel(
  locale: Locale,
  status: CollectionStatusKey
) {
  return collectionStatusLabels[locale][status];
}

export function getCollectionStatusOptions(locale: Locale) {
  return Object.entries(collectionStatusLabels[locale]).map(([value, label]) => ({
    value,
    label
  }));
}

export function replaceTemplate(
  template: string,
  values: Record<string, string>
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template
  );
}
