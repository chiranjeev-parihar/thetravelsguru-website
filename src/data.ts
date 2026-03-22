
import { Package, Testimonial, Destination } from './types';

export const DEFAULTS = {
  COMPANY_NAME: 'The Travel\'s Guru',
  OWNER: 'Mahavir Mahirrao',
  PHONE: '9099965751',
  EMAIL: 'thetravelsguru@gmail.com',
  ADDRESS: '236 2nd Floor Happy Hallmark Shopper Vesu Surat, Surat, Gujarat, 394210',
  WHATSAPP: '84322 50565',
  FOUNDER_IMAGE: './thetravelguru.jpg', // Provided founder image
  MAPS_URL: 'https://www.google.com/maps/dir/?api=1&destination=236+2nd+Floor+Happy+Hallmark+Shopper+Vesu+Surat,+Surat,+Gujarat,+394210'
};

export const PACKAGES: Package[] = [
  {
    id: '1',
    name: 'Bali Paradise Tour',
    destination: 'Bali, Indonesia',
    duration: '6D/5N',
    price: 60000,
    originalPrice: 75000,
    rating: 4.9,
    reviewsCount: 156,
    images: [
      '/bali.png',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80'
    ],
    highlights: ['Uluwatu Temple Sunset', 'Private Pool Villa', 'Ayung River Rafting', 'Tanjung Benoa Watersports'],
    category: 'International',
    inclusions: ['5 Nights Accommodation', 'Daily Breakfast', 'Private Car with English-speaking driver', 'All transfers & tours'],
    exclusions: ['Flights', 'Visa on Arrival', 'Optional Activities', 'Personal Expenses'],
    budgetBreakdown: { accommodation: 45, transportation: 20, activities: 20, meals: 10, service: 5 },
    itinerary: [
      { day: 1, title: 'Arrival in Bali', description: 'Airport pickup, traditional welcome, and hotel check-in.', meals: [] },
      { day: 2, title: 'Watersports & Uluwatu Sunset', description: 'Jet ski, parasailing, Uluwatu Temple, and Kecak Fire Dance.', meals: ['Breakfast'] },
      { day: 3, title: 'Ulundanu & Tanah Lot', description: 'Visit floating temple at Bedugul and iconic Tanah Lot sea temple.', meals: ['Breakfast'] },
      { day: 4, title: 'Kintamani & Ubud', description: 'Mount Batur views, Tegenungan Waterfall, and Alas Harum eco-park.', meals: ['Breakfast'] },
      { day: 5, title: 'Adventure Day', description: 'White-water rafting and ATV ride through Bali countryside.', meals: ['Breakfast'] },
      { day: 6, title: 'Departure', description: 'Transfer to Ngurah Rai International Airport.', meals: ['Breakfast'] }
    ]
  },
  {
    id: '2',
    name: 'Andaman & Nicobar Islands',
    destination: 'Andaman, India',
    duration: '6D/5N',
    price: 26000,
    originalPrice: 35000,
    rating: 4.8,
    reviewsCount: 204,
    images: [
      '/andaman.png',
      'https://images.unsplash.com/photo-1589309736404-2e142a2acdf0?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616053331657-3fecb89ad9e1?auto=format&fit=crop&q=80'
    ],
    highlights: ['Cellular Jail Light & Sound', 'Radhanagar Beach', 'Elephant Beach Snorkelling', 'Neil Island Natural Bridge'],
    category: 'Beach',
    inclusions: ['5 Nights Hotel (Dinner + Breakfast)', 'Ferry Transfers', 'Private A/C Vehicle', 'Cellular Jail Entry'],
    exclusions: ['Airfare', 'Adventure Activities', 'Laundry', 'Sightseeing Entry Fees (Except Cellular Jail)'],
    budgetBreakdown: { accommodation: 40, transportation: 30, meals: 20, activities: 5, service: 5 },
    itinerary: [
      { day: 1, title: 'Port Blair Arrival', description: 'Corbyn\'s Cove beach, Cellular Jail tour, and Light & Sound show.', meals: ['Dinner'] },
      { day: 2, title: 'Havelock Island', description: 'Ferry to Havelock, visit the pristine Radhanagar Beach.', meals: ['Breakfast', 'Dinner'] },
      { day: 3, title: 'Elephant & Kalapathar Beach', description: 'Snorkelling at Elephant Beach and visit to Kalapathar Beach.', meals: ['Breakfast', 'Dinner'] },
      { day: 4, title: 'Neil Island', description: 'Ferry to Neil Island, visit Natural Bridge and sunset at Lakshmanpur.', meals: ['Breakfast', 'Dinner'] },
      { day: 5, title: 'Return to Port Blair', description: 'Ferry back, visit Chidiyatapu for a glorious sunset.', meals: ['Breakfast', 'Dinner'] },
      { day: 6, title: 'Departure', description: 'Transfer to airport for return flight.', meals: ['Breakfast'] }
    ]
  },
  {
    id: '3',
    name: 'Shimla - Kullu - Manali',
    destination: 'Himachal Pradesh, India',
    duration: '6D/5N',
    price: 18000,
    originalPrice: 24000,
    rating: 4.7,
    reviewsCount: 312,
    images: [
      '/shimla.png',
      'https://images.unsplash.com/photo-1605649487212-4dcfbfb55c65?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593181629936-11c602b1fefc?auto=format&fit=crop&q=80'
    ],
    highlights: ['Solang Valley Snow Point', 'Shimla Mall Road', 'Hadimba Devi Temple', 'Kullu Scenic Drive'],
    category: 'Hill Station',
    inclusions: ['5 Nights Accommodation (Breakfast + Dinner)', 'Private Sedan Transfers', 'Welcome Drink'],
    exclusions: ['Airfare/Train Fare', 'Entrance Fees', 'Snow Activities', 'Lunch'],
    budgetBreakdown: { accommodation: 45, transportation: 30, meals: 15, activities: 5, service: 5 },
    itinerary: [
      { day: 1, title: 'Delhi to Shimla', description: 'Drive from Delhi to Shimla. Evening stroll on Mall Road.', meals: ['Dinner'] },
      { day: 2, title: 'Shimla & Kufri', description: 'Kufri snow point, Christ Church, The Ridge, and Jakhu Temple.', meals: ['Breakfast', 'Dinner'] },
      { day: 3, title: 'Drive to Manali', description: 'Scenic drive via Kullu Valley. Visit shawl weaving factory.', meals: ['Breakfast', 'Dinner'] },
      { day: 4, title: 'Solang Valley', description: 'Full day enjoying snow activities, skiing, and horse riding at Solang.', meals: ['Breakfast', 'Dinner'] },
      { day: 5, title: 'Manali Local', description: 'Visit Hadimba Temple, Tibetan Monastery, and Van Vihar.', meals: ['Breakfast', 'Dinner'] },
      { day: 6, title: 'Departure to Delhi', description: 'Drive back to Delhi Railway Station.', meals: ['Breakfast'] }
    ]
  },
  {
    id: '4',
    name: 'Mysore - Ooty Circuit',
    destination: 'South India',
    duration: '5D/4N',
    price: 16650,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 189,
    images: [
      '/mysore.png',
      'https://images.unsplash.com/photo-1582510003544-4d0037f27115?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1644300329596-f6c1ffc116de?auto=format&fit=crop&q=80'
    ],
    highlights: ['Mysore Palace Illumination', 'Nilgiri Toy Train', 'Ooty Botanical Garden', 'Doddabetta Peak'],
    category: 'Hill Station',
    inclusions: ['4 Nights Accommodation (Breakfast)', 'Private A/C Ertiga', 'GST Included'],
    exclusions: ['Airfare/Train Fare', 'Entrance Fees', 'Lunch & Dinner', 'Toy Train Tickets'],
    budgetBreakdown: { accommodation: 40, transportation: 40, meals: 10, activities: 5, service: 5 },
    itinerary: [
      { day: 1, title: 'Bangalore to Mysore', description: 'Transfer to Mysore. Visit Mysore Palace and Brindavan Gardens.', meals: ['Breakfast'] },
      { day: 2, title: 'Mysore Sightseeing', description: 'Mysore Zoo, Chamundi Hills, St. Philomena Catedral.', meals: ['Breakfast'] },
      { day: 3, title: 'Drive to Ooty', description: 'Drive via Bandipur. Visit Ooty Lake and Botanical Garden.', meals: ['Breakfast'] },
      { day: 4, title: 'Ooty Hills', description: 'Doddabetta Peak, Pykara Lake, and Rose Garden.', meals: ['Breakfast'] },
      { day: 5, title: 'Departure from Coimbatore', description: 'Transfer to Coimbatore for return journey.', meals: ['Breakfast'] }
    ]
  },
  {
    id: '5',
    name: 'Kashmir - Paradise on Earth',
    destination: 'Kashmir, India',
    duration: '6D/5N',
    price: 24500,
    originalPrice: 32000,
    rating: 5.0,
    reviewsCount: 420,
    images: [
      '/kashmir.png',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561578351-460d3753702a?auto=format&fit=crop&q=80'
    ],
    highlights: ['Dal Lake Shikara Ride', 'Gulmarg Gondola', 'Sonmarg Glacier', 'Pahalgam Valley'],
    category: 'Hill Station',
    inclusions: ['5 Nights Hotel/Houseboat', 'Breakfast & Dinner', 'Private Vehicle Transfers'],
    exclusions: ['Airfare', 'Shikara Ride', 'Gondola Tickets', 'Lunch', 'Pony Rides'],
    budgetBreakdown: { accommodation: 45, transportation: 25, meals: 20, activities: 5, service: 5 },
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Transfer to houseboat/hotel. Optional sunset Shikara ride.', meals: ['Dinner'] },
      { day: 2, title: 'Sonmarg Excursion', description: 'Full-day trip to the Meadow of Gold and Thajiwas Glacier.', meals: ['Breakfast', 'Dinner'] },
      { day: 3, title: 'Srinagar Gardens', description: 'Nishat Bagh, Shalimar Bagh, and Shankaracharya Temple.', meals: ['Breakfast', 'Dinner'] },
      { day: 4, title: 'Gulmarg', description: 'Drive to Meadow of Flowers. Optional Gondola ride.', meals: ['Breakfast', 'Dinner'] },
      { day: 5, title: 'Pahalgam', description: 'Drive via Awantipora ruins to the Valley of Shepherds.', meals: ['Breakfast', 'Dinner'] },
      { day: 6, title: 'Departure', description: 'Sightseeing in Betaab/Aru valley, then transfer to airport.', meals: ['Breakfast'] }
    ]
  },
  {
    id: '6',
    name: 'Kerala God\'s Own Country',
    destination: 'Kerala, India',
    duration: '6D/5N',
    price: 23850,
    originalPrice: 31000,
    rating: 4.9,
    reviewsCount: 275,
    images: [
      '/kerala.png',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577700021200-8430a911a3df?auto=format&fit=crop&q=80'
    ],
    highlights: ['Private Houseboat Stay', 'Munnar Tea Gardens', 'Periyar Wildlife', 'Kathakali Show'],
    category: 'Nature',
    inclusions: ['4 Nights Hotel (MAP), 1 Night Houseboat (AP)', 'Private A/C Ertiga'],
    exclusions: ['Airfare/Train Fare', 'Entry Fees', 'Lunch (Except Houseboat)'],
    budgetBreakdown: { accommodation: 50, transportation: 25, meals: 15, activities: 5, service: 5 },
    itinerary: [
      { day: 1, title: 'Cochin to Munnar', description: 'Arrival and scenic drive via Cheeyapara Waterfalls.', meals: ['Dinner'] },
      { day: 2, title: 'Munnar Sightseeing', description: 'Mattupetty Dam, Tea Gardens, and Echo Point.', meals: ['Breakfast', 'Dinner'] },
      { day: 3, title: 'Drive to Thekkady', description: 'Eravikulam National Park and spice plantation visit.', meals: ['Breakfast', 'Dinner'] },
      { day: 4, title: 'Periyar Wildlife', description: 'Periyar Lake boat ride, Kathakali and Kalaripayattu shows.', meals: ['Breakfast', 'Dinner'] },
      { day: 5, title: 'Alleppey Houseboat', description: 'Overnight backwater cruise with traditional Kerala meals.', meals: ['Breakfast', 'Lunch', 'Dinner'] },
      { day: 6, title: 'Departure', description: 'Morning cruise, checkout, and transfer to Cochin.', meals: ['Breakfast'] }
    ]
  },
  {
    id: '7',
    name: 'Goa - India\'s Beach Paradise',
    destination: 'Goa, India',
    duration: '3D/2N',
    price: 11000,
    originalPrice: 15000,
    rating: 4.6,
    reviewsCount: 512,
    images: [
      '/goa.png',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534142499119-094e963ce5d7?auto=format&fit=crop&q=80'
    ],
    highlights: ['North Goa Beaches', 'Old Goa Churches', 'Fontainhas Heritage', 'Fort Aguada'],
    category: 'Beach',
    inclusions: ['2 Nights Accommodation', 'Daily Breakfast', 'Private A/C Sedan Transfers & Sightseeing', 'Welcome Drink'],
    exclusions: ['Airfare', 'Lunch & Dinner', 'Entry Fees', 'Water Sports'],
    budgetBreakdown: { accommodation: 45, transportation: 30, meals: 15, activities: 5, service: 5 },
    itinerary: [
      { day: 1, title: 'Arrival & North Goa', description: 'Transfer to Candolim resort. Visit Calangute, Baga, and Fort Aguada.', meals: ['Breakfast'] },
      { day: 2, title: 'South Goa Heritage', description: 'Basilica of Bom Jesus, Se Cathedral, and Panjim Latin Quarter.', meals: ['Breakfast'] },
      { day: 3, title: 'Departure', description: 'Breakfast at hotel and transfer to Goa Airport.', meals: ['Breakfast'] }
    ]
  }
];

