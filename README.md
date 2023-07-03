# Memoria del Proyecto 

 
## Uso del proyecto 

Para poder ejecutar el proyecto necesitas instalar las librerías. 
No están subidas las carpetas de node_modules para evitar el peso de los archivos. 
Tienes que utilizar la base de datos incluida dentro dela carpeta de backend. 
Para ejecutar el backend ejecutar primero node index.js en la ruta de backend. 
Para ejecutar el frontend ejecutar npm start en la ruta del frontend. 
No he modificado la ruta de inicio del front, así que permitir que abra en un puerto distinto. 


## Planteamiento y Objetivos 

El proyecto "blog-2023" tenía que seguir unas características dadas por una consigna: 
"Realizar un blog sencillo con un sistema CRUD (Create, Read, Update, Delete). 
Un sistema que nos permita crear entradas, que salgan en el feed de la home, editar la entrada y poder eliminarla de manera dinámica" 
Tenía que utilizar varías tecnologías: 
- NodeJs 
- React 
- CSS (tailwind  o bootstrap) 
- MySQL  

He decidido utilizar los conocimientos aprendidos durante mi primer bootcamp para realizar el proyecto, así que me decidí a utilizar bootstrap. 
El proyecto se divide en dos carpetas para separar el frontend del backend y utilicé el comando npx create-react-app para generar parte de la estructura de carpetas del frontend. 
A continuación, enumero las librerías instaladas en cada una de las carpetas y su funcionamiento. 
 
### Frontend: 

- Sequelize: Se utiliza como librería para establecer la interacción entre la base de datos y los objetos en el frontend. 
- mysql2: Actúa como controlador para manejar las peticiones enviadas a la base de datos desde el frontend. 
- Express: Framework utilizado para trabajar con Node.js y gestionar los enrutamientos en el frontend. 
- CORS: Se emplea para evitar conflictos entre la parte del backend y la del frontend, permitiendo solicitudes de origen cruzado (Cross-Origin Resource Sharing). 
- Multer: Librería utilizada para gestionar el manejo de imágenes en el frontend. 
- Moment: Librería empleada para dar formato a fechas y horas. 

### Backend: 

- Bootstrap: Se ha utilizado en el frontend para aplicar estilos y componentes predefinidos, facilitando el diseño y la apariencia visual de la interfaz de usuario. 
- Moment: Librería empleada para dar formato a fechas y horas. 
- React: Se ha utilizado como la biblioteca principal para construir la interfaz de usuario del proyecto. 
- React Bootstrap: Se ha utilizado en conjunto con Bootstrap para integrar componentes de Bootstrap en la aplicación React. 
- React DOM: Es una biblioteca que interactúa con el DOM para renderizar los componentes de React en el navegador. 
- React Router DOM: Se ha utilizado para gestionar la navegación en la aplicación React. 


## Metodología 

Empecé el proyecto creando una base de datos con una tabla de post como se me pedía. Añadí los elementos necesarios para gestionar el blog: post_id, header, body, image, date y update_date. 
Esta última no era necesaria, pero podría servirme para comprobar si los posts se actualizaban y si gestionaba bien las fechas y horas. 

  

Luego creé las carpetas para separar front de back e instalar las librerias que sabía que necesitaría, empecé a crear los primeros componentes de REACT. 
Pensé los elementos que necesitaría para la web y cree las carpetas que los contendrían añadiendo archivos js vacios con el nombre de los elementos que tendrían que funcionar en su interior. 
Una vez esta parte hecha hice las tres vistas web que tendría el blog, una home donde ver el previo de todas las entradas, una vista para ver una entrada y poder editarla y por último una donde crear una nueva entrada.
Como ya tenía el nombre de los archivos que utilizaría podía enlazarlos. 
Una vez realizada esta estructura empecé a configurar el funcionamiento de las rutas tal y como aprendí en el bootcamp, creando el enrutador e importando las vistas y componentes de react. 
Ya que tenía el frontend estructurado hice la parte del backend, creando una conexión con la base de datos y realizando los ajustes necesarios para gestionar las rutas de los endpoints.  

