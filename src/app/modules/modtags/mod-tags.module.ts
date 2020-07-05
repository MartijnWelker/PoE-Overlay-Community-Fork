import { NgModule, Injectable } from '@angular/core'
import { FEATURE_MODULES } from '@app/token'
import { Feature, FeatureModule } from '@app/type'
import { SharedModule } from '@shared/shared.module'
import { UserSettingsFeature } from 'src/app/layout/type'
import { ModTagsService } from './service/mod-tags.service'
import {
  ModTagsUserSettings,
  ModTagsSettingsComponent,
} from './component/mod-tags-settings/mod-tags-settings.component'
import { ModTagsDialogComponent } from './component/mod-tags-dialog/mod-tags-dialog.component'

@NgModule({
  providers: [{ provide: FEATURE_MODULES, useClass: ModTagsModule, multi: true }],
  declarations: [ModTagsDialogComponent, ModTagsSettingsComponent],
  imports: [SharedModule],
})
export class ModTagsModule implements FeatureModule {
  constructor(private readonly modTagsService: ModTagsService) {}

  public getSettings(): UserSettingsFeature {
    const defaultSettings: ModTagsUserSettings = {
      currentModTagsInfoKeybinding: 'Alt + E',
      possibleModTagsInfoKeybinding: 'Alt + R',
    }
    return {
      name: 'mod-tags.name',
      component: ModTagsSettingsComponent,
      defaultSettings,
    }
  }

  public getFeatures(settings: ModTagsUserSettings): Feature[] {
    const features: Feature[] = [
      {
        name: 'currentMods',
        accelerator: settings.currentModTagsInfoKeybinding,
      },
      {
        name: 'possibleMods',
        accelerator: settings.possibleModTagsInfoKeybinding,
      },
    ]
    return features
  }

  public run(feature: string, settings: ModTagsUserSettings): void {
    switch (feature) {
      case 'currentMods':
        this.modTagsService.currentMods(settings).subscribe()
        break
      case 'possibleMods':
        this.modTagsService.possibleMods(settings).subscribe()
        break
      default:
        break
    }
  }
}
