import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'

export class ContactUtil {
  static getFullName(contact: Pick<ContactDetail, 'firstName' | 'lastName'>): string | null {
    const {
      firstName, lastName,
    } = contact

    if (firstName === null || lastName === null) {
      return null
    }

    return `${firstName} ${lastName}`
  }

  static getInitials(fullName: string): string {
    const firstName = fullName.split(' ')[0]
    const lastName = fullName.split(' ').at(-1) ?? ''

    return `${firstName[0]}${lastName[0]}`
  }
}
