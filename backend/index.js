const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Dependencia para manejar la carga de archivos

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// Importar las rutas
const routes = require('./routes/routes');

// Rutas principales
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

// Rutas de la API
app.use('/api', routes);


// Configura Multer para guardar los archivos en la carpeta "public"
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'public');
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname);
	},
  });
  const upload = multer({ storage: storage });
  
  // Ruta para manejar la carga de la imagen
  app.post('/api/upload', upload.single('image'), (req, res) => {
	// Aquí puedes realizar cualquier procesamiento adicional si es necesario
  
	const imageUrl = `http://localhost:3000/${req.file.filename}`;
	res.json(imageUrl);
  });

// Puerto de escucha
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
