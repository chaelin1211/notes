class Yarn {
  id: string;
  name: string;

  // 공통 구매 정보
  purchaseDate: string;
  pointOfPurchases: string;
  pricePerUnit: number;
  priceUnit: "won" | "dollar" | "euro" | "yen" | "pound";
  capacityPerUnit: number;
  capacityUnit: "gram" | "meter";
  ea: number;

  // Option 실 정보
  dyeLot: string;

  plied: boolean;
  corned: boolean;

  // 스와치 정보
  swatchWidth: number;
  swatchHeight: number;
  swatchLengthUnit: "cm" | "inch";
  needleSize: number;

  // 공통 기록 정보
  comment: string;
  tags: string [];
}