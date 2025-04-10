import type { AddressCommand } from '@/client'
import type { Address } from '@/models/address/address.model'
import type { AddressDto } from '@/models/address/addressDto.model'
import type { AddressForm } from '@/models/address/addressForm.model'

export class AddressTransformer {
  constructor() {
  }

  static fromDto(dto: AddressDto): Address {
    return {
      city: dto.city,
      coordinates: {
        latitude: dto.coordinates?.latitude ?? 0,
        longitude: dto.coordinates?.longitude ?? 0,
      },
      country: dto.country,
      postalCode: dto.postalCode,
      streetName: dto.streetName,
      streetNumber: dto.streetNumber,
      unit: dto.unit,
    }
  }

  static fromNullableDto(dto: AddressDto | null): Address | null {
    if (dto === null) {
      return null
    }

    return this.fromDto(dto)
  }

  static toDto(address: AddressForm): AddressCommand {
    return {
      city: address.city === '' ? null : address.city,
      coordinates: {
        latitude: address.coordinates.lat ?? 0,
        longitude: address.coordinates.lng ?? 0,
      },
      country: address.country === '' ? null : address.country,
      postalCode: address.postalCode === '' ? null : address.postalCode,
      streetName: address.street === '' ? null : address.street,
      streetNumber: address.streetNumber === '' ? null : address.streetNumber,
      unit: address.bus === '' ? null : address.bus,
    }
  }

  static toForm(address: Address): AddressForm {
    return {
      bus: address.unit ?? '',
      city: address.city ?? '',
      coordinates: {
        lat: address.coordinates?.latitude ?? 0,
        lng: address.coordinates?.longitude ?? 0,
      },
      country: address.country ?? '',
      postalCode: address.postalCode ?? '',
      street: address.streetName ?? '',
      streetNumber: address.streetNumber ?? '',
    }
  }
}
