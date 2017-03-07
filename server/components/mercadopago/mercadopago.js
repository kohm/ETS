let MP = require("mercadopago");

module.exports = function (req, res) {
  let mp = new MP("4061122982585685", "azI3x5whInO1ZySoQ2hzB0GEhbraOilo");

  let preference = {
    "items": [
      {
        "title": "Tintura",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": 410.0
      },
      {
        "title": "Peine",
        "quantity": 2,
        "currency_id": "ARS",
        "unit_price": 310.0
      },
      {
        "title": "Rakoton",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": 102.0
      }
    ]
  };
  console.log('RUN RUUNNNNN');

  mp.createPreference(preference, function (err, data) {

    console.log('create reference');

    if (err) {
      console.log('err');
      res.send(err);
    } else {
      console.log(data);
      res.render("button", {"preference": data});
    }
  });
};
