import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BrowserService } from '@app/service'
import { MapsService } from '@shared/module/poe/service/maps/maps.service'
import { AtlasMap, Item } from '@shared/module/poe/type'
import { ModTagsUserSettings } from '../mod-tags-settings/mod-tags-settings.component'

export interface ModTagsDialogData {
  item: Item
  settings: ModTagsUserSettings
}

@Component({
  selector: 'app-mod-tags-dialog',
  templateUrl: './mod-tags-dialog.component.html',
  styleUrls: ['./mod-tags-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModTagsDialogComponent implements OnInit {
  public properties = []

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModTagsDialogData,
    private readonly browser: BrowserService,
  ) {}

  public ngOnInit(): void {}
}