export const DESTINATIONS: Destination[] = [
  { id: 'd1', name: 'Bali', image: '/bali.png', count: 1 },
  { id: 'd2', name: 'Andaman', image: '/andaman.png', count: 1 },
  { id: 'd3', name: 'Himachal', image: '/shimla.png', count: 1 },
  { id: 'd4', name: 'Kashmir', image: '/kashmir.png', count: 1 },
  { id: 'd5', name: 'Kerala', image: '/kerala.png', count: 1 },
  { id: 'd6', name: 'Goa', image: '/goa.png', count: 1 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    location: 'Surat',
    rating: 5,
    text: 'Mahavir organized our family trip to Kashmir flawlessly. The houseboat stay was a dream!',
    image: 'https://i.pravatar.cc/100?u=rahul',
    trip: 'Kashmir Paradise Tour'
  },
  {
    id: 't2',
    name: 'Anjali Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Best pricing and complete transparency. The budget breakdown tool really helped us plan better.',
    image: 'https://i.pravatar.cc/100?u=anjali',
    trip: 'Maldives Escape'
  },
  {
    id: 't3',
    name: 'Suresh Iyer',
    location: 'Mumbai',
    rating: 4,
    text: 'Professional service. Mahavir was available on WhatsApp throughout our Kerala trip.',
    image: 'https://i.pravatar.cc/100?u=suresh',
    trip: 'Kerala Backwaters'
  }
];
