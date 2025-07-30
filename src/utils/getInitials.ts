export function getInitials(text: string, toUpperCase: boolean = false): string {
  return text
    .split(/\s+/)
    .filter((word) => word.length)
    .map((word) => {
      const letter = word[0];
      return toUpperCase ? letter.toUpperCase() : letter;
    })
    .join('');
}
