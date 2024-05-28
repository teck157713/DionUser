import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export interface IPhoto {
    format: string,
    webPath: string
}

const getPermissions = () => {
    return Camera
        .checkPermissions()
        .then((res) => {
            if (res.photos === "denied") {
                Camera
                    .requestPermissions()
                    .then((res) => {
                        if (res.photos === "denied") {
                            Promise.reject();
                        }
                    })
                    .catch(() => Promise.reject())
            }
        })
        .catch(() => Promise.reject())
}

// Used when user wants to select image from gallery
export const pickImages = ({
    onImagesSelect,
    onDone
}: {
    onImagesSelect: (photos: IPhoto[]) => void,
    onDone: () => void
}) => {
    return getPermissions()
        .then(() =>
            Camera
                .pickImages({})
                .then((res) => Promise.resolve(onImagesSelect(res.photos as IPhoto[])))
                .catch((error) => Promise.reject(error))
                .finally(onDone)
        )
}

// Calls when user wants to take a photo
export const getPhoto = ({
    onImageSelect,
    onDone
}: {
    onImageSelect: (photos: IPhoto) => void,
    onDone: () => void
}) => {
    getPermissions()
        .then(() =>
            Camera
                .getPhoto({ source: CameraSource.Camera, resultType: CameraResultType.Base64 })
                .then((res) => Promise.resolve(onImageSelect(res as IPhoto)))
                .catch((error) => Promise.reject(error))
                .finally(onDone)
        )
}
