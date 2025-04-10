export interface Address {
  city: string | null
  coordinates: {
    latitude: number
    longitude: number
  }
  country: string | null
  postalCode: string | null
  streetName: string | null
  streetNumber: string | null
  unit: string | null
}
