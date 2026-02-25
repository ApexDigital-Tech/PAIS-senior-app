// ============================================
// PAIS — Shared Application Types
// ============================================

// —— User & Roles ——
export type UserRole = "senior" | "familiar" | "medico" | "voluntario" | "admin";

export interface User {
    id: string;
    email: string | null;
    phone: string | null;
    full_name: string;
    role: UserRole;
    avatar_url: string | null;
    preferences: Record<string, unknown>;
    linked_senior_id: string | null;
    created_at: string;
}

// —— Transport ——
export type TripStatus =
    | "pending"
    | "assigned"
    | "in_transit"
    | "completed"
    | "cancelled";

export interface TransportRequest {
    id: string;
    senior_id: string;
    origin_address: string;
    origin_lat: number;
    origin_lng: number;
    destination_address: string;
    destination_lat: number;
    destination_lng: number;
    status: TripStatus;
    scheduled_at: string;
    completed_at: string | null;
    driver_id: string | null;
    rating: number | null;
    notes: string | null;
    created_at: string;
}

export type PlaceIcon =
    | "hospital"
    | "pharmacy"
    | "church"
    | "home"
    | "park"
    | "other";

export interface FavoritePlace {
    id: string;
    senior_id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    icon: PlaceIcon;
}

// —— Geolocation ——
export interface GeoPosition {
    lat: number;
    lng: number;
    accuracy?: number;
}

// —— Community ——
export type CompanionRequestType = "visita" | "paseo" | "llamada" | "tramites";
export type CompanionRequestStatus = "pendiente" | "aceptado" | "completado" | "cancelado";

export interface CompanionRequest {
    id: string;
    senior_id: string;
    volunteer_id: string | null;
    type: CompanionRequestType;
    status: CompanionRequestStatus;
    description: string | null;
    date: string;
    location_text: string | null;
    created_at: string;
    updated_at: string;
}

export type ActivityType = "taller" | "caminata" | "lectura" | "social" | "otro";

export interface CommunityActivity {
    id: string;
    title: string;
    description: string | null;
    type: ActivityType;
    date: string;
    location_text: string | null;
    created_by: string | null;
    max_participants: number;
    image_url: string | null;
    created_at: string;
}

export interface Message {
    id: string;
    context_type: "request" | "activity";
    context_id: string;
    sender_id: string;
    content: string | null;
    is_voice: boolean;
    voice_url: string | null;
    created_at: string;
}

// —— Component Props Helpers ——
export interface TripFormData {
    origin: {
        address: string;
        lat: number;
        lng: number;
    };
    destination: {
        address: string;
        lat: number;
        lng: number;
    };
    scheduled_at: string;
    notes?: string;
}

// —— Health ——
export type MedicationStatus = "active" | "completed" | "paused";
export type LogStatus = "taken" | "skipped" | "missed";
export type AppointmentType = "presencial" | "teleconsulta" | "estudio";
export type SOSStatus = "triggered" | "active" | "resolved" | "false_alarm";

export interface Medication {
    id: string;
    user_id: string;
    name: string;
    dosage: string;
    instructions: string | null;
    frequency_hours: number | null;
    start_date: string;
    end_date: string | null;
    status: MedicationStatus;
    created_at: string;
    updated_at: string;
}

export interface MedicationLog {
    id: string;
    medication_id: string;
    user_id: string;
    status: LogStatus;
    logged_at: string;
    notes: string | null;
}

export interface MedicalAppointment {
    id: string;
    user_id: string;
    doctor_name: string;
    specialty: string | null;
    clinic_name: string | null;
    date: string;
    type: AppointmentType;
    location_text: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface SOSAlert {
    id: string;
    user_id: string;
    status: SOSStatus;
    location_text: string | null;
    triggered_at: string;
    resolved_at: string | null;
    resolved_by: string | null;
    notes: string | null;
}

export interface ActivityLog {
    id: string;
    user_id: string | null;
    action: string;
    entity_type: string;
    entity_id: string | null;
    metadata: Record<string, unknown>;
    ip_address: string | null;
    created_at: string;
}
