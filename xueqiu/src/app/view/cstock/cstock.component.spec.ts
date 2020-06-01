import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CstockComponent } from './cstock.component';

describe('CstockComponent', () => {
  let component: CstockComponent;
  let fixture: ComponentFixture<CstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
