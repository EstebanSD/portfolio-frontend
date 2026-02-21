import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { SkillItem } from '@/types-portfolio/skill';

interface ItemCardProps {
  item: SkillItem;
}
export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="flex flex-col justify-between p-4 border rounded-xl shadow-sm">
      <div className="flex items-center justify-end">buttons</div>
      <div className="flex items-center justify-around gap-2">
        {item.icon ? (
          <div className="rounded-2xl overflow-hidden">
            <Image src={item.icon?.url} width={48} height={48} alt="icon-skill-item" />
          </div>
        ) : (
          <div className="p-1 rounded-xl bg-gray-200">
            <ImageIcon className="w-10 h-10 text-slate-400" />
          </div>
        )}
        <div>{item.name}</div>
      </div>
    </div>
  );
}
