export interface Dimensions {
  width: number;
  height: number;
}

export function constrainToAspectRatio(
  avWidth: number,
  avHeight: number,
  reqWidth: number,
  reqHeight: number
): Dimensions {
  if (avWidth / reqWidth > avHeight / reqHeight) {
    return {
      width: (avHeight * reqWidth) / reqHeight,
      height: avHeight,
    };
  } else {
    return {
      width: avWidth,
      height: (avWidth * reqHeight) / reqWidth,
    };
  }
}
