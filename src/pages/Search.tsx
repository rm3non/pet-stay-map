import { useState } from 'react';
import { Header } from '@/components/Header';
import { FiltersBar } from '@/components/FiltersBar';
import { ListingList } from '@/components/listings/ListingList';
import { ListingDetailsDrawer } from '@/components/listings/ListingDetailsDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Map } from '@/components/map/Map';
import { useSearch } from '@/hooks/use-search';
import { useAuth } from '@/hooks/use-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Listing } from '@/lib/types';

const Search = () => {
  const { data, isLoading, params, applyParams, clearParams } = useSearch();
  const { user } = useAuth();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [hoveredListing, setHoveredListing] = useState<Listing | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);

  const handleListingSelect = (listing: Listing) => {
    setSelectedListing(listing);
    setDetailsDrawerOpen(true);
  };

  const handleAuthRequired = () => {
    setAuthModalOpen(true);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      <FiltersBar params={params} onApply={applyParams} onClear={clearParams} />

      {/* Mobile: Tabs */}
      <div className="flex-1 overflow-hidden lg:hidden">
        <Tabs defaultValue="list" className="h-full">
          <TabsList className="w-full rounded-none">
            <TabsTrigger value="list" className="flex-1">
              List
            </TabsTrigger>
            <TabsTrigger value="map" className="flex-1">
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="h-[calc(100%-40px)] overflow-y-auto">
            <ListingList
              listings={data}
              isLoading={isLoading}
              selectedId={selectedListing?.id}
              onSelect={handleListingSelect}
            />
          </TabsContent>
          <TabsContent value="map" className="h-[calc(100%-40px)]">
            <Map
              listings={data}
              selectedId={selectedListing?.id}
              hoveredId={hoveredListing?.id}
              onMarkerClick={handleListingSelect}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: Split Layout */}
      <div className="hidden flex-1 overflow-hidden lg:grid lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="overflow-y-auto border-r">
          <ListingList
            listings={data}
            isLoading={isLoading}
            selectedId={selectedListing?.id}
            onSelect={handleListingSelect}
            onHover={setHoveredListing}
          />
        </div>
        <div className="relative">
          <Map
            listings={data}
            selectedId={selectedListing?.id}
            hoveredId={hoveredListing?.id}
            onMarkerClick={handleListingSelect}
          />
        </div>
      </div>

      <ListingDetailsDrawer
        listing={selectedListing}
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        isAuthenticated={!!user}
        onAuthRequired={handleAuthRequired}
      />

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Search;
