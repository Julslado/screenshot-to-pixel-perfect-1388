import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NDA } from "@/data/beloira";
import { isFreeEmailDomain } from "@/lib/beloira";
import { cn } from "@/lib/utils";
import { useAccess } from "./access-context";

/*
 * DEVELOPER NOTE — SIMULATION ONLY.
 * This form does not store or send any data. Submission waits 1.2s and shows a success view.
 * Before any real use it must be connected to a secure workflow (server-side validation,
 * KYC/qualified-investor checks, e-signature NDA issuance, audit trail and access control).
 */

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().min(2, "Please enter your company."),
  role: z.string().trim().min(2, "Please enter your role."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your corporate email.")
    .email("Please enter a valid email address.")
    .refine((v) => !isFreeEmailDomain(v), NDA.freeEmailError),
  investorType: z.string().min(1, "Please select an investor type."),
  principal: z.literal(true, { errorMap: () => ({ message: "Please confirm to continue." }) }),
});

type FormValues = z.input<typeof schema>;

const defaults: FormValues = {
  fullName: "",
  company: "",
  role: "",
  email: "",
  investorType: "",
  principal: false as unknown as true,
};

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

export function NdaModal() {
  const { ndaOpen, setNdaOpen, markNdaRequested } = useAccess();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const uid = useId();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaults, mode: "onTouched" });

  // Reset the form a moment after closing so the exit animation doesn't flash.
  useEffect(() => {
    if (ndaOpen) return;
    const t = setTimeout(() => {
      setStatus("idle");
      reset(defaults);
    }, 200);
    return () => clearTimeout(t);
  }, [ndaOpen, reset]);

  const onSubmit = async () => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
    markNdaRequested();
  };

  const field = (name: keyof FormValues) => ({
    id: `${uid}-${name}`,
    errorId: `${uid}-${name}-error`,
    invalid: Boolean(errors[name]),
  });

  const textFields: { name: "fullName" | "company" | "role" | "email"; label: string; type?: string; autoComplete: string }[] = [
    { name: "fullName", label: "Full name", autoComplete: "name" },
    { name: "company", label: "Company", autoComplete: "organization" },
    { name: "role", label: "Role", autoComplete: "organization-title" },
    { name: "email", label: "Corporate email", type: "email", autoComplete: "email" },
  ];

  const inv = field("investorType");
  const pr = field("principal");

  return (
    <Dialog open={ndaOpen} onOpenChange={setNdaOpen}>
      <DialogContent
        className={cn(
          "max-h-[100dvh] gap-0 overflow-y-auto border-border p-6 sm:max-w-xl sm:rounded-xl sm:p-8",
          "max-sm:inset-0 max-sm:h-[100dvh] max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none",
        )}
      >
        {status === "done" ? (
          <div className="flex flex-col items-start py-6 sm:py-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Check className="h-7 w-7 text-ink" strokeWidth={3} aria-hidden="true" />
            </span>
            <DialogTitle className="mt-6 text-2xl font-bold text-ink">{NDA.successTitle}</DialogTitle>
            <DialogDescription className="mt-3 text-base leading-relaxed text-body">
              {NDA.successBody}
            </DialogDescription>
            <Button className="mt-8" variant="outline" onClick={() => setNdaOpen(false)}>
              {NDA.close}
            </Button>
          </div>
        ) : (
          <>
            <DialogTitle className="pr-8 text-2xl font-bold tracking-tight text-ink">{NDA.title}</DialogTitle>
            <DialogDescription className="mt-2 text-[15px] text-body">{NDA.intro}</DialogDescription>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-5">
              {textFields.map((t) => {
                const f = field(t.name);
                return (
                  <div key={t.name}>
                    <Label htmlFor={f.id} className="text-sm font-semibold text-ink">
                      {t.label}
                    </Label>
                    <Input
                      id={f.id}
                      type={t.type ?? "text"}
                      autoComplete={t.autoComplete}
                      aria-invalid={f.invalid}
                      aria-describedby={f.invalid ? f.errorId : undefined}
                      className={cn(
                        "mt-2 h-12 rounded-lg border-border text-base focus-visible:ring-2 focus-visible:ring-ring",
                        f.invalid && "border-destructive",
                      )}
                      {...register(t.name)}
                    />
                    <FieldError id={f.errorId} message={errors[t.name]?.message} />
                  </div>
                );
              })}

              <div>
                <Label htmlFor={inv.id} className="text-sm font-semibold text-ink">
                  Investor type
                </Label>
                <Controller
                  control={control}
                  name="investorType"
                  render={({ field: rf }) => (
                    <Select value={rf.value} onValueChange={rf.onChange}>
                      <SelectTrigger
                        id={inv.id}
                        onBlur={rf.onBlur}
                        aria-invalid={inv.invalid}
                        aria-describedby={inv.invalid ? inv.errorId : undefined}
                        className={cn(
                          "mt-2 h-12 rounded-lg border-border text-base focus:ring-2 focus:ring-ring",
                          inv.invalid && "border-destructive",
                        )}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {NDA.investorTypes.map((t) => (
                          <SelectItem key={t} value={t} className="min-h-11">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError id={inv.errorId} message={errors.investorType?.message} />
              </div>

              <div>
                <Controller
                  control={control}
                  name="principal"
                  render={({ field: rf }) => (
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={pr.id}
                        checked={rf.value === true}
                        onCheckedChange={(c) => rf.onChange(c === true)}
                        onBlur={rf.onBlur}
                        aria-invalid={pr.invalid}
                        aria-describedby={pr.invalid ? pr.errorId : undefined}
                        className="mt-0.5 h-5 w-5 rounded border-ink data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <Label htmlFor={pr.id} className="text-[15px] font-normal leading-snug text-ink">
                        {NDA.principalLabel}
                      </Label>
                    </div>
                  )}
                />
                <FieldError id={pr.errorId} message={errors.principal?.message} />
              </div>

              <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto sm:self-start" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    {NDA.sending}
                  </>
                ) : (
                  NDA.submit
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
