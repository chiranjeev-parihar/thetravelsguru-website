
export interface Package {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  category: 'Honeymoon' | 'Family' | 'Adventure' | 'Pilgrimage' | 'Beach' | 'Hill Station' | 'International' | 'Nature';
  budgetBreakdown: {
    accommodation: number;
    transportation: number;
    meals: number;
    activities: number;
    service: number;
  };
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: ('Breakfast' | 'Lunch' | 'Dinner')[];
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  trip: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  count: number;
}
