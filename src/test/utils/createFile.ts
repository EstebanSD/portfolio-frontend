export function createFile({
  name = 'test.pdf',
  sizeKB = 1,
  type = 'application/pdf',
}: {
  name?: string;
  sizeKB?: number;
  type?: string;
} = {}): File {
  return new File(['a'.repeat(sizeKB * 1024)], name, { type });
}
