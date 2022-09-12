export default class PlaceInfo {
    constructor(
        public id: string,
        public title: string,
        public creator: string,
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
