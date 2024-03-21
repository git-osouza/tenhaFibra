import { TestBed } from '@angular/core/testing';

import { ConsultaOfertasService } from './consulta-ofertas.service';

describe('ConsultaOfertasService', () => {
  let service: ConsultaOfertasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaOfertasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
