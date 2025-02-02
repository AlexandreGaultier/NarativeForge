export const books = [
  {
    id: 'heroic-fantasy',
    title: 'Les Chroniques de la Montagne',
    description: 'Un moine guerrier quitte son monastère pour une quête épique dans un monde d\'heroic fantasy.',
    cover: '/covers/mountain.jpg',
    author: 'NarativeForge',
    genre: 'Heroic Fantasy'
  }
];

export const heroicFantasy = {
  chapters: [
    {
      num: 0,
      title: "Prélude",
      text: "Bienvenue dans cette aventure héroïque !\n\nPour vivre pleinement cette histoire, vous aurez besoin :\n- D'un dé à 6 faces\n- De quoi noter vos stats et votre inventaire\n- De marquer-page (ou de noter les numéros de chapitres)",
      links: [
        { text: "Commencer l'aventure", target: 1 }
      ]
    },
    {
      num: 1,
      title: "Le départ",
      text: "Le vent hurlait sur les cimes enneigées, fouettant le visage de Kellan alors qu'il gravissait les marches taillées à même la montagne. Son souffle formait de petits nuages devant lui, s'échappant en brèves bouffées de détermination.",
      links: [
        { text: "Continuer vers le sentier de la vallée", target: 2 },
        { text: "Explorer la grotte proche", target: 3 }
      ]
    }
  ]
}; 