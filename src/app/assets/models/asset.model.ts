export interface Assets {
  assets: Array<Asset>;
}

export interface Asset {
  assetId: string;
  assetType: number;
  assetName: string;
  quantity: number;
  cost: number;
  purchaseDate: Date;
  sectorId: string;
  userId: string;
}