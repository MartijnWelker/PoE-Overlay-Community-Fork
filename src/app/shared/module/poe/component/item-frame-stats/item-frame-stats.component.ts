import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Item, Language, ItemStatModifier } from '../../type'

@Component({
  selector: 'app-item-frame-stats',
  templateUrl: './item-frame-stats.component.html',
  styleUrls: ['./item-frame-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFrameStatsComponent {
  @Input()
  public item: Item

  @Input()
  public queryItem: Item

  @Input()
  public language: Language

  @Input()
  public modifierMinRange: number

  @Input()
  public modifierMaxRange: number

  @Input()
  public tags = false

  public getValueClass(id: string): string {
    if (!id || id.length === 0) {
      return ''
    }

    if (id.includes('fire_')) {
      return 'fire'
    }
    if (id.includes('cold_')) {
      return 'cold'
    }
    if (id.includes('lightning_')) {
      return 'lightning'
    }
    if (id.includes('chaos_')) {
      return 'chaos'
    }

    return ''
  }

  public groupTags(modifiers: ItemStatModifier[]): string[] {
    const result: string[] = [];

    for (const modifier of modifiers) {
      for (const tag of modifier.tags) {
        if (!result.includes(tag)) {
          result.push(tag)
        }
      }
    }

    return result
  }
}
