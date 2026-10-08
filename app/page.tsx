import Image from "next/image"

import { CoursesMenu } from "@/components/courses-menu"
import { EnrollDialog } from "@/components/enroll-dialog"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { Reveal } from "@/components/reveal"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowDown,
  Bike,
  ChevronDown,
  CircleCheck,
  Clock,
  CookingPot,
  Drill,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plug,
  Receipt,
  Ruler,
  Scissors,
  ShieldAlert,
  Star,
  Users,
  Wrench,
  Zap,
} from "lucide-react"

const courses = [
  { id: "enchufe", label: "Cambiar un enchufe", short: "Enchufe", icon: Plug },
  { id: "boton", label: "Coser un botón", short: "Botón", icon: Scissors },
  { id: "taladro", label: "Usar un taladro", short: "Taladro", icon: Drill },
  {
    id: "cocina",
    label: "Cocinar cinco platos básicos",
    short: "Cocina",
    icon: CookingPot,
  },
  {
    id: "factura",
    label: "Entender una factura",
    short: "Factura",
    icon: Receipt,
  },
  {
    id: "estanteria",
    label: "Colgar una estantería",
    short: "Estantería",
    icon: Ruler,
  },
  {
    id: "bicicleta",
    label: "Arreglar una bicicleta",
    short: "Bicicleta",
    icon: Bike,
  },
]

type Course = (typeof courses)[number]

type CourseDetails = {
  intro: React.ReactNode
  lessons: { title: string; text: string }[]
  note: { kind: "safety" | "tip"; title: string; text: string }
}

