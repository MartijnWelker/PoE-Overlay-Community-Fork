import { Injectable } from '@angular/core'
import { SnackBarService } from '@shared/module/material/service'
import { ItemClipboardResultCode, ItemClipboardService } from '@shared/module/poe/service'
import { ItemCategory, ItemSection } from '@shared/module/poe/type'
import { Observable, throwError } from 'rxjs'
import { catchError, flatMap } from 'rxjs/operators'
import { ModTagsUserSettings } from '../component/mod-tags-settings/mod-tags-settings.component'
import { ModTagsDialogService } from './mod-tags-dialog.service'

@Injectable({
  providedIn: 'root',
})
export class ModTagsService {
  constructor(
    private readonly itemClipboard: ItemClipboardService,
    private readonly snackbar: SnackBarService,
    private readonly dialogService: ModTagsDialogService
  ) {}

  public currentMods(settings: ModTagsUserSettings): Observable<void> {
    return this.itemClipboard
      .copy({
        [ItemSection.Rartiy]: true,
        [ItemSection.ItemLevel]: true,
        [ItemSection.Properties]: true,
        [ItemSection.Stats]: true,
      })
      .pipe(
        flatMap((result) => {
          switch (result.code) {
            case ItemClipboardResultCode.Success:
              if (
                !result.item.category.startsWith(ItemCategory.Weapon) &&
                !result.item.category.startsWith(ItemCategory.Armour) &&
                !result.item.category.startsWith(ItemCategory.Accessory)
              ) {
                return this.snackbar.warning('mod-tags.wrong-item')
              }

              console.log(result.point)
              console.log(result.item)

              return this.dialogService.open(result.point, result.item, settings)
            case ItemClipboardResultCode.Empty:
              return this.snackbar.warning('clipboard.empty')
            case ItemClipboardResultCode.ParserError:
              return this.snackbar.warning('clipboard.parser-error')
            default:
              return throwError(`Code: '${result.code}' out of range`)
          }
        }),
        catchError(() => {
          return this.snackbar.error('clipboard.error')
        })
      )
  }

  public possibleMods(settings: ModTagsUserSettings): Observable<void> {
    return this.itemClipboard
      .copy({
        [ItemSection.Rartiy]: true,
        [ItemSection.ItemLevel]: true,
        [ItemSection.Properties]: true,
        [ItemSection.Stats]: true,
      })
      .pipe(
        flatMap((result) => {
          switch (result.code) {
            case ItemClipboardResultCode.Success:
              if (
                !result.item.category.startsWith(ItemCategory.Weapon) &&
                !result.item.category.startsWith(ItemCategory.Armour) &&
                !result.item.category.startsWith(ItemCategory.Accessory)
              ) {
                return this.snackbar.warning('mod-tags.wrong-item')
              }
              return this.dialogService.open(result.point, result.item, settings)
            case ItemClipboardResultCode.Empty:
              return this.snackbar.warning('clipboard.empty')
            case ItemClipboardResultCode.ParserError:
              return this.snackbar.warning('clipboard.parser-error')
            default:
              return throwError(`Code: '${result.code}' out of range`)
          }
        }),
        catchError(() => {
          return this.snackbar.error('clipboard.error')
        })
      )
  }

  // public info(settings: MapUserSettings): Observable<void> {
  //   return this.itemClipboard
  //     .copy({
  //       [ItemSection.Rartiy]: true,
  //       [ItemSection.ItemLevel]: true,
  //       [ItemSection.Properties]: true,
  //       [ItemSection.Stats]: true,
  //     })
  //     .pipe(
  //       flatMap((result) => {
  //         switch (result.code) {
  //           case ItemClipboardResultCode.Success:
  //             if (result.item.category !== ItemCategory.Map) {
  //               return this.snackbar.warning('map.no-map')
  //             }
  //             return this.dialogService.open(result.point, result.item, settings)
  //           case ItemClipboardResultCode.Empty:
  //             return this.snackbar.warning('clipboard.empty')
  //           case ItemClipboardResultCode.ParserError:
  //             return this.snackbar.warning('clipboard.parser-error')
  //           default:
  //             return throwError(`Code: '${result.code}' out of range`)
  //         }
  //       }),
  //       catchError(() => {
  //         return this.snackbar.error('clipboard.error')
  //       })
  //     )
  // }
}
