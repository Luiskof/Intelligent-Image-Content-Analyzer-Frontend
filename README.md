# Analizador de Contenido de Imágenes

Este es un proyecto de frontend que proporciona una interfaz de usuario para analizar el contenido de las imágenes. Los usuarios pueden cargar una imagen, y la aplicación la enviará a un servicio de backend para su análisis, mostrando luego los resultados.

## Tecnologías Utilizadas

- **React:** Una biblioteca de JavaScript para construir interfaces de usuario.
- **JavaScript (ES6+):** El lenguaje de programación principal utilizado.
- **CSS:** Para el estilo de los componentes de la aplicación.
- **Fetch API:** Para realizar solicitudes al servicio de backend.

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)

### Pasos

1.  **Clona el repositorio:**

    ```bash
    git clone https://URL-DEL-REPOSITORIO/nombre-del-repositorio.git
    cd nombre-del-repositorio
    ```

2.  **Instala las dependencias:**

    Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias necesarias.

    ```bash
    npm install
    ```

3.  **Configura la URL del Backend:**

    El frontend necesita saber la URL del servidor de backend. Abre el archivo `src/apiConfig.js` y asegúrate de que la constante `API_URL` apunte al lugar correcto donde se está ejecutando tu backend.

    ```javascript
    export const API_URL = "http://localhost:5050"; // Ajusta si es necesario
    ```

4.  **Ejecuta el proyecto:**

    Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo de React.

    ```bash
    npm start
    ```

    Esto abrirá la aplicación en tu navegador web predeterminado en `http://localhost:3000`.

### Scripts Disponibles

En el `package.json`, encontrarás otros scripts útiles:

-   `npm run build`: Compila la aplicación para producción en la carpeta `build`.
-   `npm test`: Ejecuta las pruebas de la aplicación.
-   `npm run eject`: Expulsa la configuración de Create React App (acción irreversible).
