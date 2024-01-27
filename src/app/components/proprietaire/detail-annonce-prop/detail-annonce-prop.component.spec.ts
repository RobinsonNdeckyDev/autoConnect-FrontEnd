import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnoncePropComponent } from './detail-annonce-prop.component';

describe('DetailAnnoncePropComponent', () => {
  let component: DetailAnnoncePropComponent;
  let fixture: ComponentFixture<DetailAnnoncePropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAnnoncePropComponent]
    });
    fixture = TestBed.createComponent(DetailAnnoncePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
