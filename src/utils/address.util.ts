import type { Address } from '@/models/address/address.model.ts'

export class AddressUtil {
  static format(address: Address | null): string {
    return address ? `${address.streetName ?? ''} ${address.streetNumber ?? ''}, ${address.city ?? ''}, ${address.postalCode ?? ''}, ${address.country ?? ''}` : '-'
  }
}
