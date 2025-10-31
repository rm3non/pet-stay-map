import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Listing, SearchParams } from '@/lib/types';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const params: SearchParams = {
    city: searchParams.get('city') || 'Ahmedabad',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    size: searchParams.get('size') || undefined,
    verified: searchParams.get('verified') === 'true',
    from: searchParams.get('from') || undefined,
    to: searchParams.get('to') || undefined,
  };

  const fetchListings = useCallback(async (searchParams: SearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const query = new URLSearchParams();
      if (searchParams.city) query.set('city', searchParams.city);
      if (searchParams.minPrice) query.set('minPrice', searchParams.minPrice.toString());
      if (searchParams.maxPrice) query.set('maxPrice', searchParams.maxPrice.toString());
      if (searchParams.size) query.set('size', searchParams.size);
      if (searchParams.verified) query.set('verified', 'true');
      if (searchParams.from) query.set('from', searchParams.from);
      if (searchParams.to) query.set('to', searchParams.to);

      const response = await fetch(`/api/search?${query}`);
      if (!response.ok) throw new Error('Failed to fetch listings');
      
      const result = await response.json();
      setData(result.results || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchListings(params);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams, fetchListings]);

  const setParam = useCallback((key: string, value: string | number | boolean | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === undefined || value === '' || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const applyParams = useCallback((newParams: Partial<SearchParams>) => {
    const updatedParams = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === false) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, String(value));
      }
    });
    
    setSearchParams(updatedParams);
  }, [searchParams, setSearchParams]);

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams({ city: 'Ahmedabad' }));
  }, [setSearchParams]);

  return {
    data,
    isLoading,
    error,
    params,
    setParam,
    applyParams,
    clearParams,
  };
}
