export interface Sectors {
  sectors: Array<Sector>;
}

export interface Sector {
  sectorId: number;
  sectorName: string;
  sectorType: number;
  active: boolean;
}
