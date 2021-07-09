export interface Sectors {
  sectors: Array<Sector>;
}

export interface Sector {
  sectorId: string;
  sectorName: string;
  active: boolean;
  userId?: string;
}