Una vez realizado esto empecé a crear el contenido real de los archivos de React. Empecé a crear los componentes necesarios para ver el listado de post y ver el post individual de una manera muy básica y sin utilizar ningún tipo de estilo. 
De primeras solo le di la funcionalidad de cargar los datos necesarios de la base de datos. Ya habría tiempo de añadir las funcionalidades a los botones después. 
Una vez tenía los elementos que trataban de conectarse a la base de datos utilizando fetch cree los dos primeros endpoints que me permitirían cargar datos que visualizar en pantalla y comprobar que estaba funcionando todo. 
Introduje un par de entradas a mano en la base de datos para comprobar que se imprimían bien en pantalla.
En este comienzo las imágenes las cargaba de la carpeta public del frontend y metía esa ruta en la base de datos. 

Una vez lograda la visualización de los posts introducidos a mano en la base de datos era momento de hacer funcionar el componente de creación de post. Configuré la biblioteca de Multer para que al elegir y guardar un post esta se me guardara en la carpeta public del backend. 
Configuré un endpoint para hacer un INSERT en la base de datos con el título, el contenido y el nombre de la imagen y gracias a la configuración de la base de datos se generaría un id y crearía la fecha y la fecha de actualización. 
Una vez que conseguí hacer funcionar la creación de nuevos posts me centré en crear e implementar las funciones de actualizar y eliminar. 
Al ser parecidas en estructura pensé que serían más sencillas de realizar y con solo hacer UPDATE o DELETE de los valores y de la imagen seleccionada en la base de datos funcionaría. 

Por último como la estructura estaba funcionando por parte del backend, las peticiones y los botones funcionaban desde la parte del frontend me puse a darle estilo y formato a los datos mostrados. Este fué el punto de implementar pequeñas mejoras y corregir los errores que encontraba.
 

## Desafíos y Soluciones 

La parte más compleja para mí de realizar en este proyecto ha sido la gestión de las imágenes. Nunca había implementado la subida de imágenes por parte del usuario desde el propio proyecto y no sabía cómo aplicarlo. 
Busqué en internet y vi que recomendaban utilizar Multer y una consulta a mis compañeros de bootcamp me confirmó que les estaba funcionando. 
No tenía muy claro como trabajar con esa librería y como se configuraba y me llevó horas del escaso tiempo del que disponía para realizar este trabajo. 
Algo que se me atascó durante gran parte del proyecto era la lectura de las imágenes que guardaba correctamente a la hora de crear un post en la carpeta backend. 
De manera provisional para poder avanzar y despejar la mente de ese problema opté por duplicar esa carpeta situada en el backend y guardarla en el front, donde no había tenido problemas. 
Más avanzado el proyecto ya conseguí cargar las imágenes desde donde se nos pedía. 

La gestión de las imágenes en las peticiones también ha sido muy diferente a solo trabajar con datos. 
Al principio las imágenes se llamaban igual que el archivo original y sabía que no era correcto al poder existir duplicados. 
Luego traté de renombrarlas como "image+id_post" pero no se puedes utilizar un id antes de crearlo, así que terminé renombrándolo con la fecha de creación del post. 
Al igual que para añadir imágenes eliminarlas para mi también era nuevo, así que buscando en internet descubrí que podía utilizar la función nativa de NODE fs.unlink para eliminar imágenes. 
Esta función no requiere ninguna configuración compleja, así que resultó sencilla implementarla. 

  
## Resultados y Conclusiones 

Al final he cumplido con todos los requisitos que se me solicitaban; ha quedado un blog muy sencillo, pero funciona bien, es muy claro e intuitivo. 
He logrado aprender a utilizar una librería nueva y repasado lo dado durante el bootcamp. 
Me habría gustado dedicarle más tiempo a la parte visual antes de la entrega, pero una vez presentado el proyecto puedo volver a él para mejorarlo. 

 
