export interface Assets {
  assets: Array<Asset>;
}

export interface Asset {
  assetId: string;
  assetType: number;
  assetName: string;
  quantity: number;
  cost: number;
  currentPrice?: number;
  purchaseDate: Date;
  isSold?: boolean;
  soldPrice?: number;
  sectorId: string;
  userId: string;
}
