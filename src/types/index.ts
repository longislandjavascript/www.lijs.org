// https://api.meetup.com/long-island-javascript-group
export interface MeetupGroup {
  id: number;
  name: string;
  status: string;
  link: string;
  urlname: string;
  description: string;
  created: number;
  city: string;
  untranslated_city: string;
  country: string;
  localized_country_name: string;
  localized_location: string;
  region2: string;
  state: string;
  join_mode: string;
  visibility: string;
  lat: number;
  lon: number;
  members: number;
  member_pay_fee: string;
  organizer: MeetupGroupOrganizer;
  who: string;
  group_photo: MeetupPhoto;
  key_photo: MeetupPhoto;
  timezone: string;
  next_event: Pick<
    MeetupEvent,
    "id" | "name" | "yes_rsvp_count" | "time" | "utc_offset"
  >;
  category: MeetupGroupCategory;
  meta_category: MeetupGroupMetaCategory;
}

// https://api.meetup.com/long-island-javascript-group/events?status=upcoming
export interface MeetupEvent {
  created: number;
  duration: number;
  id: string;
  name: string;
  date_in_series_pattern: boolean;
  status: string;
  time: number;
  local_date: string;
  local_time: string;
  updated: number;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  link: string;
  description: string;
  visibility: string;
  member_pay_fee: boolean;
  is_online_event: string;
  group: Pick<
    MeetupGroup,
    | "created"
    | "name"
    | "id"
    | "join_mode"
    | "lat"
    | "lon"
    | "urlname"
    | "who"
    | "localized_location"
    | "state"
    | "country"
    | "timezone"
  > & { region: string };
}

export interface MeetupEventVenue {
  id: number;
  name: string;
  lat: number;
  lon: number;
  repinned: boolean;
  address_1: string;
  city: string;
  country: string;
  localized_country_name: string;
  phone: string;
  zip: string;
  state: string;
}

export interface MeetupPhoto {
  id: number;
  highres_link: string;
  photo_link: string;
  thumb_link: string;
  type: string;
  base_url: string;
}

export interface MeetupGroupOrganizer {
  id: number;
  name: string;
  bio: string;
  photo: MeetupPhoto;
}

export interface MeetupGroupCategory {
  id: number;
  name: string;
  shortname: string;
  sort_name: string;
}

export interface MeetupGroupMetaCategory extends MeetupGroupCategory {
  photo: MeetupPhoto;
  category_ids: number[];
}

export type BaseComponent = {
  /**
   * The contents of the component
   */
  children?: React.ReactNode;
  /**
   * Optionally apply a className
   */
  className?: string;
  /**
   * Optionally provide an id
   */
  id?: string;
  /**
   * Optionally apply a style object
   */
  style?: React.CSSProperties;
};
