export const setActiveFavorites = (favorites, id) => {
  const conteiner = document.getElementById(id);
  
  if(favorites.includes(Number(id))){
    conteiner.querySelector('.leisure-container__favorite-btn').classList.add('active');
  }
};