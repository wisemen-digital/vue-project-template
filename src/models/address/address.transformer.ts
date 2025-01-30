import type { Address } from '@/models/address/address.model'
import type { AddressDto } from '@/models/address/addressDto.model'
import type { AddressForm } from '@/models/address/addressForm.model'

export class AddressTransformer {
  static fromDto(dto: AddressDto): Address {
    return {
      address: dto.address,
      city: dto.city,
      coords: {
        lat: dto.coordinates.latitude,
        lng: dto.coordinates.longitude,
      },
      postalCode: dto.postcode,
    }
  }

  static fromNullableDto(dto: AddressDto | null): Address | null {
    if (dto === null) {
      return null
    }

    return this.fromDto(dto)
  }

  static toDto(address: AddressForm): AddressDto {
    return {
      address: `${address.street} ${address.streetNumber}`,
      city: address.city,
      coordinates: {
        latitude: address.coordinates.lat ?? 0,
        longitude: address.coordinates.lng ?? 0,
      },
      postcode: address.postalCode,
    }
  }
}
