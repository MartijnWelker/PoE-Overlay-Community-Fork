import { Injectable } from '@angular/core'
import { DialogService } from '@app/service/dialog'
import { Point } from '@app/type'
import { Item } from '@shared/module/poe/type'
import { Observable } from 'rxjs'
import { DialogSpawnPosition } from 'src/app/layout/type'
import { ModTagsUserSettings } from '../component/mod-tags-settings/mod-tags-settings.component'
import {
  ModTagsDialogComponent,
  ModTagsDialogData,
} from '../component/mod-tags-dialog/mod-tags-dialog.component'

@Injectable({
  providedIn: 'root',
})
export class ModTagsDialogService {
  constructor(private readonly dialog: DialogService) {}

  public open(point: Point, item: Item, settings: ModTagsUserSettings): Observable<void> {
    const width = 250
    const height = 300

    const data: ModTagsDialogData = {
      item,
      settings,
    }

    const position = settings.dialogSpawnPosition === DialogSpawnPosition.Cursor ? point : undefined
    return this.dialog.open(
      ModTagsDialogComponent,
      data,
      {
        position,
        width,
        height,
      },
      settings.focusable
    )
  }
}
