import { TestBed } from '@angular/core/testing';

import { AssetsSummaryService } from './assets-summary.service';

describe('AssetsSummaryService', () => {
  let service: AssetsSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
