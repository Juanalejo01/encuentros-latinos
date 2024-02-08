# ENCUENTROS-LATINOS

En este portal web de encuentros se tiene como objetivo conectar a personas que
comparten los mismos gustos sobre una temática y que quieren quedar en un punto
de encuentro de una ciudad. Los usuarios de este portal web son personas que
buscan conocer gente nueva con la que compartir sus intereses.

La plataforma gestionará el acceso de los usuarios que quieran crear sus propios
puntos de encuentro indicando la temática, la fecha y hora y el lugar. Estos usuarios
deben de estar registrados dentro de la plataforma para poder crear con éxito un
punto de encuentro y también podrán inscribirse a otros puntos de encuentro que
hayan creado otros usuarios registrados.

Los usuarios de la plataforma pueden no registrarse, pero estarán limitados a
visualizar los puntos de encuentro creados por los usuarios registrados y ver la lista
de usuarios que se han inscrito a esos puntos de encuentro. Los puntos de
encuentro los pueden filtrar por temática y ciudad.


## FUNCIONALIDADES 

Las funcionalidades de la plataforma web se diferencia entre los diferentes tipos de
usuarios. Por un lado, tendremos a los usuarios anónimos y por otro a los usuarios
registrados.


### Usuarios anónimos.

Los usuarios anónimos serán usuarios nuevos que no se han registrado aún en la
plataforma. El portal web deberá tener las siguientes funcionalidades para este tipo
de usuarios:

• Visualizar el listado de los puntos de encuentro ordenados por fecha más
próxima (no aparecen los que ya han pasado). Solo debe aparecer título, foto,
temática, localidad, fecha y hora y número de asistentes.

• Filtrar puntos de encuentro por:

o Ciudad

o Temática

• Visualizar un punto de encuentro en detalle. Deben de aparecer los mismos
datos que en listado, pero a mayores la descripción y el listado de asistentes.

• Registro de usuarios: Los usuarios deben poder registrarse en el portal web
proporcionando sus datos personales, como nombre, correo electrónico,
contraseña, biografía y avatar.

• Login: Los usuarios deben poder entrar al portal web proporcionando los
datos de registro del correo electrónico y contraseña.

### Usuarios registrados.

El portal web deberá tener las siguientes funcionalidades para este tipo de usuarios:

• El mismo que el de los usuarios anónimos.

• Inscripción a encuentros: deben poder inscribirse a los encuentros que les
interesen, pero también podrán darse de baja de ellos.

• Creación de encuentros: deben poder crear sus propios encuentros indicando
título, descripción, foto, temática, localidad y fecha y hora.

• Editar su perfil: deben poder modificar todos los datos de su perfil, el nombre,
apellidos, biografía, avatar, correo electrónico y contraseña. Para el correo
electrónico y la contraseña, se le pedirá que ponga la contraseña con la que
registró la cuenta.

• Eliminar su cuenta: deben poder eliminar su cuenta en el caso de que se
quiera dar de baja, para ello le pedirá que ponga la contraseña con la que se
registró la cuenta.


## TECNOLOGIAS

### Backend

  -NodeJS, MySQL y serevidor Express.
  
  -Además: 
    "bcryptjs"
    "cors"
    "dotenv"
    "express"
    "express-fileupload"
    "joi"
    "jsonwebtoken"
    "morgan"
    "mysql2"
    "nanoid"
    "nodemon"
    "sharp"


### Frontend

  -Lenguage usado: JavaScript

  -Framework: ReactJS, con ViteJS

  -CSS con metodología BEN.


## CONFIGURACIÓN Y EJECUCIÓN

Para poder iniciar la app de Encuentros Latinos deberás seguir estos pasos:

  1. Clonar el repositorio.
     ```bash
      git clone git@github.com:Juanalejo01/encuentros-latinos.git
     ```
  2. Navega hasta el directorio raíz del proyecto, llamado encuentros-latinos
     ```bash
     cd encuentros-latinos
     ```
  3. Después deberás acceder a la carpeta backend.
     ```bash
      cd backend
     ```
  4. Instalamos dependencias.
     ```bash
      npm install
     ```
 5. Creamos un archivo llamado .env dentro de la carpeta backend, basandonos en la que hemos dejado llamada template.env para orientar, y completas los campos con tus datos.
 6. Creamos las tablas con el siguiente comando, o con el ejecutable que hemos dejado en la carpeta backend llamado resetearDB.
    ```bash
      node .\db\initdb.js
     ```
 7. Iniciamos el servidor con el siguiente comando, o con el ejecutable que hemos dejado en la carpeta backend llamado server-backend.
     ```bash
      npm start
     ```
 8. Navegamos hasta la carpeta frontend, en otro terminal, e instalamos las dependencias correspondientes.
    ```bash
      npm install
     ```
 9. Creamos un archivo llamado .env dentro de la carpeta frontend, basandonos en la que hemos dejado llamada template.env para orientar, y completas los campos con tus datos.
 10. Ejecutamos la app,  o con el ejecutable que hemos dejado en la carpeta backend llamado server-fronted.
     ```bash
      npm run dev
     ```
## RUTAS DE LA API

### Usuarios

  -Para crear un usuario nuevo: POST /registro

  -Para iniciar sesion: POST /login
  
  -Para obtener los datos de usuario: GET /perfil

  -Para actualizar los datos del usuario: PUT /perfil

  -Para actualizar los datos del password: PUT /password

  -Para actualizar los datos del Email: PUT /email

  -Para borrar los datos del usuario: DELETE /perfil


### Eventos

-Para ver los detalles del evento: GET /evento/:id

-Para ver todos los eventos filtrados o no filtrados: GET /eventos

-Para crear un evento: POST /evento

-Para actualizar los eventos: PUT /evento/:id

-Para borrar un evento: DELETE /evento/:id

-Para ver todo los eventos de un solo usuario: GET /usuario

-Para ver el evento de ese usuario: GET /usuario/:id


### Inscripciones

-Para ver los eventos que estoy incrito: GET /inscription

-Para inscribirme en un evento: POST /inscription/:id

-Para salirme de un evento: DELETE /inscription/:id


## TOUR POR LA APP

<a href="https://www.canva.com/design/DAF8MzrqnJo/view"> IMAGENES DE LA APP </a>

