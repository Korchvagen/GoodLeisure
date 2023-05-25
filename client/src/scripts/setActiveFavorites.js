export const setActiveFavorites = (id) => {
  const conteiner = document.getElementById(id);

    conteiner.querySelector('.leisure-container__favorite-btn').classList.add('active');
};