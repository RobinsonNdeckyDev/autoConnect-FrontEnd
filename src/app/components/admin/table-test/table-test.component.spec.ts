import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTestComponent } from './table-test.component';

describe('TableTestComponent', () => {
  let component: TableTestComponent;
  let fixture: ComponentFixture<TableTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTestComponent]
    });
    fixture = TestBed.createComponent(TableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
