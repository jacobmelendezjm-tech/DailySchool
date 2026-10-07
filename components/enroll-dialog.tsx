"use client"

import { useActionState, useId, useRef, useState } from "react"
import { CircleCheck, X } from "lucide-react"

import { enroll, type EnrollField, type EnrollState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const inputClass =
  "h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none transition-colors focus-visible:border-blue-600 focus-visible:ring-3 focus-visible:ring-blue-600/20 aria-invalid:border-destructive"

export function EnrollDialog({ course, className }: { course: string; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  // Cambiar la key reinicia el formulario la próxima vez que se abre tras una inscripción.
  const [formKey, setFormKey] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  function close() {
    dialogRef.current?.close()
  }

  function handleClose() {
    if (submitted) {
      setSubmitted(false)
      setFormKey((key) => key + 1)
    }
  }

  return (
    <>
      <Button
        size="lg"
        onClick={() => dialogRef.current?.showModal()}
        className={cn(
          "h-11 rounded-full bg-blue-600 px-6 text-base text-white hover:bg-blue-700 focus-visible:border-transparent focus-visible:ring-blue-600/40",
          className
        )}
      >
        Inscribirme
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        // Lenis no debe interceptar el scroll dentro de la ventana.
        data-lenis-prevent
        className="bubble-dialog m-auto max-h-[calc(100svh-2rem)] w-[min(34rem,calc(100%-2rem))] max-w-none overflow-y-auto overscroll-contain rounded-[2rem] border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <EnrollForm key={formKey} course={course} titleId={titleId} onClose={close} onSuccess={() => setSubmitted(true)} />
      </dialog>
    </>
  )
}

function EnrollForm({
  course,
  titleId,
  onClose,
  onSuccess,
}: {
  course: string
  titleId: string
  onClose: () => void
  onSuccess: () => void
}) {
  const [state, formAction, pending] = useActionState(async (prev: EnrollState, formData: FormData) => {
    const next = await enroll(prev, formData)
    if (next.status === "success") onSuccess()
    return next
  }, { status: "idle" } as EnrollState)

  const errors: Partial<Record<EnrollField, string>> = state.status === "error" ? state.errors : {}
  const values: Record<string, string> = state.status === "error" ? state.values : {}

  return (
    <div className="relative p-6 sm:p-8">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="size-5" />
      </button>

      {state.status === "success" ? (
        <div className="flex flex-col items-center py-6 text-center">
          <CircleCheck className="size-12 text-blue-600" aria-hidden />
          <h2 id={titleId} className="mt-4 text-xl font-semibold">
            ¡Gracias, {state.nombre}!
          </h2>
          <p className="mt-2 text-pretty text-muted-foreground">
            Hemos recibido tu solicitud para <strong className="text-foreground">{course}</strong>. Te escribiremos a{" "}
            <strong className="text-foreground">{state.email}</strong> para confirmar la fecha y tu plaza.
          </p>
          <Button size="lg" variant="outline" onClick={onClose} className="mt-6 h-11 rounded-full px-6">
            Cerrar
          </Button>
        </div>
      ) : (
        <form action={formAction} className="grid gap-4">
          <div className="pr-10">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Inscripción</p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold text-balance">
              {course}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Déjanos tus datos y te contactaremos para confirmar tu plaza.
            </p>
          </div>

          <input type="hidden" name="curso" value={course} />

          <Field label="Nombre y apellidos" error={errors.nombre}>
            {(props) => (
              <input {...props} name="nombre" autoComplete="name" required defaultValue={values.nombre} className={inputClass} />
            )}
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Correo electrónico" error={errors.email}>
              {(props) => (
                <input {...props} type="email" name="email" autoComplete="email" required defaultValue={values.email} className={inputClass} />
              )}
            </Field>
            <Field label="Teléfono" error={errors.telefono}>
              {(props) => (
                <input {...props} type="tel" name="telefono" autoComplete="tel" required defaultValue={values.telefono} className={inputClass} />
              )}
            </Field>
          </div>

          <fieldset className="grid gap-1.5">
            <legend className="mb-1.5 text-sm font-medium">Horario preferido</legend>
            <div className="grid grid-cols-3 gap-2">
              {["Mañanas", "Tardes", "Sábados"].map((option) => (
                <label
                  key={option}
                  className="flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm transition-colors hover:bg-muted has-checked:border-blue-600 has-checked:bg-blue-600/10 has-checked:font-medium has-focus-visible:ring-3 has-focus-visible:ring-blue-600/20"
                >
                  <input
                    type="radio"
                    name="horario"
                    value={option}
                    required
                    defaultChecked={values.horario === option}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.horario && <p className="text-sm text-destructive">{errors.horario}</p>}
          </fieldset>

          <Field label="Comentarios (opcional)">
            {(props) => (
              <textarea
                {...props}
                name="comentarios"
                rows={3}
                defaultValue={values.comentarios}
                placeholder="¿Alguna duda o necesidad especial?"
                className={cn(inputClass, "h-auto py-2.5")}
              />
            )}
          </Field>

          <div>
            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="privacidad"
                required
                defaultChecked={values.privacidad === "on"}
                className="mt-0.5 size-4 shrink-0 accent-blue-600"
              />
              Acepto que se usen mis datos para gestionar mi inscripción y contactarme sobre este curso.
            </label>
            {errors.privacidad && <p className="mt-1 text-sm text-destructive">{errors.privacidad}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="mt-2 h-12 rounded-full bg-blue-600 text-base text-white hover:bg-blue-700"
          >
            {pending ? "Enviando…" : "Enviar inscripción"}
          </Button>
        </form>
      )}
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => React.ReactNode
}) {
  const id = useId()
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined })}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
