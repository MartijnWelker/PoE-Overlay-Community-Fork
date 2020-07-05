import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ElectronProvider } from '@app/provider'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '@shared/shared.module'
import { ModTagsDialogComponent } from './mod-tags-dialog.component'

class ElectronProviderFake {
  public provideRemote(): Electron.Remote {
    return null
  }

  public provideIpcRenderer(): Electron.IpcRenderer {
    return null
  }
}

describe('ModTagsDialogComponent', () => {
  let component: ModTagsDialogComponent
  let fixture: ComponentFixture<ModTagsDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModTagsDialogComponent],
      imports: [
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: () => new TranslateFakeLoader(),
          },
        }),
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            item: {},
            settings: {},
          },
        },
        { provide: ElectronProvider, useClass: ElectronProviderFake },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModTagsDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
