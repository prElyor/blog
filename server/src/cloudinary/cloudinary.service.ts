import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    async uploadImage(
        file: any,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {

        return new Promise((resolve, reject) => {
            v2.uploader.upload(
                file,
                { resource_type: "auto" },
                (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

    async deleteFile (id: string, type: string) {
        return new Promise((resolve, reject) => {
            v2.uploader.destroy(
                id,
                { resource_type: type },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
        })
    }
}
