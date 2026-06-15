export function Analytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") {
    return null;
  }

  return null;
}
