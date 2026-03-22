/**
 * API service for The Travel's Guru backend
 * Handles all HTTP requests to backend endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface GeneralInquiryPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  destination: string;
  travel_date: string;
  duration_days: number;
  budget?: string;
  special_requests?: string;
}

export interface GroupBookingPayload {
  contact_person: string;
  email: string;
  phone: string;
  destination: string;
  group_size: number;
  travel_date: string;
  duration_days: number;
  budget?: string;
  company_name?: string;
  special_requirements?: string;
}

export interface CustomPlanPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  destinations: string;
  travel_date: string;
  duration_days: number;
  budget?: string;
  travel_style?: string;
  activities?: string;
  accommodation_preference?: string;
  special_requests?: string;
}

export interface EarlyBirdPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  destination: string;
  event_date: string;
  interested_in?: string;
  newsletter_opted?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  timestamp?: string;
}

/**
 * Submit a general inquiry
 */
export const submitGeneralInquiry = async (payload: GeneralInquiryPayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/general`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error submitting general inquiry:', error);
    throw error;
  }
};

/**
 * Submit a group booking
 */
export const submitGroupBooking = async (payload: GroupBookingPayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error submitting group booking:', error);
    throw error;
  }
};

/**
 * Submit a custom plan
 */
export const submitCustomPlan = async (payload: CustomPlanPayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/custom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error submitting custom plan:', error);
    throw error;
  }
};

/**
 * Submit early bird registration
 */
export const submitEarlyBirdRegistration = async (payload: EarlyBirdPayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/early-bird`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error submitting early bird registration:', error);
    throw error;
  }
};

/**
 * Get inquiry statistics (requires auth token)
 */
export const getInquiryStats = async (authToken: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching inquiry stats:', error);
    throw error;
  }
};

export const api = {
  submitGeneralInquiry,
  submitGroupBooking,
  submitCustomPlan,
  submitEarlyBirdRegistration,
  getInquiryStats,
};
