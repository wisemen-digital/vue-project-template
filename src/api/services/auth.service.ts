import { viewMeControllerViewMeV1 } from '@/client'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import { UserTransformer } from '@/models/user/user.transformer'

export class AuthService {
  static async getMe(): Promise<UserDetail> {
    const response = await viewMeControllerViewMeV1()

    return UserTransformer.fromDto(response.data)
  }
}
