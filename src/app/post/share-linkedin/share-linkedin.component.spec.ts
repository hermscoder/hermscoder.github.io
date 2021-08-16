import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLinkedinComponent } from './share-linkedin.component';

describe('ShareLinkedinComponent', () => {
  let component: ShareLinkedinComponent;
  let fixture: ComponentFixture<ShareLinkedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLinkedinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
