export default class PlaceInfo {
    constructor(
        public id: string,
        public title: string,
        public creatorId: string,
        public image: string,
        public description: string,
        public address: string,
        public coordinates: {
            lat: number;
            lng: number;
        },
        public onDelete?: (placeId: string) => void
    ) {}
}
