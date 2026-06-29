export function calculateStatus(
  score: number
) {
  if (score >= 70) {
    return "dangerous";
  }

  if (score >= 30) {
    return "suspicious";
  }

  return "safe";
}