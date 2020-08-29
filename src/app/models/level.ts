export interface Level {
    levelId: number;
    title: string;
    value: number;
    icon: string;
    levelTypeid: number;
}

export interface LevelType {
    levelTypeid: number;
    name: string;
    maxLevels: number;
}