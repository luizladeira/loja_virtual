import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusProdutosPage } from './meus-produtos.page';

describe('MeusProdutosPage', () => {
  let component: MeusProdutosPage;
  let fixture: ComponentFixture<MeusProdutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusProdutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
