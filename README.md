<p align="center">
  <img src="app/icon.svg" width="72" alt="Logotipo de DailySchool" />
</p>

<h1 align="center">DailySchool</h1>

<p align="center"><strong>Lo que siempre necesitaste saber y nadie te enseñó.</strong><br />
Landing page de una escuela de cursos breves, prácticos y presenciales de habilidades para la vida diaria.</p>

<p align="center">
  Proyecto <em>My First Professional Landing Page</em> · React + Next.js + TypeScript · GitHub + Vercel
</p>

---

## 1. El encargo

El cliente quiere lanzar una escuela para adultos que enseñe las tareas cotidianas que casi nadie aprendió: cambiar un enchufe, coser un botón, usar un taladro, cocinar lo básico, entender una factura, colgar una estantería o arreglar una bicicleta.

**El problema:** mucha gente depende de otros (o paga a un profesional) para tareas sencillas, simplemente porque nunca le enseñaron. Los tutoriales de internet existen, pero no dan práctica real ni nadie corrige tus errores.

**El objetivo de la landing:** que el visitante **se inscriba en un curso** o, si aún tiene dudas, **solicite información**.

## 2. Contexto del sector

Las alternativas actuales a las que se enfrenta DailySchool:

| Alternativa | Lo bueno | Lo que le falta |
| --- | --- | --- |
| Tutoriales en vídeo (YouTube, redes) | Gratis e inmediatos | Sin práctica guiada ni corrección; miedo a hacerlo mal (sobre todo con electricidad) |
| Talleres de grandes tiendas de bricolaje | Presenciales | Orientados a vender producto; temática limitada al bricolaje |
| Academias de oficios / FP | Formación completa | Largas y pensadas para profesionales, no para resolver lo del día a día |
| Pedir ayuda o contratar a alguien | Resuelve el problema hoy | No aprendes; vuelves a depender la próxima vez |

**Hueco de mercado:** formación **corta, práctica y presencial**, centrada en la vida cotidiana y no en un oficio, con herramientas reales y alguien al lado.

## 3. Público objetivo

Adultos de **25 a 55 años** que viven de forma independiente (o están a punto) y quieren ganar autonomía en casa.

- **Quien acaba de independizarse:** primer piso, primeras facturas y primeros arreglos. Quiere dejar de llamar a sus padres para todo.
- **Quien siempre lo delegó:** sabe que es "una tontería", pero le da apuro o miedo hacerlo mal. Valora un entorno sin juicios y en grupo reducido.
- **Quien quiere ahorrar:** cansado de pagar por arreglos pequeños; le motiva el ahorro (por ejemplo, revisar la factura de la luz).

Lo que tienen en común: **poco tiempo**, **miedo a equivocarse** y preferencia por **aprender haciendo**.

## 4. Propuesta de valor

> **En una tarde aprendes a hacerlo tú, con herramientas reales y un instructor a tu lado.**

Se apoya en tres pilares que se repiten en toda la página:

- **Breves:** sesiones cortas que caben en tu semana.
- **Prácticos:** aprendes haciendo, con herramientas reales y el material incluido.
- **Presenciales:** grupos reducidos e instructores profesionales.

## 5. Marca e identidad visual

- **Nombre:** *DailySchool, escuela día a día*. Habla de lo cotidiano (*daily*) y de aprender (*school*), y es fácil de recordar.
- **Logotipo:** un tile azul con el **tejado de una casa** y un **sol que sale** bajo él: *un nuevo día en casa*. Funciona desde 16 px (favicon) hasta grande. Está en SVG, en [`components/logo.tsx`](components/logo.tsx) y [`app/icon.svg`](app/icon.svg).
- **Colores:**
  - **Azul** (`blue-600` / `blue-700`): confianza y profesionalidad. Es el color de todas las llamadas a la acción.
  - **Ámbar** (`amber-400`): el sol del logo; se usa para destacar (ofertas, "¡Aprende haciendo!", el plan más elegido).
  - **Neutros** cálidos y mucho blanco, para que protagonicen las fotos.
- **Tipografía:** Inter, legible y neutra, en pesos medios para titulares grandes.
- **Modo oscuro:** completo, con un interruptor en el menú.

## 6. Tono de comunicación

Cercano, directo y sin tecnicismos. **Tuteamos**, quitamos importancia al miedo ("sin conocimientos previos", "empezamos por lo básico") y hablamos de beneficios concretos ("en una tarde cambié mi primer enchufe"). Cada curso incluye una nota de **seguridad** o un **consejo**, para transmitir responsabilidad.

## 7. Arquitectura de información

Hero + **11 secciones**, ordenadas como el recorrido de decisión del visitante: *me engancha → lo entiendo → me fío → elijo → me inscribo*.

