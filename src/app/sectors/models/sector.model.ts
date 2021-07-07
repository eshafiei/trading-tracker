export interface Sectors {
  sectors: Array<Sector>;
}

export interface Sector {
  sectorId: string;
  sectorName: string;
  sectorType: number;
  active: boolean;
  userId: string;
}
