export async function fetchAllDestinations() {
    try {
      const res = await fetch('/api/grtAllDestination');
      if (!res.ok) throw new Error("Failed to fetch destinations");
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return null;
    }
  }
  
  export async function fetchDestinationsByCategory(category: string) {
    try {
      const res = await fetch(`/api/getSomeDestination?category=${category}`);
      if (!res.ok) throw new Error("Failed to fetch destinations by category");
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching destinations by category:", error);
      return null;
    }
  }
  