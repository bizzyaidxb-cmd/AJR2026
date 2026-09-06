export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string
          fundraising_target_paise: number
          host_id: string | null
          id: string
          lat: number | null
          lng: number | null
          name: string
          state_id: string
          status: string
          tier: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          fundraising_target_paise?: number
          host_id?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          state_id: string
          status?: string
          tier?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          fundraising_target_paise?: number
          host_id?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          state_id?: string
          status?: string
          tier?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "cities_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      city_hosts: {
        Row: {
          city_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          city_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          city_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_hosts_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_hosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_hosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      city_totals: {
        Row: {
          city_id: string
          donation_count: number
          ride_edition_id: string
          total_paise: number
        }
        Insert: {
          city_id: string
          donation_count?: number
          ride_edition_id: string
          total_paise?: number
        }
        Update: {
          city_id?: string
          donation_count?: number
          ride_edition_id?: string
          total_paise?: number
        }
        Relationships: [
          {
            foreignKeyName: "city_totals_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_totals_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
        ]
      }
      club_invitations: {
        Row: {
          club_id: string
          created_at: string
          email: string
          id: string
          invited_by: string | null
          status: Database["public"]["Enums"]["membership_status"]
          token: string
        }
        Insert: {
          club_id: string
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          status?: Database["public"]["Enums"]["membership_status"]
          token?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          status?: Database["public"]["Enums"]["membership_status"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_invitations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_invitations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      club_members: {
        Row: {
          club_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["club_member_role"]
          status: Database["public"]["Enums"]["membership_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          club_id: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["club_member_role"]
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          club_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["club_member_role"]
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      club_totals: {
        Row: {
          club_id: string
          donation_count: number
          ride_edition_id: string
          total_paise: number
        }
        Insert: {
          club_id: string
          donation_count?: number
          ride_edition_id: string
          total_paise?: number
        }
        Update: {
          club_id?: string
          donation_count?: number
          ride_edition_id?: string
          total_paise?: number
        }
        Relationships: [
          {
            foreignKeyName: "club_totals_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_totals_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_totals_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          banner_url: string | null
          city_id: string | null
          created_at: string
          created_by: string | null
          id: string
          logo_url: string | null
          name: string
          status: Database["public"]["Enums"]["club_status"]
          updated_at: string
          year_formed: number | null
        }
        Insert: {
          banner_url?: string | null
          city_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          logo_url?: string | null
          name: string
          status?: Database["public"]["Enums"]["club_status"]
          updated_at?: string
          year_formed?: number | null
        }
        Update: {
          banner_url?: string | null
          city_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          status?: Database["public"]["Enums"]["club_status"]
          updated_at?: string
          year_formed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      consent_log: {
        Row: {
          action: Database["public"]["Enums"]["consent_action"]
          created_at: string
          id: string
          notice_version: string
          purposes: string[]
          user_id: string
        }
        Insert: {
          action?: Database["public"]["Enums"]["consent_action"]
          created_at?: string
          id?: string
          notice_version: string
          purposes?: string[]
          user_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["consent_action"]
          created_at?: string
          id?: string
          notice_version?: string
          purposes?: string[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      donations: {
        Row: {
          amount_paise: number
          captured_at: string | null
          city_id: string | null
          club_id: string | null
          created_at: string
          currency: string
          donor_id: string | null
          fee_paise: number | null
          id: string
          is_anonymous: boolean
          method: string | null
          notes: Json
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          refunded_at: string | null
          ride_edition_id: string | null
          rider_id: string | null
          settlement_id: string | null
          status: Database["public"]["Enums"]["donation_status"]
          tax_paise: number | null
          updated_at: string
        }
        Insert: {
          amount_paise: number
          captured_at?: string | null
          city_id?: string | null
          club_id?: string | null
          created_at?: string
          currency?: string
          donor_id?: string | null
          fee_paise?: number | null
          id?: string
          is_anonymous?: boolean
          method?: string | null
          notes?: Json
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          refunded_at?: string | null
          ride_edition_id?: string | null
          rider_id?: string | null
          settlement_id?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          tax_paise?: number | null
          updated_at?: string
        }
        Update: {
          amount_paise?: number
          captured_at?: string | null
          city_id?: string | null
          club_id?: string | null
          created_at?: string
          currency?: string
          donor_id?: string | null
          fee_paise?: number | null
          id?: string
          is_anonymous?: boolean
          method?: string | null
          notes?: Json
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          refunded_at?: string | null
          ride_edition_id?: string | null
          rider_id?: string | null
          settlement_id?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          tax_paise?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      donors: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          pan: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          pan?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          pan?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          relation: string | null
          rider_confirmed_consent: boolean
          rider_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          relation?: string | null
          rider_confirmed_consent?: boolean
          rider_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          relation?: string | null
          rider_confirmed_consent?: boolean
          rider_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_contacts_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      host_applications: {
        Row: {
          address: string | null
          answers: Json
          calendly_url: string | null
          city_id: string | null
          created_at: string
          id: string
          pincode: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          state_name: string | null
          status: Database["public"]["Enums"]["host_application_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          answers?: Json
          calendly_url?: string | null
          city_id?: string | null
          created_at?: string
          id?: string
          pincode?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state_name?: string | null
          status?: Database["public"]["Enums"]["host_application_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          answers?: Json
          calendly_url?: string | null
          city_id?: string | null
          created_at?: string
          id?: string
          pincode?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state_name?: string | null
          status?: Database["public"]["Enums"]["host_application_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_applications_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "host_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      notification_log: {
        Row: {
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          error: string | null
          event_type: string | null
          id: string
          provider: string | null
          provider_ref: string | null
          status: Database["public"]["Enums"]["notification_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          error?: string | null
          event_type?: string | null
          id?: string
          provider?: string | null
          provider_ref?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          error?: string | null
          event_type?: string | null
          id?: string
          provider?: string | null
          provider_ref?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          read_at: string | null
          title: string | null
          type: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          read_at?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          read_at?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      orientation_progress: {
        Row: {
          application_id: string | null
          completed_at: string | null
          created_at: string
          id: string
          passed: boolean
          quiz_attempts: number
          updated_at: string
          user_id: string
          videos_watched: Json
        }
        Insert: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          passed?: boolean
          quiz_attempts?: number
          updated_at?: string
          user_id: string
          videos_watched?: Json
        }
        Update: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          passed?: boolean
          quiz_attempts?: number
          updated_at?: string
          user_id?: string
          videos_watched?: Json
        }
        Relationships: [
          {
            foreignKeyName: "orientation_progress_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "host_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orientation_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orientation_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      profiles: {
        Row: {
          city_id: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          phone: string | null
          second_name: string | null
          status: Database["public"]["Enums"]["profile_status"]
          updated_at: string
        }
        Insert: {
          city_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          phone?: string | null
          second_name?: string | null
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
        }
        Update: {
          city_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          phone?: string | null
          second_name?: string | null
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      ride_editions: {
        Row: {
          capacity: number | null
          city_id: string
          created_at: string
          ended_at: string | null
          id: string
          ride_date: string | null
          route_url: string | null
          schedule: Json
          season: string | null
          start_lat: number | null
          start_lng: number | null
          start_point: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["ride_state"]
          title: string | null
          updated_at: string
          venue_name: string | null
        }
        Insert: {
          capacity?: number | null
          city_id: string
          created_at?: string
          ended_at?: string | null
          id?: string
          ride_date?: string | null
          route_url?: string | null
          schedule?: Json
          season?: string | null
          start_lat?: number | null
          start_lng?: number | null
          start_point?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_state"]
          title?: string | null
          updated_at?: string
          venue_name?: string | null
        }
        Update: {
          capacity?: number | null
          city_id?: string
          created_at?: string
          ended_at?: string | null
          id?: string
          ride_date?: string | null
          route_url?: string | null
          schedule?: Json
          season?: string | null
          start_lat?: number | null
          start_lng?: number | null
          start_point?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_state"]
          title?: string | null
          updated_at?: string
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ride_editions_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      ride_event_team: {
        Row: {
          added_by: string | null
          created_at: string
          ride_edition_id: string
          user_id: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          ride_edition_id: string
          user_id: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          ride_edition_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_event_team_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_event_team_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
          {
            foreignKeyName: "ride_event_team_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_event_team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_event_team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      ride_registrations: {
        Row: {
          checked_in_at: string | null
          created_at: string
          has_pillion: boolean
          id: string
          ride_edition_id: string
          status: Database["public"]["Enums"]["registration_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          checked_in_at?: string | null
          created_at?: string
          has_pillion?: boolean
          id?: string
          ride_edition_id: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          checked_in_at?: string | null
          created_at?: string
          has_pillion?: boolean
          id?: string
          ride_edition_id?: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_registrations_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      rider_medical: {
        Row: {
          blood_group: string | null
          created_at: string
          rider_id: string
          updated_at: string
        }
        Insert: {
          blood_group?: string | null
          created_at?: string
          rider_id: string
          updated_at?: string
        }
        Update: {
          blood_group?: string | null
          created_at?: string
          rider_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rider_medical_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_medical_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: true
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      rider_profiles: {
        Row: {
          bike_make: string | null
          bike_model: string | null
          created_at: string
          id: string
          instagram: string | null
          level: string | null
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          bike_make?: string | null
          bike_model?: string | null
          created_at?: string
          id: string
          instagram?: string | null
          level?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          bike_make?: string | null
          bike_model?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          level?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rider_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      rider_totals: {
        Row: {
          donation_count: number
          ride_edition_id: string
          rider_id: string
          total_paise: number
        }
        Insert: {
          donation_count?: number
          ride_edition_id: string
          rider_id: string
          total_paise?: number
        }
        Update: {
          donation_count?: number
          ride_edition_id?: string
          rider_id?: string
          total_paise?: number
        }
        Relationships: [
          {
            foreignKeyName: "rider_totals_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_totals_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rider_totals_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      states: {
        Row: {
          created_at: string
          id: string
          name: string
          ride_date: string | null
          theme: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          ride_date?: string | null
          theme?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          ride_date?: string | null
          theme?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          event_id: string
          event_type: string | null
          payload: Json | null
          processed_at: string
        }
        Insert: {
          event_id: string
          event_type?: string | null
          payload?: Json | null
          processed_at?: string
        }
        Update: {
          event_id?: string
          event_type?: string | null
          payload?: Json | null
          processed_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_clubs: {
        Row: {
          banner_url: string | null
          city_id: string | null
          id: string | null
          logo_url: string | null
          name: string | null
          year_formed: number | null
        }
        Insert: {
          banner_url?: string | null
          city_id?: string | null
          id?: string | null
          logo_url?: string | null
          name?: string | null
          year_formed?: number | null
        }
        Update: {
          banner_url?: string | null
          city_id?: string | null
          id?: string | null
          logo_url?: string | null
          name?: string | null
          year_formed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      public_donations: {
        Row: {
          amount_paise: number | null
          city_id: string | null
          club_id: string | null
          created_at: string | null
          display_name: string | null
          id: string | null
          ride_edition_id: string | null
          rider_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "public_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_ride_edition_id_fkey"
            columns: ["ride_edition_id"]
            isOneToOne: false
            referencedRelation: "ride_editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "public_riders"
            referencedColumns: ["rider_id"]
          },
        ]
      }
      public_riders: {
        Row: {
          city_id: string | null
          display_name: string | null
          instagram: string | null
          level: string | null
          photo_url: string | null
          rider_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      adjust_leaderboard: {
        Args: {
          p_amount: number
          p_city: string
          p_club: string
          p_count: number
          p_edition: string
          p_rider: string
        }
        Returns: undefined
      }
      can_access_rider: { Args: { p_rider: string }; Returns: boolean }
      hosts_edition: { Args: { p_edition: string }; Returns: boolean }
      is_city_host: { Args: { p_city: string }; Returns: boolean }
      is_club_admin: { Args: { p_club: string }; Returns: boolean }
      is_club_member: { Args: { p_club: string }; Returns: boolean }
      is_event_team: { Args: never; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "event_team" | "super_admin"
      club_member_role: "member" | "admin"
      club_status: "pending" | "approved" | "rejected" | "suspended"
      consent_action: "granted" | "withdrawn"
      donation_status:
        | "created"
        | "authorized"
        | "captured"
        | "failed"
        | "refunded"
        | "partially_refunded"
      host_application_status: "pending" | "approved" | "rejected"
      membership_status: "invited" | "pending" | "approved" | "left"
      notification_channel: "whatsapp" | "sms" | "email" | "onsite"
      notification_status: "queued" | "sent" | "delivered" | "failed"
      profile_status: "registered" | "card_complete"
      registration_status: "registered" | "cancelled" | "checked_in"
      ride_state: "draft" | "live" | "started" | "ended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["event_team", "super_admin"],
      club_member_role: ["member", "admin"],
      club_status: ["pending", "approved", "rejected", "suspended"],
      consent_action: ["granted", "withdrawn"],
      donation_status: [
        "created",
        "authorized",
        "captured",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      host_application_status: ["pending", "approved", "rejected"],
      membership_status: ["invited", "pending", "approved", "left"],
      notification_channel: ["whatsapp", "sms", "email", "onsite"],
      notification_status: ["queued", "sent", "delivered", "failed"],
      profile_status: ["registered", "card_complete"],
      registration_status: ["registered", "cancelled", "checked_in"],
      ride_state: ["draft", "live", "started", "ended"],
    },
  },
} as const
