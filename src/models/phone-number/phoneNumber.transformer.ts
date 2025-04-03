import {
  formatNumber,
  parsePhoneNumber,
} from 'libphonenumber-js'

import type { PhoneNumberDto } from '@/models/phone-number/phoneNumberDto.model.ts'

import type { PhoneNumber } from './phoneNumber.model'

export class PhoneNumberTransformer {
  static fromDto(dto: PhoneNumberDto): PhoneNumber {
    return formatNumber(dto, 'INTERNATIONAL')
  }

  static fromNullableDto(dto: PhoneNumberDto | null): PhoneNumber | null {
    if (dto === null) {
      return null
    }

    return this.fromDto(dto)
  }

  static toDto(phoneNumber: PhoneNumber): PhoneNumberDto {
    const {
      countryCallingCode, nationalNumber,
    } = parsePhoneNumber(phoneNumber)

    return `+${countryCallingCode} ${nationalNumber}`
  }

  static toNullableDto(phoneNumber: PhoneNumber | null): PhoneNumberDto | null {
    if (phoneNumber === null) {
      return null
    }

    return this.toDto(phoneNumber)
  }
}
