import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarProdutosPage } from './editar-produtos.page';

describe('EditarProdutosPage', () => {
  let component: EditarProdutosPage;
  let fixture: ComponentFixture<EditarProdutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProdutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
