import express from 'express';
import dotenv from 'dotenv';
import { genTable } from './routes/genTable.js';
import { user } from './routes/user.js'
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  };
  
  app.use(cors(corsOptions));


app.use('/api/genTable', genTable);
app.use('/api/user', user);

app.use(cors());


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`server at http://localhost:${PORT}`);
});
