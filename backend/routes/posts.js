const express = require('express');
const router = express.Router();
const sequelize = require('../conexion_bd.js');
const moment = require('moment');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}${path.extname(file.originalname)}`; // añadir date.time
    cb(null, fileName);
  },
});

const upload = multer({ storage });



router.get('/all-post', async function (req, res) {
  try {
    const posts_list = await sequelize.query(
      `
      SELECT *
      FROM post
      ORDER BY date DESC;
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Calcular la diferencia de tiempo para cada publicación
    posts_list.forEach((post) => {
      const postDate = moment(post.date);
      const currentDate = moment();
      const duration = moment.duration(currentDate.diff(postDate));

      if (duration.asDays() >= 1) {
        post.timeAgo = `${Math.floor(duration.asDays())} ${
          Math.floor(duration.asDays()) === 1 ? 'día' : 'días'
        }`;
      } else if (duration.asHours() >= 1) {
        post.timeAgo = `${Math.floor(duration.asHours())} ${
          Math.floor(duration.asHours()) === 1 ? 'hora' : 'horas'
        }`;
      } else {
        post.timeAgo = `${Math.floor(duration.asMinutes())} ${
          Math.floor(duration.asMinutes()) === 1 ? 'minuto' : 'minutos'
        }`;
      }
    });

    res.json(posts_list);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


router.get('/post/:post_id', async function (req, res) {
  try {
    const post = await sequelize.query(
      `
      SELECT *
      FROM post
      WHERE post_id = :post_id;
      `,
      {
        replacements: { post_id: req.params.post_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Calcular la diferencia de tiempo para la publicación
    if (post.length > 0) {
      const postDate = moment(post[0].date);
      const currentDate = moment();
      const duration = moment.duration(currentDate.diff(postDate));

      if (duration.asDays() >= 1) {
        post[0].timeAgo = `${Math.floor(duration.asDays())} ${
          Math.floor(duration.asDays()) === 1 ? 'día' : 'días'
        }`;
      } else if (duration.asHours() >= 1) {
        post[0].timeAgo = `${Math.floor(duration.asHours())} ${
          Math.floor(duration.asHours()) === 1 ? 'hora' : 'horas'
        }`;
      } else {
        post[0].timeAgo = `${Math.floor(duration.asMinutes())} ${
          Math.floor(duration.asMinutes()) === 1 ? 'minuto' : 'minutos'
        }`;
      }
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


router.post('/editpost/:post_id', upload.single('image'), async function (
  req,
  res
) {
  try {
    const { post_id } = req.params;
    const { header, body } = req.body;

    const posts = await sequelize.query(
      `
      SELECT *
      FROM post
      WHERE post_id = :post_id
      `,
      {
        replacements: { post_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Elimina la imagen anterior si se proporciona una nueva imagen
    if (req.file) {
      const imagePath = path.join(
        __dirname,
        '../public/images',
        posts[0].image
      );

      fs.unlink(imagePath, (error) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'Error al eliminar la imagen' });
        }
      });
    }

    const updatedPost = await sequelize.query(
      `
      UPDATE post
      SET header = :header, body = :body, image = :image
      WHERE post_id = :post_id;
      `,
      {
        replacements: {
          header,
          body,
          image: req.file ? req.file.filename : posts[0].image,
          post_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


router.post('/newpost', upload.single('image'), async function (req, res) {
  try {
    const { header, body } = req.body;
    let imagePath = null;

    // Verifica si se ha enviado un archivo de imagen
    if (req.file) {
      imagePath = req.file.filename; // Ruta completa del archivo
    }

    await sequelize.query(
      `
      INSERT INTO post (header, body, image)
      VALUES (:header, :body, :imagePath);
      `,
      {
        replacements: { header, body, imagePath },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.json({ message: 'Nueva entrada creada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


router.delete('/delete/:post_id', async (req, res) => {
  const { post_id } = req.params;

  try {
    const posts = await sequelize.query(
      `
      SELECT *
      FROM post
      WHERE post_id = :post_id
      `,
      {
        replacements: { post_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Elimina el post de la base de datos
    await sequelize.query(
      `
      DELETE FROM post
      WHERE post_id = :post_id
      `,
      {
        replacements: { post_id },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    const imagePath = path.join(__dirname, '../public/images', posts[0].image);

    // Elimina la imagen del sistema de archivos
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar la imagen' });
      } else {
        res.json({ message: 'Post eliminado correctamente' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = router;

