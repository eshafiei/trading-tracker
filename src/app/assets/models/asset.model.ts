export interface Asset {
  assetId: string;
  assetType: number;
  assetName: string;
  quantity: number;
  cost: number;
  purchaseDate: Date;
  userId: string;
}
