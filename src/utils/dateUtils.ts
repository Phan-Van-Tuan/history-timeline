// src/utils/dateUtils.ts

export const formatYear = (value: number): string => {
    const year = Math.floor(value);
    if (year <= 0) {
        return `${Math.abs(year - 1)} BC`; // Sửa nhẹ logic hiển thị BC
    }
    return `${year} AD`;
};

// Config: 1 Năm = 1 đơn vị khoảng cách (mét/unit)
const SCALE_PER_YEAR = 1;

export const getZFromYear = (targetYear: number, startYear: number): number => {
    // Trong Three.js, mặc định camera nhìn về -Z.
    // Chúng ta quy ước: Quá khứ ở gần (hoặc dương), Tương lai ở xa (âm).
    // Ví dụ: Start -4000 (Z=0) -> Năm -3900 (Z = -100).
    return -(targetYear - startYear) * SCALE_PER_YEAR;
};

export const getYearFromZ = (z: number, startYear: number): number => {
    // Ngược lại công thức trên
    return startYear + (-z / SCALE_PER_YEAR);
};