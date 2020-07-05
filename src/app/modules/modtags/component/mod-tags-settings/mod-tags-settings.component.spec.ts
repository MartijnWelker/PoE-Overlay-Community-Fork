import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ElectronProvider } from '@app/provider'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '@shared/shared.module'
import { ModTagsSettingsComponent } from './mod-tags-settings.component'

class ElectronProviderFake {
  public provideRemote(): Electron.Remote {
    return null
  }

  public provideIpcRenderer(): Electron.IpcRenderer {
    return null
  }
}

describe('ModTagsSettingsComponent', () => {
  let component: ModTagsSettingsComponent
  let fixture: ComponentFixture<ModTagsSettingsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: () => new TranslateFakeLoader(),
          },
        }),
      ],
      declarations: [ModTagsSettingsComponent],
      providers: [{ provide: ElectronProvider, useClass: ElectronProviderFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModTagsSettingsComponent)
    component = fixture.componentInstance
    component.settings = {} as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