const courseDetails: Record<Course["id"], CourseDetails> = {
  enchufe: {
    intro: (
      <>
        Aprenderás a <strong>sustituir un enchufe de principio a fin</strong>,
        de forma <strong>segura</strong> y con las{" "}
        <strong>herramientas adecuadas</strong>. Sin conocimientos previos:
        practicarás sobre paneles reales con un instructor a tu lado.
      </>
    ),
    lessons: [
      {
        title: "Cortar la corriente",
        text: "desde el cuadro eléctrico y comprobar con un buscapolos que no hay tensión.",
      },
      {
        title: "Identificar los cables:",
        text: "fase (marrón, negro o gris), neutro (azul) y tierra (amarillo y verde).",
      },
      {
        title: "Desmontar el enchufe viejo",
        text: "sin dañar la pared ni la caja de empotrar.",
      },
      {
        title: "Conectar el enchufe nuevo",
        text: "en el orden correcto y apretar bien cada borne.",
      },
      {
        title: "Elegir el enchufe adecuado",
        text: "para cada uso: con toma de tierra, para exterior o con USB.",
      },
      {
        title: "Comprobar que funciona",
        text: "antes de volver a montar la tapa y dar la corriente.",
      },
    ],
    note: {
      kind: "safety",
      title: "Sabrás cuándo parar:",
      text: "también aprenderás a reconocer las señales (cables quemados, instalaciones antiguas, saltos del diferencial) en las que hay que llamar a un electricista.",
    },
  },
  boton: {
    intro: (
      <>
        Aprenderás a <strong>coser botones que no se vuelvan a caer</strong> y a
        hacer <strong>pequeños arreglos a mano</strong>. Solo necesitas{" "}
        <strong>aguja e hilo</strong>: no hace falta máquina de coser ni
        experiencia.
      </>
    ),
    lessons: [
      {
        title: "Enhebrar la aguja y hacer el nudo",
        text: "sin perder la paciencia.",
      },
      {
        title: "Coser botones de dos y cuatro agujeros",
        text: "con puntadas firmes y limpias.",
      },
      {
        title: "Hacer el «cuello» de hilo",
        text: "bajo el botón para que abroche sin tirar de la tela.",
      },
      {
        title: "Coser botones de presión y corchetes",
        text: "en camisas, chaquetas y faldas.",
      },
      {
        title: "Rematar el hilo",
        text: "para que la costura no se deshaga con los lavados.",
      },
      {
        title: "Arreglar un dobladillo descosido",
        text: "con una puntada que no se ve por fuera.",
      },
    ],
    note: {
      kind: "tip",
      title: "Ideal para empezar:",
      text: "si nunca has cogido una aguja, este es el curso perfecto para estrenarte.",
    },
  },
  taladro: {
    intro: (
      <>
        Aprenderás a <strong>usar un taladro con seguridad y precisión</strong>{" "}
        para colgar cuadros, espejos o barras de cortina{" "}
        <strong>sin destrozar la pared</strong>.
      </>
    ),
    lessons: [
      {
        title: "Conocer el taladro:",
        text: "modo percutor, velocidad, sentido de giro y embrague.",
      },
      {
        title: "Elegir la broca correcta",
        text: "para madera, metal, ladrillo u hormigón.",
      },
      {
        title: "Medir y marcar",
        text: "para que los agujeros queden a nivel y en su sitio.",
      },
      {
        title: "Taladrar sin astillar",
        text: "azulejos ni desconchar la pared.",
      },
      {
        title: "Elegir el taco y el tornillo",
        text: "según el peso y el tipo de pared.",
      },
      {
        title: "Cuidar brocas y batería",
        text: "para que tu taladro dure años.",
      },
    ],
    note: {
      kind: "safety",
      title: "Sabrás dónde no taladrar:",
      text: "aprenderás a localizar cables y tuberías antes de perforar y a protegerte los ojos y las manos.",
    },
  },
  cocina: {
    intro: (
      <>
        Aprenderás a cocinar{" "}
        <strong>cinco platos básicos, sanos y económicos</strong> que podrás
        repetir toda la semana, y las <strong>técnicas</strong> que te servirán
        para cientos de recetas más.
      </>
    ),
    lessons: [
      {
        title: "Los cinco platos:",
        text: "tortilla de patatas, arroz blanco, pasta con salsa casera, crema de verduras y lentejas.",
      },
      {
        title: "Usar el cuchillo",
        text: "con seguridad y cortar verduras con rapidez.",
      },
      {
        title: "Controlar el fuego y los tiempos",
        text: "para que nada se pase ni quede crudo.",
      },
      {
        title: "Sazonar con criterio:",
        text: "sal, especias y un toque de ácido.",
      },
      {
        title: "Planificar el menú semanal",
        text: "y hacer una lista de la compra útil.",
      },
      { title: "Conservar y aprovechar", text: "las sobras sin riesgos." },
    ],
    note: {
      kind: "safety",
      title: "Cocina segura:",
      text: "aprenderás a evitar cortes y quemaduras y a manipular los alimentos con higiene.",
    },
  },
  factura: {
    intro: (
      <>
        Aprenderás a{" "}
        <strong>leer tus facturas de luz, gas, agua y teléfono</strong> línea a
        línea, a <strong>saber exactamente qué pagas</strong> y a detectar{" "}
        <strong>dónde puedes ahorrar</strong>.
      </>
    ),
    lessons: [
      {
        title: "Identificar cada apartado:",
        text: "periodo, consumo, potencia, impuestos y alquiler de equipos.",
      },
      {
        title: "Distinguir término fijo y variable",
        text: "y saber cuál depende de ti.",
      },
      {
        title: "Comparar tarifas",
        text: "y saber si te conviene el mercado regulado o el libre.",
      },
      {
        title: "Detectar errores y cobros extra",
        text: "por servicios que no has contratado.",
      },
      {
        title: "Leer el contador",
        text: "y comprobar que el consumo facturado es real.",
      },
      {
        title: "Reclamar o cambiar de compañía",
        text: "paso a paso y sin cortes de suministro.",
      },
    ],
    note: {
      kind: "tip",
      title: "Ahorro real:",
      text: "sabrás detectar si pagas una potencia o una tarifa que no necesitas.",
    },
  },
  estanteria: {
    intro: (
      <>
        Aprenderás a{" "}
        <strong>colgar estanterías rectas, firmes y seguras</strong>, eligiendo
        la <strong>fijación adecuada</strong> para el peso que van a soportar y
        el tipo de pared.
      </>
    ),
    lessons: [
      {
        title: "Identificar el tipo de pared:",
        text: "ladrillo, hormigón o pladur.",
      },
      {
        title: "Elegir tacos, tornillos y escuadras",
        text: "según el peso que vas a colgar.",
      },
      {
        title: "Usar el nivel y la cinta métrica",
        text: "para que quede perfectamente recta.",
      },
      { title: "Marcar y taladrar", text: "en el punto exacto, a la primera." },
      {
        title: "Montar estanterías flotantes",
        text: "y con escuadras vistas.",
      },
      {
        title: "Repartir la carga",
        text: "para que no se combe con el tiempo.",
      },
    ],
    note: {
      kind: "safety",
      title: "Sabrás qué aguanta tu pared:",
      text: "el pladur y el ladrillo hueco necesitan fijaciones especiales para no ceder con el peso.",
    },
  },
  bicicleta: {
    intro: (
      <>
        Aprenderás a <strong>mantener tu bicicleta a punto</strong> y a{" "}
        <strong>resolver las averías más comunes</strong> sin depender del
        taller.
      </>
    ),
    lessons: [
      {
        title: "Reparar un pinchazo:",
        text: "desmontar la rueda, encontrar el agujero y poner el parche.",
      },
      { title: "Ajustar los frenos", text: "de zapata y de disco." },
      {
        title: "Limpiar y engrasar la cadena",
        text: "para que dure más y no haga ruido.",
      },
      {
        title: "Regular el cambio",
        text: "para que las marchas entren suaves.",
      },
      { title: "Ajustar sillín y manillar", text: "a tu altura y postura." },
      {
        title: "Revisar la presión y los tornillos",
        text: "antes de cada salida.",
      },
    ],
    note: {
      kind: "safety",
      title: "Seguridad al rodar:",
      text: "aprenderás una revisión rápida de frenos, ruedas y luces para salir siempre tranquilo.",
    },
  },
}

