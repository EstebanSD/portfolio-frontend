'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SkillItem } from '@/types-portfolio/skill';
import { fetchSkillItemsAction } from '../actions';

export function useSkillItemsByCategory(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<SkillItem[]>([]);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchSkillItemsAction(id);

      setItems(data);
    } catch (error) {
      setItems([]);
      console.error('Fetch skill items error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, isLoading, refetch: fetchItems, setItems };
}
