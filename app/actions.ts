"use server"

export type EnrollField = "nombre" | "email" | "telefono" | "horario" | "privacidad"

export type EnrollState =
  | { status: "idle" }
  | {
      status: "error"
      errors: Partial<Record<EnrollField, string>>
      values: Record<string, string>
    }
  | { status: "success"; nombre: string; email: string }

const schedules = ["Mañanas", "Tardes", "Sábados"]

export async function enroll(_prevState: EnrollState, formData: FormData): Promise<EnrollState> {
  const values = {
    curso: String(formData.get("curso") ?? "").trim(),
    nombre: String(formData.get("nombre") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefono: String(formData.get("telefono") ?? "").trim(),
    horario: String(formData.get("horario") ?? ""),
    comentarios: String(formData.get("comentarios") ?? "").trim(),
    privacidad: formData.get("privacidad") === "on" ? "on" : "",
  }

  const errors: Partial<Record<EnrollField, string>> = {}
  if (values.nombre.length < 2) errors.nombre = "Escribe tu nombre y apellidos."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Escribe un correo válido."
  const digits = values.telefono.replace(/[\s()+-]/g, "")
  if (!/^\d{9,15}$/.test(digits)) errors.telefono = "Escribe un teléfono válido (al menos 9 cifras)."
  if (!schedules.includes(values.horario)) errors.horario = "Elige un horario."
  if (!values.privacidad) errors.privacidad = "Necesitamos tu consentimiento para contactarte."

  if (!values.curso || Object.keys(errors).length > 0) {
    return { status: "error", errors, values }
  }

  // TODO: guardar la inscripción o enviarla por correo (base de datos, Google Sheets, email…).
  // Por ahora solo se muestra en la consola del servidor.
  console.info("Nueva inscripción:", values)

  return { status: "success", nombre: values.nombre.split(" ")[0], email: values.email }
}