const pillars = [
  {
    title: "Breves",
    description: "Sesiones cortas que caben en tu semana.",
    icon: Clock,
  },
  {
    title: "Prácticos",
    description: "Aprendes haciendo, con herramientas reales.",
    icon: Wrench,
  },
  {
    title: "Presenciales",
    description: "Grupos reducidos y un instructor a tu lado.",
    icon: Users,
  },
]

const averageRating = 4.8

const stats = [
  { value: "1.200+", label: "Alumnos formados" },
  { value: "7", label: "Cursos prácticos" },
  { value: "150+", label: "Talleres impartidos" },
  {
    value: `${averageRating.toLocaleString("es-ES")}/5`,
    label: "Valoración media",
  },
]

// Opiniones de ejemplo: sustituir por opiniones reales de alumnos antes de publicar.
// Para añadir una foto, guárdala en public/fotos y pon su ruta en `photo` (p. ej. "/fotos/marta.jpg").
const reviews: {
  name: string
  courseId: Course["id"]
  rating: number
  text: string
  photo?: string
}[] = [
  {
    name: "Marta G.",
    courseId: "enchufe",
    rating: 5,
    text: "Llevaba años llamando a alguien para estas cosas. En una tarde cambié mi primer enchufe y ya he cambiado tres en casa.",
  },
  {
    name: "Sofía M.",
    courseId: "boton",
    rating: 5,
    text: "Parece una tontería hasta que se te cae un botón antes de una entrevista. Clase corta, práctica y muy amena.",
  },
  {
    name: "Andrés P.",
    courseId: "taladro",
    rating: 5,
    text: "Me daba miedo hasta encenderlo. Ahora sé elegir la broca y colgar cuadros sin destrozar la pared.",
  },
  {
    name: "Lucía F.",
    courseId: "cocina",
    rating: 4,
    text: "Recetas sencillas y muy bien explicadas. Me habría gustado una sesión más, pero ya cocino toda la semana.",
  },
  {
    name: "Daniel R.",
    courseId: "factura",
    rating: 5,
    text: "Descubrí que pagaba una potencia que no necesitaba. Ahora reviso cada factura y sé qué estoy pagando.",
  },
  {
    name: "Javier L.",
    courseId: "estanteria",
    rating: 5,
    text: "Aprendí a usar el nivel y a elegir los tacos adecuados. La estantería lleva meses cargada de libros sin moverse.",
  },
  {
    name: "Elena T.",
    courseId: "bicicleta",
    rating: 4,
    text: "Ya sé reparar un pinchazo y ajustar los frenos. El grupo era pequeño y el instructor resolvió todas mis dudas.",
  },
]

