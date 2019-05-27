const express = require("express")
const bodyParser = require('body-parser');
const morgan = require("morgan")

const connection = require('./conf')

const app = express()
const port = 3000


app.use(morgan("dev"))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


/*######################_____GET______#####################################*/

app.get('/connard', (req, res) => {
  connection.query('SELECT * from connard', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors du reperage des connards');
    } else {
      res.json(results);
    }
  });
});

app.get('/connard/list', (req, res) => {
  connection.query('SELECT firstname, bastard, level from connard', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors du reperage des connards');
    } else {
      res.json(results);
    }
  });
});

app.get('/connard/content', (req, res) => {
  connection.query('SELECT * from connard where bastard = true', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors du reperage des connards');
    } else {
      res.json(results);
    }
  });
});

app.get('/connard/start', (req, res) => {
  connection.query('SELECT * from connard where firstname like "s%"', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors du reperage des connards');
    } else {
      res.json(results);
    }
  });
});

app.get('/connard/sup', (req, res) => {
  connection.query('SELECT * from connard where birthday > "1990-01-01"', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors du reperage des connards');
    } else {
      res.json(results);
    }
  });
});

app.get('/connard/level/:ass', (req, res) => {
  const enculer = req.params.ass
  connection.query(`SELECT * from connard order by level ${enculer}`, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors du reperage des connards');
    } else {
      res.json(results);
    }
  });
});

/*######################_____POST______#####################################*/

app.post('/connard/add', (req, res) => {

  const formData = req.body
  console.log(formData)
 
  connection.query('INSERT INTO connard SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la sauvegarde d'un connard");
    } else {
      res.sendStatus(200, results);
    }
  });
});

/*######################_____PUT______#####################################*/

app.put('/connard/modif', (req, res) => {

  const formData = req.body
  console.log(formData)
 
  connection.query('UPDATE connard SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la modif d'un connard");
    } else {
      res.sendStatus(200, results);
    }
  });
});


app.put('/connard/toggle', (req, res) => {

  const formData = req.body
  console.log(formData)
 
  connection.query('UPDATE connard SET bastard = ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors du basculement d'un connard");
    } else {
      res.sendStatus(200, results);
    }
  });
});



/*######################_____DELETE______#####################################*/

app.put('/connard/delete/:id', (req, res) => {

  const formData = req.params.id
  console.log(formData)
 
  connection.query('DELETE from connard Where id = ?', formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression d'un connard");
    } else {
      res.sendStatus(200, results);
    }
  });
});



app.listen(port, console.log(`http://localhost:${port}`))