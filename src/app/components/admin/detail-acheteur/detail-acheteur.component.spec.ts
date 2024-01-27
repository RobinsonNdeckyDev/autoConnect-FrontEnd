import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAcheteurComponent } from './detail-acheteur.component';

describe('DetailAcheteurComponent', () => {
  let component: DetailAcheteurComponent;
  let fixture: ComponentFixture<DetailAcheteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAcheteurComponent]
    });
    fixture = TestBed.createComponent(DetailAcheteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
