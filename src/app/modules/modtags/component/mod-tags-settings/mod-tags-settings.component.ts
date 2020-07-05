import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ClipboardService } from '@app/service/input'
import { SelectListItem } from '@shared/module/material/component/select-list/select-list.component'
import { SnackBarService } from '@shared/module/material/service'
import { StatsProvider } from '@shared/module/poe/provider/stats.provider'
import { StatsService } from '@shared/module/poe/service'
import { StatType } from '@shared/module/poe/type'
import { BehaviorSubject } from 'rxjs'
import { UserSettings, UserSettingsComponent } from 'src/app/layout/type'

export interface ModTagsUserSettings extends UserSettings {
  currentModTagsInfoKeybinding: string
  possibleModTagsInfoKeybinding: string
}

@Component({
  selector: 'app-mod-tags-settings',
  templateUrl: './mod-tags-settings.component.html',
  styleUrls: ['./mod-tags-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModTagsSettingsComponent implements UserSettingsComponent {
  @Input()
  public settings: ModTagsUserSettings

  constructor(
    private readonly statsProvider: StatsProvider,
    private readonly statsService: StatsService,
    private readonly clipboard: ClipboardService,
    private readonly snackbar: SnackBarService
  ) {}

  public load(): void {}


}
