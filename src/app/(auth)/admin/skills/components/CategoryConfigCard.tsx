import { Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import type { CategoriesWithTranslations } from '@/types-portfolio/skill';

interface CategoryConfigCardProps {
  category: CategoriesWithTranslations;
}
export function CategoryConfigCard({ category }: CategoryConfigCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-2 gap-2">
          <Input name="key" value={category.key} disabled />

          <Input name="order" />
        </form>
      </CardContent>
    </Card>
  );
}
