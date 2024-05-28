import PhotoSwipeLightbox from 'photoswipe/lightbox';
import "photoswipe/style.css";
import { useEffect, useState } from 'react';

export function CustomImage({
    id,
    src
}: {
    id: string,
    src: string
}) {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: `#${id} a`,

            initialZoomLevel: 'fit',
            secondaryZoomLevel: 1.5,
            maxZoomLevel: 1,

            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
        };
    }, []);

    useEffect(() => {
        const img = document.createElement("img");

        img.addEventListener("load", () => {
            setWidth(img.width);
            setHeight(img.height);
        });

        img.src = src;
    }, [src]);

    return (
        <div
            id={id}>
            <a
                data-pswp-src={src}
                data-pswp-width={width}
                data-pswp-height={height}
                target="_blank"
                rel="noreferrer">
                <img
                    src={src}
                    alt="Image"
                    style={{
                        width: "100%"
                    }}
                />
            </a>
        </div>
    )
}