| # | Sección | Para qué sirve |
| --- | --- | --- |
| — | **Barra de oferta** + **menú fijo** | 50 % de descuento enlazado a precios; acceso a cursos, precios y contacto; botón "Solicita información" siempre visible |
| **Hero** | Inicio | Titular, propuesta de valor, valoración media y CTA "Ver los cursos", sobre un pase de fotos de los 7 cursos |
| 1 | ¡Solo en DailySchool! | Tres diferenciales: instructores profesionales, herramientas reales, desde cero |
| 2 | Vídeo de presentación | Muestra en 10 segundos cómo es una clase |
| 3 | Cifras | Prueba social: alumnos formados, talleres, valoración |
| 4 | Catálogo de cursos | Mosaico con foto de los 7 cursos; el más pedido, destacado |
| 5 | **Precios** | Tres planes con el descuento aplicado; el pack de 3, destacado. CTA "Inscribirme" |
| 6 | Fichas de los 7 cursos | Qué aprenderás, nota de seguridad y CTA "Inscribirme" en cada una |
| 7 | Panel lateral fijo | "Infórmate gratis ahora": CTA, teléfono y motivos para elegirnos (en móvil, barra inferior fija) |
| 8 | Opiniones | Carrusel de reseñas de alumnos con valoración |
| 9 | Preguntas frecuentes | Resuelve las objeciones típicas (conocimientos previos, herramientas, grupos, inscripción) |
| 10 | Contacto | Quiénes somos, dirección con mapa, horario, teléfono, correo y redes |
| 11 | Pie de página | Enlaces, datos de contacto y la firma del CEO y fundador |

## 8. Conversión

- **Acción principal: inscribirse.** Botón "Inscribirme" en cada ficha de curso y en cada plan de precios. Abre un formulario con nombre, correo, teléfono, horario preferido y consentimiento, con validación en el servidor (Server Action en [`app/actions.ts`](app/actions.ts)).
- **Acción secundaria: solicitar información.** En el menú, el panel lateral y la barra inferior de móvil. Usa el mismo formulario en su versión "información".
- **Refuerzos:** la oferta de lanzamiento (50 %), la valoración media en el hero, las cifras, las opiniones y las preguntas frecuentes, colocadas justo antes de los puntos de decisión.

## 9. Dirección de arte y recursos

- **Fotografía:** 7 fotos de estilo coherente (luz natural y cálida, personas sonriendo mientras lo hacen ellas mismas) para transmitir *"tú también puedes"*.
- **Vídeo:** clip de presentación que se reproduce en silencio al entrar en pantalla y se pausa al salir. Tiene botones de pausa y de sonido.
- **Movimiento:** entradas suaves al hacer scroll y un pase de fotos con zoom lento en el hero. Todo se desactiva si el usuario prefiere **reducir el movimiento**.
- **Imagen para redes:** tarjeta propia de 1200×630 para cuando se comparte el enlace ([`app/opengraph-image.png`](app/opengraph-image.png)).

## 10. Responsive y accesibilidad

- Diseño *mobile-first*, revisado de **320 px a 1440 px** sin scroll horizontal. Todo el contenido se alinea con el menú.
- En móvil, la barra inferior fija mantiene la llamada a la acción siempre a mano; en escritorio lo hace el panel lateral.
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`), `lang="es"`, textos alternativos en todas las imágenes, etiquetas accesibles en los botones de icono, foco visible y preguntas frecuentes con `<details>` nativo (funcionan sin JavaScript).
- Metadatos para buscadores y redes: título, descripción, favicon, icono de iPhone y Open Graph.

## 11. Stack y estructura

**Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS 4** · componentes base de **shadcn/ui** · iconos **lucide-react** · scroll suave con **Lenis** · modo oscuro con **next-themes**.

```
app/
  layout.tsx            Fuentes, metadatos y tema
  page.tsx              La landing completa (datos + secciones)
  actions.ts            Server Action del formulario
  icon.svg              Favicon (logotipo)
  apple-icon.png        Icono de iPhone
  opengraph-image.png   Imagen para redes sociales
components/
  logo.tsx              Logotipo (símbolo + nombre)
  hero-slideshow.tsx    Pase de fotos del hero
  promo-video.tsx       Vídeo de presentación
  enroll-dialog.tsx     Formulario de inscripción / información
  reveal.tsx            Animación de entrada al hacer scroll
  …
public/
  fotos/                Fotos de los cursos (y ceo.jpg, la foto del CEO)
  video/                Vídeo de presentación y su imagen de portada
```

## 12. Cómo ejecutarlo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compilación de producción
npm run lint       # revisión de código
```

## 13. Despliegue

El repositorio se sube a **GitHub** y se publica en **Vercel** importando el repositorio (Vercel detecta Next.js automáticamente; no hace falta configuración). Cada `git push` a `main` publica una versión nueva.

## 14. Pendiente antes de un lanzamiento real

Al ser un cliente ficticio, algunos contenidos son de ejemplo:

- **Formulario:** valida los datos, pero aún no los guarda ni los envía; solo se registran en el servidor. Para producción habría que conectarlo a un servicio de correo (p. ej. Resend) o a una hoja de cálculo.
- **Datos de contacto** (`hola@example.com`, `+34 600 000 000`), **opiniones** y **cifras**: son ilustrativos.
- **Foto del CEO:** añadir `public/fotos/ceo.jpg` (mientras no exista se muestran las iniciales).
- **Vídeo:** entre los segundos 2 y 4,5 aparece un texto sobreimpreso con errores ortográficos; conviene volver a exportarlo.

---

Proyecto realizado por **Jacob Meléndez**.
