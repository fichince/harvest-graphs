import { TestBed } from '@angular/core/testing';

import { GraphConfigService } from './graph-config.service';

describe('GraphConfigService', () => {
  let service: GraphConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
