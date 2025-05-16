# Uso de la plantilla

Esta plantilla te permite arrancar rápido un nuevo proyecto con Webpack, Babel y Jest configurados.

---

## Crear un nuevo proyecto desde la plantilla

Clona la plantilla sin historial con `degit` y entra en la carpeta:

```bash


npx degit SunAndBoats/template mi-nuevo-proyecto
cd mi-nuevo-proyecto
npm install
```

## Modificar name en package json

Abre el archivo package.json y reemplaza el valor de "name" por el nombre de tu nuevo proyecto, por ejemplo:

```
{
  "name": "mi-nuevo-proyecto",
}
```

## Cambia el titulo en el html

Cambia el título de la página en src/template.html para que coincida con tu proyecto.

```
<title>mi-nuevo-proyecto</title>
```

## Inicializa Git y haz el primer commit

[Ir a Inicializa Git y haz el primer commit](#inicializa-git-y-haz-el-primer-commit)

```
git init
git add .
git commit -m "Primer commit desde plantilla"
git branch -M main
git remote add origin https://github.com/SunAndBoats/mi-nuevo-proyecto.git
git push -u origin main
```

## Comandos disponibles

```
npm run dev — Inicia el servidor de desarrollo con hot reload.

npm run build — Compila y transpila el código para producción en la carpeta /dist.

npm run test — Ejecuta los tests configurados con Jest.
```
