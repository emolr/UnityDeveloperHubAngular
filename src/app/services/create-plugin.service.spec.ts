import { TestBed, inject } from '@angular/core/testing';

import { CreatePluginService } from './create-plugin.service';

describe('CreatePluginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePluginService]
    });
  });

  it('should be created', inject([CreatePluginService], (service: CreatePluginService) => {
    expect(service).toBeTruthy();
  }));
});
