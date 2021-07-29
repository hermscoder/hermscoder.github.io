import { TestBed } from '@angular/core/testing';

import { Mail.ServiceService } from './mail.service.service';

describe('Mail.ServiceService', () => {
  let service: Mail.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mail.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
