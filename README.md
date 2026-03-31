INTEGRANTES:
Juan Sebastián Ospina Sanchez
Juan Alejandro Foronda Guerrero
Jostin David Acevedo Vargas

Descrpcion del proyecto:

Movie Explorer es una aplicación web que permite buscar, explorar y ver información de series usando una API externa.
Incluye funciones como paginación, filtros por género y almacenamiento de favoritos, aplicando conceptos clave de desarrollo web como consumo de APIs.
Manipulación del DOM y uso de almacenamiento local.


Funcionalidades Implementadas:

Consumo de la API pública de TVMaze mediante fetch para la obtención de datos de series.
Implementación de búsqueda dinámica utilizando el endpoint /search/shows.
Renderizado de resultados en el DOM mediante componentes dinámicos (cards).
Sistema de paginación en el cliente con control de estado (página actual y límite de elementos).
Gestión de estado global para resultados, filtros y navegación (state.js).
Filtrado de contenido por género aplicado en el cliente.
Página de detalle con obtención de datos por ID (/shows/{id}).
Implementación de almacenamiento persistente usando localStorage para favoritos.
Prevención de duplicados en la lista de favoritos.
Arquitectura modular basada en separación de responsabilidades:
service: consumo de API
ui: renderizado
features: lógica específica (search, filters, favorites)
storage: persistencia
Manipulación del DOM para actualización reactiva de la interfaz.
Navegación multipágina mediante parámetros en la URL.
Uso de control de versiones con Git y flujo de trabajo basado en ramas (feature-based workflow).


Instruciones para la ejecución del proyecto:

Requisitos previos.

Navegador web actualizado (Google Chrome, Edge, Firefox)
Editor de código (recomendado: Visual Studio Code)
Extensión Live Server (opcional pero recomendada)
 1. Clonar el repositorio
Bash
git clone <URL_DEL_REPOSITORIO>
cd movie-explorer
 2. Abrir el proyecto
Abre la carpeta en Visual Studio Code
Verifica que la estructura del proyecto esté completa
 3. Ejecutar la aplicación
 Opción A (recomendada)
Instala la extensión Live Server
Click derecho en index.html
Selecciona "Open with Live Server"
Opción B (sin extensiones)
Abre el archivo index.html directamente en el navegador
(Puede haber limitaciones con módulos ES6 dependiendo del navegador)
4. Uso de la aplicación
Buscar series desde el campo de búsqueda
Navegar entre páginas con la paginación
Filtrar por género
Ver detalles de una serie
Agregar o eliminar favoritos
Consultar historial de búsquedas
 5. Persistencia de datos
Los datos se almacenan en localStorage del navegador:
Favoritos
Historial de búsquedas
Configuración de paginación
Notas importantes
Se requiere conexión a internet para consumir la API de TVMaze
No se necesita backend (proyecto 100% frontend).