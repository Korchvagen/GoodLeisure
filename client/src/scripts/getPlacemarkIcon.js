export const getPlacemarkIcon = (category) => {
  const ruCategories = ["литература", "спорт", "еда", "искусство", "кино", "музыка", "технологии", "игры", "развлечения", "природа", "животные", "шопинг", "ночная жизнь", "танцы", "астрономия", "поиск"];
  const enCategories = ["literature", "sport", "food", "art", "cinema", "music", "technics", "games", "entertainment", "nature", "animals", "shopping", "nightLife", "dances", "space", "search"];
  
  const images = {
    literature: 'https://img.icons8.com/external-justicon-lineal-color-justicon/64/external-book-elearning-and-education-justicon-lineal-color-justicon.png',
    sport: 'https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Dumbbell-fitness-nawicon-outline-color-nawicon.png',
    food: 'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-food-summertime-wanicon-lineal-color-wanicon.png',
    art: 'https://img.icons8.com/external-goofy-color-kerismaker/96/external-Art-education-goofy-color-kerismaker.png',
    cinema: 'https://img.icons8.com/emoji/48/clapper-board-emoji.png',
    music: 'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-music-free-time-wanicon-lineal-color-wanicon.png',
    technics: 'https://img.icons8.com/external-microdots-premium-microdot-graphic/64/external-gears-communication-multimedia-vol1-microdots-premium-microdot-graphic.png',
    games: 'https://img.icons8.com/external-others-cattaleeya-thongsriphong/64/external-controller-game-controller-color-line-others-cattaleeya-thongsriphong-3.png',
    entertainment: 'https://img.icons8.com/avantgarde/100/confetti.png',
    nature: 'https://img.icons8.com/external-wanicon-two-tone-wanicon/64/external-nature-adventure-wanicon-two-tone-wanicon-1.png',
    animals: 'https://img.icons8.com/external-flat-icons-maxicons/85/external-animal-life-of-amazon-flat-flat-icons-maxicons-9.png',
    shopping: 'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-sale-cyber-monday-wanicon-lineal-color-wanicon.png',
    nightLife: 'https://img.icons8.com/color/48/disco-ball.png',
    dances: 'https://img.icons8.com/external-goofy-color-kerismaker/96/external-Dance-birthday-party-goofy-color-kerismaker.png',
    space: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-space-the-future-flaticons-flat-flat-icons-2.png',
    search: 'https://img.icons8.com/color/48/search--v1.png'
  }

  const currentCategory = ruCategories.includes(category.toLowerCase()) ? enCategories[ruCategories.indexOf(category.toLowerCase())] : enCategories.find(elem => elem === category.toLowerCase());

  return images[currentCategory];
}