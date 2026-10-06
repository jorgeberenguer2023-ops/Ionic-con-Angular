# Actividad guiada: Ionic y consumo de API REST

## Aplicación

La aplicación consulta `https://dummyjson.com/products` y muestra los resultados
en tarjetas con nombre, categoría, marca, descripción, precio, valoración e
inventario. La página `/productos` carga 12 productos por petición y permite
navegar por las páginas de resultados. La página `/inicio` enlaza al catálogo.

El proyecto utiliza `AppModule` y no `app.config.ts`. `AppModule` registra
Ionic, el router y `HttpClientModule`, y declara el componente raíz y las dos
páginas de la aplicación. El modelo está en
`src/app/models/product.model.ts`; el nombre ya cumple el formato solicitado.

## Resolución de problemas

### Los componentes de Ionic no se reconocían al pasar a AppModule

Al compilar aparecieron errores `NG8001` indicando que `ion-app` y
`ion-router-outlet` no eran elementos conocidos. En Ionic 9, los componentes
Ionic para aplicaciones basadas en módulos se exportan desde
`@ionic/angular/lazy`. Se importó `IonicModule` desde esa entrada y se añadió
`IonicModule.forRoot()` a `AppModule`. Las páginas declaradas en el módulo usan
`standalone: false`.

### Las pruebas suponían que las páginas seguían siendo standalone

Tras cambiar el arranque de `bootstrapApplication` a `bootstrapModule`, una
prueba intentaba declarar una página standalone en un módulo de pruebas. Angular
rechaza esa combinación. Se actualizó la prueba para importar la página en
`imports` y la prueba del componente raíz para configurar el `AppModule`.

### La tabla había desaparecido de la vista Productos

La plantilla solo conservaba el título y el bloque de error. Se repuso el
contenido de listado y se comprobó que la API entrega `products` y `total`.
Después, la tabla se sustituyó por tarjetas y se añadieron controles de
paginación que consultan la API usando `limit` y `skip`.

### Gradle no encontraba Android SDK ni Java 21

El primer build nativo indicó que faltaba la ruta del SDK. Se configuraron
`ANDROID_HOME` y `ANDROID_SDK_ROOT` con la carpeta `Android\Sdk`. El siguiente
build indicó `invalid source release: 21`: el `javac` activo era Java 17 y el
proyecto Android de Capacitor requiere Java 21. Se instaló JDK 21 y se configuró
`JAVA_HOME` para compilar.

Comandos usados en PowerShell:

```powershell
$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot'
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
npm run build
npx cap sync android
Push-Location android
.\gradlew.bat assembleDebug
Pop-Location
```

## Por qué la plantilla usa signals

El estado de Productos (`products`, `loading`, `error`, `total` y página actual)
está declarado como signals. Se leen en la plantilla invocándolos, por ejemplo
`products()` y `loading()`, y se actualizan con `.set(...)`. La plantilla debe
leer el signal para que Angular registre la dependencia y vuelva a renderizar
las tarjetas cuando llega la respuesta HTTP. A diferencia de una variable
normal, un signal notifica a Angular de sus cambios; no hace falta invocar
manualmente `detectChanges()`.

## Diferencia entre page y component

Un **component** es una pieza reutilizable de interfaz, como una tarjeta de
producto, un encabezado o un botón compuesto. Una **page** es una pantalla
completa asociada normalmente a una ruta del router. En Ionic, una page también
es un componente Angular; “page” describe su papel de pantalla, no un tipo
distinto de clase. En esta entrega, Inicio y Productos son páginas declaradas en
`AppModule`.

## Capturas y publicación

Las capturas se han realizado en el emulador Pixel 9 y están en `docs/capturas/`:

- [Inicio](capturas/pixel-9-inicio.png)
- [Catálogo de productos](capturas/pixel-9-productos.png)
- [Modo oscuro](capturas/pixel-9-modo-oscuro.png)
- [Paginación](capturas/pixel-9-paginacion.png)

Antes de entregar el PDF final hay que añadir el nombre del alumno y los enlaces
reales del repositorio y del despliegue:

- PDF solicitado: `Actividad06-10-2026_tunombre.pdf`
- GitHub: pendiente de configurar el remoto del repositorio.
- Vercel: pendiente de importar el repositorio y desplegar la rama `main`.

Flujo previsto: trabajar y revisar en `desarrollo`; una vez aprobada la entrega,
integrar en `main` y configurar Vercel para publicar desde `main`.
