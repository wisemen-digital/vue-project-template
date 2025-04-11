import type { Address } from '@/models/address/address.model.ts'

export class AddressUtil {
  static format(address: Address | null): string {
    if (address === null) {
      return '-'
    }

    return `${address.streetName ?? ''} ${address.streetNumber ?? ''}, ${address.city ?? ''}, ${address.postalCode ?? ''}, ${address.country ?? ''}`
  }
}
