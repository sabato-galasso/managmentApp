import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AuthInterceptor } from './services/auth-interceptor.service'
import { CachingInterceptor } from './cache/caching-interceptor.service'

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  /* {
    provide: HTTP_INTERCEPTORS,
    useClass: CachingInterceptor,
    multi: true,
  },*/
]
