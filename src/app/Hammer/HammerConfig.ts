import * as Hammer from 'hammerjs'
import { HammerGestureConfig } from '@angular/platform-browser'
import { Injectable } from '@angular/core'

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: { direction: Hammer.DIRECTION_ALL },
    swipe: { direction: Hammer.DIRECTION_VERTICAL },
  }
}
