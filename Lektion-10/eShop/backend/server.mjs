import express from 'express';
// import cors from 'cors';
import mysql from 'mysql2/promise';
import { config } from './dbConfig.mjs';

// Nu skapar jag servern...
const app = express();

app.use(express.json());

// Vår första endpoint...
// En funktion som ligger och lyssnar på en speciell händelse eller anrop...
// Kommer att lyssna på http://localhost:5010/api/customers
app.get('/api/customers', async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute('SELECT * FROM eShopDB.Customers');
  res.status(200).json({ success: true, data: results });
});

// En enpoint för att spara ner data i MySQL...
app.post('/api/customers', async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const body = req.body;
  const sql = `INSERT INTO eShopDB.Customers(FirstName, LastName, Email)VALUES('${body.firstName}','${body.lastName}', '${body.email}')`;

  await connection.execute(sql);

  res.status(200).json({ success: true, data: body });
});

app.delete('/api/customers/:id', async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const id = req.params.id;
  const sql = `DELETE FROM eShopDB.Customers WHERE Id=${id}`;

  await connection.execute(sql);
  res.status(204).json();
});

app.listen(5010, console.log('Servern är startad och lyssnar på port 5010'));
