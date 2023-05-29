export default async (req, res, next) => {
  try {
    console.log(req.body);
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY_LOC}&geocode=${req.body.coords}&format=json&kind=locality&rspn=1&results=1`);
    const data = await response.json();

    req.Position = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;

    next();
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось определить Ваше местоположение'
    });
  }
}