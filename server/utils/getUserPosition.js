import IpBase from "@everapi/ipbase-js";

export default async (req, res, next) => {
  try {
    const ipBase = new IpBase('bVWKaXAJzvtZfQptajsDqaMB63iGqKNdTjBqkWMt');
    const ip = req.body.ip;

    const response = await ipBase.info({
      ip: ip,
      language: 'ru'
    });

    console.log(req.body);
    console.log(response);
    req.Position = response.data;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось определить Ваше местоположение'
    });
  }
}