import { UnitAnchorModel } from '../models/widget/block.model';
import { CarouselUnitModel } from '../models/widget/carousel.model';

const digestMessage = async (text: string) => {
    let encoder: TextEncoder = new TextEncoder();
    let data: Uint8Array = encoder.encode(text);
    let code = await crypto.subtle.digest('SHA-256', data);
    return code;
}

const selectImages = (count: number, min: number, max: number): string[] => {
    let list: string[] = new Array();

    for (let i = 0; i < count; i++) {
        let index: number = Math.floor(Math.random() * (max - min) + min);
        list.push('tests/image/img-8k-' + index + '.jpg');
    }

    return list;
}

export const createUnitAnchor = (count: number, min: number, max: number): UnitAnchorModel[] => {
    let list: UnitAnchorModel[] = new Array();

    for (let i = 0; i < count; i++) {
        let view: number = Math.floor(Math.random() * 1000000);
        let type: number = Math.floor(Math.random() * 4 + 1);
        // let type: number = 2;
        let model: UnitAnchorModel = new UnitAnchorModel(
            'Angular Unit Anchor ID ${i + 1}', `Angular Unit Anchor Subject ${i + 1}`, selectImages(type === 2 ? 8 : 1, min, max),
            'assets/images/profile.png', `Angular Unit Anchor Name ${i + 1}`, view, new Date(), type
        );
        list.push(model);
    }

    return list;
}

export const createCarousel = (count: number, min: number, max: number): CarouselUnitModel[] => {
    let list: CarouselUnitModel[] = new Array();

    for (let i = 0; i < count; i++) {
        let index: number = Math.floor(Math.random() * (max - min) + min);
        let view: number = Math.floor(Math.random() * 1000000);
        let type: number = Math.floor(Math.random() * 4 + 1);
        let model: CarouselUnitModel = new CarouselUnitModel(`Angular Carousel Subject ${i + 1}`,
            'tests/image/img-8k-' + index + '.jpg', type, `Angular Carousel Target ${i + 1}`);
        list.push(model);
    }

    return list;
}