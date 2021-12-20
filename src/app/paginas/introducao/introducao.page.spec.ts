import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroducaoPage } from './introducao.page';

describe('IntroducaoPage', () => {
  let component: IntroducaoPage;
  let fixture: ComponentFixture<IntroducaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroducaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroducaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