// Datos de contacto de ejemplo: sustituir por los reales antes de publicar.
const contact = {
  name: "DailySchool · Escuela día a día",
  about:
    "Somos un centro de formación práctica para adultos. Enseñamos en grupos reducidos las habilidades del día a día que nadie nos explicó, con instructores profesionales y herramientas reales.",
  address: "Puerta del Sol, Madrid",
  phone: "+34 600 000 000",
  email: "hola@example.com",
  hours: ["Lunes a viernes: 10:00–14:00 y 17:00–21:00", "Sábados: 10:00–14:00"],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: "instagram",
    },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
    { label: "WhatsApp", href: "https://wa.me/34600000000", icon: "whatsapp" },
  ],
} as const

const mapQuery = encodeURIComponent(contact.address)

function SocialIcon({
  name,
}: {
  name: (typeof contact.socials)[number]["icon"]
}) {
  if (name === "whatsapp") return <MessageCircle aria-hidden />
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {name === "instagram" && (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </>
      )}
      {name === "facebook" && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      )}
      {name === "youtube" && (
        <>
          <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </>
      )}
    </svg>
  )
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  const filled = Math.round(rating)
  return (
    <div
      className={cn("flex gap-0.5", className)}
      role="img"
      aria-label={`${rating.toLocaleString("es-ES")} de 5 estrellas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < filled
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/40"
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function CourseCard({
  course,
  className,
}: {
  course: Course
  className?: string
}) {
  const { intro, lessons, note } = courseDetails[course.id]
  const NoteIcon = note.kind === "safety" ? ShieldAlert : Lightbulb
  const headingClass = "text-foreground"

  return (
    <div
      className={cn(
        "max-w-3xl rounded-2xl border bg-card p-6 text-muted-foreground shadow-xl ring-1 shadow-black/5 ring-black/5 sm:p-8 dark:ring-white/5",
        className
      )}
    >
      <h3 className={cn("text-xl font-semibold", headingClass)}>
        ¿De qué trata el curso?
      </h3>
      <p className="mt-2 text-pretty [&_strong]:text-foreground">{intro}</p>

      <h4 className={cn("mt-6 font-semibold", headingClass)}>Qué aprenderás</h4>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <li key={lesson.title} className="flex gap-2.5 text-sm">
            <CircleCheck
              className="mt-0.5 size-4 shrink-0 text-blue-600"
              aria-hidden
            />
            <span>
              <strong className={headingClass}>{lesson.title}</strong>{" "}
              {lesson.text}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 flex gap-2.5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-900">
        <NoteIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <strong>{note.title}</strong> {note.text}
        </span>
      </p>

      <div className="mt-6">
        <EnrollDialog course={course.label} />
      </div>
    </div>
  )
}

function CourseHeading({
  course,
  className,
}: {
  course: Course
  className?: string
}) {
  const Icon = course.icon
  return (
    <h2
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/50 px-5 py-2.5 text-lg font-semibold text-foreground shadow-lg ring-1 shadow-black/5 ring-black/5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:ring-white/5",
        className
      )}
    >
      <Icon className="size-5" aria-hidden />
      {course.label}
    </h2>
  )
}

// Panel lateral de contacto rápido: a la derecha y fijo al hacer scroll en pantallas grandes,
// al final de la página en móvil y tablet.
function InfoPanel() {
  return (
    <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-xl ring-1 shadow-black/5 ring-black/5">
      <h2 className="text-3xl font-medium tracking-tight text-balance">
        Infórmate gratis ahora
      </h2>
      <p className="mt-4 flex items-center gap-2.5 text-sm">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Zap className="size-4" aria-hidden />
        </span>
        Grupos reducidos y un instructor a tu lado
      </p>

      <div className="mt-6 grid gap-2.5">
        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent("Información sobre los cursos")}`}
          className="flex h-12 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-blue-700"
        >
          Solicita información
        </a>
        <a
          href={`#${courses[0].id}`}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-blue-600 text-sm font-semibold tracking-wide text-blue-700 uppercase transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950"
        >
          Ver los cursos
          <ArrowDown className="size-4" aria-hidden />
        </a>
      </div>

      <a
        href={`tel:${contact.phone.replace(/\s/g, "")}`}
        className="mt-5 inline-flex items-center gap-2.5 text-lg font-bold text-blue-700 hover:underline dark:text-blue-300"
      >
        <Phone className="size-5" aria-hidden />
        {contact.phone}
      </a>

      <h3 className="mt-8 text-2xl font-medium tracking-tight">
        Elige DailySchool
      </h3>
      <ul className="mt-4 grid gap-3 text-muted-foreground">
        {[
          "Cursos breves, prácticos y presenciales",
          `${stats[0].value} alumnos formados`,
          `${averageRating.toLocaleString("es-ES")}/5 de valoración media`,
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <CircleCheck
              className="mt-0.5 size-5 shrink-0 text-blue-600"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Page() {
  return (
    // Empieza en modo claro; el botón luna (ThemeToggle) cambia a oscuro.
    <div className="min-h-svh bg-background text-foreground">
      {/* Franja de promoción fija arriba (h-9). El menú va justo debajo (top-13 = 36 px + 16 px). */}
      <p className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-green-600 px-4 text-sm font-semibold text-white">
        50% de descuento
      </p>

      <header className="fixed inset-x-0 top-13 z-50 px-4">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/30 bg-white/40 py-2 pr-3 pl-6 shadow-lg ring-1 shadow-black/5 ring-black/5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30 dark:ring-white/5">
          <a href="#inicio" className="font-semibold">
            DailySchool
          </a>
          <div className="flex items-center gap-1">
            <CoursesMenu>
              <ul className="grid gap-0.5">
                {courses.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    >
                      <Icon
                        className="size-4 shrink-0 text-blue-500"
                        aria-hidden
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </CoursesMenu>
            <a
              href="#contacto"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sobre nosotros
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* overflow-x-clip: los elementos que entran desde los lados no generan scroll horizontal.
          (clip, a diferencia de hidden, no rompe el position: sticky del panel lateral.) */}
      <main className="overflow-x-clip">
        {/* 1. Inicio */}
        <section
          id="inicio"
          className="scroll-mt-32 overflow-hidden px-6 pt-36 pb-20 sm:pt-40 sm:pb-24"
        >
          {/* Portada: foto a todo el ancho con un recuadro azul encima, a la izquierda. */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative flex min-h-[34rem] items-end overflow-hidden rounded-3xl p-4 sm:min-h-[38rem] sm:items-center sm:p-10">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e"
                alt="Persona con casco revisando una instalación eléctrica en la pared"
                fill
                priority
                sizes="(min-width: 1280px) 70vw, 100vw"
                className="object-cover object-[75%_center]"
              />
              <Reveal
                from="left"
                className="relative max-w-xl bg-blue-700 p-6 text-white shadow-2xl sm:p-9"
              >
                <p className="text-xs font-medium tracking-widest text-white/75 uppercase">
                  Habilidades funcionales
                </p>
                <h1 className="mt-3 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
                  Lo que siempre necesitaste saber y nadie te enseñó
                </h1>
                <p className="mt-4 text-lg font-semibold sm:text-xl">
                  Cursos breves, prácticos y presenciales
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <Stars
                    rating={averageRating}
                    className="[&_svg]:size-5 [&_svg]:fill-amber-400 [&_svg]:text-amber-400"
                  />
                  <span className="font-medium">
                    {averageRating.toLocaleString("es-ES")} de valoración media
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a
                    href={`#${courses[0].id}`}
                    className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold tracking-wide text-blue-800 uppercase transition-colors hover:bg-blue-50"
                  >
                    Ver los cursos
                  </a>
                  <p className="flex items-center gap-2.5 font-semibold">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-blue-900">
                      <Zap className="size-4" aria-hidden />
                    </span>
                    {stats[0].value} alumnos formados
                  </p>
                </div>
              </Reveal>
            </div>
            {/* Etiqueta en la esquina inferior derecha de la foto. */}
            <p className="absolute right-4 -bottom-5 flex items-center gap-2 bg-amber-400 px-4 py-2.5 text-sm font-semibold text-blue-900 shadow-lg sm:right-8">
              <Zap className="size-4" aria-hidden />
              ¡Aprende haciendo!
            </p>
          </div>

          {/* Contenido centrado: se reparte entre entradas por la izquierda y por la derecha. */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <Reveal from="right" delay={150}>
              <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
                Cambiar un enchufe, coser un botón o entender una factura. Son
                cosas que cualquier persona debería saber hacer, pero que casi
                nadie aprendió. Te las enseñamos en cursos breves, prácticos y
                presenciales.
              </p>
            </Reveal>

            <ul className="mt-10 flex flex-wrap justify-center gap-2">
              {courses.map(({ id, label, icon: Icon }, index) => (
                <Reveal
                  as="li"
                  key={id}
                  from={index < courses.length / 2 ? "left" : "right"}
                  delay={250 + index * 60}
                >
                  <a
                    href={`#${id}`}
                    className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                  >
                    <Icon
                      className="size-4 text-muted-foreground"
                      aria-hidden
                    />
                    {label}
                  </a>
                </Reveal>
              ))}
            </ul>

            {/* En móvil van apiladas (entran desde abajo); en 3 columnas, cada una desde su lado. */}
            <dl className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-3">
              {pillars.map(({ title, description, icon: Icon }, index) => (
                <Reveal
                  key={title}
                  from="up"
                  delay={index * 120}
                  className={cn(
                    "flex flex-col items-center",
                    index === 0 && "sm:[--reveal-x:-4rem] sm:[--reveal-y:0]",
                    index === pillars.length - 1 &&
                      "sm:[--reveal-x:4rem] sm:[--reveal-y:0]"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  <dt className="mt-2 font-medium">{title}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Reveal from="up" delay={200}>
              <a
                href={`#${courses[0].id}`}
                className="group mt-14 inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <span>
                  ¿Te interesa? Sigue bajando y aprende todo lo que siempre
                  necesitaste.
                </span>
                <ChevronDown className="size-5 animate-bounce" aria-hidden />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Cifras */}
        <div className="px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-2xl border bg-card p-4 text-card-foreground shadow-lg shadow-black/5 sm:p-6">
            <div className="mx-auto max-w-2xl px-2 pt-4 pb-8 text-center">
              <Reveal from="left">
                <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                  Personas que ya lo resuelven por sí mismas
                </h2>
              </Reveal>
              <Reveal from="right" delay={150}>
                <p className="mt-3 text-pretty text-muted-foreground">
                  Cada semana, nuevas personas aprenden con nosotros a hacer lo
                  que antes tenían que pedirle a otro. Estas son nuestras cifras
                  hasta hoy.
                </p>
              </Reveal>
            </div>
            {/* 2 columnas en móvil (izquierda/derecha alternas); 4 en escritorio (dos y dos). */}
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  from={index % 2 === 0 ? "left" : "right"}
                  delay={index * 100}
                  className={cn(
                    "flex flex-col-reverse items-center justify-center rounded-xl bg-blue-600 px-4 py-7 text-center text-white",
                    index < stats.length / 2
                      ? "lg:[--reveal-x:-4rem]"
                      : "lg:[--reveal-x:4rem]"
                  )}
                >
                  <dt className="mt-1 text-xs font-medium tracking-wide uppercase opacity-90 sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                    {stat.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Desde el primer curso hasta el final: contenido a la izquierda y, en pantallas
              grandes, el panel de información a la derecha, fijo al hacer scroll. */}
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0">
            {/* 2–8. Cursos: alternan izquierda y derecha. */}
            {courses.map((course, index) => {
              const right = index % 2 === 1
              return (
                <section
                  key={course.id}
                  id={course.id}
                  className="scroll-mt-32 px-6 py-20"
                >
                  <div
                    className={cn(
                      "mx-auto flex max-w-6xl flex-col items-start gap-8",
                      right && "items-end"
                    )}
                  >
                    <Reveal from={right ? "right" : "left"}>
                      <CourseHeading course={course} />
                    </Reveal>
                    <Reveal
                      from={right ? "right" : "left"}
                      delay={150}
                      className="w-full max-w-3xl"
                    >
                      <CourseCard course={course} className="w-full" />
                    </Reveal>
                  </div>
                </section>
              )
            })}

            {/* Opiniones */}
            <section
              id="opiniones"
              className="scroll-mt-32 overflow-hidden px-6 py-20"
            >
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-col items-center text-center">
                  <Reveal from="left">
                    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      Opiniones
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                      Lo que cuentan nuestros alumnos
                    </h2>
                  </Reveal>
                  <Reveal
                    from="right"
                    delay={150}
                    className="mt-4 flex items-center gap-2"
                  >
                    <Stars rating={averageRating} className="[&_svg]:size-5" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {averageRating.toLocaleString("es-ES")}
                      </span>{" "}
                      de valoración media
                    </span>
                  </Reveal>
                </div>

                {/* Las tarjetas entran de derecha a izquierda, hacia donde avanza el carrusel. */}
                <ReviewsCarousel>
                  {reviews.map((review, index) => {
                    const course = courses.find(
                      (c) => c.id === review.courseId
                    )!
                    return (
                      <Reveal
                        as="li"
                        from="right"
                        delay={index * 100}
                        key={review.name}
                        // Anchos exactos para que siempre se vean tarjetas completas: 1 en móvil, 2 en tablet y 3 en escritorio (gap-4 = 1rem).
                        className="flex w-full shrink-0 snap-start flex-col rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                      >
                        <Stars rating={review.rating} />
                        <blockquote className="mt-4 flex-1 text-pretty">
                          “{review.text}”
                        </blockquote>
                        <div className="mt-6 flex items-center gap-3">
                          {review.photo ? (
                            <Image
                              src={review.photo}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="size-12 rounded-full object-cover"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="flex size-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white"
                            >
                              {initials(review.name)}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium">{review.name}</p>
                            <a
                              href={`#${course.id}`}
                              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                            >
                              Curso: {course.label}
                            </a>
                          </div>
                        </div>
                      </Reveal>
                    )
                  })}
                </ReviewsCarousel>
              </div>
            </section>

            {/* Contacto */}
            <section id="contacto" className="scroll-mt-32 px-6 py-20">
              <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
                <Reveal from="left">
                  <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    Contacto
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    Ven a conocernos
                  </h2>
                  <p className="mt-2 font-medium">{contact.name}</p>
                  <p className="mt-3 text-pretty text-muted-foreground">
                    {contact.about}
                  </p>

                  <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="flex gap-3">
                      <MapPin
                        className="mt-0.5 size-5 shrink-0 text-blue-600"
                        aria-hidden
                      />
                      <div>
                        <dt className="font-medium">Dirección</dt>
                        <dd className="text-sm text-muted-foreground">
                          {contact.address}
                          <br />
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground underline-offset-4 hover:underline"
                          >
                            Cómo llegar
                          </a>
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock
                        className="mt-0.5 size-5 shrink-0 text-blue-600"
                        aria-hidden
                      />
                      <div>
                        <dt className="font-medium">Horario</dt>
                        {contact.hours.map((line) => (
                          <dd
                            key={line}
                            className="text-sm text-muted-foreground"
                          >
                            {line}
                          </dd>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone
                        className="mt-0.5 size-5 shrink-0 text-blue-600"
                        aria-hidden
                      />
                      <div>
                        <dt className="font-medium">Teléfono</dt>
                        <dd className="text-sm text-muted-foreground">
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, "")}`}
                            className="hover:text-foreground"
                          >
                            {contact.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Mail
                        className="mt-0.5 size-5 shrink-0 text-blue-600"
                        aria-hidden
                      />
                      <div>
                        <dt className="font-medium">Correo electrónico</dt>
                        <dd className="text-sm text-muted-foreground">
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-foreground"
                          >
                            {contact.email}
                          </a>
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <div className="mt-8">
                    <p className="font-medium">Síguenos</p>
                    <ul className="mt-3 flex gap-2">
                      {contact.socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={cn(
                              buttonVariants({
                                variant: "outline",
                                size: "icon-lg",
                              }),
                              "size-11 rounded-full"
                            )}
                          >
                            <SocialIcon name={social.icon} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal
                  from="right"
                  delay={150}
                  className="min-h-80 overflow-hidden rounded-2xl border bg-card shadow-sm"
                >
                  <iframe
                    title={`Mapa: ${contact.address}`}
                    src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="size-full min-h-80 border-0"
                  />
                </Reveal>
              </div>
            </section>
          </div>

          <aside className="px-6 pb-20 xl:pt-20 xl:pr-6 xl:pl-0">
            <Reveal
              from="right"
              className="mx-auto max-w-md xl:sticky xl:top-32"
            >
              <InfoPanel />
            </Reveal>
          </aside>
        </div>
      </main>
    </div>
  )
}
