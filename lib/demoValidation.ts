export const demoSources = ["Google / Search", "Social media", "Referral", "Event", "Other"] as const;
export type DemoPayload = {
  name: string; email: string; phone: string; company: string;
  source: string; message: string;
};
export const demoLimits: Record<keyof DemoPayload, number> = {
  name: 120, email: 254, phone: 40, company: 160, source: 40, message: 4000,
};

export function validateDemo(input: unknown): {
  data: DemoPayload; errors: Partial<Record<keyof DemoPayload, string>>;
} {
  const raw = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown> : {};
  const data = Object.fromEntries(Object.keys(demoLimits).map(key => [
    key, typeof raw[key] === "string" ? raw[key].trim() : "",
  ])) as DemoPayload;
  const errors: Partial<Record<keyof DemoPayload, string>> = {};
  for (const key of Object.keys(demoLimits) as (keyof DemoPayload)[]) {
    if (key !== "message" && !data[key]) errors[key] = "This field is required.";
    else if (raw[key] !== undefined && typeof raw[key] !== "string") errors[key] = "Invalid value.";
    else if (data[key].length > demoLimits[key]) errors[key] = "This value is too long.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.phone && (!/^[+\d\s().-]+$/.test(data.phone) || !/^\d{7,15}$/.test(data.phone.replace(/\D/g, "")))) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (data.source && !demoSources.some(source => source === data.source)) {
    errors.source = "Please select how you found us.";
  }
  return { data, errors };
}
